export type MethodField = { k: string; v: string };

export default function MethodCard({
  fields,
  className = "",
}: {
  fields: MethodField[];
  className?: string;
}) {
  return (
    <div className={`ficha-metodo ${className}`}>
      <span className="label-orange">Ficha del método · RCKT LATAM</span>
      <dl className="ficha-metodo__grid">
        {fields.map((field) => (
          <div key={field.k} className="ficha-metodo__row">
            <dt className="ficha-metodo__k">{field.k}</dt>
            <dd className="ficha-metodo__v">{field.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
