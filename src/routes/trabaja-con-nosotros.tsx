import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useState } from "react";
import { Briefcase, Clock, Sparkles, Users } from "lucide-react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import { PostulacionForm } from "@/components/PostulacionForm";
import GeneralCta from "@/components/rckt/GeneralCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { getActiveVacancies, type VacantePublica } from "@/lib/vacantes.functions";

const SITE_URL = "https://rckt-latam.lovable.app";

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
  errorComponent: TrabajaConNosotrosError,
  notFoundComponent: () => <TrabajaConNosotrosError />,
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

  useSiteMotion([vacantes]);

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main id="top">
        <SystemPageHero label="Trabaja con nosotros" title={<>Descubre <span className="text-orange">el futuro del <span className="hero-hand">trabajo</span></span> con nosotros.</>} descriptor="En RCKT buscamos personas curiosas, autónomas, colaborativas y abiertas a aprender constantemente. Si quieres hacer parte de una cultura flexible, humana, diversa y preparada para el futuro, queremos conocerte." ctaLabel="Ver vacantes →" ctaHref="#vacantes" />

        <section className="nos-sec nos-glow--tl">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-4 flex items-center gap-3"><span className="inline-block h-4 w-[2px] bg-orange" /><span className="label-orange">01. Cultura</span></div>
            <h2 className="font-display text-[28px] leading-tight font-semibold md:text-[40px]">Así nos <em className="font-serif-accent">diferenciamos</em>.</h2>
            <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
              {cultura.map((c) => { const Icon = c.Icon; return <article className="tw-card flex h-full flex-col p-7" key={c.titulo}><div className="flex items-center justify-between"><span className="tw-icon-circle"><Icon className="h-[22px] w-[22px] text-orange" strokeWidth={1.5} /></span><span className="font-serif-accent text-[34px] leading-none text-orange italic">{c.n.replace('.', '')}</span></div><h3 className="font-display mt-5 text-[20px] font-semibold">{c.titulo}</h3><p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">{c.texto}</p></article>; })}
            </div>
          </div>
        </section>

        <section className="nos-sec nos-sec--warm scroll-mt-24" id="vacantes">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-4 flex items-center gap-3"><span className="inline-block h-4 w-[2px] bg-orange" /><span className="label-orange">02. Oportunidades</span></div>
            <h2 className="font-display text-[28px] leading-tight font-semibold md:text-[40px]">Vacantes abiertas.</h2>
            <div className="vacantes-list">
              {vacantes === null && <p className="vacantes-nota">Cargando vacantes…</p>}
              {vacantesError && (
                <div className="vacante-card rv" role="alert">
                  <p>No pudimos cargar las vacantes, intenta de nuevo.</p>
                  <button
                    className="btn btn-primary btn-sm"
                    type="button"
                    onClick={() => void cargarVacantes()}
                  >
                    Intentar de nuevo
                  </button>
                </div>
              )}
              {!vacantesError && vacantes?.length === 0 && (
                <div className="tw-empty mx-auto max-w-xl p-10 text-center md:p-12">
                  <span className="tw-icon-circle mx-auto"><Briefcase className="h-[22px] w-[22px] text-orange" /></span>
                  <p>
                    Actualmente no tenemos vacantes abiertas, pero puedes dejarnos tu perfil en el
                    formulario de abajo.
                  </p>
                </div>
              )}
              {vacantes?.map((v) => (
                <article className="vacante-card rv" key={v.id}>
                  <div className="vacante-info">
                    <h3>{v.titulo}</h3>
                    <p className="vacante-meta">{[v.area, "Remoto"].filter(Boolean).join(" · ")}</p>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    type="button"
                    onClick={() => setDetalle(v)}
                  >
                    Ver vacante →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="nos-sec scroll-mt-24" id="freelance">
          <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 lg:grid-cols-2">
            <div className="lg:sticky lg:top-[120px]"><div className="mb-4 flex items-center gap-3"><span className="inline-block h-4 w-[2px] bg-orange" /><span className="label-orange">03. Aliados</span></div><h2 className="font-display text-[28px] leading-tight font-semibold md:text-[38px]">¿Tienes un servicio o eres <em className="font-serif-accent">freelance</em>?</h2><p className="mt-4 max-w-md text-[16px] leading-[1.65] text-muted-foreground">Cuéntanos qué haces. Sumamos aliados y especialistas a nuestros proyectos de forma continua.</p></div>
            <div className="tw-form-card relative p-8 md:p-9"><PostulacionForm tipo="servicio" /></div>
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

function TrabajaConNosotrosError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Trabaja con nosotros</span>
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
