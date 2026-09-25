import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroPhoto from "@/assets/rckt-hero.jpg";
import GeneralCta from "@/components/rckt/GeneralCta";
import MethodCard, { type MethodField } from "@/components/rckt/MethodCard";
import { SectionHeader } from "@/components/rckt/SectionHeader";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import { SystemCards, type SystemCardData } from "@/components/rckt/SystemCards";

const SITE_URL = "https://rckt.lat";
const HERO_HAND = "humano";
const META_DESCRIPTION = "Diseñamos y operamos sistemas que convierten demanda en ventas: campañas, conversaciones de WhatsApp, CRM e IA supervisada, medidos hasta el ingreso.";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "RCKT — Sistemas que convierten demanda en ventas" },
      { name: "description", content: META_DESCRIPTION },
      { property: "og:title", content: "RCKT — Sistemas que convierten demanda en ventas" },
      { property: "og:description", content: META_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "Organization", "@id": SITE_URL + "/#organization", name: "RCKT", url: SITE_URL + "/", description: META_DESCRIPTION, areaServed: "Latinoamérica", email: "hola@rckt.lat", contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: "hola@rckt.lat", availableLanguage: ["es-419"] }] },
          { "@type": "WebSite", "@id": SITE_URL + "/#website", url: SITE_URL + "/", name: "RCKT", inLanguage: "es-419", publisher: { "@id": SITE_URL + "/#organization" } },
        ],
      }),
    }],
  }),
  component: Index,
});

function HeroTypewriter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(HERO_HAND.length);
      return;
    }
    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setCount(index);
      if (index >= HERO_HAND.length) window.clearInterval(id);
    }, 45);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="hero-hand">
      {HERO_HAND.slice(0, count)}
      {count < HERO_HAND.length ? <span className="rckt-caret" aria-hidden="true" /> : null}
    </span>
  );
}

