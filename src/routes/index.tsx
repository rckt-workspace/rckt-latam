import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import heroAsset from "@/assets/rckt-hero.jpg.asset.json";
import logoDarkAsset from "@/assets/rckt-logo-dark.png.asset.json";
import logoLightAsset from "@/assets/rckt-logo-light.png.asset.json";

const SITE_URL = "https://rckt-latam.lovable.app";

const services = [
  ["AI Growth Audit", "Revisamos tu inversión publicitaria, tus datos, tu sitio y tu contenido con la misma vara, y entregamos un informe con lo que estás dejando sobre la mesa."],
  ["AI Visibility Snapshot", "Comprobamos con evidencia si tu marca aparece cuando alguien pregunta por tu categoría en ChatGPT, Gemini o Perplexity."],
] as const;

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "RCKT — Sistemas de crecimiento con IA" },
      { name: "description", content: "Diseñamos y operamos sistemas de marketing con IA ligados a resultados medibles. Empieza con un diagnóstico." },
      { property: "og:title", content: "RCKT — Sistemas de crecimiento con IA" },
      { property: "og:description", content: "Resultados, no horas. Sistemas de medios, creativo, visibilidad en IA y ventas por conversación." },
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
              description: "Firma de sistemas de crecimiento con IA para el mercado hispanohablante.",
              email: "hola@rckt.es",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  email: "hola@rckt.es",
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
<a class="logo" href="#top"><img alt="RCKT" src="__LOGO_LIGHT__"/></a>
<div class="nav-links">
<a href="#sistema">Sistema</a>
<a href="#servicios">Servicios</a>
<a href="#quienes">Nosotros</a>
<a href="#metodo">Método</a>
<a href="#faq">FAQ</a>
</div>
<div class="nav-right">
<div class="theme-switch hero-theme-switch">
<button id="themeLight" class="active" type="button">Claro</button>
<button id="themeDark" type="button">Oscuro</button>
</div>
<a class="btn hero-nav-cta btn-sm" href="#contacto">Solicitar diagnóstico</a>
<button aria-label="Abrir menú" class="nav-toggle" id="navToggle"><span></span><span></span><span></span></button>
</div>
</nav>
</div>
</header>
<div class="container hero-content">
<div class="hero-inner">
<span class="kicker hero-kicker">Crecimiento inteligente</span>
<h1><span class="hero-line">Tu marketing</span><span class="hero-line">no necesita más manos.</span><span class="hero-line">Necesita un <span class="hero-nowrap"><em class="type-target">sistema</em>.</span></span></h1>
<p class="sub">Diseñamos y operamos sistemas de crecimiento impulsados por IA que trabajan 24/7 para atraer oportunidades, acelerar ventas y hacer crecer tu negocio. Tecnología, estrategia y ejecución enfocadas en resultados.</p>
<div class="hero-actions">
<a class="btn hero-primary-cta" href="#contacto">Solicitar diagnóstico →</a>
<a class="btn hero-outline-cta" href="#sistema">Descubre tu sistema de crecimiento →</a>
</div>
</div>
</div>
<p class="hero-caption">Sistemas de IA.<br/>Crecimiento real.</p>
</section>
<!-- EL MERCADO CAMBIÓ DE LADO -->
<section class="band" id="sistema">
<div class="container">
<div class="section-head">
<span class="num">01.</span>
<span class="kicker ital-label">El estado del mercado</span>
<span class="divider"></span>
</div>
<div class="mercado-grid">
<div class="mercado-left">
<h2 class="rv" style="font-size:clamp(26px,3.4vw,38px); margin:0 0 20px; line-height:1.25; font-weight:800;">La ejecución ya no es el diferencial.</h2>
<p>La IA puede crear campañas, producir contenido, analizar datos y automatizar tareas en minutos. Eso cambió las reglas. Hoy, tener más manos no significa crecer más. La ventaja está en conectar estrategia, tecnología y ejecución alrededor de un mismo objetivo: generar resultados. Nosotros no vendemos horas, piezas ni tareas. Construimos sistemas que hacen que tu marketing avance.</p>
</div>
<div class="stats">
<div class="stat-row rv">
<span class="stat-num up">+8.6%</span>
<p>Crece la inversión publicitaria mundial</p>
</div>
<div class="stat-row rv">
<span class="stat-num">–1.2%</span>
<p>Caen los ingresos de quienes venden ejecución</p>
</div>
<div class="stat-row rv">
<span class="stat-num up">73%</span>
<p>De los negocios son invisibles cuando alguien le pregunta a una IA</p>
</div>
</div>
</div>
</div>
</section>
<!-- TRES RUTAS DE ENTRADA -->
<section class="band">
<div class="container">
<div class="section-head">
<span class="num">02.</span>
<span class="kicker ital-label">Un sistema operativo de crecimiento</span>
<span class="divider"></span>
</div>
<h2 class="rv" style="font-size:clamp(26px,3.4vw,36px); margin:0 0 56px; max-width:680px; font-weight:800;">Tres rutas de entrada</h2>
<div class="three-grid">
<div class="three-card rv">
<span class="num">01.</span>
<h3>Diagnosticar</h3>
<p>En dos o tres semanas ponemos números a la realidad: qué está drenando presupuesto, qué palancas están sin usar y por dónde conviene empezar.</p>
</div>
<div class="three-card rv">
<span class="num">02.</span>
<h3>Operar</h3>
<p>Tomamos el mando de los sistemas que mueven el negocio —inversión, creatividad, visibilidad en IA y conversación comercial— y respondemos por su rendimiento.</p>
</div>
<div class="three-card rv">
<span class="num">03.</span>
<h3>Producto</h3>
<p>Aquello que ya probó funcionar lo empaquetamos como software: se instala en tu operación y se paga por suscripción, sin proyectos interminables.</p>
</div>
</div>
<div class="juicio">
<span class="tag">Juicio</span>
        Presente en todo el proceso: qué automatizar, qué no y en qué orden. La IA no reemplaza el criterio, lo potencia.
      </div>
