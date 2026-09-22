import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import heroAsset from "@/assets/rckt-hero.jpg";

const SITE_URL = "https://rckt-latam.lovable.app";

const noSomos = [
  "No somos una agencia de pauta que optimiza por costo por lead.",
  "No hacemos webs sueltas, community management ni diseño gráfico por encargo.",
  'No vendemos chatbots ni "IA" como producto.',
  "No prometemos lo que no controlamos: stock, precios, cierre o calidad de atención del cliente.",
] as const;

const siempre = [
  "Una fuente de verdad",
  "IA siempre supervisada, con un documento de una página que dice qué hace sola y qué no",
  "Un responsable con autoridad, no un coordinador",
  "Activos que se documentan y se reutilizan",
  "Transferencia completa desde el primer día",
] as const;

const pilares = [
  ["01.", "SELL BETTER", "Haz que cada oportunidad cuente."],
  ["02.", "THINK BETTER", "Mejores decisiones, mejores resultados."],
  ["03.", "WORK SMARTER", "La tecnología trabaja. El criterio dirige."],
  ["04.", "MOVE FIRST", "Detecta antes. Actúa antes."],
  ["05.", "PROOF > PROMISES", "Resultados que hablan por sí solos."],
] as const;

export const Route = createFileRoute("/nosotros/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Qué es RCKT — Nosotros" },
      {
        name: "description",
        content:
          "RCKT diseña y opera sistemas que convierten demanda en ventas: campañas, conversaciones, CRM e IA supervisada, medidos hasta el ingreso.",
      },
      { property: "og:title", content: "Qué es RCKT — Nosotros" },
      {
        property: "og:description",
        content:
          "Qué somos y qué no, lo que hacemos en toda cuenta y los cinco pilares que dirigen nuestro criterio.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/nosotros" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/nosotros" }],
  }),
  component: NosotrosPage,
  errorComponent: NosotrosError,
  notFoundComponent: () => <NosotrosError />,
});

function NosotrosPage() {
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
              <span className="kicker">Nosotros</span>
              <h1>Qué es RCKT</h1>
              <p className="sub">
                RCKT diseña y opera sistemas que convierten demanda en ventas: campañas,
                conversaciones, CRM e IA supervisada, medidos hasta el ingreso. Del clic al cierre.
              </p>
            </div>
          </div>
        </section>

        <section className="band" id="no-somos">
          <div className="container">
            <div className="section-head">
              <span className="num">01.</span>
              <span className="kicker ital-label">No somos / No hacemos</span>
              <span className="divider"></span>
            </div>
            <div className="three-grid">
              {noSomos.map((item, i) => (
                <div className="linea-card rv" key={item}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-alt" id="siempre">
          <span className="tcn-orb tcn-orb-cultura-left" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">02.</span>
              <span className="kicker ital-label">Lo que hacemos siempre</span>
              <span className="divider"></span>
            </div>
            <h2
              className="rv"
              style={{ fontSize: "clamp(26px,3.4vw,36px)", margin: "0 0 48px", fontWeight: 800 }}
            >
              Lo que hacemos siempre, en toda cuenta
            </h2>
            <div className="three-grid">
              {siempre.map((item, i) => (
                <div className="linea-card rv" key={item}>
                  <span className="num">{String(i + 1).padStart(2, "0")}.</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band" data-mode="motion" id="pilares">
          <div className="container">
            <div className="section-head">
              <span className="num">03.</span>
              <span className="kicker ital-label">Los 5 pilares</span>
              <span className="divider"></span>
            </div>
            <div className="pilares-grid">
              {pilares.map(([n, titulo, texto]) => (
                <div className="three-card rv" key={titulo}>
                  <span className="num">{n}</span>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
            <div className="juicio" style={{ marginTop: 40 }}>
              <span className="tag">En la práctica</span>
              Vender mejor es decirle que no al prospecto que no encaja, aunque duela el mes. Pensar
              mejor es medir antes de tocar nada. Trabajar más inteligente es un proceso a la vez,
              con supervisión, no un chatbot suelto. Movernos primero es que el Diagnostic dure
              semanas, no trimestres. Y la prueba por encima de la promesa es que ningún resultado se
              menciona sin ficha de caso.
            </div>
          </div>
        </section>

        <section className="cta-final">
          <div className="container">
            <span className="kicker">Siguiente paso</span>
            <h2 className="rv">Así trabajamos con cada cuenta.</h2>
            <div className="hero-actions" style={{ justifyContent: "center" }}>
              <a className="btn" href="/nosotros/como-trabajamos">
                Cómo trabajamos →
              </a>
              <a className="btn btn-primary" href="/sistemas/revenue-diagnostic">
                Revisar mi proceso comercial →
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function NosotrosError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Nosotros</span>
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
