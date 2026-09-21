import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type VacantePublica = {
  id: string;
  titulo: string;
  area: string | null;
  modalidad: string | null;
  ubicacion: string | null;
  descripcion: string | null;
  requisitos: string | null;
};

function nullableText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function serverSupabaseConfig() {
  const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
  const publishableKey =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ||
    process.env["SUPABASE_ANON_KEY"] ||
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
  return { url, publishableKey };
}

/**
 * Publishable (public) configuration so the browser can talk to the Data API
 * even when the production bundle was built without the VITE_ variables.
 */
export const getPublicSupabaseConfig = createServerFn({ method: "GET" }).handler(async () => {
  const { url, publishableKey } = serverSupabaseConfig();
  if (!url || !publishableKey) {
    throw new Error("La configuración pública no está disponible.");
  }
  return { url, publishableKey };
});

export const getVacancyById = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => {
    if (!data || typeof data.id !== "string" || !data.id.trim()) {
      throw new Error("Identificador de vacante inválido.");
    }
    return { id: data.id };
  })
  .handler(async ({ data }) => {
    const { url, publishableKey } = serverSupabaseConfig();
    if (!url || !publishableKey) {
      throw new Error("La configuración de vacantes no está disponible.");
    }

    const client = createClient<Database>(url, publishableKey, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });

    const { data: row, error } = await client
      .from("vacantes")
      .select("id,titulo,area,modalidad,ubicacion,descripcion,requisitos")
      .eq("id", data.id)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw new Error("No pudimos consultar la vacante.");
    }
    if (!row || typeof row.id !== "string" || typeof row.titulo !== "string") return null;

    return {
      id: row.id,
      titulo: row.titulo,
      area: nullableText(row.area),
      modalidad: nullableText(row.modalidad),
      ubicacion: nullableText(row.ubicacion),
      descripcion: nullableText(row.descripcion),
      requisitos: nullableText(row.requisitos),
    } satisfies VacantePublica;
  });

export const getActiveVacancies = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
  const publishableKey =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ||
    process.env["SUPABASE_ANON_KEY"] ||
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

  if (!url || !publishableKey) {
    throw new Error("La configuración de vacantes no está disponible.");
  }

  const client = createClient<Database>(url, publishableKey, {
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data, error } = await client
    .from("vacantes")
    .select("id,titulo,area,modalidad,ubicacion,descripcion,requisitos")
    .eq("estado", "activa")
    .order("fecha_publicacion", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("No pudimos consultar las vacantes.");
  }

  return (data ?? []).flatMap((row): VacantePublica[] => {
    if (typeof row.id !== "string" || typeof row.titulo !== "string" || !row.titulo.trim())
      return [];
    return [
      {
        id: row.id,
        titulo: row.titulo,
        area: nullableText(row.area),
        modalidad: nullableText(row.modalidad),
        ubicacion: nullableText(row.ubicacion),
        descripcion: nullableText(row.descripcion),
        requisitos: nullableText(row.requisitos),
      },
    ];
  });
});
