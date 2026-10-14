"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "wide" | "stacked" | "icon" | "text";
  onComplete?: () => void;
}

const sizeClasses = {
  sm: "h-7 w-[142px]",
  md: "h-9 w-[184px]",
  lg: "h-12 w-[245px]",
  xl: "h-20 w-[300px]",
};

const logoSources = {
  wide: "/logo/wide-logo.png",
  stacked: "/logo/logo.png",
  icon: "/logo/icons-logo.png",
  text: "/logo/text-logo.png",
};

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  className,
  showWordmark = true,
  size = "md",
  variant,
  onComplete,
}) => {
  const selectedVariant = variant ?? (showWordmark ? "wide" : "icon");

  useEffect(() => {
    const timer = window.setTimeout(() => onComplete?.(), 700);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      role="img"
      aria-label="Kashtrix"
      className={cn(
        "relative block shrink-0 cursor-pointer",
        sizeClasses[size],
        selectedVariant === "stacked" && "!h-28 !w-60",
        selectedVariant === "icon" && "!w-20",
        className,
      )}
      initial={{ opacity: 0, y: -4, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.025 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={logoSources[selectedVariant]}
        alt="Kashtrix"
        fill
        priority={size === "md"}
        sizes="(max-width: 768px) 150px, 250px"
        className="kashtrix-logo-image object-contain object-left transition-[filter] duration-300"
      />
    </motion.div>
  );
};
