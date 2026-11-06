import { createMiddleware } from "@tanstack/react-start";

// Preserve public calls without a session; skip config bootstrap to avoid recursion.
export const attachSupabaseAuthSafe = createMiddleware({ type: "function" }).client(
  async ({ next, serverFnMeta }) => {
    let token: string | undefined;
    if (typeof window === "undefined") return next({ headers: {} });
    const { getPublicSupabaseConfig } = await import("@/lib/vacantes.functions");
    const publicConfigMeta = (getPublicSupabaseConfig as unknown as {
      serverFnMeta?: { id: string };
    }).serverFnMeta;
    if (serverFnMeta.id === publicConfigMeta?.id) return next({ headers: {} });

    try {
      const { getBrowserSupabaseAuth } = await import("@/lib/supabase-browser");
      const supabase = await getBrowserSupabaseAuth();
      const { data } = await supabase.auth.getSession();
      token = data.session?.access_token;
    } catch {
      token = undefined;
    }

    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
);
