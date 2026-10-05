import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { scoreLead } from "@/components/rckt/leadScoring";
import type { DiagnosticFormValues } from "@/components/rckt/DiagnosticForm";

const t = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

const DiagnosticSchema = z.object({
  empresa: z.string().trim().min(1).max(200),
  sitio_web: t(300),
  pais: t(120),
  ciudad: t(120),
  cargo: t(120),
  empleados: t(60),
  sector: t(120),
  problema_principal: t(120),
  inversion_pauta: t(120),
  volumen_leads: t(120),
  crm_actual: t(120),
  whatsapp_ventas: t(120),
  fecha_inicio: t(60),
  nombre: t(120),
  email: t(200),
  telefono: t(60),
  numero_sedes: t(60),
  tratamientos_principales: t(500),
});

const AttributionSchema = z.object({
  source: z.enum([
    "contacto",
    "revenue-diagnostic",
    "lp-sales-flow",
    "lp-sales-flow-clinicas-bogota",
    "lp-sales-flow-clinicas-bogota-b",
  ]),
  landing_path: t(500),
  referrer: t(500),
  utm_source: t(200),
  utm_medium: t(200),
  utm_campaign: t(200),
  utm_content: t(200),
  utm_term: t(200),
  fbclid: t(200),
  gclid: t(200),
  wbraid: t(200),
  consent_version: z.literal("RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf"),
  consent_accepted: z.literal(true),
});

const SaveDiagnosticPayloadSchema = z.object({
  data: DiagnosticSchema,
  attribution: AttributionSchema,
});

export type DiagnosticLeadInput = z.infer<typeof DiagnosticSchema>;
export type AttributionInput = z.infer<typeof AttributionSchema>;
export type SaveDiagnosticPayload = z.infer<typeof SaveDiagnosticPayloadSchema>;

const clean = (value?: string) => (value && value.trim() ? value.trim() : null);

export const saveDiagnosticLead = createServerFn({ method: "POST" })
  .validator((payload: unknown) => SaveDiagnosticPayloadSchema.parse(payload))
  .handler(async ({ data: payload }) => {
    const { data: formData, attribution } = payload;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Build form values for scoring
    const formValues: DiagnosticFormValues = {
      empresa: formData.empresa.trim(),
      sitio_web: clean(formData.sitio_web) ?? "",
      pais: clean(formData.pais) ?? "",
      ciudad: clean(formData.ciudad) ?? "",
      cargo: clean(formData.cargo) ?? "",
      empleados: clean(formData.empleados) ?? "",
      sector: clean(formData.sector) ?? "",
      problema_principal: clean(formData.problema_principal) ?? "",
      inversion_pauta: clean(formData.inversion_pauta) ?? "",
      volumen_leads: clean(formData.volumen_leads) ?? "",
      crm_actual: clean(formData.crm_actual) ?? "",
      whatsapp_ventas: clean(formData.whatsapp_ventas) ?? "",
      fecha_inicio: clean(formData.fecha_inicio) ?? "",
      nombre: clean(formData.nombre) ?? "",
      email: clean(formData.email) ?? "",
      telefono: clean(formData.telefono) ?? "",
      numero_sedes: clean(formData.numero_sedes),
      tratamientos_principales: clean(formData.tratamientos_principales),
    };

    // Calculate score and level server-side
    const { score, nivel } = scoreLead(formValues);

    // Prepare insert payload
    const insertPayload: Record<string, unknown> = {
      empresa: formData.empresa.trim(),
      sitio_web: clean(formData.sitio_web),
      pais: clean(formData.pais),
      ciudad: clean(formData.ciudad),
      cargo: clean(formData.cargo),
      empleados: clean(formData.empleados),
      sector: clean(formData.sector),
      problema_principal: clean(formData.problema_principal),
      inversion_pauta: clean(formData.inversion_pauta),
      volumen_leads: clean(formData.volumen_leads),
      crm_actual: clean(formData.crm_actual),
      whatsapp_ventas: clean(formData.whatsapp_ventas),
      fecha_inicio: clean(formData.fecha_inicio),
      nombre: clean(formData.nombre),
      email: clean(formData.email)?.toLowerCase() ?? null,
      telefono: clean(formData.telefono),
      // Clinic fields (will be added to BD after this sprint)
      numero_sedes: clean(formData.numero_sedes),
      tratamientos_principales: clean(formData.tratamientos_principales),
      // Attribution fields
      source: clean(attribution.source),
      landing_path: clean(attribution.landing_path),
      referrer: clean(attribution.referrer),
      utm_source: clean(attribution.utm_source),
      utm_medium: clean(attribution.utm_medium),
      utm_campaign: clean(attribution.utm_campaign),
      utm_content: clean(attribution.utm_content),
      utm_term: clean(attribution.utm_term),
      fbclid: clean(attribution.fbclid),
      gclid: clean(attribution.gclid),
      wbraid: clean(attribution.wbraid),
      // Scoring fields
      lead_score: score,
      lead_level: nivel,
      // Consent fields
      consent_at: attribution.consent_accepted && attribution.consent_version ? new Date().toISOString() : null,
      consent_version: attribution.consent_accepted ? clean(attribution.consent_version) : null,
      // Status and metadata
      status: "nuevo",
      metadata: {},
    };

    // Cast to any for insert because new columns (numero_sedes, tratamientos_principales)
    // will be added to the DB after this sprint - types will be regenerated then.
    const { data: inserted, error } = await supabaseAdmin
      .from("leads_diagnostic")
      .insert(insertPayload as any)
      .select("id")
      .single();

    if (error || !inserted) {
      console.error("leads_diagnostic insert error:", error);
      throw new Error("No pudimos guardar tu solicitud. Intenta de nuevo.");
    }

    return {
      ok: true as const,
      id: inserted.id,
      score,
      nivel,
    };
  });
