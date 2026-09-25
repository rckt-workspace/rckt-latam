import type { LucideIcon } from "lucide-react";

export type Signal = { titulo: string; frase: string; Icono: LucideIcon };

export default function SignalCards({ items }: { items: Signal[] }) {
  const grid = items.slice(0, 4);
  const wide = items.slice(4);
  return (
    <div className="signal-grid">
      {grid.map((signal, index) => <SignalCard key={signal.titulo} n={index + 1} signal={signal} />)}
      {wide.map((signal, index) => <SignalCard key={signal.titulo} n={grid.length + index + 1} signal={signal} wide />)}
    </div>
  );
}

function SignalCard({ n, signal, wide = false }: { n: number; signal: Signal; wide?: boolean }) {
  const Icon = signal.Icono;
  return (
    <article className={`signal-card ${wide ? "signal-card--wide" : ""}`}>
      <div className="signal-card__body">
        <div className="signal-card__heading"><span className="signal-card__num">{n}</span><h3>{signal.titulo}</h3></div>
        <p>{signal.frase}</p>
      </div>
      <span className="signal-card__art" aria-hidden="true"><Icon /></span>
    </article>
  );
}