import captacion from "@/assets/solucion-captacion.jpg";
import ecommerce from "@/assets/solucion-ecommerce.jpg";
import operacion from "@/assets/solucion-operacion.jpg";

const items = [
  {
    badge: "01",
    title: "Pagas por leads y no sabes cuáles compran.",
    subtitle: "Meta y Google dicen una cosa, tu cuenta bancaria, otra.",
    system: "Revenue Engine",
    href: "/soluciones/captacion-y-cierre",
    label: "Ver captación y cierre →",
    image: captacion,
  },
  {
    badge: "02",
    title: "Inviertes en pauta y no crece con margen.",
    subtitle: "El ROAS sube en la plataforma, el margen no sube en el banco.",
    system: "Demand System",
    href: "/soluciones/ecommerce-rentable",
    label: "Ver ecommerce rentable →",
    image: ecommerce,
  },
  {
    badge: "03",
    title: "Tu equipo hace lo mismo cien veces por semana.",
    subtitle:
      "Cotizaciones a mano, documentos que se copian entre sistemas, Excel donde debería haber un proceso.",
    system: "Operations System",
    href: "/soluciones/operacion",
    label: "Ver operación →",
    image: operacion,
  },
] as const;

export default function SolutionCards() {
  return (
    <div className="solution-cards">
      {items.map((item) => (
        <article className="solution-card" key={item.badge}>
          <div className="solution-card__photo">
            <img src={item.image} alt="" />
            <span className="solution-card__shade" />
            <span className="solution-card__badge">{item.badge}</span>
          </div>
          <div className="solution-card__body">
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
            <span className="label-orange">Sistema recomendado · {item.system}</span>
            <div className="solution-card__actions">
              <a className="btn btn-primary" href={item.href}>
                {item.label}
              </a>
              <a href="/sistemas/revenue-diagnostic">Revisar mi proceso comercial →</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
