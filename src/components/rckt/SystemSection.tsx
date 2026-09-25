import type { ReactNode } from "react";
import SectionHeader from "@/components/rckt/SectionHeader";

export default function SystemSection({
  id,
  num,
  label,
  title,
  phrase,
  children,
  className = "",
}: {
  id?: string;
  num: string;
  label: string;
  title: ReactNode;
  phrase?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`system-section ${className}`.trim()} id={id}>
      <div className="container">
        <SectionHeader num={num} label={label} title={title} phrase={phrase} />
        {children ? <div className="system-section__content">{children}</div> : null}
      </div>
    </section>
  );
}
