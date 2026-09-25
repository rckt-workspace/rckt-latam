import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  threshold?: number;
  rootMargin?: string;
  fallbackMs?: number;
};

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: number | UseInViewOptions = {},
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const threshold = typeof options === "number" ? options : (options.threshold ?? 0.15);
  const rootMargin =
    typeof options === "number" ? "0px 0px -5% 0px" : (options.rootMargin ?? "0px 0px -5% 0px");
  const fallbackMs = typeof options === "number" ? undefined : options.fallbackMs;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = element.getBoundingClientRect();
    if (reduceMotion || (rect.top < window.innerHeight * 0.95 && rect.bottom > 0)) {
      setInView(true);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(element);
    const fallback = fallbackMs ? window.setTimeout(() => setInView(true), fallbackMs) : undefined;
    return () => {
      observer.disconnect();
      if (fallback !== undefined) window.clearTimeout(fallback);
    };
  }, [fallbackMs, rootMargin, threshold]);

  return { ref, inView };
}

export default useInView;
