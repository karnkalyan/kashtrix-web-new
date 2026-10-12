import type { Metadata } from "next";
import type { ReactNode } from "react";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Request a Custom Kashtrix Demo | ISP Management & OSS/BSS Sandbox",
  description:
    "Request a personalized Kashtrix demo tailored to your ISP network hardware. Test PPPoE sessions, OLT provisioning, billing workflows and AI agents in a safe sandbox environment.",
  keywords: [
    "Kashtrix demo",
    "ISP management demo",
    "OSS BSS demo",
    "telecom platform trial",
  ],
  canonical: "https://kashtrix.com/request-demo",
});

export default function RequestDemoLayout({ children }: { children: ReactNode }) {
  return children;
}
