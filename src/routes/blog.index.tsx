import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import { BlogCard, BlogFeatured } from "@/components/blog/BlogCard";
import { BlogCategories, BlogSearch } from "@/components/blog/BlogFilters";
import { blogRepository } from "@/lib/blog.repository";
import type { BlogCategory, BlogPost } from "@/types/blog";
import heroAsset from "@/assets/rckt-hero.jpg";

const SITE_URL = "https://rckt-latam.lovable.app";

export const blogIntro = {
  title: "RCKT Insights",
  subtitle: "Ideas, sistemas y señales para vender mejor, pensar mejor y crecer.",
  kicker: "Blog",
};

export const Route = createFileRoute("/blog/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "RCKT Insights — Blog de crecimiento, IA y performance" },
      {
        name: "description",
        content:
          "Ideas, sistemas y señales para vender mejor, pensar mejor y crecer: artículos de RCKT sobre IA aplicada, growth, performance, estrategia y automatización.",
      },
      { property: "og:title", content: "RCKT Insights — Blog de RCKT" },
      {
        property: "og:description",
        content: "Artículos sobre IA aplicada al marketing, growth, performance y automatización.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: BlogIndex,
  errorComponent: BlogIndexError,
});

function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("todas");

  useEffect(() => {
    let active = true;
    void (async () => {
      const [p, c] = await Promise.all([
        blogRepository.getPublishedPosts(),
        blogRepository.getCategories(),
      ]);
      if (!active) return;
      setPosts(p);
      setCategories(c);
    })();
    return () => {
      active = false;
    };
  }, []);

  const [resultados, setResultados] = useState<BlogPost[]>([]);

  useEffect(() => {
    let active = true;
    void (async () => {
      const found = await blogRepository.searchPosts(query, category);
      if (active) setResultados(found);
    })();
    return () => {
      active = false;
    };
  }, [query, category, posts]);

  const destacado = useMemo(
    () =>
      query.trim() === "" && category === "todas"
        ? (resultados.find((post) => post.featured) ?? null)
        : null,
    [resultados, query, category],
  );

  const listado = useMemo(
    () => resultados.filter((post) => post.id !== destacado?.id),
    [resultados, destacado],
  );

  useSiteMotion([resultados.length, destacado?.id]);

  return (
    <div className="rckt-site tcn-page blog-page">
      <main id="top">
        <section className="subpage-hero">
          <div className="subpage-hero-photo" aria-hidden="true">
            <img src={heroAsset} alt="" />
            <span className="subpage-hero-photo-overlay" />
          </div>
          <span className="tcn-orb tcn-orb-hero-corner" aria-hidden="true" />
          <span className="tcn-orb tcn-orb-hero" aria-hidden="true" />
          <SiteHeader />
          <div className="container">
            <div className="subpage-hero-inner">
              <span className="kicker">{blogIntro.kicker}</span>
              <h1>{blogIntro.title}</h1>
              <p className="sub">{blogIntro.subtitle}</p>
            </div>
          </div>
        </section>

        <section className="band">
          <span className="tcn-orb tcn-orb-cultura-left" aria-hidden="true" />
          <div className="container">
            <div className="blog-toolbar">
              <BlogSearch value={query} onChange={setQuery} />
              <BlogCategories categories={categories} active={category} onSelect={setCategory} />
            </div>

            {posts === null && <p className="vacantes-nota">Cargando artículos…</p>}

            {destacado && <BlogFeatured post={destacado} />}

            {posts !== null && listado.length === 0 && !destacado && (
              <div className="vacante-card rv">
                <p>No encontramos artículos con esos criterios.</p>
              </div>
            )}

            {listado.length > 0 && (
              <div className="blog-grid">
                {listado.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function BlogIndexError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page blog-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Blog</span>
            <h1>No pudimos mostrar los artículos.</h1>
            <p>Intenta cargar la página nuevamente.</p>
            <div className="form-actions">
              <button className="btn btn-primary" type="button" onClick={() => void router.invalidate()}>
                Intentar de nuevo
              </button>
              <a className="btn" href="/">Volver al inicio</a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
