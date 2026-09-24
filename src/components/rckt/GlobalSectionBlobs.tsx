import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const SECTION_SELECTOR = ".rckt-site main > section";
const BLOB_CLASS = "section-blob";

type BlobSpec = { strength: "strong" | "soft"; x: number; y: number; interior?: boolean };

const layouts: Record<1 | 2 | 3, BlobSpec[][]> = {
  1: [
    [{ strength: "strong", x: 14, y: 52 }],
    [{ strength: "soft", x: 86, y: 48 }],
  ],
  2: [
    [
      { strength: "soft", x: 14, y: 28 },
      { strength: "strong", x: 58, y: 68, interior: true },
    ],
    [
      { strength: "strong", x: 86, y: 30 },
      { strength: "soft", x: 42, y: 64, interior: true },
    ],
  ],
  3: [
    [
      { strength: "strong", x: 14, y: 22 },
      { strength: "soft", x: 56, y: 52, interior: true },
      { strength: "strong", x: 86, y: 78 },
    ],
    [
      { strength: "soft", x: 86, y: 20 },
      { strength: "strong", x: 44, y: 50, interior: true },
      { strength: "soft", x: 14, y: 80 },
    ],
  ],
};

function removeBlobs(section: HTMLElement) {
  section.querySelectorAll<HTMLElement>(`:scope > .${BLOB_CLASS}`).forEach((blob) => blob.remove());
}

function isExcluded(section: HTMLElement) {
  return (
    section.matches(".hero, .subpage-hero, .cta-final, .band--orange") ||
    section.querySelector(":scope > .hero-photo, :scope > .subpage-hero-photo, :scope > .cta-final-photo") !== null
  );
}

export default function GlobalSectionBlobs() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    let frame = 0;
    let observer: ResizeObserver | null = null;
    let sections: HTMLElement[] = [];

    const classify = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const mobile = window.innerWidth < 768;
        const mediumThreshold = mobile ? 360 : 450;
        const longThreshold = mobile ? 880 : 1100;
        let patternIndex = 0;

        sections.forEach((section) => {
          removeBlobs(section);
          const excluded = isExcluded(section);
          section.classList.toggle("blob-section", !excluded);
          section.toggleAttribute("data-no-blobs", excluded);
          if (excluded) return;

          const height = section.getBoundingClientRect().height;
          const count: 1 | 2 | 3 = height < mediumThreshold ? 1 : height <= longThreshold ? 2 : 3;
          const specs = layouts[count][patternIndex % 2];
          section.dataset.blobCount = String(count);
          specs.forEach((spec) => {
            const size = spec.strength === "strong" ? 430 : 620;
            const edgeX = spec.x < 50 ? size * 0.25 : section.clientWidth - size * 0.25;
            const blob = document.createElement("span");
            blob.className = `${BLOB_CLASS} ${BLOB_CLASS}--${spec.strength}`;
            blob.setAttribute("aria-hidden", "true");
            blob.dataset.position = spec.interior ? "interior" : "edge";
            blob.style.setProperty("--blob-x", spec.interior ? `${spec.x}%` : `${edgeX}px`);
            blob.style.setProperty("--blob-y", `${spec.y}%`);
            section.append(blob);
          });
          patternIndex += 1;
        });
      });
    };

    const timer = window.setTimeout(() => {
      sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
      observer = new ResizeObserver(classify);
      sections.forEach((section) => observer?.observe(section));
      classify();
    }, 100);

    window.addEventListener("resize", classify, { passive: true });
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", classify);
      sections.forEach((section) => {
        removeBlobs(section);
        section.classList.remove("blob-section");
        section.removeAttribute("data-no-blobs");
        section.removeAttribute("data-blob-count");
      });
    };
  }, [pathname]);

  return null;
}