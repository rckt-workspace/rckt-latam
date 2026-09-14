import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import heroAsset from "@/assets/rckt-hero.jpg.asset.json";
import logoDarkAsset from "@/assets/rckt-logo-dark.png.asset.json";
import logoLightAsset from "@/assets/rckt-logo-light.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RCKT — Sistemas de crecimiento con IA" },
      { name: "description", content: "Diseñamos y operamos sistemas de marketing con IA ligados a resultados medibles. Empieza con un diagnóstico." },
      { property: "og:title", content: "RCKT — Sistemas de crecimiento con IA" },
      { property: "og:description", content: "Resultados, no horas. Sistemas de medios, creativo, visibilidad en IA y ventas por conversación." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: RcktLanding,
});

const pageMarkup = `
<header>
<div class="container">
<nav>
<a class="logo" href="#top">
<img alt="RCKT" class="logo-light-img" src="__LOGO_DARK__"/>
<img alt="RCKT" class="logo-dark-img" src="__LOGO_LIGHT__"/>
</a>
<div class="nav-links">
<a href="#sistema">Sistema</a>
<a href="#servicios">Servicios</a>
<a href="#metodo">Método</a>
<a href="#faq">FAQ</a>
</div>
<div class="nav-right">
<a class="btn btn-primary btn-sm" href="#contacto">Pedir diagnóstico</a>
<button aria-label="Abrir menú" class="nav-toggle" id="navToggle">
<span></span><span></span><span></span>
</button>
</div>
</nav>
</div>
</header>
<main id="top">
<!-- HERO — layout de la portada del brand deck: foto a la derecha, headline a la izquierda -->
<section class="hero">
<div class="hero-photo"><img src="__HERO__" alt="Profesional de RCKT trabajando con sistemas de crecimiento con IA"/><span class="hero-photo-overlay"></span></div>
<div class="container">
<div class="hero-inner">
<span class="kicker">AI-first growth systems</span>
<h1>Tu marketing no necesita más manos.<br/>Necesita un <em>sistema</em>.</h1>
<p class="sub">Diseñamos y operamos sistemas de crecimiento con IA que trabajan 24/7 — ligados a los resultados que producen, no a las horas que consumen.</p>
<div class="hero-actions">
<a class="btn btn-primary" href="#contacto">Pedir mi diagnóstico →</a>
<a class="btn btn-ghost" href="#servicios">¿Te recomienda la IA? Descúbrelo →</a>
</div>
</div>
</div>
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
<h2 class="rv" style="font-size:clamp(26px,3.4vw,38px); margin:0 0 20px; line-height:1.25; font-weight:800;">El mercado cambió de lado</h2>
<p>La IA absorbió las tareas del marketing: configurar campañas, producir piezas, armar reportes. Lo que quedó al descubierto es la única pregunta que importa: <em>¿quién responde por el resultado?</em> Nosotros. Ese es el modelo.</p>
</div>
<div class="stats">
<div class="stat-row rv">
<span class="stat-num up">+8.6%</span>
<p>crece la inversión publicitaria mundial</p>
</div>
<div class="stat-row rv">
<span class="stat-num">–1.2%</span>
<p>caen los ingresos de quienes venden ejecución</p>
</div>
<div class="stat-row rv">
<span class="stat-num up">73%</span>
<p>de los negocios son invisibles cuando alguien le pregunta a una IA</p>
</div>
</div>
</div>
</div>
</section>
<!-- POR QUE EL TIMING ES NUESTRO -->
<section class="band band-alt" data-mode="motion">
<div class="container">
<div class="section-head">
<span class="num">02.</span>
<span class="kicker ital-label">Por qué el timing es nuestro</span>
<span class="divider"></span>
</div>
<div class="mercado-grid">
<div class="mercado-left">
<h2 class="rv" style="font-size:clamp(26px,3.4vw,36px); margin:0 0 20px; line-height:1.25; font-weight:800;">La ventana se estrecha mes a mes</h2>
<p>La IA agéntica entró en producción real: el coste marginal de producir software y contenido se está colapsando, y cualquier servicio basado en horas tiene que repensar su precio. La oportunidad está en quien diseña los sistemas, no en quien los ejecuta a mano.</p>
</div>
<div class="stats">
<div class="stat-row rv">
<span class="stat-num up">x28</span>
<p>crecen los pull requests completados por agentes de IA en GitHub en diez meses</p>
</div>
<div class="stat-row rv">
<span class="stat-num">44–61%</span>
<p>de adopción de IA en empresas en España — el doble que en 2025</p>
</div>
<div class="stat-row rv">
<span class="stat-num up">2,6x</span>
<p>crecerá la inversión publicitaria en LATAM entre 2025 y 2029</p>
</div>
</div>
</div>
</div>
</section>
<!-- TRES FORMAS DE ENTRAR -->
<section class="band">
<div class="container">
<div class="section-head">
<span class="num">03.</span>
<span class="kicker ital-label">Un sistema operativo de crecimiento</span>
<span class="divider"></span>
</div>
<h2 class="rv" style="font-size:clamp(26px,3.4vw,36px); margin:0 0 56px; max-width:680px; font-weight:800;">Tres formas de entrar</h2>
<div class="three-grid">
<div class="three-card rv">
<span class="num">01.</span>
<h3>Diagnosticar</h3>
<p>Una radiografía en 2–3 semanas: dónde estás perdiendo dinero, qué oportunidades hay y qué arreglar primero, en qué orden.</p>
</div>
<div class="three-card rv">
<span class="num">02.</span>
<h3>Operar</h3>
<p>Nos quedamos manejando los sistemas que hacen crecer el negocio: medios, creativo, visibilidad en IA y ventas por conversación.</p>
</div>
<div class="three-card rv">
<span class="num">03.</span>
<h3>Producto</h3>
<p>Lo que funciona una y otra vez se convierte en producto: se instala en tu negocio y pagas una suscripción. Construido una vez, probado muchas.</p>
</div>
</div>
<div class="juicio">
<span class="tag">Juicio</span>
        Atravesándolo todo, el criterio: qué automatizar, qué no, y en qué orden. La IA no reemplaza el juicio. Lo multiplica.
      </div>
</div>
</section>
<!-- QUE ES RCKT -->
<section class="band band-alt" data-mode="editorial" id="quienes">
<div class="container">
<div class="section-head">
<span class="num">04.</span>
<span class="kicker ital-label">Qué es RCKT</span>
<span class="divider"></span>
</div>
<div class="posn">
<div class="posn-left rv">
<div class="grp no">
<h4>No somos</h4>
<ul>
<li><strong>Una agencia de marketing digital.</strong> Las agencias ejecutan tácticas sueltas — SEO, pauta, redes. Nosotros diseñamos sistemas conectados a revenue.</li>
<li><strong>Una consultora tradicional.</strong> Las consultoras entregan un PowerPoint y se van. Nosotros implementamos y operamos lo que diseñamos.</li>
<li><strong>Un proveedor de herramientas.</strong> No vendemos «usar ChatGPT». Diseñamos arquitecturas de IA agéntica como infraestructura operativa.</li>
</ul>
</div>
</div>
<div class="posn-right rv">
<p>El socio que diseña, implementa y opera sistemas inteligentes de crecimiento — con la profundidad de una consultora top-tier, la velocidad de una startup y el entendimiento cultural de quien piensa en español.</p>
<div class="divider-sm" style="background:var(--mode-accent);"></div>
<p class="cap">La firma nativa de IA para crecimiento<br/>y revenue del mercado hispanohablante</p>
</div>
</div>
<div class="lenguaje">
<div class="lenguaje-col">
<span class="kicker" style="color:var(--mode-accent-deep); display:block; margin-bottom:18px;">Sí decimos</span>
<ul>
<li>Sistemas de crecimiento</li>
<li>Agentes de IA</li>
<li>Socio estratégico</li>
<li>Pipeline, revenue y conversión</li>
</ul>
</div>
<div class="lenguaje-col">
<span class="kicker" style="display:block; margin-bottom:18px;">Nunca decimos</span>
<ul>
<li>Campañas</li>
<li>Herramientas de IA</li>
<li>Agencia o proveedor</li>
<li>Más seguidores o más likes</li>
</ul>
</div>
</div>
</div>
</section>
<!-- SERVICIOS -->
<section class="band" data-mode="motion" id="servicios">
<div class="container">
<div class="section-head">
<span class="num">05.</span>
<span class="kicker ital-label">Servicios · empieza por aquí</span>
<span class="divider"></span>
</div>
<div class="service-lead-grid">
<div class="service-lead rv">
<span class="kicker" style="display:inline-flex; padding:5px 12px; border-radius:999px; background:rgba(var(--mode-glow-rgb),0.22); color:var(--mode-accent-deep); text-transform:uppercase; letter-spacing:.05em; font-size:11.5px; font-weight:700;">D1 — AI Growth Audit</span>
<p class="tag-line">La revisión completa</p>
<p>Auditamos tus anuncios, tus datos, tu web y tu contenido. En 2–3 semanas recibes un informe que cuantifica cuánto dinero estás dejando en la mesa — y un plan priorizado para recuperarlo.</p>
<a class="btn btn-ghost btn-sm" href="#contacto">Empezar por aquí →</a>
</div>
<div class="service-lead rv">
<span class="kicker" style="display:inline-flex; padding:5px 12px; border-radius:999px; background:rgba(var(--mode-glow-rgb),0.22); color:var(--mode-accent-deep); text-transform:uppercase; letter-spacing:.05em; font-size:11.5px; font-weight:700;">D2 — AI Visibility Snapshot</span>
<p class="tag-line">¿La IA te recomienda?</p>
<p>Le preguntamos a ChatGPT, Gemini y Perplexity lo mismo que pregunta tu cliente. Te mostramos, con capturas, si tu marca aparece en las respuestas — y qué hacer si no.</p>
<a class="btn btn-ghost btn-sm" href="#contacto">Quiero mi snapshot →</a>
</div>
</div>
<h2 class="rv" style="font-size:clamp(24px,3vw,32px); margin-bottom:36px; font-weight:800;">Los cuatro sistemas</h2>
<div class="sys-grid">
<div class="sys-card rv">
<span class="sys-id">S1</span>
<h3>Performance Media System</h3>
<p class="tag-line">Anuncios en piloto automático supervisado</p>
<p class="desc">Un sistema vigila y ajusta tu inversión publicitaria 24/7: sube lo que vende, apaga lo que no. Un experto supervisa cada decisión de peso. Y tú lo ves todo en un solo panel: cuánto entra, cuánto sale.</p>
<p class="incluye"><b>Incluye:</b> arquitectura de datos y señales · operación continua multiplataforma · experimentación estructurada · panel único de resultados.</p>
<p class="medida"><b>Se mide en:</b> retorno por cada euro invertido.</p>
</div>
<div class="sys-card rv">
<span class="sys-id">S2</span>
<h3>Creative Performance System</h3>
<p class="tag-line">La fábrica de anuncios</p>
<p class="desc">Decenas de versiones de cada anuncio por semana — distintos mensajes, protagonistas y formatos — con tu marca siempre intacta. Las probamos con público real y escalamos solo las que venden.</p>
<p class="incluye"><b>Incluye:</b> producción con IA (video, imagen, avatares) · sistema de marca · control de calidad humano · testing conectado a la inversión.</p>
<p class="medida"><b>Se mide en:</b> costo por resultado de las piezas ganadoras.</p>
</div>
<div class="sys-card rv">
<span class="sys-id">S3</span>
<h3>AI Visibility System</h3>
<p class="tag-line">Que la IA hable bien de ti</p>
<p class="desc">El nuevo posicionamiento: cuando alguien le pregunta a una IA por tu categoría, tu marca aparece en la respuesta. Trabajamos tu contenido, tu autoridad y tu presencia técnica — y lo mantenemos mes a mes, porque las respuestas de las IAs cambian constantemente.</p>
<p class="incluye"><b>Incluye:</b> contenido que las IAs citan · autoridad ganada en medios · base técnica citable · monitoreo mensual de menciones.</p>
<p class="medida"><b>Se mide en:</b> share of model — cuántas veces te nombra la IA.</p>
</div>
<div class="sys-card rv">
<span class="sys-id">S4</span>
<h3>Conversational Revenue System</h3>
<p class="tag-line">El vendedor que nunca duerme</p>
<p class="desc">Un asistente con lenguaje natural que atiende en tu WhatsApp o tu web como tu mejor vendedor, pero sin horarios: responde al instante, resuelve dudas, agenda, cobra. Y persigue cada compra abandonada con buenos modales hasta recuperarla.</p>
<p class="incluye"><b>Incluye:</b> agente en tu canal (WhatsApp, web, voz) · integración con tu CRM y tus pagos · recuperación de ventas · preparación para el comercio vía asistentes de IA.</p>
<p class="medida"><b>Se mide en:</b> conversaciones convertidas en ventas o citas.</p>
</div>
</div>
<div class="producto-block">
<div>
<span class="kicker" style="display:inline-flex; padding:5px 12px; border-radius:999px; background:rgba(var(--mode-glow-rgb),0.22); color:var(--mode-accent-deep); text-transform:uppercase; letter-spacing:.05em; font-size:11.5px; font-weight:700;">P — Producto</span>
<h3>Software que ya demostró que funciona</h3>
<p>Cuando un sistema funciona una y otra vez, lo enlatamos. Se convierte en un producto que se instala en tu negocio por una suscripción mensual. Sin proyectos eternos.</p>
</div>
<div class="torres">
<div class="torre rv">
<b>T1 — Advisory</b>
<p>Tu director de IA, a tiempo parcial. Decisiones con criterio: qué automatizar, qué comprar, por dónde empezar.</p>
</div>
<div class="torre rv">
<b>T2 — In-housing</b>
<p>Te enseñamos a pescar: montamos la capacidad dentro de tu empresa y entrenamos a tu equipo para operarla.</p>
</div>
<div class="torre rv">
<b>T3 — Compliance</b>
<p>El cinturón de seguridad: todo lo que automatices cumple la ley, en cada país donde operes.</p>
</div>
</div>
</div>
<div class="no-vendemos">
<span class="kicker" style="display:block; margin-bottom:14px;">Lo que no vendemos</span>
<p>No vendemos gestión de redes, contenido por pieza, SEO de palabras clave ni informes mensuales. No porque no sepamos — porque las máquinas ya lo hacen, y cobrártelo por separado sería cobrarte por algo que hoy es casi gratis. Todo eso vive automatizado dentro de los sistemas. <strong>Lo que tú compras es el resultado.</strong></p>
</div>
</div>
</section>
<!-- SEIS LINEAS DE NEGOCIO -->
<section class="band band-alt" data-mode="motion">
<div class="container">
<div class="section-head">
<span class="num">06.</span>
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
<span class="num">07.</span>
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
<p class="lead">Resultados, no horas.</p>
<p>La base cubre la operación; el resto se gana con resultados medibles. Si tú creces, crecemos.</p>
</div>
<div class="principio rv">
<p class="lead">La IA multiplica el criterio, no lo abarata.</p>
<p>Usamos IA en todo — no para cobrarte menos, sino para que el criterio experto llegue donde antes no alcanzaba.</p>
</div>
<div class="principio rv">
<p class="lead">Mostramos, no prometemos.</p>
<p>Números antes que adjetivos. Si no hay dato, hay demo.</p>
</div>
</div>
</div>
</section>
<!-- MANIFIESTO -->
<section class="manifiesto" data-mode="editorial">
<div class="container">
<div class="manifiesto-card rv">
<span class="kicker" style="display:block; margin-bottom:22px;">Manifiesto</span>
<p>Creemos que el crecimiento real nace de la inteligencia aplicada con precisión. No perseguimos clientes — construimos relaciones que se quedan. Medimos todo, prometemos solo lo que entregamos, y entregamos más de lo que prometemos. Trabajamos profundo, donde no se ve, para que los resultados se vean. Nacimos sin fronteras, y crecemos donde el valor es valorado.</p>
</div>
</div>
</section>
<!-- FAQ -->
<section class="band band-alt" data-mode="human" id="faq">
<div class="container">
<div class="section-head">
<span class="num">08.</span>
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
<button class="btn btn-primary" type="submit">Pedir diagnóstico</button>
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
<a class="btn btn-primary" href="#contacto">Pedir diagnóstico →</a>
</div>
</section>
</main>
<footer>
<div class="container">
<div class="footer-top">
<div>
<a class="logo" href="#top">
<img alt="RCKT" class="logo-light-img" src="__LOGO_DARK__"/>
<img alt="RCKT" class="logo-dark-img" src="__LOGO_LIGHT__"/>
</a>
<p>Sistemas de crecimiento con IA. Ligados a resultados, no a horas.</p>
<div class="theme-switch">
<button class="active" id="themeLight">Claro</button>
<button id="themeDark">Oscuro</button>
</div>
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
<li><a href="#">Aviso legal</a></li>
<li><a href="#">Privacidad</a></li>
<li><a href="#">Cookies</a></li>
</ul>
<h5 style="margin-top:26px;">Correo</h5>
<ul><li><a href="mailto:hola@rckt.es">hola@rckt.es</a></li></ul>
</div>
</div>
<div class="footer-bottom">
<span><span class="dot"></span>sistema activo</span>
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
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("in"); observer.unobserve(entry.target); } });
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

    return () => { observer?.disconnect(); window.removeEventListener("scroll", onScroll); toggle?.removeEventListener("click", onToggle); links?.querySelectorAll("a").forEach((link) => link.removeEventListener("click", closeMenu)); faqButtons.forEach((button) => button.removeEventListener("click", onFaq)); form?.removeEventListener("submit", onSubmit); light?.removeEventListener("click", setLight); dark?.removeEventListener("click", setDark); document.documentElement.removeAttribute("data-theme"); };
  }, []);

  return <div className="rckt-site" dangerouslySetInnerHTML={{ __html: markup }} />;
}
