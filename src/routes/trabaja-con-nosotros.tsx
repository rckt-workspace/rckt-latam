import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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

const inputClass =
  "w-full rounded-[10px] border border-[var(--line-strong)] bg-[color-mix(in_srgb,#ffffff_60%,transparent)] px-3 py-2.5 text-[15px] text-[var(--carbon)] outline-none focus:border-[var(--naranja)]";
const labelClass = "mb-1.5 block text-[13px] font-semibold text-[var(--carbon-soft)]";
const cardClass =
  "rounded-[14px] border border-[var(--line)] bg-[color-mix(in_srgb,#ffffff_45%,transparent)] p-6 backdrop-blur-[10px]";

function TrabajaConNosotros() {
  const [vacantes, setVacantes] = useState<Vacante[] | null>(null);
  const [aplicar, setAplicar] = useState<Vacante | null>(null);

  useEffect(() => {
    supabase
      .from("vacantes")
      .select("id,titulo,area,modalidad,ubicacion,descripcion,requisitos")
      .eq("estado", "activa")
      .order("fecha_publicacion", { ascending: false })
      .then(({ data }) => setVacantes((data as Vacante[]) ?? []));
  }, []);

  return (
    <div className="rckt-site">
      <main className="min-h-screen bg-[var(--papel)] text-[var(--carbon)]">
        <div className="container mx-auto max-w-[1180px] px-5 py-14">
          <Link className="text-[14px] text-[var(--carbon-soft)] hover:text-[var(--naranja)]" to="/">
            ← Volver al inicio
          </Link>

          {/* HERO */}
          <section className="py-12">
            <span className="text-[12px] font-semibold tracking-[.18em] text-[var(--naranja)]">
              TRABAJA CON NOSOTROS
            </span>
            <h1 className="mt-4 max-w-[860px] text-[clamp(34px,5vw,60px)] font-bold leading-[1.08]">
              Construye el futuro del trabajo con nosotros.
            </h1>
            <p className="mt-5 max-w-[720px] text-justify text-[17px] leading-[1.65] text-[var(--carbon-soft)]">
              En RCKT buscamos personas curiosas, autónomas, colaborativas y abiertas a aprender constantemente. Si
              quieres hacer parte de una cultura flexible, humana, diversa y preparada para el futuro, queremos
              conocerte.
            </p>
          </section>

          {/* CULTURA */}
          <section className="py-10">
            <h2 className="text-[clamp(24px,3.2vw,36px)] font-bold">Nuestra cultura se construye cada día</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {cultura.map((c) => (
                <article key={c.titulo} className={cardClass}>
                  <span className="text-[13px] font-bold text-[var(--naranja)]">{c.n}</span>
                  <h3 className="mt-3 text-[19px] font-bold leading-tight">{c.titulo}</h3>
                  <p className="mt-3 text-justify text-[15px] leading-[1.6] text-[var(--carbon-soft)]">{c.texto}</p>
                </article>
              ))}
            </div>
          </section>

          {/* VACANTES */}
          <section className="py-10" id="vacantes">
            <h2 className="text-[clamp(24px,3.2vw,36px)] font-bold">Vacantes abiertas</h2>
            <div className="mt-8 grid gap-4">
              {vacantes === null && <p className="text-[var(--carbon-soft)]">Cargando vacantes…</p>}
              {vacantes?.length === 0 && (
                <div className={cardClass}>
                  <p className="text-[15px] text-[var(--carbon-soft)]">
                    Actualmente no tenemos vacantes abiertas, pero puedes dejarnos tu perfil en el formulario de abajo.
                  </p>
                </div>
              )}
              {vacantes?.map((v) => (
                <article key={v.id} className={`${cardClass} flex flex-wrap items-start justify-between gap-5`}>
                  <div className="max-w-[720px]">
                    <h3 className="text-[20px] font-bold">{v.titulo}</h3>
                    <p className="mt-2 text-[13px] uppercase tracking-[.08em] text-[var(--naranja)]">
                      {[v.area, v.modalidad, v.ubicacion].filter(Boolean).join(" · ")}
                    </p>
                    {v.descripcion && (
                      <p className="mt-3 text-justify text-[15px] leading-[1.6] text-[var(--carbon-soft)]">
                        {v.descripcion}
                      </p>
                    )}
                    {v.requisitos && (
                      <p className="mt-2 whitespace-pre-line text-justify text-[14px] leading-[1.6] text-[var(--carbon-soft)]">
                        {v.requisitos}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setAplicar(v)}
                    className="rounded-full bg-[var(--naranja)] px-5 py-2.5 text-[14px] font-semibold text-white"
                  >
                    Aplicar →
                  </button>
                </article>
              ))}
            </div>
          </section>

          {/* FREELANCE */}
          <section className="py-10" id="freelance">
            <h2 className="text-[clamp(24px,3.2vw,36px)] font-bold">¿Tienes un servicio o eres freelance?</h2>
            <p className="mt-3 max-w-[720px] text-justify text-[16px] text-[var(--carbon-soft)]">
              Cuéntanos qué haces. Sumamos aliados y especialistas a nuestros proyectos de forma continua.
            </p>
            <div className={`${cardClass} mt-7 max-w-[720px]`}>
              <PostulacionForm tipo="servicio" />
            </div>
          </section>
        </div>
      </main>

      {aplicar && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-10"
          onClick={() => setAplicar(null)}
        >
          <div
            className="w-full max-w-[600px] rounded-[16px] border border-[var(--line)] bg-[var(--papel)] p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[12px] font-semibold tracking-[.16em] text-[var(--naranja)]">APLICAR</span>
                <h3 className="mt-1 text-[22px] font-bold text-[var(--carbon)]">{aplicar.titulo}</h3>
              </div>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={() => setAplicar(null)}
                className="text-[22px] leading-none text-[var(--carbon-soft)]"
              >
                ×
              </button>
            </div>
            <div className="mt-5">
              <PostulacionForm tipo="candidato" vacanteId={aplicar.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PostulacionForm({ tipo, vacanteId }: { tipo: "candidato" | "servicio"; vacanteId?: string }) {
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      let cvUrl: string | null = null;
      const cv = fd.get("cv");
      if (cv instanceof File && cv.size > 0) {
        const path = `${crypto.randomUUID()}-${cv.name.replace(/[^\w.\-]+/g, "_")}`;
        const { error: upErr } = await supabase.storage.from("cvs").upload(path, cv, {
          contentType: cv.type || "application/pdf",
        });
        if (upErr) throw upErr;
        cvUrl = path;
      }
      const { error: insErr } = await supabase.from("postulaciones").insert({
        vacante_id: vacanteId ?? null,
        tipo,
        nombre: String(fd.get("nombre") ?? ""),
        email: String(fd.get("email") ?? ""),
        telefono: String(fd.get("telefono") ?? "") || null,
        portafolio_url: String(fd.get("portafolio") ?? "") || null,
        mensaje: String(fd.get("mensaje") ?? "") || null,
        cv_url: cvUrl,
      });
      if (insErr) throw insErr;
      setListo(true);
      form.reset();
    } catch (err) {
      setError("No pudimos enviar tu postulación. Inténtalo de nuevo en unos minutos.");
      console.error(err);
    } finally {
      setEnviando(false);
    }
  }

  if (listo) {
    return (
      <p className="text-[16px] text-[var(--carbon)]">
        ¡Gracias! Recibimos tu información. Si tu perfil encaja, te escribiremos al correo que nos dejaste.
      </p>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`nombre-${tipo}`}>Nombre completo</label>
          <input className={inputClass} id={`nombre-${tipo}`} name="nombre" required />
        </div>
        <div>
          <label className={labelClass} htmlFor={`email-${tipo}`}>Email</label>
          <input className={inputClass} id={`email-${tipo}`} name="email" type="email" required />
        </div>
        <div>
          <label className={labelClass} htmlFor={`tel-${tipo}`}>Teléfono</label>
          <input className={inputClass} id={`tel-${tipo}`} name="telefono" />
        </div>
        <div>
          <label className={labelClass} htmlFor={`port-${tipo}`}>Portafolio o LinkedIn</label>
          <input className={inputClass} id={`port-${tipo}`} name="portafolio" type="url" placeholder="https://" />
        </div>
      </div>

      {tipo === "candidato" && (
        <div>
          <label className={labelClass} htmlFor="cv">Hoja de vida (PDF)</label>
          <input className={inputClass} id="cv" name="cv" type="file" accept="application/pdf" required />
        </div>
      )}

      <div>
        <label className={labelClass} htmlFor={`msg-${tipo}`}>
          {tipo === "servicio" ? "Descripción del servicio que ofreces" : "Mensaje breve"}
        </label>
        <textarea className={inputClass} id={`msg-${tipo}`} name="mensaje" rows={4} required={tipo === "servicio"} />
      </div>

      <label className="flex items-start gap-2 text-[14px] text-[var(--carbon-soft)]">
        <input className="mt-1" name="acepta" type="checkbox" required />
        <span>
          Acepto el tratamiento de mis datos personales según la{" "}
          <a className="underline" href="/politica-tratamiento-datos.pdf" download>
            Política de Tratamiento de Datos
          </a>
          .
        </span>
      </label>

      {error && <p className="text-[14px] text-[var(--naranja-deep)]">{error}</p>}

      <button
        className="justify-self-start rounded-full bg-[var(--naranja)] px-6 py-3 text-[15px] font-semibold text-white disabled:opacity-60"
        disabled={enviando}
        type="submit"
      >
        {enviando ? "Enviando…" : "Enviar postulación →"}
      </button>
    </form>
  );
}
