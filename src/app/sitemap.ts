import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { broadcastApps } from "@/data/broadcast";
import { streamOpsModules } from "@/data/streamops";
import { telecomPages } from "@/data/telecom";
import { ALL_TOOL_SLUGS } from "@/data/toolsData";

const solutionSlugs = [
  "olt-provisioning",
  "multi-vendor-device-management-nms",
  "ai-driven-syslog-fault-analyzer",
  "freeradius-mikrotik-billing",
  "fiber-gis-olt-ont-splitter",
  "ai-agent-isp-noc-automation",
  "isp-field-staff-gps",
  "isp-branch-reseller-management",
  "cgnat-syslog-compliance",
  "convergent-billing-dunning",
  "wisp-billing-ai",
  "isp-mcp-server-ai",
  "pppoe-radius-billing",
  "closed-loop-fault-ticketing",
  "zero-touch-provisioning",
];

const resourceSlugs = [
  "huawei-ma5800-nokia-olt-provisioning",
  "cgnat-logging-compliance-guide",
  "mikrotik-freeradius-billing-guide",
  "gpon-optical-loss-troubleshooting",
  "freeradius-bng-rebalancing-ai",
  "isp-oss-bss-migration-guide",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core Static Landing Pages
  const staticRoutes: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1.0, "daily"],
    ["/broadcast-playout", 0.95, "weekly"],
    ["/streamops", 0.95, "weekly"],
    ["/studio", 0.94, "weekly"],
    ["/platform", 0.95, "weekly"],
    ["/syslog", 0.95, "weekly"],
    ["/oss", 0.92, "weekly"],
    ["/bss", 0.92, "weekly"],
    ["/tools", 0.92, "daily"],
    ["/free-isp-tools", 0.88, "weekly"],
    ["/solutions", 0.92, "weekly"],
    ["/resources", 0.88, "weekly"],
    ["/compare/kashtrix-vs-splynx", 0.85, "monthly"],
    ["/documentation", 0.85, "monthly"],
    ["/pricing", 0.85, "monthly"],
    ["/industries", 0.82, "monthly"],
    ["/about", 0.7, "monthly"],
    ["/contact", 0.75, "monthly"],
    ["/request-demo", 0.9, "monthly"],
    ["/compliance", 0.7, "monthly"],
    ["/privacy", 0.4, "yearly"],
    ["/terms", 0.4, "yearly"],
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map(([path, priority, changeFrequency]) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    priority,
    changeFrequency,
  }));

  // 16 Broadcast Playout Applications
  for (const a of broadcastApps) {
    entries.push({
      url: `${SITE.url}/broadcast-playout/${a.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.88,
    });
  }

  // 12 StreamOps Modules
  for (const m of streamOpsModules) {
    entries.push({
      url: `${SITE.url}/streamops/${m.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.88,
    });
  }

  // Telecom OSS/BSS Core Domains
  for (const p of telecomPages.filter((p) => p.slug !== "platform" && p.slug !== "syslog")) {
    entries.push({
      url: `${SITE.url}/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.88,
    });
  }

  // 17 Free ISP Engineering Tools & Calculators
  for (const slug of ALL_TOOL_SLUGS) {
    entries.push({
      url: `${SITE.url}/tools/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.86,
    });
  }

  // 15 Telecom & ISP Engineering Solutions
  for (const slug of solutionSlugs) {
    entries.push({
      url: `${SITE.url}/solutions/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.86,
    });
  }

  // 6 Technical Whitepapers & Engineering Guides
  for (const slug of resourceSlugs) {
    entries.push({
      url: `${SITE.url}/resources/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.82,
    });
  }

  return entries;
}
