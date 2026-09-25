import type { ReactNode } from "react";
import heroAsset from "@/assets/rckt-hero.jpg";
import { SiteHeader } from "@/components/SiteChrome";

type Props = {
  label: string;
  title: ReactNode;
  descriptor?: string;
  promise?: string;
  ctaLabel?: string | null;
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
    <section className="system-page-hero section-light">
      <div className="system-page-hero__photo" aria-hidden="true">
        <img src={heroAsset} alt="" />
        <span className="system-page-hero__fade" />
      </div>
      <SiteHeader />
      <div className="container system-page-hero__inner">
        <div className="system-page-hero__kicker"><span />{label}</div>
        <h1>{title}</h1>
        {descriptor ? <p className="system-page-hero__descriptor">{descriptor}</p> : null}
        {promise ? <p className="system-page-hero__promise">{promise}</p> : null}
        {ctaLabel ? <a className="btn btn-primary" href={ctaHref}>{ctaLabel}</a> : null}
      </div>
    </section>
  );
}