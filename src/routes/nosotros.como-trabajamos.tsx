import { createFileRoute } from "@tanstack/react-router";
import {
  Ban,
  Database,
  Layers,
  Lock,
  PackageOpen,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import GeneralCta from "@/components/rckt/GeneralCta";
import SectionHeader from "@/components/rckt/SectionHeader";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { useInView } from "@/hooks/use-in-view";
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";


const SITE_URL = "https://rckt.lat";

export const Route = createFileRoute("/nosotros/como-trabajamos")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Cómo trabajamos — RCKT" },
      {
        name: "description",
        content: "Tres modalidades de trabajo, una base común en toda cuenta y la escalera de cuenta: del Revenue Diagnostic al Growth OS.",
      },
      { property: "og:title", content: "Cómo trabajamos — RCKT" },
      {
        property: "og:description",
        content: "Operar, Sprint o Partner. Lo que no se negocia en ninguna cuenta y cómo escala el trabajo en el tiempo.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/nosotros/como-trabajamos" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/nosotros/como-trabajamos" }],
  }),
  component: ComoTrabajamosPage,
});

const MODALIDADES = [
  {
    nombre: "Operar",
    pill: "Por defecto",
    quees: "RCKT opera el sistema con responsabilidad sobre el resultado. Es la modalidad por defecto.",
    cuando: "Demand, Conversion, Revenue Engine y Growth OS.",
  },
  {
    nombre: "Sprint",
    pill: null,
    quees:
      "Implementación acotada de 6–8 semanas, con alcance y aceptación cerrados antes de empezar.",
    cuando: "Operations; Sales Flow suelto; web y ecommerce; migraciones de CRM.",
  },
  {
    nombre: "Partner",
    pill: null,
    quees: "Advisory, in-housing, capacitación o un growth lead fraccional.",
    cuando:
      "Empresas con equipo interno que quieren nuestro método y criterio, no nuestra ejecución.",
  },
];

const CONDICIONES: Array<{ n: string; nombre: string; desc: string; Icon: typeof Database }> = [
  { n: "01", nombre: "Una fuente de verdad", desc: "Un solo modelo de datos de la pauta a la venta, con definiciones que el cliente firma.", Icon: Database },
  { n: "02", nombre: "IA supervisada", desc: "Documentación de qué se automatiza, aprobación humana y detección de fallos.", Icon: ShieldCheck },
  { n: "03", nombre: "Un responsable con autoridad", desc: "Una persona que decide prioridades y responde por el resultado, no solo coordina.", Icon: UserRoundCheck },
  { n: "04", nombre: "Activos reutilizables", desc: "Conectores, tracking, playbooks y biblioteca creativa documentados y versionados.", Icon: Layers },
  { n: "05", nombre: "Gobierno y seguridad", desc: "Accesos, datos personales, consentimiento y cumplimiento legal en cada sistema.", Icon: Lock },
  { n: "06", nombre: "Transferencia", desc: "Documentación y accesos completos desde el primer día para que el cliente sea dueño del sistema.", Icon: PackageOpen },
];

const SELLOS = ["No se venden", "No se facturan aparte", "No se negocian"];


const ESCALERA: Array<{ periodo: string; nombre: string; href?: string }> = [
  { periodo: "Semanas 0–3", nombre: "Revenue Diagnostic", href: "/sistemas/revenue-diagnostic" },
  { periodo: "Meses 1–3", nombre: "Demand System", href: "/sistemas/demand-system" },
  { periodo: "Meses 1–6", nombre: "Revenue Engine", href: "/sistemas/revenue-engine" },
  { periodo: "Meses 6–12", nombre: "+ Operations Sprint", href: "/sistemas/operations-system" },
  { periodo: "Mes 12 en adelante", nombre: "Growth OS" },
];

