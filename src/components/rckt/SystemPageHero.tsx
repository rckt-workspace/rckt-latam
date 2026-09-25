import type { ReactNode } from "react";
import heroAsset from "@/assets/rckt-hero.jpg";
import { SiteHeader } from "@/components/SiteChrome";

type Props = {
  label: string;
  title: ReactNode;
  descriptor?: string;
  promise: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function SystemPageHero({
  label,
  title,
  descriptor,
  promise,
  ctaLabel = "Solicitar Revenue Diagnostic →",
  ctaHref = "/sistemas/revenue-diagnostic",
}: Props) {
  return (
    <section className="system-page-hero">
      <div className="system-page-hero__photo" aria-hidden="true">
        <img src={heroAsset} alt="" />
        <span className="system-page-hero__fade" />
      </div>
      <span className="system-page-hero__glow" aria-hidden="true" />
      <SiteHeader />
      <div className="container system-page-hero__inner">
        <div className="system-page-hero__kicker"><span />{label}</div>
        <h1>{title}</h1>
        {descriptor ? <p className="system-page-hero__descriptor">{descriptor}</p> : null}
        <p className="system-page-hero__promise">{promise}</p>
        <a className="btn btn-primary" href={ctaHref}>{ctaLabel}</a>
      </div>
    </section>
  );
}