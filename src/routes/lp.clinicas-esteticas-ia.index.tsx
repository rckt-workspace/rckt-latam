import { createFileRoute } from "@tanstack/react-router";
import { LandingClinicasIaA, LANDING_TITLE, LANDING_DESCRIPTION } from "@/components/rckt/LandingClinicasIaA";
import { gtmHeadScripts } from "@/components/rckt/tracking";
export const Route = createFileRoute("/lp/clinicas-esteticas-ia/")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: LANDING_TITLE },
      { name: "description", content: LANDING_DESCRIPTION },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: LANDING_TITLE },
      { property: "og:description", content: LANDING_DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&display=swap",
      },
    ],
    scripts: gtmHeadScripts,
  }),
  component: () => <LandingClinicasIaA />,
});
