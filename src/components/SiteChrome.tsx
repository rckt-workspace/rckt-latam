import { useEffect, useRef, useState } from "react";
import logoDarkAsset from "@/assets/rckt-logo-dark.png";
import ThemeToggle from "@/components/rckt/ThemeToggle";

/** Navegación y pie compartidos con la home, más las animaciones del sitio. */

function NosotrosDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 980;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen && isMobileRef.current) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  const handleClick = () => {
    if (isMobileRef.current) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="nav-dropdown" ref={dropdownRef}>
      <button
        className="nav-dropdown-trigger"
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-label="Menú de Nosotros"
      >
        Nosotros
        <svg className="nav-dropdown-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3.5 5.5L7 9l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div className="nav-dropdown-menu-wrap" data-open={isMobileRef.current ? isOpen : undefined}>
        <div className="nav-dropdown-menu">
          <a href="/nosotros" className="nav-dropdown-item">
            Quiénes somos
          </a>
          <a href="/nosotros/como-trabajamos" className="nav-dropdown-item">
            Cómo trabajamos
          </a>
          <a href="/trabaja-con-nosotros" className="nav-dropdown-item">
            Trabaja con nosotros
          </a>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header>
      <div className="container">
        <nav>
          <div className="nav-capsule nav-capsule-left">
            <a className="logo" href="/">
              <img alt="RCKT" src={logoDarkAsset} />
            </a>
            <div className="nav-links">
              <a href="/soluciones">Soluciones</a>
              <a href="/sistemas">Sistemas</a>
              <a href="/sectores">Sectores</a>
              <NosotrosDropdown />
              <a href="/blog">Blog</a>

              <div className="nav-menu-footer">
                <ThemeToggle />
                <a className="btn hero-nav-cta nav-menu-cta" href="/sistemas/revenue-diagnostic">
                  Pedir diagnóstico
                </a>
              </div>
            </div>
          </div>
          <div className="nav-capsule nav-capsule-right nav-right">
            <div className="nav-right-desktop">
              <ThemeToggle />
            </div>
            <a className="btn hero-nav-cta" href="/sistemas/revenue-diagnostic">
              Pedir diagnóstico
            </a>
            <button aria-label="Abrir menú" className="nav-toggle" id="navToggle">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path className="nav-toggle-line nav-toggle-line--top" d="M5 7h14" />
                <path className="nav-toggle-line nav-toggle-line--middle" d="M5 12h14" />
                <path className="nav-toggle-line nav-toggle-line--bottom" d="M5 17h14" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}


export function SiteFooter() {
  return (
    <footer className="section-deep">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="logo" href="/">
              <img alt="RCKT" src={logoDarkAsset} />
            </a>
            <p>Menos ruido, más crecimiento.</p>
            <h5>Correo</h5>
            <a className="footer-contact" href="mailto:hola@rckt.lat">hola@rckt.lat</a>
          </div>
          <div className="footer-col">
            <h5>Navegar</h5>
            <ul>
              <li>
                <a href="/soluciones">Soluciones</a>
              </li>
              <li>
                <a href="/sistemas">Sistemas</a>
              </li>
              <li>
                <a href="/sectores">Sectores</a>
              </li>
              <li>
                <a href="/nosotros">Nosotros</a>
              </li>
              <li>
                <a href="/nosotros/como-trabajamos">Método</a>
              </li>
              <li>
                <a href="/sistemas/revenue-diagnostic#faq">FAQ</a>
              </li>
              <li>
                <a href="/contacto">Contacto</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/trabaja-con-nosotros">Trabaja con nosotros</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              <li>
                <a href="/aviso-legal.pdf" download>
                  Aviso legal
                </a>
              </li>
              <li>
                <a href="/privacidad.pdf" download>
                  Privacidad
                </a>
              </li>
              <li>
                <a href="/cookies.pdf" download>
                  Cookies
                </a>
              </li>
              <li>
                <a href="/politica-tratamiento-datos.pdf" download>
                  Política de Tratamiento de Datos
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col footer-appearance">
            <h5>Apariencia</h5>
            <ThemeToggle />
          </div>
        </div>
        <div className="footer-bottom">
          <span>sistema activo</span>
          <span>2026© RCKT</span>
        </div>
      </div>
    </footer>
  );
}

