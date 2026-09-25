import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/aviso-legal")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(null, {
          status: 301,
          headers: { Location: new URL("/legal/aviso-legal", request.url).toString() },
        }),
    },
  },
});
