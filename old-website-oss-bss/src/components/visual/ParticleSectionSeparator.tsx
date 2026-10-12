"use client";

import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 34 }, (_, index) => ({
  x: 24 + ((index * 97) % 1152),
  y: 28 + ((index * 43 + (index % 4) * 17) % 82),
  radius: index % 9 === 0 ? 4.5 : index % 4 === 0 ? 3 : 2,
  delay: (index % 12) * 0.045,
  magenta: index % 7 === 0,
}));

export function ParticleSectionSeparator() {
  return (
    <motion.div
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.55 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.025 } },
      }}
      className="relative h-28 w-full overflow-hidden bg-[linear-gradient(to_bottom,#FFFFFF,#F8F7FA)] dark:bg-[linear-gradient(to_bottom,#09050F,#120819)] sm:h-32"
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[8%] right-[8%] top-1/2 h-px origin-center bg-gradient-to-r from-transparent via-[#76549A]/30 to-transparent"
      />

      <svg viewBox="0 0 1200 140" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <motion.path
          d="M-30 84 C170 20 320 124 510 66 S850 20 1230 78"
          fill="none"
          stroke="#76549A"
          strokeOpacity="0.18"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.path
          d="M-20 102 C210 48 350 126 570 78 S920 38 1220 94"
          fill="none"
          stroke="#E11D72"
          strokeOpacity="0.15"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 1.7, delay: 0.12, ease: "easeOut" }}
        />

        {PARTICLES.map((particle, index) => (
          <motion.circle
            key={`${particle.x}-${particle.y}`}
            cx={particle.x}
            cy={particle.y}
            r={particle.radius}
            fill={particle.magenta ? "#E11D72" : index % 3 === 0 ? "#4A1B7A" : "#76549A"}
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: particle.magenta ? 0.78 : 0.52,
                scale: 1,
                transition: { delay: particle.delay, type: "spring", stiffness: 180, damping: 16 },
              },
            }}
          />
        ))}
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.45, type: "spring", stiffness: 160 }}
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#E11D72] shadow-[0_0_0_7px_rgba(225,29,114,0.10),0_0_24px_rgba(225,29,114,0.28)] dark:border-[#09050F]"
      />
    </motion.div>
  );
}
