import { createFileRoute } from "@tanstack/react-router";

import ColombiaMap from "@/components/rckt/ColombiaMap";
import GeneralCta from "@/components/rckt/GeneralCta";
import SectionHeader from "@/components/rckt/SectionHeader";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";

const SITE_URL = "https://rckt.lat";

export const Route = createFileRoute("/mercados/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Mercados: dónde opera RCKT | RCKT LATAM" },
      { name: "description", content: "RCKT opera en Latinoamérica desde Colombia, con Bogotá, Medellín y Barranquilla como mercados activos." },
      { property: "og:title", content: "Mercados: dónde opera RCKT | RCKT LATAM" },
      { property: "og:description", content: "Conoce los mercados activos de RCKT en Colombia y Latinoamérica." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/mercados` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/mercados` }],
  }),
  component: MercadosPage,
});

function MercadosPage() {
  return (
    <div className="rckt-site market-page min-h-screen bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="MERCADOS"
          title={<>Dónde <span className="hero-hand">operamos.</span></>}
           context="Operamos en Latinoamérica desde Colombia, con Bogotá, Medellín y Barranquilla como mercados activos."
          ctaLabel="Revisar mi proceso comercial →"
          ctaHref="/sistemas/revenue-diagnostic"
        />

        <section className="page-section">
          <div className="page-shell">
            <SectionHeader num="01." label="Mapa" title="Mercado activo." />
            <div className="market-map-grid mt-10">
              <ColombiaMap />
              <article className="market-feature-card flex flex-col p-7 md:p-8">
                <span className="label-orange">MERCADO ACTIVO · Colombia</span>
                <h2 className="font-display mt-4 text-[18px] font-semibold">Colombia</h2>
                <p className="market-copy mt-3">Equipo y atención activa en tres ciudades.</p>
                <ul className="market-city-links mt-5">
                  <li><a href="/mercados/bogota">Bogotá →</a></li>
                  <li><a href="/mercados/medellin">Medellín →</a></li>
                  <li><a href="/mercados/barranquilla">Barranquilla →</a></li>
                </ul>
                <a href="/mercados/colombia" className="btn-orange font-display mt-8 inline-flex self-start rounded-full px-6 py-3 text-[14px] font-semibold">Ver Colombia →</a>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="page-shell">
            <a href="https://rckt.es" target="_blank" rel="noopener noreferrer" className="market-note group block p-7 md:p-8">
              <span className="label-orange">España</span>
              <h2 className="font-display mt-4 text-[18px] font-semibold">¿Estás en España?</h2>
              <p className="market-copy mt-3">Visita rckt.es, nuestro sitio para España.</p>
              <span className="mt-6 inline-block font-semibold text-orange group-hover:underline">Visitar rckt.es →</span>
            </a>
          </div>
        </section>
        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}