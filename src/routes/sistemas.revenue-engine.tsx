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
import { REVENUE_ENGINE_FAQS } from "@/content/faqs";
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

export const Route = createFileRoute("/sistemas/revenue-engine")({
  head: () => ({
    meta: [
      { title: "Revenue Engine — El sistema completo de captación a cierre | RCKT.es" },
      {
        name: "description",
        content:
          "Demand System + Sales Flow en un solo sistema con un solo responsable: campañas, WhatsApp y CRM conectados y una sola cifra, el coste por cliente nuevo.",
      },
      { property: "og:title", content: "Revenue Engine — El sistema completo de captación a cierre" },
      {
        property: "og:description",
        content: "Campañas, conversación y CRM como un solo sistema medido del clic al cierre.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/sistemas/revenue-engine" }],
    scripts: [faqJsonLd(REVENUE_ENGINE_FAQS)],
  }),
  component: RevenueEnginePage,
});

const STATS = [
  {
    label: "Para quién",
    Icono: Users,
    detalle: "Negocios de captación y cierre. Salud y estética, educación, inmobiliario, servicios B2B",
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
    detalle: "Coste por cliente adquirido · cuánto vale ese cliente frente a lo que costó traerlo",
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
    detalle: "Tier según inversión en medios",
    href: "/sistemas/demand-system",
  },
  {
    Icono: Workflow,
    titulo: "Sales Flow",
    detalle: "Campañas, WhatsApp y CRM conectados",
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
              El sistema completo de <span className="text-orange">captación a <span className="hero-hand">cierre</span></span>.
            </>
          }
          quote="Tus campañas, tu WhatsApp y tu CRM hoy son tres cosas separadas que gestionan tres personas distintas. Revenue Engine las convierte en un solo sistema con un solo responsable: nosotros. Tú ves una cifra: cuánto te cuesta cada cliente nuevo."
          ctaLabel="Solicitar diagnóstico de captación →"
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
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-140px",
              left: "-160px",
              width: "820px",
              height: "620px",
              zIndex: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse 620px 460px at 0% 100%, rgba(252, 92, 31,0.26) 0%, rgba(252, 92, 31,0.13) 42%, rgba(252, 92, 31,0) 72%)",
            }}
          />
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

        <FaqSection items={REVENUE_ENGINE_FAQS} />

        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}
