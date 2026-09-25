import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface SearchParams {
  next?: string;
}

export const Route = createFileRoute("/ops/login")({
  staticData: { sitemap: false },
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    next: typeof search.next === "string" ? search.next : undefined,
  }),
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Acceso del equipo — RCKT LATAM" },
      {
        name: "robots",
        content: "noindex, nofollow",
      },
      {
        name: "description",
        content: "RCKT AI Control Center - Acceso administrativo",
      },
      { property: "og:title", content: "Acceso del equipo — RCKT LATAM" },
      { property: "og:description", content: "Acceso restringido al equipo de RCKT LATAM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

const ALLOWED_REDIRECTS = ["/ops/ai-control", "/rckt-equipo"];

function isAllowedRedirect(path: string): boolean {
  return ALLOWED_REDIRECTS.some((allowed) => path === allowed || path.startsWith(allowed + "/"));
}

function LoginPage() {
  const { next } = useSearch({ from: "/ops/login" });
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const theme = localStorage.getItem("rckt-theme");
      if (theme === "light" || theme === "dark")
        document.documentElement.setAttribute("data-theme", theme);
    } catch {
      // Keep the rendered theme when browser storage is unavailable.
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
        credentials: "include",
      });

      if (response.ok) {
        const redirectTo = next && isAllowedRedirect(next) ? next : "/ops/ai-control";
        window.location.href = redirectTo;
        return;
      }

      if (response.status === 429) {
        setError("Demasiados intentos. Intenta en 15 minutos.");
      } else if (response.status === 401) {
        setError("Contraseña incorrecta.");
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Acceso denegado");
      }
    } catch (e) {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rckt-site rckt-panel panel-login-page min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="panel-login-kicker text-sm uppercase font-semibold mb-2">RCKT</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">AI CONTROL CENTER</h1>
          <p className="text-sm text-muted-foreground">Acceso administrativo</p>
        </div>

        {/* Login Card */}
        <div className="panel-card panel-login p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="panel-form-label text-xs uppercase text-muted-foreground font-semibold"
              >
                Contraseña administrativa
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoFocus
                className="w-full px-4 py-3 text-foreground placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                placeholder="Ingresa la clave de acceso"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-sm text-destructive font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="panel-btn w-full py-3 px-4 font-semibold text-sm uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Autenticando..." : "Entrar"}
            </button>

            {/* Footer Info */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                Área restringida · Solo personal autorizado
              </p>
            </div>
          </form>
        </div>

        {/* Branding */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground tracking-wide">
            RCKT LATAM — Growth Operating System
          </p>
        </div>
      </div>

      {/* Global Advisor - Still Available */}
      <div className="fixed bottom-0 right-0 pointer-events-none" />
    </div>
  );
}
