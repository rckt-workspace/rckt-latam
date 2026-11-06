import { createServerOnlyFn } from "@tanstack/react-start";

/** External production configuration; never falls back to the managed database. */
export const getDbConfig = createServerOnlyFn(() => {
  const url = process.env["RCKT_SUPABASE_URL"];
  const publishableKey = process.env["RCKT_SUPABASE_PUBLISHABLE_KEY"];
  const serviceRoleKey = process.env["RCKT_SUPABASE_SERVICE_ROLE_KEY"];
  if (!url) throw new Error("Falta la variable del servidor RCKT_SUPABASE_URL");
  if (!publishableKey) throw new Error("Falta la variable del servidor RCKT_SUPABASE_PUBLISHABLE_KEY");
  if (!serviceRoleKey) throw new Error("Falta la variable del servidor RCKT_SUPABASE_SERVICE_ROLE_KEY");
  return { url, publishableKey, serviceRoleKey };
});

/** Opaque keys belong in apikey, not in a JWT Authorization header. */
export function dbFetch(key: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(init?.headers);
    if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  };
}