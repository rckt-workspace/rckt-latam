import { createFileRoute } from "@tanstack/react-router";
import logoDarkAsset from "@/assets/rckt-logo-dark.png.asset.json";
import { useServerFn } from "@tanstack/react-start";
import { registrarEquipo } from "@/lib/registro.functions";
import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/rckt-equipo")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Panel interno — RCKT" },
      { name: "description", content: "Acceso restringido al equipo de RCKT." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Panel interno — RCKT" },
      { property: "og:description", content: "Acceso restringido al equipo de RCKT." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PanelRH,
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
  cv_url: string | null;
  portafolio_url: string | null;
  mensaje: string | null;
  tipo: "candidato" | "servicio";
  fecha: string;
};

const input = "";
const btn = "panel-btn";
const btnGhost = "panel-btn-ghost";

function PanelRH() {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCargando(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (cargando) {
    return <Shell><p className="text-[var(--carbon-soft)]">Cargando…</p></Shell>;
  }

  if (!session) return <Shell><Login /></Shell>;

  return (
    <Shell>
      <Dashboard email={session.user.email ?? ""} />
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rckt-site rckt-panel">
      <div className="panel-wrap">{children}</div>
    </div>
  );
}

function Login() {
  const [modo, setModo] = useState<"login" | "registro">("login");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const registrar = useServerFn(registrarEquipo);

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const { error: err } = await supabase.auth.signInWithPassword({
      email: String(fd.get("email")),
      password: String(fd.get("password")),
    });
    if (err) setError("Credenciales incorrectas.");
    setEnviando(false);
  }

  async function onRegistro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const nombre = String(fd.get("nombre")).trim();
    const email = String(fd.get("email")).trim().toLowerCase();
    const password = String(fd.get("password"));
    const password2 = String(fd.get("password2"));

    if (!email.endsWith("@rckt.es")) {
      setError("El registro está restringido al equipo de RCKT.");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== password2) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setEnviando(true);
    try {
      const res = await registrar({ data: { nombre, email, password } });
      if (!res.ok) {
        setError(res.error);
        setEnviando(false);
        return;
      }
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) {
        setError("Cuenta creada. Inicia sesión con tus datos.");
        setModo("login");
      }
    } catch {
      setError("No pudimos crear la cuenta. Inténtalo de nuevo.");
    }
    setEnviando(false);
  }

  return (
    <div className="panel-card panel-login">
      <span className="logo"><img alt="RCKT" src={logoDarkAsset.url} /></span>
      <h1 className="text-[24px] font-bold">Panel interno RCKT</h1>
      <p className="mt-2 text-[14px] text-[var(--carbon-soft)]">Acceso solo para el equipo.</p>

      {modo === "login" ? (
        <form className="mt-6 grid gap-4" onSubmit={onLogin}>
          <input name="email" type="email" placeholder="Correo" required />
          <input name="password" type="password" placeholder="Contraseña" required />
          {error && <p className="text-[14px] text-[var(--naranja-deep)]">{error}</p>}
          <button className={btn} disabled={enviando} type="submit">
            {enviando ? "Entrando…" : "Entrar"}
          </button>
        </form>
      ) : (
        <form className="mt-6 grid gap-4" onSubmit={onRegistro}>
          <input name="nombre" type="text" placeholder="Nombre completo" required />
          <input name="email" type="email" placeholder="Correo @rckt.es" required />
          <input name="password" type="password" placeholder="Contraseña" required minLength={8} />
          <input name="password2" type="password" placeholder="Confirmar contraseña" required minLength={8} />
          {error && <p className="text-[14px] text-[var(--naranja-deep)]">{error}</p>}
          <button className={btn} disabled={enviando} type="submit">
            {enviando ? "Creando cuenta…" : "Crear cuenta"}
          </button>
        </form>
      )}

      <button
        type="button"
        className="mt-4 text-[13px] font-semibold text-[var(--naranja-deep)] underline"
        onClick={() => {
          setError(null);
          setModo(modo === "login" ? "registro" : "login");
        }}
      >
        {modo === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
    </div>
  );
}

