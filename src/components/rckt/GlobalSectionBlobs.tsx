import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const SECTION_SELECTOR = "main section";
const BLOB_CLASS = "section-blob";
type BlobSpec = {
  type: "strong" | "soft";
  x: number;
  y: number;
};

const layouts: BlobSpec[][] = [
  [{ type: "strong", x: 85, y: 20 }, { type: "soft", x: 10, y: 80 }, { type: "soft", x: 50, y: 55 }],
  [{ type: "strong", x: 8, y: 50 }, { type: "soft", x: 90, y: 15 }, { type: "soft", x: 50, y: 55 }],
];

const removeBlobs = (section: HTMLElement) => {
  section.querySelectorAll<HTMLElement>(`:scope > .${BLOB_CLASS}`).forEach((blob) => blob.remove());
};

const hasOnlyOrangeContent = (section: HTMLElement) => {
  const orangeBands = Array.from(section.querySelectorAll<HTMLElement>(".band--orange"));

  if (orangeBands.length > 0) {
    const copy = section.cloneNode(true) as HTMLElement;
    copy.querySelectorAll(`.${BLOB_CLASS}, .band--orange`).forEach((element) => element.remove());
    const remainingText = copy.textContent?.replace(/\s+/g, " ").trim() ?? "";
    const remainingContent = copy.querySelector(
      "img, picture, video, form, article, ul, ol, table",
    );
    if (remainingText.length === 0 && remainingContent === null) return true;
  }

  const contentChildren = Array.from(section.children).filter(
    (child) =>
      !child.classList.contains(BLOB_CLASS) && child.getAttribute("aria-hidden") !== "true",
  ) as HTMLElement[];

  if (contentChildren.length !== 1) return false;
  const onlyChild = contentChildren[0];
  if (!onlyChild) return false;
  const sectionRect = section.getBoundingClientRect();
  const childRect = onlyChild.getBoundingClientRect();
  const background = `${onlyChild.style.background} ${window.getComputedStyle(onlyChild).backgroundImage}`;
  const isOrange = background.includes("252, 92, 31") || background.includes("#fc5c1f");
  const coversSection =
    childRect.width >= sectionRect.width * 0.9 && childRect.height >= sectionRect.height * 0.9;
  return isOrange && coversSection;
};

const isExcluded = (section: HTMLElement) =>
  section.matches(
    ".system-page-hero, #top, .general-cta, .band--orange, .hero, .subpage-hero, .cta-final, .sales-rule-band, .system-orange-statement, .engine-metric-band",
  ) ||
  section.querySelector(
    ":scope > .hero-photo, :scope > .subpage-hero-photo, :scope > .system-page-hero__photo, :scope > .cta-final-photo",
  ) !== null ||
  hasOnlyOrangeContent(section);

export default function GlobalSectionBlobs() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    let frame = 0;
    let timer = 0;
    let sections: HTMLElement[] = [];

    const classify = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const contentIndexes = new Map<HTMLElement, number>();

        sections.forEach((section) => {
          const excluded = isExcluded(section);
          const main = section.closest("main");
          section.classList.toggle("blob-section", !excluded);
          section.toggleAttribute("data-no-blobs", excluded);
          removeBlobs(section);

          if (excluded) {
            section.removeAttribute("data-blob-count");
            section.removeAttribute("data-blob-pattern");
            section.removeAttribute("data-content-tone");
            return;
          }

          const index = main ? (contentIndexes.get(main) ?? 0) : 0;
          if (main) contentIndexes.set(main, index + 1);
          const height = section.getBoundingClientRect().height;
          const count: 1 | 2 | 3 = height < 450 ? 1 : height <= 1100 ? 2 : 3;
          const pattern = index % 2;
          const specs = layouts[pattern].slice(0, count);
          section.dataset.contentTone = pattern === 0 ? "base" : "alternate";
          section.dataset.blobCount = String(count);
          section.dataset.blobPattern = String(pattern);
          specs.forEach((spec, blobIndex) => {
            const blob = document.createElement("span");
            blob.className = `${BLOB_CLASS} ${BLOB_CLASS}--${spec.type} pointer-events-none`;
            blob.setAttribute("aria-hidden", "true");
            blob.dataset.blobPosition = blobIndex === 2 ? "interior" : "edge";
            blob.dataset.blobIndex = String(blobIndex);
            blob.style.setProperty("--blob-x", `${spec.x}%`);
            blob.style.setProperty("--blob-y", `${spec.y}%`);
            section.append(blob);
          });
        });
      });
    };

    const connect = () => {
      sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
      const observer = new ResizeObserver(classify);
      sections.forEach((section) => observer.observe(section));
      classify();
      return observer;
    };

    let observer: ResizeObserver | null = null;
    const connectWhenHydrated = () => {
      timer = window.setTimeout(() => {
        observer = connect();
      }, 750);
    };
    window.addEventListener("load", connectWhenHydrated, { once: true });
    if (document.readyState === "complete") {
      frame = requestAnimationFrame(connectWhenHydrated);
    }
    window.addEventListener("resize", classify, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("load", connectWhenHydrated);
      observer?.disconnect();
      window.removeEventListener("resize", classify);
      sections.forEach((section) => {
        removeBlobs(section);
        section.classList.remove("blob-section");
        section.removeAttribute("data-blob-count");
        section.removeAttribute("data-blob-pattern");
        section.removeAttribute("data-no-blobs");
        section.removeAttribute("data-content-tone");
      });
    };
  }, [pathname]);

  return null;
}
