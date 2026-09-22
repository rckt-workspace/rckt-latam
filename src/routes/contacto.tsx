import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import DiagnosticForm from "@/components/rckt/DiagnosticForm";
import heroAsset from "@/assets/rckt-hero.jpg";

const SITE_URL = "https://rckt-latam.lovable.app";

// TODO: reemplazar por el número real de WhatsApp Business (formato internacional, sin signos).
const WHATSAPP_NUMBER = "573000000000";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20quiero%20revisar%20mi%20proceso%20comercial`;

export const Route = createFileRoute("/contacto")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Contacto — RCKT" },
      {
        name: "description",
        content:
          "Hablemos de tu proceso comercial. Escríbenos por WhatsApp o déjanos el contexto de tu operación en el formulario: llega al mismo lugar.",
      },
      { property: "og:title", content: "Contacto — RCKT" },
      {
        property: "og:description",
        content: "Formulario o WhatsApp — lo que prefieras, llega al mismo lugar.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/contacto" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/contacto" }],
  }),
  component: Contacto,
  errorComponent: ContactoError,
  notFoundComponent: () => <ContactoError />,
});

const datos = [
  ["Correo", "hola@rckt.lat", "mailto:hola@rckt.lat"],
  ["Ubicación", "Bogotá, Colombia", ""],
  ["Horario", "Lun a Vie, 9:00 a. m. – 6:00 p. m. (hora de Bogotá)", ""],
] as const;

function Contacto() {
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
              <span className="kicker">Contacto</span>
              <h1>Hablemos de tu proceso comercial</h1>
              <p className="sub">
                Formulario o WhatsApp — lo que prefieras, llega al mismo lugar.
              </p>
            </div>
          </div>
        </section>

        <section className="band" id="formulario">
          <span className="tcn-orb tcn-orb-cta" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">01.</span>
              <span className="kicker ital-label">Escríbenos</span>
              <span className="divider"></span>
            </div>
            <h2
              className="rv"
              style={{ fontSize: "clamp(26px,3.4vw,36px)", margin: "0 0 18px", fontWeight: 800 }}
            >
              Cuéntanos cómo está hoy tu operación
            </h2>
            <p style={{ maxWidth: 680, marginBottom: 36 }}>
              Con este contexto preparamos la primera conversación con datos reales. Si prefieres
              hablar de una vez, escríbenos por WhatsApp: llega al mismo lugar.
            </p>

            <div className="form-card rv">
              <DiagnosticForm
                whatsappUrl={WHATSAPP_URL}
                submitLabel="Enviar mensaje →"
                legal={
                  <span className="form-note">
                    Al enviar este formulario, aceptas nuestra{" "}
                    <a href="/politica-tratamiento-datos.pdf" download>
                      Política de Tratamiento de Datos
                    </a>
                    .
                  </span>
                }
              />
            </div>
          </div>
        </section>

        <section className="band band-alt" data-mode="editorial">
          <span className="tcn-orb tcn-orb-cultura-left" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">02.</span>
              <span className="kicker ital-label">Datos</span>
              <span className="divider"></span>
            </div>
            <h2
              className="rv"
              style={{ fontSize: "clamp(26px,3.4vw,36px)", margin: "0 0 48px", fontWeight: 800 }}
            >
              Dónde encontrarnos
            </h2>
            <div className="three-grid">
              {datos.map(([titulo, valor, href], i) => (
                <div className="three-card rv" key={titulo}>
                  <span className="num">{String(i + 1).padStart(2, "0")}.</span>
                  <h3>{titulo}</h3>
                  <p>{href ? <a href={href}>{valor}</a> : valor}</p>
                </div>
              ))}
            </div>
            <div className="manifiesto rv" style={{ marginTop: 40 }}>
              <div className="manifiesto-card">
                <p>
                  Al enviar este formulario, aceptas nuestra{" "}
                  <a href="/politica-tratamiento-datos.pdf" download>
                    Política de Tratamiento de Datos
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function ContactoError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Contacto</span>
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
