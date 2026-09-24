import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import demandImg from "@/assets/sistema-demand.jpg";
import salesFlowImg from "@/assets/sistema-sales-flow.jpg";
import operationsImg from "@/assets/sistema-operations.jpg";

const SYSTEM_IMAGES = { demand: demandImg, sales: salesFlowImg, operations: operationsImg } as const;

export type SystemCardData = {
  badge: string;
  kicker: string;
  title: string;
  shortName: string;
  desc: string;
  href: "/sistemas/demand-system" | "/sistemas/sales-flow" | "/sistemas/operations-system";
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
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.15 },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className="home-systems-grid">
      {systems.map((system, index) => (
        <Link
          key={system.badge}
          to={system.href}
          className="sys-card"
          style={{ "--d": `${index * 100}ms` } as CSSProperties}
        >
          <div className="sys-card__head">
            <img src={SYSTEM_IMAGES[system.art]} alt="" aria-hidden="true" loading="lazy" className="sys-card__art" />
            <span className="sys-card__badge">{system.badge}</span>
            <span className="sys-card__arrow" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none"><path d="M3 13 13 3M6 3h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span className="sys-card__name">{system.shortName}</span>
          </div>
          <div className="sys-card__body">
            <span className="sys-card__kicker">{system.kicker}</span>
            <h3>{system.title}</h3>
            <p>{system.desc}</p>
            <span className="sys-card__more">Ver sistema <span aria-hidden="true">→</span></span>
          </div>
        </Link>
      ))}
    </div>
  );
}