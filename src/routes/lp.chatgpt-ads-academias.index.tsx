import { createFileRoute } from "@tanstack/react-router";
import { LandingAcademiasC, LANDING_C_TITLE, LANDING_C_DESCRIPTION } from "@/components/rckt/LandingAcademiasC";
import { gtmHeadScripts } from "@/components/rckt/tracking";
export const Route = createFileRoute("/lp/chatgpt-ads-academias/")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: LANDING_C_TITLE },
      { name: "description", content: LANDING_C_DESCRIPTION },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: LANDING_C_TITLE },
      { property: "og:description", content: LANDING_C_DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],
    scripts: gtmHeadScripts,
  }),
  component: () => <LandingAcademiasC />,
});
