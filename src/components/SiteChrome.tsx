import { useEffect } from "react";
import SiteNav from "@/components/rckt/SiteNav";
import RcktSiteFooter from "@/components/rckt/SiteFooter";

/** Navegación y pie compartidos con la home, más las animaciones del sitio. */

export function SiteHeader() {
  return <SiteNav />;
}


export function SiteFooter() {
  return <RcktSiteFooter />;
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
