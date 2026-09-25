import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LooseSupabaseClient = SupabaseClient<any, "public", any>;

const ApplicationSchema = z.object({
  nombre: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  telefono: z.string().trim().max(20).optional().or(z.literal("")),
  portafolio: z.string().trim().max(500).optional().or(z.literal("")),
  mensaje: z.string().trim().max(2000).optional().or(z.literal("")),
  tipo: z.enum(["candidato", "servicio"]),
  vacante_id: z.string().uuid().optional().or(z.literal("")),
  consent: z.boolean(),
});

export const Route = createFileRoute("/api/aplicaciones/enviar")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // 1. Validar Content-Type
          const contentType = request.headers.get("content-type") || "";

          if (!contentType.includes("multipart/form-data")) {
            return Response.json(
              { error: "Content-Type debe ser multipart/form-data" },
              { status: 400 },
            );
          }

          // Límite aproximado para toda la solicitud.
          // El CV individual se valida nuevamente más abajo con máximo 10 MB.
          const contentLength = Number(request.headers.get("content-length") ?? 0);

          if (contentLength > 15_000_000) {
            return Response.json({ error: "Solicitud demasiado grande" }, { status: 413 });
          }

          // 2. Parsear FormData
          let formData: FormData;

          try {
            formData = await request.formData();
          } catch {
            return Response.json({ error: "Formulario inválido" }, { status: 400 });
          }

          // 3. Extraer campos
          const nombre = formData.get("nombre");
          const email = formData.get("email");
          const telefono = formData.get("telefono");
          const portafolio = formData.get("portafolio");
          const mensaje = formData.get("mensaje");
          const tipo = formData.get("tipo");
          const vacanteId = formData.get("vacante_id");
          const consent = formData.get("consent");
          const cvFile = formData.get("cv");

          // 4. Validar campos
          const parseResult = ApplicationSchema.safeParse({
            nombre,
            email,
            telefono: telefono ?? "",
            portafolio: portafolio ?? "",
            mensaje: mensaje ?? "",
            tipo,
            vacante_id: vacanteId ?? "",
            consent: consent === "true" || consent === "on",
          });

          if (!parseResult.success) {
            return Response.json(
              {
                error: "Datos del formulario inválidos",
                details: parseResult.error.flatten(),
              },
              { status: 400 },
            );
          }

          // 5. Validar consentimiento
          if (!parseResult.data.consent) {
            return Response.json(
              { error: "Debes aceptar los términos de privacidad" },
              { status: 400 },
            );
          }

          // 6. Validar archivo CV
          if (!(cvFile instanceof File)) {
            return Response.json({ error: "Archivo CV requerido" }, { status: 400 });
          }

          if (cvFile.size <= 0) {
            return Response.json({ error: "El archivo CV está vacío" }, { status: 400 });
          }

          const maxCvBytes = 10 * 1024 * 1024;

          if (cvFile.size > maxCvBytes) {
            const cvMB = cvFile.size / 1024 / 1024;

            return Response.json(
              {
                error: `El CV pesa ${cvMB.toFixed(1)} MB. El máximo permitido es 10 MB.`,
              },
              { status: 413 },
            );
          }

          if (cvFile.type !== "application/pdf") {
            return Response.json(
              { error: "El CV debe ser un archivo PDF válido" },
              { status: 400 },
            );
          }

          // Importar cliente privilegiado únicamente en servidor.
          const { supabaseAdmin: typedSupabaseAdmin } =
            await import("@/integrations/supabase/client.server");
          // Esquema de la base por delante/detrás de los tipos generados: acceso sin tipar.
          const supabaseAdmin = typedSupabaseAdmin as unknown as LooseSupabaseClient;

          // 7. Validar vacante si viene vacante_id
          if (parseResult.data.vacante_id) {
            const { data: vacante, error: vacanteError } = await supabaseAdmin
              .from("vacantes")
              .select("id, estado")
              .eq("id", parseResult.data.vacante_id)
              .maybeSingle();

            if (vacanteError) {
              console.error("[POSTULACION] Error validating vacancy:", vacanteError);

              return Response.json(
                {
                  error: "No pudimos validar la vacante. Intenta de nuevo más tarde.",
                },
                { status: 500 },
              );
            }

            if (!vacante) {
              return Response.json(
                { error: "La vacante no existe o fue eliminada" },
                { status: 404 },
              );
            }

            if (vacante.estado !== "activa") {
              return Response.json({ error: "La vacante ya no está disponible" }, { status: 409 });
            }
          }

          // 8. Crear ruta privada segura para el CV
          const postulacionStorageId = crypto.randomUUID();
          const cvFileName = `${crypto.randomUUID()}.pdf`;
          const cvPath = `postulaciones/${postulacionStorageId}/${cvFileName}`;

          // 9. Subir CV al bucket privado
          const { error: uploadError } = await supabaseAdmin.storage
            .from("cvs")
            .upload(cvPath, cvFile, {
              contentType: "application/pdf",
              upsert: false,
            });

          if (uploadError) {
            console.error("[POSTULACION] CV upload error:", uploadError);

            return Response.json(
              {
                error: "No pudimos guardar tu CV. Intenta de nuevo más tarde.",
              },
              { status: 500 },
            );
          }

          // 10. Insertar postulación
          const { error: insertError } = await supabaseAdmin.from("postulaciones").insert({
            vacante_id: parseResult.data.vacante_id || null,
            tipo: parseResult.data.tipo,
            nombre: parseResult.data.nombre,
            email: parseResult.data.email,
            telefono: parseResult.data.telefono || null,
            portafolio_url: parseResult.data.portafolio || null,
            mensaje: parseResult.data.mensaje || null,
            cv_path: cvPath,
            source: "web",
            consent_at: new Date().toISOString(),
          });

          if (insertError) {
            console.error("[POSTULACION] Insert error:", insertError);

            // 11. Rollback del archivo si falla el INSERT
            const { error: deleteError } = await supabaseAdmin.storage.from("cvs").remove([cvPath]);

            if (deleteError) {
              console.error("[POSTULACION] Cleanup failed:", deleteError);
            }

            return Response.json(
              {
                error: "No pudimos procesar tu solicitud. Intenta de nuevo más tarde.",
              },
              { status: 500 },
            );
          }

          // 12. Respuesta segura
          return Response.json(
            {
              ok: true,
              message: "Tu postulación fue recibida correctamente",
            },
            { status: 201 },
          );
        } catch (err) {
          console.error("[POSTULACION] Server error:", err);

          return Response.json({ error: "Error interno del servidor" }, { status: 500 });
        }
      },
    },
  },
});
