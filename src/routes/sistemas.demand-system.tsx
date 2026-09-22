import type { CSSProperties } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import heroAsset from "@/assets/rckt-hero.jpg";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

const SITE_URL = "https://rckt-latam.lovable.app";

const incluye = [
  [
    "01",
    "Performance Media",
    "Meta, Google Search, PMax cuando aplique, LinkedIn selectivo para B2B, retargeting.",
  ],
  ["02", "Creative Performance", "Testing continuo de piezas y mensajes."],
  ["03", "Search & AI Visibility", "Presencia en buscadores y en respuestas generadas con IA."],
  ["04", "Medición completa", "Lectura por etapa, del clic a la venta."],
] as const;

const tiers = [
  ["01.", "Core", "Según canales e inversión en pauta."],
  ["02.", "Growth", "Según canales e inversión en pauta."],
  ["03.", "Scale", "Según canales e inversión en pauta."],
] as const;

export const Route = createFileRoute("/sistemas/demand-system")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Demand System — RCKT" },
      {
        name: "description",
        content:
          "Generación de demanda medida hasta la venta: performance media, creatividad con testing continuo, visibilidad en IA y medición por etapa.",
      },
      { property: "og:title", content: "Demand System — RCKT" },
      {
        property: "og:description",
        content: "Nunca optimizamos por costo por lead; la unidad es SQL o venta.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sistemas/demand-system" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sistemas/demand-system" }],
  }),
  component: DemandPage,
  errorComponent: DemandError,
  notFoundComponent: () => <DemandError />,
});

function DemandPage() {
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
              <h1>Generación de demanda medida hasta la venta</h1>
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
              <span className="tag">Demand System</span>
              Manejamos tu pauta, pero no la optimizamos por leads baratos: la optimizamos por las
              oportunidades que tu equipo comercial acepta y por las que terminan en venta.
            </div>
          </div>
        </section>

        <section className="band band-alt" id="que-incluye">
          <div className="container">
            <div className="section-head">
              <span className="num">02.</span>
              <span className="kicker ital-label">Qué incluye</span>
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

        <section className="band" id="tiers">
          <span className="tcn-orb tcn-orb-vacantes" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">03.</span>
              <span className="kicker ital-label">Tiers</span>
              <span className="divider"></span>
            </div>
            <div className="metodo-grid rv-group" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {tiers.map(([n, titulo, texto], i) => (
                <div className="metodo-step rv" key={titulo} style={delay(i)}>
                  <span className="num">{n}</span>
                  <h4>{titulo}</h4>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-alt" id="no-incluye">
          <div className="container">
            <div className="section-head">
              <span className="num">04.</span>
              <span className="kicker ital-label">Qué no incluye</span>
              <span className="divider"></span>
            </div>
            <div className="sol-note rv">
              <p>El gasto en pauta, desarrollo web, CRM y RevOps, agentes conversacionales.</p>
            </div>
          </div>
        </section>

        <section className="band" id="condicion">
          <div className="container">
            <div className="section-head">
              <span className="num">05.</span>
              <span className="kicker ital-label">Condición de venta</span>
              <span className="divider"></span>
            </div>
            <div className="juicio rv">
              <span className="tag">No negociable</span>
              Nunca optimizamos por costo por lead; la unidad es SQL o venta.
            </div>
          </div>
        </section>

        <section className="band band-alt" id="para-quien">
          <div className="container">
            <div className="section-head">
              <span className="num">06.</span>
              <span className="kicker ital-label">Para quién</span>
              <span className="divider"></span>
            </div>
            <div className="sol-note rv">
              <p>
                Cuentas con oferta probada, proceso comercial y CRM funcionando. Si no los tienes,
                la recomendación es <a href="/sistemas/revenue-engine">Revenue Engine →</a>
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

function DemandError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Demand System</span>
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
