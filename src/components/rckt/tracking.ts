// PENDIENTE: ID del contenedor GTM de rckt.lat.
export const GTM_ID = "";
export const META_PIXEL_ID = "1568790304997222";

const campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid", "wbraid"] as const;
const storageKey = "rckt-lp-campaign";
type Campaign = Partial<Record<(typeof campaignKeys)[number], string>>;

export function saveCampaignParams(search: string) {
  try {
    const params = new URLSearchParams(search);
    const stored = JSON.parse(sessionStorage.getItem(storageKey) || "{}") as Campaign;
    for (const key of campaignKeys) {
      const value = params.get(key);
      if (value) stored[key] = value;
    }
    sessionStorage.setItem(storageKey, JSON.stringify(stored));
  } catch { /* El navegador puede bloquear el almacenamiento. */ }
}

export function getCampaignParams(): Campaign {
  if (typeof window === "undefined") return {};
  try {
    // Start with persisted values
    const stored = JSON.parse(sessionStorage.getItem(storageKey) || "{}") as Campaign;

    // Read current URL parameters (priority over stored)
    const params = new URLSearchParams(window.location.search);
    let updated = false;

    for (const key of campaignKeys) {
      const value = params.get(key);
      if (value) {
        stored[key] = value;
        updated = true;
      }
    }

    // Persist any new values found in URL
    if (updated) {
      sessionStorage.setItem(storageKey, JSON.stringify(stored));
    }

    return stored;
  } catch {
    return {};
  }
}

export function track(event: "lp_view" | "form_start" | "mql" | "lead_valido" | "whatsapp_click" | "thank_you_view", params: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  let campaign: Campaign = {};
  try { campaign = JSON.parse(sessionStorage.getItem(storageKey) || "{}"); } catch { /* Sin atribución disponible. */ }
  const layer = window as Window & { dataLayer?: Record<string, unknown>[] };
  layer.dataLayer = layer.dataLayer || [];
  layer.dataLayer.push({ event, ...campaign, ...params });
  const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
  if (fbq) {
    const eventID = `${event}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const data = { ...campaign, ...params };
    if (event === "lead_valido") fbq("track", "Lead", data, { eventID });
    else if (event === "whatsapp_click") fbq("track", "Contact", data, { eventID });
    else if (event === "mql") fbq("trackCustom", "MQL", data, { eventID });
    else if (event === "form_start") fbq("trackCustom", "FormStart", data, { eventID });
    else if (event === "thank_you_view") fbq("trackCustom", "ThankYouView", data, { eventID });
  }
}

const gtmScript = GTM_ID ? [{ children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(GTM_ID)});` }] : [];

const metaPixelScript = META_PIXEL_ID ? [{ children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');` }] : [];

export const gtmHeadScripts = [...gtmScript, ...metaPixelScript];