"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroParticleSphereProps {
  className?: string;
}

interface Particle3D {
  theta: number;
  phi: number;
  r: number;
  baseR: number;
  color: string;
  size: number;
  speedDelta: number;
  isAccent?: boolean;
}

interface Arc3D {
  p1Index: number;
  p2Index: number;
}

export const HeroParticleSphere: React.FC<HeroParticleSphereProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate ~600 sphere points
    const numParticles = reducedMotion ? 180 : 600;
    const particles: Particle3D[] = [];
    const baseRadius = Math.min(width, height) * 0.36;

    const colors = ["#F4EEFF", "#DCCBFF", "#2B0D3A", "#4A1B7A"];

    for (let i = 0; i < numParticles; i++) {
      // Fibonacci sphere distribution for uniform 3D point layout
      const phi = Math.acos(1 - 2 * ((i + 0.5) / numParticles));
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const isAccent = i === 12; // Exactly one prominent AI Magenta accent node
      const color = isAccent ? "#E11D72" : colors[i % colors.length];
      const size = isAccent ? 5.5 : i % 15 === 0 ? 3.5 : 1.8;

      particles.push({
        theta,
        phi,
        r: baseRadius,
        baseR: baseRadius,
        color,
        size,
        speedDelta: Math.random() * Math.PI * 2,
        isAccent,
      });
    }

    // Generate ~25 curved connection arcs
    const arcs: Arc3D[] = [];
    for (let i = 0; i < 28; i++) {
      arcs.push({
        p1Index: Math.floor(Math.random() * numParticles),
        p2Index: Math.floor(Math.random() * numParticles),
      });
    }

    let rotX = 0.2;
    let rotY = 0;
    let targetRotX = 0.2;
    let targetRotY = 0;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = mx * 0.8;
      targetRotX = 0.2 + my * 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;
      if (!reducedMotion) {
        rotY += 0.004;
        time += 0.025;
      }

      const cx = width / 2;
      const cy = height / 2;

      // Project 3D points
      const projected: { x: number; y: number; z: number; color: string; size: number; isAccent?: boolean }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Waving deformation
        const wave = Math.sin(p.theta * 3 + time + p.speedDelta) * (baseRadius * 0.06);
        const currentR = p.baseR + wave;

        let x3d = currentR * Math.sin(p.phi) * Math.cos(p.theta);
        let y3d = currentR * Math.sin(p.phi) * Math.sin(p.theta);
        let z3d = currentR * Math.cos(p.phi);

        // Rotate X
        const y1 = y3d * Math.cos(rotX) - z3d * Math.sin(rotX);
        const z1 = y3d * Math.sin(rotX) + z3d * Math.cos(rotX);
        y3d = y1;
        z3d = z1;

        // Rotate Y
        const x2 = x3d * Math.cos(rotY) + z3d * Math.sin(rotY);
        const z2 = -x3d * Math.sin(rotY) + z3d * Math.cos(rotY);
        x3d = x2;
        z3d = z2;

        // Perspective projection
        const focalLength = 700;
        const scale = focalLength / (focalLength + z3d + baseRadius * 1.5);
        const px = cx + x3d * scale;
        const py = cy + y3d * scale;

        projected.push({
          x: px,
          y: py,
          z: z3d,
          color: p.color,
          size: p.size * scale,
          isAccent: p.isAccent,
        });
      }

      // Draw connection arcs
      ctx.strokeStyle = "rgba(74, 27, 122, 0.22)";
      ctx.lineWidth = 1.2;
      for (const arc of arcs) {
        const pt1 = projected[arc.p1Index];
        const pt2 = projected[arc.p2Index];
        if (pt1 && pt2 && pt1.z < baseRadius * 0.4 && pt2.z < baseRadius * 0.4) {
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          // Curved arc through center point offset
          const midX = (pt1.x + pt2.x) / 2;
          const midY = (pt1.y + pt2.y) / 2 - 15;
          ctx.quadraticCurveTo(midX, midY, pt2.x, pt2.y);
          ctx.stroke();
        }
      }

      // Sort points back to front for accurate Z depth drawing
      projected.sort((a, b) => b.z - a.z);

      // Draw points
      for (const pt of projected) {
        const depthAlpha = Math.max(0.2, Math.min(1, (baseRadius - pt.z) / (baseRadius * 2)));
        ctx.globalAlpha = depthAlpha;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.fill();

        // Draw glow for accent node
        if (pt.isAccent) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(225, 29, 114, 0.25)";
          ctx.fill();
        }
      }

      // Central AI Core Node
      ctx.globalAlpha = 0.95;
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#2B0D3A";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#4A1B7A";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#E11D72";
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [reducedMotion]);

  return (
    <div className={cn("relative w-full h-[450px] md:h-[550px] flex items-center justify-center", className)}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-transparent to-[#F8F7FA]/40" />
    </div>
  );
};
