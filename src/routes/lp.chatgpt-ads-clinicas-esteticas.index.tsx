import { createFileRoute } from "@tanstack/react-router";
import { LandingChatGptAdsB, LANDING_B_TITLE, LANDING_B_DESCRIPTION } from "@/components/rckt/LandingChatGptAdsB";
import { gtmHeadScripts } from "@/components/rckt/tracking";
export const Route = createFileRoute("/lp/chatgpt-ads-clinicas-esteticas/")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: LANDING_B_TITLE },
      { name: "description", content: LANDING_B_DESCRIPTION },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: LANDING_B_TITLE },
      { property: "og:description", content: LANDING_B_DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: gtmHeadScripts,
  }),
  component: () => <LandingChatGptAdsB />,
});
