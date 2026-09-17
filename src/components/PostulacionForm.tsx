import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const MAX_MB = 10;

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
  const [paso, setPaso] = useState<string>("");
  const [listo, setListo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [arrastrando, setArrastrando] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function tomarArchivo(file: File | null | undefined) {
    setError(null);
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("El archivo debe ser un PDF.");
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`El archivo pesa ${(file.size / 1024 / 1024).toFixed(1)} MB. El máximo es ${MAX_MB} MB.`);
      return;
    }
    setArchivo(file);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (tipo === "candidato" && !archivo) {
      setError("Adjunta tu hoja de vida en PDF.");
      return;
    }
    setEnviando(true);
    setPaso(archivo ? "Subiendo tu hoja de vida…" : "Enviando…");
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      let cvUrl: string | null = null;
      if (archivo) {
        const path = `${crypto.randomUUID()}-${archivo.name.replace(/[^\w.\-]+/g, "_")}`;
        const { error: upErr } = await supabase.storage.from("cvs").upload(path, archivo, {
          contentType: "application/pdf",
          upsert: false,
        });
        if (upErr) throw new Error(`No pudimos subir el PDF: ${upErr.message}`);
        cvUrl = path;
      }
      setPaso("Enviando tu postulación…");
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
      if (insErr) throw new Error(insErr.message || "No pudimos guardar tu postulación.");
      setListo(true);
      form.reset();
      setArchivo(null);
      onExito?.();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(
        navigator.onLine === false
          ? "Parece que no tienes conexión. Revisa tu internet e inténtalo de nuevo."
          : msg,
      );
      console.error(err);
    } finally {
      setEnviando(false);
      setPaso("");
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
          <input
            ref={inputRef}
            id="cv"
            name="cv"
            type="file"
            accept="application/pdf"
            className="cv-input-hidden"
            onChange={(e) => tomarArchivo(e.target.files?.[0])}
          />
          {archivo ? (
            <div className="cv-file">
              <span className="cv-check" aria-hidden="true">✓</span>
              <span className="cv-name">{archivo.name}</span>
              <span className="cv-size">{(archivo.size / 1024 / 1024).toFixed(1)} MB</span>
              <button
                className="cv-remove"
                type="button"
                onClick={() => {
                  setArchivo(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
              >
                Quitar
              </button>
            </div>
          ) : (
            <div
              className={`cv-drop${arrastrando ? " dragging" : ""}`}
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setArrastrando(true);
              }}
              onDragLeave={() => setArrastrando(false)}
              onDrop={(e) => {
                e.preventDefault();
                setArrastrando(false);
                tomarArchivo(e.dataTransfer.files?.[0]);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
              }}
            >
              <span className="cv-icon" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M14 3v5h5" />
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                  <path d="M9 13h6M9 17h4" />
                </svg>
              </span>
              <strong>Arrastra tu CV aquí o haz clic para seleccionar</strong>
              <span className="cv-hint">PDF, máx. {MAX_MB} MB</span>
            </div>
          )}
        </div>
      )}

      <div className="field">
        <label htmlFor={`msg-${tipo}`}>
          {tipo === "servicio"
            ? "Descripción del servicio que ofreces"
            : "¿Por qué quieres trabajar con nosotros?"}
        </label>
        <textarea
          id={`msg-${tipo}`}
          name="mensaje"
          rows={4}
          placeholder={
            tipo === "servicio"
              ? "Cuéntanos qué haces y con quién has trabajado."
              : "Cuéntanos qué te motiva de RCKT y qué puedes aportar."
          }
          required={tipo === "servicio"}
        />
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
          {enviando ? paso || "Enviando…" : "Enviar postulación →"}
        </button>
      </div>
    </form>
  );
}
