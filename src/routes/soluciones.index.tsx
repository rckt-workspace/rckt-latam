import type { CSSProperties } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import heroAsset from "@/assets/rckt-hero.jpg";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

const SITE_URL = "https://rckt-latam.lovable.app";

const soluciones = [
  [
    "01.",
    "Captación y cierre",
    "Pagas por prospectos y no sabes cuáles compran",
    "/soluciones/captacion-y-cierre",
  ],
  [
    "02.",
    "Ecommerce rentable",
    "Inviertes en pauta y no crece con margen",
    "/soluciones/ecommerce-rentable",
  ],
  ["03.", "Operación", "Tu equipo hace lo mismo cien veces por semana", "/soluciones/operacion"],
] as const;

export const Route = createFileRoute("/soluciones/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Soluciones — RCKT" },
      {
        name: "description",
        content:
          "Entras por tu problema, no por el nombre de un sistema: captación y cierre, ecommerce rentable y operación.",
      },
      { property: "og:title", content: "Soluciones — RCKT" },
      {
        property: "og:description",
        content:
          "Tres puertas de entrada según el problema real de tu negocio, medidas del clic al cierre.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/soluciones" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/soluciones" }],
  }),
  component: SolucionesPage,
  errorComponent: SolucionesError,
  notFoundComponent: () => <SolucionesError />,
});

function SolucionesPage() {
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
              <h1>Entras por tu problema, no por el nombre de un sistema.</h1>
            </div>
          </div>
        </section>

        <section className="band" data-mode="motion" id="puertas">
          <span className="tcn-orb tcn-orb-cultura-left" aria-hidden="true" />
          <span className="tcn-orb tcn-orb-vacantes" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">01.</span>
              <span className="kicker ital-label">Tres puertas de entrada</span>
              <span className="divider"></span>
            </div>
            <div className="sol-cards rv-group">
              {soluciones.map(([n, titulo, senal, href], i) => (
                <div
                  className="sol-card rv"
                  key={titulo}
                  style={delay(i)}
                >
                  <span className="sol-num">{n.replace(".", "")}</span>
                  <h3>{titulo}</h3>
                  <p>{senal}</p>
                  <div className="sol-links">
                    <a href={href}>Ver solución →</a>
                    <a className="secondary" href="/sistemas/revenue-diagnostic">
                      Revisar mi proceso comercial →
                    </a>
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
              Revisar mi proceso comercial →
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function SolucionesError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Soluciones</span>
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
