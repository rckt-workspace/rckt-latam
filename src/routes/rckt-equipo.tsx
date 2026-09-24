import { createFileRoute } from "@tanstack/react-router";
import logoDark from "@/assets/rckt-logo-dark.png";
import { useCallback, useEffect, useState } from "react";
import { BlogAdmin } from "@/components/blog/BlogAdmin";

export const Route = createFileRoute("/rckt-equipo")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "People & Culture — RCKT" },
      { name: "description", content: "Acceso restringido al equipo People & Culture de RCKT." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "People & Culture — RCKT" },
      {
        property: "og:description",
        content: "Acceso restringido al equipo People & Culture de RCKT.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PanelPC,
});

type Vacante = {
  id: string;
  titulo: string;
  area: string | null;
  modalidad: string | null;
  ubicacion: string | null;
  descripcion: string | null;
  requisitos: string | null;
  estado: "activa" | "cerrada";
  fecha_publicacion: string;
};

type Postulacion = {
  id: string;
  vacante_id: string | null;
  nombre: string;
  email: string;
  telefono: string | null;
  cv_path: string | null;
  portafolio_url: string | null;
  mensaje: string | null;
  tipo: "candidato" | "servicio";
  estado: string;
  created_at: string;
  notas_internas: string | null;
  source: string | null;
  consent_at: string | null;
};

const btn = "panel-btn";
const btnGhost = "panel-btn-ghost";

function PanelPC() {
  const [autenticado, setAutenticado] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [errorConexion, setErrorConexion] = useState(false);

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const res = await fetch("/api/admin/verify");
        if (res.ok) {
          setAutenticado(true);
          setCargando(false);
        } else {
          window.location.href = "/ops/login?next=/rckt-equipo";
        }
      } catch (e) {
        console.error("Error verificando sesión:", e);
        setErrorConexion(true);
        setCargando(false);
      }
    };

    verificarSesion();
  }, []);

  if (cargando) {
    return (
      <div className="rckt-site rckt-panel">
        <div className="panel-wrap">
          <p style={{ color: "var(--carbon-soft)" }}>Cargando…</p>
        </div>
      </div>
    );
  }

  if (errorConexion || !autenticado) {
    return (
      <div className="rckt-site rckt-panel">
        <div className="panel-wrap">
          <div className="panel-card" role="alert">
            <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>Error de conexión</h1>
            <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--carbon-soft)" }}>
              Vuelve a intentarlo en unos segundos.
            </p>
            <button
              className={btn}
              style={{ marginTop: 16 }}
              type="button"
              onClick={() => window.location.reload()}
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Dashboard />;
}

const vacanteVacia = {
  titulo: "",
  area: "",
  modalidad: "Remoto",
  ubicacion: "",
  descripcion: "",
  requisitos: "",
};

