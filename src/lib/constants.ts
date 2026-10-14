export interface NavSubItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface MegaMenuColumn {
  title: string;
  items: NavSubItem[];
}

export const PLATFORM_COLUMNS: MegaMenuColumn[] = [
  {
    title: "Network Operations",
    items: [
      { title: "NOC Dashboard", href: "/network-management", description: "Real-time network telemetry and fault isolation." },
      { title: "OLT/ONT Management", href: "/network-automation#olt", description: "GPON/XGS-PON optical terminal provisioning." },
      { title: "Radius / PPPoE", href: "/oss#radius", description: "High-concurrency AAA session authentication." },
      { title: "BNG / BRAS / vBNG", href: "/network-automation#bng", description: "Multi-vendor broadband gateway orchestration." },
      { title: "TR-069 / USP", href: "/network-automation#tr069", description: "Auto-configuration server & CPE lifecycle." },
      { title: "Fiber GIS", href: "/network-management#gis", description: "Geospatial fiber topology & outage mapping." },
      { title: "Alarm Management", href: "/network-management#alarms", description: "AI-correlated root cause fault filtering." },
      { title: "Session Monitoring", href: "/oss#sessions", description: "Deep packet inspection and subscriber throughput." },
    ],
  },
  {
    title: "Business Operations",
    items: [
      { title: "CRM", href: "/crm", description: "360° telecom subscriber lifecycle & interaction history." },
      { title: "Customer Management", href: "/crm#customer", description: "Self-service portals, contracts, and KYC." },
      { title: "Billing", href: "/billing", description: "Prepaid, postpaid, and hybrid real-time rating engine." },
      { title: "Payments", href: "/billing#payments", description: "Multi-currency automated collections and dunning." },
      { title: "Packages", href: "/bss#packages", description: "Dynamic speed boost, data caps, and bundle builder." },
      { title: "Revenue Assurance", href: "/billing#revenue", description: "Leakage detection and financial audit reconciliation." },
      { title: "Finance", href: "/bss#finance", description: "General ledger export, AR/AP, and tax compliance." },
      { title: "Customer Portal", href: "/crm#portal", description: "White-label responsive self-care web & mobile app." },
    ],
  },
  {
    title: "Service Operations",
    items: [
      { title: "Support Tickets", href: "/field-operations#tickets", description: "Omnichannel ticketing with SLA tracking." },
      { title: "Field Operations", href: "/field-operations", description: "Dispatch, GPS routing, and mobile tech app." },
      { title: "Inventory", href: "/inventory", description: "CPE tracking, warehouse serials, and optical modules." },
      { title: "Work Orders", href: "/field-operations#workorders", description: "Fiber drop installations and repair tasks." },
      { title: "SLA Management", href: "/field-operations#sla", description: "Automated credit calculations & VIP uptime protection." },
      { title: "Maintenance", href: "/network-management#maintenance", description: "Scheduled window notifications & rollback automation." },
      { title: "Technician App", href: "/field-operations#app", description: "Offline-capable mobile app with QR barcode scan." },
      { title: "Asset Lifecycle", href: "/inventory#lifecycle", description: "Depreciation, warranty claims, and vendor returns." },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { title: "AI Agents", href: "/ai-agents", description: "Autonomous digital employees for NOC, billing, and sales." },
      { title: "AI Insights", href: "/ai-agents#insights", description: "Real-time anomaly alerts and capacity predictions." },
      { title: "Predictive Analytics", href: "/platform#analytics", description: "Forecast bandwidth congestion before degradation." },
      { title: "Churn Prediction", href: "/ai-agents#churn", description: "Detect at-risk subscribers using usage & sentiment." },
      { title: "Revenue Forecasting", href: "/billing#forecasting", description: "AI cohort modeling and ARPPU growth projections." },
      { title: "Fault Detection", href: "/network-automation#faults", description: "Self-healing fiber cut and power loss correlation." },
      { title: "Executive Dashboard", href: "/platform#executive", description: "C-suite strategic KPIs across all global regions." },
      { title: "Knowledge Assistant", href: "/ai-agents#assistant", description: "Natural language query engine over multi-vendor docs." },
    ],
  },
];

