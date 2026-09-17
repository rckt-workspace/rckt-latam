import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import { PostulacionForm } from "@/components/PostulacionForm";

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
});

type Vacante = {
  id: string;
  titulo: string;
  area: string | null;
  modalidad: string | null;
  ubicacion: string | null;
  descripcion: string | null;
  requisitos: string | null;
};

const cultura = [
  {
    n: "01.",
    titulo: "Equidad y enfoque de género",
    texto:
      "Estamos comprometidos con la construcción de entornos laborales más equitativos e inclusivos. Impulsamos iniciativas con enfoque de género orientadas a promover la igualdad de oportunidades, prevenir sesgos y fortalecer una cultura basada en el respeto, la diversidad y el reconocimiento de las capacidades de cada persona.",
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

  useEffect(() => {
    supabase
      .from("vacantes")
      .select("id,titulo,area,modalidad,ubicacion,descripcion,requisitos")
      .eq("estado", "activa")
      .order("fecha_publicacion", { ascending: false })
      .then(({ data }) => setVacantes((data as Vacante[]) ?? []));
  }, []);

  useSiteMotion([vacantes]);

  return (
    <div className="rckt-site">
      <main id="top">
        <section className="subpage-hero">
          <SiteHeader />
          <div className="container">
            <div className="subpage-hero-inner">
              <span className="kicker">Trabaja con nosotros</span>
              <h1>Construye el futuro del trabajo con nosotros.</h1>
              <p className="sub">
                En RCKT buscamos personas curiosas, autónomas, colaborativas y abiertas a aprender constantemente. Si
                quieres hacer parte de una cultura flexible, humana, diversa y preparada para el futuro, queremos
                conocerte.
              </p>
            </div>
          </div>
        </section>

        <section className="band">
          <div className="container">
            <div className="section-head">
              <span className="num">01.</span>
              <span className="kicker ital-label">Cultura</span>
              <span className="divider"></span>
            </div>
            <h2 className="rv" style={{ fontSize: "clamp(26px,3.4vw,36px)", margin: "0 0 48px", fontWeight: 800 }}>
              Nuestra cultura se construye cada día
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
              {vacantes?.length === 0 && (
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
                    <p className="vacante-meta">{[v.area, v.modalidad, v.ubicacion].filter(Boolean).join(" · ")}</p>
                    {v.descripcion && <p>{v.descripcion}</p>}
                    {v.requisitos && <p style={{ whiteSpace: "pre-line" }}>{v.requisitos}</p>}
                  </div>
                  <Link className="btn btn-primary btn-sm" params={{ id: v.id }} to="/trabaja-con-nosotros/aplicar/$id">
                    Aplicar →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="freelance">
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
    </div>
  );
}
