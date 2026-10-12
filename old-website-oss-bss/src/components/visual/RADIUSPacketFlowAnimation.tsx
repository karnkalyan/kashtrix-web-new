"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Server,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Filter,
} from "lucide-react";

interface PacketChannel {
  id: string;
  port: string;
  name: string;
  direction: "to_server" | "to_router";
  details: string;
  color: string;
  bgDot: string;
}

const PACKET_CHANNELS: PacketChannel[] = [
  {
    id: "auth-req",
    port: "Port 1812",
    name: "Access-Request",
    direction: "to_server",
    details: "Username + Password + NAS-IP-Address",
    color: "#2563EB", // Blue
    bgDot: "bg-blue-500",
  },
  {
    id: "auth-res",
    port: "Port 1812",
    name: "Access-Accept / Reject",
    direction: "to_router",
    details: "Bandwidth Speed, IP Pool, Session-Timeout",
    color: "#10B981", // Emerald
    bgDot: "bg-emerald-500",
  },
  {
    id: "acct-req",
    port: "Port 1813",
    name: "Accounting-Request",
    direction: "to_server",
    details: "Start / Interim-Update / Stop (Octets & Packets)",
    color: "#EA580C", // Orange
    bgDot: "bg-orange-500",
  },
  {
    id: "acct-res",
    port: "Port 1813",
    name: "Accounting-Response",
    direction: "to_router",
    details: "Acknowledged & Logged to Billing Ledger",
    color: "#D97706", // Amber
    bgDot: "bg-amber-500",
  },
  {
    id: "syslog-stream",
    port: "Port 514",
    name: "Syslog NAT Event",
    direction: "to_server",
    details: "CGNAT Public:Port -> Private IP & MAC Mapping",
    color: "#8B5CF6", // Purple
    bgDot: "bg-purple-500",
  },
];

