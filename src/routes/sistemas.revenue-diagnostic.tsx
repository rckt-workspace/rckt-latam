import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import DiagnosticForm from "@/components/rckt/DiagnosticForm";
import heroAsset from "@/assets/rckt-hero.jpg";

const SITE_URL = "https://rckt-latam.lovable.app";

// TODO: reemplazar por el número real de WhatsApp Business (formato internacional, sin signos).
const WHATSAPP_NUMBER = "573000000000";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20quiero%20solicitar%20el%20Revenue%20Diagnostic`;

export const Route = createFileRoute("/sistemas/revenue-diagnostic")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Revenue Diagnostic — RCKT" },
      {
        name: "description",
        content:
          "En tres semanas medimos cuánto pierdes entre la campaña y el cierre, en qué punto exacto y qué haríamos en 90 días. La única puerta de entrada a RCKT.",
      },
      { property: "og:title", content: "Revenue Diagnostic — RCKT" },
      {
        property: "og:description",
        content:
          "Diagnóstico de ingresos: mapa de fugas, línea base firmada y roadmap de 90 días priorizado por impacto económico.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sistemas/revenue-diagnostic" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sistemas/revenue-diagnostic" }],
  }),
  component: RevenueDiagnostic,
  errorComponent: RevenueDiagnosticError,
  notFoundComponent: () => <RevenueDiagnosticError />,
});

const incluye = [
  ["01.", "Mapa de fugas", "Con tus números reales, punto por punto del embudo."],
  [
    "02.",
    "Auditoría de adquisición",
    "Oferta, campañas, landing, web y tracking: GTM, GA4, píxel, CAPI, UTMs y conversiones offline.",
  ],
  ["03.", "Auditoría comercial", "CRM y proceso de ventas, de la primera respuesta al cierre."],
  ["04.", "Unit economics", "CAC, MQL, SQL, show rate, close rate y payback."],
  ["05.", "Línea base firmada", "El punto de partida acordado, sin interpretaciones."],
  ["06.", "Roadmap de 90 días", "Priorizado por impacto económico, no por facilidad."],
] as const;

const necesitamos = [
  "Acceso de lectura a Meta, Google, GA4 y GTM",
  "CRM o exportación",
  "Datos de venta del último trimestre",
  "2–3 entrevistas (comercial, mercadeo, operaciones)",
  "Acceso a WhatsApp Business o muestra de conversaciones",
] as const;

const pasos = [
  ["01.", "Diagnostic", "2–3 semanas. Medimos, firmamos línea base y priorizamos."],
  ["02.", "Setup con aceptación", "Implementamos solo lo aprobado, con criterio de éxito escrito."],
  ["03.", "Operación", "Ciclos de 90 días, medidos hasta la venta."],
] as const;

const faqs = [
  ["¿Es gratis?", "No, y eso es parte del filtro."],
  ["¿Cuánto dura?", "2–3 semanas."],
  ["¿Qué pasa después?", "Recomendamos sistema o bundle según la fuga mayor."],
] as const;

function RevenueDiagnostic() {
  const [abierta, setAbierta] = useState<number | null>(null);
  const [listo, setListo] = useState(false);

  useSiteMotion([listo]);

  return (
    <div className="rckt-site tcn-page">
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
              <span className="kicker">Revenue Diagnostic</span>
              <h1>
                Antes de tocar nada, <span className="hero-hand">medimos</span>.
              </h1>
              <p className="sub">Diagnóstico de ingresos — la única puerta de entrada.</p>
            </div>
          </div>
        </section>

        <section className="band" data-mode="editorial">
          <div className="container">
            <div className="section-head">
              <span className="num">01.</span>
              <span className="kicker ital-label">En 30 segundos</span>
              <span className="divider"></span>
            </div>
            <div className="manifiesto rv">
              <div className="manifiesto-card">
                <p>
                  En tres semanas te decimos cuánto pierdes entre la campaña y el cierre, en qué
                  punto exacto, y qué haríamos en 90 días. Si sigues con nosotros, lo que pagas por
                  el diagnóstico se descuenta del sistema.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="band band-alt" id="incluye">
          <span className="tcn-orb tcn-orb-cultura-left" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">02.</span>
              <span className="kicker ital-label">Alcance</span>
              <span className="divider"></span>
            </div>
            <h2
              className="rv"
              style={{ fontSize: "clamp(26px,3.4vw,36px)", margin: "0 0 48px", fontWeight: 800 }}
            >
              Qué incluye
            </h2>
            <div className="three-grid">
              {incluye.map(([n, titulo, texto]) => (
                <div className="three-card rv" key={titulo}>
                  <span className="num">{n}</span>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="container">
            <div className="section-head">
              <span className="num">03.</span>
              <span className="kicker ital-label">Límites</span>
              <span className="divider"></span>
            </div>
            <h2
              className="rv"
              style={{ fontSize: "clamp(26px,3.4vw,36px)", margin: "0 0 24px", fontWeight: 800 }}
            >
              Qué no incluye
            </h2>
            <p className="juicio rv" style={{ maxWidth: 760 }}>
              Implementación, cambios en campañas, desarrollo, configuración de CRM y creatividades.
            </p>
          </div>
        </section>

        <section className="band band-alt">
          <span className="tcn-orb tcn-orb-vacantes" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">04.</span>
              <span className="kicker ital-label">Requisitos</span>
              <span className="divider"></span>
            </div>
            <h2
              className="rv"
              style={{ fontSize: "clamp(26px,3.4vw,36px)", margin: "0 0 48px", fontWeight: 800 }}
            >
              Qué necesitamos de ti
            </h2>
            <div className="three-grid">
              {necesitamos.map((item, i) => (
                <div className="linea-card rv" key={item}>
                  <span className="num">{String(i + 1).padStart(2, "0")}.</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band" data-mode="motion">
          <div className="container">
            <div className="section-head">
              <span className="num">05.</span>
              <span className="kicker ital-label">Método</span>
              <span className="divider"></span>
            </div>
            <h2
              className="rv"
              style={{ fontSize: "clamp(26px,3.4vw,36px)", margin: "0 0 48px", fontWeight: 800 }}
            >
              Cómo empieza
            </h2>
            <div className="metodo-grid">
              {pasos.map(([n, titulo, texto]) => (
                <div className="metodo-step rv" key={titulo}>
                  <span className="num">{n}</span>
                  <h4>{titulo}</h4>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-alt" data-mode="human" id="faq">
          <div className="container">
            <div className="section-head">
              <span className="num">06.</span>
              <span className="kicker ital-label">Preguntas</span>
              <span className="divider"></span>
            </div>
            <div className="faq-list rv">
              {faqs.map(([q, a], i) => (
                <div className={`faq-item${abierta === i ? " open" : ""}`} key={q}>
                  <button
                    className="faq-q"
                    type="button"
                    aria-expanded={abierta === i}
                    onClick={() => setAbierta(abierta === i ? null : i)}
                  >
                    {q}
                    <span className="plus">+</span>
                  </button>
                  <div className="faq-a" style={abierta === i ? { maxHeight: 320 } : undefined}>
                    <p>{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="solicitar">
          <span className="tcn-orb tcn-orb-cta" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">07.</span>
              <span className="kicker ital-label">Solicitar</span>
              <span className="divider"></span>
            </div>
            <h2
              className="rv"
              style={{ fontSize: "clamp(26px,3.4vw,36px)", margin: "0 0 18px", fontWeight: 800 }}
            >
              Solicita tu Revenue Diagnostic
            </h2>
            <p style={{ maxWidth: 680, marginBottom: 36 }}>
              Cuéntanos cómo está hoy tu operación. Con esto preparamos la primera conversación con
              contexto real.
            </p>

            <div className="form-card rv">
              <DiagnosticForm whatsappUrl={WHATSAPP_URL} onSent={() => setListo(true)} />
            </div>
          </div>
        </section>

        <section className="cta-final">
          <div className="container">
            <span className="kicker">Siguiente paso</span>
            <h2 className="rv">Antes de tocar nada, medimos.</h2>
            <a className="btn btn-primary" href="#solicitar">
              Solicitar Revenue Diagnostic →
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function RevenueDiagnosticError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Revenue Diagnostic</span>
            <h1>No pudimos mostrar esta página.</h1>
            <p>Intenta cargarla nuevamente. Si el problema continúa, puedes volver al inicio.</p>
            <div className="form-actions">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => void router.invalidate()}
              >
                Intentar de nuevo
              </button>
              <a className="btn" href="/">
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
