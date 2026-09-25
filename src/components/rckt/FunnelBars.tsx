import { Droplet } from "lucide-react";
import useInView from "@/hooks/use-in-view";
import type { CSSProperties } from "react";

export type FunnelLeak = { stage: string; label: string };
const OPACITY = [1, 0.86, 0.72, 0.58, 0.44, 0.3, 0.16];

export default function FunnelBars({ stages, leaks = [] }: { stages: string[]; leaks?: FunnelLeak[] }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  return (
    <div ref={ref} className="funnel">
      {stages.map((stage, index) => {
        const width = 100 - (index * 60) / Math.max(stages.length - 1, 1);
        const leak = leaks.find((item) => item.stage === stage);
        return (
          <div className="funnel__row" key={stage}>
            <div className="funnel__track"><div className={`funnel__bar ${inView ? "is-in" : ""}`} style={{ width: `${width}%`, "--bar-opacity": OPACITY[index] ?? 0.16, transitionDelay: `${index * 80}ms` } as CSSProperties}>{stage}</div></div>
            <div className="funnel__leak">{leak ? <><span className="funnel__dash" aria-hidden="true" /><span className="funnel__pill"><Droplet aria-hidden="true" />{leak.label}</span></> : null}</div>
          </div>
        );
      })}
    </div>
  );
}