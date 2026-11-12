import { createFileRoute } from "@tanstack/react-router";
import {
  Calculator,
  Check,
  Clock,
  FileSignature,
  FileText,
  Map,
  MessagesSquare,
  Route as RouteIcon,
  Search,
  Target,
  Users,
} from "lucide-react";

import SiteFooter from "@/components/rckt/SiteFooter";
import GeneralCta from "@/components/rckt/GeneralCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import DiagnosticForm from "@/components/rckt/DiagnosticForm";
import { useState } from "react";
import FaqSection, { faqJsonLd } from "@/components/rckt/FaqSection";
import SiteNav from "@/components/rckt/SiteNav";
import { WHATSAPP_URL, WHATSAPP_CONFIGURED } from "@/config/contact";
import { useLanguage } from "@/i18n/LanguageProvider";
import { es } from "@/i18n/es";


const SITE_URL = "https://rckt.lat";

export const Route = createFileRoute("/sistemas/revenue-diagnostic")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Revenue Diagnostic — Tres semanas para saber dónde se pierde tu dinero | RCKT" },
      {
        name: "description",
        content:
          "Diagnóstico de ingresos de 2–3 semanas: mapa de fugas del embudo con tus números reales, línea base firmada y roadmap de 90 días.",
      },
      { property: "og:title", content: "Revenue Diagnostic — Tres semanas para saber dónde se pierde tu dinero" },
      {
        property: "og:description",
        content:
          "Te decimos cuánto pierdes entre la campaña y el cierre, en qué punto exacto, y qué haríamos en 90 días.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sistemas/revenue-diagnostic" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sistemas/revenue-diagnostic" }],
    scripts: [faqJsonLd(es.sistemas.diagnostic.faqs)],
  }),
  component: RevenueDiagnostic,
});

const STATS_BASE = [
  {
    label: "Duración",
    valor: "2–3 semanas",
    Icono: Clock,
    detalle: "de diagnóstico",
  },
  {
    label: "Entregable",
    valor: null,
    Icono: FileText,
    detalle: "Documento, línea base firmada y roadmap de 90 días, presentados en una sesión de 90 minutos",
  },
  {
    label: "Para quién",
    valor: null,
    Icono: Users,
    detalle: "Toda cuenta nueva, sin excepción",
  },
  {
    label: "Qué mide el éxito",
    valor: null,
    Icono: Target,
    detalle: "Que decidas con datos, sigas o no con nosotros",
  },
];

const INCLUYE_BASE = [
  {
    Icono: Map,
    titulo: "Mapa de fugas",
    detalle:
      "Tu embudo con tus números reales: pauta → lead → primera respuesta → calificación → cita → cotización → venta → margen",
  },
  {
    Icono: Search,
    titulo: "Auditoría completa",
    detalle: "Oferta, campañas activas, landing, web y tracking (GTM, GA4, píxel, CAPI)",
  },
  {
    Icono: MessagesSquare,
    titulo: "CRM y proceso comercial",
    detalle: "Cómo se atiende hoy el WhatsApp, quién responde, qué queda en el CRM y qué automatizaciones ya existen",
  },
  {
    Icono: Calculator,
    titulo: "Unit economics",
    detalle: "CAC, tasa MQL/SQL, tasa de asistencia a citas, tasa de cierre, payback",
  },
  {
    Icono: FileSignature,
    titulo: "Línea base firmada",
    detalle: "Documentada y firmada contigo: será la fuente de verdad del contrato",
  },
  {
    Icono: RouteIcon,
    titulo: "Roadmap de 90 días",
    detalle: "Priorizado por impacto económico",
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

function RevenueDiagnostic() {
  const [, setSent] = useState(false);
  const { t } = useLanguage();
  const c = t.sistemas.diagnostic;
  const k = t.sistemas.common;
  const STATS = STATS_BASE.map((s, i) => ({ ...s, ...c.stats[i], valor: c.stats[i].valor || null }));
  const INCLUYE = INCLUYE_BASE.map((s, i) => ({ ...s, ...c.includes[i] }));
  return (
    <div className="rckt-site bg-background text-foreground antialiased">
      <SiteNav />
      <main className="sys-page">
        <SystemPageHero
          label="Revenue Diagnostic"
          title={<>{c.titleBefore}<span className="hero-hand">{c.hand}</span>{c.titleAfter}</>}
          descriptor={c.descriptor}
          quote={c.quote}
          ctaLabel={t.shared.reviewCta}
          ctaHref="#formulario"
        />

        {/* Datos clave — fila de stats */}
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
                      <p className="font-display mt-2 text-[28px] leading-tight font-semibold tracking-tight">
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

        {/* Qué incluye — grid de cards */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 sys-sec sys-sec--warm section--glow" data-corner="tr">
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                {c.includesTitle}
              </h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {INCLUYE.map((c) => (
                <article
                  key={c.titulo}
                  className="rounded-2xl p-6"
                  style={{
                    background: "var(--card-surface)",
                    border: "1px solid rgba(252, 92, 31,0.18)",
                  }}
                >
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ background: "var(--orange-bg)" }}
                  >
                    <c.Icono className="h-5 w-5 text-orange" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="font-display mt-5 text-[18px] leading-snug font-semibold tracking-tight">
                    {c.titulo}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{c.detalle}</p>
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

        {/* Qué necesitamos de ti — checklist */}
        <section className="relative py-16 md:py-24 sys-sec">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="diagnostic-needs-title font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              {c.needsTitle}
            </h2>
            <ul className="diagnostic-needs-list grid gap-5 md:grid-cols-2">
              {c.needs.map((need) => (
                <li key={need} className="flex items-start gap-4">
                  <span
                    className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "var(--orange-bg)" }}
                  >
                    <Check className="h-4 w-4 text-orange" strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <span className="text-[15.5px] leading-relaxed">{need}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Regla */}
        <section className="relative isolate overflow-hidden" >
          <div
            className="relative"
            style={{ background: "linear-gradient(110deg, #fc5c1f 0%, #fc5c1f 100%)" }}
          >
            <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
              <p className="label-orange !text-white/80">{c.ruleLabel}</p>
              <p
                className="mt-5 max-w-4xl text-[24px] leading-[1.25] md:text-[38px]"
                style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic", color: "#f5f2ed" }}
              >
                {c.ruleText}
              </p>
            </div>
          </div>
        </section>

        {/* Formulario */}
        <section
          id="formulario"
          className="relative isolate overflow-hidden scroll-mt-28 py-20 md:py-28 sys-sec sys-sec--warm section--glow" data-corner="bl">
          <div className="relative z-10 mx-auto max-w-4xl px-6">
            <SectionLabel>{c.formLabel}</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[30px] leading-tight font-semibold tracking-tight md:text-[46px]">
                {c.formTitle}
              </h2>
            </div>
            <div className="mt-10">
              <DiagnosticForm source="revenue-diagnostic" consentVersion="RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf" whatsappUrl={WHATSAPP_URL} submitLabel="Revisar mi proceso comercial →" onSent={() => setSent(true)} />
              {WHATSAPP_CONFIGURED && <p className="mt-5 text-sm text-muted-foreground">{c.whatsappBefore}<a className="text-orange hover:underline" href={WHATSAPP_URL}>{c.whatsappLink}</a></p>}
            </div>
          </div>
        </section>

        <FaqSection items={c.faqs} title={t.shared.faqTitle} label={t.shared.faqLabel} />

        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}
