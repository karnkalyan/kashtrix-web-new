"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedIconProps {
  name: keyof typeof LucideIcons;
  selected?: boolean;
  aiAccent?: boolean;
  size?: number;
  className?: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  name,
  selected = false,
  aiAccent = false,
  size = 20,
  className,
}) => {
  const IconComponent = (LucideIcons[name] as React.ComponentType<LucideIcons.LucideProps>) || LucideIcons.Activity;

  return (
    <div className={cn("relative inline-flex items-center justify-center shrink-0 transition-all duration-300", className)}>
      <IconComponent
        size={size}
        strokeWidth={1.75}
        className={cn(
          "transition-colors duration-200",
          selected ? "text-[var(--text-primary)]" : "text-[var(--text-link)]"
        )}
      />
      {aiAccent && (
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E11D72] shadow-2xs shadow-[#E11D72]/40" />
      )}
    </div>
  );
};
