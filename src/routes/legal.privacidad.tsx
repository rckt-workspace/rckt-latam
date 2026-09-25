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
      { property: "og:url", content: "https://rckt.lat/legal/privacidad" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://rckt.lat/legal/privacidad" }],
  }),
  component: Privacidad,
});

function Privacidad() {
  return (
    <LegalPage title="Política de Privacidad">
      <p><em>rckt.lat</em></p>
      <h2>1. Alcance de esta política</h2>
      <p>Esta Política de Privacidad explica cómo tratamos los datos personales de los visitantes de este sitio y de las personas que contactan con nosotros, cuando actuamos como responsable del tratamiento.</p>
      <p><strong>No aplica a los datos que tratamos por cuenta de nuestros clientes.</strong> Cuando prestamos servicios de marketing, publicidad, analítica o automatización y tratamos datos personales siguiendo las instrucciones de un cliente empresarial, actuamos como encargado del tratamiento: esos datos se rigen por el contrato suscrito con ese cliente y por la política de privacidad del propio cliente, no por este documento.</p>
      <p>Tampoco aplica a los datos de nuestros empleados ni de candidatos a procesos de selección, que cuentan con avisos específicos.</p>
      <h2>2. Responsable del tratamiento</h2>
      <p>RCKT, Inc., sociedad constituida bajo las leyes del Estado de Delaware, Estados Unidos de América, con domicilio en 584 Castro Street #3209, San Francisco, CA 94114, Estados Unidos es la responsable del tratamiento de los datos personales recabados a través de este sitio.</p>
      <p>Cuando la normativa de tu país exija la designación de un representante local, las sociedades del grupo RCKT actúan como tal en su territorio, según se detalla en los anexos por país de esta política.</p>
      <p>Puedes contactarnos para cualquier asunto relacionado con tus datos personales en privacy@rckt.lat.</p>
      <h2>3. Qué datos recopilamos</h2>
      <p>A través de los formularios del sitio (diagnóstico, contacto) podemos recopilar:</p>
      <ul>
        <li>Nombre y apellido.</li>
        <li>Correo electrónico de trabajo.</li>
        <li>Nombre y sitio web de tu empresa.</li>
        <li>Cargo o rol, si decides indicarlo.</li>
        <li>El motivo o interés comercial que nos indiques en el formulario.</li>
      </ul>
      <p>También recopilamos, de forma automática, datos técnicos de navegación (dirección IP, tipo de navegador y dispositivo, sistema operativo, páginas visitadas, tiempo de permanencia, origen del tráfico) mediante cookies y tecnologías similares, en los términos descritos en nuestra Política de Cookies.</p>
      <h2>4. Para qué los usamos</h2>
      <ul>
        <li>Responder a tu solicitud de diagnóstico, información o contacto.</li>
        <li>Elaborar y enviarte propuestas comerciales, y dar seguimiento a la relación comercial.</li>
        <li>Enviarte comunicaciones sobre los servicios que solicitaste.</li>
        <li>Enviarte comunicaciones comerciales sobre otros servicios de RCKT, cuando hayas dado tu consentimiento específico para ello. Puedes retirarlo en cualquier momento desde el enlace de baja incluido en cada comunicación.</li>
        <li>Analizar, medir y mejorar el funcionamiento de este sitio y de nuestras campañas.</li>
        <li>Cumplir con obligaciones legales aplicables y atender requerimientos de autoridades competentes.</li>
      </ul>
      <p>No usamos tus datos para fines distintos a los aquí descritos, ni los vendemos, arrendamos ni cedemos a terceros con fines comerciales ajenos a estas finalidades.</p>
      <h2>5. Base legal</h2>
      <p>Tratamos tus datos con base en:</p>
      <ul>
        <li><strong>Tu consentimiento previo, expreso e informado</strong>, otorgado al completar voluntariamente nuestros formularios y al aceptar esta política, para responder a tu solicitud y dar seguimiento comercial.</li>
        <li><strong>Tu consentimiento específico y separado</strong>, para el envío de comunicaciones comerciales no solicitadas y para la instalación de cookies no necesarias.</li>
        <li><strong>La ejecución de medidas precontractuales</strong> y del contrato, cuando exista una relación comercial en curso.</li>
        <li><strong>El cumplimiento de obligaciones legales</strong> a las que RCKT esté sujeta.</li>
        <li><strong>Nuestro interés legítimo</strong> en mejorar y proteger el sitio, únicamente en aquellas jurisdicciones cuya normativa reconoce esta base legal. En Colombia, México y demás países cuya normativa exige autorización previa del titular, el tratamiento se apoya exclusivamente en tu consentimiento.</li>
      </ul>
      <h2>6. Con quién compartimos tus datos</h2>
      <p><strong>Sociedades del grupo RCKT.</strong> Tus datos pueden ser comunicados a las demás sociedades del grupo, en particular a RCKT S.A.S. (Colombia), para la ejecución del servicio, la gestión comercial y la administración interna, bajo acuerdos intragrupo que imponen las mismas obligaciones de confidencialidad y seguridad descritas en esta política.</p>
      <p><strong>Encargados del tratamiento.</strong> Trabajamos con proveedores que tratan datos personales exclusivamente bajo nuestras instrucciones y con obligaciones contractuales de confidencialidad y seguridad, en las siguientes categorías:</p>
      <ul>
        <li>Hosting e infraestructura técnica del sitio.</li>
        <li>CRM y herramientas de gestión comercial.</li>
        <li>Correo electrónico corporativo y plataformas de automatización de marketing.</li>
        <li>Analítica web, medición y atribución de campañas.</li>
      </ul>
      <p><strong>Autoridades y terceros legitimados</strong>, cuando exista una obligación legal o sea necesario para establecer, ejercer o defender derechos.</p>
      <h2>7. Transferencias internacionales</h2>
      <p>RCKT Inc. tiene su sede en Estados Unidos y opera con proveedores tecnológicos ubicados principalmente en Estados Unidos y la Unión Europea. En consecuencia, <strong>tus datos personales se almacenan y procesan fuera de tu país de residencia.</strong></p>
      <p>Para estas transferencias adoptamos las siguientes garantías: (i) contratos de transmisión y transferencia de datos con cada sociedad del grupo y con cada encargado, que replican el nivel de protección exigido por la normativa de origen; (ii) cláusulas de confidencialidad y medidas de seguridad equivalentes; y (iii) cuando la normativa de tu país lo exija, tu autorización expresa, que se recaba de forma diferenciada en el propio formulario.</p>
      <h2>8. Conservación de datos</h2>
      <p>Conservamos tus datos personales durante el tiempo necesario para cumplir las finalidades descritas en esta política y, en todo caso, durante 24 meses contados desde el último contacto efectivo cuando no llegue a formalizarse una relación contractual.</p>
      <p>Si se formaliza una relación contractual, conservamos los datos durante su vigencia y, posteriormente, durante los plazos de prescripción legal, fiscal y contable que resulten aplicables. Transcurridos esos plazos, los datos se suprimen o anonimizan de forma irreversible.</p>
      <h2>9. Seguridad</h2>
      <p>Implementamos medidas técnicas y organizativas razonables para proteger tus datos frente a pérdida, uso indebido, acceso no autorizado, alteración o divulgación, incluyendo control de accesos por rol, cifrado en tránsito y acuerdos de confidencialidad con todo el personal y los proveedores.</p>
      <p>Ningún sistema es completamente infalible. En caso de un incidente de seguridad que afecte tus datos personales, lo notificaremos a las autoridades y a los titulares afectados en los términos y plazos que exija la normativa aplicable.</p>
      <h2>10. Tus derechos</h2>
      <p>Con independencia de tu país de residencia, puedes solicitar en cualquier momento:</p>
      <ul>
        <li>Conocer qué datos personales tuyos tratamos y acceder a ellos.</li>
        <li>Actualizarlos o rectificarlos cuando sean inexactos o incompletos.</li>
        <li>Solicitar su supresión o cancelación.</li>
        <li>Oponerte a determinados tratamientos o solicitar su limitación.</li>
        <li>Revocar el consentimiento que hayas otorgado, sin efectos retroactivos.</li>
        <li>Solicitar la portabilidad de tus datos, donde la normativa aplicable lo reconozca.</li>
      </ul>
      <p>Para ejercerlos, escríbenos a privacy@rckt.lat indicando el derecho que deseas ejercer y adjuntando un documento que acredite tu identidad. Responderemos dentro del plazo que establezca la normativa aplicable y, en todo caso, en un máximo de 15 días hábiles desde la recepción de una solicitud completa.</p>
      <p>Si consideras que tu solicitud no ha sido atendida adecuadamente, puedes presentar una reclamación ante la autoridad de protección de datos de tu país. Los anexos de esta política indican la autoridad competente en cada jurisdicción. Te agradecemos que, antes de acudir a la autoridad, nos contactes para intentar resolver la situación directamente.</p>
      <h2>11. Cookies</h2>
      <p>Este sitio utiliza cookies y tecnologías similares, incluidas cookies de analítica y de publicidad. Puedes consultar el detalle y gestionar tus preferencias en nuestra Política de Cookies y en el panel de preferencias disponible en el pie del sitio.</p>
      <h2>12. Menores de edad</h2>
      <p>Nuestros servicios están dirigidos a empresas y profesionales mayores de edad. No recopilamos intencionalmente datos de menores; si detectamos que esto ha ocurrido sin el consentimiento de sus padres o tutores, los eliminamos.</p>
      <h2>13. Enlaces a sitios de terceros</h2>
      <p>Este sitio puede contener enlaces a sitios y servicios de terceros que no están cubiertos por esta política. Te recomendamos revisar sus propias políticas de privacidad antes de facilitarles datos.</p>
      <h2>14. Anexos por país</h2>
      <h3>a. Colombia</h3>
      <p>Los datos personales recabados de titulares residentes en Colombia se tratan conforme a la Ley Estatutaria 1581 de 2012, el Decreto 1074 de 2015 y demás normas concordantes.</p>
      <p>Cuando el responsable del tratamiento sea una sociedad del grupo RCKT establecida fuera de Colombia, se designa a RCKT S.A.S., NIT 902.075.396-5, con domicilio en Carrera 11B # 99-25, Bogotá D.C., como representante para el tratamiento de datos personales en territorio colombiano y punto de contacto para cualquier consulta o reclamo.</p>
      <p>El área responsable de atender consultas, quejas y reclamos es el área de Servicio de Atención al Cliente (sac@rckt.lat), a través de privacy@rckt.lat. Las consultas se atienden en un plazo máximo de diez (10) días hábiles y los reclamos en un plazo máximo de quince (15) días hábiles, prorrogables en los términos de ley.</p>
      <p>Los titulares tienen derecho a conocer, actualizar, rectificar y suprimir sus datos, a revocar la autorización otorgada, a solicitar prueba de dicha autorización, a ser informados sobre el uso dado a sus datos y a presentar quejas ante la <strong>Superintendencia de Industria y Comercio (SIC)</strong>, una vez agotado el trámite de consulta o reclamo ante RCKT.</p>
      <p>La transferencia internacional de datos a RCKT Inc. y a los encargados ubicados fuera de Colombia se realiza con la autorización expresa del titular, recabada de forma diferenciada en el formulario, y al amparo de los contratos de transmisión de datos suscritos con cada destinatario.</p>
      <p>RCKT S.A.S. cuenta con una <a href="/RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf" target="_blank" rel="noopener noreferrer">Política de Tratamiento de Datos Personales</a> propia, disponible a solicitud en privacy@rckt.lat.</p>
      <h3>b. México</h3>
      <p>Los datos de titulares residentes en México se tratan conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su normativa de desarrollo. Esta política, junto con el aviso de privacidad simplificado disponible en los formularios del sitio, constituye el aviso de privacidad integral.</p>
      <p>Los titulares pueden ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición (derechos ARCO), así como revocar su consentimiento y limitar el uso o divulgación de sus datos, escribiendo a privacy@rckt.lat. La respuesta se emitirá en un plazo máximo de veinte (20) días hábiles, y la resolución se hará efectiva dentro de los quince (15) días hábiles siguientes.</p>
      <p>Los titulares pueden acudir ante la autoridad competente en materia de protección de datos personales si consideran vulnerados sus derechos.</p>
      <h3>c. Otros países de Latinoamérica</h3>
      <p>Para titulares residentes en Argentina, Chile, Perú, Ecuador, Costa Rica, Panamá, Uruguay y demás países de la región, aplican las disposiciones generales de esta política, complementadas por la normativa local de protección de datos y sus plazos de respuesta.</p>
      <p>Los titulares pueden dirigirse a la autoridad de control de su país —entre otras, la Agencia de Acceso a la Información Pública en Argentina, la autoridad competente en materia de protección de datos en Chile, y la Autoridad Nacional de Protección de Datos Personales en Perú— si consideran vulnerados sus derechos.</p>
      <h2>15. Cambios a esta política</h2>
      <p>Podemos actualizar esta política cuando sea necesario; la versión vigente es siempre la publicada en este sitio. Si los cambios son sustanciales, lo comunicaremos de forma destacada en el sitio o por los medios de contacto que nos hayas facilitado.</p>
      <h2>16. Contacto</h2>
      <p>Para cualquier consulta sobre esta política o sobre el tratamiento de tus datos personales, escríbenos a privacy@rckt.lat o a la dirección postal de RCKT Inc. indicada en el apartado 2.</p>
      <p><em>Última actualización: 16 de septiembre de 2026.</em></p>
    </LegalPage>
  );
}
