import type { CSSProperties, ComponentType, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const pad = (n: number) => String(n + 1).padStart(2, "0");

export type Capability = {
  Icono?: ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean | "true" }>;
  titulo: string;
  detalle: string;
  href?: string;
  linkLabel?: string;
};

export function CapabilityCards({
  items,
  compact = false,
}: {
  items: Capability[];
  compact?: boolean;
}) {
  return (
    <div ref={ref} className={`cap-grid mt-10 ${compact ? "cap-grid--compact" : ""}`} data-in={inView} data-ready={ready}>
      {items.map((item, index) => (
        <article className="cap-card" key={item.titulo} style={{ "--i": index } as CSSProperties}>
          <div className="cap-card__top">
            <span className="cap-card__num">{pad(index)}</span>
            {item.Icono ? <item.Icono className="cap-card__icon" strokeWidth={1.6} aria-hidden="true" /> : null}
          </div>
          <h3 className="cap-card__title">{item.titulo}</h3>
          <p className="cap-card__text">{item.detalle}</p>
          {item.href ? (
            <Link className="cap-card__link" to={item.href}>
              {item.linkLabel ?? "Ver sistema →"}
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function RuleList({ items }: { items: string[] }) {
  const { ref, inView, ready } = useInView<HTMLOListElement>({ fallbackMs: 1500 });
  return (
    <ol ref={ref} className="rule-list mt-10" data-in={inView} data-ready={ready}>
      {items.map((item, index) => (
        <li className="rule-row" key={item}>
          <span className="rule-row__num">{pad(index)}</span>
          <span className="rule-row__text">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export type AcceptanceStep = { texto: ReactNode; hito?: string; label?: string };

export function AcceptanceSteps({ items, plazo }: { items: AcceptanceStep[]; plazo?: string }) {
  const { ref, inView, ready } = useInView<HTMLDivElement>({ fallbackMs: 1500 });
  return (
    <div className="mt-10">
      {plazo ? <span className="acc-pill">{plazo}</span> : null}
      <div ref={ref} className="acc-steps" data-in={inView} data-ready={ready} style={{ "--n": items.length } as CSSProperties}>
        <span className="acc-steps__line" aria-hidden="true" />
        {items.map((step, index) => (
          <div className="acc-step" key={index}>
            <span className="acc-step__dot" aria-hidden={step.hito ? undefined : "true"}>{step.hito ? <span className="acc-step__hito">{step.hito}</span> : <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden="true" />}</span>
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
