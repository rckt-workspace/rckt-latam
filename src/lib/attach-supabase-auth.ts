import { createMiddleware } from "@tanstack/react-start";

// Project-specific replacement for the generated `attachSupabaseAuth`.
// Identical behaviour, but it never breaks server-function calls when the
// browser bundle has no Supabase configuration (e.g. a production build where
// the VITE_SUPABASE_* variables were not injected). Public server functions
// must keep working without a session.
export const attachSupabaseAuthSafe = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    let token: string | undefined;
    const hasBrowserConfig =
      Boolean(import.meta.env.VITE_SUPABASE_URL) &&
      Boolean(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

    if (!hasBrowserConfig) return next({ headers: {} });

    try {
      const { supabase } = await import("@/integrations/supabase/client");
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
