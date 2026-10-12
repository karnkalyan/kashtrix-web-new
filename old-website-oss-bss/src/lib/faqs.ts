export interface FAQItem {
  question: string;
  answer: string;
}

export const HOMEPAGE_FAQS: FAQItem[] = [
  {
    question: "What is Kashtrix ISP management software?",
    answer:
      "Kashtrix is an AI-powered ISP management and unified telecom OSS/BSS platform. It brings subscriber billing, CRM, FreeRADIUS AAA authentication, GPON OLT provisioning, BNG automation, inventory management, carrier-grade syslog CGNAT compliance logging, and autonomous AI agents into a single operational interface for ISPs, WISPs, and FTTH providers.",
  },
  {
    question: "How does Kashtrix handle FreeRADIUS AAA and subscriber authentication?",
    answer:
      "Kashtrix integrates natively with clustered FreeRADIUS AAA engines capable of handling over 50,000 requests per second. It supports PPPoE, IPoE, dynamic IP pool allocation, Change of Authorization (CoA) for speed boosts or bandwidth throttling, and instant automated disconnection for dunning or security events.",
  },
  {
    question: "Which router and OLT hardware vendors are supported by Kashtrix?",
    answer:
      "Kashtrix features multi-vendor device automation out of the box for MikroTik RouterOS, Nokia ISAM OLTs, Cisco ASR BNGs, Huawei SmartAX MA5800, ZTE C300/C600, and Juniper MX routers via NETCONF, gNMI, RESTCONF, and SSH APIs.",
  },
  {
    question: "Does Kashtrix support both prepaid and postpaid ISP billing?",
    answer:
      "Yes. Kashtrix features a convergent rating engine supporting real-time prepaid broadband plans, recurring postpaid subscription invoicing, pro-rated plan upgrades, automated payment retries, multi-gateway online payments, and automated dunning suspension.",
  },
  {
    question: "How does Kashtrix Syslog ensure CGNAT compliance?",
    answer:
      "Kashtrix Syslog ingests high-throughput syslog event streams (100k+ EPS) from NAT gateways and OLTs, mapping public IP and port translations directly to subscriber profiles with encrypted hot/cold S3 archiving and instant subpoena search tools.",
  },
  {
    question: "Can Kashtrix replace separate tools like Splynx, Sonar, or Kiwi Syslog?",
    answer:
      "Yes. Kashtrix eliminates operational silos by consolidating subscriber CRM, billing, RADIUS AAA, OLT/CPE management, syslog CGNAT logging, support ticketing, and field technician dispatch into one unified system with shared real-time telemetry.",
  },
];

export const BILLING_FAQS: FAQItem[] = [
  {
    question: "How does Kashtrix ISP billing software handle FreeRADIUS integration?",
    answer:
      "Kashtrix communicates directly with FreeRADIUS AAA databases via real-time RADIUS protocol sockets and database sync. When an invoice is unpaid past due, Kashtrix triggers a RADIUS CoA (Change of Authorization) or Disconnect Message (PoD) to suspend or throttle subscriber sessions instantaneously without router restarts.",
  },
  {
    question: "Can Kashtrix handle both prepaid vouchers and monthly postpaid invoices?",
    answer:
      "Yes. Kashtrix includes a convergent rating engine supporting prepaid scratch cards, online instant wallet top-ups, daily/weekly/monthly passes, as well as recurring monthly postpaid billing with custom billing cycles, pro-rating, tax calculation, and automated PDF invoice generation.",
  },
  {
    question: "What payment gateways are supported out of the box?",
    answer:
      "Kashtrix supports Stripe, PayPal, Razorpay, eSewa, Khalti, Fonepay, InstaPay, Amazon Pay, Apple Pay, Google Pay, direct bank transfer, and cash collection via reseller portals.",
  },
  {
    question: "What happens when a subscriber's payment is late?",
    answer:
      "The Kashtrix automated dunning engine triggers a configurable workflow: first sending automated SMS/Email reminders, applying late fees if configured, issuing a soft bandwidth throttle, and finally issuing a RADIUS CoA disconnect if the account remains unpaid after the grace period.",
  },
  {
    question: "Can Kashtrix bill per gigabyte or per Mbps bandwidth usage?",
    answer:
      "Yes. Kashtrix processes RADIUS accounting Interim-Update packets in real time to calculate total data consumption (Gigabytes) or peak bandwidth usage (Mbps), enabling tiered data caps, fair usage policies (FUP), speed bursts, and overage charging.",
  },
];

export const NETWORK_MANAGEMENT_FAQS: FAQItem[] = [
  {
    question: "What hardware protocol standards does Kashtrix NOC monitoring support?",
    answer:
      "Kashtrix supports SNMP (v1/v2c/v3), Syslog, IPFIX/NetFlow, gNMI, NETCONF, RESTCONF, and TR-069 CWMP telemetry streams for real-time monitoring across multi-vendor ISP core, distribution, and access equipment.",
  },
  {
    question: "How does topology-aware alarm correlation work in Kashtrix?",
    answer:
      "Kashtrix builds a dynamic topology map connecting physical fiber links, GPON splitters, OLT ports, and core routers. When a fiber break occurs, Kashtrix suppresses hundreds of cascading downstream ONT loss-of-signal alerts and highlights the single root-cause fiber cut location.",
  },
  {
    question: "Can Kashtrix monitor optical power levels on GPON ONTs?",
    answer:
      "Yes. Kashtrix continuously samples optical RX/TX power levels (dBm) across OLT ports and subscriber ONTs. It alerts NOC engineers when optical degradation passes configured warning thresholds before optical loss causes session drops.",
  },
  {
    question: "How does Kashtrix help reduce Mean Time to Repair (MTTR)?",
    answer:
      "By combining real-time optical telemetry, topology mapping, automated root-cause alarm correlation, and direct ticket-to-field dispatching, Kashtrix reduces MTTR by up to 80% compared to legacy disconnected NOC monitoring tools.",
  },
];

export const AI_AGENTS_FAQS: FAQItem[] = [
  {
    question: "What makes Kashtrix AI Agents different from generic chatbot LLMs?",
    answer:
      "Kashtrix AI Agents are purpose-built domain agents pre-trained on telecom standards (RFCs, Broadband Forum TR-069/TR-369, 3GPP), network topology schemas, and live OSS/BSS metrics. They execute deterministic actions via APIs with human guardrail policies rather than hallucinating text.",
  },
  {
    question: "How do human approval guardrails work for AI actions?",
    answer:
      "Kashtrix allows administrators to configure policy permission boundaries for every agent. Low-risk diagnostic actions can run fully autonomously, while high-impact network changes (such as firmware rollouts or core route modifications) require explicit human engineer approval before execution.",
  },
  {
    question: "Can AI agents automate subscriber support and remote modem troubleshooting?",
    answer:
      "Yes. The Customer Support AI Agent checks modem signal strength, optical attenuation, and RADIUS authentication history in real time. If a signal degradation is detected, it can run a remote optical diagnostic test or restart the ONT via TR-069 automatically before dispatching a field technician.",
  },
  {
    question: "How do AI NOC Agents reduce alert noise?",
    answer:
      "Kashtrix AI NOC Agents correlate high-volume syslog and SNMP trap spikes against network topology maps, suppressing repeated secondary alerts and summarizing the exact root cause in natural language for NOC engineers.",
  },
];
