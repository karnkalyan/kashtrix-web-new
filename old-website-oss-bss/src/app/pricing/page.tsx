import { SiteShell } from "@/components/layout/SiteShell";
import { PricingInquiry } from "@/components/sections/PricingInquiry";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Kashtrix Pricing | Flexible ISP & Telecom OSS/BSS & Syslog Plans",
  description:
    "Transparent pricing tailored to subscriber count, network capacity, and syslog volume. Request custom quote for Kashtrix OSS/BSS, Syslog Server, and AI Agent modules.",
  keywords: [
    "ISP software pricing",
    "telecom OSS BSS pricing",
    "syslog server cost ISP",
    "Kashtrix pricing",
    "wisp software cost",
    "ISP billing software pricing",
  ],
  canonical: "https://kashtrix.com/pricing",
});

export default function PricingPage() { return <SiteShell><PricingInquiry /></SiteShell>; }
