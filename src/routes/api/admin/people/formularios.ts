import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";
import type { SupabaseClient } from "@supabase/supabase-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LooseSupabaseClient = SupabaseClient<any, "public", any>;

export const Route = createFileRoute("/api/admin/people/formularios")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret || !(await verifyAdminSessionFromRequest(request, sessionSecret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { getDbConfig, dbFetch } = await import("@/lib/db-config.server");
        const { createClient } = await import("@supabase/supabase-js");
        const { url, serviceRoleKey } = getDbConfig();
        const typedSupabaseAdmin = createClient(url, serviceRoleKey, {
          auth: { persistSession: false, autoRefreshToken: false },
          global: { fetch: dbFetch(serviceRoleKey) },
        });
        // Esquema de la base por delante/detrás de los tipos generados: acceso sin tipar.
        const supabaseAdmin = typedSupabaseAdmin as unknown as LooseSupabaseClient;

        try {
          const { data, error } = await supabaseAdmin
            .from("leads_diagnostic")
            .select(
              `id,
               created_at,
               empresa,
               nombre,
               email,
               telefono,
               ciudad,
               pais,
               sector,
               numero_sedes,
               tratamientos_principales,
               problema_principal,
               sitio_web,
               cargo,
               empleados,
               inversion_pauta,
               volumen_leads,
               crm_actual,
               whatsapp_ventas,
               fecha_inicio,
               source,
               landing_path,
               referrer,
               utm_source,
               utm_medium,
               utm_campaign,
               utm_content,
               utm_term,
               lead_score,
               lead_level,
               status,
               consent_at,
               consent_version`,
            )
            .order("created_at", { ascending: false })
            .limit(2000);

          if (error) {
            console.error("[formularios GET] Supabase error:", error);
            return Response.json(
              { error: `Error consultando leads_diagnostic: ${error.message}` },
              { status: 500 },
            );
          }

          // Always return array
          return Response.json(Array.isArray(data) ? data : []);
        } catch (e) {
          console.error("[formularios GET] Exception:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
    },
  },
});
