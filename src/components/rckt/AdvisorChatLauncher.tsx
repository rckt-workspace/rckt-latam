import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import AdvisorChat from "./AdvisorChat";

const AdvisorChatLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("rckt:advisor-open", handleOpen);
    return () => {
      window.removeEventListener("rckt:advisor-open", handleOpen);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] md:bottom-8 md:right-8">
      {/* Chat container - always mounted, visibility controlled by CSS */}
      <div
        ref={panelRef}
        className={
          isOpen
            ? "relative w-[410px] max-w-[calc(100vw-24px)]"
            : "hidden"
        }
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute -top-3 -right-3 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-md text-zinc-600 transition hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
          aria-label="Cerrar asesor"
        >
          <X className="h-4 w-4" />
        </button>
        <AdvisorChat />
      </div>

      {/* Launcher button - only shown when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-zinc-900 text-white px-6 py-3.5 text-[15px] font-semibold shadow-lg hover:shadow-xl hover:bg-zinc-800 transition-all dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          aria-label="Abrir asesor RCKT LATAM"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white dark:bg-zinc-900 opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white dark:bg-zinc-900" />
          </span>
          Asesor RCKT LATAM
        </button>
      )}
    </div>
  );
};

export default AdvisorChatLauncher;
