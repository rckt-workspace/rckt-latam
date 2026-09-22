import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import { SectorError } from "@/components/rckt/SectorShortPage";
import heroAsset from "@/assets/rckt-hero.jpg";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

const SITE_URL = "https://rckt-latam.lovable.app";

const sectores = [
  [
    "01",
    "Salud, estética y odontología",
    "Del clic al paciente que sí llega a la cita.",
    "/sectores/salud-estetica-odontologia",
  ],
  [
    "02",
    "Educación privada",
    "De la pauta de temporada a la matrícula firmada.",
    "/sectores/educacion",
  ],
  [
    "03",
    "Construcción e inmobiliario",
    "Del anuncio a la escritura.",
    "/sectores/construccion-inmobiliario",
  ],
  ["04", "Servicios B2B", "De la búsqueda al contrato firmado.", "/sectores/servicios-b2b"],
  ["05", "Ecommerce", "De la pauta al margen, no solo al ROAS.", "/sectores/ecommerce"],
  [
    "06",
    "Industria y distribución",
    "De la cotización al pedido entregado.",
    "/sectores/industria-distribucion",
  ],
] as const;

export const Route = createFileRoute("/sectores/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Sectores — RCKT" },
      {
        name: "description",
        content:
          "Vendemos distinto según cómo vende cada sector: salud, educación, construcción, servicios B2B, ecommerce e industria.",
      },
      { property: "og:title", content: "Sectores — RCKT" },
      {
        property: "og:description",
        content: "Revenue Systems adaptados a la forma real de vender de cada sector.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sectores" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sectores" }],
  }),
  component: SectoresPage,
  errorComponent: () => <SectorError />,
  notFoundComponent: () => <SectorError />,
});

function SectoresPage() {
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
              <span className="kicker">Sectores</span>
              <h1>Vendemos distinto según cómo vende cada sector.</h1>
            </div>
          </div>
        </section>

        <section className="band" data-mode="motion" id="sectores">
          <span className="tcn-orb tcn-orb-cultura-left" aria-hidden="true" />
          <span className="tcn-orb tcn-orb-vacantes" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">01.</span>
              <span className="kicker ital-label">Seis sectores</span>
              <span className="divider"></span>
            </div>
            <div className="sol-cards rv-group">
              {sectores.map(([n, titulo, senal, href], i) => (
                <div className="sol-card rv" key={titulo} style={delay(i)}>
                  <span className="sol-num">{n}</span>
                  <h3>{titulo}</h3>
                  <p>{senal}</p>
                  <div className="sol-links">
                    <a href={href}>Ver sector →</a>
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
