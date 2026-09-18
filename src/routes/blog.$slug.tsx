import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import { BlogCard, BlogCover } from "@/components/blog/BlogCard";
import { BlogToc } from "@/components/blog/BlogToc";
import { Markdown } from "@/components/blog/Markdown";
import { blogRepository } from "@/lib/blog.repository";
import { extractToc, formatBlogDate } from "@/lib/blog.utils";
import type { BlogPost } from "@/types/blog";

const SITE_URL = "https://rckt-latam.lovable.app";

export const Route = createFileRoute("/blog/$slug")({
  staticData: { sitemap: false },
  loader: async ({ params }) => ({ post: await blogRepository.getPostBySlug(params.slug) }),
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    const url = `${SITE_URL}/blog/${params.slug}`;
    if (!post || post.status !== "published") {
      return {
        meta: [
          { title: "Artículo no disponible — RCKT Insights" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = post.seo.title || `${post.title} — RCKT Insights`;
    const description = post.seo.description || post.excerpt;
    const canonical = post.seo.canonical || url;
    const image = post.coverImage.startsWith("http") ? post.coverImage : undefined;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonical },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            author: { "@type": "Organization", name: post.author.name },
            publisher: { "@type": "Organization", name: "RCKT" },
            mainEntityOfPage: canonical,
            ...(image ? { image } : {}),
          }),
        },
      ],
    };
  },
  component: BlogArticlePage,
  errorComponent: BlogArticleError,
  notFoundComponent: () => <BlogArticleError />,
});

function BlogArticlePage() {
  const { slug } = Route.useParams();
  const { post: initialPost } = Route.useLoaderData();
  const [post, setPost] = useState<BlogPost | null>(initialPost);
  const [cargando, setCargando] = useState(true);
  const [relacionados, setRelacionados] = useState<BlogPost[]>([]);

  useEffect(() => {
    let active = true;
    setCargando(true);
    void (async () => {
      const found = await blogRepository.getPostBySlug(slug);
      if (!active) return;
      setPost(found && found.status === "published" ? found : null);
      setRelacionados(found ? await blogRepository.getRelatedPosts(found, 3) : []);
      setCargando(false);
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  const toc = useMemo(() => (post ? extractToc(post.content) : []), [post]);

  useSiteMotion([post?.id, relacionados.length]);

  return (
    <div className="rckt-site tcn-page blog-page blog-article-page">
      <main id="top">
        <section className="band blog-article-head">
          <SiteHeader />
          <div className="container">
            {!post && cargando && <p className="vacantes-nota">Cargando artículo…</p>}
            {!post && !cargando && (
              <div className="form-card" role="alert">
                <span className="kicker">Blog</span>
                <h1>No encontramos este artículo.</h1>
                <p>Puede que haya cambiado de dirección o ya no esté publicado.</p>
                <div className="form-actions">
                  <Link className="btn btn-primary" to="/blog">
                    Ver todos los artículos
                  </Link>
                </div>
              </div>
            )}
            {post && (
              <header className="blog-article-header">
                <Link className="blog-back" to="/blog">
                  ← RCKT Insights
                </Link>
                <span className="blog-chip">{post.category}</span>
                <h1>{post.title}</h1>
                {post.excerpt && <p className="sub">{post.excerpt}</p>}
                <p className="blog-meta">
                  <span>{post.author.name}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{post.author.role}</span>
                  <span aria-hidden="true"> · </span>
                  <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                  <span aria-hidden="true"> · </span>
                  <span>{post.readingTime} min de lectura</span>
                </p>
              </header>
            )}
          </div>
        </section>

        {post && (
          <section className="band band-alt">
            <div className="container">
              <BlogCover post={post} className="blog-cover-hero" />
              <div className="blog-article-layout">
                <aside className="blog-article-aside">
                  <BlogToc items={toc} />
                </aside>
                <div className="blog-article-content">
                  <Markdown content={post.content} />
                  {post.tags.length > 0 && (
                    <div className="blog-tags">
                      {post.tags.map((tag) => (
                        <span className="blog-chip" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {post && relacionados.length > 0 && (
          <section className="band">
            <div className="container">
              <div className="section-head">
                <span className="kicker ital-label">Seguir leyendo</span>
                <span className="divider"></span>
              </div>
              <h2 className="rv" style={{ fontSize: "clamp(24px,3vw,32px)", margin: "0 0 36px", fontWeight: 800 }}>
                Artículos relacionados
              </h2>
              <div className="blog-grid">
                {relacionados.map((related) => (
                  <BlogCard key={related.id} post={related} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function BlogArticleError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page blog-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Blog</span>
            <h1>No pudimos mostrar este artículo.</h1>
            <p>Intenta cargarlo nuevamente o vuelve al listado.</p>
            <div className="form-actions">
              <button className="btn btn-primary" type="button" onClick={() => void router.invalidate()}>
                Intentar de nuevo
              </button>
              <a className="btn" href="/blog">Ver todos los artículos</a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
