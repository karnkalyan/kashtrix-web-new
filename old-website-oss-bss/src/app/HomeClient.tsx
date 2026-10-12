"use client";

import React, { useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { OSSBSSShowcase } from "@/components/sections/OSSBSSShowcase";
import { MCPServerSection } from "@/components/sections/MCPServerSection";
import { AIAgents } from "@/components/sections/AIAgents";
import { GlobalReady } from "@/components/sections/GlobalReady";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { RequestDemoModal } from "@/components/layout/RequestDemoModal";
import { HOMEPAGE_FAQS } from "@/lib/faqs";

export const HomeClient: React.FC = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <main className="w-full overflow-hidden bg-[var(--page-bg)]">
      <HeroSection onRequestDemo={() => setIsDemoModalOpen(true)} />
      <TrustStrip />
      <OSSBSSShowcase />
      <MCPServerSection />
      <AIAgents />
      <GlobalReady />
      <FAQSection
        faqs={HOMEPAGE_FAQS}
        heading="Frequently Asked Questions about Kashtrix ISP Platform"
        subheading="Learn how Kashtrix unifies broadband billing, RADIUS AAA, network automation, and syslog compliance into one platform."
      />
      <FinalCTA onRequestDemo={() => setIsDemoModalOpen(true)} />
      <RequestDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </main>
  );
};
