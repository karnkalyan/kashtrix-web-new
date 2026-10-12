"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  accent?: string;
}

export function FaqAccordion({ items, accent = "#6f2b8f" }: FaqAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#ece7ed] dark:divide-white/10 border-y border-[#ece7ed] dark:border-white/10">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={item.question} className="py-4">
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="flex w-full items-center justify-between text-left transition hover:text-[#6f2b8f] dark:hover:text-[#c084fc]"
              aria-expanded={isOpen}
            >
              <h3 className="text-base font-semibold text-[#171219] dark:text-white">
                {item.question}
              </h3>
              <ChevronDown
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                style={{ color: isOpen ? accent : "#8c848f" }}
              />
            </button>
            {isOpen && (
              <p className="mt-3 text-sm leading-6 text-[#69616e] dark:text-[#bdaec4]">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
