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
    if (typeof row.id !== "string" || typeof row.titulo !== "string" || !row.titulo.trim()) return [];
    return [{
      id: row.id,
      titulo: row.titulo,
      area: nullableText(row.area),
      modalidad: nullableText(row.modalidad),
      ubicacion: nullableText(row.ubicacion),
      descripcion: nullableText(row.descripcion),
      requisitos: nullableText(row.requisitos),
    }];
  });
});