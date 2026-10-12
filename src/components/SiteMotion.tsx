"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SiteMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        document.querySelectorAll<HTMLElement>("main .hardware-mockup, main .product-stage, main img[src*='media']").forEach((element) => {
          // Rotate the complete device/frame; avoid applying a second rotation to its image.
          if (element.tagName === "IMG" && element.closest(".hardware-mockup, .product-stage")) return;
          gsap.fromTo(element,
            { rotationY: -9, rotationX: 3, rotationZ: -1.5, transformPerspective: 1200 },
            { rotationY: 9, rotationX: -3, rotationZ: 1.5, ease: "none",
              scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 1 } },
          );
        });
        gsap.fromTo(".site-hero h1", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: "power3.out" });
      });
      const refresh = () => ScrollTrigger.refresh();
      const images = Array.from(document.querySelectorAll<HTMLImageElement>("main img"));
      images.forEach((img) => img.addEventListener("load", refresh));
      const frame = requestAnimationFrame(refresh);
      return () => {
        cancelAnimationFrame(frame);
        images.forEach((img) => img.removeEventListener("load", refresh));
        ctx.revert();
      };
    });
    return () => media.revert();
  }, [pathname]);

  return null;
}
