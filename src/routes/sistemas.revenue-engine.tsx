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
import SiteNav from "@/components/rckt/SiteNav";
import { useLanguage } from "@/i18n/LanguageProvider";
import { es } from "@/i18n/es";

const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";
const SITE_URL = "https://rckt.lat";

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
    scripts: [faqJsonLd(es.sistemas.revenueEngine.faqs)],
  }),
  component: RevenueEnginePage,
});

const STATS_BASE = [
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

const INCLUYE_BASE: {
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-4 w-[2px] bg-orange" />
      <span className="label-orange">{children}</span>
    </div>
  );
}

function RevenueEnginePage() {
  const { t } = useLanguage();
  const c = t.sistemas.revenueEngine;
  const STATS = STATS_BASE.map((s, i) => ({ ...s, ...c.stats[i] }));
  const INCLUYE = INCLUYE_BASE.map((s, i) => ({ ...s, ...c.includes[i], linkLabel: t.shared.seeSystem }));
  const ESCALERA = c.ladder;
  return (
    <div className="rckt-site bg-background text-foreground antialiased">
      <SiteNav />
      <main className="sys-page">
        <SystemPageHero
          label="Revenue Engine"
          descriptor={c.descriptor}
          title={
            <>
              {c.titleBefore}<span className="hero-hand">{c.hand}</span>{c.titleAfter}
            </>
          }
          quote={c.quote}
          ctaLabel={t.shared.reviewCta}
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
            <SectionLabel>{c.includesLabel}</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                {c.includesTitle}
              </h2>
              <span className="text-sm font-semibold text-orange">{c.includesTag}</span>
            </div>

            <CapabilityCards compact items={INCLUYE} />
          </div>
        </section>

        <section id="escalera" className="relative isolate overflow-hidden py-16 md:py-24 sys-sec">
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>{c.ladderLabel}</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                {c.ladderTitle}
              </h2>
              <span className="text-sm font-semibold text-orange">{c.ladderTag}</span>
            </div>
            <AcceptanceSteps plazo={c.ladderPlazo} items={ESCALERA} />
          </div>
        </section>

        <FaqSection items={c.faqs} title={t.shared.faqTitle} label={t.shared.faqLabel} />

        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}
