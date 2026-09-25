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
const DIAGNOSTIC_FORM = "/sistemas/revenue-diagnostic#formulario";
const SITE_URL = "https://rckt.lat";

const DEMAND_SYSTEM_FAQS = [
  { question: "Solo quiero que me manejen la pauta.", answer: "Podemos, si ya tienes CRM y proceso comercial funcionando. Si no, vas a pagar leads que se pierden después. Empecemos por el Diagnostic y te decimos con datos qué necesitas." },
  { question: "Mi agencia actual me da leads a la mitad de precio.", answer: "¿Y cuántos de esos leads compran? Si no lo sabes, ese es el problema, no el precio del lead. Optimizamos por venta, no por lead, y por eso el costo por lead puede ser mayor." },
  { question: "¿Cuál es el compromiso mínimo?", answer: "3 meses. La pauta se paga aparte, en tus propias cuentas publicitarias." },
  { question: "¿Qué necesitan de mí para empezar?", answer: "Acceso de administrador a tus cuentas publicitarias, GTM y GA4, aprobación de creatividades en menos de 48 horas y acceso a los datos de ventas para cerrar el ciclo." },
  { question: "¿Cuándo está funcionando?", answer: "En un máximo de 21 días: tracking validado de extremo a extremo, estructura de campañas activa y primer reporte por etapa entregado." },
  { question: "¿Por qué no optimizan por costo por lead?", answer: "Porque te hace comprar barato lo que no compra: las plataformas aprenden a traerte a quien llena formularios, no a quien compra." },
];

const GLOW = "radial-gradient(ellipse 620px 460px at 100% 0%, rgba(252, 92, 31,0.22) 0%, rgba(252, 92, 31,0.1) 40%, rgba(252, 92, 31,0) 75%)";

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
    scripts: [faqJsonLd(DEMAND_SYSTEM_FAQS)],
  }),
  component: DemandSystemPage,
});

const STATS = [
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

const CAPACIDADES = [
  {
    Icono: Megaphone,
    titulo: "Performance Media",
    detalle: "Meta, Google Search, PMax, LinkedIn selectivo B2B, YouTube y Display en retargeting",
  },
  {
    Icono: Wand2,
    titulo: "Creative Performance",
    detalle: "Producción y testing con IA: hooks, ángulos, formatos, iteración semanal",
  },
  {
    Icono: Search,
    titulo: "Search & AI Visibility",
    detalle: "SEO técnico y de contenido, presencia en respuestas de IA con snapshot trimestral",
  },
  {
    Icono: BarChart3,
    titulo: "Medición",
    detalle: "Tracking completo hasta la venta, valores por etapa y el dato de venta de vuelta a Meta y Google; reporte semanal por etapa del embudo",
  },
  {
    Icono: Layout,
    titulo: "Landing de campaña",
    detalle: "Recomendaciones y ajustes menores (una landing nueva es de Sales Flow)",
  },
];

const TIERS = [
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

const CONDICIONES = [
  "Si tu proceso comercial y tu CRM todavía no funcionan, no te conviene solo Demand: necesitas Revenue Engine, y te lo decimos.",
  "Tiene un precio mínimo: por debajo de él dejaría de ser un sistema.",
  "Nunca optimizamos por costo por lead, aunque nos lo pidas: la unidad es la oportunidad aceptada o la venta.",
];

const ACEPTACION = [
  "Tracking validado de extremo a extremo",
  "Estructura de campañas activa",
  "Primer reporte por etapa entregado",
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
  return (
    <div className="bg-background text-foreground antialiased">
      <main className="sys-page">
        <SystemPageHero
          label="Demand System"
          title={
            <>
              Pauta que se mide por <span className="hero-hand">ventas</span>, no por leads.
            </>
          }
          quote="Cuando optimizas por costo por lead, las plataformas aprenden a traerte a quien llena formularios, no a quien compra: el número baja y las ventas no suben. Manejamos tu pauta por las oportunidades que tu equipo acepta y por las que terminan en venta, y cada semana ves el embudo completo."
          ctaLabel="Revisar mi proceso comercial →"
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
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-120px",
              left: "-150px",
              width: "800px",
              height: "600px",
              zIndex: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse 600px 450px at 0% 100%, rgba(252, 92, 31,0.28) 0%, rgba(252, 92, 31,0.14) 42%, rgba(252, 92, 31,0) 72%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>Capacidades</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Qué hacemos
            </h2>
            <CapabilityCards items={CAPACIDADES} />
          </div>
        </section>

        {/* Tiers */}
        <section className="relative py-16 md:py-24 sys-sec">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Niveles</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Tres niveles
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {TIERS.map((t) => (
                <article
                  key={t.nombre}
                  className="relative flex flex-col rounded-2xl p-7"
                  style={{
                    background: t.destacado ? "var(--orange-bg)" : "rgba(245,242,237,0.6)",
                    border: t.destacado
                      ? "1.5px solid var(--orange)"
                      : "1px solid rgba(252, 92, 31,0.18)",
                  }}
                >
                  <div className="md:flex md:items-start md:justify-between md:gap-4">
                    <h3 className="font-display text-[22px] leading-none font-semibold tracking-tight md:text-[26px]">
                      {t.nombre}
                    </h3>
                  </div>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                    {t.alcance}
                  </p>
                  <p className="mt-5 text-[15px] leading-relaxed">{t.detalle}</p>
                </article>
              ))}
            </div>
            {/* Qué no incluye — integrada en la sección anterior */}
            <div
              className="band--orange mt-10 md:mt-14 rounded-[28px] px-8 py-10 md:px-12 md:py-12"
            >
              <p className="label-on-orange">Qué no incluye</p>
              <p
                className="font-display mt-5 max-w-3xl text-[22px] leading-[1.3] font-semibold tracking-tight md:text-[30px]"
                style={{ color: "#f5f2ed" }}
              >
                La inversión en pauta, desarrollo web, CRM y RevOps, agentes conversacionales, community management y branding.
              </p>
            </div>
          </div>
        </section>

        {/* Condiciones de venta */}
        <section className="relative py-16 md:py-24 sys-sec sys-sec--warm section--glow" data-corner="bl">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Condiciones</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                Condiciones de venta
              </h2>
            </div>
            <RuleList items={CONDICIONES} />
          </div>
        </section>

        {/* Aceptación */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 sys-sec">
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-50px",
              right: "-100px",
              width: "620px",
              height: "460px",
              zIndex: 0,
              pointerEvents: "none",
              background: GLOW,
            }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>Aceptación</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Cuándo damos el sistema por aceptado
            </h2>
            <AcceptanceSteps plazo="Sistema aceptado en máximo 21 días" items={ACEPTACION.map((texto) => ({ texto }))} />
          </div>
        </section>

        <FaqSection items={DEMAND_SYSTEM_FAQS} />

        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}
