import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { MarketingDetailPage } from "@/components/marketing/DetailPageSystem";
import { DETAIL_CONFIGS } from "@/lib/detailConfigs";
import { constructMetadata, getFAQSchema } from "@/lib/seo";
import { FAQSection } from "@/components/sections/FAQSection";
import { BILLING_FAQS } from "@/lib/faqs";

export const metadata = constructMetadata({
  title: "ISP Billing Software with FreeRADIUS & Automated Collections | Kashtrix",
  description:
    "Automate ISP billing, FreeRADIUS AAA authentication, PPPoE subscriptions, invoicing, payments and collections with Kashtrix broadband billing software for ISPs and WISPs.",
  keywords: [
    "ISP billing software",
    "broadband billing software",
    "RADIUS billing software",
    "FreeRADIUS billing",
    "PPPoE billing",
    "telecom billing software",
    "subscriber billing",
    "automated ISP billing",
    "MikroTik ISP billing",
    "WISP billing software",
    "automated dunning engine",
    "prepaid postpaid billing",
    "Kashtrix Billing",
  ],
  canonical: "https://kashtrix.com/billing",
});

export default function BillingPage() {
  const faqSchema = getFAQSchema(BILLING_FAQS);

  return (
    <SiteShell>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <MarketingDetailPage config={DETAIL_CONFIGS.billing}>
        <FAQSection
          faqs={BILLING_FAQS}
          heading="Frequently Asked Questions about Kashtrix Billing Software"
          subheading="Everything you need to know about FreeRADIUS billing, payment gateways, and automated dunning for ISPs."
        />
      </MarketingDetailPage>
    </SiteShell>
  );
}
