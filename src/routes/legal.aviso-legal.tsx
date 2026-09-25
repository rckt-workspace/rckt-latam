import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/legal/aviso-legal")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Aviso legal — RCKT" },
      {
        name: "description",
        content:
          "Información legal de RCKT: titular del sitio, condiciones de uso, propiedad intelectual y responsabilidad.",
      },
      { property: "og:title", content: "Aviso legal — RCKT" },
      {
        property: "og:description",
        content: "Información legal de RCKT: titular del sitio y condiciones de uso.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://rckt.lat/legal/aviso-legal" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://rckt.lat/legal/aviso-legal" }],
  }),
  component: AvisoLegal,
});

function AvisoLegal() {
  return (
    <LegalPage title="Aviso Legal">
      <p><em>rckt.lat</em></p>
      <h2>1. Quiénes somos</h2>
      <p>RCKT, Inc., sociedad constituida bajo las leyes del Estado de Delaware, Estados Unidos de América, con domicilio en 584 Castro Street #3209, San Francisco, CA 94114, Estados Unidos (en adelante, "RCKT", "nosotros" o "la empresa"), es la titular de este sitio web y responsable de su operación.</p>
      <p>RCKT opera en Latinoamérica a través de un grupo de sociedades que comparten marca, metodología y equipo. Además de RCKT, Inc., el grupo está integrado por <strong>RCKT S.A.S.</strong>, sociedad colombiana identificada con NIT 902.075.396-5 y domiciliada en Carrera 11B # 99-25, Bogotá D.C., Colombia.</p>
      <p>Puedes escribirnos a hola@rckt.lat para cualquier consulta relacionada con este Aviso Legal, o a privacy@rckt.lat para asuntos relativos al tratamiento de datos personales.</p>
      <h2>2. Aceptación de estos términos</h2>
      <p>Al acceder o usar este sitio aceptas este Aviso Legal en su totalidad. Si no estás de acuerdo con alguno de sus puntos, te pedimos no usar el sitio.</p>
      <h2>3. Uso del sitio</h2>
      <p>Puedes usar este sitio libremente para conocer nuestros servicios y contactarnos. Al hacerlo, te comprometes a:</p>
      <ul>
        <li>Usarlo de forma lícita y de buena fe, sin fines fraudulentos ni lesivos para terceros.</li>
        <li>No introducir virus, malware ni intentar acceder a áreas restringidas de nuestros sistemas.</li>
        <li>No reproducir, copiar ni explotar comercialmente los contenidos del sitio sin autorización previa.</li>
      </ul>
      <h2>4. Propiedad intelectual</h2>
      <p>Los textos, imágenes, marcas, logotipos, diseños, metodologías y demás contenidos de este sitio son propiedad de RCKT o de terceros que nos han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial vigente. Su reproducción o uso no autorizado está prohibido.</p>
      <h2>5. Alcance de la información</h2>
      <p>El contenido de este sitio es informativo y no constituye una oferta comercial vinculante. Las condiciones específicas de cada servicio —alcance, tarifas, plazos y niveles de servicio— se establecen en la propuesta o contrato que firmemos contigo antes de iniciar cualquier trabajo.</p>
      <p>No garantizamos la disponibilidad continua del sitio ni nos hacemos responsables por daños derivados de su uso indebido, de interrupciones del servicio o de enlaces a sitios de terceros, cuyos contenidos y políticas de privacidad son ajenos a RCKT.</p>
      <h2>6. Entidad contratante</h2>
      <p>La sociedad del grupo RCKT que asume la relación contractual varía según el país en que se preste el servicio y la naturaleza del encargo. La entidad contratante concreta, su domicilio y sus datos de identificación se indican siempre en la propuesta comercial y en el contrato correspondiente, que prevalecen sobre este Aviso Legal en todo lo relativo a la prestación del servicio.</p>
      <p>Cuando la entidad contratante sea distinta de RCKT Inc., las obligaciones derivadas de la prestación del servicio corresponden a dicha entidad, sin perjuicio de las responsabilidades propias de RCKT Inc. como titular de este sitio web.</p>
      <h2>7. Legislación aplicable y jurisdicción</h2>
      <p>Este Aviso Legal se rige por las leyes del Estado de Delaware, Estados Unidos de América, con exclusión de sus normas sobre conflicto de leyes. Cualquier controversia derivada de su interpretación o cumplimiento se someterá a los tribunales estatales y federales competentes ubicados en el Estado de Delaware.</p>
      <p>Lo anterior se entiende sin perjuicio de: (i) los derechos irrenunciables que la normativa de protección al consumidor de tu país de residencia pueda reconocerte; (ii) las normas imperativas de protección de datos personales aplicables en tu país, que se detallan en nuestra Política de Privacidad y sus anexos; y (iii) la ley y jurisdicción que se pacten expresamente en el contrato de prestación de servicios, que prevalecerán sobre esta cláusula.</p>
      <h2>8. Cambios y vigencia</h2>
      <p>Podemos actualizar este Aviso Legal cuando sea necesario; la versión vigente es siempre la publicada en este sitio. Te recomendamos revisarlo periódicamente.</p>
      <p>Documentos relacionados: Política de Privacidad y Política de Cookies, ambas disponibles en este sitio.</p>
      <p><em>Última actualización: 16 de septiembre de 2026.</em></p>
    </LegalPage>
  );
}
