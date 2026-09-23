import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import heroAsset from "@/assets/rckt-hero.jpg";
import logoDarkAsset from "@/assets/rckt-logo-dark.png";
import logoLightAsset from "@/assets/rckt-logo-light.png";

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
<div class="hero-photo"><img src="__HERO__" alt="Profesional de RCKT trabajando con sistemas de crecimiento con IA"/><span class="hero-photo-overlay"></span></div>
<header>
<div class="container">
<nav>
<div class="nav-capsule nav-capsule-left">
<a class="logo" href="#top"><img alt="RCKT" src="__LOGO_DARK__"/></a>
<div class="nav-links">
<button aria-label="Cerrar menú" class="nav-close" id="navClose" type="button">✕</button>
<a href="/soluciones">Soluciones</a>
<a href="/sistemas">Sistemas</a>
<a href="/sectores">Sectores</a>
<a href="/nosotros">Nosotros</a>
<a href="/blog">Blog</a>
<div class="nav-menu-footer">
<div class="theme-switch hero-theme-switch">
<button id="themeLightMobile" class="active" type="button">Claro</button>
<button id="themeDarkMobile" type="button">Oscuro</button>
</div>
<a class="btn hero-nav-cta nav-menu-cta" href="/sistemas/revenue-diagnostic">Pedir diagnóstico</a>
</div>
</div>
</div>
<div class="nav-capsule nav-capsule-right nav-right">
<div class="nav-right-desktop">
<div class="theme-switch hero-theme-switch">
<button id="themeLight" class="active" type="button">Claro</button>
<button id="themeDark" type="button">Oscuro</button>
</div>
</div>
<a class="btn hero-nav-cta" href="/sistemas/revenue-diagnostic">Pedir diagnóstico</a>
<button aria-label="Abrir menú" class="nav-toggle" id="navToggle"><span></span><span></span><span></span></button>
</div>
</nav>

