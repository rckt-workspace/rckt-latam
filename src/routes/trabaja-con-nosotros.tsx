import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useState } from "react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import { PostulacionForm } from "@/components/PostulacionForm";
import heroAsset from "@/assets/rckt-hero.jpg";
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
        content: "Buscamos personas curiosas, autónomas y colaborativas. Conoce nuestras vacantes abiertas.",
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
    titulo: "Todos somos RCKT",
    texto:
      "Tanto hombres como mujeres estamos comprometidos con la construcción de entornos laborales más equitativos e inclusivos. Impulsamos iniciativas para prevenir sesgos, fomentar el respeto y reconocer el talento sin distinción de género.",
  },
  {
    n: "02.",
    titulo: "Flexibilidad que se adapta a las personas",
    texto:
      "Somos una organización 100% remota, y entendemos la flexibilidad como una herramienta para promover la autonomía, la confianza y una mejor integración entre la vida personal y profesional. Nos enfocamos en los objetivos, los resultados y la responsabilidad de cada integrante del equipo.",
  },
  {
    n: "03.",
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
        window.setTimeout(() => reject(new Error("La consulta de vacantes tardó demasiado.")), 12_000);
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
      <main id="top">
        <section className="subpage-hero">
          <div className="subpage-hero-photo" aria-hidden="true">
            <img src={heroAsset} alt="" />
            <span className="subpage-hero-photo-overlay" />
          </div>
          <span className="tcn-orb tcn-orb-hero-corner" aria-hidden="true" />
          <span className="tcn-orb tcn-orb-hero" aria-hidden="true" />
          <SiteHeader />
          <div className="container">
            <div className="subpage-hero-inner">
              <span className="kicker">Trabaja con nosotros</span>
              <h1>
                Descubre el futuro del trabajo con{" "}
                <span className="hero-hand">nosotros</span>.
              </h1>
              <p className="sub">
                En RCKT buscamos personas curiosas, autónomas, colaborativas y abiertas a aprender constantemente. Si
                quieres hacer parte de una cultura flexible, humana, diversa y preparada para el futuro, queremos
                conocerte.
              </p>
            </div>
          </div>
        </section>

        <section className="band tcn-cultura">
          <span className="tcn-orb tcn-orb-cultura-left" aria-hidden="true" />
          <span className="tcn-orb tcn-orb-cultura-right" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">01.</span>
              <span className="kicker ital-label">Cultura</span>
              <span className="divider"></span>
            </div>
            <h2 className="rv" style={{ fontSize: "clamp(26px,3.4vw,36px)", margin: "0 0 48px", fontWeight: 800 }}>
              Desde People and Culture, así nos diferenciamos.
            </h2>
            <div className="three-grid">
              {cultura.map((c) => (
                <div className="three-card rv" key={c.titulo}>
                  <span className="num">{c.n}</span>
                  <h3>{c.titulo}</h3>
                  <p>{c.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-alt" id="vacantes">
          <span className="tcn-orb tcn-orb-vacantes" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">02.</span>
              <span className="kicker ital-label">Oportunidades</span>
              <span className="divider"></span>
            </div>
            <h2 className="rv" style={{ fontSize: "clamp(26px,3.4vw,36px)", margin: "0 0 48px", fontWeight: 800 }}>
              Vacantes abiertas
            </h2>
            <div className="vacantes-list">
              {vacantes === null && <p className="vacantes-nota">Cargando vacantes…</p>}
              {vacantesError && (
                <div className="vacante-card rv" role="alert">
                  <p>No pudimos cargar las vacantes, intenta de nuevo.</p>
                  <button className="btn btn-primary btn-sm" type="button" onClick={() => void cargarVacantes()}>
                    Intentar de nuevo
                  </button>
                </div>
              )}
              {!vacantesError && vacantes?.length === 0 && (
                <div className="vacante-card rv">
                  <p>
                    Actualmente no tenemos vacantes abiertas, pero puedes dejarnos tu perfil en el formulario de abajo.
                  </p>
                </div>
              )}
              {vacantes?.map((v) => (
                <article className="vacante-card rv" key={v.id}>
                  <div className="vacante-info">
                    <h3>{v.titulo}</h3>
                    <p className="vacante-meta">{[v.area, "Remoto"].filter(Boolean).join(" · ")}</p>
                  </div>
                  <button className="btn btn-primary btn-sm" type="button" onClick={() => setDetalle(v)}>
                    Ver vacante →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="freelance">
          <span className="tcn-orb tcn-orb-cta" aria-hidden="true" />
          <div className="container">
            <div className="section-head">
              <span className="num">03.</span>
              <span className="kicker ital-label">Aliados</span>
              <span className="divider"></span>
            </div>
            <h2 className="rv" style={{ fontSize: "clamp(26px,3.4vw,36px)", margin: "0 0 18px", fontWeight: 800 }}>
              ¿Tienes un servicio o eres freelance?
            </h2>
            <p style={{ maxWidth: 680, marginBottom: 36 }}>
              Cuéntanos qué haces. Sumamos aliados y especialistas a nuestros proyectos de forma continua.
            </p>
            <div className="form-card rv">
              <PostulacionForm tipo="servicio" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      {detalle && (
        <div className="vacante-modal-overlay" role="dialog" aria-modal="true" onClick={() => setDetalle(null)}>
          <div className="vacante-modal" onClick={(e) => e.stopPropagation()}>
            <button className="vacante-modal-close" type="button" aria-label="Cerrar" onClick={() => setDetalle(null)}>
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
              <button className="btn btn-primary" type="button" onClick={() => void router.invalidate()}>
                Intentar de nuevo
              </button>
              <a className="btn" href="/">Volver al inicio</a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
