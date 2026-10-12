import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { MarketingDetailPage } from "@/components/marketing/DetailPageSystem";
import { DETAIL_CONFIGS } from "@/lib/detailConfigs";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Kashtrix Voice AI | Telecom SIP Trunk, IVR & Conversational AI Server",
  description:
    "Connect Kashtrix Voice AI Server directly to Asterisk, FreePBX, and carrier SIP trunks. Automate inbound customer care, payment collections, and subscriber voice bots.",
  keywords: [
    "Voice AI telecom",
    "SIP trunk IVR automation",
    "Asterisk FreePBX voice AI",
    "telecom voice agent",
    "conversational AI server ISP",
    "Kashtrix Voice AI",
  ],
  canonical: "https://kashtrix.com/voice-automation",
});

export default function VoiceAutomationPage() {
  return (
    <SiteShell>
      <MarketingDetailPage config={DETAIL_CONFIGS.voiceAutomation} />
    </SiteShell>
  );
}
