import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { APIAutomation } from "@/components/sections/APIAutomation";
import { MCPServerSection } from "@/components/sections/MCPServerSection";
import { MarketingDetailPage } from "@/components/marketing/DetailPageSystem";
import { DETAIL_CONFIGS } from "@/lib/detailConfigs";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Kashtrix Integrations | Model Context Protocol (MCP) Server & Multi-Vendor Connectors",
  description:
    "Connect any AI agent or application using Kashtrix MCP Server at mcp.kashtrix.com/mcp. Pre-built hardware, billing, and network connectors for MikroTik, Cisco, Huawei, Stripe, and FreeRADIUS.",
  keywords: [
    "Kashtrix MCP Server",
    "mcp.kashtrix.com/mcp",
    "Model Context Protocol telecom server",
    "AI agent MCP integration endpoint",
    "MikroTik RADIUS integration",
    "Cisco vBNG integration",
    "Huawei OLT integration",
    "FreeRADIUS integration",
    "Kashtrix Integrations",
  ],
  canonical: "https://kashtrix.com/integrations",
});

export default function IntegrationsPage() {
  return (
    <SiteShell>
      <MarketingDetailPage config={DETAIL_CONFIGS.integrations}>
        <MCPServerSection />
        <APIAutomation />
      </MarketingDetailPage>
    </SiteShell>
  );
}
