import type { CSSProperties } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import heroAsset from "@/assets/rckt-hero.jpg";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

const SITE_URL = "https://rckt-latam.lovable.app";

const incluye = [
  ["01", "Demand", "Tier según inversión."],
  ["02", "Sales Flow", "Ads, WhatsApp y CRM conectados."],
  ["03", "Landing de conversión", "Con tracking y CRM conectados."],
  ["04", "CRM & RevOps", "El proceso comercial en un solo lugar."],
  ["05", "Medición completa", "Del clic al cierre."],
  ["06", "Responsable de cuenta", "Una persona con autoridad."],
  ["07", "Revisión mensual", "Con decisores, no con coordinadores."],
  ["08", "Ciclo de optimización", "90 días."],
] as const;

const escalera = [
  ["01.", "Revenue Diagnostic", "Semanas 0-3."],
  ["02.", "Demand o Revenue Engine", "Meses 1-6."],
  ["03.", "+ Operations", "Meses 6-12."],
  ["04.", "Growth OS", "Destino de cuentas maduras, mes 12 en adelante."],
] as const;

export const Route = createFileRoute("/sistemas/revenue-engine")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Revenue Engine — RCKT" },
      {
        name: "description",
        content:
          "El sistema completo de captación a cierre: Demand, Sales Flow, CRM y medición con un solo responsable.",
      },
      { property: "og:title", content: "Revenue Engine — RCKT" },
      {
        property: "og:description",
        content: "Un solo sistema, un solo responsable y una sola cifra: cuánto cuesta cada cliente nuevo.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sistemas/revenue-engine" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sistemas/revenue-engine" }],
  }),
  component: RevenueEnginePage,
  errorComponent: RevenueEngineError,
  notFoundComponent: () => <RevenueEngineError />,
});

function RevenueEnginePage() {
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
              <h1>El sistema completo de captación a cierre</h1>
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
              <span className="tag">Revenue Engine</span>
              Tu pauta, tu WhatsApp y tu CRM hoy son tres cosas separadas que maneja gente distinta.
              Revenue Engine las convierte en un solo sistema con un solo responsable: nosotros. Tú
              ves una cifra: cuánto te cuesta cada cliente nuevo.
            </div>
          </div>
        </section>

        <section className="band band-alt" id="incluye">
          <div className="container">
            <div className="section-head">
              <span className="num">02.</span>
              <span className="kicker ital-label">Incluye</span>
              <span className="divider"></span>
            </div>
            <div className="lineas-grid rv-group">
              {incluye.map(([n, titulo, texto], i) => (
                <div className="linea-card rv" key={titulo} style={delay(i)}>
                  <span className="num">{n}</span>
                  <h4>{titulo}</h4>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="compromiso">
          <span className="tcn-orb tcn-orb-vacantes" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">03.</span>
              <span className="kicker ital-label">Compromiso mínimo</span>
              <span className="divider"></span>
            </div>
            <div className="juicio rv">
              <span className="tag">Compromiso mínimo</span>6 meses.
            </div>
          </div>
        </section>

        <section className="band band-alt" id="escalera">
          <div className="container">
            <div className="section-head">
              <span className="num">04.</span>
              <span className="kicker ital-label">Escalera de cuenta</span>
              <span className="divider"></span>
            </div>
            <div className="metodo-grid rv-group">
              {escalera.map(([n, titulo, texto], i) => (
                <div className="metodo-step rv" key={titulo} style={delay(i)}>
                  <span className="num">{n}</span>
                  <h4>{titulo}</h4>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
            <p>
              <a href="/nosotros/como-trabajamos">Cómo trabajamos →</a>
            </p>
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

function RevenueEngineError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Revenue Engine</span>
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
