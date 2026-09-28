import type { DiagnosticFormValues } from "./DiagnosticForm";

export type LeadLevel = "sql" | "mql" | "recurso";

/**
 * scoreLead: Pure function to evaluate lead quality.
 *
 * Current business criteria:
 * - Company size: 11–200 employees → +20
 * - Role: C-level / director / management → +20
 * - Investment timeline: Starting within next 90 days → +20
 * - Vertical fit: Health, aesthetics, dental, education + main problem → +20
 * - Contact type: Corporate email → no penalty; personal email → -10
 *
 * PENDING BUSINESS DECISION:
 * - Investment amount (inversion_pauta): No point allocation until investment bands are defined.
 *
 * Levels:
 * - SQL: score >= 80
 * - MQL: score >= 50
 * - Recurso: score < 50
 *
 * Max score: 80 points (4 × 20)
 */
export function scoreLead(values: DiagnosticFormValues, today = new Date()) {
  let score = 0;

  // Company size: 11–50 or 51–200 employees band
  if (["11 – 50", "51 – 200"].includes(values.empleados)) score += 20;

  // Role: C-level, director, management
  if (/dueñ[oa]|gerencia general|gerente general|director(?:a)?|dirección|direccion/i.test(values.cargo)) score += 20;

  // Timeline: Within next 90 days (date format: YYYY-MM-DD from input type="date")
  const start = values.fecha_inicio ? new Date(`${values.fecha_inicio}T12:00:00`) : null;
  if (start && !Number.isNaN(start.getTime())) {
    const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const days = (startDay.getTime() - currentDay.getTime()) / 86400000;
    if (days >= 0 && days < 90) score += 20;
  }

  // Vertical fit: Health/aesthetics/dental/education sectors with main problem selected
  if (values.problema_principal && /salud|estética|estetica|odonto|educa/i.test(values.sector)) score += 20;

  // Personal email (less serious) vs corporate (more professional)
  if (/@(?:gmail|hotmail|outlook|yahoo|icloud|live)\.[a-z.]+$/i.test(values.email.trim())) score -= 10;

  score = Math.max(0, score);
  const nivel: LeadLevel = score >= 80 ? "sql" : score >= 50 ? "mql" : "recurso";
  return { score, nivel };
}