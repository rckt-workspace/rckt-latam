import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Briefcase, Clock, Sparkles, Users } from "lucide-react";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import { PostulacionForm } from "@/components/PostulacionForm";
import GeneralCta from "@/components/rckt/GeneralCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { useInView } from "@/hooks/use-in-view";
import { getActiveVacancies, type VacantePublica } from "@/lib/vacantes.functions";

const SITE_URL = "https://rckt.lat";

export const Route = createFileRoute("/trabaja-con-nosotros")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Trabaja con nosotros — RCKT" },
      {
        name: "description",
        content:
          "Construye el futuro del trabajo con RCKT: cultura flexible, humana y diversa. Mira nuestras vacantes abiertas o déjanos tu perfil.",
      },
      { property: "og:title", content: "Trabaja con nosotros — RCKT" },
      {
        property: "og:description",
        content:
          "Buscamos personas curiosas, autónomas y colaborativas. Conoce nuestras vacantes abiertas.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/trabaja-con-nosotros" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/trabaja-con-nosotros" }],
  }),
  component: TrabajaConNosotros,
});

type Vacante = VacantePublica;

const cultura = [
  {
    n: "01.",
    Icon: Users,
    titulo: "Todos somos RCKT",
    texto:
      "Tanto hombres como mujeres estamos comprometidos con la construcción de entornos laborales más equitativos e inclusivos. Impulsamos iniciativas para prevenir sesgos, fomentar el respeto y reconocer el talento sin distinción de género.",
  },
  {
    n: "02.",
    Icon: Clock,
    titulo: "Flexibilidad que se adapta a las personas",
    texto:
      "Somos una organización 100% remota, y entendemos la flexibilidad como una herramienta para promover la autonomía, la confianza y una mejor integración entre la vida personal y profesional. Nos enfocamos en los objetivos, los resultados y la responsabilidad de cada integrante del equipo.",
  },
  {
    n: "03.",
    Icon: Sparkles,
    titulo: "Humanizamos el trabajo mientras incorporamos IA",
    texto:
      "Creemos que la tecnología debe potenciar a las personas, no reemplazar aquello que nos hace humanos. Promovemos el uso responsable y estratégico de la Inteligencia Artificial para automatizar tareas, optimizar procesos y liberar tiempo para pensamiento crítico, creatividad, empatía y toma de decisiones.",
  },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-4 w-[2px] bg-orange" />
      <span className="label-orange">{children}</span>
    </div>
  );
}

function Rise({ children, i = 0, className = "" }: { children: ReactNode; i?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className={`nos-rise ${inView ? "is-in" : ""} ${className}`} style={{ transitionDelay: `${i * 100}ms` }}>
      {children}
    </div>
  );
}

function CulturaCard({ c, i }: { c: (typeof cultura)[number]; i: number }) {
  const Icon = c.Icon;
  return (
    <Rise i={i} className="h-full">
      <article className="tw-card flex h-full flex-col p-7">
        <div className="flex items-center justify-between">
          <span className="tw-icon-circle">
            <Icon className="h-[22px] w-[22px] text-orange" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className="font-serif-accent text-[34px] leading-none text-orange italic">{c.n.replace(".", "")}</span>
        </div>
        <h3 className="font-display mt-5 text-[20px] font-semibold tracking-tight">{c.titulo}</h3>
        <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">{c.texto}</p>
      </article>
    </Rise>
  );
}

