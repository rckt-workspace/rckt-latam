import type { BlogPost } from "@/types/blog";

/** Convierte un texto en slug: minúsculas, sin acentos, separado por guiones. */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

/** Fecha legible en español, estable entre servidor y navegador. */
export function formatBlogDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  return `${date.getUTCDate()} de ${meses[date.getUTCMonth()]} de ${date.getUTCFullYear()}`;
}

export function formatShortDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getUTCDate())}/${pad(date.getUTCMonth() + 1)}/${date.getUTCFullYear()}`;
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
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function normalizeQuery(query: string): string {
  return query
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
