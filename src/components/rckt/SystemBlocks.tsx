import type { CSSProperties, ReactNode } from "react";

export type Capability = {
  titulo: string;
  detalle: string;
  href?: string;
  linkLabel?: string;
  icon?: ReactNode;
};

export function CapabilityCards({
  items,
  compact = false,
}: {
  items: Capability[];
  compact?: boolean;
}) {
  return (
    <div className={`cap-grid${compact ? " cap-grid--compact" : ""}`}>
      {items.map((item, index) => (
        <article className="cap-card" key={item.titulo} style={{ "--i": index } as CSSProperties}>
          <div className="cap-card__top">
            <span className="cap-card__num">{String(index + 1).padStart(2, "0")}</span>
            {item.icon ? (
              <span className="cap-card__icon" aria-hidden="true">
                {item.icon}
              </span>
            ) : null}
          </div>
          <h3 className="cap-card__title">{item.titulo}</h3>
          <p className="cap-card__text">{item.detalle}</p>
          {item.href ? (
            <a className="cap-card__link" href={item.href}>
              {item.linkLabel ?? "Ver sistema →"}
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function RuleList({ items }: { items: string[] }) {
  return (
    <ol className="rule-list">
      {items.map((item, index) => (
        <li className="rule-row" key={item}>
          <span className="rule-row__num">{String(index + 1).padStart(2, "0")}</span>
          <span className="rule-row__text">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export type AcceptanceStep = { texto: ReactNode; hito?: string; label?: string };

export function AcceptanceSteps({ items, plazo }: { items: AcceptanceStep[]; plazo?: string }) {
  return (
    <div className="acceptance-wrap">
      {plazo ? <span className="acc-pill">{plazo}</span> : null}
      <div className="acc-steps" style={{ "--n": items.length } as CSSProperties}>
        <span className="acc-steps__line" aria-hidden="true" />
        {items.map((step, index) => (
          <div className="acc-step" key={index}>
            <span className="acc-step__dot">{step.hito ?? "✓"}</span>
            <div className="acc-step__card">
              {step.label ? <p className="label-orange acc-step__label">{step.label}</p> : null}
              <p className="acc-step__text">{step.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatCards({ items }: { items: { num: string; label: string; text: string }[] }) {
  return (
    <div className="stats">
      {items.map((item, i) => (
        <div key={i} className="stat-row">
          <div className="stat-num">{item.num}</div>
          <div>
            <p className="label-orange" style={{ marginBottom: '4px' }}>{item.label}</p>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
