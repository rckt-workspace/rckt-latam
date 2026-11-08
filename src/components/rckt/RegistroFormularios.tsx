import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "@tanstack/react-router";

type Lead = {
  id: string;
  created_at: string;
  empresa: string | null;
  nombre: string | null;
  email: string | null;
  telefono: string | null;
  ciudad: string | null;
  pais: string | null;
  sector: string | null;
  numero_sedes: string | null;
  tratamientos_principales: string | null;
  problema_principal: string | null;
  sitio_web: string | null;
  cargo: string | null;
  empleados: string | null;
  inversion_pauta: string | null;
  volumen_leads: string | null;
  crm_actual: string | null;
  whatsapp_ventas: string | null;
  fecha_inicio: string | null;
  source: string | null;
  landing_path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  lead_score: number | null;
  lead_level: string | null;
  status: string | null;
  consent_at: string | null;
  consent_version: string | null;
};

type LandingConfig = {
  nombre: string;
  etiquetas?: Partial<Record<string, string>>;
};

const LANDINGS_FORMULARIOS: Record<string, LandingConfig> = {
  "/lp/clinicas-esteticas-ia": {
    nombre: "Clínicas · Versión A (lavanda)",
    etiquetas: { empresa: "Clínica", sector: "Servicio principal" },
  },
  "/lp/chatgpt-ads-clinicas-esteticas": {
    nombre: "Clínicas · Versión B (oscura)",
    etiquetas: {
      empresa: "Clínica",
      sector: "Tipo de procedimientos",
      numero_sedes: "Número de sedes",
    },
  },
  "/lp/chatgpt-ads-academias": {
    nombre: "Academias · ChatGPT Ads",
    etiquetas: {
      empresa: "Academia",
      sector: "Tipo de formación",
      tratamientos_principales: "Cursos que quiere llenar",
      problema_principal: "Registro de programas",
    },
  },
  "/lp/sales-flow": { nombre: "Sales Flow" },
  "/lp/sales-flow-clinicas-bogota": { nombre: "Clínicas Bogotá" },
  "/lp/sales-flow-clinicas-bogota-b": { nombre: "Clínicas Bogotá B" },
  "/contacto": { nombre: "Contacto del sitio" },
};

const ETIQUETAS_DEFECTO: Record<string, string> = {
  nombre: "Nombre",
  empresa: "Empresa",
  email: "Correo",
  telefono: "WhatsApp",
  ciudad: "Ciudad",
  pais: "País",
  sector: "Sector",
  numero_sedes: "Número de sedes",
  tratamientos_principales: "Tratamientos / cursos",
  problema_principal: "Problema principal",
  sitio_web: "Sitio web",
  cargo: "Cargo",
  empleados: "Empleados",
  inversion_pauta: "Inversión en pauta",
  volumen_leads: "Volumen de leads",
  crm_actual: "CRM actual",
  whatsapp_ventas: "WhatsApp de ventas",
  fecha_inicio: "Fecha de inicio",
  lead_level: "Nivel",
  utm_source: "UTM source",
  utm_campaign: "UTM campaign",
};

const ORDEN_COLUMNAS = [
  "nombre",
  "empresa",
  "email",
  "telefono",
  "ciudad",
  "pais",
  "sector",
  "numero_sedes",
  "tratamientos_principales",
  "problema_principal",
  "sitio_web",
  "cargo",
  "empleados",
  "inversion_pauta",
  "volumen_leads",
  "crm_actual",
  "whatsapp_ventas",
  "fecha_inicio",
  "lead_level",
  "utm_source",
  "utm_campaign",
] as const;

const CAMPOS_MODAL_EXTRA = [
  "source",
  "landing_path",
  "referrer",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "lead_score",
  "status",
  "consent_at",
  "consent_version",
] as const;

const ETIQUETAS_MODAL_EXTRA: Record<string, string> = {
  source: "Source",
  landing_path: "Landing",
  referrer: "Referrer",
  utm_source: "UTM source",
  utm_medium: "UTM medium",
  utm_campaign: "UTM campaign",
  utm_content: "UTM content",
  utm_term: "UTM term",
  lead_score: "Lead score",
  status: "Estado",
  consent_at: "Consentimiento",
  consent_version: "Versión consentimiento",
};

const btn = "panel-btn";
const btnGhost = "panel-btn-ghost";

function normalizarLandingPath(path: string | null): string | null {
  if (!path) return null;
  const sinParams = path.split("?")[0].split("#")[0];
  const sinBarra = sinParams.length > 1 ? sinParams.replace(/\/+$/, "") : sinParams;
  return sinBarra || null;
}

