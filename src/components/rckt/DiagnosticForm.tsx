import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { saveDiagnosticLead } from "@/lib/leads-diagnostic.functions";

const problemas = ["Captación y cierre", "Ecommerce rentable", "Operación"] as const;

const cargos = [
  "Director general / CEO",
  "Gerente general",
  "Director comercial",
  "Director de marketing",
  "Socio o fundador",
  "Gerente comercial",
  "Gerente de marketing",
  "Otro",
] as const;

const paises = [
  { code: "CO", name: "Colombia" },
  { code: "MX", name: "México" },
  { code: "PE", name: "Perú" },
  { code: "CL", name: "Chile" },
  { code: "EC", name: "Ecuador" },
  { code: "AR", name: "Argentina" },
  { code: "PA", name: "Panamá" },
  { code: "CR", name: "Costa Rica" },
  { code: "DO", name: "República Dominicana" },
  { code: "GT", name: "Guatemala" },
  { code: "SV", name: "El Salvador" },
  { code: "HN", name: "Honduras" },
  { code: "BO", name: "Bolivia" },
  { code: "PY", name: "Paraguay" },
  { code: "UY", name: "Uruguay" },
  { code: "BR", name: "Brasil" },
  { code: "OTH", name: "Otro" },
] as const;

const ciudadesPorPais: Record<string, string[]> = {
  CO: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Pereira", "Manizales", "Armenia", "Santa Marta", "Cúcuta", "Ibagué", "Villavicencio", "Pasto", "Otra"],
  MX: ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla", "Querétaro", "Mérida", "Tijuana", "León", "Otra"],
  PE: ["Lima", "Arequipa", "Trujillo", "Cusco", "Otra"],
  CL: ["Santiago", "Valparaíso / Viña del Mar", "Concepción", "Antofagasta", "Otra"],
  EC: ["Quito", "Guayaquil", "Cuenca", "Otra"],
  AR: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "Otra"],
  PA: ["Ciudad de Panamá", "David", "Otra"],
  CR: ["San José", "Alajuela", "Heredia", "Cartago", "Otra"],
  DO: ["Santo Domingo", "Santiago", "Punta Cana", "Otra"],
};

const sectores = [
  "Salud, estética y odontología",
  "Servicios B2B",
  "Construcción e inmobiliario",
  "Educación",
  "Ecommerce",
  "Industria y distribución",
  "Tecnología / SaaS",
  "Otro",
] as const;

const crmsActuales = [
  "HubSpot",
  "Salesforce",
  "Pipedrive",
  "Zoho",
  "RD Station",
  "Kommo",
  "Monday CRM",
  "Otro",
  "No tenemos CRM",
] as const;

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

const bandasEmpleados = ["1 – 10", "11 – 50", "51 – 200", "201 – 500", "Más de 500"] as const;

type FormErrors = Partial<Record<keyof DiagnosticFormValues | "consent", string>>;

