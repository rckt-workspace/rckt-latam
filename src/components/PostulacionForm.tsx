import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function PostulacionForm({
  tipo,
  vacanteId,
  onExito,
}: {
  tipo: "candidato" | "servicio";
  vacanteId?: string;
  onExito?: () => void;
}) {
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
      onExito?.();
    } catch (err) {
      setError("No pudimos enviar tu postulación. Inténtalo de nuevo en unos minutos.");
      console.error(err);
    } finally {
      setEnviando(false);
    }
  }

  if (listo) {
    return (
      <p className="form-exito">
        ¡Gracias! Recibimos tu postulación. Si tu perfil encaja, te escribiremos al correo que nos dejaste.
      </p>
    );
  }

  return (
    <form className="app-form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor={`nombre-${tipo}`}>Nombre completo</label>
          <input id={`nombre-${tipo}`} name="nombre" required />
        </div>
        <div className="field">
          <label htmlFor={`email-${tipo}`}>Email</label>
          <input id={`email-${tipo}`} name="email" type="email" required />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor={`tel-${tipo}`}>Teléfono</label>
          <input id={`tel-${tipo}`} name="telefono" />
        </div>
        <div className="field">
          <label htmlFor={`port-${tipo}`}>Portafolio o LinkedIn</label>
          <input id={`port-${tipo}`} name="portafolio" type="url" placeholder="https://" />
        </div>
      </div>

      {tipo === "candidato" && (
        <div className="field">
          <label htmlFor="cv">Hoja de vida (PDF)</label>
          <input id="cv" name="cv" type="file" accept="application/pdf" required />
        </div>
      )}

      <div className="field">
        <label htmlFor={`msg-${tipo}`}>
          {tipo === "servicio" ? "Descripción del servicio que ofreces" : "Mensaje breve"}
        </label>
        <textarea id={`msg-${tipo}`} name="mensaje" rows={4} required={tipo === "servicio"} />
      </div>

      <label className="consent">
        <input name="acepta" type="checkbox" required />
        <span>
          Acepto el tratamiento de mis datos personales según la{" "}
          <a href="/politica-tratamiento-datos.pdf" download>Política de Tratamiento de Datos</a>.
        </span>
      </label>

      {error && <p className="form-error">{error}</p>}

      <div className="submit-row">
        <button className="btn btn-primary" disabled={enviando} type="submit">
          {enviando ? "Enviando…" : "Enviar postulación →"}
        </button>
      </div>
    </form>
  );
}
