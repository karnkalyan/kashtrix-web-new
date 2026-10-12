import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { MarketingDetailPage } from "@/components/marketing/DetailPageSystem";
import { DETAIL_CONFIGS } from "@/lib/detailConfigs";
import { constructMetadata, getAIServerProductSchema, getFAQSchema } from "@/lib/seo";
import { FAQSection } from "@/components/sections/FAQSection";
import { AI_AGENTS_FAQS } from "@/lib/faqs";

export const metadata = constructMetadata({
  title: "AI Agents for Telecom OSS/BSS & Network Operations | Kashtrix",
  description:
    "Deploy AI agents that detect network faults, correlate alarms, assist NOC engineers, automate billing workflows and accelerate customer support for ISPs and telecom operators.",
  keywords: [
    "AI agents for telecom",
    "AI OSS BSS",
    "agentic AI telecom",
    "autonomous network operations",
    "AI NOC",
    "telecom AI automation",
    "telecom AI agents",
    "AI network management",
    "predictive network assurance",
    "Kashtrix AI Agents",
  ],
  canonical: "https://kashtrix.com/ai-agents",
});

export default function AIAgentsPage() {
  const faqSchema = getFAQSchema(AI_AGENTS_FAQS);

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getAIServerProductSchema()) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <MarketingDetailPage config={DETAIL_CONFIGS.aiAgents}>
        <FAQSection
          faqs={AI_AGENTS_FAQS}
          heading="Frequently Asked Questions about Kashtrix AI Agents"
          subheading="Learn how policy-governed AI agents automate NOC telemetry, billing workflows, and customer support."
        />
      </MarketingDetailPage>
    </SiteShell>
  );
}
