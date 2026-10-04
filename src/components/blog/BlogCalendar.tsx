import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Calendario editorial del blog (panel /rckt-equipo).
 *
 * Fase 1: solo lectura. Muestra todos los artículos (publicados, programados
 * y borradores) por mes o por semana, con las fechas en hora de Bogotá.
 * Lee de /api/admin/people/blog, el mismo endpoint del panel, que devuelve
 * también los borradores porque usa la llave del servidor.
 */

const TZ = "America/Bogota";

type ApiCategory = { id: string; name: string; slug: string };

type ApiPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_path: string | null;
  author_name: string | null;
  tags: string[] | null;
  status: "draft" | "published" | "archived";
  published_at: string | null;
  created_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  blog_categories: ApiCategory | ApiCategory[] | null;
};

type Estado = "publicado" | "programado" | "borrador";

type CalPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  tags: string[];
  category: string;
  seoTitle: string;
  seoDescription: string;
  when: Date;
  dayKey: string;
  estado: Estado;
};

const ESTADO_LABEL: Record<Estado, string> = {
  publicado: "Publicado",
  programado: "Programado",
  borrador: "Borrador",
};

/* ---------- Fechas en hora de Bogotá ---------- */

const dayKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const timeFormatter = new Intl.DateTimeFormat("es-CO", { timeZone: TZ, hour: "numeric", minute: "2-digit" });
const longFormatter = new Intl.DateTimeFormat("es-CO", {
  timeZone: TZ,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const pad = (n: number) => String(n).padStart(2, "0");
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** Clave "AAAA-MM-DD" de una celda del calendario (fecha local, sin hora) */
const cellKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
/** Clave "AAAA-MM-DD" del día en que sale un artículo, en hora de Bogotá */
const bogotaKey = (d: Date) => dayKeyFormatter.format(d);
const todayKey = () => bogotaKey(new Date());
const keyToDate = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const startOfWeek = (d: Date) => {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); // semana de lunes a domingo
  return x;
};

/* ---------- Normalización de los datos del endpoint ---------- */

function toCalPost(p: ApiPost, now: Date): CalPost | null {
  if (p.status === "archived") return null;
  const raw = p.published_at || p.created_at;
  if (!raw) return null;
  const when = new Date(raw);
  if (Number.isNaN(when.getTime())) return null;
  const cat = Array.isArray(p.blog_categories) ? p.blog_categories[0] : p.blog_categories;
  const estado: Estado = p.status === "draft" ? "borrador" : when > now ? "programado" : "publicado";
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    cover: p.cover_image_path || "",
    author: p.author_name || "",
    tags: p.tags || [],
    category: cat?.name || "",
    seoTitle: p.seo_title || "",
    seoDescription: p.seo_description || "",
    when,
    dayKey: bogotaKey(when),
    estado,
  };
}

/* ---------- Componente ---------- */

