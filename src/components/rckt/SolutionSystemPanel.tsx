import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type SolutionFeature = { name: string; detail: string; Icon: LucideIcon };

export default function SolutionSystemPanel({ features, system, summary, href, children }: { features: SolutionFeature[]; system: string; summary: string; href: string; children?: ReactNode }) {
  return <div className="solution-system-panel">
    <ul className="solution-feature-list">{features.map(({ name, detail, Icon }) => <li key={name}><span className="solution-feature-list__icon"><Icon aria-hidden="true" /></span><span><strong>{name}</strong><small>{detail}</small></span></li>)}</ul>
    <aside className="solution-system-card"><span className="label-orange">El sistema</span><p className="solution-system-card__name">{system}</p><p>{summary}</p>{children}<a className="btn btn-primary" href={href}>Ver {system} →</a></aside>
  </div>;
}