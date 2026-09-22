import type { CSSProperties } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import heroAsset from "@/assets/rckt-hero.jpg";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

const SITE_URL = "https://rckt-latam.lovable.app";

const ecuaciones = [
  ["01.", "Demand System + Sales Flow", "= Revenue Engine"],
  [
    "02.",
    "Revenue Engine + Operations",
    "= Growth OS (solo para cuentas maduras, no se vende de entrada)",
  ],
] as const;

const sistemas = [
  ["01", "Revenue Diagnostic", "Antes de tocar nada, medimos", "/sistemas/revenue-diagnostic"],
  [
    "02",
    "Demand System",
    "Generación de demanda medida hasta la venta",
    "/sistemas/demand-system",
  ],
  ["03", "Sales Flow", "De lead a venta sin fugas", "/sistemas/sales-flow"],
  [
    "04",
    "Operations System",
    "Procesos que se ejecutan solos, con supervisión",
    "/sistemas/operations-system",
  ],
  ["05", "Revenue Engine", "El sistema completo de captación a cierre", "/sistemas/revenue-engine"],
] as const;

export const Route = createFileRoute("/sistemas/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Sistemas — RCKT" },
      {
        name: "description",
        content:
          "Tres sistemas, no más: Demand System, Sales Flow y Operations System. Combinados son Revenue Engine y Growth OS.",
      },
      { property: "og:title", content: "Sistemas — RCKT" },
      {
        property: "og:description",
        content: "Si algo no cabe en uno de los tres, no lo vendemos.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sistemas" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sistemas" }],
  }),
  component: SistemasPage,
  errorComponent: SistemasError,
  notFoundComponent: () => <SistemasError />,
});

function SistemasPage() {
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
              <span className="kicker">Sistemas</span>
              <h1>Tres sistemas, no más.</h1>
              <p className="sub">Si algo no cabe en uno de los tres, no lo vendemos.</p>
            </div>
          </div>
        </section>

        <section className="band" data-mode="motion" id="ecuacion">
          <span className="tcn-orb tcn-orb-cultura-left" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">01.</span>
              <span className="kicker ital-label">Cómo se combinan</span>
              <span className="divider"></span>
            </div>
            <div className="metodo-grid rv-group" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
              {ecuaciones.map(([n, titulo, texto], i) => (
                <div className="metodo-step rv" key={titulo} style={delay(i)}>
                  <span className="num">{n}</span>
                  <h4>{titulo}</h4>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-alt" id="lista">
          <span className="tcn-orb tcn-orb-vacantes" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">02.</span>
              <span className="kicker ital-label">Los sistemas</span>
              <span className="divider"></span>
            </div>
            <div className="sol-cards rv-group">
              {sistemas.map(([n, titulo, senal, href], i) => (
                <div className="sol-card rv" key={titulo} style={delay(i)}>
                  <span className="sol-num">{n}</span>
                  <h3>{titulo}</h3>
                  <p>{senal}</p>
                  <div className="sol-links">
                    <a href={href}>Ver sistema →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-final">
          <span className="tcn-orb tcn-orb-cta" aria-hidden="true" />
          <div className="container">
            <span className="kicker">Siguiente paso</span>
            <h2 className="rv">Toda cuenta empieza por el diagnóstico.</h2>
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

function SistemasError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Sistemas</span>
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
