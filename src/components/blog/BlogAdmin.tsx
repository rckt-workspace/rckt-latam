import { useCallback, useEffect, useMemo, useState } from "react";
import { blogRepository, hasLocalBlogChanges } from "@/lib/blog.repository";
import { estimateReadingTime, formatShortDate, slugify } from "@/lib/blog.utils";
import { Markdown } from "@/components/blog/Markdown";
import type { BlogCategory, BlogPost, BlogStatus } from "@/types/blog";

const btn = "panel-btn";
const btnGhost = "panel-btn-ghost";

const estadoLabel: Record<BlogStatus, string> = {
  draft: "Borrador",
  published: "Publicado",
  archived: "Archivado",
};

type Draft = Omit<BlogPost, "readingTime" | "updatedAt">;

function nuevoBorrador(categoria: string): Draft {
  const now = new Date().toISOString();
  return {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `post-${Date.now()}`,
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    coverImageAlt: "",
    author: { name: "Equipo RCKT", role: "Growth & Marketing" },
    category: categoria,
    tags: [],
    status: "draft",
    featured: false,
    publishedAt: now,
    seo: { title: "", description: "", canonical: "" },
  };
}

export function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [vista, setVista] = useState<"editar" | "preview">("editar");
  const [error, setError] = useState<string | null>(null);
  const [locales, setLocales] = useState(false);

  const cargar = useCallback(async () => {
    const [p, c] = await Promise.all([blogRepository.getAllPosts(), blogRepository.getCategories()]);
    setPosts(p);
    setCategories(c);
    setLocales(hasLocalBlogChanges());
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const categoriaPorDefecto = categories[0]?.name ?? "Growth";

  async function guardar(estado: BlogStatus) {
    if (!draft) return;
    const slug = slugify(draft.slug || draft.title);
    if (!draft.title.trim()) return setError("El título es obligatorio.");
    if (!slug) return setError("El slug es obligatorio.");
    if (!draft.excerpt.trim()) return setError("El extracto es obligatorio.");
    if (!draft.content.trim()) return setError("El contenido es obligatorio.");
    if (posts.some((p) => p.slug === slug && p.id !== draft.id))
      return setError("Ya existe un artículo con ese slug.");

    setError(null);
    await blogRepository.savePost({
      ...draft,
      slug,
      status: estado,
      readingTime: estimateReadingTime(draft.content),
    });
    setDraft(null);
    setVista("editar");
    await cargar();
  }

  async function cambiarEstado(post: BlogPost, estado: BlogStatus) {
    await blogRepository.savePost({ ...post, status: estado });
    await cargar();
  }

  async function duplicar(post: BlogPost) {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `post-${Date.now()}`;
    let slug = `${post.slug}-copia`;
    let n = 2;
    while (posts.some((p) => p.slug === slug)) slug = `${post.slug}-copia-${n++}`;
    await blogRepository.savePost({
      ...post,
      id,
      slug,
      title: `${post.title} (copia)`,
      status: "draft",
      featured: false,
    });
    await cargar();
  }

  async function eliminar(post: BlogPost) {
    if (!window.confirm(`¿Eliminar "${post.title}" de esta instalación local?`)) return;
    await blogRepository.deletePost(post.id);
    await cargar();
  }

  async function exportar() {
    const data = await blogRepository.exportPosts();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blog-posts-export.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function restaurar() {
    if (!window.confirm("Esto descartará los cambios locales del blog y volverá al contenido original. ¿Continuar?"))
      return;
    await blogRepository.resetToSeed();
    setDraft(null);
    await cargar();
  }

  const conteo = useMemo(
    () => ({
      publicados: posts.filter((p) => p.status === "published").length,
      borradores: posts.filter((p) => p.status === "draft").length,
      archivados: posts.filter((p) => p.status === "archived").length,
    }),
    [posts],
  );

  return (
    <section className="mt-7">
      <div className="flex flex-wrap items-center gap-2">
        <button className={btn} type="button" onClick={() => setDraft(nuevoBorrador(categoriaPorDefecto))}>
          + Nuevo artículo
        </button>
        <button className={btnGhost} type="button" onClick={() => void exportar()}>
          Exportar JSON
        </button>
        <button className={btnGhost} type="button" onClick={() => void restaurar()}>
          Restaurar datos originales
        </button>
      </div>

      <p className="mt-3 text-[13px] text-[var(--carbon-soft)]">
        {conteo.publicados} publicados · {conteo.borradores} borradores · {conteo.archivados} archivados.{" "}
        {locales
          ? "Estás viendo cambios guardados en este navegador. Exporta el JSON para conservarlos."
          : "Estás viendo el contenido original del proyecto."}
      </p>

      {draft && (
        <div className="mt-5 panel-card grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-[18px] font-bold">{draft.title || "Nuevo artículo"}</h3>
            <div className="flex gap-2">
              <button
                className={vista === "editar" ? "panel-tab-active" : btnGhost}
                type="button"
                onClick={() => setVista("editar")}
              >
                Editar
              </button>
              <button
                className={vista === "preview" ? "panel-tab-active" : btnGhost}
                type="button"
                onClick={() => setVista("preview")}
              >
                Vista previa
              </button>
            </div>
          </div>

          {vista === "editar" ? (
            <div className="grid gap-3">
              <input
                placeholder="Título"
                value={draft.title}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    title: e.target.value,
                    slug: draft.slug ? draft.slug : "",
                  })
                }
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  placeholder="Slug (se genera del título)"
                  value={draft.slug}
                  onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                  onBlur={(e) => setDraft({ ...draft, slug: slugify(e.target.value || draft.title) })}
                />
                <select
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Extracto"
                rows={2}
                value={draft.excerpt}
                onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  placeholder="Etiquetas separadas por coma"
                  value={draft.tags.join(", ")}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      tags: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                />
                <input
                  placeholder="Autor"
                  value={draft.author.name}
                  onChange={(e) => setDraft({ ...draft, author: { ...draft.author, name: e.target.value } })}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  placeholder="Rol del autor"
                  value={draft.author.role}
                  onChange={(e) => setDraft({ ...draft, author: { ...draft.author, role: e.target.value } })}
                />
                <input
                  type="date"
                  value={draft.publishedAt.slice(0, 10)}
                  onChange={(e) =>
                    setDraft({ ...draft, publishedAt: new Date(`${e.target.value}T12:00:00Z`).toISOString() })
                  }
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  placeholder="Ruta o URL de la imagen de portada"
                  value={draft.coverImage}
                  onChange={(e) => setDraft({ ...draft, coverImage: e.target.value })}
                />
                <input
                  placeholder="Texto alternativo de la portada"
                  value={draft.coverImageAlt}
                  onChange={(e) => setDraft({ ...draft, coverImageAlt: e.target.value })}
                />
              </div>
              <p className="text-[12px] text-[var(--carbon-soft)]">
                Si dejas la portada vacía, el artículo usa la portada editorial de RCKT.
              </p>
              <textarea
                placeholder="Contenido en Markdown (## títulos, listas, **negritas**, enlaces, citas)"
                rows={14}
                value={draft.content}
                onChange={(e) => setDraft({ ...draft, content: e.target.value })}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  placeholder="SEO title"
                  value={draft.seo.title}
                  onChange={(e) => setDraft({ ...draft, seo: { ...draft.seo, title: e.target.value } })}
                />
                <input
                  placeholder="SEO description"
                  value={draft.seo.description}
                  onChange={(e) => setDraft({ ...draft, seo: { ...draft.seo, description: e.target.value } })}
                />
              </div>
              <label className="flex items-center gap-2 text-[14px]">
                <input
                  type="checkbox"
                  checked={draft.featured}
                  onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
                />
                Artículo destacado
              </label>
            </div>
          ) : (
            <div className="blog-admin-preview">
              <h2>{draft.title || "Sin título"}</h2>
              <p className="blog-excerpt">{draft.excerpt}</p>
              <Markdown content={draft.content} />
            </div>
          )}

          {error && <p className="text-[14px] text-[var(--naranja-deep)]">{error}</p>}

          <div className="flex flex-wrap gap-2">
            <button className={btnGhost} type="button" onClick={() => void guardar("draft")}>
              Guardar borrador
            </button>
            <button className={btn} type="button" onClick={() => void guardar("published")}>
              Publicar
            </button>
            <button className={btnGhost} type="button" onClick={() => { setDraft(null); setError(null); }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-3">
        {posts.map((post) => (
          <article className="panel-card" key={post.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-[17px] font-bold">{post.title}</h3>
                <p className="text-[13px] text-[var(--carbon-soft)]">
                  {post.category} · {estadoLabel[post.status]} · {formatShortDate(post.publishedAt)}
                  {post.featured ? " · Destacado" : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className={btnGhost}
                  type="button"
                  onClick={() => {
                    const { readingTime: _rt, updatedAt: _ua, ...rest } = post;
                    setDraft(rest);
                    setVista("editar");
                    setError(null);
                  }}
                >
                  Editar
                </button>
                <button className={btnGhost} type="button" onClick={() => void duplicar(post)}>
                  Duplicar
                </button>
                <button
                  className={btnGhost}
                  type="button"
                  onClick={() => void cambiarEstado(post, post.status === "published" ? "draft" : "published")}
                >
                  {post.status === "published" ? "Pasar a borrador" : "Publicar"}
                </button>
                <button className={btnGhost} type="button" onClick={() => void cambiarEstado(post, "archived")}>
                  Archivar
                </button>
                <button className={btnGhost} type="button" onClick={() => void eliminar(post)}>
                  Eliminar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
