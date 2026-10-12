"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ScrollNetworkAccent({ side = "right", className }: { side?: "left" | "right"; className?: string }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, x: side === "right" ? 44 : -44, scale: 0.92 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "pointer-events-none absolute top-12 z-0 hidden h-64 w-64 lg:block",
        side === "right" ? "-right-20" : "-left-20",
        className,
      )}
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-full w-full rounded-[42%_58%_55%_45%/45%_42%_58%_55%] border border-[var(--border-brand)]/15 bg-[radial-gradient(circle_at_35%_35%,rgba(225,29,114,.10),transparent_42%),linear-gradient(145deg,rgba(244,238,255,.7),rgba(255,255,255,.15))] dark:border-white/10 dark:bg-[radial-gradient(circle_at_35%_35%,rgba(225,29,114,.14),transparent_42%),linear-gradient(145deg,rgba(74,27,122,.18),rgba(9,5,15,.05))]"
      >
        <svg viewBox="0 0 256 256" className="absolute inset-0 h-full w-full text-[var(--text-link)]/25 dark:text-[var(--text-link)]/20" fill="none">
          <motion.path d="M22 154 C70 70 129 204 232 84" stroke="currentColor" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: .25 }} />
          <motion.path d="M31 185 C91 115 144 188 223 119" stroke="#E11D72" strokeOpacity=".28" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.3, delay: .45 }} />
          {[[42,142],[91,117],[137,166],[184,134],[220,93]].map(([cx,cy], i) => <motion.circle key={i} cx={cx} cy={cy} r={i === 2 ? 5 : 3.5} fill={i % 2 ? "#E11D72" : "currentColor"} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: .55 + i * .1, type: "spring" }} />)}
        </svg>
      </motion.div>
    </motion.div>
  );
}
