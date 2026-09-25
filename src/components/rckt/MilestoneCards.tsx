import useInView from "@/hooks/use-in-view";
import type { CSSProperties } from "react";

export type Milestone = { dia: string; texto: string; kicker?: string };

export default function MilestoneCards({ items, kicker = "Día" }: { items: Milestone[]; kicker?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  return (
    <div ref={ref} className={`milestones ${items.length === 4 ? "milestones--4" : ""}`} style={{ "--ms-cols": String(items.length) } as CSSProperties}>
      <div className="milestones__bar"><div className="milestones__track"><span className={`milestones__fill ${inView ? "is-in" : ""}`} /></div></div>
      <div className="milestones__grid">
        {items.map((item, index) => (
          <article className={`milestone-card ${inView ? "is-in" : ""}`} style={{ transitionDelay: `${index * 120}ms` }} key={item.dia}>
            <span className="label-orange">{item.kicker ?? kicker}</span><p className="milestone-card__num">{item.dia}</p><p className="milestone-card__text">{item.texto}</p>
          </article>
        ))}
      </div>
    </div>
  );
}