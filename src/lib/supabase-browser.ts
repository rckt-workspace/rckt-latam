import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { getPublicSupabaseConfig } from "@/lib/vacantes.functions";

/**
 * Browser Supabase client that keeps working when the production bundle was
 * built without VITE_SUPABASE_* variables: in that case the publishable
 * configuration is fetched from the server at runtime.
 */
let cached: Promise<SupabaseClient<Database>> | null = null;

export function getBrowserSupabase(): Promise<SupabaseClient<Database>> {
  if (cached) return cached;

  cached = (async () => {
    let url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    let key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

    if (!url || !key) {
      const config = await getPublicSupabaseConfig();
      url = config.url;
      key = config.publishableKey;
    }

    return createClient<Database>(url!, key!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  })();

  cached.catch(() => {
    cached = null;
  });

  return cached;
}