function claveGrupo(lead: Lead): string {
  const path = normalizarLandingPath(lead.landing_path);
  if (path) return path;
  if (lead.source) return lead.source;
  return "Otros";
}

function nombreGrupo(clave: string): string {
  return LANDINGS_FORMULARIOS[clave]?.nombre ?? clave;
}

function etiqueta(campo: string, claveLanding: string): string {
  return (
    LANDINGS_FORMULARIOS[claveLanding]?.etiquetas?.[campo] ??
    ETIQUETAS_DEFECTO[campo] ??
    campo
  );
}

function tieneValor(v: unknown): boolean {
  return v !== null && v !== undefined && String(v).trim() !== "";
}

function formatoFecha(iso: string): string {
  return new Date(iso).toLocaleString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatoFechaCorta(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CO");
}

export function RegistroFormularios() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [landingActiva, setLandingActiva] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [detalle, setDetalle] = useState<Lead | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/people/formularios");
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Error cargando registros");
      }
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error cargando registros de formularios:", e);
      setError(e instanceof Error ? e.message : "Error al cargar los registros.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const rutasLandings = useMemo(() => {
    const rutas = new Set<string>();
    for (const path of Object.keys(router.routesByPath)) {
      if (!path.startsWith("/lp/") || path.endsWith("/gracias")) continue;
      const normalizada = normalizarLandingPath(path);
      if (normalizada) rutas.add(normalizada);
    }
    rutas.add("/contacto");
    return rutas;
  }, [router]);

  const grupos = useMemo(() => {
    const mapa = new Map<string, Lead[]>();
    for (const lead of leads) {
      const clave = claveGrupo(lead);
      const lista = mapa.get(clave) ?? [];
      lista.push(lead);
      mapa.set(clave, lista);
    }
    const claves = new Set<string>([...rutasLandings, ...mapa.keys()]);
    return Array.from(claves)
      .map((clave) => {
        const registros = mapa.get(clave) ?? [];
        return {
          clave,
          registros,
          total: registros.length,
          ultimo: registros.length
            ? registros.reduce(
                (max, r) => (r.created_at > max ? r.created_at : max),
                registros[0]?.created_at ?? "",
              )
            : null,
        };
      })
      .sort((a, b) => {
        if (a.total > 0 && b.total > 0) return (a.ultimo ?? "") < (b.ultimo ?? "") ? 1 : -1;
        if (a.total > 0) return -1;
        if (b.total > 0) return 1;
        return nombreGrupo(a.clave).localeCompare(nombreGrupo(b.clave), "es");
      });
  }, [leads, rutasLandings]);

  const registrosLanding = useMemo(() => {
    if (!landingActiva) return [];
    return grupos.find((g) => g.clave === landingActiva)?.registros ?? [];
  }, [grupos, landingActiva]);

  const columnasVisibles = useMemo(() => {
    if (!landingActiva) return [];
    return ORDEN_COLUMNAS.filter((campo) =>
      registrosLanding.some((r) => tieneValor(r[campo as keyof Lead])),
    );
  }, [registrosLanding, landingActiva]);

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return registrosLanding.filter((r) => {
      if (q) {
        const texto = [r.nombre, r.empresa, r.email, r.telefono]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!texto.includes(q)) return false;
      }
      if (desde && r.created_at < new Date(`${desde}T00:00:00`).toISOString()) return false;
      if (hasta && r.created_at > new Date(`${hasta}T23:59:59.999`).toISOString()) return false;
      return true;
    });
  }, [registrosLanding, busqueda, desde, hasta]);

  function descargarCsv() {
    if (!landingActiva) return;
    const encabezados = ["Fecha", ...columnasVisibles.map((c) => etiqueta(c, landingActiva))];
    const escapar = (v: unknown) => {
      const s = v === null || v === undefined ? "" : String(v);
      return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const filas = filtrados.map((r) =>
      [
        formatoFecha(r.created_at),
        ...columnasVisibles.map((c) => escapar(r[c as keyof Lead])),
      ].join(","),
    );
    const csv = "\uFEFF" + [encabezados.map(escapar).join(","), ...filas].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registros-${landingActiva.replace(/[^\w-]+/g, "_")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (cargando) {
    return <p style={{ color: "var(--carbon-soft)" }}>Cargando registros…</p>;
  }

  if (error) {
    return (
      <div className="panel-card" role="alert">
        <p style={{ fontSize: "14px", color: "var(--carbon)", margin: "0 0 12px 0" }}>
          No se pudieron cargar los registros: {error}
        </p>
        <button className={btn} type="button" onClick={() => void cargar()}>
          Intentar de nuevo
        </button>
      </div>
    );
  }

  // Vista 2 · Registros de una landing
  if (landingActiva) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "20px" }}>
          <button className={btnGhost} type="button" onClick={() => setLandingActiva(null)}>
            ← Volver a landings
          </button>
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--carbon)", margin: 0 }}>
              {nombreGrupo(landingActiva)}
            </h3>
            <p style={{ fontSize: "13px", color: "var(--carbon-soft)", margin: "2px 0 0 0" }}>
              {landingActiva}
            </p>
          </div>
        </div>

        {registrosLanding.length === 0 ? (
          <p style={{ color: "var(--carbon-soft)" }}>Aún no hay registros en esta landing.</p>
        ) : (
          <>
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="search"
            placeholder="Buscar por nombre, empresa, correo o teléfono"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ maxWidth: "320px", flex: "1 1 220px" }}
          />
          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--carbon-soft)" }}>
            Desde
            <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--carbon-soft)" }}>
            Hasta
            <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
          </label>
          <button className={btn} type="button" onClick={descargarCsv}>
            Descargar CSV
          </button>
        </div>

        {filtrados.length === 0 ? (
          <p style={{ color: "var(--carbon-soft)" }}>No hay registros con estos filtros.</p>
        ) : (
          <div className="panel-card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", minWidth: "640px" }}>
                <thead>
                  <tr>
                    {["Fecha", ...columnasVisibles.map((c) => etiqueta(c, landingActiva))].map(
                      (titulo) => (
                        <th
                          key={titulo}
                          style={{
                            textAlign: "left",
                            padding: "12px 14px",
                            borderBottom: "1px solid var(--line-strong)",
                            color: "var(--carbon-soft)",
                            fontSize: "11px",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {titulo}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filtrados.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => setDetalle(r)}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(33, 33, 33, 0.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)", whiteSpace: "nowrap", color: "var(--carbon-soft)" }}>
                        {formatoFecha(r.created_at)}
                      </td>
                      {columnasVisibles.map((c) => (
                        <td
                          key={c}
                          style={{
                            padding: "10px 14px",
                            borderBottom: "1px solid var(--line)",
                            color: "var(--carbon)",
                            maxWidth: "260px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {tieneValor(r[c as keyof Lead]) ? String(r[c as keyof Lead]) : "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
          </>
        )}

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

              <h3 style={{ fontSize: "22px", fontWeight: 800, margin: "0 0 20px 0" }}>
                {detalle.nombre ?? detalle.empresa ?? "Registro"}
              </h3>

              <div className="dato-grid">
                <p className="dato">
                  <span>Fecha</span>
                  <span>{formatoFecha(detalle.created_at)}</span>
                </p>
                {ORDEN_COLUMNAS.map((campo) => {
                  const valor = detalle[campo as keyof Lead];
                  if (!tieneValor(valor)) return null;
                  return (
                    <p className="dato" key={campo}>
                      <span>{etiqueta(campo, landingActiva)}</span>
                      <span>{String(valor)}</span>
                    </p>
                  );
                })}
                {CAMPOS_MODAL_EXTRA.map((campo) => {
                  const valor = detalle[campo as keyof Lead];
                  if (!tieneValor(valor)) return null;
                  const mostrar =
                    campo === "consent_at" ? formatoFecha(String(valor)) : String(valor);
                  return (
                    <p className="dato" key={campo}>
                      <span>{ETIQUETAS_MODAL_EXTRA[campo] ?? campo}</span>
                      <span>{mostrar}</span>
                    </p>
                  );
                })}
              </div>

              <div className="modal-acciones">
                {tieneValor(detalle.telefono) && (
                  <a
                    className={btn}
                    href={`https://wa.me/${String(detalle.telefono).replace(/\D/g, "")}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Escribir por WhatsApp
                  </a>
                )}
                {tieneValor(detalle.email) && (
                  <a className={btnGhost} href={`mailto:${detalle.email}`}>
                    Enviar correo
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Vista 1 · Lista de landings
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {grupos.map((g) => (
        <div key={g.clave} className="panel-card" style={{ borderRadius: "14px", padding: "18px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "220px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--carbon)", margin: 0 }}>
                {nombreGrupo(g.clave)}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--carbon-soft)", margin: "6px 0 0 0" }}>
                {g.clave}
              </p>
              <p style={{ fontSize: "13px", color: "var(--carbon-soft)", margin: "8px 0 0 0" }}>
                {g.total} {g.total === 1 ? "registro" : "registros"} ·{" "}
                {g.ultimo ? `Último: ${formatoFechaCorta(g.ultimo)}` : "Sin registros aún"}
              </p>
            </div>
            <button className={btnGhost} type="button" onClick={() => setLandingActiva(g.clave)}>
              Ver registros
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
