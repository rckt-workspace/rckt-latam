import { createFileRoute } from "@tanstack/react-router";
import { ClinicasCampaign, CLINIC_TITLE, CLINIC_DESCRIPTION } from "@/components/rckt/ClinicasCampaign";
import { gtmHeadScripts } from "@/components/rckt/tracking";
export const Route = createFileRoute("/lp/sales-flow-clinicas-bogota-b/")({
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: `${CLINIC_TITLE} · B` }, { name: "description", content: CLINIC_DESCRIPTION },
    { name: "robots", content: "noindex, follow" },
    { property: "og:title", content: `${CLINIC_TITLE} · B` }, { property: "og:description", content: CLINIC_DESCRIPTION },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], scripts: [
    { children: "(function(){try{var r=document.documentElement;r.classList.add('dark');r.setAttribute('data-theme','dark');}catch(e){}})();" },
    ...gtmHeadScripts,
  ] }),
  component: () => <ClinicasCampaign variant="b" />,
});
