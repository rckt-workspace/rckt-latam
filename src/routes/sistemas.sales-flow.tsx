import type { CSSProperties } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import heroAsset from "@/assets/rckt-hero.jpg";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

const SITE_URL = "https://rckt-latam.lovable.app";

const componentes = [
  [
    "01",
    "Sales Flow núcleo",
    "Ads ↔ WhatsApp Business API ↔ CRM, routing y asignación a asesores, calificación con agente supervisado, SLAs, secuencias, gestión de inasistencia, atribución offline.",
  ],
  [
    "02",
    "Conversational Revenue",
    "Agentes con aprobación humana en toda decisión de venta.",
  ],
  ["03", "CRM & RevOps", "El proceso comercial vive en un solo lugar."],
  [
    "04",
    "Conversion Platforms",
    "Landing, web, ecommerce, siempre con tracking y CRM conectados.",
  ],
] as const;

export const Route = createFileRoute("/sistemas/sales-flow")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Sales Flow — RCKT" },
      {
        name: "description",
        content:
          "De lead a venta sin fugas: pauta, WhatsApp y CRM conectados, con respuesta, seguimiento y dueño para cada prospecto.",
      },
      { property: "og:title", content: "Sales Flow — RCKT" },
      { property: "og:description", content: "La web nunca se vende sola." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sistemas/sales-flow" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sistemas/sales-flow" }],
  }),
  component: SalesFlowPage,
  errorComponent: SalesFlowError,
  notFoundComponent: () => <SalesFlowError />,
});

function SalesFlowPage() {
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
              <h1>De lead a venta sin fugas</h1>
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
              <span className="tag">Sales Flow</span>
              Hoy pagas por un prospecto, te escribe por WhatsApp, y ahí empieza a perderse:
              respuesta tarde, sin seguimiento, fuera del CRM. Sales Flow conecta tu pauta, WhatsApp
              y CRM para que cada prospecto tenga respuesta, seguimiento y dueño —y para que sepas
              cuáles compran.
            </div>
          </div>
        </section>

        <section className="band band-alt" id="componentes">
          <div className="container">
            <div className="section-head">
              <span className="num">02.</span>
              <span className="kicker ital-label">Componentes</span>
              <span className="divider"></span>
            </div>
            <div className="lineas-grid rv-group">
              {componentes.map(([n, titulo, texto], i) => (
                <div className="linea-card rv" key={titulo} style={delay(i)}>
                  <span className="num">{n}</span>
                  <h4>{titulo}</h4>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="regla">
          <span className="tcn-orb tcn-orb-vacantes" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">03.</span>
              <span className="kicker ital-label">Regla</span>
              <span className="divider"></span>
            </div>
            <div className="juicio rv">
              <span className="tag">Regla</span>
              La web nunca se vende sola.
            </div>
            <div className="sol-note rv" style={{ margin: "32px auto 0" }}>
              <p>Esta es la página más visitada desde campañas en Latinoamérica.</p>
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
              <p>Negocios donde la venta pasa por conversación humana.</p>
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

function SalesFlowError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Sales Flow</span>
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
