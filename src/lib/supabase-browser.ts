import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { getPublicSupabaseConfig } from "@/lib/vacantes.functions";

/** Browser clients always receive external public configuration from the server. */
let cached: Promise<SupabaseClient<Database>> | null = null;
let cachedAuth: Promise<SupabaseClient<Database>> | null = null;

async function resolveConfig(): Promise<{ url: string; key: string }> {
  const { url, publishableKey: key } = await getPublicSupabaseConfig();

  if (!url || !key) {
    throw new Error("No pudimos conectar con la base de datos.");
  }

  return { url, key };
}

export function getBrowserSupabase(): Promise<SupabaseClient<Database>> {
  if (cached) return cached;

  cached = (async () => {
    const { url, key } = await resolveConfig();
    return createClient<Database>(url, key, {
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
  })();

  cached.catch(() => {
    cached = null;
  });

  return cached;
}

/** Same client, but with a persisted session — used by the internal panel. */
export function getBrowserSupabaseAuth(): Promise<SupabaseClient<Database>> {
  if (cachedAuth) return cachedAuth;

  cachedAuth = (async () => {
    const { url, key } = await resolveConfig();
    return createClient<Database>(url, key, {
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      } },
      auth: { persistSession: true, autoRefreshToken: true },
    });
  })();

  cachedAuth.catch(() => {
    cachedAuth = null;
  });

  return cachedAuth;
}
