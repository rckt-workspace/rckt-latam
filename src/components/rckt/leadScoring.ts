import type { DiagnosticFormValues } from "./DiagnosticForm";

// PENDIENTE: definir con comercial
export const INVERSION_SUFICIENTE: readonly string[] = [];

export type LeadLevel = "sql" | "mql" | "recurso";

export function scoreLead(values: DiagnosticFormValues, today = new Date()) {
  let score = 0;
  // El formulario agrupa empleados en 11–50 y 51–200; ambas bandas se solapan con 20–100.
  if (["11 – 50", "51 – 200"].includes(values.empleados)) score += 20;
  if (/gerente|director|directora|ceo/i.test(values.cargo)) score += 20;
  if (INVERSION_SUFICIENTE.includes(values.inversion_pauta)) score += 20;
  const start = values.fecha_inicio ? new Date(`${values.fecha_inicio}T12:00:00`) : null;
  if (start && !Number.isNaN(start.getTime())) {
    const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const days = (startDay.getTime() - currentDay.getTime()) / 86400000;
    if (days >= 0 && days < 30) score += 20;
  }
  if (values.problema_principal && /salud|estética|estetica|odonto|educa/i.test(values.sector)) score += 20;
  const nivel: LeadLevel = score >= 80 ? "sql" : score >= 50 ? "mql" : "recurso";
  return { score, nivel };
}