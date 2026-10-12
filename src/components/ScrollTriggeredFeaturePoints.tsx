"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface ScrollTriggeredFeaturePointsProps {
  items: readonly string[];
  accent?: string;
  className?: string;
}

export function ScrollTriggeredFeaturePoints({
  items,
  accent = "#6f2b8f",
  className = "",
}: ScrollTriggeredFeaturePointsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`space-y-3 ${className}`}>
      {items.map((item, idx) => {
        let prefix: string | null = null;
        let details = item;
        const colonIdx = item.indexOf(":");
        const dashIdx = item.indexOf(" — ");
        if (colonIdx !== -1) {
          prefix = item.slice(0, colonIdx).trim();
          details = item.slice(colonIdx + 1).trim();
        } else if (dashIdx !== -1) {
          prefix = item.slice(0, dashIdx).trim();
          details = item.slice(dashIdx + 3).trim();
        }

        return (
          <div
            key={item}
            style={{
              transitionDelay: isVisible ? `${idx * 110}ms` : "0ms",
            }}
            className={`group/point flex items-start gap-3 rounded-lg -mx-2 px-2.5 py-1.5 text-xs sm:text-sm leading-6 transition-all duration-500 ease-out hover:bg-[#f6eef9] dark:hover:bg-[#220d33]/80 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0 pointer-events-none"
            }`}
          >
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4b1b63]/10 dark:bg-[#c084fc]/20 text-[#6f2b8f] dark:text-[#c084fc] transition-transform duration-200 group-hover/point:scale-110 shadow-sm"
              style={{ color: accent }}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
            </span>
            <div className="flex-1">
              {prefix && (
                <span className="font-semibold text-[#171219] dark:text-white mr-1.5">
                  {prefix}:
                </span>
              )}
              <span className="text-[#59505d] dark:text-[#cfc4d6]">
                {details}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
