import type { CSSProperties } from "react";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import { SectorError } from "@/components/rckt/SectorShortPage";
import heroAsset from "@/assets/rckt-hero.jpg";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

const SITE_URL = "https://rckt-latam.lovable.app";

const flujo = ["Meta/Google", "WhatsApp", "Asesora", "Cita", "Venta"] as const;

const duele = [
  "Seguimiento inconsistente entre asesoras.",
  "Inasistencia alta, sin recordatorio ni reprogramación.",
  "No saber qué campaña trajo al paciente que sí compró.",
  "Respuesta lenta a pacientes que preguntan por WhatsApp fuera de horario.",
] as const;

const faqs = [
  [
    "¿Sirve para consultorios pequeños o solo para clínicas grandes?",
    "Sirve para ambos. Lo que cambia es el alcance: en consultorios pequeños el foco está en respuesta y agenda; en clínicas grandes, además, en la coordinación entre asesoras y sedes.",
  ],
  [
    "¿Pueden integrarse con el software de agenda que ya uso?",
    "Sí, siempre que permita integración o exportación de datos. En el diagnóstico revisamos tu agenda actual y definimos cómo conectarla a la fuente de verdad.",
  ],
  [
    "¿Cómo manejan datos sensibles de pacientes?",
    "Con accesos restringidos, registro de quién ve qué y el mínimo dato necesario en cada sistema. La IA opera con reglas escritas y supervisión humana en lo clínico.",
  ],
] as const;

export const Route = createFileRoute("/sectores/salud-estetica-odontologia")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Salud, estética y odontología — RCKT" },
      {
        name: "description",
        content:
          "Revenue Systems para salud, estética y odontología: del clic al paciente que sí llega a la cita.",
      },
      { property: "og:title", content: "Salud, estética y odontología — RCKT" },
      { property: "og:description", content: "Del clic al paciente que sí llega a la cita." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sectores/salud-estetica-odontologia" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sectores/salud-estetica-odontologia" }],
  }),
  component: SaludPage,
  errorComponent: () => <SectorError kicker="Salud, estética y odontología" />,
  notFoundComponent: () => <SectorError kicker="Salud, estética y odontología" />,
});

function SaludPage() {
  useSiteMotion([]);
  const [abierta, setAbierta] = useState<number | null>(null);

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
              <h1>Revenue Systems para salud, estética y odontología</h1>
              <p className="sub">Del clic al paciente que sí llega a la cita.</p>
            </div>
          </div>
        </section>

        <section className="band" data-mode="motion" id="como-vende">
          <span className="tcn-orb tcn-orb-cultura-left" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">01.</span>
              <span className="kicker ital-label">Cómo vende hoy este sector</span>
              <span className="divider"></span>
            </div>
            <div className="metodo-grid rv-group">
              {flujo.map((paso, i) => (
                <div className="metodo-step rv" key={paso} style={delay(i)}>
                  <span className="num">{String(i + 1).padStart(2, "0")}.</span>
                  <h4>{paso}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-alt" data-mode="motion" id="que-le-duele">
          <div className="container">
            <div className="section-head">
              <span className="num">02.</span>
              <span className="kicker ital-label">Qué le duele</span>
              <span className="divider"></span>
            </div>
            <div className="lineas-grid rv-group">
              {duele.map((texto, i) => (
                <div className="linea-card rv" key={texto} style={delay(i)}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="lo-que-hacemos">
          <span className="tcn-orb tcn-orb-cultura-right" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">03.</span>
              <span className="kicker ital-label">Lo que hacemos por este sector</span>
              <span className="divider"></span>
            </div>
            <div className="juicio rv">
              <span className="tag">Revenue Engine</span>
              Sistema recomendado: Revenue Engine, con Sales Flow como componente que más pesa
              (respuesta, agenda y gestión de inasistencia).
            </div>
            <div className="sol-note rv" style={{ marginTop: 28 }}>
              <p>
                Indicador principal: costo por paciente que compra y porcentaje de citas realizadas.
              </p>
            </div>
          </div>
        </section>

        <section className="band band-alt" data-mode="human" id="caso">
          <div className="container">
            <div className="section-head">
              <span className="num">04.</span>
              <span className="kicker ital-label">Un caso</span>
              <span className="divider"></span>
            </div>
            <div className="three-grid">
              <div className="three-card rv">
                <span className="num">01.</span>
                <h3>Caso</h3>
                <p>
                  [ficha completa de un caso del sector, mercado colombiano — pendiente de casos
                  reales]
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="band" data-mode="human" id="faq">
          <div className="container">
            <div className="section-head">
              <span className="num">05.</span>
              <span className="kicker ital-label">Preguntas del sector</span>
              <span className="divider"></span>
            </div>
            <div className="faq-list rv">
              {faqs.map(([q, a], i) => (
                <div className={`faq-item${abierta === i ? " open" : ""}`} key={q}>
                  <button
                    className="faq-q"
                    type="button"
                    aria-expanded={abierta === i}
                    onClick={() => setAbierta(abierta === i ? null : i)}
                  >
                    {q}
                    <span className="plus">+</span>
                  </button>
                  <div className="faq-a" style={abierta === i ? { maxHeight: 320 } : undefined}>
                    <p>{a}</p>
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
            <h2 className="rv">Medimos antes de tocar nada.</h2>
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
