import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import heroAsset from "@/assets/rckt-hero.jpg";

const SITE_URL = "https://rckt-latam.lovable.app";

const tePasa = [
  "Prospectos atendidos por WhatsApp desde el celular de la asesora, sin registro en el CRM.",
  "Inasistencia alta, sin recordatorio de cita.",
  "Tu agencia de pauta optimiza por costo por lead.",
  "Nadie sabe qué campaña trajo al cliente real.",
] as const;

const fugas = [
  "Inversión → lead",
  "Lead → contacto",
  "Contacto → calificación",
  "Calificación → cita",
  "Cita → propuesta",
  "Propuesta → venta",
] as const;

const noventa = [
  ["01.", "Día 30", "Sistema operativo con fuente de verdad."],
  ["02.", "Día 60", "Prospectos entrando al CRM con seguimiento dentro del SLA."],
  ["03.", "Día 90", "Revisión de línea base frente a resultado."],
] as const;

export const Route = createFileRoute("/soluciones/captacion-y-cierre")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Captación y cierre — RCKT" },
      {
        name: "description",
        content:
          "Pagas por prospectos y no sabes cuáles compran. Revenue Engine: un responsable, una fuente de verdad, medición del clic al cierre.",
      },
      { property: "og:title", content: "Captación y cierre — RCKT" },
      {
        property: "og:description",
        content: "Meta dice una cosa; tu cuenta bancaria, otra. Así cerramos las seis fugas.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/soluciones/captacion-y-cierre" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/soluciones/captacion-y-cierre" }],
  }),
  component: CaptacionPage,
  errorComponent: CaptacionError,
  notFoundComponent: () => <CaptacionError />,
});

function CaptacionPage() {
  useSiteMotion([]);

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
              <span className="kicker">Soluciones</span>
              <h1>Pagas por prospectos y no sabes cuáles compran</h1>
              <p className="sub">Meta dice una cosa; tu cuenta bancaria, otra.</p>
            </div>
          </div>
        </section>

        <section className="band" id="te-pasa-esto">
          <div className="container">
            <div className="section-head">
              <span className="num">01.</span>
              <span className="kicker ital-label">Te pasa esto</span>
              <span className="divider"></span>
            </div>
            <div className="lineas-grid">
              {tePasa.map((texto, i) => (
                <div className="linea-card rv" key={texto}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-alt" data-mode="motion" id="fugas">
          <div className="container">
            <div className="section-head">
              <span className="num">02.</span>
              <span className="kicker ital-label">El embudo real</span>
              <span className="divider"></span>
            </div>
            <h2
              className="rv"
              style={{ fontSize: "clamp(26px,3.4vw,36px)", margin: "0 0 20px", fontWeight: 800 }}
            >
              Dónde se pierde
            </h2>
            <p style={{ maxWidth: 680, margin: "0 0 40px" }}>
              Un embudo, seis fugas: inversión → lead → contacto → calificación → cita → propuesta →
              venta.
            </p>
            <div className="metodo-grid">
              {fugas.map((paso, i) => (
                <div className="metodo-step rv" key={paso}>
                  <span className="num">{String(i + 1).padStart(2, "0")}.</span>
                  <h4>{paso}</h4>
                  <p>[cifras del mercado colombiano — pendiente de datos reales]</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="lo-que-hacemos">
          <div className="container">
            <div className="section-head">
              <span className="num">03.</span>
              <span className="kicker ital-label">Lo que hacemos</span>
              <span className="divider"></span>
            </div>
            <div className="juicio">
              <span className="tag">Revenue Engine</span>
              Revenue Engine (Demand + Sales Flow): un responsable, una fuente de verdad, medición
              del clic al cierre.
            </div>
          </div>
        </section>

        <section className="band band-alt" id="noventa-dias">
          <div className="container">
            <div className="section-head">
              <span className="num">04.</span>
              <span className="kicker ital-label">Qué cambia en 90 días</span>
              <span className="divider"></span>
            </div>
            <div className="metodo-grid">
              {noventa.map(([n, titulo, texto]) => (
                <div className="metodo-step rv" key={titulo}>
                  <span className="num">{n}</span>
                  <h4>{titulo}</h4>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band" data-mode="human" id="caso">
          <div className="container">
            <div className="section-head">
              <span className="num">05.</span>
              <span className="kicker ital-label">Un caso</span>
              <span className="divider"></span>
            </div>
            <div className="three-grid">
              <div className="three-card rv">
                <span className="num">01.</span>
                <h3>Caso</h3>
                <p>[ficha completa, mercado colombiano — pendiente de casos reales]</p>
              </div>
            </div>
          </div>
        </section>

        <section className="band band-alt" id="para-quien-no-es">
          <div className="container">
            <div className="section-head">
              <span className="num">06.</span>
              <span className="kicker ital-label">Para quién no es</span>
              <span className="divider"></span>
            </div>
            <p style={{ maxWidth: 680 }}>
              Negocios que aún no venden, sin presupuesto de pauta, o que solo quieren optimizar por
              costo por lead.
            </p>
          </div>
        </section>

        <section className="cta-final">
          <div className="container">
            <span className="kicker">Siguiente paso</span>
            <h2 className="rv">Medimos antes de tocar nada.</h2>
            <a className="btn btn-primary" href="/sistemas/revenue-diagnostic">
              Revisar mi proceso comercial →
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function CaptacionError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Captación y cierre</span>
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
