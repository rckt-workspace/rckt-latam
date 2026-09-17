import { useEffect } from "react";
import logoDarkAsset from "@/assets/rckt-logo-dark.png.asset.json";

/** Navegación y pie compartidos con la home, más las animaciones del sitio. */

export function SiteHeader() {
  return (
    <header>
      <div className="container">
        <nav>
          <a className="logo" href="/">
            <img alt="RCKT" src={logoDarkAsset.url} />
          </a>
          <div className="nav-links">
            <a href="/#sistema">Sistema</a>
            <a href="/#servicios">Servicios</a>
            <a href="/#quienes">Nosotros</a>
            <a href="/#metodo">Método</a>
            <a href="/#faq">FAQ</a>
            <a href="/trabaja-con-nosotros">Trabaja con nosotros</a>
          </div>
          <div className="nav-right">
            <div className="theme-switch hero-theme-switch">
              <button id="themeLight" className="active" type="button">Claro</button>
              <button id="themeDark" type="button">Oscuro</button>
            </div>
            <a className="btn hero-nav-cta btn-sm" href="/#contacto">Solicitar diagnóstico</a>
            <button aria-label="Abrir menú" className="nav-toggle" id="navToggle">
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>
      </div>
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
              <img alt="RCKT" src={logoDarkAsset.url} />
            </a>
            <p>Menos ruido, más crecimiento.</p>
          </div>
          <div className="footer-col">
            <h5>Navegar</h5>
            <ul>
              <li><a href="/#sistema">Sistema</a></li>
              <li><a href="/#servicios">Servicios</a></li>
              <li><a href="/#metodo">Método</a></li>
              <li><a href="/#faq">FAQ</a></li>
              <li><a href="/#contacto">Contacto</a></li>
              <li><a href="/trabaja-con-nosotros">Trabaja con nosotros</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              <li><a href="/aviso-legal.pdf" download>Aviso legal</a></li>
              <li><a href="/privacidad.pdf" download>Privacidad</a></li>
              <li><a href="/cookies.pdf" download>Cookies</a></li>
              <li><a href="/politica-tratamiento-datos.pdf" download>Política de Tratamiento de Datos</a></li>
            </ul>
            <h5 style={{ marginTop: 26 }}>Correo</h5>
            <ul><li><a href="mailto:hola@rckt.es">hola@rckt.es</a></li></ul>
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
    const onToggle = () => links?.classList.toggle("mobile-open");
    const closeMenu = () => links?.classList.remove("mobile-open");
    toggle?.addEventListener("click", onToggle);
    links?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    const light = document.getElementById("themeLight");
    const dark = document.getElementById("themeDark");
    const setLight = () => {
      document.documentElement.removeAttribute("data-theme");
      light?.classList.add("active");
      dark?.classList.remove("active");
    };
    const setDark = () => {
      document.documentElement.setAttribute("data-theme", "dark");
      dark?.classList.add("active");
      light?.classList.remove("active");
    };
    light?.addEventListener("click", setLight);
    dark?.addEventListener("click", setDark);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      toggle?.removeEventListener("click", onToggle);
      links?.querySelectorAll("a").forEach((link) => link.removeEventListener("click", closeMenu));
      light?.removeEventListener("click", setLight);
      dark?.removeEventListener("click", setDark);
      document.documentElement.removeAttribute("data-theme");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
