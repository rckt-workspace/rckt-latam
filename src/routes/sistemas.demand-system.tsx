import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarCheck,
  BarChart3,
  Calendar,
  Layout,
  Megaphone,
  Search,
  Target,
  Users,
  Wand2,
} from "lucide-react";

import SiteFooter from "@/components/rckt/SiteFooter";
import GeneralCta from "@/components/rckt/GeneralCta";
import { AcceptanceSteps, CapabilityCards, RuleList } from "@/components/rckt/SystemBlocks";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import FaqSection, { faqJsonLd } from "@/components/rckt/FaqSection";
import SiteNav from "@/components/rckt/SiteNav";
import { useLanguage } from "@/i18n/LanguageProvider";
import { es } from "@/i18n/es";

const DIAGNOSTIC_FORM = "/sistemas/revenue-diagnostic#formulario";
const SITE_URL = "https://rckt.lat";

export const Route = createFileRoute("/sistemas/demand-system")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Demand System — Generación de demanda medida hasta la venta | RCKT" },
      {
        name: "description",
        content:
          "Campañas optimizadas por oportunidades aceptadas por ventas y por ventas cerradas, no por leads baratos. Embudo completo cada semana.",
      },
      { property: "og:title", content: "Demand System — Generación de demanda medida hasta la venta" },
      {
        property: "og:description",
        content: "Optimizamos por SQL y venta, no por costo por lead. Reporte semanal por etapa del embudo.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sistemas/demand-system" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sistemas/demand-system" }],
    scripts: [faqJsonLd(es.sistemas.demand.faqs)],
  }),
  component: DemandSystemPage,
});

const STATS_BASE = [
  {
    label: "Para quién",
    valor: null as string | null,
    Icono: Users,
    detalle:
      "Empresas con una oferta que ya vende, que necesitan más o mejores oportunidades y ya tienen asesores y CRM funcionando",
  },
  {
    label: "Cadencia",
    valor: null as string | null,
    Icono: Calendar,
    detalle: "Semanal de rendimiento · mensual con decisores · trimestral de estrategia",
  },
  {
    label: "Compromiso mínimo",
    valor: "3 meses",
    Icono: CalendarCheck,
    detalle: "",
  },
  {
    label: "Qué mide el éxito",
    valor: null as string | null,
    Icono: Target,
    detalle:
      "Costo por oportunidad aceptada por ventas (SQL) y por venta — mínimo 45% de leads califican como MQL",
  },
];

const CAPACIDADES_BASE = [
  {
    Icono: Megaphone,
    titulo: "Performance Media",
    detalle: "Meta, Google Search, PMax, LinkedIn selectivo B2B, YouTube y Display en retargeting",
  },
  {
    Icono: Wand2,
    titulo: "Creative Performance",
    detalle: "Piezas producidas y probadas con IA cada semana: ganchos, ángulos y formatos",
  },
  {
    Icono: Search,
    titulo: "Search & AI Visibility",
    detalle: "SEO técnico y de contenido, y presencia en las respuestas de IA con medición trimestral",
  },
  {
    Icono: BarChart3,
    titulo: "Medición",
    detalle: "Tracking completo hasta la venta, valores por etapa y el dato de venta de vuelta a Meta y Google; reporte semanal por etapa del embudo",
  },
  {
    Icono: Layout,
    titulo: "Landing de campaña",
    detalle: "Ajustes y recomendaciones sobre la landing actual (una landing nueva entra en Sales Flow)",
  },
];

const TIERS_BASE = [
  {
    nombre: "Core",
    alcance: "1–2 canales, inversión baja-media",
    detalle: "Media + medición + 4 creativos/mes + reporte semanal",
    destacado: false,
  },
  {
    nombre: "Growth",
    alcance: "2–3 canales, inversión media-alta",
    detalle: "Core + testing creativo continuo + AI Visibility + revisión mensual de la calidad del pipeline con tus asesores",
    destacado: true,
  },
  {
    nombre: "Scale",
    alcance: "Multicanal o multipaís, inversión alta",
    detalle: "Growth + equipo dedicado + experimentación estructurada + estudio creativo",
    destacado: false,
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

function DemandSystemPage() {
  const { t } = useLanguage();
  const c = t.sistemas.demand;
  const k = t.sistemas.common;
  const STATS = STATS_BASE.map((s, i) => ({ ...s, ...c.stats[i], valor: c.stats[i].valor || null }));
  const CAPACIDADES = CAPACIDADES_BASE.map((s, i) => ({ ...s, ...c.capabilities[i] }));
  const TIERS = TIERS_BASE.map((s, i) => ({ ...s, ...c.tiers[i] }));
  return (
    <div className="rckt-site bg-background text-foreground antialiased">
      <SiteNav />
      <main className="sys-page">
        <SystemPageHero
          label="Demand System"
          title={
            <>
              {c.titleBefore}<span className="hero-hand">{c.hand}</span>{c.titleAfter}
            </>
          }
          quote={c.quote}
          ctaLabel={t.shared.reviewCta}
          ctaHref={DIAGNOSTIC_FORM}
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

        {/* Capacidades */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 sys-sec sys-sec--warm section--glow" data-corner="tr">
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>{c.capLabel}</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              {k.whatWeDo}
            </h2>
            <CapabilityCards items={CAPACIDADES} />
          </div>
        </section>

        {/* Tiers */}
        <section className="relative py-16 md:py-24 sys-sec">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>{c.tiersLabel}</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              {c.tiersTitle}
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {TIERS.map((tier) => (
                <article
                  key={tier.nombre}
                  className="relative flex flex-col rounded-2xl p-7"
                  style={{
                    background: tier.destacado ? "var(--orange-bg)" : "rgba(245,242,237,0.6)",
                    border: tier.destacado
                      ? "1.5px solid var(--orange)"
                      : "1px solid rgba(252, 92, 31,0.18)",
                  }}
                >
                  <div className="md:flex md:items-start md:justify-between md:gap-4">
                    <h3 className="font-display text-[22px] leading-none font-semibold tracking-tight md:text-[26px]">
                      {tier.nombre}
                    </h3>
                  </div>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                    {tier.alcance}
                  </p>
                  <p className="mt-5 text-[15px] leading-relaxed">{tier.detalle}</p>
                </article>
              ))}
            </div>
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

        {/* Condiciones de venta */}
        <section className="relative py-16 md:py-24 sys-sec sys-sec--warm section--glow" data-corner="bl">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>{c.conditionsLabel}</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                {c.conditionsTitle}
              </h2>
            </div>
            <RuleList items={c.conditions} />
          </div>
        </section>

        {/* Aceptación */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 sys-sec">
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
