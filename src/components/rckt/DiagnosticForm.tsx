import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { saveDiagnosticLead } from "@/lib/leads-diagnostic.functions";

const problemas = ["Captación y cierre", "Ecommerce rentable", "Operación"] as const;

const bandasInversion = [
  "Menos de $5.000.000 COP / mes (≈ USD 1.200)",
  "$5.000.000 – $15.000.000 COP / mes (≈ USD 1.200 – 3.700)",
  "$15.000.000 – $40.000.000 COP / mes (≈ USD 3.700 – 10.000)",
  "$40.000.000 – $100.000.000 COP / mes (≈ USD 10.000 – 25.000)",
  "Más de $100.000.000 COP / mes (≈ USD 25.000+)",
] as const;

const bandasLeads = [
  "Menos de 50 al mes",
  "50 – 200 al mes",
  "200 – 500 al mes",
  "500 – 2.000 al mes",
  "Más de 2.000 al mes",
] as const;

const bandasEmpleados = ["1 – 10", "11 – 50", "51 – 200", "201 – 1.000", "Más de 1.000"] as const;

export type DiagnosticFormProps = {
  whatsappUrl: string;
  submitLabel?: string;
  /** Texto legal opcional bajo el formulario. */
  legal?: React.ReactNode;
  /** Se llama cuando el envío fue exitoso. */
  onSent?: () => void;
  /** Recibe los valores solo después de guardar correctamente. */
  onSuccess?: (values: DiagnosticFormValues) => void;
};

export type DiagnosticFormValues = {
  empresa: string; sitio_web: string; pais: string; ciudad: string; cargo: string;
  empleados: string; sector: string; problema_principal: string;
  inversion_pauta: string; volumen_leads: string; crm_actual: string;
  whatsapp_ventas: string; fecha_inicio: string; nombre: string;
  email: string; telefono: string;
};

