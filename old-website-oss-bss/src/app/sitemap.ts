import type { MetadataRoute } from "next";
import { ALL_TOOL_SLUGS } from "@/lib/toolsData";

// ─── Route Categories ─────────────────────────────────────────────

const FLAGSHIP_PRODUCT_ROUTES = [
  "syslog",
  "oss",
  "bss",
  "ai-agents",
  "platform",
  "billing",
  "crm",
];

const SOLUTION_FEATURE_ROUTES = [
  "network-management",
  "network-automation",
  "hardware-automation",
  "voice-automation",
  "field-operations",
  "inventory",
  "api-platform",
  "industries",
  "integrations",
  "pricing",
  "request-demo",
  "tools",
  "free-isp-tools",
];

const SOLUTION_LANDING_ROUTES = [
  "solutions/zero-touch-provisioning",
  "solutions/multi-vendor-device-management-nms",
  "solutions/ai-driven-syslog-fault-analyzer",
  "solutions/closed-loop-fault-ticketing",
  "solutions/convergent-billing-dunning",
  "solutions/ai-agent-isp-noc-automation",
  "solutions/freeradius-mikrotik-billing",
  "solutions/olt-provisioning",
  "solutions/cgnat-syslog-compliance",
  "solutions/isp-mcp-server-ai",
  "solutions/wisp-billing-ai",
  "solutions/pppoe-radius-billing",
  "solutions/fiber-gis-olt-ont-splitter",
  "solutions/isp-field-staff-gps",
  "solutions/isp-branch-reseller-management",
];

const RESOURCE_GUIDE_ROUTES = [
  "resources/freeradius-bng-rebalancing-ai",
  "resources/huawei-ma5800-nokia-olt-provisioning",
  "resources/cgnat-logging-compliance-guide",
  "resources/mikrotik-freeradius-billing-guide",
  "resources/gpon-optical-loss-troubleshooting",
  "resources/isp-oss-bss-migration-guide",
];

const INDIVIDUAL_TOOL_ROUTES = ALL_TOOL_SLUGS.map((slug) => `tools/${slug}`);

const RESOURCE_CORPORATE_ROUTES = [
  "about",
  "contact",
  "documentation",
  "resources",
  "security",
  "compliance",
];

const COMPARISON_ROUTES = [
  "compare/kashtrix-vs-splynx",
];

const LEGAL_ROUTES = ["privacy", "terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://kashtrix.com").replace(/\/$/, "");
  const lastModified = new Date();

  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: `${baseUrl}/`,
    lastModified,
    changeFrequency: "daily",
    priority: 1.0,
  };

  const flagshipEntries: MetadataRoute.Sitemap = FLAGSHIP_PRODUCT_ROUTES.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.95,
  }));

  const solutionEntries: MetadataRoute.Sitemap = SOLUTION_FEATURE_ROUTES.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const solutionLandingEntries: MetadataRoute.Sitemap = SOLUTION_LANDING_ROUTES.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const toolLandingEntries: MetadataRoute.Sitemap = INDIVIDUAL_TOOL_ROUTES.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const resourceGuideEntries: MetadataRoute.Sitemap = RESOURCE_GUIDE_ROUTES.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const resourceEntries: MetadataRoute.Sitemap = RESOURCE_CORPORATE_ROUTES.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const comparisonEntries: MetadataRoute.Sitemap = COMPARISON_ROUTES.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const legalEntries: MetadataRoute.Sitemap = LEGAL_ROUTES.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    homeEntry,
    ...flagshipEntries,
    ...solutionEntries,
    ...solutionLandingEntries,
    ...toolLandingEntries,
    ...resourceGuideEntries,
    ...resourceEntries,
    ...comparisonEntries,
    ...legalEntries,
  ];
}
