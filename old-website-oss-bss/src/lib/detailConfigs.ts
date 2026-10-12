import {
  Activity, Antenna, BellRing, Bot, Boxes, Cable, ChartNoAxesCombined,
  CircleDollarSign, ClipboardCheck, ContactRound, CreditCard, Database,
  FileChartColumn, Gauge, Headset, KeyRound, Landmark, LayoutDashboard,
  MapPinned, Network, PackageSearch, PhoneCall, PlugZap, ReceiptText,
  RefreshCcw, Router, ServerCog, ShieldCheck, Smartphone, Sparkles,
  TicketCheck, UserRoundCheck, UsersRound, Workflow, Wrench,
  type LucideIcon,
} from "lucide-react";
import type { DetailCapability, MarketingDetailConfig } from "@/components/marketing/DetailPageSystem";
import { OSS_BSS_ASSETS, type ServiceAccent } from "@/lib/marketing";

const sharedIntegrations = [
  "Network and AAA systems", "Finance and payment services",
  "Customer communication channels", "Open APIs and event webhooks",
];

const capability = (title: string, description: string, icon: LucideIcon, label?: string): DetailCapability => ({ title, description, icon, label });

function detail(
  accent: ServiceAccent, badge: string, title: string, highlight: string,
  description: string, icon: LucideIcon, image: string, imageAlt: string,
  capabilities: DetailCapability[], workflow: string[],
  metrics: [string, string, string, string] = ["Unified", "Real-time", "API-first", "Role-based"],
): MarketingDetailConfig {
  return {
    accent, badge, title, highlight, description, icon, image, imageAlt, capabilities, workflow,
    integrations: sharedIntegrations,
    metrics: [
      { value: metrics[0], label: "Operating model" },
      { value: metrics[1], label: "Decision speed" },
      { value: metrics[2], label: "Architecture" },
      { value: metrics[3], label: "Control" },
    ],
  };
}