export type DiagnosticFormProps = {
  whatsappUrl: string;
  submitLabel?: string;
  /** Identificador del origen del formulario: contacto, revenue-diagnostic, lp-sales-flow */
  source: string;
  /** Ruta de la página donde se renderiza el formulario. Por defecto: window.location.pathname */
  landingPath?: string;
  /** Versión del consentimiento de datos a guardar */
  consentVersion?: string;
  /** Se llama cuando el envío fue exitoso. */
  onSent?: () => void;
  /** Recibe el resultado del servidor (id, score, nivel) y valores del formulario. */
  onSuccess?: (
    result: { id: string; score: number; nivel: "sql" | "mql" | "recurso" },
    values: DiagnosticFormValues
  ) => void;
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
  source,
  landingPath,
  consentVersion,
  onSent,
  onSuccess,
}: DiagnosticFormProps) {
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [completos, setCompletos] = useState(0);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [paisSeleccionado, setPaisSeleccionado] = useState("");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [ciudadPersonalizada, setCiudadPersonalizada] = useState("");
  const enviar = useServerFn(saveDiagnosticLead);

  const progressFields = ["nombre", "email", "cargo", "empresa", "empleados", "problema_principal"];

  const validarEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  function updateProgress(form: HTMLFormElement) {
    const data = new FormData(form);
    setCompletos(progressFields.filter((field) => String(data.get(field) ?? "").trim() !== "").length);
  }

  function scrollToField(fieldId: string) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.scrollIntoView({ behavior: "smooth", block: "center" });
      field.focus();
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setErrors({});

    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();

    const newErrors: FormErrors = {};

    // Validación obligatoria
    if (!get("nombre")) newErrors.nombre = "Requerido";
    if (!get("email") || !validarEmail(get("email"))) newErrors.email = "Email válido requerido";
    if (!get("cargo")) newErrors.cargo = "Requerido";
    if (!get("empresa")) newErrors.empresa = "Requerido";
    if (!get("pais")) newErrors.pais = "Requerido";
    if (!get("empleados")) newErrors.empleados = "Requerido";
    if (!get("sector")) newErrors.sector = "Requerido";
    if (!get("problema_principal")) newErrors.problema_principal = "Requerido";
    if (!privacyAccepted) newErrors.consent = "Debes aceptar la Política de Tratamiento de Datos";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = Object.keys(newErrors)[0];
      scrollToField(firstError);
      return;
    }

    setEnviando(true);

    const ciudad = ciudadSeleccionada === "Otra"
      ? ciudadPersonalizada.trim()
      : ciudadSeleccionada || get("ciudad");
    const values: DiagnosticFormValues = {
      empresa: get("empresa"),
      sitio_web: get("sitio_web"),
      pais: get("pais"),
      ciudad: ciudad,
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
    };

    const landing_path = landingPath || (typeof window !== "undefined" ? window.location.pathname : undefined);
    const referrer = typeof document !== "undefined" ? document.referrer || undefined : undefined;

    const { getCampaignParams } = await import("./tracking");
    const campaign = getCampaignParams();

    try {
      const payload = {
        data: values,
        attribution: {
          source,
          landing_path,
          referrer,
          ...campaign,
          consent_version: consentVersion,
          consent_accepted: privacyAccepted,
        },
      };
      const result = await enviar({
        data: payload,
      });
      setListo(true);
      onSent?.();
      onSuccess?.(result, values);
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

  const selectedCountry = paises.find(p => p.name === paisSeleccionado);
  const ciudadesDisponibles = selectedCountry && ciudadesPorPais[selectedCountry.code]
    ? ciudadesPorPais[selectedCountry.code]
    : [];
  const mostrarCiudadPersonalizada = ciudadesDisponibles.length > 0 && ciudadSeleccionada === "Otra";

  return (
    <form className="rd-form ct-card p-6 md:p-10" onSubmit={onSubmit} onInput={(event) => updateProgress(event.currentTarget)}>
      <div className="flex items-center justify-between gap-4">
        <span className="label-orange">Solicitud de diagnóstico</span>
        <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">{completos} de {progressFields.length}</span>
      </div>
      <div className="ct-progress mt-3" aria-hidden="true"><div className="ct-progress__bar" style={{ width: `${(completos / progressFields.length) * 100}%` }} /></div>

      <p className="label-orange mt-9">Tú</p>
      <div className="rd-grid mt-4">
        <div className="field">
          <label className="ct-label" htmlFor="nombre">Nombre y apellidos {errors.nombre && <span style={{ color: "var(--naranja)" }}>*</span>}</label>
          <input className={`ct-input mt-2 ${errors.nombre ? "border-red-500" : ""}`} id="nombre" name="nombre" type="text" placeholder="Nombre y apellidos" />
          {errors.nombre && <span className="form-note" style={{ color: "var(--naranja)" }}>{errors.nombre}</span>}
        </div>
        <div className="field">
          <label className="ct-label" htmlFor="email">Email de trabajo {errors.email && <span style={{ color: "var(--naranja)" }}>*</span>}</label>
          <input className={`ct-input mt-2 ${errors.email ? "border-red-500" : ""}`} id="email" name="email" type="email" placeholder="nombre@empresa.com" />
          {errors.email && <span className="form-note" style={{ color: "var(--naranja)" }}>{errors.email}</span>}
        </div>
        <div className="field">
          <label className="ct-label" htmlFor="telefono">Celular</label>
          <input className="ct-input mt-2" id="telefono" name="telefono" type="tel" placeholder="+57 300 000 0000" />
        </div>
        <div className="field">
          <label className="ct-label" htmlFor="cargo">Cargo {errors.cargo && <span style={{ color: "var(--naranja)" }}>*</span>}</label>
          <select className={`ct-select mt-2 ${errors.cargo ? "border-red-500" : ""}`} id="cargo" name="cargo" defaultValue="">
            <option value="">Selecciona una opción</option>
            {cargos.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.cargo && <span className="form-note" style={{ color: "var(--naranja)" }}>{errors.cargo}</span>}
        </div>
      </div>

      <p className="label-orange mt-10">Tu empresa</p>
      <div className="rd-grid mt-4">
        <div className="field">
          <label className="ct-label" htmlFor="empresa">Empresa {errors.empresa && <span style={{ color: "var(--naranja)" }}>*</span>}</label>
          <input className={`ct-input mt-2 ${errors.empresa ? "border-red-500" : ""}`} id="empresa" name="empresa" required type="text" placeholder="Nombre de la empresa" />
          {errors.empresa && <span className="form-note" style={{ color: "var(--naranja)" }}>{errors.empresa}</span>}
        </div>
        <div className="field">
          <label className="ct-label" htmlFor="sitio_web">Web</label>
          <input className="ct-input mt-2" id="sitio_web" name="sitio_web" type="text" placeholder="empresa.com" />
        </div>
        <div className="field">
          <label className="ct-label" htmlFor="pais">País {errors.pais && <span style={{ color: "var(--naranja)" }}>*</span>}</label>
          <select className={`ct-select mt-2 ${errors.pais ? "border-red-500" : ""}`} id="pais" name="pais" defaultValue="" onChange={(e) => {
            setPaisSeleccionado(e.target.value);
            setCiudadSeleccionada("");
            setCiudadPersonalizada("");
          }}>
            <option value="">Selecciona una opción</option>
            {paises.map((p) => (
              <option key={p.code} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.pais && <span className="form-note" style={{ color: "var(--naranja)" }}>{errors.pais}</span>}
        </div>
        <div className="field">
          <label className="ct-label" htmlFor="ciudad">Ciudad</label>
          {ciudadesDisponibles.length > 0 ? (
            <>
              <select className="ct-select mt-2" id="ciudad" name="ciudad" defaultValue="" onChange={(e) => {
                setCiudadSeleccionada(e.target.value);
                if (e.target.value !== "Otra") {
                  setCiudadPersonalizada("");
                }
              }}>
                <option value="">Selecciona una opción</option>
                {ciudadesDisponibles.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {mostrarCiudadPersonalizada && (
                <input
                  className="ct-input mt-2"
                  type="text"
                  placeholder="Escribe tu ciudad"
                  value={ciudadPersonalizada}
                  onChange={(e) => setCiudadPersonalizada(e.target.value)}
                />
              )}
            </>
          ) : (
            <input className="ct-input mt-2" id="ciudad" name="ciudad" type="text" placeholder="Bogotá" />
          )}
        </div>
        <div className="field">
          <label className="ct-label" htmlFor="empleados">Número de empleados {errors.empleados && <span style={{ color: "var(--naranja)" }}>*</span>}</label>
          <select className={`ct-select mt-2 ${errors.empleados ? "border-red-500" : ""}`} id="empleados" name="empleados" defaultValue="">
            <option value="">Selecciona una opción</option>
            {bandasEmpleados.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          {errors.empleados && <span className="form-note" style={{ color: "var(--naranja)" }}>{errors.empleados}</span>}
        </div>
        <div className="field">
          <label className="ct-label" htmlFor="sector">Sector {errors.sector && <span style={{ color: "var(--naranja)" }}>*</span>}</label>
          <select className={`ct-select mt-2 ${errors.sector ? "border-red-500" : ""}`} id="sector" name="sector" defaultValue="">
            <option value="">Selecciona una opción</option>
            {sectores.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.sector && <span className="form-note" style={{ color: "var(--naranja)" }}>{errors.sector}</span>}
        </div>
      </div>

      <p className="label-orange mt-10">Tu situación</p>
      <fieldset className="mt-4">
        <legend className="ct-label">Problema principal {errors.problema_principal && <span style={{ color: "var(--naranja)" }}>*</span>}</legend>
        <div className="mt-2 grid gap-3">
          {problemas.map((problema) => (
            <label key={problema} className="ct-radio">
              <input className="sr-only" type="radio" name="problema_principal" value={problema} />
              <span>{problema}</span>
            </label>
          ))}
        </div>
        {errors.problema_principal && <span className="form-note" style={{ color: "var(--naranja)" }}>{errors.problema_principal}</span>}
      </fieldset>
      <div className="rd-grid mt-5">
        <div className="field">
          <label className="ct-label" htmlFor="inversion_pauta">Inversión mensual en pauta</label>
          <select className="ct-select mt-2" id="inversion_pauta" name="inversion_pauta" defaultValue="">
            <option value="">Selecciona una opción</option>
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
            <option value="">Selecciona una opción</option>
            {bandasLeads.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label className="ct-label" htmlFor="crm_actual">CRM actual</label>
          <select className="ct-select mt-2" id="crm_actual" name="crm_actual" defaultValue="">
            <option value="">Selecciona una opción</option>
            {crmsActuales.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label className="ct-label" htmlFor="whatsapp_ventas">Uso de WhatsApp en ventas</label>
          <select className="ct-select mt-2" id="whatsapp_ventas" name="whatsapp_ventas" defaultValue="">
            <option value="">Selecciona una opción</option>
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

      <div className="mt-6 flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          checked={privacyAccepted}
          onChange={(e) => setPrivacyAccepted(e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="consent" className="text-sm text-ink/80">
          Acepto la{" "}
          <a href="/RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange hover:underline">
            Política de Tratamiento de Datos
          </a>
          {" "}y el tratamiento de mis datos para gestionar esta solicitud.
        </label>
      </div>
      {errors.consent && <p className="form-note mt-2" style={{ color: "var(--naranja)" }}>{errors.consent}</p>}

      {error && (
        <p className="form-note mt-4" role="alert" style={{ color: "var(--naranja)" }}>
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
    </form>
  );
}