function TrabajaConNosotros() {
  const [vacantes, setVacantes] = useState<Vacante[] | null>(null);
  const [vacantesError, setVacantesError] = useState(false);
  const [detalle, setDetalle] = useState<Vacante | null>(null);
  const getVacantes = useServerFn(getActiveVacancies);

  const cargarVacantes = useCallback(async () => {
    setVacantes(null);
    setVacantesError(false);

    try {
      const timeout = new Promise<never>((_, reject) => {
        window.setTimeout(
          () => reject(new Error("La consulta de vacantes tardó demasiado.")),
          12_000,
        );
      });
      const data = await Promise.race([getVacantes(), timeout]);
      setVacantes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("No se pudieron cargar las vacantes", error);
      setVacantes([]);
      setVacantesError(true);
    }
  }, [getVacantes]);

  useEffect(() => {
    void cargarVacantes();
  }, [cargarVacantes]);

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="rckt-site nos-page bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero label="Trabaja con nosotros" title={<>Descubre <span className="text-orange">el futuro del <span className="hero-hand">trabajo</span></span> con nosotros.</>} descriptor="En RCKT buscamos personas curiosas, autónomas, colaborativas y abiertas a aprender constantemente. Si quieres hacer parte de una cultura flexible, humana, diversa y preparada para el futuro, queremos conocerte." ctaLabel="Ver vacantes →" ctaHref="#vacantes" />

        {/* 01 · Cultura */}
        <section className="nos-sec nos-glow--tl">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>01. Cultura</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Así nos <em className="font-serif-accent">diferenciamos</em>.
            </h2>
            <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
              {cultura.map((c, i) => (
                <CulturaCard key={c.n} c={c} i={i} />
              ))}
            </div>
          </div>
        </section>

        {/* 02 · Vacantes */}
        <section id="vacantes" className="nos-sec nos-sec--warm scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>02. Oportunidades</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Vacantes abiertas.
            </h2>
            <div className="mt-12">
              {vacantes === null && <p className="text-[15px] text-muted-foreground">Cargando vacantes…</p>}
              {vacantesError && (
                <Rise className="mx-auto max-w-xl">
                  <div className="tw-empty p-10 text-center md:p-12" role="alert">
                    <p className="text-[15px] leading-[1.65] text-muted-foreground">No pudimos cargar las vacantes, intenta de nuevo.</p>
                    <button type="button" onClick={() => void cargarVacantes()} className="tw-text-link mt-6 inline-flex items-center gap-1 text-[14.5px] font-semibold text-orange">
                      Intentar de nuevo
                    </button>
                  </div>
                </Rise>
              )}
              {!vacantesError && vacantes?.length === 0 && (
                <Rise className="mx-auto max-w-xl">
                  <div className="tw-empty p-10 text-center md:p-12">
                    <span className="tw-icon-circle mx-auto">
                      <Briefcase className="h-[22px] w-[22px] text-orange" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <p className="mt-6 text-[15px] leading-[1.65] text-muted-foreground">
                      Actualmente no tenemos vacantes abiertas, pero puedes dejarnos tu perfil en el formulario de abajo.
                    </p>
                  </div>
                </Rise>
              )}
              {vacantes && vacantes.length > 0 && (
                <ul className="divide-y" style={{ borderColor: "rgba(252, 92, 31,0.18)" }}>
                  {vacantes.map((v) => (
                    <li key={v.id} className="tw-vac-row flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between md:gap-8">
                      <div>
                        <h3 className="font-display text-[18px] font-semibold tracking-tight">{v.titulo}</h3>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="res-chip">Remoto</span>
                          {v.area ? <span className="res-chip">{v.area}</span> : null}
                        </div>
                      </div>
                      <button type="button" onClick={() => setDetalle(v)} className="tw-text-link inline-flex shrink-0 items-center gap-1 text-[14.5px] font-semibold text-orange">
                        Ver vacante →
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* 03 · Aliados */}
        <section id="freelance" className="nos-sec scroll-mt-24">
          <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 lg:grid-cols-2">
            <div className="lg:sticky lg:top-[120px]">
              <SectionLabel>03. Aliados</SectionLabel>
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[38px]">
                ¿Tienes un servicio o eres <em className="font-serif-accent">freelance</em>?
              </h2>
              <p className="mt-4 max-w-md text-[16px] leading-[1.65] text-muted-foreground">
                Cuéntanos qué haces. Sumamos aliados y especialistas a nuestros proyectos de forma continua.
              </p>
            </div>
            <Rise>
              <div className="tw-form-card relative p-8 md:p-9">
                <PostulacionForm tipo="servicio" />
              </div>
            </Rise>
          </div>
        </section>
        <GeneralCta />
      </main>
      <SiteFooter />

      {detalle && (
        <div
          className="vacante-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setDetalle(null)}
        >
          <div className="vacante-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="vacante-modal-close"
              type="button"
              aria-label="Cerrar"
              onClick={() => setDetalle(null)}
            >
              ×
            </button>
            <h3>{detalle.titulo}</h3>
            <p className="vacante-meta">{[detalle.area, "Remoto"].filter(Boolean).join(" · ")}</p>
            {detalle.descripcion && <p style={{ whiteSpace: "pre-line" }}>{detalle.descripcion}</p>}
            {detalle.requisitos && (
              <>
                <h4>Requisitos</h4>
                <p style={{ whiteSpace: "pre-line" }}>{detalle.requisitos}</p>
              </>
            )}
            <Link
              className="btn btn-primary"
              params={{ id: detalle.id }}
              to="/trabaja-con-nosotros/aplicar/$id"
            >
              Aplicar →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
