import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { MarketingDetailPage } from "@/components/marketing/DetailPageSystem";
import { DETAIL_CONFIGS } from "@/lib/detailConfigs";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "ISP Inventory & Telecom Asset Management Software | Kashtrix",
  description:
    "Track ISP equipment, CPE routers, ONTs, optical transceivers and warehouse stock with Kashtrix telecom inventory and asset management software.",
  keywords: [
    "ISP inventory management software",
    "telecom inventory",
    "CPE inventory",
    "network asset management",
    "telecom asset management",
    "serialized equipment tracking",
    "ISP CPE asset tracking",
    "Kashtrix Inventory",
  ],
  canonical: "https://kashtrix.com/inventory",
});

export default function InventoryPage() {
  return (
    <SiteShell>
      <MarketingDetailPage config={DETAIL_CONFIGS.inventory} />
    </SiteShell>
  );
}
