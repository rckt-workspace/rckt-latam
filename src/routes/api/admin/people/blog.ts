import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";
import type { SupabaseClient } from "@supabase/supabase-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LooseSupabaseClient = SupabaseClient<any, "public", any>;

export const Route = createFileRoute("/api/admin/people/blog")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret || !(await verifyAdminSessionFromRequest(request, sessionSecret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { supabaseAdmin: typedSupabaseAdmin } =
          await import("@/integrations/supabase/client.server");

        // Esquema de la base por delante/detrás de los tipos generados: acceso sin tipar.
        const supabaseAdmin = typedSupabaseAdmin as unknown as LooseSupabaseClient;
        try {
          // Get all posts with category details (admin can see all statuses)
          const { data: posts, error: postsError } = await supabaseAdmin
            .from("blog_posts")
            .select(
              `id, slug, title, excerpt, content, cover_image_path,
               category_id, author_name, tags, status, featured,
               published_at, seo_title, seo_description,
               created_at, updated_at,
               blog_categories!inner(id, name, slug)`,
            )
            .order("published_at", { ascending: false });

          if (postsError) {
            console.error("[blog GET] Supabase error:", postsError);
            return Response.json({ error: "Error fetching posts" }, { status: 500 });
          }

          // Get categories
          const { data: categories, error: catError } = await supabaseAdmin
            .from("blog_categories")
            .select("id, name, slug")
            .order("orden", { ascending: true });

          if (catError) {
            console.error("[blog GET] Category error:", catError);
            return Response.json({ error: "Error fetching categories" }, { status: 500 });
          }

          return Response.json({
            posts: Array.isArray(posts) ? posts : [],
            categories: Array.isArray(categories) ? categories : [],
          });
        } catch (e) {
          console.error("[blog GET] Exception:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },

      POST: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret || !(await verifyAdminSessionFromRequest(request, sessionSecret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { supabaseAdmin: typedSupabaseAdmin } =
          await import("@/integrations/supabase/client.server");
        // Esquema de la base por delante/detrás de los tipos generados: acceso sin tipar.
        const supabaseAdmin = typedSupabaseAdmin as unknown as LooseSupabaseClient;

        try {
          const body = await request.json();
          const {
            slug,
            title,
            excerpt,
            content,
            coverImage,
            category,
            authorName,
            tags,
            status,
            featured,
            publishedAt,
            seoTitle,
            seoDescription,
          } = body;

          if (!slug || !title || !content) {
            return Response.json(
              { error: "slug, title, and content are required" },
              { status: 400 },
            );
          }

          // Resolve category to ID
          let categoryId = null;
          if (category) {
            if (category.match(/^[0-9a-f-]{36}$/i)) {
              // Already a UUID
              categoryId = category;
            } else {
              // Try to find by name or slug
              const { data: cat, error: catErr } = await supabaseAdmin
                .from("blog_categories")
                .select("id")
                .or(`name.eq.${category},slug.eq.${category.toLowerCase()}`)
                .single();

              if (catErr || !cat) {
                console.error("[blog POST] Category not found:", category);
                return Response.json(
                  { error: `Category "${category}" not found` },
                  { status: 400 },
                );
              }
              categoryId = cat.id;
            }
          }

          const payload = {
            slug,
            title,
            excerpt: excerpt || "",
            content,
            cover_image_path: coverImage || null,
            category_id: categoryId,
            author_name: authorName || "Equipo RCKT",
            tags: tags || [],
            status: status || "draft",
            featured: featured || false,
            published_at: publishedAt || new Date().toISOString(),
            seo_title: seoTitle || title,
            seo_description: seoDescription || excerpt || "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          const { data, error } = await supabaseAdmin
            .from("blog_posts")
            .insert(payload)
            .select(
              `id, slug, title, excerpt, content, cover_image_path,
               category_id, author_name, tags, status, featured,
               published_at, seo_title, seo_description,
               created_at, updated_at,
               blog_categories!inner(id, name, slug)`,
            )
            .single();

          if (error) {
            console.error("[blog POST] Insert error:", error);
            return Response.json({ error: "Error creating post" }, { status: 500 });
          }

          return Response.json(data, { status: 201 });
        } catch (e) {
          console.error("[blog POST] Exception:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },

      PUT: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret || !(await verifyAdminSessionFromRequest(request, sessionSecret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { supabaseAdmin: typedSupabaseAdmin } =
          await import("@/integrations/supabase/client.server");
        // Esquema de la base por delante/detrás de los tipos generados: acceso sin tipar.
        const supabaseAdmin = typedSupabaseAdmin as unknown as LooseSupabaseClient;

        try {
          const body = await request.json();
          const {
            id,
            slug,
            title,
            excerpt,
            content,
            coverImage,
            category,
            authorName,
            tags,
            status,
            featured,
            publishedAt,
            seoTitle,
            seoDescription,
          } = body;

          if (!id) {
            return Response.json({ error: "id is required" }, { status: 400 });
          }

          // Resolve category to ID
          let categoryId = null;
          if (category) {
            if (category.match(/^[0-9a-f-]{36}$/i)) {
              categoryId = category;
            } else {
              const { data: cat, error: catErr } = await supabaseAdmin
                .from("blog_categories")
                .select("id")
                .or(`name.eq.${category},slug.eq.${category.toLowerCase()}`)
                .single();

              if (catErr || !cat) {
                console.error("[blog PUT] Category not found:", category);
                return Response.json(
                  { error: `Category "${category}" not found` },
                  { status: 400 },
                );
              }
              categoryId = cat.id;
            }
          }

          const updatePayload: Record<string, unknown> = {
            updated_at: new Date().toISOString(),
          };

          if (slug !== undefined) updatePayload.slug = slug;
          if (title !== undefined) updatePayload.title = title;
          if (excerpt !== undefined) updatePayload.excerpt = excerpt;
          if (content !== undefined) updatePayload.content = content;
          if (coverImage !== undefined) updatePayload.cover_image_path = coverImage || null;
          if (categoryId !== undefined) updatePayload.category_id = categoryId;
          if (authorName !== undefined) updatePayload.author_name = authorName;
          if (tags !== undefined) updatePayload.tags = tags;
          if (status !== undefined) updatePayload.status = status;
          if (featured !== undefined) updatePayload.featured = featured;
          if (publishedAt !== undefined) updatePayload.published_at = publishedAt;
          if (seoTitle !== undefined) updatePayload.seo_title = seoTitle;
          if (seoDescription !== undefined) updatePayload.seo_description = seoDescription;

          const { data, error } = await supabaseAdmin
            .from("blog_posts")
            .update(updatePayload)
            .eq("id", id)
            .select(
              `id, slug, title, excerpt, content, cover_image_path,
               category_id, author_name, tags, status, featured,
               published_at, seo_title, seo_description,
               created_at, updated_at,
               blog_categories!inner(id, name, slug)`,
            )
            .single();

          if (error) {
            console.error("[blog PUT] Update error:", error);
            return Response.json({ error: "Post not found or update failed" }, { status: 500 });
          }

          return Response.json(data);
        } catch (e) {
          console.error("[blog PUT] Exception:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },

      DELETE: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret || !(await verifyAdminSessionFromRequest(request, sessionSecret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { supabaseAdmin: typedSupabaseAdmin } =
          await import("@/integrations/supabase/client.server");
        // Esquema de la base por delante/detrás de los tipos generados: acceso sin tipar.
        const supabaseAdmin = typedSupabaseAdmin as unknown as LooseSupabaseClient;

        try {
          const body = await request.json();
          const { id } = body;

          if (!id) {
            return Response.json({ error: "id is required" }, { status: 400 });
          }

          const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id);

          if (error) {
            console.error("[blog DELETE] Error:", error);
            return Response.json({ error: "Error deleting post" }, { status: 500 });
          }

          return Response.json({ ok: true });
        } catch (e) {
          console.error("[blog DELETE] Exception:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
    },
  },
});
