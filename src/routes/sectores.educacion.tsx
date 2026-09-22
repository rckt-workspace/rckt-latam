import type { CSSProperties } from "react";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import { SectorError } from "@/components/rckt/SectorShortPage";
import heroAsset from "@/assets/rckt-hero.jpg";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

const SITE_URL = "https://rckt-latam.lovable.app";

const flujo = [
  "Google/Meta",
  "Prospecto",
  "WhatsApp o llamada",
  "Asesor de admisiones",
  "Matrícula",
] as const;

const duele = [
  "Volumen alto de leads sin calificación real.",
  "Picos de temporada que saturan al equipo de admisiones.",
  "Seguimiento que se pierde entre el primer contacto y la matrícula.",
  "Dificultad para medir qué campaña trae familias que sí matriculan.",
] as const;

const faqs = [
  [
    "¿Cómo manejan los picos de temporada de matrículas?",
    "Con secuencias y reglas de respuesta preparadas antes del pico: priorización de prospectos, respuesta inmediata fuera de horario y seguimiento automático supervisado por el equipo.",
  ],
  [
    "¿Se integra con el sistema académico que ya usamos?",
    "Sí, si permite integración o exportación. En el diagnóstico revisamos el sistema actual y definimos cómo conectar admisiones con la fuente de verdad.",
  ],
  [
    "¿Funciona para colegios, no solo universidades?",
    "Sí. El ciclo cambia, pero la estructura es la misma: campaña, conversación, calificación, seguimiento y matrícula medida hasta el ingreso.",
  ],
] as const;

export const Route = createFileRoute("/sectores/educacion")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Educación privada — RCKT" },
      {
        name: "description",
        content:
          "Revenue Systems para educación privada: de la pauta de temporada de matrículas a la matrícula firmada.",
      },
      { property: "og:title", content: "Educación privada — RCKT" },
      {
        property: "og:description",
        content: "De la pauta de temporada de matrículas a la matrícula firmada.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sectores/educacion" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sectores/educacion" }],
  }),
  component: EducacionPage,
  errorComponent: () => <SectorError kicker="Educación privada" />,
  notFoundComponent: () => <SectorError kicker="Educación privada" />,
});

function EducacionPage() {
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
              <h1>Revenue Systems para educación privada</h1>
              <p className="sub">De la pauta de temporada de matrículas a la matrícula firmada.</p>
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
              Sistema recomendado: Revenue Engine, con Sales Flow ajustado a secuencias por
              temporada.
            </div>
            <div className="sol-note rv" style={{ marginTop: 28 }}>
              <p>Indicador principal: costo por matrícula y conversión de lead a matrícula.</p>
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
