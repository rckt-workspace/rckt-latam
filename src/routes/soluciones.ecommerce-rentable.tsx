import type { CSSProperties } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import heroAsset from "@/assets/rckt-hero.jpg";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

const SITE_URL = "https://rckt-latam.lovable.app";

const tePasa = [
  "Creatividad agotada.",
  "Catálogo sin lectura comercial.",
  "WhatsApp entra en la venta pero nadie lo mide.",
  "El costo de adquisición sube más rápido que el ticket promedio.",
] as const;

const noventa = [
  ["01.", "Testing creativo continuo", "Producción y rotación con criterio, no por intuición."],
  [
    "02.",
    "Medición por margen de contribución",
    "No solo ROAS: el resultado se lee en el margen.",
  ],
  ["03.", "WhatsApp integrado al embudo", "Si aplica, la conversación entra al mismo sistema."],
] as const;

export const Route = createFileRoute("/soluciones/ecommerce-rentable")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Ecommerce rentable — RCKT" },
      {
        name: "description",
        content:
          "Inviertes en pauta y no crece con margen. Demand System con Sales Flow cuando WhatsApp pesa en la conversión.",
      },
      { property: "og:title", content: "Ecommerce rentable — RCKT" },
      {
        property: "og:description",
        content: "El ROAS sube en la plataforma; el margen no sube en el banco.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/soluciones/ecommerce-rentable" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/soluciones/ecommerce-rentable" }],
  }),
  component: EcommercePage,
  errorComponent: EcommerceError,
  notFoundComponent: () => <EcommerceError />,
});

function EcommercePage() {
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
              <h1>Inviertes en pauta y no crece con margen</h1>
              <p className="sub">El ROAS sube en la plataforma; el margen no sube en el banco.</p>
            </div>
          </div>
        </section>

        <section className="band" data-mode="motion" id="te-pasa-esto">
          <span className="tcn-orb tcn-orb-cultura-left" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">01.</span>
              <span className="kicker ital-label">Te pasa esto</span>
              <span className="divider"></span>
            </div>
            <div className="lineas-grid rv-group">
              {tePasa.map((texto, i) => (
                <div className="linea-card rv" key={texto} style={delay(i)}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-alt" id="lo-que-hacemos">
          <span className="tcn-orb tcn-orb-cultura-right" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">02.</span>
              <span className="kicker ital-label">Lo que hacemos</span>
              <span className="divider"></span>
            </div>
            <div className="juicio rv">
              <span className="tag">Demand System</span>
              Demand System, con Sales Flow si WhatsApp pesa en la conversión.
            </div>
          </div>
        </section>

        <section className="band" data-mode="motion" id="noventa-dias">
          <div className="container">
            <div className="section-head">
              <span className="num">03.</span>
              <span className="kicker ital-label">Qué cambia en 90 días</span>
              <span className="divider"></span>
            </div>
            <div className="metodo-grid rv-group">
              {noventa.map(([n, titulo, texto], i) => (
                <div className="metodo-step rv" key={titulo} style={delay(i)}>
                  <span className="num">{n}</span>
                  <h4>{titulo}</h4>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-alt" id="para-quien-no-es">
          <div className="container">
            <div className="section-head">
              <span className="num">04.</span>
              <span className="kicker ital-label">Para quién no es</span>
              <span className="divider"></span>
            </div>
            <div className="sol-note rv">
              <p>
                Tiendas sin margen para sostener pauta, catálogos sin unit economics claras.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-final">
          <span className="tcn-orb tcn-orb-cta" aria-hidden="true" />
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

function EcommerceError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Ecommerce rentable</span>
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