export const DETAIL_CONFIGS = {
  platform: detail("oss", "Unified telecom platform", "Unified ISP Platform.", "AI-powered telecom operating system.", "Connect ISP network operations, subscriber billing, CRM, FreeRADIUS AAA, field work, and automation in one composable telecom platform for ISPs, WISPs and FTTH operators.", LayoutDashboard, OSS_BSS_ASSETS.ossOverview, "Kashtrix unified ISP management and telecom OSS/BSS platform dashboard", [
    capability("Network operations", "Monitor topology, devices, alarms, and service health from one operational layer.", Network, "OSS"),
    capability("Subscriber operations", "Coordinate customer, service, support, and lifecycle context across teams.", UsersRound, "BSS"),
    capability("Revenue workflows", "Bring invoicing, collections, products, and financial events into connected flows.", CircleDollarSign),
    capability("Automation fabric", "Trigger repeatable work across APIs, devices, teams, and business rules.", Workflow),
    capability("Field coordination", "Turn incidents and orders into accountable tasks with operational context.", MapPinned),
  ], ["Connect systems", "Normalize context", "Apply policy", "Coordinate action", "Measure outcomes"]),

  oss: detail("oss", "Operations support system", "Telecom OSS Software.", "For ISP network operations & automation.", "Provision, observe and automate multi-vendor broadband infrastructure including FreeRADIUS AAA, GPON OLTs, BNG gateways and TR-069 CPE management from one ISP operations platform.", Network, OSS_BSS_ASSETS.ossOverview, "ISP network operations and telecom OSS dashboard showing device health and alarms", [
    capability("Real-time NOC", "Unify service health, network signals, and actionable alarms.", Activity, "Monitor"),
    capability("AAA control", "Coordinate subscriber sessions, authentication, authorization, and policy.", KeyRound),
    capability("Fiber operations", "Manage fiber networks, OLTs, topology, and service activation context.", Cable),
    capability("Device lifecycle", "Bring CPE configuration and remote management into repeatable workflows.", Router),
    capability("Incident orchestration", "Convert correlated events into owned operational work.", BellRing),
  ], ["Ingest telemetry", "Correlate events", "Apply network policy", "Execute automation", "Confirm service health"], ["Multi-vendor", "Continuous", "Event-driven", "Operator-led"]),

  bss: detail("bss", "Business support system", "Telecom BSS Software.", "For billing, CRM & subscriber management.", "Give ISP commercial, care, finance and operations teams one customer and service context from subscriber acquisition through renewal and retention.", ContactRound, OSS_BSS_ASSETS.bssOverview, "ISP subscriber billing, CRM and telecom BSS management interface", [
    capability("Customer 360", "Unify identity, services, interactions, balances, and operational history.", ContactRound, "CRM"),
    capability("Product catalog", "Model plans, add-ons, eligibility, pricing, and service rules.", Boxes),
    capability("Order journeys", "Coordinate qualification, fulfillment, activation, and status communication.", ClipboardCheck),
    capability("Revenue management", "Connect charging, invoicing, collections, and reconciliation context.", ReceiptText),
    capability("Customer care", "Resolve requests with service and network context available to agents.", Headset),
  ], ["Capture demand", "Qualify service", "Activate order", "Bill and collect", "Retain subscriber"], ["Customer-led", "Contextual", "Composable", "Auditable"]),

  billing: detail("billing", "Telecom billing", "ISP Billing Software.", "Automated collections & FreeRADIUS AAA.", "Coordinate subscriber plans, automated invoicing, payment collections, dunning, adjustments and FreeRADIUS AAA authentication while keeping ISP finance and customer teams aligned.", ReceiptText, OSS_BSS_ASSETS.billing, "ISP billing software dashboard showing invoices, payments and subscriber billing", [
    capability("Invoice operations", "Generate and track invoices with subscriber and service context.", ReceiptText, "Revenue"),
    capability("Payments", "Connect payment channels, status events, and reconciliation workflows.", CreditCard),
    capability("Collections", "Coordinate reminders, aging policy, and service actions.", CircleDollarSign),
    capability("Financial controls", "Keep adjustments, approvals, and audit trails visible.", Landmark),
    capability("Revenue insights", "Surface trends that help teams act before leakage compounds.", ChartNoAxesCombined),
  ], ["Rate service", "Create invoice", "Notify customer", "Collect payment", "Reconcile revenue"], ["Convergent", "Event-aware", "Policy-driven", "Finance-ready"]),

  crm: detail("bss", "Telecom CRM", "ISP CRM Software.", "Broadband subscriber management.", "Connect ISP subscriber profiles, support tickets, billing, RADIUS sessions and service information around the broadband customer journey from lead to retention.", UsersRound, OSS_BSS_ASSETS.customerManagement, "ISP CRM and broadband subscriber management interface showing customer profiles", [
    capability("Subscriber profile", "See identity, contacts, services, balances, and history together.", ContactRound),
    capability("Lifecycle journeys", "Coordinate onboarding, changes, renewal, and retention work.", RefreshCcw),
    capability("Case context", "Give customer teams relevant network and billing signals.", TicketCheck),
    capability("Commercial pipeline", "Track opportunities and handoffs into fulfillment.", ChartNoAxesCombined),
    capability("Communication", "Orchestrate service messages across supported channels.", Smartphone),
  ], ["Capture lead", "Create subscriber", "Activate service", "Support lifecycle", "Grow relationship"]),

  networkManagement: detail("noc", "Network management", "ISP Network Management.", "AI-powered NOC & fault detection.", "Turn ISP network telemetry, topology, capacity and alarms into a shared operational picture for broadband NOC teams with AI-powered fault detection and root cause analysis.", Gauge, OSS_BSS_ASSETS.nocMonitoring, "ISP network management dashboard showing real-time NOC monitoring and alarms", [
    capability("Service health", "Track network and service condition in one operational view.", Activity),
    capability("Alarm context", "Prioritize events using topology and subscriber impact.", BellRing),
    capability("Capacity insight", "Identify congestion and emerging resource pressure.", Gauge),
    capability("Topology views", "Navigate relationships across sites, links, and devices.", Network),
    capability("Operational reports", "Share trends and evidence across technical teams.", FileChartColumn),
  ], ["Collect signals", "Map dependencies", "Prioritize impact", "Dispatch response", "Verify recovery"], ["Topology-aware", "Continuous", "Signal-led", "NOC-ready"]),

  inventory: detail("inventory", "Inventory management", "ISP & Telecom Inventory.", "Asset management software.", "Connect ISP warehouses, field stock, serialized CPE equipment, ONT installations and network resources with accountable asset lifecycle movements.", Boxes, OSS_BSS_ASSETS.inventoryLifecycle, "ISP inventory and telecom asset management software showing CPE and ONT tracking", [
    capability("Asset registry", "Maintain equipment identity, state, ownership, and location.", Boxes),
    capability("Stock operations", "Coordinate receipt, transfer, reservation, and issue.", PackageSearch),
    capability("Field custody", "Track technician assignments, returns, and consumption.", Wrench),
    capability("Network resources", "Relate physical inventory to deployed service infrastructure.", ServerCog),
    capability("Lifecycle controls", "Manage repair, recovery, retirement, and audit evidence.", RefreshCcw),
  ], ["Receive asset", "Register identity", "Reserve stock", "Deploy resource", "Recover or retire"], ["Serialized", "Traceable", "Workflow-led", "Multi-location"]),

  aiAgents: detail("ai", "AI operations agents", "AI Agents for Telecom.", "OSS/BSS & autonomous network operations.", "Deploy AI agents that detect network faults, correlate alarms, assist NOC engineers, automate ISP billing workflows and accelerate subscriber support with policy-governed automation.", Bot, OSS_BSS_ASSETS.fieldTasks, "AI agents for telecom OSS/BSS showing autonomous network operations workflow", [
    capability("NOC copilot", "Summarize signals, dependencies, and likely next actions.", Sparkles),
    capability("Care assistant", "Prepare subscriber context and recommended responses.", Headset),
    capability("Revenue agent", "Coordinate follow-up around billing and collection events.", CircleDollarSign),
    capability("Field planner", "Help group, prioritize, and prepare operational tasks.", MapPinned),
    capability("Governed actions", "Apply permissions, approvals, and traceable execution paths.", ShieldCheck),
  ], ["Observe context", "Form recommendation", "Check policy", "Request approval", "Execute and learn"], ["Context-aware", "Assisted", "Policy-bound", "Human-approved"]),

  networkAutomation: detail("oss", "Network automation", "ISP Network Automation.", "For RADIUS, BNG, OLT & PPPoE.", "Turn FreeRADIUS authentication, PPPoE sessions, BNG policy, OLT provisioning and remediation procedures into governed ISP operational workflows.", Workflow, OSS_BSS_ASSETS.radiusControl, "ISP network automation showing FreeRADIUS session control and BNG provisioning", [
    capability("AAA workflows", "Coordinate sessions, authorization, accounting, and policy events.", KeyRound),
    capability("Provisioning", "Translate service intent into consistent network actions.", Router),
    capability("Policy control", "Apply bandwidth and service policies with clear ownership.", Gauge),
    capability("Remediation", "Automate approved responses to operational conditions.", Wrench),
    capability("Change evidence", "Record intent, execution, result, and responsible actor.", ClipboardCheck),
  ], ["Receive intent", "Validate policy", "Target resources", "Execute change", "Verify result"], ["Multi-vendor", "Repeatable", "Event-driven", "Governed"]),

  hardwareAutomation: detail("fiber", "Hardware automation", "Multi-Vendor Device Automation.", "OLT, BNG & CPE management for ISPs.", "Coordinate MikroTik, Nokia, Cisco, Huawei and ZTE OLT, CPE and BNG device lifecycle actions through reusable multi-vendor ISP automation workflows.", ServerCog, OSS_BSS_ASSETS.oltManagement, "Multi-vendor OLT and BNG device automation for ISPs showing hardware management", [
    capability("OLT management", "Bring access hardware inventory and operational actions together.", Antenna),
    capability("CPE management", "Coordinate activation and remote configuration workflows.", Router),
    capability("Configuration templates", "Reuse validated intent across sites and vendors.", ClipboardCheck),
    capability("Firmware lifecycle", "Plan and track controlled equipment updates.", RefreshCcw),
    capability("Device diagnostics", "Expose relevant health and service checks to operators.", Activity),
  ], ["Identify device", "Select template", "Validate intent", "Apply configuration", "Confirm health"], ["Vendor-neutral", "Template-led", "API-enabled", "Auditable"]),

  voiceAutomation: detail("support", "Voice automation", "Coordinate every call.", "With business context.", "Connect PBX, subscriber, support, and revenue workflows for more consistent telecom voice operations.", PhoneCall, OSS_BSS_ASSETS.voice, "Voice and PBX management application", [
    capability("PBX operations", "Connect extension, trunk, and call-service context.", PhoneCall),
    capability("Call workflows", "Trigger consistent follow-up from supported call events.", Workflow),
    capability("Customer context", "Make relevant account and service data available to teams.", ContactRound),
    capability("Campaign coordination", "Plan outbound communication with clear operational controls.", Smartphone),
    capability("Service reporting", "Review patterns and outcomes across voice operations.", FileChartColumn),
  ], ["Connect voice system", "Capture call event", "Add subscriber context", "Trigger workflow", "Review outcome"]),

  fieldOperations: detail("field", "Field operations", "Turn service demand.", "Into accountable field work.", "Coordinate installations, incidents, technicians, inventory, and customer communication through one operational workflow.", MapPinned, "/mobile.png", "Kashtrix Field Operations Mobile App for iOS and Android technicians showing GPS dispatch and CPE scanning", [
    capability("Work orders", "Create clear tasks with service, customer, and network context.", ClipboardCheck),
    capability("Dispatch planning", "Assign and sequence work using skills and location context.", MapPinned),
    capability("Mobile execution", "Keep field progress and evidence connected to the operation.", Smartphone),
    capability("Parts coordination", "Relate required and consumed inventory to each job.", PackageSearch),
    capability("Customer updates", "Coordinate status communication through the work lifecycle.", UserRoundCheck),
  ], ["Create work order", "Prioritize demand", "Assign technician", "Complete field work", "Close with evidence"], ["Location-aware", "Prioritized", "Mobile-ready", "Traceable"]),

  apiPlatform: detail("integrations", "API platform", "Make telecom capabilities.", "Composable by design.", "Expose governed services, events, and workflows so teams can extend operations without creating another silo.", PlugZap, OSS_BSS_ASSETS.tr069, "Connected telecom device management workflow", [
    capability("Operational APIs", "Expose focused capabilities around network and business domains.", PlugZap),
    capability("Event webhooks", "Publish relevant changes to downstream workflows.", BellRing),
    capability("Identity and access", "Control integration permissions and service boundaries.", KeyRound),
    capability("Data contracts", "Standardize payloads and integration expectations.", Database),
    capability("Developer visibility", "Track requests, errors, and service behavior.", Activity),
  ], ["Select capability", "Authenticate client", "Submit request", "Process event", "Observe response"], ["Open", "Event-driven", "Versioned", "Governed"]),

  integrations: detail("integrations", "Telecom integrations", "Connect the systems.", "Your operation already depends on.", "Link network, finance, communication, and business services through managed adapters and open interfaces.", PlugZap, OSS_BSS_ASSETS.campaigns, "Telecom communication campaign application", [
    capability("Network adapters", "Connect AAA, access, device, and monitoring systems.", Network),
    capability("Payments", "Coordinate gateways, status events, and reconciliation.", CreditCard),
    capability("Communications", "Connect supported messaging and voice channels.", Smartphone),
    capability("Business systems", "Share context with finance, CRM, and data platforms.", Database),
    capability("Integration health", "See failures and handoffs before they become operational gaps.", Activity),
  ], ["Choose connector", "Map data", "Authorize access", "Activate events", "Monitor health"], ["Adapter-ready", "Connected", "API-first", "Observable"]),

  security: detail("security", "Platform security", "Protect access.", "Preserve operational trust.", "Apply identity, permissions, auditability, and controlled automation across telecom workflows and integrations.", ShieldCheck, OSS_BSS_ASSETS.networkInventory, "Controlled telecom network inventory application", [
    capability("Access controls", "Apply scoped roles and permissions around operational capabilities.", KeyRound),
    capability("Audit evidence", "Maintain traceable records of sensitive changes and actions.", ClipboardCheck),
    capability("Integration security", "Protect credentials and connected service boundaries.", PlugZap),
    capability("Operational guardrails", "Put approvals and policy checks around automation.", ShieldCheck),
    capability("Security visibility", "Surface relevant activity and exceptions for review.", Activity),
  ], ["Authenticate actor", "Evaluate policy", "Authorize action", "Record evidence", "Review exceptions"], ["Identity-led", "Policy-aware", "Auditable", "Defense-in-depth"]),

  syslog: detail("noc", "Carrier-Grade Syslog", "ISP Syslog Server.", "CGNAT compliance & high-throughput logging.", "Ingest high-frequency syslog streams from MikroTik routers, GPON OLTs, BNG gateways and RADIUS servers while maintaining encrypted CGNAT audit archives for law enforcement compliance.", Activity, OSS_BSS_ASSETS.nocMonitoring, "ISP syslog server dashboard showing CGNAT compliance logging and audit search", [
    capability("High-Throughput Ingestion", "Process over 100,000 syslog messages per second via UDP/TCP 514 and TLS.", Activity, "Syslog"),
    capability("CGNAT Audit Archiving", "Log public IP and port mappings to private subscriber profiles with 1-year compliance.", ShieldCheck, "CGNAT"),
    capability("Multi-Vendor Parsers", "Standardized syslog parsers for MikroTik, Cisco, Huawei, Nokia, and OLTs.", ServerCog),
    capability("Automated Alarm Triggers", "Transform syslog fiber attenuation and BGP flaps into field work orders.", BellRing),
    capability("Live Log Filtering", "Filter logs by severity, facility, subscriber ID, or public IP ranges in sub-seconds.", FileChartColumn),
  ], ["Listen on Port 514", "Parse facility payload", "Index subscriber & IP", "Archive encrypted log", "Surface alarms"], ["100K+ msgs/s", "Encrypted", "CGNAT-ready", "Auditable"]),
} satisfies Record<string, MarketingDetailConfig>;