const vacanteVacia = {
  titulo: "",
  area: "",
  modalidad: "",
  ubicacion: "",
  descripcion: "",
  requisitos: "",
};

function Dashboard({ email }: { email: string }) {
  const [tab, setTab] = useState<"vacantes" | "postulaciones">("vacantes");
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
  const [editando, setEditando] = useState<(typeof vacanteVacia & { id?: string }) | null>(null);
  const [filtroVacante, setFiltroVacante] = useState("todas");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [detalle, setDetalle] = useState<Postulacion | null>(null);

  const cargar = useCallback(async () => {
    const [v, p] = await Promise.all([
      supabase.from("vacantes").select("*").order("fecha_publicacion", { ascending: false }),
      supabase.from("postulaciones").select("*").order("fecha", { ascending: false }),
    ]);
    setVacantes((v.data as Vacante[]) ?? []);
    setPostulaciones((p.data as Postulacion[]) ?? []);
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
      modalidad: editando.modalidad || null,
      ubicacion: editando.ubicacion || null,
      descripcion: editando.descripcion || null,
      requisitos: editando.requisitos || null,
    };
    if (editando.id) await supabase.from("vacantes").update(payload).eq("id", editando.id);
    else await supabase.from("vacantes").insert(payload);
    setEditando(null);
    void cargar();
  }

  async function cambiarEstado(v: Vacante) {
    await supabase
      .from("vacantes")
      .update({ estado: v.estado === "activa" ? "cerrada" : "activa" })
      .eq("id", v.id);
    void cargar();
  }

  async function eliminar(id: string) {
    await supabase.from("vacantes").delete().eq("id", id);
    void cargar();
  }

  async function abrirCv(path: string) {
    const { data } = await supabase.storage.from("cvs").createSignedUrl(path, 300);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener");
  }

  const filtradas = postulaciones.filter(
    (p) =>
      (filtroVacante === "todas" || p.vacante_id === filtroVacante) &&
      (filtroTipo === "todos" || p.tipo === filtroTipo),
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold">Panel de RH</h1>
          <p className="text-[14px] text-[var(--carbon-soft)]">{email}</p>
        </div>
        <button className={btnGhost} onClick={() => supabase.auth.signOut()} type="button">
          Cerrar sesión
        </button>
      </div>

      <div className="mt-6 flex gap-2">
        {(["vacantes", "postulaciones"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={
              tab === t
                ? "panel-tab-active"
                : btnGhost
            }
          >
            {t === "vacantes" ? "Vacantes" : "Postulaciones"}
          </button>
        ))}
      </div>

      {tab === "vacantes" && (
        <section className="mt-7">
          <button className={btn} type="button" onClick={() => setEditando({ ...vacanteVacia })}>
            Nueva vacante
          </button>

          {editando && (
            <form className="mt-5 grid gap-3 panel-card" onSubmit={guardar}>
              <input placeholder="Título" required value={editando.titulo}
                onChange={(e) => setEditando({ ...editando, titulo: e.target.value })} />
              <div className="grid gap-3 sm:grid-cols-3">
                <input placeholder="Área" value={editando.area}
                  onChange={(e) => setEditando({ ...editando, area: e.target.value })} />
                <input placeholder="Modalidad" value={editando.modalidad}
                  onChange={(e) => setEditando({ ...editando, modalidad: e.target.value })} />
                <input placeholder="Ubicación" value={editando.ubicacion}
                  onChange={(e) => setEditando({ ...editando, ubicacion: e.target.value })} />
              </div>
              <textarea placeholder="Descripción" rows={3} value={editando.descripcion}
                onChange={(e) => setEditando({ ...editando, descripcion: e.target.value })} />
              <textarea placeholder="Requisitos" rows={3} value={editando.requisitos}
                onChange={(e) => setEditando({ ...editando, requisitos: e.target.value })} />
              <div className="flex gap-2">
                <button className={btn} type="submit">Guardar</button>
                <button className={btnGhost} type="button" onClick={() => setEditando(null)}>Cancelar</button>
              </div>
            </form>
          )}

          <div className="mt-6 grid gap-3">
            {vacantes.length === 0 && <p className="text-[var(--carbon-soft)]">Aún no hay vacantes creadas.</p>}
            {vacantes.map((v) => (
              <div key={v.id} className="panel-card hoverable flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[17px] font-bold">{v.titulo}</p>
                  <p className="text-[13px] text-[var(--carbon-soft)]">
                    {[v.area, v.modalidad, v.ubicacion].filter(Boolean).join(" · ")} — {v.estado}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className={btnGhost} type="button"
                    onClick={() => setEditando({
                      id: v.id,
                      titulo: v.titulo,
                      area: v.area ?? "",
                      modalidad: v.modalidad ?? "",
                      ubicacion: v.ubicacion ?? "",
                      descripcion: v.descripcion ?? "",
                      requisitos: v.requisitos ?? "",
                    })}>
                    Editar
                  </button>
                  <button className={btnGhost} type="button" onClick={() => cambiarEstado(v)}>
                    {v.estado === "activa" ? "Cerrar" : "Reabrir"}
                  </button>
                  <button className={btnGhost} type="button" onClick={() => eliminar(v.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "postulaciones" && (
        <section className="mt-7">
          <div className="flex flex-wrap gap-3">
            <select className="max-w-[260px]" value={filtroVacante} onChange={(e) => setFiltroVacante(e.target.value)}>
              <option value="todas">Todas las vacantes</option>
              {vacantes.map((v) => (
                <option key={v.id} value={v.id}>{v.titulo}</option>
              ))}
            </select>
            <select className="max-w-[200px]" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
              <option value="todos">Todos los tipos</option>
              <option value="candidato">Candidatos</option>
              <option value="servicio">Servicios</option>
            </select>
          </div>

          <div className="mt-5 grid gap-3">
            {filtradas.length === 0 && <p className="text-[var(--carbon-soft)]">No hay postulaciones con estos filtros.</p>}
            {filtradas.map((p) => (
              <div key={p.id} className="panel-card hoverable flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[16px] font-bold">{p.nombre} <span className="text-[12px] font-medium text-[var(--naranja)]">{p.tipo}</span></p>
                  <p className="text-[13px] text-[var(--carbon-soft)]">
                    {p.email}{p.telefono ? ` · ${p.telefono}` : ""} · {new Date(p.fecha).toLocaleDateString("es-CO")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.cv_url && (
                    <button className={btnGhost} type="button" onClick={() => abrirCv(p.cv_url!)}>Ver CV</button>
                  )}
                  {p.portafolio_url && (
                    <a className={btnGhost} href={p.portafolio_url} rel="noopener noreferrer" target="_blank">Portafolio</a>
                  )}
                  <button className={btnGhost} type="button" onClick={() => setDetalle(p)}>Detalle</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {detalle && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-10" onClick={() => setDetalle(null)}>
          <div className="panel-card w-full max-w-[560px] p-7" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[20px] font-bold">{detalle.nombre}</h3>
            <p className="mt-2 text-[14px] text-[var(--carbon-soft)]">{detalle.email}</p>
            {detalle.telefono && <p className="text-[14px] text-[var(--carbon-soft)]">{detalle.telefono}</p>}
            <p className="mt-2 text-[13px] text-[var(--carbon-soft)]">
              Vacante: {vacantes.find((v) => v.id === detalle.vacante_id)?.titulo ?? "—"} · Tipo: {detalle.tipo}
            </p>
            {detalle.mensaje && <p className="mt-4 whitespace-pre-line text-[15px] leading-[1.6]">{detalle.mensaje}</p>}
            <div className="mt-6 flex gap-2">
              {detalle.cv_url && (
                <button className={btnGhost} type="button" onClick={() => abrirCv(detalle.cv_url!)}>Ver CV</button>
              )}
              <button className={btnGhost} type="button" onClick={() => setDetalle(null)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
