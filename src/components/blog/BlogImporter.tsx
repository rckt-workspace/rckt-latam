import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { Markdown } from "@/components/blog/Markdown";
import { slugify } from "@/lib/blog.utils";

/**
 * Importador del plan editorial (panel /rckt-equipo → pestaña Importar).
 *
 * 1. Se sube el Excel del plan (una fila por artículo).
 * 2. Se suben los Word con los textos y, si se quiere, las imágenes de portada.
 * 3. El panel empareja cada fila con su Word y su imagen, revisa todo y muestra
 *    una vista previa. Nada se guarda hasta pulsar "Guardar".
 * 4. Guarda uno por uno con los mismos endpoints del editor del blog:
 *    /api/admin/people/blog-media (portada) y /api/admin/people/blog (artículo).
 *
 * Los artículos se publican a las 7:00 a. m. de Colombia (12:00 UTC), igual que
 * los que se crean a mano en la pestaña Blog.
 */

type Category = { id: string; name: string; slug: string };

type WordDoc = { name: string; html: string; markdown: string; title: string; subtitles: string[] };

type Row = {
  fila: number;
  nivel: "listo" | "revisar" | "error";
  errores: string[];
  avisos: string[];
  title: string;
  slug: string;
  date: string | null;
  status: "published" | "draft";
  category: Category | null;
  categoryText: string;
  tags: string[];
  author: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  wordName: string;
  doc: WordDoc | null;
  coverUrl: string;
  coverFile: File | null;
  coverName: string;
};

type Resultado = { estado: "pendiente" | "guardando" | "ok" | "fallo"; mensaje?: string };

const ALLOWED_IMAGES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_IMAGE = 10 * 1024 * 1024;