function Hero() {
  return (
    <section className="section-light relative overflow-clip" id="top">
      <div className="hero-photo" aria-hidden="true">
        <img src={heroPhoto} alt="" className="hero-photo-img" />
        <div className="hero-photo-fade" />
      </div>
      <p className="hero-tagline font-display absolute right-5 bottom-6 z-10 text-right text-[10px] tracking-[0.22em] uppercase md:right-10 md:bottom-10 md:text-xs">
        Less noise.<br />More growth.
      </p>
      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-32 pb-24 md:px-6 md:pt-40 md:pb-32">
        <p className="label-orange rckt-reveal">Technology with a human pulse.</p>
        <h1 className="mt-6 max-w-4xl font-display text-[34px] leading-[1.05] font-semibold text-paper md:text-[58px]">
          Un sistema más <HeroTypewriter /><br />para lo que ya está aquí.
        </h1>
        <p className="rckt-reveal mt-6 max-w-xl text-base leading-relaxed text-paper/60 md:text-lg" style={{ animationDelay: "160ms" }}>
          Convierte las conversaciones de WhatsApp en un proceso comercial medible.
        </p>
        <div className="rckt-reveal mt-5 flex flex-wrap items-center gap-4" style={{ animationDelay: "240ms" }}>
          <a href="/sistemas/revenue-diagnostic" className="btn-orange inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium">Revisar mi proceso comercial →</a>
          <a href="#whatsapp" className="btn-outline-lt inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium">Escribir por WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

const PROBLEMS = [
  { num: "01", title: "Pago por leads y no sé cuáles compran", signals: ["Meta o Google reportan un número de conversiones, mientras que ventas registra otro", "las asesoras atienden WhatsApp desde el celular, fuera del CRM", "tardan más de una hora en responder", "muchos prospectos no llegan a la cita", "la agencia optimiza por costo por lead"], href: "/soluciones/captacion-y-cierre" as const },
  { num: "02", title: "Invierto en pauta y no crece con margen", signals: ["ROAS alto en la plataforma y margen bajo en el banco", "creatividad agotada", "catálogo sin lectura comercial", "WhatsApp en el funnel sin medir"], href: "/soluciones/ecommerce-rentable" as const },
  { num: "03", title: "Mi equipo hace lo mismo cien veces por semana", signals: ["cotizaciones a mano", "documentos que se copian entre sistemas", "correo + Excel + CRM", "reporting manual", "errores y retrabajo"], href: "/soluciones/operacion" as const },
];

function Problems() {
  return (
    <section id="problemas" className="relative isolate overflow-clip scroll-mt-28 py-20 md:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader num="01." label="Tres problemas" title={<>Entras por tu problema, no por el nombre de un <em className="font-serif-accent">sistema</em>.</>} phrase="Tres puertas de entrada. Elige la que se parece a lo que te pasa hoy." />
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {PROBLEMS.map((problem) => (
            <article key={problem.num} className="relative pl-5">
              <span className="absolute top-1 left-0 h-full w-px bg-[var(--line)]" />
              <div className="space-y-2">
                <span className="num-orange">{problem.num}</span>
                <h3 className="text-[15px] leading-snug font-semibold">«{problem.title}»</h3>
                <p className="text-[13.5px] leading-relaxed text-muted-foreground">{problem.signals.join(" · ")}</p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link to={problem.href} className="text-orange text-[13px] font-medium hover:underline">Ver solución →</Link>
                  <a href="/sistemas/revenue-diagnostic" className="btn-orange inline-flex items-center justify-center rounded-full px-3 py-1 text-[12px] font-medium">Revisar mi proceso comercial</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const SYSTEMS: SystemCardData[] = [
  { badge: "S1", kicker: "Demanda hasta la venta", title: "Demand System", shortName: "Demand", desc: "Manejamos tus campañas, pero no las optimizamos por leads baratos: las optimizamos por las oportunidades que tu equipo comercial acepta y por las que terminan en venta. Cada semana ves el embudo completo, no solo los clics.", href: "/sistemas/demand-system", art: "demand" },
  { badge: "S2", kicker: "Núcleo de Conversion System", title: "Sales Flow", shortName: "Sales Flow", desc: "Hoy pagas por un lead, te escribe por WhatsApp, y ahí empieza a perderse: respuesta tarde, sin seguimiento, fuera del CRM, sin saber de qué campaña vino. Sales Flow conecta tus campañas, WhatsApp y CRM para que cada lead tenga respuesta, seguimiento y dueño.", meta: "Ads → WhatsApp → CRM → venta", href: "/sistemas/sales-flow", art: "sales" },
  { badge: "S3", kicker: "Procesos con supervisión", title: "Operations System", shortName: "Operations", desc: "No te vendemos IA. Elegimos un proceso que tu equipo repite cien veces por semana, medimos cuánto te cuesta hoy, y en ocho semanas lo dejamos funcionando solo, con una persona aprobando lo que importa.", href: "/sistemas/operations-system", art: "operations" },
];

function Systems() {
  return (
    <section id="sistema" className="home-system-section relative isolate overflow-clip scroll-mt-28 py-14 md:py-20">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader num="02." label="Un sistema operativo de crecimiento" title={<>Tres <em className="font-serif-accent">sistemas</em>.</>} phrase="Los tres sistemas siguen la cadena de ingresos de cualquier negocio: conseguir clientes, cerrarlos y atenderlos sin fricción." />
        <div className="mt-14"><SystemCards systems={SYSTEMS} /></div>
        <div className="band-orange-sistema relative mt-10 overflow-hidden rounded-3xl px-8 py-10 md:px-12">
          <h3 className="relative font-display text-2xl leading-tight font-semibold text-paper-fixed md:text-3xl">Luego, el <span className="text-paper-fixed/60 text-xl md:text-2xl">sistema completo.</span></h3>
          <p className="text-paper-fixed/90 relative mt-3 max-w-2xl text-sm leading-relaxed md:text-base">Demand + Sales Flow, combinados, son Revenue Engine: nuestro producto principal.</p>
          <Link to="/sistemas/revenue-engine" className="band-revenue-btn relative mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">Ver Revenue Engine →</Link>
        </div>
      </div>
    </section>
  );
}

const METHOD_FIELDS: MethodField[] = [
  { k: "Situación inicial", v: "Meta o Google reportan un número de conversiones, mientras que ventas registra otro; los leads se atienden por WhatsApp desde el celular de la asesora, sin registro en el CRM, y se tarda más de una hora en responder." },
  { k: "Periodo", v: "Revenue Diagnostic de 2 a 3 semanas; sistema operativo con fuente de verdad el día 30; revisión de línea base frente a resultado el día 90." },
  { k: "Alcance", v: "Revenue Engine: Demand System y Sales Flow bajo un solo responsable, medido del clic al cierre." },
  { k: "Inversión", v: "La pauta la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros." },
  { k: "Intervención", v: "Mapa de fugas con tus números reales, tracking completo y campañas, WhatsApp y CRM conectados, para que cada lead tenga respuesta, seguimiento y dueño." },
  { k: "Resultado", v: "Se mide frente a la línea base firmada: costo por cliente adquirido y cuánto vale ese cliente frente a lo que costó traerlo." },
  { k: "Método de medición", v: "Una sola fuente de verdad: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que firmas tú." },
  { k: "Limitaciones", v: "No garantizamos ventas, porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días verás tu embudo completo con datos reales." },
];

function Proof() {
  return (
    <section id="prueba" className="home-proof-section relative isolate overflow-clip scroll-mt-28 py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader num="03." label="Prueba" title="Ningún resultado sin ficha." phrase="Una cifra con contexto vale más que un porcentaje sin denominador." />
        <figure className="relative mt-12 max-w-3xl text-left md:mt-16">
          <blockquote className="home-proof-quote">+300% de leads sin decir desde dónde ni con cuánta inversión no es un caso, es un titular.</blockquote>
        </figure>
        <MethodCard fields={METHOD_FIELDS} className="mt-10 md:mt-12" />
      </div>
    </section>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("main > section:not(#top) > div > *"));
    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }
    targets.forEach((target, index) => {
      target.classList.add("reveal-scroll");
      target.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 80}ms`);
    });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}

function Index() {
  useScrollReveal();
  return (
    <div className="rckt-site bg-background text-foreground antialiased">
      <SiteNav />
      <main><Hero /><Problems /><Systems /><Proof /><GeneralCta /></main>
      <SiteFooter />
    </div>
  );
}
