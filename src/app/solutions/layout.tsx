import type { Metadata } from "next";
import type { ReactNode } from "react";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "ISP & Telecom Solutions | Kashtrix",
  description:
    "Explore Kashtrix solutions for ISP management, OSS/BSS, syslog compliance, AI agents, OLT provisioning, FreeRADIUS billing and fiber GIS.",
  canonical: "https://kashtrix.com/solutions",
});

export default function SolutionsLayout({ children }: { children: ReactNode }) {
  return children;
}
