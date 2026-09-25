import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import SolutionCards from "@/components/rckt/SolutionCards";
import GeneralCta from "@/components/rckt/GeneralCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SystemSection from "@/components/rckt/SystemSection";

const SITE_URL = "https://rckt.lat";

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
        <SystemPageHero label="Soluciones" title={<>Entras por <span className="hero-hand">tu problema,</span> no por el nombre de un sistema.</>} context="Toda conversación empieza por tu problema, en tus palabras, nunca por el nombre de un sistema. Cada puerta pasa primero por un Revenue Diagnostic y, si encajas en dos, entras por la que tenga la fuga económica mayor." ctaLabel="Revisar mi proceso comercial →" />
        <section className="relative isolate overflow-hidden py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div className="relative z-10 mx-auto max-w-6xl px-6"><SolutionCards /></div>
        </section>
        <GeneralCta />
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
