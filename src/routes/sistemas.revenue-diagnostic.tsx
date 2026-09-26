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


const WHATSAPP_URL = "#whatsapp";
const SITE_URL = "https://rckt.lat";

const REVENUE_DIAGNOSTIC_FAQS = [
  { question: "¿Es gratis?", answer: "No. Es trabajo real de tres semanas con tus datos, y se descuenta del sistema si sigues con nosotros. Si no estás seguro de querer saber dónde pierdes dinero, quizá no es el momento." },
  { question: "¿Cuánto dura?", answer: "De 2 a 3 semanas, y cierra con una sesión de 90 minutos con quienes deciden." },
  { question: "¿Qué pasa después?", answer: "Decides con datos: seguir con el sistema recomendado o no. Si sigues, lo que pagaste se descuenta." },
  { question: "¿Cuánto cuesta?", answer: "Depende de dónde esté tu fuga, y eso es justo lo que mide el Diagnostic. Lo que sí te podemos decir es cómo funciona y qué incluye." },
  { question: "¿Por qué necesitan tanto acceso y tantos datos?", answer: "Porque sin ellos no podemos medir hasta la venta, y sin medir hasta la venta seríamos una agencia más. Los accesos son de lectura donde se pueda y quedan documentados." },
  { question: "Quiero pagar solo por resultados.", answer: "Trabajamos con una parte variable, pero después de 90 días con línea base, porque antes ninguno de los dos sabe qué es un resultado. Y nunca cobramos 100% variable cuando el cierre depende de tu equipo, tu stock o tus precios." },
];

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
    scripts: [faqJsonLd(REVENUE_DIAGNOSTIC_FAQS)],
  }),
  component: RevenueDiagnostic,
});

const STATS = [
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

const INCLUYE = [
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

const NECESITAMOS = [
  "Acceso de lectura a Meta, Google, GA4 y GTM",
  "CRM o exportación",
  "Datos de venta del último trimestre",
  "2–3 entrevistas (comercial, mercadeo, operaciones)",
  "Acceso a WhatsApp Business o una muestra de conversaciones",
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
  return (
    <div className="rckt-site bg-background text-foreground antialiased">
      <SiteNav />
      <main className="sys-page">
        <SystemPageHero
          label="Revenue Diagnostic"
          title={<>En tres semanas sabrás dónde se te va la <span className="hero-hand">venta</span>.</>}
          descriptor="Diagnóstico de ingresos"
          quote="Antes de tocar tu pauta, medimos. Te mostramos cuántos prospectos se pierden entre el anuncio, el WhatsApp y la venta, en qué punto exacto, y qué haríamos en 90 días. Si sigues con nosotros, lo que pagas se descuenta del sistema."
          ctaLabel="Revisar mi proceso comercial →"
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
                Qué incluye
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
              <p className="label-on-orange">Qué no incluye</p>
              <p
                className="font-display mt-5 max-w-3xl text-[22px] leading-[1.3] font-semibold tracking-tight md:text-[30px]"
                style={{ color: "#f5f2ed" }}
              >
                Durante el diagnóstico no implementamos: ni cambios en campañas, ni desarrollo, ni configuración de CRM, ni creatividades.
              </p>
            </div>
          </div>
        </section>

        {/* Qué necesitamos de ti — checklist */}
        <section className="relative py-16 md:py-24 sys-sec">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="diagnostic-needs-title font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Qué necesitamos de ti
            </h2>
            <ul className="diagnostic-needs-list grid gap-5 md:grid-cols-2">
              {NECESITAMOS.map((t) => (
                <li key={t} className="flex items-start gap-4">
                  <span
                    className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "var(--orange-bg)" }}
                  >
                    <Check className="h-4 w-4 text-orange" strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <span className="text-[15.5px] leading-relaxed">{t}</span>
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
              <p className="label-orange !text-white/80">Regla</p>
              <p
                className="mt-5 max-w-4xl text-[24px] leading-[1.25] md:text-[38px]"
                style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic", color: "#f5f2ed" }}
              >
                Sin línea base no arrancamos ningún sistema: primero medimos, después decidimos contigo.
              </p>
            </div>
          </div>
        </section>

        {/* Formulario */}
        <section
          id="formulario"
          className="relative isolate overflow-hidden scroll-mt-28 py-20 md:py-28 sys-sec sys-sec--warm section--glow" data-corner="bl">
          <div className="relative z-10 mx-auto max-w-4xl px-6">
            <SectionLabel>Formulario</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[30px] leading-tight font-semibold tracking-tight md:text-[46px]">
                Revisar mi proceso comercial
              </h2>
            </div>
            <div className="mt-10">
              <DiagnosticForm whatsappUrl={WHATSAPP_URL} submitLabel="Revisar mi proceso comercial →" onSent={() => setSent(true)} />
              <p className="mt-5 text-sm text-muted-foreground">¿Prefieres WhatsApp? <a className="text-orange hover:underline" href="#whatsapp">Escríbenos y te hacemos las mismas preguntas.</a></p>
            </div>
          </div>
        </section>

        <FaqSection items={REVENUE_DIAGNOSTIC_FAQS} />

        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}
