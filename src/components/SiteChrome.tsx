import { useEffect } from "react";
import logoDarkAsset from "@/assets/rckt-logo-dark.png";

/** Navegación y pie compartidos con la home, más las animaciones del sitio. */

function ThemeSwitch({ suffix = "" }: { suffix?: string }) {
  return (
    <div className="theme-switch hero-theme-switch">
      <button id={`themeLight${suffix}`} className="active" type="button">
        Claro
      </button>
      <button id={`themeDark${suffix}`} type="button">
        Oscuro
      </button>
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
              <button aria-label="Cerrar menú" className="nav-close" id="navClose" type="button">
                ✕
              </button>
              <a href="/soluciones">Soluciones</a>
              <a href="/sistemas">Sistemas</a>
              <a href="/sectores">Sectores</a>
              <a href="/nosotros">Nosotros</a>
              <a href="/blog">Blog</a>

              <div className="nav-menu-footer">
                <ThemeSwitch suffix="Mobile" />
                <a className="btn hero-nav-cta nav-menu-cta" href="/sistemas/revenue-diagnostic">
                  Pedir diagnóstico
                </a>
              </div>
            </div>
          </div>
          <div className="nav-capsule nav-capsule-right nav-right">
            <div className="nav-right-desktop">
              <ThemeSwitch />
            </div>
            <a className="btn hero-nav-cta" href="/sistemas/revenue-diagnostic">
              Pedir diagnóstico
            </a>
            <button aria-label="Abrir menú" className="nav-toggle" id="navToggle">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </div>
      <div className="nav-overlay" id="navOverlay" />
    </header>
  );
}


export function SiteFooter() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div>
            <a className="logo" href="/">
              <img alt="RCKT" src={logoDarkAsset} />
            </a>
            <p>Menos ruido, más crecimiento.</p>
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
            <h5 style={{ marginTop: 26 }}>Correo</h5>
            <ul>
              <li>
                <a href="mailto:hola@rckt.lat">hola@rckt.lat</a>
              </li>
            </ul>
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
    const updateMenuLock = () => {
      const open = links?.classList.contains("mobile-open");
      document.body.classList.toggle("menu-open", Boolean(open));
      toggle?.classList.toggle("mobile-open", Boolean(open));
    };
    const onToggle = () => {
      links?.classList.toggle("mobile-open");
      updateMenuLock();
    };
    const closeMenu = () => {
      links?.classList.remove("mobile-open");
      updateMenuLock();
    };
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const closeBtn = document.getElementById("navClose");
    const overlay = document.getElementById("navOverlay");
    toggle?.addEventListener("click", onToggle);
    closeBtn?.addEventListener("click", closeMenu);
    overlay?.addEventListener("click", closeMenu);
    links?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("keydown", closeOnEsc);

    const closeOnResize = () => {
      if (window.innerWidth > 1152) closeMenu();
    };
    window.addEventListener("resize", closeOnResize);

    const light = document.getElementById("themeLight");
    const dark = document.getElementById("themeDark");
    const lightMobile = document.getElementById("themeLightMobile");
    const darkMobile = document.getElementById("themeDarkMobile");
    const setLight = () => {
      document.documentElement.removeAttribute("data-theme");
      [light, lightMobile].forEach((b) => b?.classList.add("active"));
      [dark, darkMobile].forEach((b) => b?.classList.remove("active"));
    };
    const setDark = () => {
      document.documentElement.setAttribute("data-theme", "dark");
      [dark, darkMobile].forEach((b) => b?.classList.add("active"));
      [light, lightMobile].forEach((b) => b?.classList.remove("active"));
    };
    [light, lightMobile].forEach((b) => b?.addEventListener("click", setLight));
    [dark, darkMobile].forEach((b) => b?.addEventListener("click", setDark));

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      toggle?.removeEventListener("click", onToggle);
      closeBtn?.removeEventListener("click", closeMenu);
      overlay?.removeEventListener("click", closeMenu);
      links?.querySelectorAll("a").forEach((link) => link.removeEventListener("click", closeMenu));
      window.removeEventListener("keydown", closeOnEsc);
      window.removeEventListener("resize", closeOnResize);
      [light, lightMobile].forEach((b) => b?.removeEventListener("click", setLight));
      [dark, darkMobile].forEach((b) => b?.removeEventListener("click", setDark));
      document.documentElement.removeAttribute("data-theme");
      document.body.classList.remove("menu-open");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
