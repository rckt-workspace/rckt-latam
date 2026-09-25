// PENDIENTE: ID del contenedor GTM de rckt.lat.
export const GTM_ID = "";

const campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"] as const;
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

export function track(event: "lead_valido" | "whatsapp_click" | "thank_you_view", params: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  let campaign: Campaign = {};
  try { campaign = JSON.parse(sessionStorage.getItem(storageKey) || "{}"); } catch { /* Sin atribución disponible. */ }
  const layer = window as Window & { dataLayer?: Record<string, unknown>[] };
  layer.dataLayer = layer.dataLayer || [];
  layer.dataLayer.push({ event, ...campaign, ...params });
  // PENDIENTE: enviar UTM al CRM (backend).
}

export const gtmHeadScripts = GTM_ID ? [{ children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(GTM_ID)});` }] : [];