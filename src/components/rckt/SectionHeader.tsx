import type { ReactNode } from "react";

export function SectionHeader({
  num,
  label,
  title,
  phrase,
}: {
  num: string;
  label: string;
  title: ReactNode;
  phrase?: ReactNode;
}) {
  return (
    <div className="home-section-header">
      <div className="home-section-header__eyebrow">
        <span className="num-orange">{num}</span>
        <div className="rule" />
        <span className="label-orange">{label}</span>
      </div>
      <div className={`home-section-header__copy ${phrase ? "home-section-header__copy--split" : ""}`}>
        <h2>{title}</h2>
        {phrase ? <p>{phrase}</p> : null}
      </div>
    </div>
  );
}

export default SectionHeader;