const TRIGGERS: Array<{ de: string; a: string; que: string }> = [
  {
    de: "Diagnostic",
    a: "Demand o Revenue Engine",
    que: "Roadmap presentado; fuga principal identificada y cuantificada",
  },
  {
    de: "Demand",
    a: "Revenue Engine",
    que: "Fuga documentada después del prospecto: respuesta en más de una hora, menos del 60% de prospectos contactados, asesoras atendiendo WhatsApp fuera del CRM",
  },
  {
    de: "Revenue Engine",
    a: "+ Operations",
    que: "Un proceso manual detectado en la revisión mensual, con 50 casos o más por semana",
  },
  {
    de: "Cualquiera",
    a: "Growth OS",
    que: "6 meses o más de relación, línea base cumplida, dos o más sistemas activos y un decisor que patrocina",
  },
];


function CondicionCard({ c, i }: { c: (typeof CONDICIONES)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const Icon = c.Icon;
  return (
    <div
      ref={ref}
      className={`ct-card ct-card-in flex h-full flex-col ${inView ? "is-in" : ""}`}
      style={{ transitionDelay: `${i * 80}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="ct-ico">
          <Icon className="h-[22px] w-[22px]" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="font-hero text-[20px] leading-none font-semibold text-orange">{c.n}</span>
      </div>
      <h3 className="font-display mt-5 text-[19px] font-semibold tracking-tight">{c.nombre}</h3>
      <p data-align="left" className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        {c.desc}
      </p>
    </div>
  );
}

function ModalidadCard({ m, i }: { m: (typeof MODALIDADES)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={`nos-ficha nos-rise flex h-full flex-col ${inView ? "is-in" : ""}`}
      style={{ transitionDelay: `${i * 80}ms` }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-[32px] leading-none font-semibold tracking-tight">{m.nombre}</h3>
        {m.pill ? (
          <span className="btn-orange font-mono inline-flex items-center rounded-full px-3 py-1 text-[10px] tracking-[0.16em] uppercase">
            {m.pill}
          </span>
        ) : null}
      </div>
      <p className="label-orange mt-6">Qué es</p>
      <p data-align="left" className="mt-2 text-[16px] leading-relaxed text-muted-foreground">
        {m.quees}
      </p>
      <div className="my-6 h-px w-full" style={{ background: "rgba(252, 92, 31,0.18)" }} />
      <p className="label-orange">Cuándo aplica</p>
      <p data-align="left" className="mt-2 text-[16px] leading-relaxed text-muted-foreground">
        {m.cuando}
      </p>
    </div>
  );
}


function EscalonCard({ e, i }: { e: (typeof ESCALERA)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const inner = (
    <>
      <span className="label-orange block">{e.periodo}</span>
      <span className="font-display mt-2 block text-[18px] font-semibold tracking-tight">{e.nombre}</span>
    </>
  );
  return (
    <div
      ref={ref}
      className={`nos-rise ${inView ? "is-in" : ""} md:self-end`}
      style={{ transitionDelay: `${i * 90}ms`, marginBottom: `${i * 34}px` }}
    >
      {e.href ? (
        <a href={e.href} className="nos-ficha block h-full transition-colors">
          {inner}
        </a>
      ) : (
        <div className="nos-ficha h-full">{inner}</div>
      )}
    </div>
  );
}

function ComoTrabajamosPage() {
  return (
    <div className="nos-page bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Cómo trabajamos"
          title={<>La misma cabeza, tres formas de <span className="hero-hand">trabajar</span>.</>}
          context="Puedes dejar que operemos el sistema y respondamos por el resultado (Operar), pedirnos una implementación cerrada de 6 a 8 semanas (Sprint) o sumar nuestro método a tu equipo interno (Partner). En los tres casos se cumplen las mismas seis condiciones."
          ctaLabel="Revisar mi proceso comercial →"
          ctaHref={DIAGNOSTIC_HREF}
        />

        {/* 2. Modalidades */}
        <section className="nos-sec nos-glow--tr">
          <div className="relative mx-auto max-w-6xl px-6">
             <SectionHeader num="01." label="Tres modalidades" title="Operar, Sprint o Partner." />
            <div className="mt-10 grid items-stretch gap-6 md:grid-cols-3">
              {MODALIDADES.map((m, i) => (
                <ModalidadCard key={m.nombre} m={m} i={i} />
              ))}
            </div>
            <p
              data-center
              className="font-display mx-auto mt-12 max-w-[760px] text-center text-[24px] leading-snug font-semibold"
            >
               Partner no es un servicio distinto: es{" "}
               <span className="font-display text-orange not-italic">la misma cabeza</span> trabajando con tu equipo en lugar de por él.
            </p>
          </div>
        </section>

        {/* 3. Las seis condiciones */}
        <section className="ct-base">
          <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[38%_1fr]">
            <div className="lg:sticky lg:top-[120px] lg:self-start">
               <SectionHeader num="02." label="Base común" title="Lo que se cumple en toda cuenta." />
              <div className="mt-8 flex flex-wrap gap-3 sm:flex-col sm:items-start">
                {SELLOS.map((s) => (
                  <span key={s} className="ct-chip font-display">
                    <Ban className="h-4 w-4 shrink-0 text-orange" strokeWidth={1.8} aria-hidden="true" />
                    {s}
                  </span>
                ))}
              </div>
              <a
                href="/nosotros"
                className="font-display mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-orange"
              >
                Ver los principios completos <span className="nos-arrow">→</span>
              </a>
            </div>
            <div className="grid items-stretch gap-4 sm:grid-cols-2">
              {CONDICIONES.map((c, i) => (
                <CondicionCard key={c.n} c={c} i={i} />
              ))}
            </div>
          </div>
        </section>

        {/* La escalera y triggers */}
        <section className="nos-sec nos-sec--warm nos-glow--bl">
          <div className="relative mx-auto max-w-6xl px-6">
            <SectionHeader num="03." label="La escalera" title={<>Cómo crece una <span className="text-orange">cuenta</span>.</>} />

            {/* desktop: peldaños ascendentes */}
            <div className="relative mt-16 hidden md:block">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[40px] h-px origin-left"
                style={{
                  background: "linear-gradient(90deg, rgba(252, 92, 31,0.15), rgba(252, 92, 31,0.9))",
                  transform: "rotate(-7deg)",
                }}
              />
              <div className="relative grid grid-cols-5 items-end gap-4">
                {ESCALERA.map((e, i) => (
                  <EscalonCard key={e.nombre} e={e} i={i} />
                ))}
              </div>
            </div>

            {/* móvil: lista vertical con línea a la izquierda */}
            <div
              className="mt-10 space-y-5 pl-6 md:hidden"
              style={{ borderLeft: "2px solid rgba(252, 92, 31,0.35)" }}
            >
              {ESCALERA.map((e) => (
                <div key={e.nombre}>
                  <span className="label-orange block">{e.periodo}</span>
                  {e.href ? (
                    <a href={e.href} className="font-display mt-1 block text-[18px] font-semibold tracking-tight">
                      {e.nombre}
                    </a>
                  ) : (
                    <span className="font-display mt-1 block text-[18px] font-semibold tracking-tight">
                      {e.nombre}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Triggers */}
            <div className="mt-24">
               <SectionHeader num="04." label="Triggers de expansión" title="Cuándo sumar el siguiente sistema." />
              <p data-align="left" className="max-w-[720px] text-[16px] leading-relaxed text-muted-foreground">
                 Se propone solo cuando pasa algo real, con datos de la revisión mensual.
              </p>
              <div className="mt-10">
                {TRIGGERS.map((t) => (
                  <div
                    key={t.de + t.a}
                    className="flex flex-col gap-4 border-t py-6 md:flex-row md:items-center md:gap-10"
                    style={{ borderColor: "rgba(252, 92, 31,0.18)" }}
                  >
                    <div className="flex flex-wrap items-center gap-3 md:w-[420px] md:shrink-0">
                      <span
                        className="font-display inline-flex items-center rounded-full px-4 py-2 text-[14px] font-semibold"
                        style={{ border: "1px solid rgba(252, 92, 31,0.4)" }}
                      >
                        {t.de}
                      </span>
                      <span className="text-orange" aria-hidden="true">
                        →
                      </span>
                      <span className="btn-orange font-display inline-flex items-center rounded-full px-4 py-2 text-[14px] font-semibold">
                        {t.a}
                      </span>
                    </div>
                    <p data-align="left" className="text-[16px] leading-relaxed text-muted-foreground">
                      {t.que}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}
