import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import heroAsset from "@/assets/rckt-hero.jpg";

const SITE_URL = "https://rckt-latam.lovable.app";

const modalidades = [
  ["01.", "Operar", "Por defecto, responsabilidad sobre el resultado."],
  [
    "02.",
    "Sprint",
    "Implementación acotada de 6-8 semanas, alcance y aceptación cerrados antes de empezar.",
  ],
  [
    "03.",
    "Partner",
    "Advisory, in-housing, capacitación o growth lead fraccional para equipos que quieren nuestro método, no nuestra ejecución.",
  ],
] as const;

const base = [
  "Fuente de verdad",
  "IA supervisada",
  "Un responsable con autoridad",
  "Activos reutilizables",
  "Gobierno y seguridad",
  "Transferencia",
] as const;

const escalera = [
  ["01.", "Revenue Diagnostic", "Semanas 0-3."],
  ["02.", "Demand o Revenue Engine", "Meses 1-6."],
  ["03.", "+ Operations", "Meses 6-12."],
  [
    "04.",
    "Growth OS",
    "Mes 12 en adelante, solo con línea base cumplida y un decisor que patrocina.",
  ],
] as const;

export const Route = createFileRoute("/nosotros/como-trabajamos")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Cómo trabajamos — RCKT" },
      {
        name: "description",
        content:
          "Tres modalidades de trabajo, una base común en toda cuenta y la escalera de cuenta: del Revenue Diagnostic al Growth OS.",
      },
      { property: "og:title", content: "Cómo trabajamos — RCKT" },
      {
        property: "og:description",
        content:
          "Operar, Sprint o Partner. Lo que no se negocia en ninguna cuenta y cómo escala el trabajo en el tiempo.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/nosotros/como-trabajamos" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/nosotros/como-trabajamos" }],
  }),
  component: ComoTrabajamosPage,
  errorComponent: ComoTrabajamosError,
  notFoundComponent: () => <ComoTrabajamosError />,
});

function ComoTrabajamosPage() {
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
              <h1>Cómo trabajamos</h1>
              <p className="sub">
                Tres modalidades, una base común y una escalera de cuenta que no se salta pasos.
              </p>
            </div>
          </div>
        </section>

        <section className="band" id="modalidades">
          <div className="container">
            <div className="section-head">
              <span className="num">01.</span>
              <span className="kicker ital-label">Tres modalidades</span>
              <span className="divider"></span>
            </div>
            <div className="three-grid">
              {modalidades.map(([n, titulo, texto]) => (
                <div className="three-card rv" key={titulo}>
                  <span className="num">{n}</span>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-alt" id="base-comun">
          <span className="tcn-orb tcn-orb-cultura-left" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">02.</span>
              <span className="kicker ital-label">Base común</span>
              <span className="divider"></span>
            </div>
            <h2
              className="rv"
              style={{ fontSize: "clamp(26px,3.4vw,36px)", margin: "0 0 24px", fontWeight: 800 }}
            >
              Base común en toda cuenta
            </h2>
            <p style={{ maxWidth: 680, margin: "0 0 40px" }}>No se vende ni se negocia.</p>
            <div className="three-grid">
              {base.map((item, i) => (
                <div className="linea-card rv" key={item}>
                  <span className="num">{String(i + 1).padStart(2, "0")}.</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band" data-mode="motion" id="escalera">
          <div className="container">
            <div className="section-head">
              <span className="num">03.</span>
              <span className="kicker ital-label">Escalera de cuenta</span>
              <span className="divider"></span>
            </div>
            <div className="metodo-grid">
              {escalera.map(([n, titulo, texto]) => (
                <div className="metodo-step rv" key={titulo}>
                  <span className="num">{n}</span>
                  <h4>{titulo}</h4>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-final">
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

function ComoTrabajamosError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Cómo trabajamos</span>
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
