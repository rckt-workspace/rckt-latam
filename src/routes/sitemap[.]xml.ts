import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";

// Dominio público oficial. Antes apuntaba a rckt-latam.lovable.app.
const BASE_URL = "https://rckt.lat";

/** Artículos publicados del blog: /blog/<slug>, con su fecha de última actualización.
 *  Se consulta la base directamente desde el servidor (no con el cliente del navegador). */
async function blogEntries(): Promise<SitemapEntry[]> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await (supabaseAdmin as unknown as {
      from: (t: string) => {
        select: (c: string) => {
          eq: (k: string, v: string) => {
            lte: (k: string, v: string) => Promise<{ data: { slug: string; updated_at: string | null; published_at: string | null }[] | null; error: { message: string } | null }>;
          };
        };
      };
    })
      .from("blog_posts")
      .select("slug, updated_at, published_at")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString());
    if (error) throw new Error(error.message);
    return (data || [])
      .filter((post) => post.slug && /^[a-z0-9-]+$/.test(post.slug))
      .map((post) => {
        const fecha = new Date(post.updated_at || post.published_at || "");
        return {
          path: `/blog/${post.slug}`,
          lastmod: Number.isNaN(fecha.getTime()) ? undefined : fecha.toISOString().slice(0, 10),
        };
      });
  } catch (err) {
    // Si la base no responde, el sitemap sale igual con las páginas fijas
    console.error("Sitemap: no se pudieron cargar los artículos del blog:", err);
    return [];
  }
}

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = [
          ...sitemapStaticPaths(router).map((path) => ({ path })),
          ...(await blogEntries()),
        ];
        if (entries.length === 0) {
          return new Response(
            'No pages are included in this sitemap. Check route decisions and ancestor exclusions. Setting "exclude-subtree" on the root excludes the entire site.',
            { status: 404, headers: { "Cache-Control": "no-store" } },
          );
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
