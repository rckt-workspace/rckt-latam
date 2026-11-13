import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { onConsentChange } from "@/lib/consent";
import {
  COOKIE_PREFERENCES_EVENT,
  getConsent,
  setConsent,
} from "@/lib/meta-pixel";
import {
  disableAnalytics,
  initializeAnalytics,
  isInternalRoute,
  trackGaEvent,
  trackPageView,
} from "@/lib/analytics";
import type { Choice } from "@/lib/consent";

export function CookieConsentBanner() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncWithChoice = () => setOpen(getConsent() === null);
    const openPreferences = () => setOpen(true);
    syncWithChoice();
    const unsubscribe = onConsentChange(syncWithChoice);
    window.addEventListener(COOKIE_PREFERENCES_EVENT, openPreferences);
    return () => {
      unsubscribe();
      window.removeEventListener(COOKIE_PREFERENCES_EVENT, openPreferences);
    };
  }, []);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const choose = (choice: Choice) => {
    setConsent(choice);
    if (choice === "granted") void initializeAnalytics();
    else disableAnalytics();
    setOpen(false);
  };

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="region"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-3xl rounded-2xl border border-border bg-background p-4 text-foreground outline-none md:p-5"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <p className="text-sm leading-relaxed">
        Contamos visitas sin cookies. Si aceptas, usamos Google Analytics, Microsoft Clarity y Meta para medir visitas y clics y conocer la eficacia de nuestra publicidad. Consulta nuestra{" "}
        <a href="/cookies.pdf" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">
          política de cookies
        </a>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="min-h-10 rounded-full border border-border bg-background px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="min-h-10 rounded-full border border-primary bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Aceptar cookies
        </button>
      </div>
    </div>
  );
}

export function SiteAnalytics() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const syncWithConsent = () => {
      if (getConsent() === "granted") void initializeAnalytics();
      else disableAnalytics();
    };
    syncWithConsent();
    return onConsentChange(syncWithConsent);
  }, []);

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    if (isInternalRoute(pathname)) return;
    const fired = new Set<number>();
    const startedAt = Date.now();
    let maxPercentage = 0;
    let articleReadSent = false;

    const checkScroll = () => {
      const root = document.documentElement;
      const scrollable = root.scrollHeight - window.innerHeight;
      const percentage = scrollable <= 0
        ? 100
        : Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100));
      maxPercentage = Math.max(maxPercentage, percentage);

      for (const threshold of [25, 50, 75, 90] as const) {
        if (maxPercentage < threshold || fired.has(threshold)) continue;
        fired.add(threshold);
        void trackGaEvent(`scroll_${threshold}`, { article_slug: pathname });
      }

      if (maxPercentage >= 75 && !articleReadSent && Date.now() - startedAt >= 30_000) {
        articleReadSent = true;
        void trackGaEvent("article_read", { article_slug: pathname });
      }
    };

    const timer = window.setTimeout(checkScroll, 30_000);
    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    checkScroll();
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const pathname = pathnameRef.current;
      if (isInternalRoute(pathname) || !(event.target instanceof Element)) return;
      const anchor = event.target.closest("a");
      const button = event.target.closest("button");
      const element = anchor ?? button;
      if (!element) return;
      const href = anchor?.getAttribute("href") ?? "";
      let isCta = element.classList.contains("btn-orange");
      if (/^(tel:|mailto:)/i.test(href) || /(^|\.)wa\.me\//i.test(href) || href.includes("wa.me/")) {
        isCta = true;
      }
      try {
        if (href && new URL(href, window.location.href).hash === "#formulario") isCta = true;
      } catch {
        // Un enlace mal formado no debe interrumpir la navegación.
      }
      if (!isCta) return;
      const ctaId = (element.textContent || element.getAttribute("aria-label") || "")
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 150);
      void trackGaEvent("cta_click", { article_slug: pathname, cta_id: ctaId });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