</div>
</section>
<!-- QUE ES RCKT -->
<section class="band band-alt" data-mode="editorial" id="quienes">
<div class="container">
<div class="section-head">
<span class="num">03.</span>
<span class="kicker ital-label">Qué es RCKT</span>
<span class="divider"></span>
</div>
<div class="posn">
<div class="posn-left rv">
<p>RCKT nació dentro del ecosistema de IA — no lo adoptó después. Somos el equipo que diseña, construye y opera la infraestructura de crecimiento de negocios hispanohablantes: estrategia, demanda, conversión, retención y dirección ejecutiva, todo conectado. Combinamos tres capacidades: profundidad de negocio para decidir dónde crecer, IA como columna operativa —no como experimento—, y ejecución con lectura cultural real de LATAM.</p>
</div>
<div class="posn-right rv">
<p>Diseñamos, implementamos y operamos sistemas inteligentes de crecimiento para convertir el marketing en un motor real de negocio.</p>
<div class="divider-sm" style="background:var(--naranja);"></div>
<p class="cap">La firma nativa de IA para crecimiento<br/>y revenue del mercado hispanohablante</p>
</div>
</div>
</div>
</section>
<!-- SERVICIOS -->
<section class="band" data-mode="motion" id="servicios">
<div class="container">
<div class="section-head">
<span class="num">04.</span>
<span class="kicker ital-label">Servicios · empieza por aquí</span>
<span class="divider"></span>
</div>
<div class="service-lead-grid">
<div class="service-lead rv">
<span class="kicker" style="display:inline-flex; padding:5px 12px; border-radius:999px; background:rgba(var(--mode-glow-rgb),0.22); color:var(--mode-accent-deep); text-transform:uppercase; letter-spacing:.05em; font-size:11.5px; font-weight:700;">D1 — AI Growth Audit</span>
<p class="tag-line">Todo bajo la lupa</p>
<p>Revisamos tu inversión publicitaria, tus datos, tu sitio y tu contenido con la misma vara. En 2 a 3 semanas tienes un informe que pone en números cuánto estás dejando sobre la mesa, y en qué orden recuperarlo.</p>
<a class="btn btn-ghost btn-sm" href="#contacto">Ver mi diagnóstico →</a>
</div>
<div class="service-lead rv">
<span class="kicker" style="display:inline-flex; padding:5px 12px; border-radius:999px; background:rgba(var(--mode-glow-rgb),0.22); color:var(--mode-accent-deep); text-transform:uppercase; letter-spacing:.05em; font-size:11.5px; font-weight:700;">D2 — AI Visibility Snapshot</span>
<p class="tag-line">¿Existes para la IA?</p>
<p>Hacemos las mismas preguntas que haría tu cliente potencial —en ChatGPT, Gemini y Perplexity— y te mostramos, con evidencia, si tu marca aparece en la respuesta. Si no aparece, te decimos exactamente qué mover.</p>
<a class="btn btn-ghost btn-sm" href="#contacto">Ver si aparezco →</a>
</div>
</div>
<div class="producto-block">
<div>
<span class="kicker" style="display:inline-flex; padding:5px 12px; border-radius:999px; background:rgba(var(--mode-glow-rgb),0.22); color:var(--mode-accent-deep); text-transform:uppercase; letter-spacing:.05em; font-size:11.5px; font-weight:700;">P — Producto</span>
<h3>Lo que funciona, lo convertimos en sistema.</h3>
<p>Cuando una solución funciona y genera resultados de forma consistente, la convertimos en un producto que puedes integrar a tu negocio mediante una suscripción mensual. Sin proyectos interminables. Sin empezar de cero.</p>
</div>
<div class="torres">
<div class="torre rv">
<b>T1 — Advisory</b>
<p>Tu dirección de IA, cuando la necesitas. Te ayudamos a tomar mejores decisiones: qué automatizar, qué herramientas elegir y por dónde empezar.</p>
</div>
<div class="torre rv">
<b>T2 — In-housing</b>
<p>Llevamos el conocimiento a tu equipo. Diseñamos la capacidad dentro de tu empresa y formamos a las personas que la van a operar, para que puedas crecer con autonomía.</p>
</div>
<div class="torre rv">
<b>T3 — Compliance</b>
<p>IA con respaldo y control. Diseñamos tus automatizaciones para que operen de forma segura y cumplan con las normativas aplicables en cada país donde tengas presencia.</p>
</div>
</div>
</div>
<div class="no-vendemos">
<span class="kicker" style="display:block; margin-bottom:14px;">Lo que no vendemos</span>
<p>No vendemos manejo de redes sociales, contenido por pieza, SEO basado únicamente en palabras clave ni reportes que nadie termina de leer. No porque no sepamos hacerlo, sino porque la tecnología ya permite automatizar gran parte de estas tareas. Creemos que cobrar cada una por separado ya no tiene sentido. Por eso, las integramos dentro de nuestros sistemas y procesos para que trabajen de forma más eficiente, constante y escalable. <strong>No pagas por tareas. Inviertes en resultados.</strong></p>
</div>
</div>
</section>
<!-- SEIS LINEAS DE NEGOCIO -->
<section class="band band-alt" data-mode="motion">
<div class="container">
<div class="section-head">
<span class="num">05.</span>
<span class="kicker ital-label">Cómo se organiza todo</span>
<span class="divider"></span>
</div>
<h2 class="rv" style="font-size:clamp(26px,3.4vw,36px); margin:0 0 48px; font-weight:800;">Seis líneas, un mismo sistema</h2>
<div class="lineas-grid">
<div class="linea-card rv">
<span class="num">01</span>
<h4>Growth Strategy</h4>
<p>Claridad estratégica: dónde crecer y cómo estructurar el sistema comercial.</p>
</div>
<div class="linea-card rv">
<span class="num">02</span>
<h4>Agentic AI</h4>
<p>IA como infraestructura operativa: agentes y workflows, no herramientas sueltas.</p>
</div>
<div class="linea-card rv">
<span class="num">03</span>
<h4>Demand Gen &amp; Performance</h4>
<p>Generar demanda y convertir inversión en pipeline. Incluye retail media y CTV.</p>
</div>
<div class="linea-card rv">
<span class="num">04</span>
<h4>CRM &amp; RevOps</h4>
<p>Convertir leads y clientes en ingresos bien gestionados, con IA.</p>
</div>
<div class="linea-card rv">
<span class="num">05</span>
<h4>Industry &amp; Regional Accelerators</h4>
<p>Programas verticalizados por sector y región. Lo que nos separa del resto.</p>
</div>
<div class="linea-card rv">
<span class="num">06</span>
<h4>Strategic Partnership</h4>
<p>Liderazgo externo continuo: Fractional CMO / AI Growth Office.</p>
</div>
</div>
</div>
</section>
<!-- METODO -->
<section class="band" data-mode="human" id="metodo">
<div class="container">
<div class="section-head">
<span class="num">06.</span>
<span class="kicker ital-label">Método</span>
<span class="divider"></span>
</div>
<h2 class="rv" style="font-size:clamp(26px,3.4vw,36px); margin:0 0 48px; font-weight:800;">Así empezamos</h2>
<div class="metodo-grid">
<div class="metodo-step rv">
<span class="num">01.</span>
<h4>Diagnóstico</h4>
<p>Snapshot o Audit. 2–3 semanas. Sales sabiendo dónde estás y qué conviene primero.</p>
</div>
<div class="metodo-step rv">
<span class="num">02.</span>
<h4>Primer sistema</h4>
<p>Implementamos el que el diagnóstico priorice. Calibración en ciclos de 90 días.</p>
</div>
<div class="metodo-step rv">
<span class="num">03.</span>
<h4>Expansión</h4>
<p>Cuando el primero rinde, entra el siguiente. Cada etapa se paga con los resultados de la anterior.</p>
</div>
<div class="metodo-step rv">
<span class="num">04.</span>
<h4>Producto</h4>
<p>Lo probado se vuelve suscripción. Menos dependencia, más sistema.</p>
</div>
</div>
<span class="kicker" style="display:block; margin-bottom:32px;">Cómo trabajamos</span>
<div class="principios">
<div class="principio rv">
<p class="lead">Crecemos contigo.</p>
<p>No vendemos tiempo. Ponemos resultados sobre la mesa.</p>
</div>
<div class="principio rv">
<p class="lead">Más inteligencia. Más capacidad.</p>
<p>La tecnología escala la capacidad de nuestro equipo. El criterio sigue siendo humano.</p>
</div>
<div class="principio rv">
<p class="lead">La prueba está en los datos.</p>
<p>Datos antes que adjetivos. Pruebas antes que promesas.</p>
</div>
</div>
</div>
</section>
<!-- MANIFIESTO -->
<section class="manifiesto" data-mode="editorial">
<div class="container">
<div class="manifiesto-card rv">
<span class="kicker" style="display:block; margin-bottom:22px;">Manifiesto</span>
<p>Hacemos crecer lo que importa. Aplicamos inteligencia con precisión, medimos lo que hacemos y construimos relaciones que perduran. Porque el verdadero crecimiento no se persigue: se diseña, se demuestra y se sostiene.</p>
</div>
</div>
</section>
<!-- FAQ -->
<section class="band band-alt" data-mode="human" id="faq">
<div class="container">
<div class="section-head">
<span class="num">07.</span>
<span class="kicker ital-label">Preguntas frecuentes</span>
<span class="divider"></span>
</div>
<div class="faq-list">
<div class="faq-item rv">
<button class="faq-q">¿Cuánto cuesta?<span class="plus">+</span></button>
<div class="faq-a"><p>Depende del alcance, y sería poco serio darte una cifra sin diagnóstico. Lo que sí es fijo es el modelo: una base que cubre la operación más una parte variable ligada a resultados medibles. El diagnóstico define ambas.</p></div>
</div>
<div class="faq-item rv">
<button class="faq-q">¿Cuándo veo resultados?<span class="plus">+</span></button>
<div class="faq-a"><p>Los diagnósticos entregan en 2–3 semanas. Los sistemas muestran señal en las primeras semanas y se calibran en ciclos de 90 días. Desconfía de quien te prometa fechas exactas sin conocer tu negocio.</p></div>
</div>
<div class="faq-item rv">
<button class="faq-q">¿Sirve para mi industria?<span class="plus">+</span></button>
<div class="faq-a"><p>Los sistemas son universales; la calibración es por negocio. Si tu cliente busca, pregunta o conversa antes de comprar, aplica.</p></div>
</div>
<div class="faq-item rv">
<button class="faq-q">¿Reemplazan a mi equipo?<span class="plus">+</span></button>
<div class="faq-a"><p>Al contrario. Podemos operar por ti, o montar la capacidad dentro de tu empresa y entrenar a tu gente. Tú eliges cuánto control quieres.</p></div>
</div>
<div class="faq-item rv">
<button class="faq-q">¿Qué pasa con mis datos?<span class="plus">+</span></button>
<div class="faq-a"><p>Operamos con los estándares del mercado más exigente — normativa europea de IA y protección de datos — en todos los países donde trabajamos.</p></div>
</div>
</div>
</div>
</section>
<!-- CONTACTO / DIAGNÓSTICO -->
<section class="band" data-mode="human" id="contacto">
<div class="container">
<div class="contact-wrap">
<div class="contact-left">
<span class="kicker" style="display:block; margin-top:14px;">Diagnóstico</span>
<h2 class="rv">Empieza por saber dónde estás</h2>
<p>Pide el diagnóstico. En 24–48 horas te respondemos con los próximos pasos.</p>
<a class="mail" href="mailto:hola@rckt.es">hola@rckt.es</a>
</div>
<form id="diagForm">
<div class="form-row">
<div class="field">
<label for="nombre">Nombre</label>
<input id="nombre" required="" type="text"/>
</div>
<div class="field">
<label for="email">Email de trabajo</label>
<input id="email" required="" type="email"/>
</div>
</div>
<div class="form-row">
<div class="field">
<label for="empresa">Empresa</label>
<input id="empresa" required="" type="text"/>
</div>
<div class="field">
<label for="web">Sitio web (opcional)</label>
<input id="web" type="text"/>
</div>
</div>
<div class="field">
<label>¿Qué te preocupa hoy?</label>
<div class="pills">
<label class="pill"><input name="preocupa" type="radio" value="anuncios"/>Mis anuncios cuestan cada vez más</label>
<label class="pill"><input name="preocupa" type="radio" value="ia"/>La IA no me recomienda</label>
<label class="pill"><input name="preocupa" type="radio" value="ventas"/>Pierdo ventas por no responder a tiempo</label>
<label class="pill"><input name="preocupa" type="radio" value="dinero"/>No sé dónde estoy perdiendo dinero</label>
<label class="pill"><input name="preocupa" type="radio" value="otro"/>Otro</label>
</div>
</div>
<div class="submit-row">
<button class="btn btn-primary" type="submit">Solicitar diagnóstico</button>
<span class="form-note">Sin compromiso. Sin spam. Respuesta humana.</span>
</div>
<p class="form-thanks" id="formThanks">Listo — te respondemos en 24–48 horas a tu correo.</p>
</form>
</div>
</div>
</section>
<!-- CTA FINAL -->
<section class="cta-final">
<div class="container">
<span class="kicker">Siguiente paso</span>
<h2 class="rv">Empieza por saber dónde estás</h2>
<a class="btn btn-primary" href="#contacto">Solicitar diagnóstico →</a>
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
<li><a href="#sistema">Sistema</a></li>
<li><a href="#servicios">Servicios</a></li>
<li><a href="#metodo">Método</a></li>
<li><a href="#faq">FAQ</a></li>
<li><a href="#contacto">Contacto</a></li>
</ul>
</div>
<div class="footer-col">
<h5>Legal</h5>
<ul>
<li><a href="/aviso-legal">Aviso legal</a></li>
<li><a href="/privacidad">Privacidad</a></li>
<li><a href="/cookies">Cookies</a></li>
</ul>
<h5 style="margin-top:26px;">Correo</h5>
<ul><li><a href="mailto:hola@rckt.es">hola@rckt.es</a></li></ul>
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
  const markup = useMemo(() => pageMarkup
    .replaceAll("__HERO__", heroAsset.url)
    .replaceAll("__LOGO_DARK__", logoDarkAsset.url)
    .replaceAll("__LOGO_LIGHT__", logoLightAsset.url), []);

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
      counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { runCounter(entry.target as HTMLElement); counterObserver?.unobserve(entry.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach((el) => counterObserver?.observe(el));
    }

    // --- Máquina de escribir solo en la palabra "sistema" ---
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
          timers.push(window.setTimeout(() => { cursor.remove(); }, 2200));
        }
      };
      timers.push(window.setTimeout(tick, 480));
    }

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    let observer: IntersectionObserver | undefined;
    observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("in"); observer?.unobserve(entry.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }) : undefined;
    revealElements.forEach((el) => observer ? observer.observe(el) : el.classList.add("in"));

    const header = document.querySelector<HTMLElement>("header");
    const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

    const toggle = document.getElementById("navToggle");
    const links = document.querySelector<HTMLElement>(".nav-links");
    const onToggle = () => links?.classList.toggle("mobile-open");
    const closeMenu = () => links?.classList.remove("mobile-open");
    toggle?.addEventListener("click", onToggle);
    links?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    const faqButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(".faq-q"));
    const onFaq = (event: Event) => {
      const button = event.currentTarget as HTMLButtonElement;
      const item = button.closest<HTMLElement>(".faq-item");
      if (!item) return;
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll<HTMLElement>(".faq-item").forEach((row) => { row.classList.remove("open"); row.querySelector<HTMLElement>(".faq-a")?.style.removeProperty("max-height"); });
      if (!wasOpen) { item.classList.add("open"); const answer = item.querySelector<HTMLElement>(".faq-a"); if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`; }
    };
    faqButtons.forEach((button) => button.addEventListener("click", onFaq));

    const form = document.getElementById("diagForm") as HTMLFormElement | null;
    const onSubmit = (event: Event) => { event.preventDefault(); form?.classList.add("submitted"); };
    form?.addEventListener("submit", onSubmit);

    const light = document.getElementById("themeLight");
    const dark = document.getElementById("themeDark");
    const setLight = () => { document.documentElement.removeAttribute("data-theme"); light?.classList.add("active"); dark?.classList.remove("active"); };
    const setDark = () => { document.documentElement.setAttribute("data-theme", "dark"); dark?.classList.add("active"); light?.classList.remove("active"); };
    light?.addEventListener("click", setLight); dark?.addEventListener("click", setDark);

    return () => { timers.forEach((t) => window.clearTimeout(t)); counterObserver?.disconnect(); observer?.disconnect(); window.removeEventListener("scroll", onScroll); toggle?.removeEventListener("click", onToggle); links?.querySelectorAll("a").forEach((link) => link.removeEventListener("click", closeMenu)); faqButtons.forEach((button) => button.removeEventListener("click", onFaq)); form?.removeEventListener("submit", onSubmit); light?.removeEventListener("click", setLight); dark?.removeEventListener("click", setDark); document.documentElement.removeAttribute("data-theme"); };
  }, []);

  return <div className="rckt-site" dangerouslySetInnerHTML={{ __html: markup }} />;
}