const pad = (n: number) => String(n).padStart(2, "0");
const norm = (s: unknown) =>
  String(s ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
const normKey = (s: string) => norm(s).replace(/\s+/g, "_");
// Windows agrega " (1)", " (2)"… cuando se descarga un archivo repetido: lo ignoramos al emparejar
const sinCopia = (s: string) => s.replace(/\s*\(\d+\)(?=(\.[a-z0-9]+)?$)/, "");
const normFile = (s: unknown) => sinCopia(norm(s).replace(/\.docx$/, ""));
const normImage = (s: unknown) => sinCopia(norm(s));
const text = (v: unknown) => String(v ?? "").trim();
const todayIso = () => new Date().toISOString().slice(0, 10);

const fechaLarga = (iso: string) =>
  new Intl.DateTimeFormat("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T12:00:00Z`),
  );

/** Convierte la celda de fecha del Excel a "AAAA-MM-DD" */
function parseFecha(v: unknown, parseDateCode: (n: number) => { y: number; m: number; d: number } | null): string | null {
  if (v === "" || v == null) return null;
  const valid = (s: string) => {
    const d = new Date(`${s}T12:00:00Z`);
    return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s ? s : null;
  };
  if (typeof v === "number") {
    const c = parseDateCode(v);
    return c ? valid(`${c.y}-${pad(c.m)}-${pad(c.d)}`) : null;
  }
  const s = String(v).trim();
  let m = s.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (m) return valid(`${m[3]}-${pad(Number(m[2]))}-${pad(Number(m[1]))}`);
  m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return valid(`${m[1]}-${pad(Number(m[2]))}-${pad(Number(m[3]))}`);
  return null;
}

export function BlogImporter({ onDone }: { onDone?: () => void }) {
  const [categorias, setCategorias] = useState<Category[]>([]);
  const [slugsExistentes, setSlugsExistentes] = useState<Set<string>>(new Set());
  const [cargaInicial, setCargaInicial] = useState<string | null>("Cargando categorías y artículos…");

  const [excelNombre, setExcelNombre] = useState("");
  const [filasExcel, setFilasExcel] = useState<Record<string, unknown>[]>([]);
  const [words, setWords] = useState<Map<string, WordDoc>>(new Map());
  const [imagenes, setImagenes] = useState<Map<string, File>>(new Map());
  const [leyendo, setLeyendo] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  const [vista, setVista] = useState<Row | null>(null);
  const [resultados, setResultados] = useState<Record<string, Resultado>>({});
  const [guardando, setGuardando] = useState(false);
  const [terminado, setTerminado] = useState(false);
  // Convierte los números de fecha de Excel; se llena al leer el archivo
  const parseDateCodeRef = useRef<(n: number) => { y: number; m: number; d: number } | null>(() => null);

  const supabaseHost = useMemo(() => {
    try {
      const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
      return url ? new URL(url).hostname.split(".")[0] : "";
    } catch {
      return "";
    }
  }, []);

  /* ---------- Datos del sitio: categorías y slugs que ya existen ---------- */
  const cargarSitio = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/people/blog");
      if (!res.ok) throw new Error(res.status === 401 ? "Tu sesión venció. Vuelve a entrar al panel." : `Error ${res.status}`);
      const data = (await res.json()) as { posts?: { slug: string }[]; categories?: Category[] };
      setCategorias(data.categories || []);
      setSlugsExistentes(new Set((data.posts || []).map((p) => p.slug)));
      setCargaInicial(null);
    } catch (e) {
      setCargaInicial(e instanceof Error ? e.message : "No se pudo conectar con el panel.");
    }
  }, []);

  useEffect(() => {
    void cargarSitio();
  }, [cargarSitio]);

  /* ---------- Paso 1: Excel ---------- */
  async function leerExcel(file: File) {
    setLeyendo(true);
    setAviso(null);
    try {
      const XLSX = await import("xlsx");
      const wb = XLSX.read(await file.arrayBuffer(), { type: "array" });
      const hoja =
        wb.SheetNames.find((n) => normKey(n) === "calendario") ||
        wb.SheetNames.find((n) => {
          const fila = (XLSX.utils.sheet_to_json(wb.Sheets[n], { header: 1 })[0] as unknown[] | undefined) || [];
          return fila.map((c) => normKey(String(c))).includes("titulo");
        });
      if (!hoja) throw new Error("No encontré la hoja «Calendario» ni una hoja con la columna «titulo».");
      const crudas = XLSX.utils.sheet_to_json<Record<string, unknown>>(wb.Sheets[hoja], { defval: "", raw: true });
      const filas = crudas
        .map((r) => {
          const o: Record<string, unknown> = {};
          Object.entries(r).forEach(([k, v]) => (o[normKey(k)] = v));
          return o;
        })
        .filter((r) => Object.values(r).some((v) => text(v) !== ""));
      // Guardamos la función que convierte números de Excel en fechas
      parseDateCodeRef.current = (n: number) => {
        const c = XLSX.SSF.parse_date_code(n);
        return c ? { y: c.y, m: c.m, d: c.d } : null;
      };
      setFilasExcel(filas);
      setExcelNombre(`${file.name} · hoja «${hoja}» · ${filas.length} filas`);
      setResultados({});
      setTerminado(false);
    } catch (e) {
      setAviso(e instanceof Error ? e.message : "No se pudo leer el Excel.");
    } finally {
      setLeyendo(false);
    }
  }

  /* ---------- Paso 2: Word e imágenes ---------- */
  async function leerArchivos(files: File[]) {
    setLeyendo(true);
    setAviso(null);
    const omitidos: string[] = [];
    try {
      const nuevosWords = new Map(words);
      const nuevasImagenes = new Map(imagenes);
      const docx = files.filter((f) => /\.docx$/i.test(f.name));
      const imgs = files.filter((f) => ALLOWED_IMAGES.includes(f.type));
      files.filter((f) => !docx.includes(f) && !imgs.includes(f)).forEach((f) => omitidos.push(f.name));

      if (docx.length) {
        const mod = await import("mammoth");
        const mammoth = ((mod as unknown as { default?: typeof mod }).default ?? mod) as typeof mod;
        const { default: TurndownService } = await import("turndown");
        const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", emDelimiter: "*", strongDelimiter: "**" });
        // El blog no interpreta "\*" ni "\_": dejamos el texto tal cual
        td.escape = (s: string) => s;

        for (const f of docx) {
          try {
            const res = await mammoth.convertToHtml(
              { arrayBuffer: await f.arrayBuffer() },
              { styleMap: ["p[style-name='Title'] => h1:fresh", "p[style-name='Subtitle'] => h2:fresh"] },
            );
            const box = document.createElement("div");
            box.innerHTML = res.value;
            box.querySelectorAll("img").forEach((img) => img.remove());
            const h1 = box.querySelector("h1");
            const title = h1?.textContent?.trim() || "";
            h1?.remove();
            // El blog solo usa títulos hasta nivel 3
            box.querySelectorAll("h4, h5, h6").forEach((h) => {
              const h3 = document.createElement("h3");
              h3.innerHTML = h.innerHTML;
              h.replaceWith(h3);
            });
            const subtitles = [...box.querySelectorAll("h2, h3")].map((h) => h.textContent?.trim() || "").filter(Boolean);
            // Convertimos bloque por bloque y separamos con línea en blanco, como espera el blog
            const markdown = [...box.children]
              .map((el) => td.turndown(el.outerHTML).trim())
              .filter(Boolean)
              .join("\n\n");
            nuevosWords.set(normFile(f.name), { name: f.name, html: box.innerHTML, markdown, title, subtitles });
          } catch {
            omitidos.push(`${f.name} (no se pudo leer)`);
          }
        }
      }
      imgs.forEach((f) => nuevasImagenes.set(normImage(f.name), f));
      setWords(nuevosWords);
      setImagenes(nuevasImagenes);
      setResultados({});
      setTerminado(false);
      if (omitidos.length) setAviso(`Se omitieron: ${omitidos.join(", ")}. Solo se aceptan .docx y portadas .jpg, .png, .webp o .gif.`);
    } finally {
      setLeyendo(false);
    }
  }

  /* ---------- Paso 3: revisión ---------- */
  const filas: Row[] = useMemo(() => {
    const vistos = new Map<string, number>();
    const hoy = todayIso();
    return filasExcel.map((r, i) => {
      const errores: string[] = [];
      const avisos: string[] = [];
      const fila = i + 2;

      const wordName = text(r.archivo_word);
      const doc = wordName ? words.get(normFile(wordName)) || null : null;
      const title = text(r.titulo) || doc?.title || "";
      const slug = slugify(text(r.slug) || title);

      if (!title) errores.push("Falta el título (ni en el Excel ni en el Word).");
      if (!wordName) errores.push("Falta el nombre del Word en «archivo_word».");
      else if (!doc) errores.push(words.size ? `No subiste «${wordName}».` : "Falta subir el Word.");
      else if (!doc.markdown) errores.push("El Word está vacío.");

      if (slug) {
        if (slugsExistentes.has(slug)) errores.push(`Ya existe un artículo con la dirección /blog/${slug}.`);
        if (vistos.has(slug)) errores.push(`Título o slug repetido con la fila ${vistos.get(slug)}.`);
        else vistos.set(slug, fila);
      }

      const date = parseFecha(r.fecha_publicacion, parseDateCodeRef.current);
      if (!date) errores.push(text(r.fecha_publicacion) ? `Fecha no válida: «${text(r.fecha_publicacion)}». Usa DD/MM/AAAA.` : "Falta la fecha.");

      const estadoTxt = norm(r.estado || "publicado");
      let status: "published" | "draft" = "published";
      if (estadoTxt === "borrador") status = "draft";
      else if (!["publicado", "programado"].includes(estadoTxt)) errores.push(`Estado «${text(r.estado)}» no válido: usa publicado o borrador.`);
      if (date && status === "published" && date <= hoy) avisos.push("La fecha ya llegó: se verá en el sitio apenas lo guardes.");

      const categoryText = text(r.categoria);
      const category = categorias.find((c) => norm(c.name) === norm(categoryText) || c.slug === norm(categoryText)) || null;
      if (!categoryText) errores.push("Falta la categoría.");
      else if (!category) errores.push(`La categoría «${categoryText}» no existe. Usa: ${categorias.map((c) => c.name).join(", ")}.`);

      const excerpt = text(r.resumen);
      if (!excerpt) errores.push("Falta el resumen (extracto).");

      const seoTitle = text(r.seo_titulo);
      const seoDescription = text(r.seo_descripcion);
      if (seoTitle.length > 60) avisos.push(`Título SEO de ${seoTitle.length} caracteres (recomendado: máx. 60).`);
      if (seoDescription.length > 155) avisos.push(`Descripción SEO de ${seoDescription.length} caracteres (recomendado: máx. 155).`);
      if (!seoTitle) avisos.push("Sin título SEO: se usará el título.");
      if (!seoDescription) avisos.push("Sin descripción SEO: se usará el resumen.");

      const portada = text(r.imagen_portada);
      let coverUrl = "";
      let coverFile: File | null = null;
      if (/^https?:\/\//i.test(portada)) coverUrl = portada;
      else if (portada) {
        coverFile = imagenes.get(normImage(portada)) || null;
        if (!coverFile) errores.push(`No subiste la portada «${portada}».`);
        else if (coverFile.size > MAX_IMAGE) errores.push(`La portada «${portada}» pesa más de 10 MB.`);
      } else avisos.push("Sin imagen de portada.");

      if (doc && doc.subtitles.length < 2) avisos.push("El Word tiene menos de 2 subtítulos: no tendrá índice «En este artículo».");
      if (doc?.title && text(r.titulo) && slugify(doc.title) !== slugify(text(r.titulo)))
        avisos.push(`El Word se titula «${doc.title}»; se usará el título del Excel.`);

      return {
        fila,
        nivel: errores.length ? "error" : avisos.length ? "revisar" : "listo",
        errores,
        avisos,
        title,
        slug,
        date,
        status,
        category,
        categoryText,
        tags: text(r.etiquetas)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        author: text(r.autor) || "Equipo RCKT",
        excerpt,
        seoTitle,
        seoDescription,
        wordName,
        doc,
        coverUrl,
        coverFile,
        coverName: portada,
      } satisfies Row;
    });
  }, [filasExcel, words, imagenes, categorias, slugsExistentes]);

  // Qué Word e imágenes subidos aparecen en alguna fila del Excel
  const usados = useMemo(
    () => ({
      words: new Set(filasExcel.map((r) => normFile(r.archivo_word)).filter(Boolean)),
      imagenes: new Set(filasExcel.map((r) => normImage(r.imagen_portada)).filter(Boolean)),
    }),
    [filasExcel],
  );

  const guardables = filas.filter((f) => f.nivel !== "error" && resultados[f.slug]?.estado !== "ok");
  const cuenta = { listo: 0, revisar: 0, error: 0 };
  filas.filter((f) => resultados[f.slug]?.estado !== "ok").forEach((f) => cuenta[f.nivel]++);
  const okCount = Object.values(resultados).filter((r) => r.estado === "ok").length;
  const falloCount = Object.values(resultados).filter((r) => r.estado === "fallo").length;

  /* ---------- Paso 4: guardar ---------- */
  async function guardar() {
    if (!guardables.length) return;
    const prog = guardables.filter((f) => f.status === "published").length;
    const ok = window.confirm(
      `Vas a guardar ${guardables.length} artículo(s): ${prog} publicados/programados y ${guardables.length - prog} borradores.` +
        (supabaseHost ? `\n\nBase de datos: ${supabaseHost}` : "") +
        "\n\n¿Continuar?",
    );
    if (!ok) return;

    setGuardando(true);
    setTerminado(false);
    for (const f of guardables) {
      setResultados((r) => ({ ...r, [f.slug]: { estado: "guardando" } }));
      try {
        let coverImage = f.coverUrl || "";
        if (f.coverFile) {
          const fd = new FormData();
          fd.append("file", f.coverFile);
          fd.append("slug", f.slug);
          const up = await fetch("/api/admin/people/blog-media", { method: "POST", body: fd });
          const upData = (await up.json().catch(() => ({}))) as { publicUrl?: string; error?: string };
          if (!up.ok || !upData.publicUrl) throw new Error(upData.error || `No se pudo subir la portada (error ${up.status}).`);
          coverImage = upData.publicUrl;
        }
        const res = await fetch("/api/admin/people/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: f.slug,
            title: f.title,
            excerpt: f.excerpt,
            content: f.doc?.markdown || "",
            coverImage,
            category: f.category?.id,
            authorName: f.author,
            tags: f.tags,
            status: f.status,
            featured: false,
            // 12:00 UTC = 7:00 a. m. en Colombia, igual que el editor del blog
            publishedAt: `${f.date}T12:00:00Z`,
            seoTitle: f.seoTitle || f.title,
            seoDescription: f.seoDescription || f.excerpt,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
        setResultados((r) => ({ ...r, [f.slug]: { estado: "ok" } }));
      } catch (e) {
        setResultados((r) => ({ ...r, [f.slug]: { estado: "fallo", mensaje: e instanceof Error ? e.message : "Error desconocido" } }));
      }
    }
    setGuardando(false);
    setTerminado(true);
    // Actualiza la lista de artículos existentes para no duplicar si se vuelve a importar
    await cargarSitio();
  }

  function reiniciar() {
    setExcelNombre("");
    setFilasExcel([]);
    setWords(new Map());
    setImagenes(new Map());
    setResultados({});
    setTerminado(false);
    setAviso(null);
    void cargarSitio();
  }

  /* ---------- Interfaz ---------- */
  const dropProps = (handler: (files: File[]) => void) => ({
    onDragOver: (e: DragEvent) => e.preventDefault(),
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      const files = [...(e.dataTransfer?.files || [])];
      if (files.length) handler(files);
    },
  });

  const etiquetaNivel = (n: Row["nivel"]) => (n === "listo" ? "Listo" : n === "revisar" ? "Revisar" : "Error");

  if (cargaInicial) {
    return <p className={cargaInicial.startsWith("Cargando") ? "bimp-empty" : "bimp-error"}>{cargaInicial}</p>;
  }

  return (
    <div className="bimp">
      <div className="bimp-intro">
        <p>
          Sube el Excel con el plan y los Word con los textos. El panel revisa todo antes de guardar. Los artículos se
          publican a las <strong>7:00 a. m. de Colombia</strong> del día indicado.
        </p>
        <a className="panel-btn-ghost" href="/plantillas/plantilla-calendario-blog.xlsx" download>
          Descargar plantilla de Excel
        </a>
      </div>

      <div className="bimp-steps">
        <div className="bimp-step">
          <h3>
            <span>1</span> Excel del plan
          </h3>
          <label className="bimp-drop" {...dropProps((f) => void leerExcel(f[0]))}>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void leerExcel(f);
                e.target.value = "";
              }}
            />
            <strong>Arrastra el Excel aquí</strong>
            <span>o haz clic para elegirlo (.xlsx)</span>
          </label>
          {excelNombre && <p className="bimp-file">{excelNombre}</p>}
        </div>

        <div className="bimp-step">
          <h3>
            <span>2</span> Word y portadas
          </h3>
          <label className="bimp-drop" {...dropProps((f) => void leerArchivos(f))}>
            <input
              type="file"
              multiple
              accept=".docx,image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => {
                const f = [...(e.target.files || [])];
                if (f.length) void leerArchivos(f);
                e.target.value = "";
              }}
            />
            <strong>Arrastra los Word y las imágenes aquí</strong>
            <span>todos juntos · .docx y .jpg, .png, .webp</span>
          </label>
          {(words.size > 0 || imagenes.size > 0) && (
            <>
              <p className="bimp-file">
                {words.size} Word · {imagenes.size} imágenes
              </p>
              <ul className="bimp-files">
                {[...words.entries()].map(([key, w]) => (
                  <li key={`w-${key}`}>
                    <span>{w.name}</span>
                    {filasExcel.length > 0 &&
                      (usados.words.has(key) ? <em className="bimp-ok">en el Excel</em> : <em className="bimp-warn">no está en el Excel</em>)}
                  </li>
                ))}
                {[...imagenes.entries()].map(([key, f]) => (
                  <li key={`i-${key}`}>
                    <span>{f.name}</span>
                    {filasExcel.length > 0 &&
                      (usados.imagenes.has(key) ? <em className="bimp-ok">en el Excel</em> : <em className="bimp-warn">no está en el Excel</em>)}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {leyendo && <p className="bimp-empty">Leyendo archivos…</p>}
      {aviso && <p className="bimp-error">{aviso}</p>}

      <div className="bimp-review">
        <div className="bimp-review-head">
          <h3>
            <span>3</span> Revisa y guarda
          </h3>
          {filas.length > 0 && (
            <div className="bimp-summary">
              <span className="bimp-pill is-listo">{cuenta.listo} listos</span>
              <span className="bimp-pill is-revisar">{cuenta.revisar} para revisar</span>
              <span className="bimp-pill is-error">{cuenta.error} con error</span>
              {okCount > 0 && <span className="bimp-pill is-listo">{okCount} guardados</span>}
            </div>
          )}
        </div>

        {!filas.length ? (
          <p className="bimp-empty">Sube el Excel para ver aquí cada artículo antes de guardarlo.</p>
        ) : (
          <div className="bimp-table-wrap">
            <table className="bimp-table">
              <thead>
                <tr>
                  <th>Fila</th>
                  <th>Revisión</th>
                  <th>Artículo</th>
                  <th>Publicación</th>
                  <th>Categoría</th>
                  <th>Word</th>
                  <th>Avisos</th>
                </tr>
              </thead>
              <tbody>
                {filas.map((f) => {
                  const r = resultados[f.slug];
                  return (
                    <tr key={`${f.fila}-${f.slug}`} onClick={() => f.doc && setVista(f)} className={f.doc ? "is-clickable" : ""}>
                      <td>{f.fila}</td>
                      <td>
                        {r?.estado === "ok" ? (
                          <span className="bimp-pill is-listo">Guardado</span>
                        ) : r?.estado === "guardando" ? (
                          <span className="bimp-pill is-revisar">Guardando…</span>
                        ) : r?.estado === "fallo" ? (
                          <span className="bimp-pill is-error">Falló</span>
                        ) : (
                          <span className={`bimp-pill is-${f.nivel}`}>{etiquetaNivel(f.nivel)}</span>
                        )}
                      </td>
                      <td>
                        <div className="bimp-title">{f.title || "Sin título"}</div>
                        <div className="bimp-sub">/blog/{f.slug}</div>
                      </td>
                      <td>
                        {f.date ? fechaLarga(f.date) : "—"}
                        <div className="bimp-sub">{f.status === "draft" ? "Borrador" : "Publicado / programado"}</div>
                      </td>
                      <td>{f.category?.name || f.categoryText || "—"}</td>
                      <td>
                        {f.doc ? f.doc.name : <span className="bimp-bad">{f.wordName || "—"}</span>}
                        {f.doc && <div className="bimp-sub">{f.doc.subtitles.length} subtítulos</div>}
                      </td>
                      <td>
                        {r?.estado === "fallo" && <div className="bimp-bad">{r.mensaje}</div>}
                        {r?.estado === "ok" ? (
                          <span className="bimp-ok">Guardado en el sitio</span>
                        ) : f.errores.length + f.avisos.length ? (
                          <ul className="bimp-issues">
                            {f.errores.map((x) => (
                              <li key={x} className="is-e">
                                {x}
                              </li>
                            ))}
                            {f.avisos.map((x) => (
                              <li key={x} className="is-w">
                                {x}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="bimp-ok">Sin avisos</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {terminado && (
          <p className={falloCount ? "bimp-error" : "bimp-done"}>
            {okCount} guardado(s){falloCount ? ` · ${falloCount} fallaron (revisa el motivo en la tabla y vuelve a intentar)` : "."}
          </p>
        )}

        <div className="bimp-foot">
          <span className="bimp-hint">
            Las filas con error no se guardan. Las de «Revisar» sí, pero conviene mirarlas. Haz clic en una fila para ver cómo
            quedará el artículo.
          </span>
          <div className="bimp-actions">
            <button type="button" className="panel-btn-ghost" onClick={reiniciar} disabled={guardando}>
              Empezar de nuevo
            </button>
            {terminado && okCount > 0 && onDone && (
              <button type="button" className="panel-btn-ghost" onClick={onDone}>
                Ver en el calendario
              </button>
            )}
            <button type="button" className="panel-btn" onClick={() => void guardar()} disabled={guardando || !guardables.length}>
              {guardando ? "Guardando…" : `Guardar ${guardables.length} artículo${guardables.length === 1 ? "" : "s"}`}
            </button>
          </div>
        </div>
      </div>

      {/* Vista previa */}
      <div className={`bimp-scrim${vista ? " is-open" : ""}`} onClick={() => setVista(null)} />
      <aside className={`bimp-drawer${vista ? " is-open" : ""}`} aria-hidden={!vista} role="dialog" aria-label="Vista previa">
        {vista && (
          <>
            <div className="bimp-drawer-head">
              <span className={`bimp-pill is-${vista.nivel}`}>{etiquetaNivel(vista.nivel)}</span>
              <button type="button" className="panel-btn-ghost" onClick={() => setVista(null)} aria-label="Cerrar">
                ×
              </button>
            </div>
            <div className="bimp-drawer-body">
              {vista.coverFile && <img className="bimp-cover" src={URL.createObjectURL(vista.coverFile)} alt="" />}
              {vista.coverUrl && <img className="bimp-cover" src={vista.coverUrl} alt="" />}
              <h3>{vista.title}</h3>
              <dl className="bimp-meta">
                <dt>Publicación</dt>
                <dd>{vista.date ? `${fechaLarga(vista.date)}, 7:00 a. m.` : "—"}</dd>
                <dt>Dirección</dt>
                <dd>/blog/{vista.slug}</dd>
                <dt>Categoría</dt>
                <dd>{vista.category?.name || vista.categoryText || "—"}</dd>
                <dt>Etiquetas</dt>
                <dd>{vista.tags.join(", ") || "—"}</dd>
                <dt>Resumen</dt>
                <dd>{vista.excerpt || "—"}</dd>
                <dt>Título SEO</dt>
                <dd>{vista.seoTitle || vista.title}</dd>
                <dt>Descripción SEO</dt>
                <dd>{vista.seoDescription || vista.excerpt || "—"}</dd>
              </dl>
              {vista.doc && vista.doc.subtitles.length >= 2 && (
                <div className="bimp-toc">
                  <b>En este artículo</b>
                  <ol>
                    {vista.doc.subtitles.map((s, i) => (
                      <li key={`${s}-${i}`}>{s}</li>
                    ))}
                  </ol>
                </div>
              )}
              <div className="bimp-content">
                <Markdown content={vista.doc?.markdown || ""} />
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