function Dashboard() {
  const [tab, setTab] = useState<"vacantes" | "postulaciones" | "blog">("vacantes");
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
  const [editando, setEditando] = useState<(typeof vacanteVacia & { id?: string }) | null>(null);
  const [filtroVacante, setFiltroVacante] = useState("todas");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [detalle, setDetalle] = useState<Postulacion | null>(null);
  const [cargando, setCargando] = useState(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const vRes = await fetch("/api/admin/people/vacantes");
      if (!vRes.ok) {
        const err = await vRes.json().catch(() => null);
        throw new Error(err?.error || "Error cargando vacantes");
      }
      const vData = await vRes.json();
      setVacantes(Array.isArray(vData) ? vData : []);

      const pRes = await fetch("/api/admin/people/postulaciones");
      if (!pRes.ok) {
        const err = await pRes.json().catch(() => null);
        throw new Error(err?.error || "Error cargando postulaciones");
      }
      const pData = await pRes.json();
      setPostulaciones(Array.isArray(pData) ? pData : []);
    } catch (e) {
      console.error("Error cargando datos:", e);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  async function guardar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editando) return;

    const payload = {
      titulo: editando.titulo,
      area: editando.area || null,
      modalidad: "Remoto",
      ubicacion: editando.ubicacion || null,
      descripcion: editando.descripcion || null,
      requisitos: editando.requisitos || null,
    };

    try {
      if (editando.id) {
        await fetch("/api/admin/people/vacantes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editando.id, ...payload }),
        });
      } else {
        await fetch("/api/admin/people/vacantes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setEditando(null);
      await cargar();
    } catch (e) {
      console.error("Error guardando vacante:", e);
    }
  }

  async function cambiarEstado(v: Vacante) {
    try {
      await fetch("/api/admin/people/vacantes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: v.id,
          estado: v.estado === "activa" ? "cerrada" : "activa",
        }),
      });
      await cargar();
    } catch (e) {
      console.error("Error cambiando estado:", e);
    }
  }

  async function eliminar(id: string) {
    try {
      await fetch("/api/admin/people/vacantes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await cargar();
    } catch (e) {
      console.error("Error eliminando vacante:", e);
    }
  }

  async function cambiarEstadoPostulacion(p: Postulacion, estado: string) {
    try {
      await fetch("/api/admin/people/postulaciones", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: p.id, estado }),
      });
      await cargar();
      setDetalle(null);
    } catch (e) {
      console.error("Error cambiando estado postulacion:", e);
    }
  }

  async function eliminarPostulacion(id: string) {
    if (
      !window.confirm(
        "¿Seguro que quieres eliminar esta postulación? Esta acción no se puede deshacer.",
      )
    )
      return;
    try {
      await fetch("/api/admin/people/postulaciones", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setDetalle((d) => (d?.id === id ? null : d));
      await cargar();
    } catch (e) {
      console.error("Error eliminando postulacion:", e);
    }
  }

  async function abrirCv(cvPath: string | null) {
    if (!cvPath) return;
    try {
      const res = await fetch(`/api/admin/people/cv-signed-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: cvPath }),
      });
      if (!res.ok) {
        console.error("Error generando URL:", res.statusText);
        return;
      }
      const { signedUrl } = await res.json();
      if (signedUrl) window.open(signedUrl, "_blank", "noopener");
    } catch (e) {
      console.error("Error abriendo CV:", e);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/ops/login";
    } catch (e) {
      console.error("Error en logout:", e);
    }
  }

  const filtradas = postulaciones.filter(
    (p) =>
      (filtroVacante === "todas" || p.vacante_id === filtroVacante) &&
      (filtroTipo === "todos" || p.tipo === filtroTipo),
  );

  return (
    <div className="rckt-site rckt-panel">
      <div className="panel-wrap">
        {/* Header */}
        <div style={{ marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid var(--line-strong)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "32px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--carbon-soft)", marginBottom: "8px" }}>
                RCKT / People & Culture
              </p>
              <h1 style={{ fontSize: "32px", fontWeight: 800, lineHeight: 1.1, color: "var(--carbon)", margin: "0 0 8px 0" }}>
                People & Culture
              </h1>
              <p style={{ fontSize: "15px", color: "var(--carbon-soft)", margin: 0, lineHeight: 1.5 }}>
                Gestión de talento, postulaciones y contenido
              </p>
            </div>
            <button className={btnGhost} onClick={handleLogout} type="button" style={{ whiteSpace: "nowrap" }}>
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "32px", paddingBottom: "16px", borderBottom: "1px solid var(--line)", flexWrap: "wrap" }}>
          {(["vacantes", "postulaciones", "blog"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={tab === t ? "panel-tab-active" : btnGhost}
              style={{
                borderRadius: "999px",
                padding: tab === t ? undefined : "8px 16px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {t === "vacantes" ? "Vacantes" : t === "postulaciones" ? "Postulaciones" : "Blog"}
            </button>
          ))}
        </div>

        {/* Blog */}
        {tab === "blog" && (
          <div style={{ marginBottom: "40px" }}>
            <div style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid var(--line)" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--carbon)", margin: "0 0 6px 0" }}>
                Blog
              </h2>
              <p style={{ fontSize: "14px", color: "var(--carbon-soft)", margin: 0 }}>
                Gestiona artículos de RCKT Insights
              </p>
            </div>
            <BlogAdmin />
          </div>
        )}

        {/* Vacantes */}
        {tab === "vacantes" && (
          <div style={{ marginBottom: "40px" }}>
            <div style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid var(--line)" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--carbon)", margin: "0 0 6px 0" }}>
                Vacantes
              </h2>
              <p style={{ fontSize: "14px", color: "var(--carbon-soft)", margin: 0 }}>
                Gestiona las oportunidades activas de RCKT
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
              <div />
              <button className={btn} type="button" onClick={() => setEditando({ ...vacanteVacia })}>
                + Nueva vacante
              </button>
            </div>

            {editando && (
              <div className="panel-card" style={{ marginBottom: "24px" }}>
                <form className="grid gap-4" onSubmit={guardar}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--carbon)", display: "block", marginBottom: "6px" }}>
                      Título
                    </label>
                    <input
                      placeholder="Ej: Senior Product Manager"
                      required
                      value={editando.titulo}
                      onChange={(e) => setEditando({ ...editando, titulo: e.target.value })}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                    <div>
                      <label style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--carbon)", display: "block", marginBottom: "6px" }}>
                        Área
                      </label>
                      <input
                        placeholder="Ej: Product"
                        value={editando.area}
                        onChange={(e) => setEditando({ ...editando, area: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--carbon)", display: "block", marginBottom: "6px" }}>
                        Ubicación
                      </label>
                      <input
                        placeholder="Ej: Bogotá, Colombia"
                        value={editando.ubicacion}
                        onChange={(e) => setEditando({ ...editando, ubicacion: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--carbon)", display: "block", marginBottom: "6px" }}>
                      Descripción
                    </label>
                    <textarea
                      placeholder="Descripción de la vacante"
                      rows={3}
                      value={editando.descripcion}
                      onChange={(e) => setEditando({ ...editando, descripcion: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--carbon)", display: "block", marginBottom: "6px" }}>
                      Requisitos
                    </label>
                    <textarea
                      placeholder="Requisitos necesarios"
                      rows={3}
                      value={editando.requisitos}
                      onChange={(e) => setEditando({ ...editando, requisitos: e.target.value })}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button className={btn} type="submit" disabled={cargando}>
                      {editando.id ? "Actualizar vacante" : "Crear vacante"}
                    </button>
                    <button className={btnGhost} type="button" onClick={() => setEditando(null)}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {vacantes.length === 0 && (
                <p style={{ color: "var(--carbon-soft)" }}>Aún no hay vacantes creadas.</p>
              )}
              {vacantes.map((v) => (
                <div key={v.id} className="panel-card" style={{ borderRadius: "14px", padding: "18px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px", marginBottom: "14px" }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--carbon)", margin: 0 }}>
                        {v.titulo}
                      </h3>
                      <p style={{ fontSize: "13px", color: "var(--carbon-soft)", margin: "6px 0 0 0", display: "flex", gap: "16px" }}>
                        {v.area && <span>{v.area}</span>}
                        {v.modalidad && <span>{v.modalidad}</span>}
                        {v.ubicacion && <span>{v.ubicacion}</span>}
                      </p>
                      <p style={{ fontSize: "13px", color: "var(--carbon-soft)", marginTop: "8px" }}>
                        {new Date(v.fecha_publicacion).toLocaleDateString("es-CO")}
                      </p>
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", background: v.estado === "activa" ? "rgba(252, 92, 31, 0.15)" : "rgba(33, 33, 33, 0.08)", color: v.estado === "activa" ? "var(--naranja-deep)" : "var(--carbon-soft)" }}>
                      {v.estado === "activa" ? "Activa" : "Cerrada"}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <button
                      className={btnGhost}
                      type="button"
                      onClick={() =>
                        setEditando({
                          id: v.id,
                          titulo: v.titulo,
                          area: v.area ?? "",
                          modalidad: v.modalidad ?? "",
                          ubicacion: v.ubicacion ?? "",
                          descripcion: v.descripcion ?? "",
                          requisitos: v.requisitos ?? "",
                        })
                      }
                    >
                      Editar
                    </button>
                    <button className={btnGhost} type="button" onClick={() => cambiarEstado(v)}>
                      {v.estado === "activa" ? "Cerrar" : "Reabrir"}
                    </button>
                    <button className="panel-btn-danger" type="button" onClick={() => eliminar(v.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Postulaciones */}
        {tab === "postulaciones" && (
          <div style={{ marginBottom: "40px" }}>
            <div style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid var(--line)" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--carbon)", margin: "0 0 6px 0" }}>
                Postulaciones
              </h2>
              <p style={{ fontSize: "14px", color: "var(--carbon-soft)", margin: 0 }}>
                Revisa candidatos y servicios freelance
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
              <select value={filtroVacante} onChange={(e) => setFiltroVacante(e.target.value)} style={{ maxWidth: "280px" }}>
                <option value="todas">Todas las vacantes</option>
                {vacantes.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.titulo}
                  </option>
                ))}
              </select>
              <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} style={{ maxWidth: "200px" }}>
                <option value="todos">Todos los tipos</option>
                <option value="candidato">Candidatos</option>
                <option value="servicio">Freelancers</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {filtradas.length === 0 && (
                <p style={{ color: "var(--carbon-soft)" }}>No hay postulaciones con estos filtros.</p>
              )}
              {filtradas.map((p) => (
                <div key={p.id} className="panel-card" style={{ borderRadius: "14px", padding: "18px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                        <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--carbon)" }}>
                          {p.nombre}
                        </span>
                        <span
                          className={`badge-tipo ${p.tipo === "candidato" ? "badge-candidato" : "badge-servicio"}`}
                        >
                          {p.tipo === "candidato" ? "Candidato" : "Freelance"}
                        </span>
                      </div>
                      <div style={{ fontSize: "13px", color: "var(--carbon-soft)", lineHeight: 1.6 }}>
                        <div>{p.email}</div>
                        {p.telefono && <div>{p.telefono}</div>}
                        {vacantes.find((v) => v.id === p.vacante_id) && (
                          <div>{vacantes.find((v) => v.id === p.vacante_id)?.titulo}</div>
                        )}
                        <div>{new Date(p.created_at).toLocaleDateString("es-CO")}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
                    {p.cv_path && (
                      <button className={btnGhost} type="button" onClick={() => abrirCv(p.cv_path)}>
                        Ver CV
                      </button>
                    )}
                    <button className={btnGhost} type="button" onClick={() => setDetalle(p)}>
                      Ver detalle
                    </button>
                    <button className="panel-btn-danger" type="button" onClick={() => eliminarPostulacion(p.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal */}
        {detalle && (
          <div
            className="panel-modal-overlay"
            role="dialog"
            aria-modal="true"
            onClick={() => setDetalle(null)}
          >
            <div className="panel-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="panel-modal-close"
                type="button"
                aria-label="Cerrar"
                onClick={() => setDetalle(null)}
              >
                ×
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span
                  className={`badge-tipo ${detalle.tipo === "candidato" ? "badge-candidato" : "badge-servicio"}`}
                >
                  {detalle.tipo === "candidato" ? "Candidato" : "Freelance"}
                </span>
              </div>

              <h3 style={{ fontSize: "22px", fontWeight: 800, margin: "0 0 20px 0" }}>
                {detalle.nombre}
              </h3>

              <div className="dato-grid">
                <p className="dato">
                  <span>Correo</span>
                  <span>{detalle.email}</span>
                </p>
                {detalle.telefono && (
                  <p className="dato">
                    <span>Teléfono</span>
                    <span>{detalle.telefono}</span>
                  </p>
                )}
                <p className="dato">
                  <span>Vacante</span>
                  <span>{vacantes.find((v) => v.id === detalle.vacante_id)?.titulo ?? "—"}</span>
                </p>
                <p className="dato">
                  <span>Fecha</span>
                  <span>{new Date(detalle.created_at).toLocaleDateString("es-CO")}</span>
                </p>
                <p className="dato">
                  <span>Estado</span>
                  <span style={{ fontWeight: 600, color: "var(--naranja)" }}>{detalle.estado}</span>
                </p>
              </div>

              {detalle.mensaje && <p className="modal-mensaje">{detalle.mensaje}</p>}

              <div className="modal-acciones">
                {detalle.cv_path && (
                  <button className={btn} type="button" onClick={() => abrirCv(detalle.cv_path)}>
                    Ver CV
                  </button>
                )}
                {detalle.portafolio_url && (
                  <a
                    className={btnGhost}
                    href={detalle.portafolio_url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Ver portafolio
                  </a>
                )}
                <a className={btnGhost} href={`mailto:${detalle.email}`}>
                  Contactar
                </a>
                <button
                  className="panel-btn-danger"
                  type="button"
                  onClick={() => eliminarPostulacion(detalle.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