export const RADIUSPacketFlowAnimation: React.FC = () => {
  const [selectedPortFilter, setSelectedPortFilter] = useState<string>("all");
  const [packetSpeed] = useState<number>(2.4); // seconds per loop

  const filteredChannels =
    selectedPortFilter === "all"
      ? PACKET_CHANNELS
      : PACKET_CHANNELS.filter((c) => c.port.includes(selectedPortFilter));

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-1)] dark:bg-slate-950 p-4 text-[var(--text-primary)] dark:text-white shadow-xl dark:shadow-2xl sm:p-6 lg:p-8">
      
      {/* Top Header Controls */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-[var(--border-default)] dark:border-white/10 pb-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-ping rounded-full bg-emerald-500" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-link)] dark:text-emerald-400">
              Live NAS ↔ RADIUS &amp; Syslog Packet Telemetry
            </span>
          </div>
          <h3 className="mt-1 font-sora text-xl font-bold text-[var(--text-primary)] dark:text-white sm:text-2xl">
            Real-Time AAA &amp; Syslog Stream Animation
          </h3>
          <p className="mt-0.5 font-inter text-xs text-[var(--text-secondary)] dark:text-slate-400">
            Interactive packet transmission between Router / NAS gateways and Kashtrix RADIUS + Syslog engine.
          </p>
        </div>

        {/* Port Filter Pills */}
        <div className="flex items-center gap-2 rounded-xl border border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-2)] dark:bg-slate-900/90 p-1.5 backdrop-blur-md">
          <span className="px-2 font-mono text-[10px] text-[var(--text-secondary)] dark:text-slate-400 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Port:
          </span>
          {[
            { id: "all", label: "All Ports" },
            { id: "1812", label: "1812 (Auth)" },
            { id: "1813", label: "1813 (Acct)" },
            { id: "514", label: "514 (Syslog)" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedPortFilter(f.id)}
              className={`rounded-lg px-2.5 py-1 font-mono text-xs font-semibold transition-all ${
                selectedPortFilter === f.id
                  ? "bg-[#2563EB] text-white shadow-md"
                  : "text-[var(--text-secondary)] dark:text-slate-400 hover:bg-[var(--surface-3)] dark:hover:bg-white/5 hover:text-[var(--text-primary)] dark:hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Diagram Canvas Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        
        {/* Left Column: MikroTik / Cisco NAS Router */}
        <div className="flex flex-col space-y-4 rounded-2xl border border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-2)] dark:bg-slate-900/90 p-5 shadow-sm dark:shadow-xl lg:col-span-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-500 dark:text-amber-400">
              <Server className="h-5 w-5" />
            </span>
            <div>
              <h4 className="font-sora text-base font-bold text-[var(--text-primary)] dark:text-white">MikroTik / Cisco</h4>
              <p className="font-mono text-xs text-[var(--text-secondary)] dark:text-slate-400">NAS / Edge Router</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[var(--border-default)] dark:border-white/10 font-inter text-xs">
            <div className="flex items-center justify-between rounded-xl border border-[var(--border-default)] dark:border-white/5 bg-[var(--surface-1)] dark:bg-white/[0.03] px-3 py-2 text-[var(--text-primary)] dark:text-slate-300">
              <span className="font-semibold">PPPoE Server</span>
              <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Active</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[var(--border-default)] dark:border-white/5 bg-[var(--surface-1)] dark:bg-white/[0.03] px-3 py-2 text-[var(--text-primary)] dark:text-slate-300">
              <span className="font-semibold">Hotspot Server</span>
              <span className="rounded bg-blue-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400">Ready</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[var(--border-default)] dark:border-white/5 bg-[var(--surface-1)] dark:bg-white/[0.03] px-3 py-2 text-[var(--text-primary)] dark:text-slate-300">
              <span className="font-semibold">DHCP Server</span>
              <span className="rounded bg-purple-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-purple-600 dark:text-purple-400">Option 82</span>
            </div>
          </div>
        </div>

        {/* Center Column: Animated Packet Channels */}
        <div className="space-y-4 rounded-2xl border border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-2)] dark:bg-slate-950 p-4 lg:col-span-6">
          {filteredChannels.map((ch) => {
            const isToRight = ch.direction === "to_server";

            return (
              <div key={ch.id} className="relative space-y-1.5 rounded-xl border border-[var(--border-default)] dark:border-white/5 bg-[var(--surface-1)] dark:bg-slate-900/60 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className="rounded px-2 py-0.5 font-mono text-[10px] font-bold"
                    style={{ backgroundColor: `${ch.color}18`, color: ch.color }}
                  >
                    {ch.port}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--text-primary)] dark:text-white">
                    <span>{ch.name}</span>
                    <span className="text-[10px] font-normal text-[var(--text-secondary)] dark:text-slate-400">({ch.details})</span>
                  </div>
                </div>

                {/* Animated Dashed Stream Line */}
                <div className="relative h-6 w-full flex items-center justify-center overflow-hidden rounded-lg bg-[var(--surface-2)] dark:bg-slate-950/80 px-2 border border-[var(--border-default)] dark:border-white/5">
                  
                  {/* Background Track Line */}
                  <div className="absolute inset-x-4 h-[2px] bg-[var(--border-strong)] dark:bg-slate-800" />

                  {/* Animated Moving Packets */}
                  <motion.div
                    className="absolute h-2 rounded-full shadow-lg"
                    style={{
                      backgroundColor: ch.color,
                      boxShadow: `0 0 10px ${ch.color}`,
                    }}
                    initial={{ left: isToRight ? "5%" : "85%", width: "40px" }}
                    animate={{ left: isToRight ? ["5%", "85%"] : ["85%", "5%"] }}
                    transition={{
                      duration: packetSpeed,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Arrow Indicator */}
                  <div className={`absolute flex items-center text-[10px] ${isToRight ? "right-2" : "left-2"}`}>
                    {isToRight ? <ArrowRight className="h-3.5 w-3.5 text-blue-500" /> : <ArrowLeft className="h-3.5 w-3.5 text-emerald-500" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Kashtrix RADIUS + CRM Server */}
        <div className="flex flex-col space-y-4 rounded-2xl border border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-2)] dark:bg-slate-900/90 p-5 shadow-sm dark:shadow-xl lg:col-span-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h4 className="font-sora text-base font-bold text-[var(--text-primary)] dark:text-white">Kashtrix Radius</h4>
              <p className="font-mono text-xs text-[var(--text-secondary)] dark:text-slate-400">RADIUS + CRM Server</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[var(--border-default)] dark:border-white/10 font-inter text-xs">
            <div className="flex items-center justify-between rounded-xl border border-[var(--border-default)] dark:border-white/5 bg-[var(--surface-1)] dark:bg-white/[0.03] px-3 py-2 text-[var(--text-primary)] dark:text-slate-300">
              <span className="font-semibold">Free RADIUS AAA</span>
              <span className="rounded bg-purple-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-purple-600 dark:text-purple-400">50K Req/s</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[var(--border-default)] dark:border-white/5 bg-[var(--surface-1)] dark:bg-white/[0.03] px-3 py-2 text-[var(--text-primary)] dark:text-slate-300">
              <span className="font-semibold">User Database</span>
              <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Synced</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[var(--border-default)] dark:border-white/5 bg-[var(--surface-1)] dark:bg-white/[0.03] px-3 py-2 text-[var(--text-primary)] dark:text-slate-300">
              <span className="font-semibold">Billing Engine</span>
              <span className="rounded bg-amber-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400">Convergent</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
