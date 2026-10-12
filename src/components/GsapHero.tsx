"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export function GsapHero({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!scope.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-hero-reveal]", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.085, ease: "power3.out" });
      gsap.fromTo("[data-hero-card]", { y: 36, rotateX: 5, opacity: 0 }, { y: 0, rotateX: 0, opacity: 1, duration: 1.15, delay: 0.2, ease: "power3.out" });
    }, scope);
    return () => ctx.revert();
  }, []);
  return <div ref={scope}>{children}</div>;
}