/** Formulario de calificación compartido: guarda en leads_diagnostic. */
export default function DiagnosticForm({
  whatsappUrl,
  submitLabel = "Solicitar Revenue Diagnostic →",
  legal,
  onSent,
  onSuccess,
}: DiagnosticFormProps) {
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completos, setCompletos] = useState(0);
  const enviar = useServerFn(saveDiagnosticLead);

  const progressFields = ["nombre", "email", "cargo", "empresa", "empleados", "problema_principal"];

  function updateProgress(form: HTMLFormElement) {
    const data = new FormData(form);
    setCompletos(progressFields.filter((field) => String(data.get(field) ?? "").trim() !== "").length);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();
    const values: DiagnosticFormValues = {
      empresa: get("empresa"), sitio_web: get("sitio_web"), pais: get("pais"), ciudad: get("ciudad"),
      cargo: get("cargo"), empleados: get("empleados"), sector: get("sector"),
      problema_principal: get("problema_principal"), inversion_pauta: get("inversion_pauta"),
      volumen_leads: get("volumen_leads"), crm_actual: get("crm_actual"),
      whatsapp_ventas: get("whatsapp_ventas"), fecha_inicio: get("fecha_inicio"),
      nombre: get("nombre"), email: get("email"), telefono: get("telefono"),
    };

    try {
      await enviar({
        data: values,
      });
      setListo(true);
      onSent?.();
      onSuccess?.(values);
    } catch (err) {
      console.error("No se pudo enviar la solicitud de diagnóstico", err);
      setError("No pudimos enviar tu solicitud. Intenta de nuevo en unos segundos.");
    } finally {
      setEnviando(false);
    }
  }

  if (listo) {
    return (
      <div className="ct-card p-6 text-center md:p-10" role="status">
        <h3>Recibimos tu solicitud.</h3>
        <p>Te respondemos en 24–48 horas con los próximos pasos.</p>
        <a className="btn btn-primary" href={whatsappUrl} target="_blank" rel="noopener">
          Escribir por WhatsApp →
        </a>
      </div>
    );
  }

  return (
    <form className="rd-form ct-card p-6 md:p-10" onSubmit={onSubmit} onInput={(event) => updateProgress(event.currentTarget)}>
      <div className="flex items-center justify-between gap-4">
        <span className="label-orange">Solicitud de diagnóstico</span>
        <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">{completos} de {progressFields.length}</span>
      </div>
      <div className="ct-progress mt-3" aria-hidden="true"><div className="ct-progress__bar" style={{ width: `${(completos / progressFields.length) * 100}%` }} /></div>

      <p className="label-orange mt-9">Tú</p>
      <div className="rd-grid mt-4">
        <div className="field"><label className="ct-label" htmlFor="nombre">Nombre</label><input className="ct-input mt-2" id="nombre" name="nombre" type="text" /></div>
        <div className="field"><label className="ct-label" htmlFor="email">Email de trabajo</label><input className="ct-input mt-2" id="email" name="email" type="email" /></div>
        <div className="field"><label className="ct-label" htmlFor="telefono">Celular</label><input className="ct-input mt-2" id="telefono" name="telefono" type="tel" /></div>
        <div className="field"><label className="ct-label" htmlFor="cargo">Cargo</label><input className="ct-input mt-2" id="cargo" name="cargo" type="text" /></div>
      </div>

      <p className="label-orange mt-10">Tu empresa</p>
      <div className="rd-grid mt-4">
        <div className="field"><label className="ct-label" htmlFor="empresa">Empresa</label><input className="ct-input mt-2" id="empresa" name="empresa" required type="text" /></div>
        <div className="field"><label className="ct-label" htmlFor="sitio_web">Sitio web</label><input className="ct-input mt-2" id="sitio_web" name="sitio_web" type="text" /></div>
        <div className="field"><label className="ct-label" htmlFor="pais">País</label><input className="ct-input mt-2" id="pais" name="pais" type="text" /></div>
        <div className="field"><label className="ct-label" htmlFor="ciudad">Ciudad</label><input className="ct-input mt-2" id="ciudad" name="ciudad" type="text" /></div>
        <div className="field">
          <label className="ct-label" htmlFor="empleados">Número de empleados</label>
          <select className="ct-select mt-2" id="empleados" name="empleados" defaultValue="">
            <option value="">Selecciona</option>
            {bandasEmpleados.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="field"><label className="ct-label" htmlFor="sector">Sector</label><input className="ct-input mt-2" id="sector" name="sector" type="text" /></div>
      </div>

      <p className="label-orange mt-10">Tu situación</p>
      <fieldset className="mt-4">
        <legend className="ct-label">Problema principal</legend>
        <div className="mt-2 grid gap-3">
          {problemas.map((problema) => <label key={problema} className="ct-radio"><input className="sr-only" type="radio" name="problema_principal" value={problema} /><span>{problema}</span></label>)}
        </div>
      </fieldset>
      <div className="rd-grid mt-5">
        <div className="field">
          <label className="ct-label" htmlFor="inversion_pauta">Inversión mensual en pauta</label>
          <select className="ct-select mt-2" id="inversion_pauta" name="inversion_pauta" defaultValue="">
            <option value="">Selecciona</option>
            {bandasInversion.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label className="ct-label" htmlFor="volumen_leads">Volumen de leads al mes</label>
          <select className="ct-select mt-2" id="volumen_leads" name="volumen_leads" defaultValue="">
            <option value="">Selecciona</option>
            {bandasLeads.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label className="ct-label" htmlFor="crm_actual">CRM actual</label>
          <input className="ct-input mt-2" id="crm_actual" name="crm_actual" type="text" />
        </div>
        <div className="field">
          <label className="ct-label" htmlFor="whatsapp_ventas">Uso de WhatsApp en ventas</label>
          <select className="ct-select mt-2" id="whatsapp_ventas" name="whatsapp_ventas" defaultValue="">
            <option value="">Selecciona</option>
            <option value="No lo usamos">No lo usamos</option>
            <option value="Celulares personales del equipo">Celulares personales del equipo</option>
            <option value="WhatsApp Business (una línea)">WhatsApp Business (una línea)</option>
            <option value="API / plataforma conectada al CRM">
              API / plataforma conectada al CRM
            </option>
          </select>
        </div>
        <div className="field">
          <label className="ct-label" htmlFor="fecha_inicio">Fecha prevista de inicio</label>
          <input className="ct-input mt-2" id="fecha_inicio" name="fecha_inicio" type="date" />
        </div>
      </div>

      {error && (
        <p className="form-note" role="alert" style={{ color: "var(--naranja)" }}>
          {error}
        </p>
      )}

      <div className="submit-row rd-actions mt-8">
        <button className="btn-orange font-display w-full rounded-full px-8 py-4 text-[15px] font-semibold" type="submit" disabled={enviando}>
          {enviando ? "Enviando…" : submitLabel}
        </button>
        <a className="btn-outline-lt font-display inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-[15px] font-semibold" href={whatsappUrl} target="_blank" rel="noopener">
          Escribir por WhatsApp →
        </a>
      </div>
      <span className="form-note">Sin compromiso. Respuesta humana en 24–48 horas.</span>
      {legal}
    </form>
  );
}
