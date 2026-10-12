"use client";

import React from "react";
import { Terminal, ShieldCheck } from "lucide-react";
import { APIFlowAnimation } from "@/components/visual/APIFlowAnimation";

export const APIAutomation: React.FC = () => {
  return (
    <section className="w-full py-20 md:py-28 bg-[var(--surface-1)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)]">
            Open API &amp; Webhooks Platform
          </span>
          <h2 className="section-heading text-[var(--text-primary)]">
            Connect, automate, and extend every system.
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)]">
            Kashtrix provides REST, GraphQL, and Webhook endpoints for every core model—from subscriber Radius sessions and OLT optical attenuation to billing invoices and AI task queues.
          </p>
        </div>

        {/* Embedded API Flow Animation & Console */}
        <APIFlowAnimation />
      </div>
    </section>
  );
};