/** Revelado al scroll, títulos por palabra, menú móvil y selector de tema. */
export function useSiteMotion(deps: unknown[] = []) {
  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    document.querySelectorAll<HTMLElement>("h2.rv").forEach((h2) => {
      if (reduceMotion || h2.querySelector("*") || h2.classList.contains("words")) return;
      const words = (h2.textContent ?? "").trim().split(/\s+/);
      if (words.length < 2) return;
      h2.textContent = "";
      words.forEach((word, i) => {
        const span = document.createElement("span");
        span.className = "word";
        span.style.setProperty("--w", String(i));
        span.textContent = word;
        h2.appendChild(span);
        if (i < words.length - 1) h2.appendChild(document.createTextNode(" "));
      });
      h2.classList.add("words");
    });

    let observer: IntersectionObserver | undefined;
    observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("in");
                  observer?.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
          )
        : undefined;
    document.querySelectorAll<HTMLElement>(".rv").forEach((el) => {
      if (observer) observer.observe(el);
      else el.classList.add("in");
    });

    const header = document.querySelector<HTMLElement>("header");
    const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const toggle = document.getElementById("navToggle");
    const links = document.querySelector<HTMLElement>(".nav-links");
    const updateMenuState = () => {
      const open = links?.classList.contains("mobile-open");
      toggle?.classList.toggle("mobile-open", Boolean(open));
      toggle?.setAttribute("aria-expanded", String(Boolean(open)));
      toggle?.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    };
    const onToggle = () => {
      links?.classList.toggle("mobile-open");
      updateMenuState();
    };
    const closeMenu = () => {
      links?.classList.remove("mobile-open");
      updateMenuState();
    };
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    toggle?.addEventListener("click", onToggle);
    links?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    links?.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
      const href = new URL(link.href, window.location.origin).pathname.replace(/\/$/, "") || "/";
      const active = href === "/" ? currentPath === "/" : currentPath === href || currentPath.startsWith(`${href}/`);
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    // Dropdown menu toggle (mobile only - desktop uses CSS hover)
    const dropdownTrigger = links?.querySelector<HTMLButtonElement>(".nav-dropdown-trigger");
    const dropdownMenuWrap = links?.querySelector<HTMLElement>(".nav-dropdown-menu-wrap");
    if (dropdownTrigger && dropdownMenuWrap) {
      dropdownTrigger.addEventListener("click", (e) => {
        const isMobile = window.innerWidth < 980;
        if (!isMobile) return;
        e.preventDefault();
        const isOpen = dropdownMenuWrap.getAttribute("data-open") === "true";
        dropdownMenuWrap.setAttribute("data-open", String(!isOpen));
        dropdownTrigger.setAttribute("aria-expanded", String(!isOpen));
      });
      // Close dropdown when clicking a submenu item
      dropdownMenuWrap.querySelectorAll<HTMLAnchorElement>("a").forEach((item) => {
        item.addEventListener("click", () => {
          dropdownMenuWrap.setAttribute("data-open", "false");
          dropdownTrigger.setAttribute("aria-expanded", "false");
        });
      });
    }

    window.addEventListener("keydown", closeOnEsc);

    const closeOnResize = () => {
      if (window.innerWidth > 1152) closeMenu();
      if (dropdownMenuWrap && window.innerWidth < 980) {
        dropdownMenuWrap.setAttribute("data-open", "false");
        dropdownTrigger?.setAttribute("aria-expanded", "false");
      }
    };
    window.addEventListener("resize", closeOnResize);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      toggle?.removeEventListener("click", onToggle);
      closeBtn?.removeEventListener("click", closeMenu);
      overlay?.removeEventListener("click", closeMenu);
      links?.querySelectorAll("a").forEach((link) => link.removeEventListener("click", closeMenu));
      if (dropdownTrigger && dropdownMenuWrap) {
        dropdownTrigger.removeEventListener("click", () => {});
        dropdownMenuWrap.querySelectorAll<HTMLAnchorElement>("a").forEach((item) => {
          item.removeEventListener("click", () => {});
        });
      }
      window.removeEventListener("keydown", closeOnEsc);
      if (dropdownTrigger && dropdownMenuWrap) {
        dropdownTrigger.removeEventListener("click", () => {});
        dropdownMenuWrap.querySelectorAll<HTMLAnchorElement>("a").forEach((item) => {
          item.removeEventListener("click", () => {});
        });
      }
      window.removeEventListener("resize", closeOnResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
