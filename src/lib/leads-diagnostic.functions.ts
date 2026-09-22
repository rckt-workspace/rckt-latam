import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
});

export type DiagnosticLeadInput = z.infer<typeof DiagnosticSchema>;

const clean = (value?: string) => (value && value.trim() ? value.trim() : null);

export const saveDiagnosticLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => DiagnosticSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("leads_diagnostic").insert({
      empresa: data.empresa.trim(),
      sitio_web: clean(data.sitio_web),
      pais: clean(data.pais),
      ciudad: clean(data.ciudad),
      cargo: clean(data.cargo),
      empleados: clean(data.empleados),
      sector: clean(data.sector),
      problema_principal: clean(data.problema_principal),
      inversion_pauta: clean(data.inversion_pauta),
      volumen_leads: clean(data.volumen_leads),
      crm_actual: clean(data.crm_actual),
      whatsapp_ventas: clean(data.whatsapp_ventas),
      fecha_inicio: clean(data.fecha_inicio),
      nombre: clean(data.nombre),
      email: clean(data.email)?.toLowerCase() ?? null,
      telefono: clean(data.telefono),
    });

    if (error) {
      console.error("leads_diagnostic insert error:", error);
      throw new Error("No pudimos guardar tu solicitud. Intenta de nuevo.");
    }

    return { ok: true as const };
  });