export const AUTOMATION_SUBSECTIONS = {
  network: [
    { title: "Subscriber Activation", href: "/network-automation#provisioning", desc: "Activate fiber and wireless customers in seconds." },
    { title: "Access Network Automation", href: "/network-automation#bng", desc: "Automate BNG, BRAS and virtual access networks." },
    { title: "Authentication & Policy", href: "/network-automation#radius", desc: "Keep access, speed and service policies synchronized." },
    { title: "IP & Address Management", href: "/network-automation#ipam", desc: "Automate address pools, DHCP and assignments." },
    { title: "Safe Configuration Deployment", href: "/network-automation#config", desc: "Validate, deploy and roll back network changes." },
  ],
  hardware: [
    { title: "Zero-Touch ONT Provisioning", href: "/solutions/zero-touch-provisioning", desc: "Batch ONT file upload, auto-discovery & TR-069 ACS bootstrap." },
    { title: "Multi-Vendor NMS & SNMP", href: "/solutions/multi-vendor-device-management-nms", desc: "Unified dashboard for MikroTik, Nokia, Cisco, Juniper & Huawei." },
    { title: "Multi-Vendor Device Automation", href: "/hardware-automation", desc: "One workflow across your router, switch, OLT and firewall estate." },
    { title: "OLT & ONT Provisioning", href: "/solutions/olt-provisioning", desc: "Huawei MA5800, Nokia ISAM and ZTE C300 activation." },
    { title: "Compliance & Recovery", href: "/hardware-automation#compliance", desc: "Detect drift and restore known-good configurations." },
  ],
  voice: [
    { title: "AI Voice Calls", href: "/voice-automation#calls", desc: "Human-like AI voice agents handling inbound support queries." },
    { title: "Payment Reminder Calls", href: "/voice-automation#reminders", desc: "Automated courtesy calls with IVR instant payment links." },
    { title: "Outage Notifications", href: "/voice-automation#outages", desc: "Proactive broadcast calls during fiber maintenance windows." },
    { title: "Sales Follow-Up", href: "/voice-automation#sales", desc: "Autonomous lead qualification and package upsell calls." },
    { title: "Customer Surveys", href: "/voice-automation#surveys", desc: "Post-installation CSAT/NPS voice feedback collection." },
    { title: "Business Phone Integration", href: "/voice-automation#pbx", desc: "Connect voice automation to your existing phone environment." },
  ],
  workflow: [
    { title: "Visual Workflow Builder", href: "/network-automation#custom", desc: "Build operational processes without repetitive scripting." },
    { title: "Event & Scheduled Automation", href: "/network-automation#triggers", desc: "Run the right action when an event occurs or a window opens." },
    { title: "Approvals & Guardrails", href: "/network-automation#approvals", desc: "Keep people in control of high-impact changes." },
    { title: "Validation & Rollback", href: "/network-automation#validation", desc: "Verify every change and recover automatically." },
    { title: "Business System Integrations", href: "/integrations", desc: "Connect billing, CRM, support and partner systems." },
  ],
};

export const SOLUTIONS_MEGA = {
  providerType: [
    { title: "ISPs", href: "/industries#isps", desc: "Complete subscriber & BNG automation for Internet Service Providers." },
    { title: "FTTH Providers", href: "/industries#ftth", desc: "GPON/XGS-PON OLT management and fiber GIS billing." },
    { title: "Wireless Operators", href: "/industries#wireless", desc: "WISP sector capacity tracking and Cambium/Ubiquiti sync." },
    { title: "Cable Operators", href: "/industries#cable", desc: "DOCSIS provisioning and CMTS multi-channel load balancing." },
    { title: "VoIP Providers", href: "/industries#voip", desc: "SIP trunk rating, CDR real-time mediation, and AI voice agents." },
    { title: "Managed IT Providers", href: "/industries#msp", desc: "Multi-tenant SD-WAN and enterprise customer self-care portals." },
  ],
  businessNeed: [
    { title: "Reduce Operating Cost", href: "/solutions#cost", desc: "Replace 6+ legacy licenses with one unified Kashtrix core." },
    { title: "Automate Billing", href: "/billing", desc: "Eliminate manual rating errors and accelerate cash collection." },
    { title: "Improve Network Visibility", href: "/network-management", desc: "Sub-second telemetry across fiber, core, and aggregation layers." },
    { title: "Accelerate Support", href: "/ai-agents#support", desc: "Resolve tier-1 tickets faster with autonomous AI agent diagnostics." },
    { title: "Improve Collections", href: "/billing#collections", desc: "Automated payment reminder voice calls and instant gateway retry." },
    { title: "Scale Field Teams", href: "/field-operations", desc: "Automate GPS dispatching, fiber drop verification, and inventory." },
  ],
  byTeam: [
    { title: "NOC Team", href: "/network-management", desc: "Proactive alarm filtering and automated fault self-healing." },
    { title: "Finance Team", href: "/bss#finance", desc: "Zero-leakage revenue assurance and automated tax compliance." },
    { title: "Billing Team", href: "/billing", desc: "Automated dunning, package rating, and invoice generation." },
    { title: "Support Team", href: "/ai-agents#support", desc: "Unified CRM timeline with instant Radius/OLT diagnostic buttons." },
    { title: "Sales Team", href: "/crm#sales", desc: "Lead qualification AI and automated service availability checking." },
    { title: "Field Operations", href: "/field-operations", desc: "Mobile QR code CPE scanner and offline work order completion." },
    { title: "Leadership", href: "/platform#executive", desc: "Real-time ARPU, churn, uptime, and margin analytics dashboard." },
  ],
};

