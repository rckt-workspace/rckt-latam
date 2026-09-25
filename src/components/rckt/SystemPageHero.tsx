import type { ReactNode } from "react";
import heroPhoto from "@/assets/rckt-hero.jpg";
import SiteNav from "@/components/rckt/SiteNav";

type Props = {
  label: string;
  title: ReactNode;
  descriptor?: string;
  context?: string;
  quoteLabel?: string;
  quote?: string;
  extra?: ReactNode;
  ctaLabel?: string | null;
  ctaHref?: string;
};

export default function SystemPageHero({
  label,
  title,
  descriptor,
  context,
  quoteLabel,
  quote,
  extra,
  ctaLabel = "Revisar mi proceso comercial →",
  ctaHref = "/sistemas/revenue-diagnostic",
}: Props) {
  return (
    <section
      className="system-page-hero section-light relative isolate overflow-clip pt-[110px] md:pt-[120px] lg:pt-[140px]"
      style={{ paddingBottom: "80px", minHeight: "auto" }}
    >
      <div className="hero-photo" aria-hidden="true">
        <img src={heroPhoto} alt="" className="hero-photo-img" />
        <div className="hero-photo-fade" />
      </div>
      <SiteNav />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-block h-4 w-[2px] bg-orange" />
          <span className="label-orange">{label}</span>
        </div>
        <h1 className="font-display font-semibold tracking-tight text-paper" style={{ fontSize: "clamp(2rem, 3.6vw, 3.25rem)", lineHeight: 1.1, maxWidth: "18ch" }}>{title}</h1>
        {descriptor ? <p className="mt-4 max-w-[640px] text-[16px] text-paper/70">{descriptor}</p> : null}
        {context ? <p className="hero-context-para" style={{ marginTop: "20px" }}>{context}</p> : null}
        {extra}
        {quote ? (
          <figure className="relative border-t border-paper/20" style={{ margin: "28px 0 20px", paddingTop: "20px", maxWidth: "680px" }}>
            {quoteLabel ? <figcaption className="label-orange" style={{ marginBottom: "10px" }}>{quoteLabel}</figcaption> : null}
            <p className="hero-context-para">{quote}</p>
          </figure>
        ) : null}
        {ctaLabel ? (
          <div style={{ marginTop: "28px" }}>
            <a href={ctaHref} className="btn-orange font-display inline-flex items-center justify-center rounded-full px-8 py-4 text-[15px] font-semibold">{ctaLabel}</a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
