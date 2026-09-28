import type { ReactNode } from "react";
import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import logoDark from "@/assets/rckt-logo-dark.png";
import logoLight from "@/assets/rckt-logo-light.png";

const NAV_LINKS = [
  { href: "/soluciones/", label: "Soluciones" },
  { href: "/sistemas/", label: "Sistemas" },
  { href: "/sectores/", label: "Sectores" },
  { href: "/casos/", label: "Casos" },
  { href: "/recursos/", label: "Recursos" },
  { href: "/nosotros/", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function CampaignShell({ children, thanks = false }: { children: ReactNode; thanks?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (href: string) => {
    const h = href.replace(/\/+$/, "") || "/";
    const p = (pathname || "").replace(/\/+$/, "") || "/";
    return p === h || p.startsWith(h + "/");
  };

  const ctaHref = thanks ? "/lp/sales-flow#formulario" : "#formulario";
  const logo = (
    <a href="/" className="campaign-logo" aria-label="RCKT LATAM" onClick={() => setMenuOpen(false)}>
      <img className="campaign-logo--light" src={logoDark} alt="RCKT" />
      <img className="campaign-logo--dark" src={logoLight} alt="" />
    </a>
  );

  return (
    <div className="rckt-site campaign-page">
      <header className="campaign-header" aria-label="RCKT LATAM">
        <div className="campaign-shell campaign-header__inner">
          <div className="campaign-header__nav">
            {logo}
            <nav className="campaign-header__desktop-nav">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`campaign-nav-link ${isActive(l.href) ? "campaign-nav-link--active" : ""}`}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="campaign-header__actions">
            <a className="btn-orange campaign-header__cta" href={ctaHref}>
              Revisar mi proceso comercial
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="campaign-header__menu-toggle"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                {menuOpen ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="campaign-header__mobile-nav">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`campaign-nav-link ${isActive(l.href) ? "campaign-nav-link--active" : ""}`}
              >
                {l.label}
              </a>
            ))}
            <a className="btn-orange campaign-header__cta" href={ctaHref} onClick={() => setMenuOpen(false)}>
              Revisar mi proceso comercial
            </a>
          </div>
        )}
      </header>
      {children}
      <footer className="campaign-legal"><a href="/legal/privacidad">Privacidad</a><span aria-hidden="true">·</span><a href="/legal/cookies">Cookies</a></footer>
    </div>
  );
}