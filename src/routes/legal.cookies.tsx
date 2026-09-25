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
    <LegalPage title="Política de Cookies">
      <p><em>rckt.lat</em></p>
      <h2>1. Quiénes somos</h2>
      <p>RCKT, Inc., sociedad constituida bajo las leyes del Estado de Delaware, Estados Unidos de América, con domicilio en 584 Castro Street #3209, San Francisco, CA 94114, Estados Unidos es la responsable de este sitio y de las cookies que en él se utilizan.</p>
      <p>Puedes escribirnos a privacy@rckt.lat para cualquier consulta sobre esta política.</p>
      <h2>2. Qué son las cookies</h2>
      <p>Las cookies son pequeños archivos de texto que un sitio web guarda en tu navegador cuando lo visitas. Permiten que el sitio recuerde tu visita, entienda cómo lo usas y funcione correctamente. Junto a ellas utilizamos tecnologías similares —píxeles, etiquetas y almacenamiento local— que cumplen funciones equivalentes y quedan sujetas a esta misma política.</p>
      <h2>3. Qué cookies usamos</h2>
      <p><strong>Necesarias.</strong> Permiten que el sitio funcione correctamente y de forma segura. No pueden desactivarse sin afectar el funcionamiento básico del sitio y no requieren tu consentimiento.</p>
      <p><strong>Funcionales.</strong> Recuerdan tus preferencias de navegación, como el tema claro u oscuro, para que no tengas que configurarlas en cada visita.</p>
      <p><strong>Analíticas.</strong> Nos ayudan a entender cómo navegas por el sitio —qué páginas visitas, cuánto tiempo permaneces, desde dónde llegas— para mejorar su contenido y funcionamiento. Utilizan identificadores que pueden considerarse datos personales en determinadas jurisdicciones.</p>
      <p><strong>De publicidad y medición.</strong> Permiten medir la efectividad de nuestras campañas, atribuir conversiones y mostrarte contenido publicitario de RCKT en plataformas de terceros. Son instaladas por proveedores externos y solo se activan si prestas tu consentimiento.</p>
      <p>Las cookies no necesarias solo se instalan tras obtener tu consentimiento a través del panel de preferencias, y puedes retirarlo en cualquier momento.</p>
      <h2>4. Cookies concretas utilizadas en este sitio</h2>
      <p>El listado completo y actualizado de las cookies instaladas en este sitio —con el nombre de cada cookie, el proveedor que la instala, su categoría, su finalidad y su duración— está disponible de forma permanente en el panel de preferencias de cookies, accesible desde el enlace "Preferencias de cookies" en el pie del sitio.</p>
      <p>Mantenemos ese listado actualizado cada vez que incorporamos o retiramos una herramienta de medición o publicidad, de modo que refleje en todo momento las cookies efectivamente activas.</p>
      <h2>5. Cookies de terceros y transferencias</h2>
      <p>Algunas cookies son instaladas por proveedores externos que actúan como encargados del tratamiento por cuenta de RCKT, y otras por terceros que determinan sus propias finalidades. En ambos casos, la información recogida puede transferirse a servidores ubicados fuera de tu país de residencia, con las garantías descritas en el apartado de transferencias internacionales de nuestra Política de Privacidad.</p>
      <p>Te recomendamos consultar las políticas de privacidad de dichos proveedores, accesibles desde el panel de preferencias.</p>
      <h2>6. Cómo gestionarlas</h2>
      <p><strong>Panel de preferencias.</strong> Puedes aceptar, rechazar o configurar las cookies no necesarias desde el banner que aparece en tu primera visita y, en cualquier momento posterior, desde el enlace "Preferencias de cookies" en el pie del sitio. Rechazar es tan sencillo como aceptar.</p>
      <p><strong>Configuración del navegador.</strong> También puedes permitir, bloquear o eliminar las cookies ya almacenadas desde tu navegador:</p>
      <ul>
        <li>Chrome: Configuración → Privacidad y seguridad → Cookies y otros datos de sitios.</li>
        <li>Safari: Preferencias → Privacidad → Gestionar datos de sitios web.</li>
        <li>Firefox: Opciones → Privacidad y seguridad → Cookies y datos del sitio.</li>
        <li>Edge: Configuración → Cookies y permisos del sitio.</li>
      </ul>
      <p>Ten en cuenta que bloquear las cookies necesarias puede afectar el funcionamiento del sitio, y que la configuración se aplica a cada navegador y dispositivo por separado.</p>
      <h2>7. Cambios a esta política</h2>
      <p>Podemos actualizar esta política cuando sea necesario, en particular cuando incorporemos o retiremos herramientas de medición o publicidad; la versión vigente es siempre la publicada en este sitio.</p>
      <p>Documentos relacionados: Aviso Legal y Política de Privacidad, ambos disponibles en este sitio.</p>
      <p><em>Última actualización: 16 de septiembre de 2026.</em></p>
    </LegalPage>
  );
}
