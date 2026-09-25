import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroPhoto from "@/assets/rckt-hero.jpg";
import GeneralCta from "@/components/rckt/GeneralCta";
import MethodCard, { type MethodField } from "@/components/rckt/MethodCard";
import { SectionHeader } from "@/components/rckt/SectionHeader";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import { SystemCards, SISTEMAS_CARDS } from "@/components/rckt/SystemCards";

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
          <a href="#whatsapp" className="hero-whatsapp-btn inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium">Escribir por WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

const PROBLEMS = [
  { num: "01", title: "Pago por leads y no sé cuáles compran", signals: ["Meta te muestra cuántas personas escribieron; nadie te muestra cuántas compraron", "la asesora atiende bien a un cliente mientras se le acumulan mensajes sin leer en el celular", "después de 15 minutos, tu prospecto ya le escribió a otro", "tu agencia optimiza por costo por lead y te trae a quien llena formularios, no a quien compra"], href: "/soluciones/captacion-y-cierre" as const },
  { num: "02", title: "Invierto en pauta y no crece con margen", signals: ["el ROAS se ve bien en la plataforma y el margen no aparece en el banco", "los mismos anuncios desde hace meses", "no sabes qué producto paga la pauta", "parte de la venta pasa por WhatsApp y nadie la atribuye"], href: "/soluciones/ecommerce-rentable" as const },
  { num: "03", title: "Mi equipo hace lo mismo cien veces por semana", signals: ["cotizaciones que se arman a mano", "datos que se pasan de un sistema a otro", "correo, Excel y CRM que no se hablan", "reportes que alguien consolida cada semana", "errores que se corrigen dos veces"], href: "/soluciones/operacion" as const },
];

function Problems() {
  return (
    <section id="problemas" className="relative isolate overflow-clip scroll-mt-28 py-20 md:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader num="01." label="Tres problemas" title={<>Empiezas por lo que te duele, no por el nombre de un <em className="font-serif-accent">sistema</em>.</>} phrase="Si puedes responder con datos cuántos prospectos atendiste en menos de 15 minutos y qué campaña trajo a los que compraron, tu proceso está mejor que el promedio. Si no, ahí está la fuga." />
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

function Systems() {
  return (
    <section id="sistema" className="home-system-section relative isolate overflow-clip scroll-mt-28 py-14 md:py-20">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader num="02." label="Un sistema operativo de crecimiento" title="Tres sistemas, un solo recorrido." phrase="Conseguir clientes, cerrarlos y atenderlos sin fricción: Demand, Sales Flow y Operations siguen ese orden, del anuncio a la operación." />
        <div className="mt-14"><SystemCards systems={SISTEMAS_CARDS} /></div>
        <div className="band-orange-sistema relative mt-10 overflow-hidden rounded-3xl px-8 py-10 md:px-12">
          <h3 className="relative font-display text-2xl leading-tight font-semibold text-paper-fixed md:text-3xl">Luego, el <span className="text-paper-fixed/60 text-xl md:text-2xl">recorrido completo.</span></h3>
          <p className="text-paper-fixed/90 relative mt-3 max-w-2xl text-sm leading-relaxed md:text-base">Pauta → WhatsApp → CRM → venta bajo un solo responsable: eso es Revenue Engine, nuestro producto principal.</p>
          <Link to="/sistemas/revenue-engine" className="band-revenue-btn relative mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">Ver Revenue Engine →</Link>
        </div>
      </div>
    </section>
  );
}

const METHOD_FIELDS: MethodField[] = [
  { k: "Situación inicial", v: "Meta reporta muchas conversaciones y pocas ventas; los leads se atienden desde el celular de la asesora, sin registro en el CRM, y la primera respuesta depende de quién esté libre." },
  { k: "Periodo", v: "Revenue Diagnostic de 2 a 3 semanas; sistema operativo con fuente de verdad el día 30; revisión de línea base frente a resultado el día 90." },
  { k: "Alcance", v: "Revenue Engine: Demand System y Sales Flow bajo un solo responsable, medido del clic al cierre." },
  { k: "Inversión", v: "La pauta la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros." },
  { k: "Intervención", v: "Primera respuesta en minutos, seguimiento a quien no contesta, cada conversación en el CRM y el dato de venta de vuelta a Meta y Google." },
  { k: "Resultado", v: "Se mide frente a la línea base firmada: costo por cliente adquirido y cuánto vale ese cliente frente a lo que costó traerlo." },
  { k: "Método de medición", v: "Una sola fuente de verdad: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que firmas tú." },
  { k: "Limitaciones", v: "No garantizamos ventas porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días vas a ver tu embudo completo con datos reales." },
];

function Proof() {
  return (
    <section id="prueba" className="home-proof-section relative isolate overflow-clip scroll-mt-28 py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader num="03." label="Prueba" title="Ningún resultado sin ficha." phrase="Si una cifra no dice desde dónde se midió ni con cuánta pauta, no sirve para decidir." />
        <figure className="relative mt-12 max-w-3xl text-left md:mt-16">
          <blockquote className="home-proof-quote">“47 conversaciones este mes. 2 clientes nuevos.” La diferencia está entre las dos pantallas.</blockquote>
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
