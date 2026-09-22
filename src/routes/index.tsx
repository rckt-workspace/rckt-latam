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
<!-- TE PASA ESTO -->
<section class="band" id="te-pasa-esto">
<div class="container">
<div class="section-head">
<span class="num">01.</span>
<span class="kicker ital-label">Te pasa esto</span>
<span class="divider"></span>
</div>
<div class="lineas-grid">
<div class="linea-card rv">
<span class="num">01</span>
<p>Pagas por el prospecto y tu asesora le responde desde su propio celular, sin que quede nada en el CRM.</p>
</div>
<div class="linea-card rv">
<span class="num">02</span>
<p>Meta reporta conversiones que tu equipo comercial no reconoce como ventas.</p>
</div>
<div class="linea-card rv">
<span class="num">03</span>
<p>El prospecto agenda una cita y no llega —inasistencia— y nadie hace seguimiento.</p>
</div>
<div class="linea-card rv">
<span class="num">04</span>
<p>Nadie sabe, con certeza, qué campaña trajo al cliente que sí compró.</p>
</div>
</div>
</div>
</section>
<!-- DONDE SE PIERDE EL DINERO -->
<section class="band band-alt" data-mode="motion" id="fugas">
<div class="container">
<div class="section-head">
<span class="num">02.</span>
<span class="kicker ital-label">El embudo real</span>
<span class="divider"></span>
</div>
<h2 class="rv" style="font-size:clamp(26px,3.4vw,36px); margin:0 0 20px; font-weight:800;">Dónde se pierde el dinero</h2>
<p style="max-width:680px; margin:0 0 40px;">Un embudo, seis fugas: inversión → lead → contacto → calificación → cita → propuesta → venta.</p>
<div class="metodo-grid">
<div class="metodo-step rv"><span class="num">01.</span><h4>Inversión → lead</h4><p>[cifras del mercado colombiano — pendiente de datos reales]</p></div>
<div class="metodo-step rv"><span class="num">02.</span><h4>Lead → contacto</h4><p>[cifras del mercado colombiano — pendiente de datos reales]</p></div>
<div class="metodo-step rv"><span class="num">03.</span><h4>Contacto → calificación</h4><p>[cifras del mercado colombiano — pendiente de datos reales]</p></div>
<div class="metodo-step rv"><span class="num">04.</span><h4>Calificación → cita</h4><p>[cifras del mercado colombiano — pendiente de datos reales]</p></div>
<div class="metodo-step rv"><span class="num">05.</span><h4>Cita → propuesta</h4><p>[cifras del mercado colombiano — pendiente de datos reales]</p></div>
<div class="metodo-step rv"><span class="num">06.</span><h4>Propuesta → venta</h4><p>[cifras del mercado colombiano — pendiente de datos reales]</p></div>
</div>
</div>
</section>
<!-- LOS TRES SISTEMAS -->
<section class="band" id="tres-sistemas">
<div class="container">
<div class="section-head">
<span class="num">03.</span>
<span class="kicker ital-label">Los tres sistemas</span>
<span class="divider"></span>
</div>
<div class="three-grid">
<div class="three-card rv">
<span class="num">01.</span>
<h3>Demand System</h3>
<p>Genera oportunidades cualificadas, medidas hasta la venta, no hasta el formulario.</p>
</div>
<div class="three-card rv">
<span class="num">02.</span>
<h3>Sales Flow</h3>
<p>Núcleo de Conversion System: Ads → WhatsApp → calificación → CRM → seguimiento → venta.</p>
</div>
<div class="three-card rv">
<span class="num">03.</span>
<h3>Operations System</h3>
<p>Procesos que se ejecutan solos, con aprobación humana en lo que importa.</p>
</div>
</div>
<div class="juicio">
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
<span class="num">04.</span>
<span class="kicker ital-label">Prueba</span>
<span class="divider"></span>
</div>
<div class="three-grid">
<div class="three-card rv">
<span class="num">01.</span>
<h3>Casos</h3>
<p>[Bloque de casos con ficha completa: situación inicial, inversión, intervención, resultado, método de medición — pendiente de casos reales]</p>
</div>
</div>
</div>
</section>
<!-- CTA FINAL -->
<section class="cta-final">
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
