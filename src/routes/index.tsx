import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import heroAsset from "@/assets/rckt-hero.jpg";
import ctaAsset from "@/assets/rckt-cta.jpg";
import MethodCard, { type MethodField } from "@/components/rckt/MethodCard";
import { SectionHeader } from "@/components/rckt/SectionHeader";
import { SystemCards, type SystemCardData } from "@/components/rckt/SystemCards";
import { SiteFooter } from "@/components/SiteChrome";
import SiteNav from "@/components/rckt/SiteNav";

const SITE_URL = "https://rckt-latam.lovable.app";

// TODO: reemplazar por el número real de WhatsApp Business (formato internacional, sin signos).
const WHATSAPP_NUMBER = "573000000000";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20quiero%20revisar%20mi%20proceso%20comercial`;

const services = [
  [
    "AI Growth Audit",
    "Revisamos tu inversión publicitaria, tus datos, tu sitio y tu contenido con la misma vara, y entregamos un informe con lo que estás dejando sobre la mesa.",
  ],
  [
    "AI Visibility Snapshot",
    "Comprobamos con evidencia si tu marca aparece cuando alguien pregunta por tu categoría en ChatGPT, Gemini o Perplexity.",
  ],
] as const;

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "RCKT — Sistemas de crecimiento con IA" },
      {
        name: "description",
        content:
          "Diseñamos y operamos sistemas de marketing con IA ligados a resultados medibles. Empieza con un diagnóstico.",
      },
      { property: "og:title", content: "RCKT — Sistemas de crecimiento con IA" },
      {
        property: "og:description",
        content:
          "Resultados, no horas. Sistemas de medios, creativo, visibilidad en IA y ventas por conversación.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": SITE_URL + "/#organization",
              name: "RCKT",
              url: SITE_URL + "/",
              description:
                "Firma de sistemas de crecimiento con IA para el mercado hispanohablante.",
              email: "hola@rckt.lat",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  email: "hola@rckt.lat",
                  availableLanguage: ["es"],
                },
              ],
            },
            {
              "@type": "WebSite",
              "@id": SITE_URL + "/#website",
              url: SITE_URL + "/",
              name: "RCKT",
              inLanguage: "es",
              publisher: { "@id": SITE_URL + "/#organization" },
            },
            ...services.map(([name, description]) => ({
              "@type": "Service",
              name,
              description,
              serviceType: name,
              provider: { "@id": SITE_URL + "/#organization" },
              areaServed: "Mercado hispanohablante",
            })),
          ],
        }),
      },
    ],
  }),
  component: RcktLanding,
});

const pageMarkup = `
<main id="top">
<!-- HERO -->
<section class="hero">
<div class="hero-photo"><img class="hero-photo-img" src="__HERO__" alt="Profesional de RCKT trabajando con sistemas de crecimiento con IA"/><span class="hero-photo-fade"></span></div>
<div class="container hero-content">
<div class="hero-inner">
<span class="kicker hero-kicker">Technology with a human pulse.</span>
<h1><span class="hero-line">Un sistema más <span class="type-target hero-hand">humano</span></span><span class="hero-line">para lo que ya está aquí.</span></h1>
<p class="sub">Un solo sistema entre tu pauta y tu cuenta de resultados. Del clic al cierre.</p>
<div class="hero-actions">
<a class="btn hero-primary-cta" href="${WHATSAPP_URL}" target="_blank" rel="noopener">Revisar mi proceso comercial →</a>
<a class="btn hero-primary-cta" href="/sistemas/revenue-diagnostic">Solicitar diagnóstico →</a>
</div>
</div>
</div>
<p class="hero-caption">Less noise.<br/>More growth.</p>
</section>
<!-- HOME CONTENT MOUNTED WITH REACT -->
</main>
`;

const PROBLEMS = [
  {
    num: "01",
    title: "Pago por leads y no sé cuáles compran",
    signals: "Meta reporta X conversiones y ventas reporta otra cosa · La asesora atiende WhatsApp desde su propio celular, sin CRM · Tardan más de una hora en responder · Muchos prospectos no llegan a la cita (inasistencia) · La agencia de pauta actual optimiza por costo por lead",
    href: "/soluciones/captacion-y-cierre",
  },
  {
    num: "02",
    title: "Invierto en pauta y no crece con margen",
    signals: "ROAS alto en la plataforma y margen bajo en el banco · Creatividad agotada · Catálogo sin lectura comercial · WhatsApp en el proceso de venta sin medir",
    href: "/soluciones/ecommerce-rentable",
  },
  {
    num: "03",
    title: "Mi equipo hace lo mismo cien veces por semana",
    signals: "Cotizaciones hechas a mano · Documentos que se copian entre sistemas · Correo + Excel + CRM sin conectar · Reporting manual · Errores y retrabajo",
    href: "/soluciones/operacion",
  },
] as const;

const SYSTEMS: SystemCardData[] = [
  {
    badge: "S1",
    kicker: "Captación y cierre",
    title: "Demand System",
    shortName: "Demand",
    desc: "Manejamos tu pauta, pero no la optimizamos por leads baratos: la optimizamos por las oportunidades que tu equipo comercial acepta y por las que terminan en venta. Cada semana ves el embudo completo, no solo los clics.",
    href: "/sistemas/demand-system",
    art: "demand",
  },
  {
    badge: "S2",
    kicker: "Conversación y seguimiento",
    title: "Sales Flow",
    shortName: "Sales Flow",
    desc: "Hoy pagas por un prospecto, te escribe por WhatsApp, y ahí empieza a perderse: respuesta tarde, sin seguimiento, fuera del CRM, sin saber de qué campaña vino. Sales Flow conecta tu pauta, WhatsApp y CRM para que cada prospecto tenga respuesta, seguimiento y dueño, y para que sepas cuáles compran.",
    href: "/sistemas/sales-flow",
    art: "sales",
  },
  {
    badge: "S3",
    kicker: "Operación",
    title: "Operations System",
    shortName: "Operations",
    desc: "No te vendemos IA. Elegimos un proceso que tu equipo repite cien veces por semana, medimos cuánto te cuesta hoy, y en ocho semanas lo dejamos funcionando solo, con una persona aprobando lo que importa.",
    href: "/sistemas/operations-system",
    art: "operations",
  },
];

const METHOD_FIELDS: MethodField[] = [
  {
    k: "Situación inicial",
    v: "Meta o Google reportan un número de conversiones, mientras que Ventas registra otro; las asesoras atienden WhatsApp fuera del CRM y tardan más de una hora en responder.",
  },
  {
    k: "Período",
    v: "Revenue Diagnostic de 2 a 3 semanas; sistema operativo con fuente de verdad el día 30; revisión de línea base frente a resultado el día 90.",
  },
  {
    k: "Alcance",
    v: "Revenue Engine: Demand System y Sales Flow bajo un solo responsable, medido del clic al cierre.",
  },
  {
    k: "Inversión",
    v: "La pauta la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros.",
  },
  {
    k: "Intervención",
    v: "Mapa de fugas con tus números reales, tracking completo, y campañas, WhatsApp y CRM conectados, para que cada prospecto tenga respuesta, seguimiento y dueño.",
  },
  {
    k: "Resultado",
    v: "Se mide frente a la línea base firmada: costo por cliente adquirido y cuánto vale ese cliente frente a lo que costó traerlo.",
  },
  {
    k: "Método de medición",
    v: "Una sola fuente de verdad: pauta → prospecto → MQL → SQL → cita → oportunidad → venta → margen, con definiciones que firmas tú.",
  },
  {
    k: "Limitaciones",
    v: "No garantizamos ventas, porque no controlamos tu cierre, tu inventario ni tus precios. Garantizamos que en 30 días verás tu embudo completo con datos reales.",
  },
];

function ProblemsSection() {
  return (
    <section className="home-editorial-section" id="tres-problemas">
      <div className="container">
        <SectionHeader
          num="01."
          label="Tres problemas"
          title={<>Entra por lo que te duele, no por el nombre de un <em className="font-serif-accent">sistema</em>.</>}
          phrase="Tres señales que confirman por dónde se te está yendo el dinero entre la pauta, WhatsApp y el cierre."
        />
        <div className="home-problems-grid">
          {PROBLEMS.map((problem) => (
            <article key={problem.num} className="home-problem">
              <span className="home-problem__line" aria-hidden="true" />
              <span className="num-orange">{problem.num}</span>
              <h3>«{problem.title}»</h3>
              <p>{problem.signals}</p>
              <div className="home-problem__actions">
                <a href={problem.href}>Ver solución →</a>
                <a className="home-pill-button" href="/sistemas/revenue-diagnostic">Revisar mi proceso comercial</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemsSection() {
  return (
    <section className="home-editorial-section home-systems-section" id="tres-sistemas">
      <div className="container">
        <SectionHeader num="02." label="Los tres sistemas" title="Tres sistemas." phrase="Conseguir, cerrar y sostener." />
        <div className="home-section-content"><SystemCards systems={SYSTEMS} /></div>
        <div className="home-revenue-band">
          <h3>Luego, el <span>sistema completo.</span></h3>
          <p>Los dos primeros, combinados, son Revenue Engine — nuestro producto principal</p>
          <a href="/sistemas/revenue-engine">Ver Revenue Engine →</a>
        </div>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className="home-editorial-section home-proof-section" id="prueba">
      <div className="container">
        <SectionHeader
          num="03."
          label="Prueba"
          title={<>Una cifra sin ficha es solo un <em className="font-serif-accent">titular</em>.</>}
          phrase="Antes de mostrarte un caso, medimos con tu propia línea base — no con un promedio del mercado."
        />
        <blockquote className="home-proof-quote">Una cifra con contexto vale más que un porcentaje sin denominador.</blockquote>
        <MethodCard fields={METHOD_FIELDS} />
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="cta-final general-cta">
      <span className="cta-final__topline" aria-hidden="true" />
      <img className="cta-final-photo cta-photo-img" src={ctaAsset} alt="Profesional de RCKT trabajando con sistemas de crecimiento con IA" />
      <span className="cta-final-overlay cta-photo-fade" aria-hidden="true" />
      <div className="container">
        <span className="kicker">Siguiente paso</span>
        <h2>El siguiente paso empieza con <em className="font-serif-accent">claridad.</em></h2>
        <p className="cta-final-copy">Formulario o WhatsApp — los dos llegan al mismo lugar: alguien de nuestro equipo revisando tu proceso, no un bot respondiéndote.</p>
        <a className="btn btn-primary" href="/sistemas/revenue-diagnostic">Revisar mi proceso comercial →</a>
        <div className="cta-final__foot"><span>IA supervisada y documentada</span></div>
      </div>
    </section>
  );
}

function RcktLanding() {
  const { heroMarkup } = useMemo(
    () =>
      (() => {
        const markup = pageMarkup
        .replaceAll("__HERO__", heroAsset);
        const heroStart = markup.indexOf('<section class="hero">');
        const heroEnd = markup.indexOf("<!-- HOME CONTENT MOUNTED WITH REACT -->");
        return {
          heroMarkup: markup.slice(heroStart, heroEnd),
        };
      })(),
    [],
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const timers: number[] = [];

    // --- Títulos de sección palabra por palabra ---
    document.querySelectorAll<HTMLElement>(".band h2.rv, .cta-final h2.rv").forEach((h2) => {
      if (reduceMotion || h2.querySelector("*")) return;
      const words = (h2.textContent ?? "").trim().split(/\s+/);
      if (words.length < 2) return;
      h2.textContent = "";
      words.forEach((word, i) => {
        const span = document.createElement("span");
        span.className = "word";
        span.style.setProperty("--w", String(i));
        span.textContent = word;
        h2.appendChild(span);
        if (i < words.length - 1) h2.appendChild(document.createTextNode(" "));
      });
      h2.classList.add("words");
    });

    // --- Contadores animados ---
    const counters = Array.from(document.querySelectorAll<HTMLElement>(".stat-num"));
    const runCounter = (el: HTMLElement) => {
      const raw = (el.textContent ?? "").trim();
      const match = raw.match(/-?[\d.,]+/);
      if (!match) return;
      const numText = match[0].replace(",", ".");
      const target = parseFloat(numText);
      if (Number.isNaN(target)) return;
      const decimals = numText.includes(".") ? (numText.split(".")[1] ?? "").length : 0;
      const prefix = raw.slice(0, match.index ?? 0);
      const suffix = raw.slice((match.index ?? 0) + match[0].length);
      const duration = 1300;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${prefix}${(target * eased).toFixed(decimals)}${suffix}`;
        if (t < 1) requestAnimationFrame(step);
      };
      if (reduceMotion) return;
      el.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;
      requestAnimationFrame(step);
    };
    let counterObserver: IntersectionObserver | undefined;
    if (!reduceMotion && "IntersectionObserver" in window) {
      counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCounter(entry.target as HTMLElement);
              counterObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 },
      );
      counters.forEach((el) => counterObserver?.observe(el));
    }

    // --- Máquina de escribir solo en la palabra "humano" ---
    const typeTarget = document.querySelector<HTMLElement>(".hero-inner h1 .type-target");
    if (typeTarget && !reduceMotion) {
      const startTyping = () => {
        if (typeTarget.dataset.typed === "true") return;
        const finalText = typeTarget.textContent ?? "";
        typeTarget.dataset.typed = "true";
        typeTarget.textContent = "";
        const cursor = document.createElement("span");
        cursor.className = "type-cursor";
        cursor.setAttribute("aria-hidden", "true");
        typeTarget.appendChild(cursor);
        let i = 0;
        const tick = () => {
          if (i < finalText.length) {
            typeTarget.insertBefore(document.createTextNode(finalText.charAt(i)), cursor);
            i += 1;
            timers.push(window.setTimeout(tick, 45));
          } else {
            timers.push(window.setTimeout(() => cursor.remove(), 2200));
          }
        };
        tick();
      };
      timers.push(window.setTimeout(startTyping, 480));
    }

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    const observer: IntersectionObserver | undefined =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("in");
                  observer?.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
          )
        : undefined;
    revealElements.forEach((el) => (observer ? observer.observe(el) : el.classList.add("in")));

    const faqButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(".faq-q"));
    const onFaq = (event: Event) => {
      const button = event.currentTarget as HTMLButtonElement;
      const item = button.closest<HTMLElement>(".faq-item");
      if (!item) return;
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll<HTMLElement>(".faq-item").forEach((row) => {
        row.classList.remove("open");
        row.querySelector<HTMLElement>(".faq-a")?.style.removeProperty("max-height");
      });
      if (!wasOpen) {
        item.classList.add("open");
        const answer = item.querySelector<HTMLElement>(".faq-a");
        if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    };
    faqButtons.forEach((button) => button.addEventListener("click", onFaq));

    const form = document.getElementById("diagForm") as HTMLFormElement | null;
    const onSubmit = (event: Event) => {
      event.preventDefault();
      form?.classList.add("submitted");
    };
    form?.addEventListener("submit", onSubmit);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      counterObserver?.disconnect();
      observer?.disconnect();
      faqButtons.forEach((button) => button.removeEventListener("click", onFaq));
      form?.removeEventListener("submit", onSubmit);
    };
  }, []);

  return (
    <div className="rckt-site">
      <main id="top">
        <div className="home-legacy-hero">
          <SiteNav />
          <div dangerouslySetInnerHTML={{ __html: heroMarkup }} />
        </div>
        <ProblemsSection />
        <SystemsSection />
        <ProofSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
