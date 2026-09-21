import { createFileRoute, useNavigate, useParams, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useState } from "react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import { PostulacionForm } from "@/components/PostulacionForm";
import { getVacancyById, type VacantePublica } from "@/lib/vacantes.functions";

const SITE_URL = "https://rckt-latam.lovable.app";

export const Route = createFileRoute("/trabaja-con-nosotros_/aplicar/$id")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Aplicar a una vacante — RCKT" },
      {
        name: "description",
        content:
          "Envía tu postulación a una vacante abierta en RCKT: datos, hoja de vida y portafolio.",
      },
      { property: "og:title", content: "Aplicar a una vacante — RCKT" },
      {
        property: "og:description",
        content: "Completa el formulario y envía tu postulación al equipo de RCKT.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/trabaja-con-nosotros" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AplicarVacante,
  errorComponent: AplicarError,
  notFoundComponent: () => <AplicarError />,
});

function AplicarVacante() {
  const { id } = useParams({ from: "/trabaja-con-nosotros_/aplicar/$id" });
  const navigate = useNavigate();
  const [vacante, setVacante] = useState<VacantePublica | null>(null);
  const [cargando, setCargando] = useState(true);
  const [errorVacante, setErrorVacante] = useState(false);
  const [exito, setExito] = useState(false);
  const fetchVacante = useServerFn(getVacancyById);

  const cargar = useCallback(async () => {
    setCargando(true);
    setErrorVacante(false);
    try {
      const timeout = new Promise<never>((_, reject) => {
        window.setTimeout(() => reject(new Error("La consulta tardó demasiado.")), 12_000);
      });
      const data = await Promise.race([fetchVacante({ data: { id } }), timeout]);
      setVacante(data ?? null);
    } catch (error) {
      console.error("No se pudo cargar la vacante", error);
      setVacante(null);
      setErrorVacante(true);
    } finally {
      setCargando(false);
    }
  }, [fetchVacante, id]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const titulo = vacante?.titulo ?? null;
  const meta = vacante ? [vacante.area, "Remoto"].filter(Boolean).join(" · ") : "";

  useSiteMotion([titulo, cargando]);

  function onExito() {
    setExito(true);
    window.setTimeout(() => navigate({ to: "/trabaja-con-nosotros" }), 2200);
  }

  return (
    <div className="rckt-site apply-page">
      <main id="top">
        <section className="subpage-hero subpage-hero-sm">
          <SiteHeader />
          <div className="container">
            <div className="subpage-hero-inner">
              <span className="kicker">Postulación</span>
              <h1>{titulo ?? "Aplicar a la vacante"}</h1>
              {cargando && <p className="vacante-meta">Cargando vacante…</p>}
              {!cargando && meta && <p className="vacante-meta">{meta}</p>}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="container">
            <div className="form-card form-card-center rv in">
              {errorVacante && (
                <div role="alert" style={{ marginBottom: 18 }}>
                  <p>No pudimos cargar los datos de la vacante, intenta de nuevo.</p>
                  <button
                    className="btn btn-primary btn-sm"
                    type="button"
                    onClick={() => void cargar()}
                  >
                    Intentar de nuevo
                  </button>
                </div>
              )}
              {exito ? (
                <p className="form-exito">
                  ¡Gracias! Recibimos tu postulación. Te llevamos de vuelta…
                </p>
              ) : (
                <PostulacionForm onExito={onExito} tipo="candidato" vacanteId={id} />
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function AplicarError() {
  const router = useRouter();

  return (
    <div className="rckt-site apply-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Postulación</span>
            <h1>No pudimos mostrar esta página.</h1>
            <p>Intenta cargarla nuevamente. Si el problema continúa, vuelve a las vacantes.</p>
            <div className="form-actions">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => void router.invalidate()}
              >
                Intentar de nuevo
              </button>
              <a className="btn" href="/trabaja-con-nosotros">
                Ver vacantes
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
