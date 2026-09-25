import { createFileRoute, useRouter } from "@tanstack/react-router";
import { FileText, MessageCircle } from "lucide-react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import DiagnosticForm from "@/components/rckt/DiagnosticForm";
import SystemPageHero from "@/components/rckt/SystemPageHero";

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
    <div className="rckt-site contacto-page">
      <main id="top">
        <SystemPageHero
          label="Contacto"
          title={<>Cuéntanos cómo está hoy tu <em>operación.</em></>}
          descriptor="Formulario o WhatsApp — lo que prefieras, llega al mismo lugar."
          promise="Con este contexto preparamos la primera conversación con datos reales."
          ctaLabel="Ir al formulario →"
          ctaHref="#formulario"
        />

        <section className="contacto-main" id="formulario">
          <div className="container contacto-layout">
            <div className="contacto-form">
              <div className="form-card">
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

            <aside className="contacto-channels">
              <div className="contacto-channels__sticky">
                <h2>Otras formas de hablar <em>con nosotros.</em></h2>

                <div className="contacto-channel-list">
                  <div className="contacto-channel">
                    <span className="contacto-channel__icon" aria-hidden="true">
                      <FileText />
                    </span>
                    <div>
                      <div className="contacto-channel__heading">
                        <h3>Formulario</h3>
                        <span className="contacto-channel__badge">RECOMENDADO</span>
                      </div>
                      <p>La vía principal. Es la más rápida para preparar el diagnóstico.</p>
                    </div>
                  </div>

                  <div className="contacto-channel contacto-channel--divided">
                    <span className="contacto-channel__icon" aria-hidden="true">
                      <MessageCircle />
                    </span>
                    <div>
                      <h3>WhatsApp</h3>
                      <p>Si lo prefieres, escríbenos.</p>
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        Escribir por WhatsApp →
                      </a>
                    </div>
                  </div>
                </div>

                <dl className="contacto-data-card">
                  <div className="contacto-data-card__label">Datos</div>
                  {datos.map(([titulo, valor, href]) => (
                    <div key={titulo}>
                      <dt>{titulo}</dt>
                      <dd>{href ? <a href={href}>{valor}</a> : valor}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
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
