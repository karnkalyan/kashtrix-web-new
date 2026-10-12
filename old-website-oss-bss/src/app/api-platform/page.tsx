import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { MarketingDetailPage } from "@/components/marketing/DetailPageSystem";
import { DETAIL_CONFIGS } from "@/lib/detailConfigs";
import { MCPServerSection } from "@/components/sections/MCPServerSection";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Kashtrix API Platform | Model Context Protocol (MCP) Server & OpenAPI Framework",
  description:
    "Connect LLMs and AI agents via Kashtrix Model Context Protocol (MCP) server endpoint at mcp.kashtrix.com/mcp. Full REST API, GraphQL, and Webhook framework for telecom operators.",
  keywords: [
    "Kashtrix MCP Server",
    "mcp.kashtrix.com/mcp",
    "Model Context Protocol AI endpoint",
    "telecom AI agent API",
    "Open REST API telecom",
    "telecom API integration framework",
    "Kashtrix API Platform",
  ],
  canonical: "https://kashtrix.com/api-platform",
});

export default function APIPlatformPage() {
  return (
    <SiteShell>
      <MarketingDetailPage config={DETAIL_CONFIGS.apiPlatform}>
        <MCPServerSection />
      </MarketingDetailPage>
    </SiteShell>
  );
}
