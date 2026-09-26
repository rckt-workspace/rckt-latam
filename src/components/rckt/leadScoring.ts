import type { DiagnosticFormValues } from "./DiagnosticForm";

// PENDIENTE: rango objetivo del mercado
export const INVERSION_SUFICIENTE: readonly string[] = [];

export type LeadLevel = "sql" | "mql" | "recurso";

export function scoreLead(values: DiagnosticFormValues, today = new Date()) {
  let score = 0;
  // Las bandas actuales no separan 21–250 exactamente: solo se cuentan las que pertenecen mayoritariamente al rango.
  if (["11 – 50", "51 – 200"].includes(values.empleados)) score += 20;
  if (/dueñ[oa]|gerencia general|gerente general|director(?:a)?|dirección|direccion/i.test(values.cargo)) score += 20;
  if (INVERSION_SUFICIENTE.includes(values.inversion_pauta)) score += 20;
  const start = values.fecha_inicio ? new Date(`${values.fecha_inicio}T12:00:00`) : null;
  if (start && !Number.isNaN(start.getTime())) {
    const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const days = (startDay.getTime() - currentDay.getTime()) / 86400000;
    if (days >= 0 && days < 90) score += 20;
  }
  if (/este mes|1\s*[–-]\s*3 meses/i.test(values.fecha_inicio)) score += 20;
  if (values.problema_principal && /salud|estética|estetica|odonto|educa/i.test(values.sector)) score += 20;
  if (/@(?:gmail|hotmail|outlook|yahoo|icloud|live)\.[a-z.]+$/i.test(values.email.trim())) score -= 10;
  if (/no invierto todavía/i.test(values.inversion_pauta) || /solo estoy explorando/i.test(values.fecha_inicio)) score -= 20;
  score = Math.max(0, score);
  const nivel: LeadLevel = score >= 80 ? "sql" : score >= 50 ? "mql" : "recurso";
  return { score, nivel };
}