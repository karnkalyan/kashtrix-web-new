"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="site-page relative w-full"
      >
        {/* Animated Top Flowing Line on route change */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2B0D3A] via-[#4A1B7A] to-[#E11D72] z-50 pointer-events-none origin-left"
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
