import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import demandImg from "@/assets/sistema-demand.jpg";
import salesFlowImg from "@/assets/sistema-sales-flow.jpg";
import operationsImg from "@/assets/sistema-operations.jpg";

const SYSTEM_IMAGES = { demand: demandImg, sales: salesFlowImg, operations: operationsImg } as const;

type SystemHref = "/sistemas/demand-system" | "/sistemas/sales-flow" | "/sistemas/operations-system";

export type SystemCardData = {
  badge: string;
  kicker: string;
  title: string;
  shortName: string;
  desc: string;
  meta?: string;
  href: SystemHref;
  art: keyof typeof SYSTEM_IMAGES;
};

export function SystemCards({ systems }: { systems: SystemCardData[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".sys-card"));
    if (!("IntersectionObserver" in window)) {
      cards.forEach((card) => card.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.15 });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className="grid gap-6 md:grid-cols-3">
      {systems.map((system, index) => (
        <Link key={system.badge} to={system.href} className="card-kraft sys-card group flex h-full flex-col overflow-hidden p-0" style={{ "--d": `${index * 100}ms` } as CSSProperties}>
          <div className="sys-card__head">
            <img src={SYSTEM_IMAGES[system.art]} alt="" aria-hidden="true" loading="lazy" className="sys-card__art" />
            <span className="sys-card__badge absolute top-4 left-4 rounded-full px-3 py-1 font-mono text-[11px] tracking-wider">{system.badge}</span>
            <span className="sys-card__arrow absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full"><ArrowUpRight className="h-4 w-4" /></span>
            <span className="sys-card__name">{system.shortName}</span>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <span className="sys-card__kicker">{system.kicker}</span>
            <h3 className="font-display mt-2 text-lg leading-snug font-semibold">{system.title}</h3>
            <p className="text-muted-foreground mt-3 text-[13.5px] leading-relaxed">{system.desc}</p>
            {system.meta ? <p className="sys-card__meta">{system.meta}</p> : null}
            <span className="sys-card__more">Ver sistema <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5"><path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          </div>
        </Link>
      ))}
    </div>
  );
}
