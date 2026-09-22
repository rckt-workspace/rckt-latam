import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import heroAsset from "@/assets/rckt-hero.jpg";

const SITE_URL = "https://rckt-latam.lovable.app";

const tePasa = [
  "Cotizaciones que tardan horas y dependen de una persona.",
  "Datos duplicados entre CRM, ERP y hojas de cálculo.",
  "Reporting manual cada semana.",
  "Errores que se repiten porque nadie los documenta.",
] as const;

export const Route = createFileRoute("/soluciones/operacion")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Operación — RCKT" },
      {
        name: "description",
        content:
          "Tu equipo hace lo mismo cien veces por semana. Operations System: un proceso a la vez, con aprobación humana en lo que importa.",
      },
      { property: "og:title", content: "Operación — RCKT" },
      {
        property: "og:description",
        content:
          "Cotizaciones a mano, documentos que se copian entre sistemas, Excel donde debería haber un proceso.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/soluciones/operacion" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/soluciones/operacion" }],
  }),
  component: OperacionPage,
  errorComponent: OperacionError,
  notFoundComponent: () => <OperacionError />,
});

function OperacionPage() {
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
              <h1>Tu equipo hace lo mismo cien veces por semana</h1>
              <p className="sub">
                Cotizaciones a mano, documentos que se copian entre sistemas, Excel donde debería
                haber un proceso.
              </p>
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

        <section className="band band-alt" id="lo-que-hacemos">
          <div className="container">
            <div className="section-head">
              <span className="num">02.</span>
              <span className="kicker ital-label">Lo que hacemos</span>
              <span className="divider"></span>
            </div>
            <div className="juicio">
              <span className="tag">Operations System</span>
              Un proceso a la vez, Sprint de 6-8 semanas, aprobación humana en lo que importa.
            </div>
          </div>
        </section>

        <section className="band" id="para-quien-no-es">
          <div className="container">
            <div className="section-head">
              <span className="num">03.</span>
              <span className="kicker ital-label">Para quién no es</span>
              <span className="divider"></span>
            </div>
            <p style={{ maxWidth: 680 }}>
              Procesos críticos sin responsable del lado del cliente, o sin datos accesibles.
            </p>
          </div>
        </section>

        <section className="cta-final">
          <div className="container">
            <span className="kicker">Siguiente paso</span>
            <h2 className="rv">Medimos antes de tocar nada.</h2>
            <a className="btn btn-primary" href="/sistemas/revenue-diagnostic">
              Revisar mi proceso →
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function OperacionError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Operación</span>
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
