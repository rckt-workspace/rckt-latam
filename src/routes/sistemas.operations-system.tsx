import type { CSSProperties } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import heroAsset from "@/assets/rckt-hero.jpg";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

const SITE_URL = "https://rckt-latam.lovable.app";

const catalogo = [
  "Cotizaciones desde WhatsApp o correo",
  "Clasificación y respuesta de solicitudes",
  "Generación y verificación de documentos",
  "Sincronización CRM ↔ ERP",
  "Reporting comercial",
  "Atención post-venta de primer nivel",
] as const;

export const Route = createFileRoute("/sistemas/operations-system")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Operations System — RCKT" },
      {
        name: "description",
        content:
          "Procesos que se ejecutan solos, con supervisión: un Operations Sprint de 6-8 semanas y soporte mensual.",
      },
      { property: "og:title", content: "Operations System — RCKT" },
      {
        property: "og:description",
        content:
          "Un proceso repetido cien veces por semana, funcionando solo en ocho semanas, con aprobación humana en lo que importa.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sistemas/operations-system" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sistemas/operations-system" }],
  }),
  component: OperationsPage,
  errorComponent: OperationsError,
  notFoundComponent: () => <OperationsError />,
});

function OperationsPage() {
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
              <span className="kicker">Sistema</span>
              <h1>Procesos que se ejecutan solos, con supervisión</h1>
            </div>
          </div>
        </section>

        <section className="band" data-mode="motion" id="treinta-segundos">
          <span className="tcn-orb tcn-orb-cultura-left" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">01.</span>
              <span className="kicker ital-label">En 30 segundos</span>
              <span className="divider"></span>
            </div>
            <div className="juicio rv">
              <span className="tag">Operations System</span>
              Elegimos un proceso que tu equipo repite cien veces por semana, medimos cuánto cuesta
              hoy, y en ocho semanas lo dejamos funcionando solo, con una persona aprobando lo que
              importa.
            </div>
          </div>
        </section>

        <section className="band band-alt" id="formato">
          <div className="container">
            <div className="section-head">
              <span className="num">02.</span>
              <span className="kicker ital-label">Formato</span>
              <span className="divider"></span>
            </div>
            <div className="sol-note rv">
              <p>Operations Sprint, 6-8 semanas, más soporte mensual.</p>
            </div>
          </div>
        </section>

        <section className="band" id="catalogo">
          <span className="tcn-orb tcn-orb-vacantes" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">03.</span>
              <span className="kicker ital-label">Catálogo de procesos</span>
              <span className="divider"></span>
            </div>
            <div className="lineas-grid rv-group">
              {catalogo.map((texto, i) => (
                <div className="linea-card rv" key={texto} style={delay(i)}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-alt" id="para-quien">
          <div className="container">
            <div className="section-head">
              <span className="num">04.</span>
              <span className="kicker ital-label">Para quién</span>
              <span className="divider"></span>
            </div>
            <div className="sol-note rv">
              <p>
                30-250 empleados, procesos manuales de alto volumen. Habla Operaciones o Tecnología,
                no Mercadeo.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-final">
          <span className="tcn-orb tcn-orb-cta" aria-hidden="true" />
          <div className="container">
            <span className="kicker">Siguiente paso</span>
            <h2 className="rv">Antes de tocar nada, medimos.</h2>
            <a className="btn btn-primary" href="/sistemas/revenue-diagnostic">
              Solicitar Revenue Diagnostic →
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function OperationsError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Operations System</span>
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