</div>
<div class="nav-overlay" id="navOverlay"></div>
</header>
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
<!-- TRES PROBLEMAS -->
<section class="band problems-section" id="tres-problemas">
<span class="problem-glow problem-glow-one" aria-hidden="true"></span>
<span class="problem-glow problem-glow-two" aria-hidden="true"></span>
<span class="problem-glow problem-glow-three" aria-hidden="true"></span>
<div class="container problems-container">
<div class="section-head">
<span class="num">01.</span>
<span class="kicker ital-label">Tres problemas</span>
<span class="divider"></span>
</div>
<div class="problems-grid">
<article class="problem-card rv">
<div class="problem-card-top"><span class="problem-number">01</span><span class="problem-category">Captación y cierre</span></div>
<h2>“Pago por leads y no sé cuáles compran”</h2>
<ul class="problem-signals">
<li>Meta reporta X conversiones y ventas reporta otra cosa</li>
<li>La asesora atiende WhatsApp desde su propio celular, sin CRM</li>
<li>Tardan más de una hora en responder</li>
<li>Muchos prospectos no llegan a la cita (inasistencia)</li>
<li>La agencia de pauta actual optimiza por costo por lead</li>
</ul>
<a class="problem-link" href="/soluciones/captacion-y-cierre" aria-label="Ver solución de Captación y cierre">Ver solución <span aria-hidden="true">→</span></a>
</article>
<article class="problem-card rv">
<div class="problem-card-top"><span class="problem-number">02</span><span class="problem-category">Ecommerce rentable</span></div>
<h2>“Invierto en pauta y no crece con margen”</h2>
<ul class="problem-signals">
<li>ROAS alto en la plataforma y margen bajo en el banco</li>
<li>Creatividad agotada</li>
<li>Catálogo sin lectura comercial</li>
<li>WhatsApp en el proceso de venta sin medir</li>
</ul>
<a class="problem-link" href="/soluciones/ecommerce-rentable" aria-label="Ver solución de Ecommerce rentable">Ver solución <span aria-hidden="true">→</span></a>
</article>
<article class="problem-card rv">
<div class="problem-card-top"><span class="problem-number">03</span><span class="problem-category">Operación</span></div>
<h2>“Mi equipo hace lo mismo cien veces por semana”</h2>
<ul class="problem-signals">
<li>Cotizaciones hechas a mano</li>
<li>Documentos que se copian entre sistemas</li>
<li>Correo + Excel + CRM sin conectar</li>
<li>Reporting manual</li>
<li>Errores y retrabajo</li>
</ul>
<a class="problem-link" href="/soluciones/operacion" aria-label="Ver solución de Operación">Ver solución <span aria-hidden="true">→</span></a>
</article>
</div>
</div>
</section>
<!-- LOS TRES SISTEMAS -->
<section class="band systems-section" id="tres-sistemas">
<div class="container systems-container">
<div class="systems-layout">
<div class="systems-intro">
<div class="section-head systems-heading">
<span class="num">02.</span>
<span class="kicker ital-label">Los tres sistemas</span>
<span class="divider"></span>
</div>
<p>Tres sistemas. Si algo no cabe en uno de los tres, no lo vendemos.</p>
</div>
<div class="three-grid systems-stack">
<article class="three-card system-card rv">
<div class="system-visual system-visual-demand"><img src="__HERO__" alt="Profesional de RCKT trabajando con sistemas de crecimiento con IA"/></div>
<div class="system-copy">
<span class="num">01.</span>
<h3>Demand System</h3>
<p>Manejamos tu pauta, pero no la optimizamos por leads baratos: la optimizamos por las oportunidades que tu equipo comercial acepta y por las que terminan en venta. Cada semana ves el embudo completo, no solo los clics.</p>
<a class="btn system-link" href="/sistemas/">Ver sistema <span aria-hidden="true">→</span></a>
</div>
</article>
<article class="three-card system-card rv">
<div class="system-visual system-visual-sales"><img src="__HERO__" alt="Profesional de RCKT trabajando con sistemas de crecimiento con IA"/></div>
<div class="system-copy">
<span class="num">02.</span>
<h3>Sales Flow</h3>
<p>Hoy pagas por un prospecto, te escribe por WhatsApp, y ahí empieza a perderse: respuesta tarde, sin seguimiento, fuera del CRM, sin saber de qué campaña vino. Sales Flow conecta tu pauta, WhatsApp y CRM para que cada prospecto tenga respuesta, seguimiento y dueño, y para que sepas cuáles compran.</p>
<a class="btn system-link" href="/sistemas/">Ver sistema <span aria-hidden="true">→</span></a>
</div>
</article>
<article class="three-card system-card rv">
<div class="system-visual system-visual-operations"><img src="__HERO__" alt="Profesional de RCKT trabajando con sistemas de crecimiento con IA"/></div>
<div class="system-copy">
<span class="num">03.</span>
<h3>Operations System</h3>
<p>No te vendemos IA. Elegimos un proceso que tu equipo repite cien veces por semana, medimos cuánto te cuesta hoy, y en ocho semanas lo dejamos funcionando solo, con una persona aprobando lo que importa.</p>
<a class="btn system-link" href="/sistemas/">Ver sistema <span aria-hidden="true">→</span></a>
</div>
</article>
</div>
</div>
<div class="juicio systems-closing rv">
<span class="tag">Revenue Engine</span>
Los dos primeros, combinados, son Revenue Engine: nuestro producto principal.
</div>
</div>
</section>
<!-- COMO EMPIEZA TODA CUENTA -->
<section class="manifiesto" data-mode="editorial" id="revenue-diagnostic">
<div class="container">
<div class="manifiesto-card rv">
<span class="kicker" style="display:block; margin-bottom:22px;">Cómo empieza toda cuenta</span>
<p>Revenue Diagnostic: 2–3 semanas, línea base firmada, sin atajos. Se descuenta del sistema si sigues con nosotros.</p>
</div>
</div>
</section>
<!-- PRUEBA -->
<section class="band band-alt" data-mode="human" id="prueba">
<div class="container">
<div class="section-head">
<span class="num">03.</span>
<span class="kicker ital-label">Prueba</span>
<span class="divider"></span>
</div>
<div class="three-grid proof-grid">
<article class="three-card proof-card rv">
<div class="proof-visual"><img src="__HERO__" alt="Profesional de RCKT en una ficha de caso de crecimiento"/></div>
<div class="proof-copy">
<div class="proof-title-row"><div><span class="num">01.</span><h3>Ficha de caso</h3></div><div class="proof-filters" aria-label="Filtros del caso"><span>Sector · [pendiente]</span><span>Sistema · [pendiente]</span><span>Ciudad · [pendiente]</span></div></div>
<dl class="case-fields">
<div><dt>Situación inicial</dt><dd>[pendiente]</dd></div>
<div><dt>Período</dt><dd>[pendiente]</dd></div>
<div><dt>Alcance</dt><dd>[pendiente]</dd></div>
<div><dt>Inversión</dt><dd>[pendiente]</dd></div>
<div><dt>Intervención</dt><dd>[pendiente]</dd></div>
<div><dt>Resultado</dt><dd>[pendiente]</dd></div>
<div><dt>Método de medición</dt><dd>[pendiente]</dd></div>
<div><dt>Limitaciones</dt><dd>[pendiente]</dd></div>
</dl>
</div>
</article>
</div>
</div>
</section>
<!-- CTA FINAL -->
<section class="cta-final">
<img class="cta-final-photo" src="__HERO__" alt="Profesional de RCKT trabajando con sistemas de crecimiento con IA"/>
<span class="cta-final-overlay" aria-hidden="true"></span>
<div class="container">
<span class="kicker">Siguiente paso</span>
<h2 class="rv">El siguiente paso empieza con claridad.</h2>
<a class="btn btn-primary" href="/sistemas/revenue-diagnostic">Revisar mi proceso comercial →</a>
</div>
</section>
</main>
<footer>
<div class="container">
<div class="footer-top">
<div>
<a class="logo" href="#top">
<img alt="RCKT" src="__LOGO_DARK__"/>
</a>
<p>Menos ruido, más crecimiento.</p>
</div>
<div class="footer-col">
<h5>Navegar</h5>
<ul>
<li><a href="/soluciones">Soluciones</a></li>
<li><a href="/sistemas">Sistemas</a></li>
<li><a href="/sectores">Sectores</a></li>
<li><a href="/nosotros">Nosotros</a></li>
<li><a href="/nosotros/como-trabajamos">Método</a></li>
<li><a href="/sistemas/revenue-diagnostic#faq">FAQ</a></li>
<li><a href="/contacto">Contacto</a></li>
<li><a href="/blog">Blog</a></li>
<li><a href="/trabaja-con-nosotros">Trabaja con nosotros</a></li>
</ul>
</div>
          <div class="footer-col">
            <h5>Legal</h5>
            <ul>
              <li><a href="/aviso-legal.pdf" download>Aviso legal</a></li>
              <li><a href="/privacidad.pdf" download>Privacidad</a></li>
              <li><a href="/cookies.pdf" download>Cookies</a></li>
              <li><a href="/politica-tratamiento-datos.pdf" download>Política de Tratamiento de Datos</a></li>
            </ul>
            <h5 style="margin-top:26px;">Correo</h5>
            <ul><li><a href="mailto:hola@rckt.lat">hola@rckt.lat</a></li></ul>
          </div>
