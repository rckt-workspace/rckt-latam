import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import { PostulacionForm } from "@/components/PostulacionForm";

const SITE_URL = "https://rckt-latam.lovable.app";

export const Route = createFileRoute("/trabaja-con-nosotros_/aplicar/$id")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Aplicar a una vacante — RCKT" },
      { name: "description", content: "Envía tu postulación a una vacante abierta en RCKT: datos, hoja de vida y portafolio." },
      { property: "og:title", content: "Aplicar a una vacante — RCKT" },
      { property: "og:description", content: "Completa el formulario y envía tu postulación al equipo de RCKT." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/trabaja-con-nosotros" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AplicarVacante,
});

function AplicarVacante() {
  const { id } = useParams({ from: "/trabaja-con-nosotros_/aplicar/$id" });
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState<string | null>(null);
  const [meta, setMeta] = useState<string>("");
  const [exito, setExito] = useState(false);

  useEffect(() => {
    supabase
      .from("vacantes")
      .select("titulo,area,modalidad,ubicacion")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        setTitulo(data.titulo);
        setMeta([data.area, data.modalidad, data.ubicacion].filter(Boolean).join(" · "));
      });
  }, [id]);

  useSiteMotion([titulo]);

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
              {meta && <p className="vacante-meta">{meta}</p>}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="container">
            <div className="form-card form-card-center rv in">
              {exito ? (
                <p className="form-exito">¡Gracias! Recibimos tu postulación. Te llevamos de vuelta…</p>
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
