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
};

/** Formulario de calificación compartido: guarda en leads_diagnostic. */
export default function DiagnosticForm({
  whatsappUrl,
  submitLabel = "Solicitar Revenue Diagnostic →",
  legal,
  onSent,
}: DiagnosticFormProps) {
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const enviar = useServerFn(saveDiagnosticLead);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();

    try {
      await enviar({
        data: {
          empresa: get("empresa"),
          sitio_web: get("sitio_web"),
          pais: get("pais"),
          ciudad: get("ciudad"),
          cargo: get("cargo"),
          empleados: get("empleados"),
          sector: get("sector"),
          problema_principal: get("problema_principal"),
          inversion_pauta: get("inversion_pauta"),
          volumen_leads: get("volumen_leads"),
          crm_actual: get("crm_actual"),
          whatsapp_ventas: get("whatsapp_ventas"),
          fecha_inicio: get("fecha_inicio"),
          nombre: get("nombre"),
          email: get("email"),
          telefono: get("telefono"),
        },
      });
      setListo(true);
      onSent?.();
    } catch (err) {
      console.error("No se pudo enviar la solicitud de diagnóstico", err);
      setError("No pudimos enviar tu solicitud. Intenta de nuevo en unos segundos.");
    } finally {
      setEnviando(false);
    }
  }

  if (listo) {
    return (
      <div role="status">
        <h3>Recibimos tu solicitud.</h3>
        <p>Te respondemos en 24–48 horas con los próximos pasos.</p>
        <a className="btn btn-primary" href={whatsappUrl} target="_blank" rel="noopener">
          Escribir por WhatsApp →
        </a>
      </div>
    );
  }

  return (
    <form className="rd-form" onSubmit={onSubmit}>
      <div className="rd-grid">
        <div className="field">
          <label htmlFor="empresa">Empresa</label>
          <input id="empresa" name="empresa" required type="text" />
        </div>
        <div className="field">
          <label htmlFor="sitio_web">Sitio web</label>
          <input id="sitio_web" name="sitio_web" type="text" />
        </div>
        <div className="field">
          <label htmlFor="pais">País</label>
          <input id="pais" name="pais" type="text" />
        </div>
        <div className="field">
          <label htmlFor="ciudad">Ciudad</label>
          <input id="ciudad" name="ciudad" type="text" />
        </div>
        <div className="field">
          <label htmlFor="cargo">Cargo</label>
          <input id="cargo" name="cargo" type="text" />
        </div>
        <div className="field">
          <label htmlFor="empleados">Número de empleados</label>
          <select id="empleados" name="empleados" defaultValue="">
            <option value="">Selecciona</option>
            {bandasEmpleados.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="sector">Sector</label>
          <input id="sector" name="sector" type="text" />
        </div>
        <div className="field">
          <label htmlFor="problema_principal">Problema principal</label>
          <select id="problema_principal" name="problema_principal" defaultValue="">
            <option value="">Selecciona</option>
            {problemas.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="inversion_pauta">Inversión mensual en pauta</label>
          <select id="inversion_pauta" name="inversion_pauta" defaultValue="">
            <option value="">Selecciona</option>
            {bandasInversion.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="volumen_leads">Volumen de leads al mes</label>
          <select id="volumen_leads" name="volumen_leads" defaultValue="">
            <option value="">Selecciona</option>
            {bandasLeads.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="crm_actual">CRM actual</label>
          <input id="crm_actual" name="crm_actual" type="text" />
        </div>
        <div className="field">
          <label htmlFor="whatsapp_ventas">Uso de WhatsApp en ventas</label>
          <select id="whatsapp_ventas" name="whatsapp_ventas" defaultValue="">
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
          <label htmlFor="fecha_inicio">Fecha prevista de inicio</label>
          <input id="fecha_inicio" name="fecha_inicio" type="date" />
        </div>
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" type="text" />
        </div>
        <div className="field">
          <label htmlFor="email">Email de trabajo</label>
          <input id="email" name="email" type="email" />
        </div>
        <div className="field">
          <label htmlFor="telefono">Celular</label>
          <input id="telefono" name="telefono" type="tel" />
        </div>
      </div>

      {error && (
        <p className="form-note" role="alert" style={{ color: "var(--naranja)" }}>
          {error}
        </p>
      )}

      <div className="submit-row rd-actions">
        <button className="btn btn-primary" type="submit" disabled={enviando}>
          {enviando ? "Enviando…" : submitLabel}
        </button>
        <a className="btn btn-primary" href={whatsappUrl} target="_blank" rel="noopener">
          Escribir por WhatsApp →
        </a>
      </div>
      <span className="form-note">Sin compromiso. Respuesta humana en 24–48 horas.</span>
      {legal}
    </form>
  );
}
