import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidad")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(null, {
          status: 301,
          headers: { Location: new URL("/legal/privacidad", request.url).toString() },
        }),
    },
  },
});
