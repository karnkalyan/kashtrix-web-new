"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Check } from "lucide-react";

export function AnimatedBulletList({ items, accent = "#6f2b8f" }: { items: readonly string[]; accent?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!ref.current || (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
      if (ref.current) {
        ref.current.querySelectorAll("li").forEach(li => {
          (li as HTMLElement).style.opacity = "1";
        });
      }
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || !ref.current) return;
      animate(ref.current.querySelectorAll("li"), {
        opacity: [0, 1],
        translateY: [12, 0],
        delay: stagger(85),
        duration: 540,
        ease: "outQuad"
      });
      observer.disconnect();
    }, { threshold: 0.15 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <ul ref={ref} className="grid gap-3">
      {items.map((item) => {
        const colonIdx = item.indexOf(":");
        const hasPrefix = colonIdx !== -1;
        const prefix = hasPrefix ? item.slice(0, colonIdx).trim() : null;
        const details = hasPrefix ? item.slice(colonIdx + 1).trim() : item;

        return (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-6 text-[#5b5361] dark:text-[#cdc2d5] group/item hover:bg-[#f8f4fb] dark:hover:bg-[#200d33]/60 -mx-2 px-2 py-1 rounded-md transition-colors"
            style={{ opacity: 0 }}
          >
            <span
              className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover/item:scale-110 shadow-xs"
              style={{ background: `${accent}18`, color: accent }}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.8} />
            </span>
            <div className="flex-1">
              {prefix && (
                <strong className="font-semibold text-[#171219] dark:text-white mr-1.5">
                  {prefix}:
                </strong>
              )}
              <span>{details}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

