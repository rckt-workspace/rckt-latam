import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";
import type { SupabaseClient } from "@supabase/supabase-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LooseSupabaseClient = SupabaseClient<any, "public", any>;

const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function getMimeExtension(mime: string): string {
  const mimeToExt: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  return mimeToExt[mime] || "bin";
}

export const Route = createFileRoute("/api/admin/people/blog-media")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret || !(await verifyAdminSessionFromRequest(request, sessionSecret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
          // 1. Validar Content-Type
          const contentType = request.headers.get("content-type") || "";
          if (!contentType.includes("multipart/form-data")) {
            return Response.json(
              { error: "Content-Type debe ser multipart/form-data" },
              { status: 400 },
            );
          }

          // 2. Parsear FormData
          let formData: FormData;
          try {
            formData = await request.formData();
          } catch {
            return Response.json({ error: "Formulario inválido" }, { status: 400 });
          }

          // 3. Extraer campos
          const file = formData.get("file");
          const slug = formData.get("slug");

          // 4. Validar archivo
          if (!(file instanceof File)) {
            return Response.json({ error: "Campo 'file' requerido" }, { status: 400 });
          }

          if (file.size <= 0) {
            return Response.json({ error: "El archivo está vacío" }, { status: 400 });
          }

          if (!ALLOWED_MIMES.includes(file.type)) {
            return Response.json(
              {
                error: `Tipo de archivo no permitido. Aceptados: ${ALLOWED_MIMES.join(", ")}`,
              },
              { status: 400 },
            );
          }

          if (file.size > MAX_FILE_SIZE) {
            const fileMB = file.size / 1024 / 1024;
            return Response.json(
              {
                error: `El archivo pesa ${fileMB.toFixed(1)} MB. El máximo permitido es 10 MB.`,
              },
              { status: 413 },
            );
          }

          // 5. Generar path seguro
          const ext = getMimeExtension(file.type);
          const uuid = crypto.randomUUID();
          const safeSlug = typeof slug === "string" && slug.trim() ? slug.trim() : "post";
          const path = `posts/${safeSlug}/${uuid}.${ext}`;

          // 6. Importar cliente Supabase
          const { supabaseAdmin: typedSupabaseAdmin } =
            await import("@/integrations/supabase/client.server");
          const supabaseAdmin = typedSupabaseAdmin as unknown as LooseSupabaseClient;

          // 7. Subir archivo
          const { error: uploadError } = await supabaseAdmin.storage
            .from("blog-media")
            .upload(path, file, {
              contentType: file.type,
              upsert: false,
            });

          if (uploadError) {
            console.error("[blog-media POST] Upload error:", uploadError);
            return Response.json({ error: "Error al subir el archivo" }, { status: 500 });
          }

          // 8. Obtener URL pública
          const { data: publicUrlData } = supabaseAdmin.storage
            .from("blog-media")
            .getPublicUrl(path);

          if (!publicUrlData?.publicUrl) {
            console.error("[blog-media POST] Could not generate public URL");
            return Response.json({ error: "Error al generar URL pública" }, { status: 500 });
          }

          // 9. Respuesta segura
          return Response.json(
            {
              ok: true,
              path,
              publicUrl: publicUrlData.publicUrl,
            },
            { status: 201 },
          );
        } catch (e) {
          console.error("[blog-media POST] Exception:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
    },
  },
});
