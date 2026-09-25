import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarCheck,
  BarChart3,
  CalendarDays,
  Database,
  Megaphone,
  MonitorSmartphone,
  Target,
  UserRound,
  Users,
  Wrench,
  Workflow,
} from "lucide-react";

import SiteFooter from "@/components/rckt/SiteFooter";
import GeneralCta from "@/components/rckt/GeneralCta";
import { AcceptanceSteps, CapabilityCards, RuleList } from "@/components/rckt/SystemBlocks";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import FaqSection, { faqJsonLd } from "@/components/rckt/FaqSection";
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";
const SITE_URL = "https://rckt.lat";

const REVENUE_ENGINE_FAQS = [
  { question: "¿Podemos contratar todo de una vez?", answer: "Growth OS es para cuentas que ya llevan un tiempo con nosotros. Arrancar con todo a la vez es la manera más rápida de no medir nada: empezamos por Revenue Engine y crecemos con datos." },
  { question: "Son más caros que otros.", answer: "Comparado con una agencia de pauta, sí. Comparado con pagar pauta, web, CRM, chatbot y consultor por separado sin que nadie responda por el resultado, no. Y el Diagnostic te dice si el sistema se paga solo antes de comprometerte." },
  { question: "¿Cuál es el compromiso mínimo?", answer: "6 meses. El sistema necesita un ciclo completo para demostrar." },
  { question: "¿Qué voy a ver y cuándo?", answer: "El día 30, el sistema operativo con su fuente de verdad. El día 90, la revisión de la línea base frente al resultado." },
  { question: "¿Me garantizan resultados?", answer: "No garantizamos ventas porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días vas a ver tu embudo completo con datos reales, y que cada decisión que tomemos esté medida hasta la venta." },
];

export const Route = createFileRoute("/sistemas/revenue-engine")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Revenue Engine — El sistema completo de captación a cierre | RCKT" },
      {
        name: "description",
        content:
          "Demand System + Sales Flow en un solo sistema con un solo responsable: campañas, WhatsApp y CRM conectados y una sola cifra, el costo por cliente nuevo.",
      },
      { property: "og:title", content: "Revenue Engine — El sistema completo de captación a cierre" },
      {
        property: "og:description",
        content: "Campañas, conversación y CRM como un solo sistema medido del clic al cierre.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sistemas/revenue-engine" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sistemas/revenue-engine" }],
    scripts: [faqJsonLd(REVENUE_ENGINE_FAQS)],
  }),
  component: RevenueEnginePage,
});

const STATS = [
  {
    label: "Para quién",
    Icono: Users,
    detalle: "Negocios que captan por pauta y cierran por conversación: salud y estética, educación, inmobiliario y servicios B2B",
  },
  {
    label: "Setup",
    Icono: Wrench,
    detalle: "Sales Flow, landing, CRM y tracking. Acredita lo pagado en el Diagnostic",
  },
  {
    label: "Compromiso mínimo",
    Icono: CalendarCheck,
    detalle: "6 meses — el sistema necesita un ciclo completo para demostrar",
  },
  {
    label: "Qué mide el éxito",
    Icono: Target,
    detalle: "Costo por cliente adquirido · cuánto vale ese cliente frente a lo que costó traerlo",
  },
];

const INCLUYE: {
  Icono: typeof Megaphone;
  titulo: string;
  detalle: string;
  href?: string;
}[] = [
  {
    Icono: Megaphone,
    titulo: "Demand System",
    detalle: "Tier según tu inversión en pauta",
    href: "/sistemas/demand-system",
  },
  {
    Icono: Workflow,
    titulo: "Sales Flow",
    detalle: "Pauta, WhatsApp y CRM conectados",
    href: "/sistemas/sales-flow",
  },
  {
    Icono: MonitorSmartphone,
    titulo: "Landing de conversión",
    detalle: "Con tracking y CRM conectados",
  },
  {
    Icono: Database,
    titulo: "CRM & RevOps",
    detalle: "Pipeline, etapas, automatizaciones y dashboards",
  },
  {
    Icono: BarChart3,
    titulo: "Medición completa",
    detalle: "Del clic al cierre, con una sola fuente de verdad",
  },
  {
    Icono: UserRound,
    titulo: "Responsable de cuenta",
    detalle: "Un solo responsable para todo el sistema",
  },
  {
    Icono: CalendarDays,
    titulo: "Revisión mensual con decisores",
    detalle: "Fugas y decisiones del mes",
  },
];

const ESCALERA = [
  { hito: "0–3", label: "Semanas", texto: "Revenue Diagnostic" },
  { hito: "1–6", label: "Meses", texto: "Demand o Revenue Engine" },
  { hito: "6–12", label: "Meses", texto: "+ Operations" },
  { hito: "12+", label: "Meses", texto: "Growth OS: destino de cuentas maduras" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-4 w-[2px] bg-orange" />
      <span className="label-orange">{children}</span>
    </div>
  );
}

function RevenueEnginePage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <main className="sys-page">
        <SystemPageHero
          label="Revenue Engine"
          descriptor="Demand System + Sales Flow · nuestro producto principal"
          title={
            <>
              Pauta, WhatsApp y CRM como un solo <span className="hero-hand">sistema</span>.
            </>
          }
          quote="Hoy una persona maneja la pauta, otra atiende el WhatsApp desde su celular y nadie cruza esos datos con el CRM. Revenue Engine junta el recorrido completo, pauta → WhatsApp → CRM → venta, bajo un solo responsable. Tú ves una cifra: cuánto te cuesta cada cliente nuevo."
          ctaLabel="Revisar mi proceso comercial →"
          ctaHref={DIAGNOSTIC_HREF}
        />

        {/* Stats */}
        <section className="relative py-16 md:py-20 sys-sec">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => {
                const valor = (s as { valor?: string | null }).valor ?? null;
                return (
                  <div key={s.label} className="stat-card">
                    <span className="stat-card__icon">
                      <s.Icono className="h-5 w-5 text-orange" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <p className="font-mono mt-4 text-[11px] tracking-[0.16em] text-orange uppercase">{s.label}</p>
                    {valor ? (
                      <p className="mt-2 text-[16px] leading-[1.55]" style={{ color: "var(--ink)" }}>
                        {valor}
                      </p>
                    ) : null}
                    {s.detalle ? (
                      <p
                        className="mt-2 text-[16px] leading-[1.55]"
                        data-align="left"
                        style={{ textAlign: "left", color: "var(--ink)" }}
                      >
                        {s.detalle}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Qué incluye */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 sys-sec sys-sec--warm section--glow" data-corner="tr">
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>Qué incluye</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                Todo el sistema, un solo responsable.
              </h2>
              <span className="text-sm font-semibold text-orange">un solo responsable</span>
            </div>

            <CapabilityCards compact items={INCLUYE} />
          </div>
        </section>

        <section id="escalera" className="relative isolate overflow-hidden py-16 md:py-24 sys-sec">
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>Cómo empieza</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                Cómo crece una cuenta.
              </h2>
              <span className="text-sm font-semibold text-orange">Cada cuenta sube un peldaño cada 3–6 meses.</span>
            </div>
            <AcceptanceSteps plazo="Escalera de cuenta" items={ESCALERA} />
          </div>
        </section>

        <FaqSection items={REVENUE_ENGINE_FAQS} />

        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}
