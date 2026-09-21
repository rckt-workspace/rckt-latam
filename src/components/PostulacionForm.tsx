import { useRef, useState } from "react";

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
  const [cvError, setCvError] = useState<string | null>(null);
  const [arrastrando, setArrastrando] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLLabelElement>(null);

  function tomarArchivo(file: File | null | undefined) {
    setCvError(null);
    console.log(
      "[CV] archivo recibido:",
      file
        ? { nombre: file.name, tipo: file.type, tamanoMB: (file.size / 1024 / 1024).toFixed(2) }
        : file,
    );
    if (!file) {
      setCvError("No recibimos ningún archivo. Intenta seleccionarlo de nuevo.");
      return;
    }
    const esPdf =
      file.type === "application/pdf" ||
      file.type === "application/x-pdf" ||
      file.name.toLowerCase().endsWith(".pdf");
    if (!esPdf) {
      setArchivo(null);
      if (inputRef.current) inputRef.current.value = "";
      setCvError("El archivo debe ser un PDF.");
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setArchivo(null);
      if (inputRef.current) inputRef.current.value = "";
      setCvError(
        `El archivo pesa ${(file.size / 1024 / 1024).toFixed(1)} MB. El máximo es ${MAX_MB} MB.`,
      );
      return;
    }
    setError(null);
    setArchivo(file);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const archivoFinal = archivo ?? inputRef.current?.files?.[0] ?? null;

    if (!archivoFinal) {
      setCvError("Adjunta tu hoja de vida en PDF antes de enviar.");
      dropRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      dropRef.current?.focus();
      return;
    }

    // Validación básica en cliente (UX)
    if (archivoFinal.type !== "application/pdf") {
      setCvError("El archivo debe ser un PDF válido.");
      return;
    }

    if (archivoFinal.size > MAX_MB * 1024 * 1024) {
      setCvError(
        `El archivo pesa ${(archivoFinal.size / 1024 / 1024).toFixed(1)} MB. El máximo es ${MAX_MB} MB.`,
      );
      return;
    }

    setEnviando(true);
    setPaso("Enviando tu postulación…");
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Agregar archivo y consentimiento a FormData
    fd.set("cv", archivoFinal);
    fd.set("consent", "true");
    fd.set("tipo", tipo);
    if (vacanteId) fd.set("vacante_id", vacanteId);

    try {
      // Enviar al endpoint server-side
      const response = await fetch("/api/aplicaciones/enviar", {
        method: "POST",
        body: fd,
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok) {
        throw new Error(result.error || "No pudimos procesar tu solicitud");
      }

      setListo(true);
      form.reset();
      setArchivo(null);
      setCvError(null);
      if (inputRef.current) inputRef.current.value = "";
      onExito?.();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(
        navigator.onLine === false
          ? "Parece que no tienes conexión. Revisa tu internet e inténtalo de nuevo."
          : msg,
      );
      console.error("[PostulacionForm]", err);
    } finally {
      setEnviando(false);
      setPaso("");
    }
  }

  if (listo) {
    return (
      <p className="form-exito">
        ¡Gracias! Recibimos tu postulación. Si tu perfil encaja, te escribiremos al correo que nos
        dejaste.
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

      {(tipo === "candidato" || tipo === "servicio") && (
        <div className="field">
          <label htmlFor={`cv-${tipo}`}>Hoja de vida (PDF)</label>
          <input
            ref={inputRef}
            id={`cv-${tipo}`}
            name="cv"
            type="file"
            accept=".pdf,application/pdf"
            className="cv-input-hidden"
            onClick={(e) => {
              (e.currentTarget as HTMLInputElement).value = "";
            }}
            onChange={(e) => {
              tomarArchivo(e.target.files?.[0]);
            }}
          />
          {archivo ? (
            <div className="cv-file">
              <span className="cv-check" aria-hidden="true">
                ✓
              </span>
              <span className="cv-name">{archivo.name}</span>
              <span className="cv-size">{(archivo.size / 1024 / 1024).toFixed(1)} MB</span>
              <button
                className="cv-remove"
                type="button"
                onClick={() => {
                  if (inputRef.current) inputRef.current.value = "";
                  inputRef.current?.click();
                }}
              >
                Cambiar
              </button>
              <button
                className="cv-remove"
                type="button"
                onClick={() => {
                  setArchivo(null);
                  setCvError(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
              >
                Quitar
              </button>
            </div>
          ) : (
            <label
              ref={dropRef}
              htmlFor={`cv-${tipo}`}
              className={`cv-drop${arrastrando ? " dragging" : ""}${cvError ? " has-error" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setArrastrando(true);
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                setArrastrando(true);
              }}
              onDragLeave={() => setArrastrando(false)}
              onDrop={(e) => {
                e.preventDefault();
                setArrastrando(false);
                const f = e.dataTransfer.files?.[0] ?? e.dataTransfer.items?.[0]?.getAsFile();
                tomarArchivo(f);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
            >
              <span className="cv-icon" aria-hidden="true">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M14 3v5h5" />
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                  <path d="M9 13h6M9 17h4" />
                </svg>
              </span>
              <strong>Arrastra tu CV aquí o haz clic para seleccionar</strong>
              <span className="cv-hint">PDF, máx. {MAX_MB} MB</span>
            </label>
          )}
          {cvError && <p className="form-error cv-error">{cvError}</p>}
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
          <a href="/politica-tratamiento-datos.pdf" download>
            Política de Tratamiento de Datos
          </a>
          .
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
