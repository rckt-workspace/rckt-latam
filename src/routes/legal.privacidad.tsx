import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/legal/privacidad")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Aviso de privacidad — RCKT" },
      {
        name: "description",
        content:
          "Cómo RCKT trata los datos que nos envías a través del formulario de diagnóstico y del correo de contacto.",
      },
      { property: "og:title", content: "Aviso de privacidad — RCKT" },
      {
        property: "og:description",
        content: "Cómo RCKT trata los datos que nos envías y qué derechos tienes sobre ellos.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://rckt-latam.lovable.app/legal/privacidad" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://rckt-latam.lovable.app/legal/privacidad" }],
  }),
  component: Privacidad,
});

function Privacidad() {
  return (
    <LegalPage title="Aviso de privacidad">
      <p>
        En RCKT tratamos los datos personales que nos facilitas con una única finalidad: responder a
        tu solicitud de diagnóstico o a tu consulta.
      </p>
      <h2>Qué datos recogemos</h2>
      <p>
        Los que escribes en el formulario de contacto (nombre, empresa, correo y el mensaje que nos
        envías) y los que nos escribes por correo electrónico.
      </p>
      <h2>Para qué los usamos</h2>
      <p>
        Para ponernos en contacto contigo, preparar la propuesta de diagnóstico y mantener la
        conversación comercial. No vendemos ni cedemos tus datos a terceros.
      </p>
      <h2>Cuánto tiempo los guardamos</h2>
      <p>
        El tiempo necesario para atender tu solicitud y, después, mientras exista una relación
        comercial o una obligación legal que lo justifique.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Puedes pedirnos acceder, rectificar o eliminar tus datos escribiendo a{" "}
        <a href="mailto:hola@rckt.lat">hola@rckt.lat</a>.
      </p>
    </LegalPage>
  );
}
