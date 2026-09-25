import { useEffect, useState } from "react";
import logoDarkAsset from "@/assets/rckt-logo-dark.png";
import logoLightAsset from "@/assets/rckt-logo-light.png";
import ThemeToggle, { currentTheme, THEME_EVENT } from "@/components/rckt/ThemeToggle";

/** Navegación y pie compartidos con la home, más las animaciones del sitio. */

export function SiteHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setTheme(currentTheme());
    const onThemeChange = () => setTheme(currentTheme());
    window.addEventListener(THEME_EVENT, onThemeChange);
    return () => window.removeEventListener(THEME_EVENT, onThemeChange);
  }, []);

  const logoSrc = theme === "dark" ? logoLightAsset : logoDarkAsset;

  return (
    <header>
      <div className="container">
        <nav>
          <div className="nav-capsule nav-capsule-left">
            <a className="logo" href="/" aria-label="RCKT Home">
              <img alt="RCKT" src={logoSrc} />
            </a>
            <div className="nav-links" role="navigation" aria-label="Navegación principal">
              <a href="/soluciones">Soluciones</a>
              <a href="/sistemas">Sistemas</a>
              <a href="/sectores">Sectores</a>
              <a href="/nosotros">Nosotros</a>
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
            <button aria-label="Abrir menú" aria-expanded="false" className="nav-toggle" id="navToggle">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}


export function SiteFooter() {
  return (
    <footer className="section-deep" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="logo" href="/" aria-label="RCKT Home">
              <img alt="RCKT" src={logoDarkAsset} />
            </a>
            <p>Menos ruido, más crecimiento.</p>
            <h5>Correo</h5>
            <a className="footer-contact" href="mailto:hola@rckt.lat">hola@rckt.lat</a>
          </div>
          <div className="footer-col">
            <h5>Navegar</h5>
            <ul aria-label="Enlaces de navegación">
              <li><a href="/soluciones">Soluciones</a></li>
              <li><a href="/sistemas">Sistemas</a></li>
              <li><a href="/sectores">Sectores</a></li>
              <li><a href="/nosotros">Nosotros</a></li>
              <li><a href="/nosotros/como-trabajamos">Método</a></li>
              <li><a href="/sistemas/revenue-diagnostic#faq">FAQ</a></li>
              <li><a href="/contacto">Contacto</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/trabaja-con-nosotros">Trabaja con nosotros</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <ul aria-label="Información legal">
              <li><a href="/legal/aviso-legal">Aviso legal</a></li>
              <li><a href="/legal/privacidad">Privacidad</a></li>
              <li><a href="/legal/cookies">Cookies</a></li>
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

    // Word reveal animation logic
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

    // Intersection Observer for .rv elements
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
    const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mobile Menu logic
    const toggle = document.getElementById("navToggle");
    const links = document.querySelector<HTMLElement>(".nav-links");
    
    const updateMenuState = (isOpen: boolean) => {
      toggle?.classList.toggle("mobile-open", isOpen);
      toggle?.setAttribute("aria-expanded", String(isOpen));
      toggle?.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
      document.body.classList.toggle("menu-open", isOpen);
      if (links) {
        links.classList.toggle("mobile-open", isOpen);
        // Accessibility: prevent focus on hidden links
        if (window.innerWidth <= 1152) {
           links.style.visibility = isOpen ? "visible" : "hidden";
        } else {
           links.style.visibility = "visible";
        }
      }
    };

    const onToggle = () => {
      const isOpen = !links?.classList.contains("mobile-open");
      updateMenuState(isOpen);
    };

    const closeMenu = () => {
      updateMenuState(false);
    };

    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    toggle?.addEventListener("click", onToggle);
    links?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    
    // Active link highlighting
    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    links?.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
      const href = new URL(link.href, window.location.origin).pathname.replace(/\/$/, "") || "/";
      const active = href === "/" ? currentPath === "/" : currentPath === href || currentPath.startsWith(`${href}/`);
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    
    window.addEventListener("keydown", closeOnEsc);

    const closeOnResize = () => {
      if (window.innerWidth > 1152) {
        closeMenu();
        if (links) links.style.visibility = "visible";
      } else {
        if (links && !links.classList.contains("mobile-open")) {
          links.style.visibility = "hidden";
        }
      }
    };
    window.addEventListener("resize", closeOnResize);
    
    // Initial call for visibility
    closeOnResize();

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      toggle?.removeEventListener("click", onToggle);
      links?.querySelectorAll("a").forEach((link) => link.removeEventListener("click", closeMenu));
      window.removeEventListener("keydown", closeOnEsc);
      window.removeEventListener("resize", closeOnResize);
      document.body.classList.remove("menu-open");
    };
  }, deps);
}
