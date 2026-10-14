"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoNodePulseProps {
  color?: "magenta" | "purple" | "plum";
  size?: "sm" | "md" | "lg";
  className?: string;
  active?: boolean;
}

export const LogoNodePulse: React.FC<LogoNodePulseProps> = ({
  color = "magenta",
  size = "md",
  className,
  active = true,
}) => {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const colorClasses = {
    magenta: "bg-[#E11D72]",
    purple: "bg-[#4A1B7A]",
    plum: "bg-[#2B0D3A]",
  };

  const ringColorClasses = {
    magenta: "border-[#E11D72]/40",
    purple: "border-[var(--border-brand)]/40",
    plum: "border-[#2B0D3A]/40",
  };

  return (
    <span className={cn("relative inline-flex items-center justify-center", className)}>
      {active && (
        <span
          className={cn(
            "absolute rounded-full animate-ping opacity-75 border",
            sizeClasses[size],
            ringColorClasses[color]
          )}
        />
      )}
      <span
        className={cn(
          "relative inline-block rounded-full shadow-sm transition-transform duration-300",
          sizeClasses[size],
          colorClasses[color],
          active ? "scale-105" : "opacity-70 scale-95"
        )}
      />
    </span>
  );
};
