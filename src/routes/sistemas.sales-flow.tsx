import { createFileRoute } from "@tanstack/react-router";
import { Calendar, CalendarCheck, Database, Monitor, MessagesSquare, Target, Users, Workflow } from "lucide-react";

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

export const Route = createFileRoute("/sistemas/sales-flow")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Sales Flow — De lead a venta sin fugas | RCKT" },
      {
        name: "description",
        content:
          "Conectamos campañas, WhatsApp y CRM para que cada lead tenga respuesta, seguimiento y dueño, y para que sepas cuáles compran.",
      },
      { property: "og:title", content: "Sales Flow — De lead a venta sin fugas" },
      {
        property: "og:description",
        content: "Integración Ads ↔ WhatsApp ↔ CRM, SLAs de respuesta y atribución offline.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sistemas/sales-flow" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sistemas/sales-flow" }],
    scripts: [faqJsonLd(es.sistemas.salesFlow.faqs)],
  }),
  component: SalesFlowPage,
});

const STATS_BASE = [
  {
    label: "Para quién",
    valor: null as string | null,
    Icono: Users,
    detalle:
      "Negocios que venden por conversación: WhatsApp, llamada, asesora, cita. También si ya tienes quien te maneje la pauta y solo necesitas cerrar mejor.",
  },
  {
    label: "Cadencia",
    valor: null as string | null,
    Icono: Calendar,
    detalle: "Semanal (SLAs y fugas) · mensual con decisores",
  },
  {
    label: "Compromiso mínimo",
    valor: null as string | null,
    Icono: CalendarCheck,
    detalle: "Setup por alcance + 3 meses de operación",
  },
  {
    label: "Qué mide el éxito",
    valor: null as string | null,
    Icono: Target,
    detalle: "% de leads con seguimiento dentro del tiempo acordado · lead → cita · costo por cliente adquirido",
  },
];

const COMPONENTES_BASE = [
  {
    Icono: Workflow,
    titulo: "Sales Flow núcleo",
    detalle:
      "Integración Ads ↔ WhatsApp Business API ↔ CRM; routing y asignación a asesores; calificación automática con agente supervisado y paso a humano; lead scoring; SLAs de respuesta; secuencias de seguimiento y recuperación; recordatorios de cita y gestión de inasistencia; atribución offline de vuelta a Meta y Google",
  },
  {
    Icono: MessagesSquare,
    titulo: "Conversational Revenue",
    detalle:
      "Agentes de WhatsApp y voz que dan la primera respuesta, califican, agendan y resuelven preguntas; las decisiones de venta siempre las aprueba una persona",
  },
  {
    Icono: Database,
    titulo: "CRM & RevOps",
    detalle:
      "Pipeline, etapas y campos ordenados, automatizaciones, dashboards y reglas claras sobre los datos",
  },
  {
    Icono: Monitor,
    titulo: "Conversion Platforms",
    detalle: "Landing, web corporativa o ecommerce, siempre conectados al tracking y al CRM",
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

function SalesFlowPage() {
  const { t } = useLanguage();
  const c = t.sistemas.salesFlow;
  const k = t.sistemas.common;
  const STATS = STATS_BASE.map((s, i) => ({ ...s, ...c.stats[i] }));
  const COMPONENTES = COMPONENTES_BASE.map((s, i) => ({ ...s, ...c.components[i] }));
  return (
    <div className="rckt-site bg-background text-foreground antialiased">
      <SiteNav />
      <main className="sys-page">
        <SystemPageHero
          label="Sales Flow"
          title={
            <>
              {c.titleBefore}<span className="hero-hand">{c.hand}</span>{c.titleAfter}
            </>
          }
          descriptor={c.descriptor}
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

        {/* Clínicas */}
        <section className="relative py-16 md:py-20 sys-sec">
          <div className="mx-auto max-w-6xl px-6">
            <div className="band--orange rounded-[28px] px-8 py-10 md:px-12 md:py-12">
              <p className="label-on-orange">{c.clinicsLabel}</p>
              <h3 className="font-display mt-5 max-w-3xl text-[22px] leading-[1.3] font-semibold tracking-tight md:text-[28px]" style={{ color: "#f5f2ed" }}>
                {c.clinicsTitle}
              </h3>
              <p className="mt-4 max-w-3xl text-[15px] leading-[1.6]" style={{ color: "#f5f2ed" }}>
                {c.clinicsText}
              </p>
              <a className="btn-on-orange font-display inline-block mt-6 rounded-full px-8 py-3 text-[15px] font-semibold" href="/lp/sales-flow-clinicas-bogota">
                {c.clinicsCta}
              </a>
            </div>
          </div>
        </section>

        {/* Componentes */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 sys-sec sys-sec--warm section--glow" data-corner="tr">
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>{c.componentsLabel}</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                {k.whatWeDo}
              </h2>
              <span className="text-sm font-semibold text-orange">{c.componentsTag}</span>
            </div>
            <CapabilityCards items={COMPONENTES} />
            {/* Qué no incluye — integrada en la sección anterior */}
            <div
              className="band--orange mt-10 md:mt-14 rounded-[28px] px-8 py-10 md:px-12 md:py-12"
            >
              <p className="label-on-orange">{k.notIncluded}</p>
              <p
                className="font-display mt-5 max-w-3xl text-[22px] leading-[1.3] font-semibold tracking-tight md:text-[30px]"
                style={{ color: "#f5f2ed" }}
              >
                {c.notIncludedText}
              </p>
            </div>
          </div>
        </section>

        {/* Reglas */}
        <section className="relative py-16 md:py-24 sys-sec">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>{k.rulesLabel}</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                {k.rulesTitle}
              </h2>
              <span className="text-sm font-semibold text-orange">{c.rulesTag}</span>
            </div>
            <RuleList items={c.rules} />
          </div>
        </section>

        {/* Aceptación */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 sys-sec sys-sec--warm section--glow" data-corner="bl">
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>{k.acceptanceLabel}</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              {k.acceptanceTitle}
            </h2>
            <AcceptanceSteps plazo={c.acceptancePlazo} items={c.acceptance.map((texto) => ({ texto }))} />
          </div>
        </section>

        <FaqSection items={c.faqs} title={t.shared.faqTitle} label={t.shared.faqLabel} />

        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}
