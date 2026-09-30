import { createFileRoute } from "@tanstack/react-router";
import { ClinicasCampaign, CLINIC_TITLE, CLINIC_DESCRIPTION } from "@/components/rckt/ClinicasCampaign";
import { gtmHeadScripts } from "@/components/rckt/tracking";
export const Route = createFileRoute("/lp/sales-flow-clinicas-bogota/")({
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: CLINIC_TITLE }, { name: "description", content: CLINIC_DESCRIPTION },
    { name: "robots", content: "noindex, follow" },
    { property: "og:title", content: CLINIC_TITLE }, { property: "og:description", content: CLINIC_DESCRIPTION },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], scripts: gtmHeadScripts }),
  component: () => <ClinicasCampaign variant="a" />,
});
