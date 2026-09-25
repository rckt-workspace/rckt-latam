import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/legal/cookies")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Política de cookies — RCKT" },
      {
        name: "description",
        content:
          "Qué cookies y almacenamiento utiliza el sitio de RCKT y cómo puedes controlarlos desde tu navegador.",
      },
      { property: "og:title", content: "Política de cookies — RCKT" },
      {
        property: "og:description",
        content: "Qué cookies utiliza el sitio de RCKT y cómo controlarlas.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://rckt.lat/legal/cookies" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://rckt.lat/legal/cookies" }],
  }),
  component: Cookies,
});

function Cookies() {
  return (
    <LegalPage title="Política de cookies">
      <p>
        Este sitio es una página informativa y no utiliza cookies publicitarias ni de seguimiento de
        terceros.
      </p>
      <h2>Qué usamos</h2>
      <p>
        Únicamente almacenamiento técnico en tu navegador para recordar preferencias de la propia
        página, como el modo claro u oscuro.
      </p>
      <h2>Cómo controlarlo</h2>
      <p>
        Puedes borrar o bloquear este almacenamiento desde la configuración de tu navegador. Hacerlo
        no impide navegar por el sitio.
      </p>
      <h2>Dudas</h2>
      <p>
        Si tienes cualquier pregunta sobre esta política, escríbenos a{" "}
        <a href="mailto:hola@rckt.lat">hola@rckt.lat</a>.
      </p>
    </LegalPage>
  );
}
