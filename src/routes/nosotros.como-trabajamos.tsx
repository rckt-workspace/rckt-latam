import { createFileRoute, useRouter } from "@tanstack/react-router";
import { 
  Database, 
  Layers, 
  Lock, 
  PackageOpen, 
  ShieldCheck, 
  UserRoundCheck,
  Ban
} from "lucide-react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SectionHeader from "@/components/rckt/SectionHeader";
import { useInView } from "@/hooks/use-in-view";

const SITE_URL = "https://rckt-latam.lovable.app";

const MODALIDADES = [
  {
    nombre: "Operar",
    pill: "Por defecto",
    quees: "RCKT opera el sistema con responsabilidad sobre el resultado. Es la modalidad por defecto.",
    cuando: "Demand o Revenue Engine.",
  },
  {
    nombre: "Sprint",
    pill: null,
    quees: "Implementación acotada de 6-8 semanas, alcance y aceptación cerrados antes de empezar.",
    cuando: "Operations, Sales Flow o implementaciones puntuales.",
  },
  {
    nombre: "Partner",
    pill: null,
    quees: "Advisory, in-housing, capacitación o growth lead fraccional.",
    cuando: "Equipos que quieren nuestro método y criterio, no nuestra ejecución.",
  },
];

const CONDICIONES = [
  { n: "01", nombre: "Una fuente de verdad", desc: "Un solo modelo de datos de la pauta a la venta, con definiciones que el cliente firma.", Icon: Database },
  { n: "02", nombre: "IA supervisada", desc: "Documentación de qué se automatiza, aprobación humana y detección de fallos.", Icon: ShieldCheck },
  { n: "03", nombre: "Un responsable con autoridad", desc: "Una persona que decide prioridades y responde por el resultado, no solo coordina.", Icon: UserRoundCheck },
  { n: "04", nombre: "Activos reutilizables", desc: "Conectores, tracking, playbooks y biblioteca creativa documentados y versionados.", Icon: Layers },
  { n: "05", nombre: "Gobierno y seguridad", desc: "Accesos, datos personales, consentimiento y cumplimiento legal en cada sistema.", Icon: Lock },
  { n: "06", nombre: "Transferencia", desc: "Documentación y accesos completos desde el primer día para que el cliente sea dueño del sistema.", Icon: PackageOpen },
];

const SELLOS = ["No se venden", "No se facturan aparte", "No se negocian"];

const ESCALERA = [
  { periodo: "Semanas 0-3", nombre: "Revenue Diagnostic", href: "/sistemas/revenue-diagnostic" },
  { periodo: "Meses 1-6", nombre: "Demand o Revenue Engine", href: "/sistemas/revenue-engine" },
  { periodo: "Meses 6-12", nombre: "+ Operations Sprint", href: "/sistemas/operations-system" },
  { periodo: "Mes 12+", nombre: "Growth OS" },
];

const TRIGGERS = [
  {
    de: "Diagnostic",
    a: "Demand o Engine",
    que: "Mapa de fugas con números reales y roadmap de 90 días priorizado por impacto económico.",
  },
  {
    de: "Demand",
    a: "Revenue Engine",
    que: "Fuga documentada después del lead: respuesta tarde, sin seguimiento o fuera del CRM.",
  },
  {
    de: "Revenue Engine",
    a: "+ Operations",
    que: "Proceso manual detectado de alto volumen con reglas claras y datos accesibles.",
  },
  {
    de: "Cualquiera",
    a: "Growth OS",
    que: "Línea base cumplida, dos o más sistemas activos y un decisor que patrocina.",
  },
];

function CondicionCard({ c, i }: { c: typeof CONDICIONES[0]; i: number }) {
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
          <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="font-hero text-[20px] leading-none font-semibold text-orange" style={{ color: 'var(--naranja)' }}>{c.n}</span>
      </div>
      <h3 className="font-display mt-5 text-[19px] font-semibold tracking-tight">{c.nombre}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        {c.desc}
      </p>
    </div>
  );
}

function ModalidadCard({ m, i }: { m: typeof MODALIDADES[0]; i: number }) {
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
      <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">
        {m.quees}
      </p>
      <div className="my-6 h-px w-full" style={{ background: "rgba(252, 92, 31, 0.18)" }} />
      <p className="label-orange">Cuándo aplica</p>
      <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">
        {m.cuando}
      </p>
    </div>
  );
}

function EscalonCard({ e, i }: { e: typeof ESCALERA[0]; i: number }) {
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
  errorComponent: ComoTrabajamosError,
  notFoundComponent: () => <ComoTrabajamosError />,
});

