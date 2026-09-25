import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import GeneralCta from "@/components/rckt/GeneralCta";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { blogRepository } from "@/lib/blog.repository";
import type { BlogCategory, BlogPost } from "@/types/blog";

const SITE_URL = "https://rckt-latam.lovable.app";

export const Route = createFileRoute("/recursos/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Recursos: artículos y guías para vender mejor | RCKT" },
      { name: "description", content: "Artículos y guías para captar mejor, medir hasta la venta y usar la IA donde de verdad rinde." },
      { property: "og:title", content: "Recursos — RCKT LATAM" },
      { property: "og:description", content: "Artículos y guías para captar mejor, medir hasta la venta y usar la IA donde de verdad rinde." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/recursos` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/recursos` }],
  }),
  component: RecursosPage,
  errorComponent: RecursosError,
});

function useReveal(count: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).classList.add("is-in"); io.unobserve(entry.target); }
    }), { threshold: 0.15 });
    items.forEach((element, index) => { element.style.setProperty("--d", `${(index % 6) * 80}ms`); io.observe(element); });
    return () => io.disconnect();
  }, [count]);
  return ref;
}

function ResourceCover({ post }: { post: BlogPost }) {
  if (post.coverImage) return <div className="res-cover"><img src={post.coverImage} alt={post.coverImageAlt || ""} /></div>;
  return <div className="res-cover" aria-hidden="true"><span className="res-cover__brand">RCKT</span><span className="res-cover__theme">{post.category}</span></div>;
}

function RecursosPage() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("todas");

  useEffect(() => {
    let active = true;
    void Promise.all([blogRepository.getPublishedPosts(), blogRepository.getCategories()])
      .then(([published, realCategories]) => {
        if (!active) return;
        setPosts([...published].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)));
        setCategories(realCategories);
      })
      .catch(() => { if (active) { setPosts([]); setCategories([]); setFailed(true); } });
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");
    return (posts ?? []).filter((post) => {
      if (category !== "todas" && post.category !== category) return false;
      return !normalized || `${post.title} ${post.excerpt}`.toLocaleLowerCase("es").includes(normalized);
    });
  }, [posts, query, category]);
  const featured = query.trim() === "" && category === "todas" ? (filtered[0] ?? null) : null;
  const listing = filtered.filter((post) => post.id !== featured?.id);
  const gridRef = useReveal(listing.length);
  const clear = () => { setQuery(""); setCategory("todas"); };

  return <div className="min-h-screen bg-background text-foreground"><SiteNav /><main>
    <SystemPageHero label="Recursos" title={<>Respuestas antes de la <span className="hero-hand">primera llamada.</span></>} descriptor="Artículos y guías para captar mejor, medir hasta la venta y usar la IA donde de verdad rinde." ctaLabel="Revisar mi proceso comercial" ctaHref="/sistemas/revenue-diagnostic" />
    <section className="recursos-catalog">
      <div className="mx-auto max-w-6xl px-5 pt-10 pb-16 md:px-6 md:pt-16 md:pb-24">
        <div className="relative max-w-md"><Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar recursos" aria-label="Buscar recursos" className="res-input w-full rounded-full py-3 pr-4 pl-11 text-[14px] text-foreground outline-none" /></div>
        <div className="mt-6 flex flex-wrap gap-2"><button type="button" className="res-filter" data-active={category === "todas"} onClick={() => setCategory("todas")}>Todos</button>{categories.map((item) => <button key={item.id} type="button" className="res-filter" data-active={category === item.slug} onClick={() => setCategory(item.slug)}>{item.name}</button>)}</div>
        {posts === null ? <p className="py-20 text-center text-muted-foreground">Cargando recursos…</p> : null}
        {featured ? <div className="mt-12"><div className="mb-4 flex items-center gap-3"><span className="inline-block h-4 w-[2px] bg-orange" /><span className="label-orange">Destacado</span></div><Link to="/blog/$slug" params={{ slug: featured.slug }} className="res-featured grid overflow-hidden md:grid-cols-2"><ResourceCover post={featured} /><div className="flex flex-col justify-center p-6 text-left md:p-8"><span className="res-chip self-start">{featured.category}</span><h2 className="font-display mt-4 text-[24px] leading-[1.15] font-semibold text-foreground md:text-[30px]">{featured.title}</h2><p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">{featured.excerpt}</p><p className="mt-5 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">{featured.readingTime} min de lectura</p></div></Link></div> : null}
        {posts !== null && filtered.length === 0 ? <div className="py-20 text-center"><p className="text-[15px] text-muted-foreground">No hay recursos con esos filtros todavía.</p>{(query || category !== "todas") ? <button type="button" onClick={clear} className="mt-3 text-[14px] font-semibold text-orange hover:underline">Quitar filtros</button> : null}{failed ? <p className="mt-3 text-[13px] text-muted-foreground">No pudimos cargar los recursos.</p> : null}</div> : null}
        {listing.length > 0 ? <div ref={gridRef} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{listing.map((post) => <Link key={post.id} to="/blog/$slug" params={{ slug: post.slug }} data-reveal className="res-card"><ResourceCover post={post} /><div className="flex flex-1 flex-col p-5 text-left"><span className="res-chip self-start">{post.category}</span><h3 className="font-display mt-3 text-[17px] leading-[1.25] font-semibold text-foreground">{post.title}</h3><p className="mt-2 text-[14px] leading-[1.55] text-muted-foreground">{post.excerpt}</p><p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">{post.readingTime} min de lectura</p><span className="res-card__read mt-auto inline-flex items-center gap-1 pt-5 text-[13.5px] font-semibold">Leer →</span></div></Link>)}</div> : null}
        <p className="mt-16 text-center text-[14px] text-muted-foreground">Sin registro ni formularios: los recursos se leen y se descargan libremente.</p>
      </div>
    </section><GeneralCta />
  </main><SiteFooter /></div>;
}

function RecursosError() {
  const router = useRouter();
  return <div className="min-h-screen bg-background text-foreground"><SiteNav /><main className="page-section"><div className="page-shell"><div className="content-card p-8" role="alert"><h1 className="font-display text-3xl font-semibold">No pudimos mostrar los recursos.</h1><p className="mt-3 text-muted-foreground">Intenta cargar la página nuevamente.</p><button className="btn-orange mt-6 rounded-full px-6 py-3" type="button" onClick={() => void router.invalidate()}>Intentar de nuevo</button></div></div></main><SiteFooter /></div>;
}
