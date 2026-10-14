"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GlobalNetworkGlobeProps {
  className?: string;
  onNodeClick?: (region: string) => void;
}

interface DataCenterNode {
  name: string;
  lat: number;
  lon: number;
  region: string;
  circuits: string;
  uptime: string;
  isAccent?: boolean;
}

const DATA_CENTERS: DataCenterNode[] = [
  { name: "New York (US-East)", lat: 40.71, lon: -74.0, region: "North America", circuits: "124,000", uptime: "99.999%", isAccent: true },
  { name: "London (EU-West)", lat: 51.5, lon: -0.12, region: "Europe", circuits: "118,500", uptime: "99.999%", isAccent: false },
  { name: "Tokyo (AP-East)", lat: 35.68, lon: 139.69, region: "Asia Pacific", circuits: "142,000", uptime: "99.999%", isAccent: true },
  { name: "Frankfurt (EU-Central)", lat: 50.11, lon: 8.68, region: "Europe", circuits: "96,000", uptime: "99.998%", isAccent: false },
  { name: "Singapore (AP-South)", lat: 1.35, lon: 103.82, region: "Asia Pacific", circuits: "88,000", uptime: "99.998%", isAccent: false },
  { name: "São Paulo (SA-East)", lat: -23.55, lon: -46.63, region: "South America", circuits: "64,000", uptime: "99.997%", isAccent: false },
  { name: "Sydney (AP-Southeast)", lat: -33.86, lon: 151.2, region: "Australia", circuits: "52,000", uptime: "99.999%", isAccent: false },
  { name: "Dubai (ME-Central)", lat: 25.2, lon: 55.27, region: "Middle East", circuits: "41,000", uptime: "99.998%", isAccent: false },
  { name: "Cape Town (AF-South)", lat: -33.92, lon: 18.42, region: "Africa", circuits: "29,000", uptime: "99.996%", isAccent: false },
];

export const GlobalNetworkGlobe: React.FC<GlobalNetworkGlobeProps> = ({ className, onNodeClick }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<DataCenterNode | null>(DATA_CENTERS[0]);

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

    const radius = Math.min(width, height) * 0.38;

    // Generate ~450 dot map latitude/longitude points on sphere
    const dots: { lat: number; lon: number }[] = [];
    for (let lat = -80; lat <= 80; lat += 8) {
      const ringCircumference = Math.cos((lat * Math.PI) / 180);
      const numDotsInRing = Math.max(6, Math.floor(45 * ringCircumference));
      for (let i = 0; i < numDotsInRing; i++) {
        const lon = (360 / numDotsInRing) * i - 180;
        dots.push({ lat, lon });
      }
    }

    let rotY = 0;
    let targetRotY = 0;
    let targetRotX = 0.15;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      // Limited rotation range as required
      targetRotY = mx * 0.6;
      targetRotX = 0.15 + my * 0.3;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Lat/Lon to 3D Cartesian
    const latLonTo3D = (lat: number, lon: number, r: number) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((lon + rotY * (180 / Math.PI)) * Math.PI) / 180;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      return { x, y, z };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotY += 0.003;
      const cx = width / 2;
      const cy = height / 2;

      // Project surface dots
      for (const d of dots) {
        const pt = latLonTo3D(d.lat, d.lon, radius);
        // Rotate X
        const y1 = pt.y * Math.cos(targetRotX) - pt.z * Math.sin(targetRotX);
        const z1 = pt.y * Math.sin(targetRotX) + pt.z * Math.cos(targetRotX);

        if (z1 > -radius * 0.1) {
          const scale = 600 / (600 + z1 + radius);
          const px = cx + pt.x * scale;
          const py = cy + y1 * scale;
          const alpha = (z1 + radius) / (2 * radius);

          ctx.globalAlpha = Math.max(0.1, Math.min(0.7, alpha * 0.5));
          ctx.beginPath();
          ctx.arc(px, py, 1.4 * scale, 0, Math.PI * 2);
          ctx.fillStyle = "#76549A";
          ctx.fill();
        }
      }

      // Project Data Centers & connection arcs
      const projectedNodes: { node: DataCenterNode; x: number; y: number; z: number; scale: number }[] = [];
      for (const dc of DATA_CENTERS) {
        const pt = latLonTo3D(dc.lat, dc.lon, radius * 1.01);
        const y1 = pt.y * Math.cos(targetRotX) - pt.z * Math.sin(targetRotX);
        const z1 = pt.y * Math.sin(targetRotX) + pt.z * Math.cos(targetRotX);

        if (z1 > -radius * 0.2) {
          const scale = 600 / (600 + z1 + radius);
          const px = cx + pt.x * scale;
          const py = cy + y1 * scale;
          projectedNodes.push({ node: dc, x: px, y: py, z: z1, scale });
        }
      }

      // Draw Purple Connection Arcs between data centers
      ctx.strokeStyle = "rgba(74, 27, 122, 0.4)";
      ctx.lineWidth = 1.5;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p1 = projectedNodes[i];
          const p2 = projectedNodes[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < radius * 1.6) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2 - dist * 0.2;
            ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw Data Center Nodes
      for (const pn of projectedNodes) {
        ctx.globalAlpha = 0.95;
        const color = pn.node.isAccent ? "#E11D72" : "#2B0D3A";
        const ringColor = pn.node.isAccent ? "rgba(225, 29, 114, 0.3)" : "rgba(74, 27, 122, 0.3)";

        // Outer pulse ring
        ctx.beginPath();
        ctx.arc(pn.x, pn.y, 10 * pn.scale, 0, Math.PI * 2);
        ctx.fillStyle = ringColor;
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(pn.x, pn.y, 4.5 * pn.scale, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={cn("relative w-full h-[450px] md:h-[550px] flex flex-col items-center justify-center", className)}>
      <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" />

      {/* Interactive Tooltip / Active Regional Hub Card */}
      {hoveredNode && (
        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:w-80 p-4 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] shadow-xl shadow-[#2B0D3A]/10 text-[var(--text-primary)]">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[var(--surface-purple)] text-[var(--text-link)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D72] animate-pulse" />
              {hoveredNode.region} Hub
            </span>
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Uptime: {hoveredNode.uptime}</span>
          </div>
          <h4 className="text-sm font-bold text-[var(--text-primary)] font-sora mb-1">{hoveredNode.name}</h4>
          <p className="text-xs text-[var(--text-secondary)] mb-3">
            Active Subscriber Circuits: <span className="font-semibold text-[var(--text-primary)]">{hoveredNode.circuits}</span>
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border-default)]">
            {DATA_CENTERS.map((dc, i) => (
              <button
                key={i}
                onClick={() => {
                  setHoveredNode(dc);
                  if (onNodeClick) onNodeClick(dc.region);
                }}
                className={cn(
                  "px-2 py-1 rounded text-[10px] font-medium transition-all",
                  hoveredNode.name === dc.name
                    ? "bg-[var(--brand-violet)] text-white"
                    : "bg-[var(--surface-2)] text-[var(--text-secondary)] hover:bg-[var(--surface-4)]"
                )}
              >
                {dc.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
