import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { getPublicSupabaseConfig } from "@/lib/vacantes.functions";

/**
 * Browser Supabase client that keeps working when the production bundle was
 * built without VITE_SUPABASE_* variables: in that case the publishable
 * configuration is fetched from the server at runtime.
 */
let cached: Promise<SupabaseClient<Database>> | null = null;
let cachedAuth: Promise<SupabaseClient<Database>> | null = null;

async function resolveConfig(): Promise<{ url: string; key: string }> {
  let url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  let key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

  if (!url || !key) {
    const config = await getPublicSupabaseConfig();
    url = config.url;
    key = config.publishableKey;
  }

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
      auth: { persistSession: true, autoRefreshToken: true },
    });
  })();

  cachedAuth.catch(() => {
    cachedAuth = null;
  });

  return cachedAuth;
}
