"use client";

import React, { useState } from "react";
import { Cpu, Copy, Check, ShieldCheck, Sparkles, Network, ArrowRight, Terminal } from "lucide-react";

export const MCPServerSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const mcpConfigJson = JSON.stringify(
    {
      mcpServers: {
        kashtrix: {
          url: "https://mcp.kashtrix.com/mcp",
          transport: "sse",
          headers: {
            Authorization: "Bearer YOUR_KASHTRIX_API_TOKEN",
          },
        },
      },
    },
    null,
    2
  );

  const handleCopy = () => {
    navigator.clipboard.writeText("https://mcp.kashtrix.com/mcp");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--surface-1)] text-[var(--text-primary)] relative overflow-hidden border-t border-b border-[var(--border-default)]">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)]">
            <Sparkles className="w-3.5 h-3.5 text-[#E11D72]" />
            Model Context Protocol (MCP) Server
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-sora text-[var(--text-primary)] tracking-tight leading-tight">
            Connect Any AI Agent to <br />
            <span className="text-[#E11D72]">
              Kashtrix Telecom Operating System
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-inter">
            Integrate custom LLMs, autonomous AI agents, and IDE assistants directly into your telecom infrastructure with our standardized Model Context Protocol (MCP) server endpoint at <code className="text-[#E11D72] font-mono font-semibold bg-[var(--surface-2)] px-2 py-0.5 rounded border border-[var(--border-default)]">mcp.kashtrix.com/mcp</code>.
          </p>
        </div>

        {/* Live Endpoint & Copy Container */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 p-5 sm:p-8 rounded-3xl bg-[var(--surface-2)] border border-[var(--border-default)] shadow-xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 pb-6 border-b border-[var(--border-default)]">
            <div className="space-y-1 text-center md:text-left w-full overflow-hidden">
              <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider block">Production MCP Endpoint URL</span>
              <div className="flex items-center justify-center md:justify-start gap-2 w-full">
                <code className="text-base sm:text-2xl font-bold font-mono text-[#E11D72] tracking-wide break-all select-all">
                  https://mcp.kashtrix.com/mcp
                </code>
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#E11D72] hover:bg-[#FF2E93] text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-[#E11D72]/25 active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Endpoint Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy MCP Endpoint</span>
                </>
              )}
            </button>
          </div>

          {/* Quick MCP Config Code Example */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#E11D72]" />
                Standard AI Client MCP Configuration (mcp.json)
              </span>
              <span className="text-[var(--text-link)] font-semibold">SSE / HTTP Transport</span>
            </div>
            <pre className="p-4 rounded-xl bg-[#0E0617] border border-[var(--border-default)] text-xs sm:text-sm font-mono text-purple-200 whitespace-pre-wrap break-words no-scrollbar shadow-inner">
              <code>{mcpConfigJson}</code>
            </pre>
          </div>
        </div>

        {/* MCP Capabilities & Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-2)] border border-[var(--border-default)] hover:border-purple-500/40 shadow-lg transition-all group space-y-4">
            <div className="p-3 rounded-xl bg-[var(--surface-purple)] text-[var(--text-link)] w-fit">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-sora text-[var(--text-primary)] group-hover:text-[#E11D72] transition-colors">
              NOC Telemetry &amp; Fault Isolation
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-inter">
              Exposes real-time tools for AI agents to query optical attenuation, BNG subscriber sessions, syslog CGNAT legal logs, and alarm correlation traps.
            </p>
            <div className="pt-2 text-xs font-mono text-[#E11D72] flex items-center gap-1 font-semibold">
              <span>tool: kashtrix_noc_fault_isolation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-2)] border border-[var(--border-default)] hover:border-purple-500/40 shadow-lg transition-all group space-y-4">
            <div className="p-3 rounded-xl bg-[var(--surface-purple)] text-[var(--text-link)] w-fit">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-sora text-[var(--text-primary)] group-hover:text-[#E11D72] transition-colors">
              Multi-Vendor Hardware Provisioning
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-inter">
              Enables autonomous agents to activate subscriber ONTs on Nokia, Huawei, ZTE OLTs, and configure PPPoE queues on MikroTik &amp; Cisco vBNGs via NETCONF/gNMI.
            </p>
            <div className="pt-2 text-xs font-mono text-[#E11D72] flex items-center gap-1 font-semibold">
              <span>tool: kashtrix_olt_provision_ont</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-2)] border border-[var(--border-default)] hover:border-purple-500/40 shadow-lg transition-all group space-y-4">
            <div className="p-3 rounded-xl bg-[var(--surface-purple)] text-[var(--text-link)] w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-sora text-[var(--text-primary)] group-hover:text-[#E11D72] transition-colors">
              Billing &amp; Customer Care Actions
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-inter">
              Allows AI care bots to inspect subscriber ledgers, process automatic dunning pauses, trigger RADIUS CoA speed changes, and resolve billing tickets safely.
            </p>
            <div className="pt-2 text-xs font-mono text-[#E11D72] flex items-center gap-1 font-semibold">
              <span>tool: kashtrix_subscriber_billing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

