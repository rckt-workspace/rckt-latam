import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import heroAsset from "@/assets/rckt-hero.jpg";
import { saveDiagnosticLead } from "@/lib/leads-diagnostic.functions";

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

const problemas = ["Captación y cierre", "Ecommerce rentable", "Operación"] as const;

const bandasInversion = [
  "Menos de $5.000.000 COP / mes (≈ USD 1.200)",
  "$5.000.000 – $15.000.000 COP / mes (≈ USD 1.200 – 3.700)",
  "$15.000.000 – $40.000.000 COP / mes (≈ USD 3.700 – 10.000)",
  "$40.000.000 – $100.000.000 COP / mes (≈ USD 10.000 – 25.000)",
  "Más de $100.000.000 COP / mes (≈ USD 25.000+)",
] as const;

const bandasLeads = [
  "Menos de 50 al mes",
  "50 – 200 al mes",
  "200 – 500 al mes",
  "500 – 2.000 al mes",
  "Más de 2.000 al mes",
] as const;

const bandasEmpleados = ["1 – 10", "11 – 50", "51 – 200", "201 – 1.000", "Más de 1.000"] as const;

function RevenueDiagnostic() {
  const [abierta, setAbierta] = useState<number | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const enviar = useServerFn(saveDiagnosticLead);

  useSiteMotion([listo]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();

    try {
      await enviar({
        data: {
          empresa: get("empresa"),
          sitio_web: get("sitio_web"),
          pais: get("pais"),
          ciudad: get("ciudad"),
          cargo: get("cargo"),
          empleados: get("empleados"),
          sector: get("sector"),
          problema_principal: get("problema_principal"),
          inversion_pauta: get("inversion_pauta"),
          volumen_leads: get("volumen_leads"),
          crm_actual: get("crm_actual"),
          whatsapp_ventas: get("whatsapp_ventas"),
          fecha_inicio: get("fecha_inicio"),
          nombre: get("nombre"),
          email: get("email"),
          telefono: get("telefono"),
        },
      });
      setListo(true);
    } catch (err) {
      console.error("No se pudo enviar la solicitud de diagnóstico", err);
      setError("No pudimos enviar tu solicitud. Intenta de nuevo en unos segundos.");
    } finally {
      setEnviando(false);
    }
  }

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
            <div className="faq-list">
              {faqs.map(([q, a], i) => (
                <div className={`faq-item rv${abierta === i ? " open" : ""}`} key={q}>
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
              {listo ? (
                <div role="status">
                  <h3>Recibimos tu solicitud.</h3>
                  <p>Te respondemos en 24–48 horas con los próximos pasos.</p>
                  <a className="btn btn-primary" href={WHATSAPP_URL} target="_blank" rel="noopener">
                    Escribir por WhatsApp →
                  </a>
                </div>
              ) : (
                <form className="rd-form" onSubmit={onSubmit}>
                  <div className="rd-grid">
                    <div className="field">
                      <label htmlFor="empresa">Empresa</label>
                      <input id="empresa" name="empresa" required type="text" />
                    </div>
                    <div className="field">
                      <label htmlFor="sitio_web">Sitio web</label>
                      <input id="sitio_web" name="sitio_web" type="text" />
                    </div>
                    <div className="field">
                      <label htmlFor="pais">País</label>
                      <input id="pais" name="pais" type="text" />
                    </div>
                    <div className="field">
                      <label htmlFor="ciudad">Ciudad</label>
                      <input id="ciudad" name="ciudad" type="text" />
                    </div>
                    <div className="field">
                      <label htmlFor="cargo">Cargo</label>
                      <input id="cargo" name="cargo" type="text" />
                    </div>
                    <div className="field">
                      <label htmlFor="empleados">Número de empleados</label>
                      <select id="empleados" name="empleados" defaultValue="">
                        <option value="">Selecciona</option>
                        {bandasEmpleados.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="sector">Sector</label>
                      <input id="sector" name="sector" type="text" />
                    </div>
                    <div className="field">
                      <label htmlFor="problema_principal">Problema principal</label>
                      <select id="problema_principal" name="problema_principal" defaultValue="">
                        <option value="">Selecciona</option>
                        {problemas.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="inversion_pauta">Inversión mensual en pauta</label>
                      <select id="inversion_pauta" name="inversion_pauta" defaultValue="">
                        <option value="">Selecciona</option>
                        {bandasInversion.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="volumen_leads">Volumen de leads al mes</label>
                      <select id="volumen_leads" name="volumen_leads" defaultValue="">
                        <option value="">Selecciona</option>
                        {bandasLeads.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="crm_actual">CRM actual</label>
                      <input id="crm_actual" name="crm_actual" type="text" />
                    </div>
                    <div className="field">
                      <label htmlFor="whatsapp_ventas">Uso de WhatsApp en ventas</label>
                      <select id="whatsapp_ventas" name="whatsapp_ventas" defaultValue="">
                        <option value="">Selecciona</option>
                        <option value="No lo usamos">No lo usamos</option>
                        <option value="Celulares personales del equipo">
                          Celulares personales del equipo
                        </option>
                        <option value="WhatsApp Business (una línea)">
                          WhatsApp Business (una línea)
                        </option>
                        <option value="API / plataforma conectada al CRM">
                          API / plataforma conectada al CRM
                        </option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="fecha_inicio">Fecha prevista de inicio</label>
                      <input id="fecha_inicio" name="fecha_inicio" type="date" />
                    </div>
                    <div className="field">
                      <label htmlFor="nombre">Nombre</label>
                      <input id="nombre" name="nombre" type="text" />
                    </div>
                    <div className="field">
                      <label htmlFor="email">Email de trabajo</label>
                      <input id="email" name="email" type="email" />
                    </div>
                    <div className="field">
                      <label htmlFor="telefono">Teléfono</label>
                      <input id="telefono" name="telefono" type="tel" />
                    </div>
                  </div>

                  {error && (
                    <p className="form-note" role="alert" style={{ color: "var(--naranja)" }}>
                      {error}
                    </p>
                  )}

                  <div className="submit-row rd-actions">
                    <button className="btn btn-primary" type="submit" disabled={enviando}>
                      {enviando ? "Enviando…" : "Solicitar Revenue Diagnostic →"}
                    </button>
                    <a className="btn btn-primary" href={WHATSAPP_URL} target="_blank" rel="noopener">
                      Escribir por WhatsApp →
                    </a>
                  </div>
                  <span className="form-note">Sin compromiso. Respuesta humana en 24–48 horas.</span>
                </form>
              )}
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
