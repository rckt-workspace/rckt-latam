import type { ReactNode } from "react";
import logoDark from "@/assets/rckt-logo-dark.png";
import logoLight from "@/assets/rckt-logo-light.png";

export default function CampaignShell({ children }: { children: ReactNode }) {
  return (
    <div className="rckt-site campaign-page">
      <header className="campaign-header" aria-label="RCKT LATAM">
        <div className="campaign-shell campaign-header__inner">
          <span className="campaign-logo" aria-label="RCKT LATAM">
            <img className="campaign-logo--light" src={logoDark} alt="RCKT" />
            <img className="campaign-logo--dark" src={logoLight} alt="" />
          </span>
          <a className="btn-orange campaign-header__cta" href="#formulario">Revisar mi proceso comercial</a>
        </div>
      </header>
      {children}
      <footer className="campaign-legal"><a href="/legal/privacidad">Privacidad</a><span aria-hidden="true">·</span><a href="/legal/cookies">Cookies</a></footer>
    </div>
  );
}