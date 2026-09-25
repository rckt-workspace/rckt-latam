import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Check, Database, Layers, Lock, PackageOpen, ShieldCheck, UserRoundCheck, X } from "lucide-react";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import GeneralCta from "@/components/rckt/GeneralCta";

const SITE_URL = "https://rckt-latam.lovable.app";
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

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
  ["01", "SELL BETTER", "Haz que cada oportunidad cuente."],
  ["02", "THINK BETTER", "Mejores decisiones, mejores resultados."],
  ["03", "WORK SMARTER", "La tecnología trabaja. El criterio dirige."],
  ["04", "MOVE FIRST", "Detecta antes. Actúa antes."],
  ["05", "PROOF > PROMISES", "Resultados que hablan por sí solos."],
] as const;

const principios = [
  ["01", Database, "Una fuente de verdad", "Un solo modelo de datos: pauta → prospecto → MQL → SQL → cita → oportunidad → venta → margen, con definiciones que el cliente firma."],
  ["02", ShieldCheck, "IA supervisada", "Cada cuenta documenta qué se automatiza, qué requiere aprobación humana, cómo se detectan fallos y quién interviene."],
  ["03", UserRoundCheck, "Un responsable con autoridad", "Decide prioridades entre pauta, creatividad, conversión y operación. No coordina: responde por el resultado."],
  ["04", Layers, "Activos reutilizables", "Conectores, tracking, evaluaciones, playbooks y biblioteca creativa. Lo que se repite se documenta y se versiona."],
  ["05", Lock, "Gobierno y seguridad", "Accesos, datos personales, consentimiento y cumplimiento local, con apoyo jurídico cuando haga falta."],
  ["06", PackageOpen, "Transferencia", "Documentación y accesos completos desde el primer día. El cliente puede irse con su sistema."],
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

function LocalSectionHeader({
  num,
  label,
  title,
  phrase,
}: {
  num: string;
  label: string;
  title: ReactNode;
  phrase?: ReactNode;
}) {
  return (
    <div className="text-left">
      <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="num-orange">{num}</span>
        <div className="rule" />
        <span className="label-orange">{label}</span>
      </div>
      <div className={`grid gap-6 md:items-start md:gap-12 ${phrase ? "md:grid-cols-2" : ""}`}>
        <h2 className="font-display text-3xl leading-tight font-semibold md:text-5xl">{title}</h2>
        {phrase ? <p className="text-sm leading-relaxed text-muted-foreground md:text-base md:pt-2">{phrase}</p> : null}
      </div>
    </div>
  );
}

function NosotrosPage() {
  return (
    <div className="rckt-site tcn-page min-h-screen bg-background text-foreground antialiased">
      <SiteHeader />
      <main>
        <SystemPageHero
          label="Nosotros"
          title={<>Qué es <span className="text-orange">RCKT.</span></>}
          descriptor="RCKT diseña y opera sistemas que convierten demanda en ventas: campañas, conversaciones, CRM e IA supervisada, medidos hasta el ingreso."
          context="Del clic al cierre."
          ctaLabel="Revisar mi proceso comercial →"
          ctaHref={DIAGNOSTIC_HREF}
        />

        <section className="page-section">
          <div className="page-shell">
            <LocalSectionHeader num="01." label="Manifiesto" title="Manifiesto." />
            <article className="manifest-card">
              <span className="manifest-card__quote" aria-hidden="true">“</span>
              <div className="manifest-card__glow" aria-hidden="true" />
              <p>Hacemos crecer lo que importa, aplicamos inteligencia con precisión, medimos lo que hacemos y construimos relaciones que perduran, porque el verdadero crecimiento no se persigue: <span>se diseña, se demuestra y se sostiene.</span></p>
              <footer><i aria-hidden="true" /><span>RCKT · Manifiesto</span></footer>
            </article>
          </div>
        </section>

        <section className="page-section">
          <div className="page-shell">
            <LocalSectionHeader 
              num="02." 
              label="En una frase" 
              title={<>Qué hacemos, en una <em className="font-serif-accent">frase</em>.</>} 
              phrase="No vendemos pauta suelta, webs ni chatbots. Diseñamos y operamos el sistema entre la inversión en marketing y la venta." 
            />
          </div>
        </section>

        <section className="page-section">
          <div className="nos-identity page-shell grid items-stretch gap-6 md:grid-cols-2">
            <div className="nos-identity__yes band--orange rounded-[8px] p-8 md:p-10">
              <h2 className="font-display text-[28px] font-semibold">Lo que somos</h2>
              <ul className="mt-6 space-y-4">{somos.map((text) => <li key={text} className="flex gap-3 leading-relaxed"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" /><span>{text}</span></li>)}</ul>
            </div>
            <div className="nos-identity__no content-card p-8 md:p-10">
              <h2 className="font-display text-[28px] font-semibold">Lo que no somos</h2>
              <ul className="mt-6 space-y-4">{noSomos.map((text) => <li key={text} className="flex gap-3 leading-relaxed text-muted-foreground"><X aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-orange" /><span>{text}</span></li>)}</ul>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="page-shell">
            <LocalSectionHeader num="03." label="Los 5 pilares" title="Los 5 pilares." />
            <div className="pillar-grid mt-10">{pilares.map(([n, title, text]) => <article key={n} className="pillar-item"><span className="pillar-item__number">{n}.</span><h3>{title}</h3><p>{text}</p></article>)}</div>
            <div className="pillar-practice"><span className="section-pill">En la práctica</span><p>Vender mejor es decirle que no al prospecto que no encaja, aunque duela el mes. Pensar mejor es medir antes de tocar nada. Trabajar más inteligente es un proceso a la vez, con supervisión, no un chatbot suelto. Movernos primero es que el Diagnostic dure semanas, no trimestres. Y la prueba por encima de la promesa es que ningún resultado se menciona sin ficha de caso.</p></div>
          </div>
        </section>

        <section className="page-section">
          <div className="page-shell">
            <LocalSectionHeader num="04." label="Principios" title={<>La base común de <span className="text-orange">toda cuenta.</span></>} />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{principios.map(([n, Icon, title, text]) => <article key={n} className="content-card p-7"><div className="flex items-center gap-3"><Icon className="h-6 w-6 text-orange" /><span className="font-display text-[28px] font-semibold text-orange">{n}</span></div><h3 className="font-display mt-4 text-[19px] font-semibold">{title}</h3><p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
          </div>
        </section>

        <section className="page-section">
          <div className="page-shell">
            <LocalSectionHeader num="05." label="A quién servimos" title="A quién servimos." />
            <p className="mt-8 max-w-[900px] text-[18px] leading-[1.7] text-muted-foreground">Trabajamos con empresas consolidadas que ya venden, ya invierten en pauta o ventas y pierden dinero entre la campaña y el cierre. El tamaño no es un filtro absoluto: una empresa de 12 personas con ticket alto y buen margen puede ser mejor cliente que una de 80 con márgenes bajos.</p>
          </div>
        </section>

        <section className="page-section">
          <div className="page-shell">
            <LinkCard 
              title="Cómo trabajamos" 
              text="Tres modalidades, una base común en toda cuenta y la escalera hasta Growth OS." 
              href="/nosotros/como-trabajamos" 
            />
          </div>
        </section>
        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}

function LinkCard({ title, text, href }: { title: string; text: string; href: string }) {
  return <a href={href} className="content-card group flex min-h-[210px] flex-col p-8"><span className="section-pill w-fit">Siguiente</span><h2 className="font-display mt-4 text-[28px] font-semibold">{title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p><span className="mt-auto pt-7 font-semibold text-orange group-hover:underline">Ver más →</span></a>;
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
              <button className="btn btn-primary" type="button" onClick={() => void router.invalidate()}>
                Intentar de nuevo
              </button>
              <a className="btn" href="/">Volver al inicio</a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
