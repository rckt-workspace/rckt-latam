import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, LayoutGrid, Target, Users } from "lucide-react";

import SiteFooter from "@/components/rckt/SiteFooter";
import GeneralCta from "@/components/rckt/GeneralCta";
import { AcceptanceSteps, CapabilityCards, RuleList } from "@/components/rckt/SystemBlocks";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import FaqSection, { faqJsonLd } from "@/components/rckt/FaqSection";
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";
const SITE_URL = "https://rckt.lat";

const OPERATIONS_SYSTEM_FAQS = [
  { question: "Quiero un chatbot con IA.", answer: "No vendemos chatbots. Si tienes un proceso que tu equipo repite muchas veces, lo medimos y lo automatizamos con supervisión. Si es curiosidad por la IA, hay herramientas gratis para probar." },
  { question: "¿Cuánto tiempo toma?", answer: "Entre 6 y 8 semanas por proceso. En la semana 2 firmamos contigo qué significa que funcione; después queda soporte mensual." },
  { question: "¿Qué pasa si el piloto no mejora el proceso?", answer: "Comparamos el piloto con la línea base. Si el costo por ejecución no baja, no seguimos." },
  { question: "¿Quedamos amarrados a una herramienta de IA?", answer: "No. Si hace falta cambiar de proveedor, el sistema no se rehace: lo que construimos es el diseño del proceso." },
  { question: "¿Qué necesitan de mí?", answer: "Alguien de tu equipo a cargo del proceso, acceso a los sistemas y datos, ejemplos reales para las pruebas y tiempo para validar durante el piloto." },
  { question: "¿Y si la IA no nos da retorno?", answer: "Por eso se mide el costo por ejecución correcta frente a la línea base desde el piloto. Si no baja, no seguimos." },
];

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
    scripts: [faqJsonLd(OPERATIONS_SYSTEM_FAQS)],
  }),
  component: OperationsSystemPage,
});

const STATS = [
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

const SPRINT = [
  { rango: "Semanas 1–2", titulo: "Mapa del proceso", detalle: "Volumen, tiempo, errores, costo" },
  { rango: "Semanas 3–6", titulo: "Construcción e integración", detalle: "Con pruebas de casos reales" },
  { rango: "Semanas 7–8", titulo: "Piloto controlado", detalle: "Medición contra línea base, transferencia" },
  { rango: "Después", titulo: "Soporte mensual", detalle: "Monitoreo, excepciones, mejora" },
];

const CATALOGO = [
  {
    proceso: "Cotizaciones desde WhatsApp o correo",
    agente: "Extrae la solicitud, consulta catálogo y precios, redacta la cotización",
    humano: "Envío y condiciones especiales",
  },
  {
    proceso: "Clasificación y respuesta de solicitudes",
    agente: "Clasifica, prioriza y responde lo repetitivo",
    humano: "Casos fuera de patrón",
  },
  {
    proceso: "Generación y verificación de documentos",
    agente: "Genera desde plantillas, verifica campos y coherencia",
    humano: "Firma y excepciones",
  },
  {
    proceso: "Sincronización CRM ↔ ERP u hojas",
    agente: "Mantiene datos consistentes entre sistemas",
    humano: "Conflictos de datos",
  },
  {
    proceso: "Reporting comercial",
    agente: "Consolida fuentes y publica el reporte en la cadencia acordada",
    humano: "Interpretación y decisiones",
  },
  {
    proceso: "Atención post-venta de primer nivel",
    agente: "Resuelve consultas frecuentes, escala el resto",
    humano: "Reclamaciones y devoluciones",
  },
];

const REGLAS = [
  "Un proceso por sprint; el siguiente aprovecha lo que ya construimos",
  "Si hay que cambiar el proveedor de IA, no se rehace el sistema",
  "Sin línea base no empezamos el sprint",
];

const ACEPTACION = [
  "Ejecuciones correctas sin intervención por encima del umbral acordado (típicamente 85–90% en piloto)",
  "Costo por ejecución correcta documentado frente a la línea base",
  "Cada excepción con su ruta hacia una persona",
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
  return (
    <div className="rckt-site bg-background text-foreground antialiased">
      <main className="sys-page">
        <SystemPageHero
          label="Operations System"
          title={
            <>
              Un proceso a la vez, funcionando solo y con alguien <span className="hero-hand">aprobando</span>.
            </>
          }
          quote="6 de cada 10 pymes no ven retorno de la IA. Por eso no empezamos por la herramienta: empezamos por una cotización o un documento que tu equipo arma cien veces por semana, medimos cuánto cuesta hoy y lo dejamos funcionando con supervisión. Si no baja el costo por ejecución, no seguimos."
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

        {/* Sprint timeline */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 sys-sec sys-sec--warm section--glow" data-corner="tr">
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>El sprint</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                El Sprint, semana a semana.
              </h2>
              <span className="text-sm font-semibold text-orange">criterios firmados en la semana 2</span>
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
              Lo que significa que funcione se firma en la semana 2, antes de construir.
            </p>
          </div>
        </section>

        {/* Catálogo de procesos */}
        <section className="relative py-16 md:py-24 sys-sec">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Catálogo</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                Catálogo de procesos.
              </h2>
              <span className="text-sm font-semibold text-orange">acotado a propósito</span>
            </div>
            <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-muted-foreground">
              Acotado a propósito: si el proceso que necesitas no está aquí, se evalúa con dirección antes de
              cotizar.
            </p>

            {/* Desktop: tabla */}
            <div className="mt-10 hidden md:block">
              <div
                className="grid grid-cols-[1.1fr_1.3fr_1fr] gap-8 pb-4 font-mono text-[11px] tracking-[0.16em] uppercase text-orange"
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <span>Proceso</span>
                <span>Qué hace el agente</span>
                <span>Qué aprueba el humano</span>
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
                    <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-orange">Agente: </span>
                    {r.agente}
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                    <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-orange">Humano: </span>
                    {r.humano}
                  </p>
                </div>
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
                No es una transformación completa de la empresa ni un ERP o software a medida. Tampoco tomamos procesos críticos sin un responsable de tu lado ni procesos sin datos disponibles.
              </p>
            </div>
          </div>
        </section>

        {/* Reglas */}
        <section className="relative py-16 md:py-24 sys-sec sys-sec--warm section--glow" data-corner="bl">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Reglas</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Cómo trabajamos aquí
            </h2>
            <RuleList items={REGLAS} />
          </div>
        </section>

        {/* Aceptación */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 sys-sec">
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>Aceptación</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Cuándo damos el sistema por aceptado
            </h2>
            <AcceptanceSteps items={ACEPTACION.map((texto) => ({ texto }))} />
          </div>
        </section>

        <FaqSection items={OPERATIONS_SYSTEM_FAQS} />

        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}
