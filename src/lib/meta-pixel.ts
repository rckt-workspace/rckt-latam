import { canTrack, readChoice, saveChoices, type Choice } from "./consent";

export const META_PIXEL_ID = "1568790304997222";
export const CONSENT_STORAGE_KEY = "rckt-cookie-consent";
export const COOKIE_PREFERENCES_EVENT = "rckt-open-cookie-preferences";

type MetaPixel = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
  push?: MetaPixel;
};

type Clarity = {
  (...args: unknown[]): void;
  q?: unknown[][];
};

declare global {
  interface Window {
    fbq?: MetaPixel;
    _fbq?: MetaPixel;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: Clarity;
  }
}

let pixelInitialized = false;
let pixelPageViewSent = false;
let pixelLoadPromise: Promise<void> | null = null;

export function getConsent(): Choice | null {
  if (typeof window === "undefined") return null;
  const analytics = readChoice("analytics");
  const advertising = readChoice("advertising");
  if (analytics === "denied" || advertising === "denied") return "denied";
  if (analytics === "granted" && advertising === "granted") return "granted";
  try {
    const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
    return saved === "granted" || saved === "denied" ? saved : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: Exclude<Choice, null>) {
  if (typeof window === "undefined") return;
  saveChoices({ analytics: choice, advertising: choice });
  const effectiveChoice = getConsent() ?? choice;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, effectiveChoice);
  } catch {
    // La elección por finalidad conserva la preferencia aunque esta clave no pueda escribirse.
  }
  if (effectiveChoice === "denied") {
    window.fbq?.("consent", "revoke");
    window.clarity?.("consent", false);
  } else {
    window.fbq?.("consent", "grant");
  }
}

function createEventID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `rckt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function ensurePixelQueue(): MetaPixel {
  if (window.fbq) return window.fbq;
  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue?.push(args);
  }) as MetaPixel;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;
  return fbq;
}

async function permitMeta(): Promise<boolean> {
  if (getConsent() !== "granted") return false;
  const [analyticsAllowed, advertisingAllowed] = await Promise.all([
    canTrack("analytics"),
    canTrack("advertising"),
  ]);
  return analyticsAllowed && advertisingAllowed && getConsent() === "granted";
}

export async function loadMetaPixel(): Promise<void> {
  if (typeof window === "undefined" || !(await permitMeta())) return;
  if (pixelLoadPromise) return pixelLoadPromise;

  pixelLoadPromise = (async () => {
    const fbq = ensurePixelQueue();
    if (!document.getElementById("rckt-meta-pixel")) {
      const script = document.createElement("script");
      script.id = "rckt-meta-pixel";
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);
    }
    if (!pixelInitialized) {
      fbq("consent", "grant");
      fbq("init", META_PIXEL_ID, {}, { agent: "lovable" });
      pixelInitialized = true;
    }
    if (!pixelPageViewSent) {
      fbq("track", "PageView", {}, { eventID: createEventID() });
      pixelPageViewSent = true;
    }
  })();

  try {
    await pixelLoadPromise;
  } finally {
    pixelLoadPromise = null;
  }
}

export function trackMeta(
  eventName: string,
  parameters: Record<string, unknown> = {},
  custom = false,
): void {
  if (typeof window === "undefined" || getConsent() !== "granted") return;
  void (async () => {
    if (!(await permitMeta())) return;
    await loadMetaPixel();
    if (getConsent() !== "granted" || !window.fbq) return;
    window.fbq(custom ? "trackCustom" : "track", eventName, parameters, {
      eventID: createEventID(),
    });
  })();
}
