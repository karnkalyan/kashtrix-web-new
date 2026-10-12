"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoWaveFieldProps {
  className?: string;
  variant?: "light" | "dark" | "lavender";
}

export const LogoWaveField: React.FC<LogoWaveFieldProps> = ({
  className,
  variant = "light",
}) => {
  const strokeColor =
    variant === "dark"
      ? "rgba(244, 238, 255, 0.08)"
      : variant === "lavender"
      ? "rgba(74, 27, 122, 0.12)"
      : "rgba(43, 13, 58, 0.06)";

  const accentColor = variant === "dark" ? "rgba(225, 29, 114, 0.3)" : "rgba(225, 29, 114, 0.18)";

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      <svg
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
      >
        <motion.path
          d="M-100 450 C 200 450, 350 150, 720 150 C 1090 150, 1250 380, 1540 380"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M-100 280 C 250 280, 400 480, 780 480 C 1160 480, 1300 200, 1540 200"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.3, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.path
          d="M-100 180 C 300 180, 450 320, 840 320 C 1230 320, 1350 100, 1540 100"
          stroke={accentColor}
          strokeWidth="1.2"
          strokeDasharray="6 6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, ease: "easeInOut", delay: 0.4 }}
        />
      </svg>
    </div>
  );
};
