import type { Metadata } from "next";
import type { ReactNode } from "react";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Contact Kashtrix | Talk to ISP Management & Telecom OSS/BSS Architects",
  description:
    "Reach out to Kashtrix telecom solutions architects. Get help with ISP management, OSS/BSS deployment, syslog integration, AI agent configuration and network automation.",
  keywords: [
    "contact Kashtrix",
    "ISP management consultation",
    "telecom OSS BSS support",
    "Kashtrix sales",
  ],
  canonical: "https://kashtrix.com/contact",
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
