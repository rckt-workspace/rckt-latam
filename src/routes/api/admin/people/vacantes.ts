import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/people/vacantes")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret || !(await verifyAdminSessionFromRequest(request, sessionSecret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        try {
          const { data, error } = await supabaseAdmin
            .from("vacantes")
            .select("*")
            .order("fecha_publicacion", { ascending: false });

          if (error) throw error;
          return Response.json(data || []);
        } catch (e) {
          console.error("Error fetching vacantes:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },

      POST: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret || !(await verifyAdminSessionFromRequest(request, sessionSecret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        try {
          const body = await request.json();
          const { titulo, area, modalidad, ubicacion, descripcion, requisitos } = body;

          if (!titulo) {
            return Response.json({ error: "Titulo is required" }, { status: 400 });
          }

          const { data, error } = await supabaseAdmin.from("vacantes").insert({
            titulo,
            area: area || null,
            modalidad: modalidad || "Remoto",
            ubicacion: ubicacion || null,
            descripcion: descripcion || null,
            requisitos: requisitos || null,
            estado: "activa",
          });

          if (error) throw error;
          return Response.json(data, { status: 201 });
        } catch (e) {
          console.error("Error creating vacante:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },

      PUT: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret || !(await verifyAdminSessionFromRequest(request, sessionSecret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        try {
          const body = await request.json();
          const { id, titulo, area, modalidad, ubicacion, descripcion, requisitos, estado } =
            body;

          if (!id) {
            return Response.json({ error: "ID is required" }, { status: 400 });
          }

          const updateData: Record<string, unknown> = {};
          if (titulo !== undefined) updateData.titulo = titulo;
          if (area !== undefined) updateData.area = area || null;
          if (modalidad !== undefined) updateData.modalidad = modalidad;
          if (ubicacion !== undefined) updateData.ubicacion = ubicacion || null;
          if (descripcion !== undefined) updateData.descripcion = descripcion || null;
          if (requisitos !== undefined) updateData.requisitos = requisitos || null;
          if (estado !== undefined) updateData.estado = estado;

          const { data, error } = await supabaseAdmin
            .from("vacantes")
            .update(updateData)
            .eq("id", id);

          if (error) throw error;
          return Response.json(data);
        } catch (e) {
          console.error("Error updating vacante:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },

      DELETE: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret || !(await verifyAdminSessionFromRequest(request, sessionSecret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        try {
          const body = await request.json();
          const { id } = body;

          if (!id) {
            return Response.json({ error: "ID is required" }, { status: 400 });
          }

          const { error } = await supabaseAdmin.from("vacantes").delete().eq("id", id);

          if (error) throw error;
          return Response.json({ ok: true });
        } catch (e) {
          console.error("Error deleting vacante:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
    },
  },
});