export const AI_AGENTS_LIST = [
  {
    id: "sales-ai",
    title: "Sales AI",
    role: "Autonomous Lead & Upsell Engine",
    description: "Analyzes subscriber bandwidth exhaustion to recommend dynamic speed upgrades and qualification.",
    icon: "TrendingUp",
    metrics: "ARPU Optimization",
  },
  {
    id: "support-ai",
    title: "Support AI",
    role: "Tier-1 Autonomous Diagnostics",
    description: "Executes real-time Radius session checks, optical loss tests, and router reboots before human dispatch.",
    icon: "Headset",
    metrics: "Instant Deflection",
  },
  {
    id: "billing-ai",
    title: "Billing AI",
    role: "Revenue Assurance & Collections",
    description: "Detects unbilled active circuits, automates payment retry cadences, and resolves dispute tickets.",
    icon: "CreditCard",
    metrics: "99.98% Rating Accuracy",
  },
  {
    id: "noc-ai",
    title: "NOC AI",
    role: "Autonomous Network Self-Healing",
    description: "Correlates thousands of optical and BNG alarms into a single root-cause fiber cut or power event.",
    icon: "Activity",
    metrics: "Reduced MTTR",
  },
  {
    id: "finance-ai",
    title: "Finance AI",
    role: "Real-time Telecom Ledger & Margin",
    description: "Predicts monthly cash flow, reconciles gateway settlements, and calculates live customer acquisition costs.",
    icon: "DollarSign",
    metrics: "Zero Leakage Audit",
  },
  {
    id: "ceo-ai",
    title: "CEO AI",
    role: "Executive Strategic Oracle",
    description: "Synthesizes network uptime, financial runway, and subscriber growth into executive natural language answers.",
    icon: "Briefcase",
    metrics: "Real-Time 360° Clarity",
  },
  {
    id: "voice-ai",
    title: "Voice AI",
    role: "Conversational Telecom Call Assistant",
    description: "Conducts natural voice telephone calls to remind customers of past-due balances or scheduled fiber maintenance.",
    icon: "PhoneCall",
    metrics: "High CSAT Scores",
  },
  {
    id: "automation-ai",
    title: "Automation AI",
    role: "Workflow Code Generator & Verifier",
    description: "Transforms natural language requests into production-verified NETCONF/CLI vendor scripts safely.",
    icon: "Cpu",
    metrics: "10x Deployment Velocity",
  },
];

export const RESOURCES_MEGA = [
  { title: "Free ISP Tools", href: "/tools", desc: "17 Free WISP & fiber engineering calculators, subnet, link budget & CGNAT math." },
  { title: "Documentation", href: "/documentation", desc: "Comprehensive guides for OSS, BSS, and network integration." },
  { title: "API Reference", href: "/api-platform", desc: "REST, GraphQL, and Webhook OpenAPI specifications." },
  { title: "Automation Templates", href: "/network-automation#templates", desc: "Ready-to-run BNG, OLT, and TR-069 workflow blueprints." },
  { title: "Hardware Support Matrix", href: "/hardware-automation#matrix", desc: "Complete vendor compatibility list for Cisco, Huawei, Nokia, etc." },
  { title: "AI Agent Guides", href: "/ai-agents#guides", desc: "How to deploy and fine-tune Kashtrix AI employees for your ISP." },
  { title: "Blog & Insights", href: "/resources#blog", desc: "Latest trends in AI telecom architecture and fiber automation." },
  { title: "Case Studies", href: "/resources#cases", desc: "How ISPs scale subscriber operations with Kashtrix." },
  { title: "Webinars", href: "/resources#webinars", desc: "Live technical deep dives with Kashtrix network architects." },
  { title: "Help Center", href: "/documentation#help", desc: "Searchable troubleshooting FAQs and ticketing support." },
  { title: "Release Notes", href: "/resources#releases", desc: "Weekly updates, new vendor drivers, and performance upgrades." },
  { title: "Security Center", href: "/security", desc: "SOC 2 Type II compliance, ISO 27001, and zero-trust architecture." },
  { title: "Community Forum", href: "/resources#community", desc: "Connect with telecom engineers and automation architects." },
];
