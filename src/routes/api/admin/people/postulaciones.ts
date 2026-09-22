import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";
import type { SupabaseClient } from "@supabase/supabase-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LooseSupabaseClient = SupabaseClient<any, "public", any>;

export const Route = createFileRoute("/api/admin/people/postulaciones")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret || !(await verifyAdminSessionFromRequest(request, sessionSecret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { supabaseAdmin: typedSupabaseAdmin } = await import("@/integrations/supabase/client.server")
        // Esquema de la base por delante/detrás de los tipos generados: acceso sin tipar.
        const supabaseAdmin = typedSupabaseAdmin as unknown as LooseSupabaseClient;

        try {
          const { data, error } = await supabaseAdmin
            .from("postulaciones")
            .select(
              `id,
               vacante_id,
               tipo,
               nombre,
               email,
               telefono,
               portafolio_url,
               mensaje,
               cv_path,
               estado,
               notas_internas,
               source,
               consent_at,
               created_at,
               updated_at`
            )
            .order("created_at", { ascending: false });

          if (error) {
            console.error("[postulaciones GET] Supabase error:", error);
            return Response.json({ error: "Error fetching postulaciones" }, { status: 500 });
          }

          // Always return array
          return Response.json(Array.isArray(data) ? data : []);
        } catch (e) {
          console.error("[postulaciones GET] Exception:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },

      PUT: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret || !(await verifyAdminSessionFromRequest(request, sessionSecret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { supabaseAdmin: typedSupabaseAdmin } = await import("@/integrations/supabase/client.server")
        // Esquema de la base por delante/detrás de los tipos generados: acceso sin tipar.
        const supabaseAdmin = typedSupabaseAdmin as unknown as LooseSupabaseClient;

        try {
          const body = await request.json();
          const { id, estado } = body;

          if (!id || !estado) {
            return Response.json(
              { error: "ID and estado are required" },
              { status: 400 }
            );
          }

          // Get current postulacion to read previous estado
          const { data: currentData, error: fetchError } = await supabaseAdmin
            .from("postulaciones")
            .select("estado")
            .eq("id", id)
            .single();

          if (fetchError || !currentData) {
            console.error("[postulaciones PUT] Error fetching current postulacion:", fetchError);
            return Response.json({ error: "Postulacion not found" }, { status: 404 });
          }

          const estadoAnterior = currentData.estado;

          // Update postulacion
          const { error: updateError } = await supabaseAdmin
            .from("postulaciones")
            .update({ estado, updated_at: new Date().toISOString() })
            .eq("id", id);

          if (updateError) {
            console.error("[postulaciones PUT] Update error:", updateError);
            return Response.json({ error: "Error updating postulacion" }, { status: 500 });
          }

          // Record event in postulacion_eventos
          const eventData = {
            postulacion_id: id,
            tipo: "cambio_estado",
            estado_anterior: estadoAnterior,
            estado_nuevo: estado,
            created_at: new Date().toISOString(),
          };

          const { error: eventError } = await supabaseAdmin
            .from("postulacion_eventos")
            .insert(eventData);

          if (eventError) {
            console.error("[postulaciones PUT] Error recording event (non-fatal):", eventError);
          }

          return Response.json({ ok: true });
        } catch (e) {
          console.error("[postulaciones PUT] Exception:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },

      DELETE: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret || !(await verifyAdminSessionFromRequest(request, sessionSecret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { supabaseAdmin: typedSupabaseAdmin } = await import("@/integrations/supabase/client.server")
        // Esquema de la base por delante/detrás de los tipos generados: acceso sin tipar.
        const supabaseAdmin = typedSupabaseAdmin as unknown as LooseSupabaseClient;

        try {
          const body = await request.json();
          const { id } = body;

          if (!id) {
            return Response.json({ error: "ID is required" }, { status: 400 });
          }

          const { error } = await supabaseAdmin
            .from("postulaciones")
            .delete()
            .eq("id", id);

          if (error) {
            console.error("[postulaciones DELETE] Error:", error);
            return Response.json({ error: "Error deleting postulacion" }, { status: 500 });
          }

          return Response.json({ ok: true });
        } catch (e) {
          console.error("[postulaciones DELETE] Exception:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
    },
  },
});
