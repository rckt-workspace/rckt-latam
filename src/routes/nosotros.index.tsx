import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Database, Layers, Lock, PackageOpen, ShieldCheck, UserRoundCheck } from "lucide-react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import { CapabilityCards, RuleList } from "@/components/rckt/SystemBlocks";
import SystemFinalCta from "@/components/rckt/SystemFinalCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SystemSection from "@/components/rckt/SystemSection";

const SITE_URL = "https://rckt-latam.lovable.app";

const somos = [
  "Una firma que se hace responsable del resultado comercial, no de una tarea.",
  "Un equipo que conecta lo que el cliente hoy tiene separado: pauta, WhatsApp, web, CRM, ventas y operación.",
  "Una forma de trabajar donde todo se mide hasta la venta, con una sola fuente de verdad que el cliente firma.",
  "IA en cada sistema, siempre con supervisión humana y con un documento que dice qué hace sola y qué no.",
];

const noSomos = [
  "No somos una agencia de pauta que optimiza por costo por lead.",
  "No hacemos webs sueltas, community management ni diseño gráfico por encargo.",
  'No vendemos chatbots ni "IA" como producto.',
  "No prometemos lo que no controlamos: stock, precios, cierre o calidad de atención del cliente.",
];

const pilares = [
  { titulo: "SELL BETTER", detalle: "Haz que cada oportunidad cuente." },
  { titulo: "THINK BETTER", detalle: "Mejores decisiones, mejores resultados." },
  { titulo: "WORK SMARTER", detalle: "La tecnología trabaja. El criterio dirige." },
  { titulo: "MOVE FIRST", detalle: "Detecta antes. Actúa antes." },
  { titulo: "PROOF > PROMISES", detalle: "Resultados que hablan por sí solos." },
];

const principios = [
  {
    icon: <Database size={20} />,
    titulo: "Una fuente de verdad",
    detalle:
      "Un solo modelo de datos: pauta → prospecto → MQL → SQL → cita → oportunidad → venta → margen, con definiciones que el cliente firma.",
  },
  {
    icon: <ShieldCheck size={20} />,
    titulo: "IA supervisada",
    detalle:
      "Cada cuenta documenta qué se automatiza, qué requiere aprobación humana, cómo se detectan fallos y quién interviene.",
  },
  {
    icon: <UserRoundCheck size={20} />,
    titulo: "Un responsable con autoridad",
    detalle:
      "Decide prioridades entre pauta, creatividad, conversión y operación. No coordina: responde por el resultado.",
  },
  {
    icon: <Layers size={20} />,
    titulo: "Activos reutilizables",
    detalle:
      "Conectores, tracking, evaluaciones, playbooks y biblioteca creativa. Lo que se repite se documenta y se versiona.",
  },
  {
    icon: <Lock size={20} />,
    titulo: "Gobierno y seguridad",
    detalle:
      "Accesos, datos personales, consentimiento y cumplimiento local, con apoyo jurídico cuando haga falta.",
  },
  {
    icon: <PackageOpen size={20} />,
    titulo: "Transferencia",
    detalle:
      "Documentación y accesos completos desde el primer día. El cliente puede irse con su sistema.",
  },
];

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
        <SystemPageHero
          label="Nosotros"
          title={
            <>
              Qué es <em>RCKT</em>.
            </>
          }
          descriptor="RCKT diseña y opera sistemas que convierten demanda en ventas: campañas, conversaciones, CRM e IA supervisada, medidos hasta el ingreso."
          promise="Del clic al cierre."
          ctaLabel="Revisar mi proceso comercial →"
        />

        <SystemSection
          num="01."
          label="Manifiesto"
          title={
            <>
              Lo que <em className="font-serif-accent">creemos</em>.
            </>
          }
        >
          <blockquote className="home-proof-quote nosotros-quote">
            Hacemos crecer lo que importa, aplicamos inteligencia con precisión, medimos lo que
            hacemos y construimos relaciones que perduran, porque el verdadero crecimiento no se
            persigue: se diseña, se demuestra y se sostiene.
          </blockquote>
        </SystemSection>

        <SystemSection
          num="02."
          label="En una frase"
          title={
            <>
              Qué hacemos, en una <em className="font-serif-accent">frase</em>.
            </>
          }
          phrase="No vendemos pauta suelta, webs ni chatbots. Diseñamos y operamos el sistema entre la inversión en marketing y la venta."
        />

        <SystemSection
          num="03."
          label="Identidad"
          title={
            <>
              Lo que somos y lo que <em className="font-serif-accent">no</em>.
            </>
          }
        >
          <div className="system-combos__grid">
            <article className="combo-card combo-card--primary">
              <span className="combo-card__badge">Lo que somos</span>
              <RuleList items={somos} />
            </article>
            <article className="combo-card combo-card-light">
              <span className="combo-card__badge combo-card__badge--outline">Lo que no somos</span>
              <RuleList items={noSomos} />
            </article>
          </div>
        </SystemSection>

        <SystemSection
          num="04."
          label="Los 5 pilares"
          title={
            <>
              Cinco <em className="font-serif-accent">pilares</em>.
            </>
          }
        >
          <CapabilityCards items={pilares} />
          <div className="system-highlight" style={{ marginTop: 40 }}>
            <p style={{ fontSize: "clamp(17px,2vw,20px)", fontWeight: 500, lineHeight: 1.6 }}>
              <strong>En la práctica.</strong> Vender mejor es decirle que no al prospecto que no
              encaja, aunque duela el mes. Pensar mejor es medir antes de tocar nada. Trabajar más
              inteligente es un proceso a la vez, con supervisión, no un chatbot suelto. Movernos
              primero es que el Diagnostic dure semanas, no trimestres. Y la prueba por encima de la
              promesa es que ningún resultado se menciona sin ficha de caso.
            </p>
          </div>
        </SystemSection>

        <SystemSection
          num="05."
          label="Principios"
          title={
            <>
              Seis <em className="font-serif-accent">principios</em> que no negociamos.
            </>
          }
        >
          <CapabilityCards items={principios} />
        </SystemSection>

        <SystemSection
          num="06."
          label="A quién servimos"
          title={
            <>
              A quién <em className="font-serif-accent">servimos</em>.
            </>
          }
        >
          <p className="system-section__lead">
            Trabajamos con empresas consolidadas que ya venden, ya invierten en pauta o ventas y
            pierden dinero entre la campaña y el cierre. El tamaño no es un filtro absoluto: una
            empresa de 12 personas con ticket alto y buen margen puede ser mejor cliente que una de
            80 con márgenes bajos.
          </p>
          <article
            className="combo-card combo-card-light nosotros-link-card"
            style={{ marginTop: 40 }}
          >
            <span className="combo-card__badge combo-card__badge--outline">Siguiente</span>
            <h3>Cómo trabajamos</h3>
            <p>Tres modalidades, una base común en toda cuenta y la escalera hasta Growth OS.</p>
            <a href="/nosotros/como-trabajamos" className="combo-card__link">
              Ver cómo trabajamos →
            </a>
          </article>
        </SystemSection>

        <SystemFinalCta />
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