</div>
<div class="footer-bottom">
<span>sistema activo</span>
<span>2026© RCKT</span>
</div>
</div>
</footer>
`;

function RcktLanding() {
  const markup = useMemo(
    () =>
      pageMarkup
        .replaceAll("__HERO__", heroAsset)
        .replaceAll("__LOGO_DARK__", logoDarkAsset)
        .replaceAll("__LOGO_LIGHT__", logoLightAsset),
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
      const finalText = typeTarget.textContent ?? "";
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
          timers.push(
            window.setTimeout(() => {
              cursor.remove();
            }, 2200),
          );
        }
      };
      timers.push(window.setTimeout(tick, 480));
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

    const header = document.querySelector<HTMLElement>("header");
    const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const toggle = document.getElementById("navToggle");
    const links = document.querySelector<HTMLElement>(".nav-links");
    const updateMenuLock = () => {
      const open = links?.classList.contains("mobile-open");
      document.body.classList.toggle("menu-open", Boolean(open));
      toggle?.classList.toggle("mobile-open", Boolean(open));
    };
    const onToggle = () => {
      links?.classList.toggle("mobile-open");
      updateMenuLock();
    };
    const closeMenu = () => {
      links?.classList.remove("mobile-open");
      updateMenuLock();
    };
    const closeMenuOnResize = () => {
      if (window.innerWidth > 1152) closeMenu();
    };
    const closeMenuOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const closeBtn = document.getElementById("navClose");
    const overlay = document.getElementById("navOverlay");
    toggle?.addEventListener("click", onToggle);
    closeBtn?.addEventListener("click", closeMenu);
    overlay?.addEventListener("click", closeMenu);
    links?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", closeMenuOnResize);
    window.addEventListener("keydown", closeMenuOnEsc);

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

    const light = document.getElementById("themeLight");
    const dark = document.getElementById("themeDark");
    const lightMobile = document.getElementById("themeLightMobile");
    const darkMobile = document.getElementById("themeDarkMobile");
    const setLight = () => {
      document.documentElement.removeAttribute("data-theme");
      [light, lightMobile].forEach((b) => b?.classList.add("active"));
      [dark, darkMobile].forEach((b) => b?.classList.remove("active"));
    };
    const setDark = () => {
      document.documentElement.setAttribute("data-theme", "dark");
      [dark, darkMobile].forEach((b) => b?.classList.add("active"));
      [light, lightMobile].forEach((b) => b?.classList.remove("active"));
    };
    [light, lightMobile].forEach((b) => b?.addEventListener("click", setLight));
    [dark, darkMobile].forEach((b) => b?.addEventListener("click", setDark));

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      counterObserver?.disconnect();
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", closeMenuOnResize);
      window.removeEventListener("keydown", closeMenuOnEsc);
      toggle?.removeEventListener("click", onToggle);
      closeBtn?.removeEventListener("click", closeMenu);
      overlay?.removeEventListener("click", closeMenu);
      links?.querySelectorAll("a").forEach((link) => link.removeEventListener("click", closeMenu));
      faqButtons.forEach((button) => button.removeEventListener("click", onFaq));
      form?.removeEventListener("submit", onSubmit);
      [light, lightMobile].forEach((b) => b?.removeEventListener("click", setLight));
      [dark, darkMobile].forEach((b) => b?.removeEventListener("click", setDark));
      document.documentElement.removeAttribute("data-theme");
      document.body.classList.remove("menu-open");
    };
  }, []);

  return <div className="rckt-site" dangerouslySetInnerHTML={{ __html: markup }} />;
}
