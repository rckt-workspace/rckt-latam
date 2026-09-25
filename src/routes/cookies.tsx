import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(null, {
          status: 301,
          headers: { Location: new URL("/legal/cookies", request.url).toString() },
        }),
    },
  },
});
