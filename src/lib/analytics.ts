import { canTrack } from "./consent";
import { getConsent, loadMetaPixel, trackMeta } from "./meta-pixel";

export const GA_MEASUREMENT_ID = "G-ZF9KW6JB38";
export const CLARITY_PROJECT_ID = "zd55ckg8fk";

let gaConfigured = false;
let clarityConfigured = false;
let initialization: Promise<boolean> | null = null;
const sentPageViews = new Set<string>();
const pendingPageViews = new Set<string>();

export function isInternalRoute(pathname: string): boolean {
  return pathname === "/rckt-equipo" || pathname.startsWith("/ops");
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = (...gtagArgs: unknown[]) => {
      window.dataLayer?.push(gtagArgs);
    };
  }
  window.gtag(...args);
}

function appendScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

async function hasConsent(): Promise<boolean> {
  if (getConsent() !== "granted" || isInternalRoute(window.location.pathname)) return false;
  const [analyticsAllowed, advertisingAllowed] = await Promise.all([
    canTrack("analytics"),
    canTrack("advertising"),
  ]);
  return analyticsAllowed && advertisingAllowed && getConsent() === "granted";
}

export function initializeAnalytics(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (initialization) return initialization;

  initialization = (async () => {
    if (!(await hasConsent())) return false;

    gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });

    if (!gaConfigured) {
      appendScript(
        "rckt-ga4",
        `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
      );
      gtag("js", new Date());
      gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
      gaConfigured = true;
    }

    if (!clarityConfigured) {
      if (!window.clarity) {
        const clarity = ((...args: unknown[]) => {
          clarity.q = clarity.q || [];
          clarity.q.push(args);
        }) as NonNullable<Window["clarity"]>;
        window.clarity = clarity;
      }
      appendScript("rckt-clarity", `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`);
      window.clarity("consent");
      clarityConfigured = true;
    }

    await loadMetaPixel();
    return getConsent() === "granted";
  })().finally(() => {
    initialization = null;
  });

  return initialization;
}

export function disableAnalytics(): void {
  if (typeof window === "undefined") return;
  gtag("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.fbq?.("consent", "revoke");
  window.clarity?.("consent", false);
}

export async function trackGaEvent(
  eventName: string,
  parameters: Record<string, unknown> = {},
): Promise<boolean> {
  if (typeof window === "undefined" || isInternalRoute(window.location.pathname)) return false;
  if (!(await initializeAnalytics())) return false;
  const articleSlug = String(parameters.article_slug ?? window.location.pathname);
  gtag("event", eventName, { ...parameters, article_slug: articleSlug });
  return true;
}

export function trackPageView(pathname: string): void {
  if (isInternalRoute(pathname) || sentPageViews.has(pathname) || pendingPageViews.has(pathname)) {
    return;
  }
  pendingPageViews.add(pathname);
  void trackGaEvent("page_view", {
    article_slug: pathname,
    page_path: pathname,
    page_location: `${window.location.origin}${pathname}`,
    page_title: document.title,
  }).then((sent) => {
    if (sent) sentPageViews.add(pathname);
  }).finally(() => {
    pendingPageViews.delete(pathname);
  });
}

/** Se llama únicamente después de que el servidor confirma un formulario exitoso. */
export function trackSuccessfulLead(): void {
  if (typeof window === "undefined" || isInternalRoute(window.location.pathname)) return;
  const articleSlug = window.location.pathname;
  void trackGaEvent("generate_lead", { article_slug: articleSlug });
  trackMeta("Lead");
}