export function BlogCalendar({ onGoToBlog }: { onGoToBlog?: () => void }) {
  const [posts, setPosts] = useState<CalPost[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vista, setVista] = useState<"mes" | "semana">("mes");
  const [cursor, setCursor] = useState<Date>(() => keyToDate(todayKey()));
  const [abierto, setAbierto] = useState<CalPost | null>(null);
  const [angosto, setAngosto] = useState(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/people/blog");
      if (!res.ok) throw new Error(res.status === 401 ? "Tu sesión venció. Vuelve a entrar al panel." : `Error ${res.status}`);
      const data = (await res.json()) as { posts?: ApiPost[] };
      const now = new Date();
      setPosts((data.posts || []).map((p) => toCalPost(p, now)).filter((p): p is CalPost => p !== null));
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudieron cargar los artículos.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  // En pantallas pequeñas el mes se muestra como lista de días
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const update = () => setAngosto(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Cerrar el panel lateral con Escape
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierto]);

  const porDia = useMemo(() => {
    const map = new Map<string, CalPost[]>();
    for (const p of posts) {
      const list = map.get(p.dayKey) || [];
      list.push(p);
      map.set(p.dayKey, list);
    }
    map.forEach((list) => list.sort((a, b) => a.when.getTime() - b.when.getTime()));
    return map;
  }, [posts]);

  const resumen = useMemo(() => {
    const r = { publicado: 0, programado: 0, borrador: 0 };
    posts.forEach((p) => r[p.estado]++);
    return r;
  }, [posts]);

  const hoy = todayKey();

  const mover = (dir: 1 | -1) => {
    setCursor((c) => {
      if (vista === "mes") return new Date(c.getFullYear(), c.getMonth() + dir, 1);
      const x = new Date(c);
      x.setDate(x.getDate() + 7 * dir);
      return x;
    });
  };

  const titulo = useMemo(() => {
    if (vista === "mes") {
      return cap(new Intl.DateTimeFormat("es-CO", { month: "long", year: "numeric" }).format(cursor));
    }
    const s = startOfWeek(cursor);
    const e = new Date(s);
    e.setDate(s.getDate() + 6);
    const f = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short" });
    return `${f.format(s)} – ${f.format(e)} ${e.getFullYear()}`;
  }, [cursor, vista]);

  const chip = (p: CalPost) => (
    <button key={p.id} type="button" className={`bcal-chip is-${p.estado}`} onClick={() => setAbierto(p)} title={p.title}>
      <span className={`bcal-dot is-${p.estado}`} aria-hidden="true" />
      <span className="bcal-chip-title">{p.title}</span>
      <span className="bcal-chip-meta">
        {timeFormatter.format(p.when)} · {ESTADO_LABEL[p.estado]}
      </span>
    </button>
  );

  /* ----- Vista de mes ----- */
  const renderMes = () => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const start = startOfWeek(first);
    const dias: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      dias.push(d);
    }
    const ultimaFilaVacia = dias.slice(35).every((d) => d.getMonth() !== cursor.getMonth());
    const grilla = ultimaFilaVacia ? dias.slice(0, 35) : dias;

    if (angosto) {
      const conPosts = grilla.filter((d) => d.getMonth() === cursor.getMonth() && porDia.has(cellKey(d)));
      if (!conPosts.length) return <p className="bcal-empty">No hay artículos este mes.</p>;
      return (
        <div className="bcal-agenda">
          {conPosts.map((d) => (
            <div className="bcal-agenda-day" key={cellKey(d)}>
              <h4>{cap(new Intl.DateTimeFormat("es-CO", { weekday: "long", day: "numeric", month: "long" }).format(d))}</h4>
              {porDia.get(cellKey(d))!.map(chip)}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="bcal-month">
        <div className="bcal-month-head">
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((n) => (
            <div key={n}>{n}</div>
          ))}
        </div>
        <div className="bcal-month-grid">
          {grilla.map((d) => {
            const key = cellKey(d);
            const list = porDia.get(key) || [];
            const fuera = d.getMonth() !== cursor.getMonth();
            return (
              <div key={key} className={`bcal-day${fuera ? " is-out" : ""}${key === hoy ? " is-today" : ""}`}>
                <span className="bcal-num">{d.getDate()}</span>
                {list.slice(0, 3).map(chip)}
                {list.length > 3 && (
                  <button
                    type="button"
                    className="bcal-more"
                    onClick={() => {
                      setCursor(d);
                      setVista("semana");
                    }}
                  >
                    +{list.length - 3} más
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* ----- Vista de semana ----- */
  const renderSemana = () => {
    const s = startOfWeek(cursor);
    const dias = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(s);
      d.setDate(s.getDate() + i);
      return d;
    });
    return (
      <div className="bcal-week">
        {dias.map((d) => {
          const key = cellKey(d);
          const list = porDia.get(key) || [];
          return (
            <div key={key} className={`bcal-wcol${key === hoy ? " is-today" : ""}`}>
              <h4>
                {cap(new Intl.DateTimeFormat("es-CO", { weekday: "long" }).format(d))}
                <b>{d.getDate()}</b>
              </h4>
              {list.length ? list.map(chip) : <span className="bcal-empty-day">Sin artículos</span>}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bcal">
      <div className="bcal-toolbar">
        <div className="bcal-nav">
          <button type="button" className="panel-btn-ghost bcal-icon" onClick={() => mover(-1)} aria-label="Anterior">
            ‹
          </button>
          <button type="button" className="panel-btn-ghost bcal-icon" onClick={() => mover(1)} aria-label="Siguiente">
            ›
          </button>
          <h3>{titulo}</h3>
          <button type="button" className="panel-btn-ghost" onClick={() => setCursor(keyToDate(todayKey()))}>
            Hoy
          </button>
        </div>
        <div className="bcal-nav">
          <div className="bcal-seg" role="group" aria-label="Vista">
            <button type="button" aria-pressed={vista === "mes"} onClick={() => setVista("mes")}>
              Mes
            </button>
            <button type="button" aria-pressed={vista === "semana"} onClick={() => setVista("semana")}>
              Semana
            </button>
          </div>
          <button type="button" className="panel-btn-ghost" onClick={() => void cargar()} disabled={cargando}>
            {cargando ? "Cargando…" : "Actualizar"}
          </button>
        </div>
      </div>

      <div className="bcal-legend">
        <span>
          <i className="bcal-dot is-publicado" /> Publicado ({resumen.publicado})
        </span>
        <span>
          <i className="bcal-dot is-programado" /> Programado ({resumen.programado})
        </span>
        <span>
          <i className="bcal-dot is-borrador" /> Borrador ({resumen.borrador})
        </span>
        <span className="bcal-tz">Horas de Bogotá (UTC−5)</span>
      </div>

      {error ? (
        <div className="bcal-error" role="alert">
          {error}
        </div>
      ) : cargando && !posts.length ? (
        <p className="bcal-empty">Cargando artículos…</p>
      ) : vista === "mes" ? (
        renderMes()
      ) : (
        renderSemana()
      )}

      <p className="bcal-note">
        Un artículo <strong>publicado con fecha futura</strong> aparece aquí como <strong>programado</strong>: el sitio lo
        muestra solo cuando llega su fecha y hora, sin deploy. Los archivados no se muestran.
      </p>

      {/* Panel lateral con el detalle */}
      <div className={`bcal-scrim${abierto ? " is-open" : ""}`} onClick={() => setAbierto(null)} />
      <aside className={`bcal-drawer${abierto ? " is-open" : ""}`} aria-hidden={!abierto} role="dialog" aria-label="Detalle del artículo">
        {abierto && (
          <>
            <div className="bcal-drawer-head">
              <span className={`bcal-pill is-${abierto.estado}`}>{ESTADO_LABEL[abierto.estado]}</span>
              <button type="button" className="panel-btn-ghost bcal-icon" onClick={() => setAbierto(null)} aria-label="Cerrar">
                ×
              </button>
            </div>
            <div className="bcal-drawer-body">
              {abierto.cover && <img className="bcal-cover" src={abierto.cover} alt="" />}
              <h3>{abierto.title}</h3>
              <dl className="bcal-meta">
                <dt>{abierto.estado === "programado" ? "Se publica" : abierto.estado === "publicado" ? "Publicado" : "Fecha"}</dt>
                <dd>{cap(longFormatter.format(abierto.when))}</dd>
                <dt>Dirección</dt>
                <dd>/blog/{abierto.slug}</dd>
                <dt>Categoría</dt>
                <dd>{abierto.category || "—"}</dd>
                <dt>Autor</dt>
                <dd>{abierto.author || "—"}</dd>
                <dt>Etiquetas</dt>
                <dd>{abierto.tags.length ? abierto.tags.join(", ") : "—"}</dd>
                <dt>Resumen</dt>
                <dd>{abierto.excerpt || "—"}</dd>
                <dt>Título SEO</dt>
                <dd>{abierto.seoTitle || abierto.title}</dd>
                <dt>Descripción SEO</dt>
                <dd>{abierto.seoDescription || abierto.excerpt || "—"}</dd>
              </dl>
              {abierto.estado === "programado" && (
                <p className="bcal-note">Está oculto en el sitio hasta esa fecha y hora. Se publica solo.</p>
              )}
              {abierto.estado === "borrador" && (
                <p className="bcal-note">Es un borrador: no se publicará hasta que cambies su estado en la pestaña Blog.</p>
              )}
              <div className="bcal-actions">
                {abierto.estado === "publicado" && (
                  <a className="panel-btn-ghost" href={`/blog/${abierto.slug}`} target="_blank" rel="noreferrer">
                    Ver en el sitio
                  </a>
                )}
                {onGoToBlog && (
                  <button
                    type="button"
                    className="panel-btn"
                    onClick={() => {
                      setAbierto(null);
                      onGoToBlog();
                    }}
                  >
                    Ir a la pestaña Blog para editar
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
