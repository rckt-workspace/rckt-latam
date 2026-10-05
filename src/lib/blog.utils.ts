import type { BlogPost } from "@/types/blog";

export const BLOG_TIME_ZONE = "America/Bogota";

/** Convierte un texto en slug: minúsculas, sin acentos, separado por guiones. */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

/** Fecha legible en español, representando el día en Bogotá (no UTC). */
export function formatBlogDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const formatter = new Intl.DateTimeFormat("es-CO", {
    timeZone: BLOG_TIME_ZONE,
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const parts = formatter.formatToParts(date);
  const day = parts.find(p => p.type === "day")?.value ?? "";
  const month = parts.find(p => p.type === "month")?.value ?? "";
  const year = parts.find(p => p.type === "year")?.value ?? "";
  return `${day} de ${month} de ${year}`;
}

export function formatShortDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const formatter = new Intl.DateTimeFormat("es-CO", {
    timeZone: BLOG_TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formatter.format(date);
}

/** Fecha y hora en Bogotá, formato largo. Ej: "5 de octubre de 2026 · 7:00 a. m." */
export function formatBlogDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const formatter = new Intl.DateTimeFormat("es-CO", {
    timeZone: BLOG_TIME_ZONE,
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return formatter.format(date);
}

/** Convierte ISO UTC a valor para <input type="datetime-local"> en Bogotá.
 * Determinístico, NO depende del timezone del runtime.
 * Usa Intl.DateTimeFormat con America/Bogota explícitamente.
 * Nunca devuelve "24:00" (usa hourCycle: "h23" para 00:00-23:59).
 */
export function isoToBogotaDatetimeLocal(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: BLOG_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const parts = formatter.formatToParts(date);
  const year = parts.find(p => p.type === "year")?.value ?? "";
  const month = parts.find(p => p.type === "month")?.value ?? "";
  const day = parts.find(p => p.type === "day")?.value ?? "";
  const hour = parts.find(p => p.type === "hour")?.value ?? "";
  const minute = parts.find(p => p.type === "minute")?.value ?? "";
  return `${year}-${month}-${day}T${hour}:${minute}`;
}

/** Convierte valor de <input type="datetime-local"> de Bogotá a ISO UTC.
 * Determinístico, NO depende del timezone del runtime.
 * Colombia UTC-5 sin DST: UTC = Bogotá + 5 horas.
 * FAIL-SAFE: devuelve "" para input inválido (nunca la hora actual).
 * Valida: formato, valores numéricos, fechas reales (no 2026-02-30, etc).
 */
export function bogotaDatetimeLocalToIso(datetimeLocal: string): string {
  if (!datetimeLocal || typeof datetimeLocal !== "string") {
    return "";
  }
  const [date, time] = datetimeLocal.split("T");
  if (!date || !time) return "";

  const [yearStr, monthStr, dayStr] = date.split("-");
  const [hourStr, minuteStr] = time.split(":");

  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  // Validar valores numéricos
  if (
    !Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day) ||
    !Number.isFinite(hour) || !Number.isFinite(minute)
  ) {
    return "";
  }

  // Validar rangos razonables
  if (month < 1 || month > 12 || day < 1 || day > 31 || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return "";
  }

  // Validar que la fecha entrada sea real (detecta 2026-02-30, etc)
  // Construir fecha de entrada (sin ajuste UTC) para validar
  const testDate = new Date(Date.UTC(year, month - 1, day, 0, 0));
  const testMonth = testDate.getUTCMonth() + 1;
  const testDay = testDate.getUTCDate();
  if (testMonth !== month || testDay !== day) {
    // La fecha de entrada es imposible (ej: 2026-02-30)
    return "";
  }

  // Construir en UTC directamente:
  // Input es "hora Bogotá" → UTC = Bogotá + 5 horas
  // Usar Date.UTC para evitar timezone local de la máquina
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour + 5, minute));

  // Validar que la fecha construida sea realmente válida
  if (Number.isNaN(utcDate.getTime())) {
    return "";
  }

  return utcDate.toISOString();
}

/** Minutos de lectura estimados a partir del Markdown. */
export function estimateReadingTime(markdown: string): number {
  const words = markdown
    .replace(/[#>*`|_-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Índice del artículo a partir de los títulos H2 y H3 del Markdown. */
export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  const used = new Set<string>();

  for (const line of markdown.split("\n")) {
    const match = /^(##|###)\s+(.*)$/.exec(line.trim());
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, "").trim();
    let id = slugify(text) || `seccion-${items.length + 1}`;
    let n = 2;
    while (used.has(id)) id = `${id}-${n++}`;
    used.add(id);
    items.push({ id, text, level: match[1] === "##" ? 2 : 3 });
  }

  return items;
}

/** Texto de búsqueda de un artículo (título, extracto, etiquetas y categoría). */
export function postSearchText(post: BlogPost): string {
  return [post.title, post.excerpt, post.category, ...post.tags]
    .join(" ")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function normalizeQuery(query: string): string {
  return query
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}