function ComoTrabajamosPage() {
  useSiteMotion([]);

  return (
    <div className="rckt-site tcn-page nos-page">
      <SiteHeader />
      <main id="top">
        <SystemPageHero
          label="Nosotros"
          title={<>Cómo <em className="hero-hand">trabajamos.</em></>}
          descriptor="Tres modalidades, una base común y una escalera de cuenta que no se salta pasos."
          ctaLabel="Revisar mi proceso comercial →"
        />

        {/* 1. Modalidades */}
        <section className="nos-sec">
          <div className="container">
            <SectionHeader num="01." label="Tres modalidades" title="Tres formas de contratar el mismo conocimiento." />
            <div className="ct-modalities-grid mt-10 grid items-stretch gap-6 md:grid-cols-3">
              {MODALIDADES.map((m, i) => (
                <ModalidadCard key={m.nombre} m={m} i={i} />
              ))}
            </div>
            <p className="font-display mx-auto mt-12 max-w-[760px] text-center text-[22px] leading-snug font-semibold">
              Partner no es un servicio distinto: es <em className="font-serif-accent text-orange">la misma cabeza</em> trabajando con el equipo del cliente en lugar de por él.
            </p>
          </div>
        </section>

        {/* 2. Base común (Condiciones) */}
        <section className="ct-base">
          <div className="container grid gap-12 lg:grid-cols-[38%_1fr]">
            <div className="lg:sticky lg:top-[120px] lg:self-start">
              <SectionHeader num="02." label="Base común" title={<>Las seis condiciones de <em className="font-serif-accent text-orange">toda cuenta</em>.</>} />
              <div className="mt-8 flex flex-wrap gap-3 sm:flex-col sm:items-start">
                {SELLOS.map((s) => (
                  <span key={s} className="ct-chip font-display">
                    <Ban size={16} className="shrink-0 text-orange" strokeWidth={1.8} />
                    {s}
                  </span>
                ))}
              </div>
              <a href="/nosotros" className="font-display mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-orange">
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

        {/* 3. Escalera y Triggers */}
        <section className="nos-sec nos-sec--warm">
          <div className="container">
            <SectionHeader num="03." label="La escalera" title={<>Cómo crece una <em className="font-serif-accent text-orange">cuenta</em>.</>} />

            {/* desktop escalera */}
            <div className="ct-ladder relative mt-16 hidden md:block">
              <div aria-hidden="true" className="ct-ladder__line absolute inset-x-0 bottom-[40px] h-px origin-left" />
              <div className="relative grid grid-cols-4 items-end gap-4">
                {ESCALERA.map((e, i) => (
                  <EscalonCard key={e.nombre} e={e} i={i} />
                ))}
              </div>
            </div>

            {/* móvil escalera */}
            <div className="ct-ladder-mobile mt-10 space-y-6 pl-6 md:hidden">
              {ESCALERA.map((e) => (
                <div key={e.nombre}>
                  <span className="label-orange block">{e.periodo}</span>
                  {e.href ? (
                    <a href={e.href} className="font-display mt-1 block text-[18px] font-semibold tracking-tight">{e.nombre}</a>
                  ) : (
                    <span className="font-display mt-1 block text-[18px] font-semibold tracking-tight">{e.nombre}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Triggers */}
            <div className="mt-24">
              <SectionHeader num="04." label="Triggers de expansión" title="Cuándo ampliar el sistema." />
              <p className="max-w-[720px] text-[16px] leading-relaxed text-muted-foreground">
                Se documentan en la revisión mensual. Nunca es venta cruzada automática.
              </p>
              <div className="mt-10">
                {TRIGGERS.map((t) => (
                  <div key={t.de + t.a} className="ct-trigger-row flex flex-col gap-4 border-t py-6 md:flex-row md:items-center md:gap-10">
                    <div className="flex flex-wrap items-center gap-3 md:w-[420px] md:shrink-0">
                      <span className="ct-trigger-from font-display inline-flex items-center rounded-full px-4 py-2 text-[14px] font-semibold">
                        {t.de}
                      </span>
                      <span className="text-orange" aria-hidden="true">→</span>
                      <span className="btn-orange font-display inline-flex items-center rounded-full px-4 py-2 text-[14px] font-semibold">
                        {t.a}
                      </span>
                    </div>
                    <p className="text-[16px] leading-relaxed text-muted-foreground">
                      {t.que}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="nos-sec" style={{ paddingBlock: 0 }}>
           {/* Reusing final CTA section structure from Spain but with LATAM component/style */}
           <div className="nos-sec--warm py-24 md:py-32">
             <div className="container">
               <div className="mx-auto max-w-[720px] text-center">
                 <div className="mb-4"><span className="label-orange">¿Empezamos?</span></div>
                 <h2 className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight md:text-[56px]">
                   El siguiente paso empieza con <em className="font-serif-accent text-orange">claridad.</em>
                 </h2>
                 <div className="mt-10 flex justify-center">
                   <a href="/sistemas/revenue-diagnostic" className="btn btn-primary btn-orange rounded-full px-8 py-4">
                     Solicitar diagnóstico de captación →
                   </a>
                 </div>
               </div>
             </div>
           </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function ComoTrabajamosError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Cómo trabajamos</span>
            <h1>No pudimos mostrar esta página.</h1>
            <p>Intenta cargarla nuevamente. Si el problema continúa, puedes volver al inicio.</p>
            <div className="form-actions">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => void router.invalidate()}
              >
                Intentar de nuevo
              </button>
              <a className="btn" href="/">
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
