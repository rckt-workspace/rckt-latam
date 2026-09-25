import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, useSiteMotion } from "@/components/SiteChrome";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SystemSection from "@/components/rckt/SystemSection";
import SystemFinalCta from "@/components/rckt/SystemFinalCta";
import { SectorError } from "@/components/rckt/SectorShortPage";
import { SECTORS } from "@/components/rckt/sectorData";

const SITE_URL = "https://rckt-latam.lovable.app";

const CARDS = [
  ["01", "Salud, estética y odontología", "/sectores/salud-estetica-odontologia", "salud", "Revenue Engine"],
  ["02", "Educación privada", "/sectores/educacion", "educacion", "Revenue Engine"],
  ["03", "Construcción e inmobiliario", "/sectores/construccion-inmobiliario", "construccion", "Revenue Engine + Operations"],
  ["04", "Servicios B2B", "/sectores/servicios-b2b", "b2b", "Revenue Engine"],
  ["05", "Ecommerce", "/sectores/ecommerce", "ecommerce", "Demand System"],
  ["06", "Industria y distribución", "/sectores/industria-distribucion", "industria", "Operations System"],
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
        <SystemPageHero label="Sectores" title={<>Vendemos distinto según cómo vende cada <em>sector</em>.</>} promise="Revenue Systems adaptados a la forma real de vender de cada sector." ctaLabel="Revisar mi proceso comercial →" />
        <SystemSection id="sectores" num="01." label="Seis sectores" title={<>Seis formas de <em className="font-serif-accent">vender</em>.</>} phrase="Elige el tuyo y mira cómo lo medimos del clic al cierre.">
          <div className="sector-index-grid">
            {CARDS.map(([num, name, href, key, sistema]) => {
              const d = SECTORS[key];
              return (
                <article key={href} className="sector-index-card">
                  <div className="sector-index-card__photo">
                    <img src={d.sectorImage} alt={d.sectorImageAlt} loading="lazy" />
                    <span aria-hidden="true" />
                  </div>
                  <div className="sector-index-card__body">
                    <p className="sector-index-card__num">{num}</p>
                    <h3>{name}</h3>
                    <p className="sector-index-card__label">Cómo vende hoy</p>
                    <div className="sector-index-card__steps">
                      {d.funnelStages.map((st, i) => (
                        <span key={st}>{i > 0 ? <em aria-hidden="true">→</em> : null}{st}</span>
                      ))}
                    </div>
                    <p className="sector-index-card__system">Sistema recomendado · <strong>{sistema}</strong></p>
                    <a className="sector-index-card__btn" href={href}>Ver sector →</a>
                  </div>
                </article>
              );
            })}
          </div>
        </SystemSection>
        <SystemFinalCta title={<>Toda cuenta empieza por el <em className="font-serif-accent">diagnóstico</em>.</>} label="Revisar mi proceso comercial →" />
      </main>
      <SiteFooter />
    </div>
  );
}
