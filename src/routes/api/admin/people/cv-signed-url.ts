import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/people/cv-signed-url")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;
        if (!sessionSecret || !(await verifyAdminSessionFromRequest(request, sessionSecret))) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        try {
          const body = await request.json();
          const { path } = body;

          if (!path) {
            return Response.json({ error: "path is required" }, { status: 400 });
          }

          const { data, error } = await supabaseAdmin.storage
            .from("cvs")
            .createSignedUrl(path, 300);

          if (error || !data?.signedUrl) {
            console.error("Error creating signed URL:", error);
            return Response.json({ error: "Could not generate signed URL" }, { status: 500 });
          }

          return Response.json({ signedUrl: data.signedUrl });
        } catch (e) {
          console.error("Error generating CV URL:", e);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
    },
  },
});
