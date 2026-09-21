import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/people/blog")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret || !(await verifyAdminSessionFromRequest(request, sessionSecret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const url = new URL(request.url);
        const type = url.searchParams.get("type");

        try {
          if (type === "categories") {
            const { data, error } = await supabaseAdmin
              .from("blog_categories")
              .select("*")
              .order("orden", { ascending: true });

            if (error) throw error;
            return Response.json(data || []);
          }

          // Get all posts (including drafts/archived for admin)
          const { data, error } = await supabaseAdmin
            .from("blog_posts")
            .select("*")
            .order("published_at", { ascending: false });

          if (error) throw error;
          return Response.json(data || []);
        } catch (e) {
          console.error("Error fetching blog data:", e);
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
          const {
            slug,
            title,
            excerpt,
            content,
            cover_image_path,
            category_id,
            tags,
            status,
            featured,
            published_at,
            seo_title,
            seo_description,
            author_name,
          } = body;

          if (!slug || !title || !content) {
            return Response.json(
              { error: "slug, title, and content are required" },
              { status: 400 }
            );
          }

          const { data, error } = await supabaseAdmin.from("blog_posts").insert({
            slug,
            title,
            excerpt: excerpt || "",
            content,
            cover_image_path: cover_image_path || null,
            category_id: category_id || null,
            tags: tags || [],
            status: status || "draft",
            featured: featured || false,
            published_at: published_at || new Date().toISOString(),
            seo_title: seo_title || title,
            seo_description: seo_description || excerpt || "",
            author_name: author_name || "RCKT",
            updated_at: new Date().toISOString(),
          });

          if (error) throw error;
          return Response.json(data, { status: 201 });
        } catch (e) {
          console.error("Error creating blog post:", e);
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
          const { id, ...updateData } = body;

          if (!id) {
            return Response.json({ error: "ID is required" }, { status: 400 });
          }

          // Add updated_at timestamp
          const dataToUpdate = {
            ...updateData,
            updated_at: new Date().toISOString(),
          };

          const { data, error } = await supabaseAdmin
            .from("blog_posts")
            .update(dataToUpdate)
            .eq("id", id);

          if (error) throw error;
          return Response.json(data);
        } catch (e) {
          console.error("Error updating blog post:", e);
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

          const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id);

          if (error) throw error;
          return Response.json({ ok: true });
        } catch (e) {
          console.error("Error deleting blog post:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
    },
  },
});
