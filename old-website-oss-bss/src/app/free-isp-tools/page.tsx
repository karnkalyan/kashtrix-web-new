import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { ISPToolsHub } from "@/components/tools/ISPToolsHub";
import { TellUsWhatYouNeed } from "@/components/sections/TellUsWhatYouNeed";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Free ISP Tools — WISP & Fiber Network Calculators | Kashtrix",
  description:
    "17 Precision engineering tools for WISPs and fiber operators — RF, optical, power, addressing and business math. No sign-up required.",
  canonical: "https://kashtrix.com/free-isp-tools",
});

export default function FreeIspToolsPage() {
  return (
    <SiteShell>
      <h1 className="sr-only">Free WISP &amp; Fiber Engineering Calculators</h1>
      <ISPToolsHub />
      <TellUsWhatYouNeed />
    </SiteShell>
  );
}
