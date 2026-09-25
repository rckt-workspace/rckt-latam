import { useEffect } from "react";
import logoDarkAsset from "@/assets/rckt-logo-dark.png";
import ThemeToggle from "@/components/rckt/ThemeToggle";
import SiteNav from "@/components/rckt/SiteNav";

/** Navegación y pie compartidos con la home, más las animaciones del sitio. */

export function SiteHeader() {
  return <SiteNav />;
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

    return () => {
      observer?.disconnect();
    };
  }, deps);
}
