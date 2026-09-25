import ctaAsset from "@/assets/rckt-cta.jpg";
import type { ReactNode } from "react";

export default function SystemFinalCta({
  title = (
    <>
      Antes de tocar nada, <em className="font-serif-accent">medimos.</em>
    </>
  ),
  href = "/sistemas/revenue-diagnostic",
  label = "Solicitar Revenue Diagnostic →",
}: {
  title?: ReactNode;
  href?: string;
  label?: string;
}) {
  return (
    <section className="cta-final general-cta">
      <span className="cta-final__topline" aria-hidden="true" />
      <img
        className="cta-final-photo cta-photo-img"
        src={ctaAsset}
        alt="Profesionales de RCKT trabajando en sistemas de crecimiento"
      />
      <span className="cta-final-overlay cta-photo-fade" aria-hidden="true" />
      <span className="cta-final__glow" aria-hidden="true" />
      <div className="container">
        <span className="kicker">¿Empezamos?</span>
        <h2>{title}</h2>
        <a className="btn btn-primary" href={href}>
          {label}
        </a>
        <div className="cta-final__foot">
          <span>IA supervisada y documentada</span>
        </div>
      </div>
    </section>
  );
}
