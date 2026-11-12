import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, LayoutGrid, Target, Users } from "lucide-react";

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

export const Route = createFileRoute("/sistemas/operations-system")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Operations System — Procesos que se ejecutan solos | RCKT" },
      {
        name: "description",
        content:
          "Elegimos un proceso repetitivo de alto volumen, medimos su costo y en ocho semanas lo dejamos funcionando solo, con supervisión humana.",
      },
      { property: "og:title", content: "Operations System — Procesos que se ejecutan solos, con supervisión" },
      {
        property: "og:description",
        content: "Sprint de 6–8 semanas con línea base, piloto medido y criterios de aceptación firmados.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sistemas/operations-system" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sistemas/operations-system" }],
    scripts: [faqJsonLd(es.sistemas.operations.faqs)],
  }),
  component: OperationsSystemPage,
});

const STATS_BASE = [
  {
    label: "Para quién",
    Icono: Users,
    detalle:
      "Empresas de 30 a 250 empleados con procesos manuales de alto volumen. La conversación es con operaciones, tecnología o gerencia general, no con mercadeo.",
  },
  {
    label: "Formato",
    Icono: LayoutGrid,
    detalle: "Operations Sprint de 6–8 semanas + soporte mensual",
  },
  {
    label: "Compromiso mínimo",
    Icono: CalendarCheck,
    detalle: "Sprint por alcance · soporte 6 meses",
  },
  {
    label: "Qué mide el éxito",
    Icono: Target,
    detalle: "Costo por ejecución correcta · tiempo de ciclo · tasa de excepciones · horas liberadas",
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

function OperationsSystemPage() {
  const { t } = useLanguage();
  const c = t.sistemas.operations;
  const k = t.sistemas.common;
  const STATS = STATS_BASE.map((s, i) => ({ ...s, ...c.stats[i] }));
  const SPRINT = c.sprint;
  const CATALOGO = c.catalog;
  return (
    <div className="rckt-site bg-background text-foreground antialiased">
      <SiteNav />
      <main className="sys-page">
        <SystemPageHero
          label="Operations System"
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

        {/* Sprint timeline */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 sys-sec sys-sec--warm section--glow" data-corner="tr">
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>{c.sprintLabel}</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                {c.sprintTitle}
              </h2>
              <span className="text-sm font-semibold text-orange">{c.sprintTag}</span>
            </div>

            {/* Desktop: horizontal */}
            <div className="relative mt-14 hidden md:block">
              <div
                aria-hidden="true"
                className="absolute top-[5px] right-0 left-0 h-px"
                style={{ background: "rgba(252, 92, 31,0.35)" }}
              />
              <div className="grid grid-cols-4 gap-8">
                {SPRINT.map((s) => (
                  <div key={s.titulo} className="relative pr-4">
                    <span
                      className="absolute top-0 left-0 block h-[11px] w-[11px] rounded-full"
                      style={{ background: "var(--orange)" }}
                      aria-hidden="true"
                    />
                    <p className="label-orange mt-8">{s.rango}</p>
                    <h3 className="font-display mt-3 text-[18px] leading-snug font-semibold tracking-tight">
                      {s.titulo}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{s.detalle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Móvil: vertical */}
            <div className="relative mt-10 md:hidden">
              <div
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-[5px] w-px"
                style={{ background: "rgba(252, 92, 31,0.35)" }}
              />
              <div className="flex flex-col gap-9">
                {SPRINT.map((s) => (
                  <div key={s.titulo} className="relative pl-8">
                    <span
                      className="absolute top-[6px] left-0 block h-[11px] w-[11px] rounded-full"
                      style={{ background: "var(--orange)" }}
                      aria-hidden="true"
                    />
                    <p className="label-orange">{s.rango}</p>
                    <h3 className="font-display mt-2 text-[18px] leading-snug font-semibold tracking-tight">
                      {s.titulo}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{s.detalle}</p>
                  </div>
                ))}
              </div>
            </div>

            <p
              className="mt-12 max-w-2xl text-[17px] leading-relaxed md:text-[19px]"
              style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic" }}
            >
              {c.sprintNote}
            </p>
          </div>
        </section>

        {/* Catálogo de procesos */}
        <section className="relative py-16 md:py-24 sys-sec">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>{c.catalogLabel}</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                {c.catalogTitle}
              </h2>
              <span className="text-sm font-semibold text-orange">{c.catalogTag}</span>
            </div>
            <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-muted-foreground">
              {c.catalogIntro}
            </p>

            {/* Desktop: tabla */}
            <div className="mt-10 hidden md:block">
              <div
                className="grid grid-cols-[1.1fr_1.3fr_1fr] gap-8 pb-4 font-mono text-[11px] tracking-[0.16em] uppercase text-orange"
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <span>{c.colProcess}</span>
                <span>{c.colAgent}</span>
                <span>{c.colHuman}</span>
              </div>
              {CATALOGO.map((r) => (
                <div
                  key={r.proceso}
                  className="grid grid-cols-[1.1fr_1.3fr_1fr] gap-8 py-5 text-[15px] leading-relaxed"
                  style={{ borderBottom: "1px solid var(--line)" }}
                >
                  <span className="font-semibold">{r.proceso}</span>
                  <span className="text-muted-foreground">{r.agente}</span>
                  <span className="text-muted-foreground">{r.humano}</span>
                </div>
              ))}
            </div>

            {/* Móvil: bloques */}
            <div className="mt-8 md:hidden">
              {CATALOGO.map((r) => (
                <div key={r.proceso} className="py-6" style={{ borderTop: "1px solid var(--line)" }}>
                  <h3 className="font-display text-[17px] leading-snug font-semibold tracking-tight">
                    {r.proceso}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                    <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-orange">{c.agentPrefix}</span>
                    {r.agente}
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                    <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-orange">{c.humanPrefix}</span>
                    {r.humano}
                  </p>
                </div>
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

        {/* Reglas */}
        <section className="relative py-16 md:py-24 sys-sec sys-sec--warm section--glow" data-corner="bl">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>{k.rulesLabel}</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              {k.rulesTitle}
            </h2>
            <RuleList items={c.rules} />
          </div>
        </section>

        {/* Aceptación */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 sys-sec">
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>{k.acceptanceLabel}</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              {k.acceptanceTitle}
            </h2>
            <AcceptanceSteps items={c.acceptance.map((texto) => ({ texto }))} />
          </div>
        </section>

        <FaqSection items={c.faqs} title={t.shared.faqTitle} label={t.shared.faqLabel} />

        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}
