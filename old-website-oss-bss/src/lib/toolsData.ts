export interface ToolDetailData {
  slug: string;
  toolId: string;
  name: string;
  category: "RF & Fiber" | "Network & IP" | "Business & Ops" | "Power & Math";
  tag: string;
  title: string;
  description: string;
  explainerHeading: string;
  explainerText: string;
  whyItMatters: string;
  workedExample: {
    scenario: string;
    inputs: Record<string, string>;
    results: Record<string, string>;
    explanation: string;
  };
  faqs: Array<{ question: string; answer: string }>;
}

export const TOOLS_DETAIL_MAP: Record<string, ToolDetailData> = {
  "cgnat-calculator": {
    slug: "cgnat-calculator",
    toolId: "cgnat",
    name: "CGNAT Calculator",
    category: "Network & IP",
    tag: "NAT & IPv4 Pool",
    title: "Carrier-Grade NAT (CGNAT) Pool & Port Allocation Calculator | Kashtrix",
    description: "Calculate CGNAT public IPv4 address requirements, subscriber port block allocations, and NAT444 capacity for ISPs and WISPs.",
    explainerHeading: "Understanding Carrier-Grade NAT (CGNAT) Capacity Planning",
    explainerText: "Carrier-Grade NAT (CGNAT or NAT444) allows ISPs to share public IPv4 addresses across thousands of broadband subscribers by assigning deterministic or dynamic port blocks (e.g., 1024 or 2048 TCP/UDP ports per subscriber).",
    whyItMatters: "Due to IPv4 exhaustion, purchasing public IPv4 blocks costs over $35–$50 per IP. CGNAT reduces public IPv4 requirements by 1:32 or 1:64 ratios while maintaining compliance with law enforcement logging mandates.",
    workedExample: {
      scenario: "ISP with 8,000 active fiber subscribers provisioning 1,024 ports per subscriber",
      inputs: {
        "Subscribers": "8,000",
        "Ports Per Subscriber": "1,024 (Ports 1024 - 65535)",
        "Public Ports Available Per IP": "63,488 usable ports",
      },
      results: {
        "Subscribers Per Public IP": "62 subscribers/IP",
        "Public IPv4 Subnet Needed": "129 Public IPs (/25 Subnet)",
        "Total Active Port Mappings": "8,192,000 concurrent ports",
      },
      explanation: "Dividing 63,488 usable ports per public IP by 1,024 ports per subscriber allows 62 subscribers to share a single public IP address. Supporting 8,000 subscribers requires 129 public IPs (/25 CIDR block).",
    },
    faqs: [
      {
        question: "What is a recommended port block allocation per subscriber?",
        answer: "Most residential broadband ISPs allocate between 1,024 and 2,048 ports per subscriber. Smart TVs, gaming consoles, and mobile devices average 150-300 concurrent NAT sessions."
      },
      {
        question: "How does CGNAT impact online gaming and P2P applications?",
        answer: "Deterministic CGNAT with UPnP/PCP (Port Control Protocol) or dedicated static public IP add-ons resolves strict NAT type issues for gamers."
      },
      {
        question: "What syslog logging is required for CGNAT legal compliance?",
        answer: "ISPs must log public IP, assigned port range, subscriber internal IP, and allocation timestamp to respond to subpoena requests from law enforcement."
      }
    ]
  },

  "gpon-splitter-calculator": {
    slug: "gpon-splitter-calculator",
    toolId: "gpon-splitter",
    name: "GPON Splitter & Optical Budget Calculator",
    category: "RF & Fiber",
    tag: "FTTH & PON",
    title: "GPON Optical Loss & Splitter Budget Calculator | Kashtrix",
    description: "Calculate GPON optical power loss, splitter attenuation (1:2 to 1:64), fiber distance loss, and ONT rx signal budget.",
    explainerHeading: "Calculating GPON Optical Power Budgets & Attenuation",
    explainerText: "GPON networks rely on passive optical splitters to distribute laser signals from an OLT port to up to 64 or 128 ONTs. Every splitter stage introduces insertion loss, which must be factored into the overall ITU-T G.984 optical budget.",
    whyItMatters: "Maintaining ONT optical receiving power between -8 dBm and -27 dBm prevents intermittent subscriber disconnects, high bit error rates (BER), and transceiver burn-outs.",
    workedExample: {
      scenario: "1:32 optical split over an 8.0 km feeder fiber strand with Class C+ OLT SFP module (+5 dBm TX)",
      inputs: {
        "OLT SFP Transmit Power": "+5.0 dBm (Class C+)",
        "Fiber Distance": "8.0 km @ 1310/1490nm (0.35 dB/km)",
        "Optical Split Ratio": "1:32 Splitter (17.5 dB loss)",
        "Splices & Connectors": "4 splices (0.4 dB) + 2 connectors (1.0 dB)",
      },
      results: {
        "Total Fiber Loss": "2.8 dB",
        "Total Splitter & Insertion Loss": "18.9 dB",
        "Estimated ONT Receive Power": "-16.7 dBm (Optimal Class B+/C+ Range)",
      },
      explanation: "Subtracting fiber distance loss (2.8 dB), splitter loss (17.5 dB), and connector loss (1.4 dB) from +5.0 dBm TX yields -16.7 dBm at the subscriber ONT, well within the -8 dBm to -27 dBm operating window.",
    },
    faqs: [
      {
        question: "What is the insertion loss of common GPON splitters?",
        answer: "Typical optical splitter losses: 1:2 (3.5 dB), 1:4 (7.2 dB), 1:8 (10.5 dB), 1:16 (14.0 dB), 1:32 (17.5 dB), 1:64 (20.8 dB)."
      },
      {
        question: "What optical power ranges indicate a healthy FTTH connection?",
        answer: "Optimal ONT receive power is between -12 dBm and -24 dBm. Signals below -27 dBm cause LOS (Loss of Signal) alarms, while signals above -8 dBm risk receiver saturation."
      },
      {
        question: "What is the maximum optical split ratio supported by GPON and XGS-PON?",
        answer: "GPON supports up to 1:64 or 1:128 split ratios depending on OLT Class C+ optics. XGS-PON supports 1:128 splits over 20 km distances."
      }
    ]
  },

  "ipv4-subnet-calculator": {
    slug: "ipv4-subnet-calculator",
    toolId: "ipv4-subnet",
    name: "IPv4 Subnet & CIDR Calculator",
    category: "Network & IP",
    tag: "Addressing & CIDR",
    title: "IPv4 Subnet & CIDR Mask Calculator for Network Engineers | Kashtrix",
    description: "Calculate network address, broadcast address, subnet mask, wildcard mask, and usable host ranges for any IPv4 CIDR prefix.",
    explainerHeading: "IPv4 Subnetting & CIDR Address Calculations",
    explainerText: "Subnetting divides an IP network into smaller sub-networks, enabling efficient allocation of IP addresses across subscriber VLANs, OLT management subnets, and BNG pools.",
    whyItMatters: "Proper IPv4 subnetting prevents broadcast storm propagation, optimizes routing table aggregation, and conserves valuable public and private IP space.",
    workedExample: {
      scenario: "Subnetting 192.168.10.45 with a /24 CIDR prefix",
      inputs: {
        "IP Address": "192.168.10.45",
        "CIDR Prefix": "/24 (255.255.255.0)",
      },
      results: {
        "Network Address": "192.168.10.0",
        "Broadcast Address": "192.168.10.255",
        "Usable Host Range": "192.168.10.1 - 192.168.10.254",
        "Usable Hosts": "254 hosts",
      },
      explanation: "A /24 prefix uses 24 bits for the network and 8 bits for hosts, offering 256 total IP addresses, of which 254 are usable for routers, switches, and customer endpoints.",
    },
    faqs: [
      {
        question: "Why are 2 IP addresses subtracted from total hosts in a subnet?",
        answer: "The first address represents the Network ID (identifies the subnet) and the last address represents the Broadcast ID (used to send packets to all hosts)."
      },
      {
        question: "What CIDR prefix is used for point-to-point router links?",
        answer: "Modern networks use /31 (RFC 3021, 2 usable IPs) or /30 (4 total IPs, 2 usable) for point-to-point links between core routers and switches."
      },
      {
        question: "How do I calculate wildcard masks for OSPF and ACLs?",
        answer: "A wildcard mask is the bitwise inverse of the subnet mask. For example, a 255.255.255.0 mask yields a wildcard mask of 0.0.0.255."
      }
    ]
  },

  "ipv6-subnet-calculator": {
    slug: "ipv6-subnet-calculator",
    toolId: "ipv6-subnet",
    name: "IPv6 Subnet & Prefix Calculator",
    category: "Network & IP",
    tag: "IPv6 Subnetting",
    title: "IPv6 Subnet & Prefix Allocation Calculator | Kashtrix",
    description: "Calculate IPv6 expanded addresses, subnet ranges, prefix breakdowns, and total /64 subnets from any IPv6 prefix (/48, /56, /64).",
    explainerHeading: "Planning IPv6 Address Space & Prefix Delegation",
    explainerText: "IPv6 uses 128-bit addresses written in hexadecimal notation. ISPs typically receive a /32 or /48 prefix from their Regional Internet Registry (RIR) and delegate /56 or /64 prefixes to residential and enterprise customers.",
    whyItMatters: "Unlike IPv4, IPv6 eliminates NAT. Proper prefix delegation ensures every subscriber router receives a static or dynamic /56 prefix containing 256 individual /64 subnets.",
    workedExample: {
      scenario: "Delegating subnets from a /48 enterprise IPv6 allocation (2001:db8:85a3::/48)",
      inputs: {
        "IPv6 Address Prefix": "2001:db8:85a3::/48",
        "Target Customer Delegation": "/56 per subscriber",
      },
      results: {
        "Expanded IPv6 Address": "2001:0db8:85a3:0000:0000:0000:0000:0000",
        "Total /56 Subnets": "256 subscriber sites",
        "Total /64 Subnets": "65,536 LAN subnets",
      },
      explanation: "A /48 prefix leaves 8 bits available to create 256 distinct /56 customer allocations, or 16 bits to create 65,536 standard /64 subnets for internal routing.",
    },
    faqs: [
      {
        question: "What prefix size should ISPs delegate to residential customers?",
        answer: "RIR best practices (APNIC, ARIN, RIPE) recommend delegating a /56 prefix (giving the customer 256 /64 subnets) or at minimum a /60 prefix."
      },
      {
        question: "What is SLAAC and why are /64 prefixes standard for LANs?",
        answer: "Stateless Address Autoconfiguration (SLAAC) requires a /64 prefix length to automatically generate 64-bit Interface IDs (EUI-64 or randomized privacy addresses)."
      },
      {
        question: "Do IPv6 subnets require broadcast addresses?",
        answer: "No. IPv6 eliminates broadcast entirely and uses ICMPv6 multicast groups (e.g., ff02::1 for all nodes) for neighbor discovery."
      }
    ]
  },

  "link-budget-calculator": {
    slug: "link-budget-calculator",
    toolId: "link-budget",
    name: "Wireless Link Budget & FSPL Calculator",
    category: "RF & Fiber",
    tag: "Wireless & Microwave",
    title: "Wireless Link Budget & Free Space Path Loss (FSPL) Calculator | Kashtrix",
    description: "Calculate FSPL, RSSI, link margin, and EIRP for outdoor fixed wireless links (2.4GHz, 5GHz, 11GHz, 60GHz, 80GHz).",
    explainerHeading: "Calculating Fixed Wireless Link Budgets & Signal Strength",
    explainerText: "A wireless link budget calculates the received signal indicator (RSSI) by adding transmitter power and antenna gains, then subtracting free space path loss (FSPL) and cable losses across a given distance and frequency.",
    whyItMatters: "Designing microwave backhaul and WISP subscriber connections with a minimum 15–20 dB fade margin prevents link drops during heavy rain, thermal fading, or atmospheric interference.",
    workedExample: {
      scenario: "5.8 GHz point-to-point wireless backhaul link over 5.0 kilometers",
      inputs: {
        "Frequency": "5.8 GHz",
        "Distance": "5.0 km",
        "TX Power": "+27 dBm",
        "TX & RX Antenna Gain": "23 dBi (Dish Antennas)",
        "Cable & Connector Loss": "2.0 dB",
      },
      results: {
        "Free Space Path Loss (FSPL)": "121.7 dB",
        "EIRP (Effective Isotropic Radiated Power)": "+49.0 dBm",
        "Received Signal Strength (RSSI)": "-49.7 dBm (Excellent Signal)",
      },
      explanation: "Combining +27 dBm TX power with +46 dBi total antenna gain minus 2 dB cable loss and 121.7 dB FSPL produces an RSSI of -49.7 dBm, delivering maximum modulation (1024-QAM).",
    },
    faqs: [
      {
        question: "What is Free Space Path Loss (FSPL) and how is it calculated?",
        answer: "FSPL represents signal attenuation over open space without obstacles. It increases logarithmically with distance and frequency: FSPL(dB) = 20log10(d) + 20log10(f) + 32.44."
      },
      {
        question: "What is a recommended fade margin for PTP and PTMP links?",
        answer: "Maintain a minimum 15 dB fade margin for 5 GHz links and 20–25 dB for 11 GHz or 60/80 GHz millimeter wave links susceptible to rain fade."
      },
      {
        question: "How does antenna gain affect link distance?",
        answer: "Doubling antenna gain (+6 dBi total) doubles the theoretical line-of-sight distance for the same target RSSI."
      }
    ]
  },

  "ups-runtime-calculator": {
    slug: "ups-runtime-calculator",
    toolId: "ups-runtime",
    name: "UPS Battery Backup Runtime Calculator",
    category: "Power & Math",
    tag: "Battery & Backup",
    title: "UPS & Solar Battery Backup Runtime Calculator for ISP POPs | Kashtrix",
    description: "Calculate UPS battery backup runtime (hours/minutes) based on power load (Watts), battery voltage (V), capacity (Ah), and inverter efficiency.",
    explainerHeading: "POP Site & Tower UPS Battery Autonomy Planning",
    explainerText: "ISP POP sites, fiber huts, and wireless towers require continuous DC/AC backup power during utility grid outages. Battery runtime depends on total equipment wattage, battery bank voltage, amp-hour (Ah) rating, and inverter efficiency.",
    whyItMatters: "Under-sizing battery banks leads to sudden tower outages during storms, while proper sizing ensures 4 to 12 hours of autonomy until backup generators kick in.",
    workedExample: {
      scenario: "Tower POP running 350 Watts load on a 48V 100Ah Deep-Cycle AGM Battery Bank",
      inputs: {
        "Equipment Load": "350 Watts",
        "Battery Bank Voltage": "48 Volts DC",
        "Battery Capacity": "100 Ah",
        "Inverter Efficiency": "85%",
      },
      results: {
        "Total Stored Energy": "4,800 Watt-Hours (4.8 kWh)",
        "Usable Energy (85% Eff)": "4,080 Watt-Hours",
        "Estimated Backup Runtime": "11 Hours 39 Minutes",
      },
      explanation: "Multiplying 48V by 100Ah gives 4,800 Wh of raw capacity. Applying 85% inverter efficiency yields 4,080 Wh, which powers a 350W load for 11.65 hours.",
    },
    faqs: [
      {
        question: "What depth of discharge (DoD) should be factored for Lead-Acid vs Lithium (LiFePO4)?",
        answer: "Lead-Acid/AGM batteries should only be discharged to 50% DoD to preserve lifespan, whereas Lithium Iron Phosphate (LiFePO4) supports 80%–90% DoD without degradation."
      },
      {
        question: "How do temperature fluctuations affect battery runtime?",
        answer: "Battery capacity drops approximately 1% for every 1°C below 25°C. Outdoor enclosures in freezing climates require insulated or heated battery compartments."
      },
      {
        question: "Why should DC power systems be used instead of AC inverters at tower sites?",
        answer: "Direct 24V or 48V DC power systems eliminate AC-to-DC conversion losses, improving energy efficiency by 15%–20% compared to traditional AC UPS units."
      }
    ]
  },

  "sla-uptime-calculator": {
    slug: "sla-uptime-calculator",
    toolId: "sla-uptime",
    name: "SLA Uptime & Downtime Calculator",
    category: "Business & Ops",
    tag: "Compliance & SLA",
    title: "SLA Uptime & Allowed Downtime Calculator | Kashtrix",
    description: "Convert SLA uptime percentages (99.9%, 99.99%, 99.999%) to allowable downtime per day, week, month, and year.",
    explainerHeading: "Calculating Service Level Agreement (SLA) Downtime Limits",
    explainerText: "Service Level Agreements (SLAs) define guaranteed network availability. High-availability enterprise fiber circuits mandate 99.9% ('three nines') to 99.999% ('five nines') uptime.",
    whyItMatters: "Exceeding allowable downtime triggers SLA penalty credits, contract breaches, and customer churn. ISPs use SLA metrics to set emergency dispatch escalation rules.",
    workedExample: {
      scenario: "Enterprise Dedicated Internet Access (DIA) circuit with 99.9% uptime SLA",
      inputs: {
        "Target Availability SLA": "99.9% Uptime",
        "Time Horizon": "1 Year (365 Days / 8,760 Hours)",
      },
      results: {
        "Daily Allowable Downtime": "1 Minute 26 Seconds",
        "Monthly Allowable Downtime": "43 Minutes 49 Seconds",
        "Annual Allowable Downtime": "8 Hours 45 Minutes 57 Seconds",
      },
      explanation: "A 99.9% SLA allows a total cumulative downtime of no more than 8 hours, 45 minutes across an entire operational year.",
    },
    faqs: [
      {
        question: "What is the difference between 99.9% and 99.99% uptime SLA?",
        answer: "99.9% uptime allows 8.76 hours of annual downtime, while 99.99% ('four nines') allows only 52.6 minutes of downtime per year."
      },
      {
        question: "Do planned maintenance windows count against SLA uptime limits?",
        answer: "Standard enterprise contracts exclude scheduled maintenance windows (e.g., Sunday 02:00-04:00 AM) if advance notice of 48-72 hours is provided."
      },
      {
        question: "How do ISPs calculate SLA penalty credits?",
        answer: "SLA penalties typically refund 5% to 10% of monthly recurring charges (MRC) for every hour of downtime exceeding contract limits."
      }
    ]
  },

  "dbm-to-watt-calculator": {
    slug: "dbm-to-watt-calculator",
    toolId: "dbm-watt-converter",
    name: "dBm to Watt & Power Converter",
    category: "Power & Math",
    tag: "RF Power Math",
    title: "dBm to Watt & Milliwatt (mW) Converter | Kashtrix",
    description: "Convert RF and optical signal power between dBm, milliwatts (mW), watts (W), and decibel ratios.",
    explainerHeading: "Understanding Logarithmic RF & Optical Power Scale (dBm)",
    explainerText: "dBm is a logarithmic power unit referenced to 1 milliwatt (0 dBm = 1 mW). Decibels simplify signal calculations by allowing addition/subtraction instead of multiplication.",
    whyItMatters: "Wireless and fiber optic engineers switch between logarithmic dBm ratings (e.g., +30 dBm transmitter output) and linear Watt metrics (e.g., 1 Watt transmitter power).",
    workedExample: {
      scenario: "Converting a +30 dBm radio transmitter output into Milliwatts and Watts",
      inputs: {
        "Power Value": "+30 dBm",
        "Reference Base": "1 Milliwatt (1 mW)",
      },
      results: {
        "Power in Milliwatts (mW)": "1,000 mW",
        "Power in Watts (W)": "1.0 Watt",
        "Power in MicroWatts (µW)": "1,000,000 µW",
      },
      explanation: "Formula: P(mW) = 10^(dBm / 10). Plugging in +30 dBm gives 10^3 = 1,000 mW, which equals exactly 1.0 Watt.",
    },
    faqs: [
      {
        question: "What is the rule of 3 dB and 10 dB in RF power?",
        answer: "Adding +3 dB doubles power in Watts (e.g., 20 dBm = 100 mW, 23 dBm = 200 mW). Adding +10 dB increases power tenfold (e.g., 10 dBm = 10 mW, 20 dBm = 100 mW)."
      },
      {
        question: "What does negative dBm indicate (e.g., -20 dBm)?",
        answer: "Negative dBm represents power levels below 1 milliwatt. For example, -20 dBm equals 0.01 mW (10 microwatts), typical for optical receiver power."
      },
      {
        question: "What is the difference between dB, dBm, and dBi?",
        answer: "dB measures relative gain/loss ratio; dBm measures absolute power referenced to 1 mW; dBi measures antenna gain relative to an isotropic radiator."
      }
    ]
  },

  "tower-revenue-calculator": {
    slug: "tower-revenue-calculator",
    toolId: "tower-revenue",
    name: "Tower Revenue & ROI Calculator",
    category: "Business & Ops",
    tag: "Profitability & ROI",
    title: "ISP Tower Revenue & Break-Even ROI Calculator | Kashtrix",
    description: "Calculate WISP tower profitability, monthly OPEX, recurring revenue, net profit margin, and CAPEX payback period.",
    explainerHeading: "WISP Tower Site Financial Modeling & Payback Analysis",
    explainerText: "Deploying a wireless tower site involves upfront CAPEX (tower hardware, radios, antennas, battery backup) and monthly OPEX (site lease, power, internet backhaul).",
    whyItMatters: "Analyzing revenue per subscriber and site operational costs enables WISPs to determine the exact number of subscribers needed to reach break-even status.",
    workedExample: {
      scenario: "Tower POP with 180 subscribers at $45 ARPU, $600/mo tower lease, $300 power, and $500 backhaul",
      inputs: {
        "Active Subscribers": "180",
        "Average Revenue Per User (ARPU)": "$45.00 / month",
        "Monthly Site Expenses": "$1,400 / month (Lease + Power + Backhaul)",
        "Initial CAPEX Deployment Cost": "$15,000",
      },
      results: {
        "Gross Monthly Revenue": "$8,100 / month",
        "Net Monthly Operating Profit": "$6,700 / month",
        "CAPEX Payback Period": "2.2 Months",
      },
      explanation: "Generating $8,100 monthly revenue against $1,400 OPEX delivers $6,700 net monthly profit, fully recouping the $15,000 initial tower build cost in 2.2 months.",
    },
    faqs: [
      {
        question: "What is a healthy payback period for a new WISP tower site?",
        answer: "A payback period of 3 to 9 months is considered excellent for WISP tower sites. Payback periods exceeding 18 months signal high site lease or backhaul costs."
      },
      {
        question: "What ARPU is typical for fixed wireless residential broadband?",
        answer: "Residential WISP ARPU ranges between $45 and $75/month depending on speed tiers (50 Mbps to 300 Mbps) and market competition."
      },
      {
        question: "How can tower co-location leases improve profitability?",
        answer: "Leasing unused tower vertical space or antenna mounts to third-party operators generates secondary passive monthly revenue that offsets site OPEX."
      }
    ]
  },

  "data-bandwidth-converter": {
    slug: "data-bandwidth-converter",
    toolId: "data-bandwidth-converter",
    name: "Data & Bandwidth Unit Converter",
    category: "Power & Math",
    tag: "Speed & Conversion",
    title: "Data & Bandwidth Speed Unit Converter | Kashtrix",
    description: "Convert between Mbps, Gbps, MB/s, GB/s, and calculate file download duration across network connection speeds.",
    explainerHeading: "Converting Network Throughput & Download Times",
    explainerText: "Network bandwidth is measured in bits per second (bps, Mbps, Gbps), whereas stored file sizes are measured in bytes (B, MB, GB). One byte equals 8 bits.",
    whyItMatters: "Understanding the 8:1 ratio between bits and bytes clarifies why a 100 Mbps broadband connection downloads data at a peak speed of 12.5 MB/sec.",
    workedExample: {
      scenario: "Downloading a 50 Gigabyte (GB) software image over a 100 Mbps broadband link",
      inputs: {
        "File Size": "50 Gigabytes (GB)",
        "Connection Speed": "100 Mbps",
      },
      results: {
        "Download Speed in MB/sec": "12.5 MB/sec",
        "Total File Size in Bits": "400,000 Megabits (Mb)",
        "Estimated Download Time": "1 Hour 6 Minutes 40 Seconds",
      },
      explanation: "Dividing 50 GB (400,000 Mb) by 100 Mbps yields 4,000 seconds, which equals 1 hour, 6 minutes, and 40 seconds of continuous transfer time.",
    },
    faqs: [
      {
        question: "Why does a 1 Gbps fiber connection not download at 1,000 MB/sec?",
        answer: "1 Gbps equals 1,000 Megabits per second. Dividing by 8 bits per byte gives a theoretical maximum transfer rate of 125 Megabytes (MB) per second."
      },
      {
        question: "What network protocol overhead should be subtracted from raw bandwidth?",
        answer: "TCP/IP header overhead, Ethernet framing, and TCP windowing reduce usable payload throughput by approximately 3% to 5%."
      },
      {
        question: "What is the difference between Megabytes (MB) and Mebibytes (MiB)?",
        answer: "Megabytes use decimal notation (10^6 = 1,000,000 bytes), while Mebibytes use binary notation (2^20 = 1,048,576 bytes)."
      }
    ]
  },

  "bandwidth-calculator": {
    slug: "bandwidth-calculator",
    toolId: "bandwidth-planning",
    name: "ISP Oversubscription & Backhaul Calculator",
    category: "RF & Fiber",
    tag: "Backhaul & Capacity",
    title: "ISP Backhaul Bandwidth & Oversubscription Calculator | Kashtrix",
    description: "Calculate total required internet backhaul capacity based on subscriber count, package plan speeds, and peak oversubscription ratios.",
    explainerHeading: "Calculating ISP Backhaul Capacity & Peak Concurrency Ratios",
    explainerText: "ISPs rely on oversubscription because residential subscribers rarely utilize their full package bandwidth simultaneously. An oversubscription ratio of 20:1 means 20 subscribers share 1 unit of peak capacity.",
    whyItMatters: "Calculating oversubscription prevents network congestion during 8 PM – 11 PM peak usage hours while avoiding over-purchasing wholesale IP transit bandwidth.",
    workedExample: {
      scenario: "1,500 subscribers on 100 Mbps package plans with a 20:1 peak oversubscription ratio",
      inputs: {
        "Total Active Subscribers": "1,500",
        "Package Speed Plan": "100 Mbps per subscriber",
        "Oversubscription Ratio": "20:1",
      },
      results: {
        "Total Subscribed Capacity": "150,000 Mbps (150 Gbps)",
        "Required Peak Backhaul Transit": "7,500 Mbps (7.5 Gbps)",
        "Average Bandwidth Per Subscriber": "5 Mbps peak allocated",
      },
      explanation: "Dividing total subscribed capacity (150 Gbps) by the 20:1 oversubscription ratio shows that a 7.5 Gbps wholesale IP transit pipe supports 1,500 100 Mbps users with zero congestion.",
    },
    faqs: [
      {
        question: "What oversubscription ratios are standard for residential vs enterprise broadband?",
        answer: "Residential ISPs operate between 15:1 and 30:1 oversubscription ratios. Enterprise Dedicated Internet Access (DIA) is sold at 1:1 or 2:1 ratios."
      },
      {
        question: "How does 4K video streaming impact peak bandwidth utilization?",
        answer: "4K Netflix/YouTube streams require 15-25 Mbps per active session. During evening peak hours, concurrent streaming increases average subscriber bandwidth draw to 3–6 Mbps."
      },
      {
        question: "How can local caching and peering lower transit bandwidth costs?",
        answer: "Deploying local CDN caches (Netflix OCA, Google GGC, Akamai) and connecting to Internet Exchange Points (IXPs) offloads 40%–60% of transit traffic."
      }
    ]
  },

  "roi-comparison-calculator": {
    slug: "roi-comparison-calculator",
    toolId: "roi-comparison",
    name: "Kashtrix Platform ROI & Cost Savings Calculator",
    category: "Business & Ops",
    tag: "Kashtrix Savings",
    title: "Kashtrix Platform ROI & Software Cost Savings Calculator | Kashtrix",
    description: "Calculate monthly and annual cost savings when upgrading legacy ISP billing software (Splynx, Sonar, PowerCode) to Kashtrix.",
    explainerHeading: "Evaluating ISP OSS/BSS Software Licensing & Automation ROI",
    explainerText: "Legacy ISP billing systems charge high per-subscriber monthly fees ($1.50 - $2.50/sub) and charge extra for modules like Syslog, TR-069, or AI dispatch.",
    whyItMatters: "Consolidating billing, RADIUS, syslog logging, and field dispatch into Kashtrix reduces per-subscriber software licensing expense by up to 60%.",
    workedExample: {
      scenario: "ISP with 3,500 active broadband subscribers currently paying $1.60/sub/month on legacy software",
      inputs: {
        "Active Subscribers": "3,500",
        "Legacy Platform Cost": "$1.60 / subscriber / month ($5,600/mo)",
        "Kashtrix All-in-One Rate": "$0.65 / subscriber / month ($2,275/mo)",
      },
      results: {
        "Legacy Annual Expense": "$67,200 / year",
        "Kashtrix Annual Expense": "$27,300 / year",
        "Annual Cost Reduction": "$39,900 Saved / Year (59.3% Savings)",
      },
      explanation: "Upgrading 3,500 subscribers to Kashtrix saves $3,325 per month ($39,900 annually) while adding built-in Carrier Syslog and NOC AI agents.",
    },
    faqs: [
      {
        question: "Does Kashtrix charge extra for RADIUS, Syslog, or API usage?",
        answer: "No. All core modules including FreeRADIUS AAA, CGNAT Syslog logging, Fiber GIS mapping, and REST APIs are included in unified subscription tiers."
      },
      {
        question: "How long does subscriber data migration take from legacy platforms?",
        answer: "Automated database migration scripts import subscriber accounts, active packages, billing ledgers, and RADIUS credentials in under 48 hours."
      },
      {
        question: "What operational time savings are achieved through AI automation?",
        answer: "Automated dunning, self-healing TR-069 resets, and AI support ticketing reduce customer support call volume by 35%–50%."
      }
    ]
  },

  "mac-address-lookup": {
    slug: "mac-address-lookup",
    toolId: "mac-lookup",
    name: "MAC Address OUI & Vendor Lookup",
    category: "Network & IP",
    tag: "Hardware Vendor OUI",
    title: "MAC Address OUI & Hardware Manufacturer Lookup | Kashtrix",
    description: "Search MAC addresses to identify hardware manufacturers (MikroTik, Ubiquiti, Huawei, Cisco, Nokia) and decode OUI prefix bits.",
    explainerHeading: "Identifying Network Device Manufacturers via MAC OUI",
    explainerText: "A MAC (Media Access Control) address is a 48-bit unique identifier. The first 24 bits (3 octets) represent the Organizationally Unique Identifier (OUI) assigned by IEEE.",
    whyItMatters: "Instantly decoding MAC OUIs helps NOC engineers identify unauthorized routers, pinpoint rogue CPE switches, and verify subscriber ONT hardware vendor types.",
    workedExample: {
      scenario: "Inspecting a connected subscriber MAC address: 00:0C:42:A1:B2:C3",
      inputs: {
        "Target MAC Address": "00:0C:42:A1:B2:C3",
        "First 3 Octets (OUI)": "00:0C:42",
      },
      results: {
        "Identified Hardware Vendor": "MikroTik (RouterBOARD / RouterOS)",
        "OUI Registration Hex": "00-0C-42",
        "Device Type Category": "Enterprise Router / Wireless AP",
      },
      explanation: "Matching the 00:0C:42 OUI prefix against IEEE registry databases identifies the connected endpoint as a MikroTik RouterBOARD device.",
    },
    faqs: [
      {
        question: "What is an OUI in a MAC address?",
        answer: "An Organizationally Unique Identifier (OUI) is a 24-bit number assigned by IEEE to hardware manufacturers to ensure globally unique device MACs."
      },
      {
        question: "How do randomized MAC addresses on iOS/Android affect ISP authentication?",
        answer: "Mobile OS privacy features randomize MACs on public Wi-Fi. ISP subscriber provisioning uses PPPoE credentials or Option 82 DHCP circuit-IDs instead of MACs for billing."
      },
      {
        question: "What is the difference between unicast and multicast MAC addresses?",
        answer: "If the least significant bit of the first octet is 0, the MAC is unicast. If it is 1 (e.g., 01:00:5E), it is a multicast MAC address."
      }
    ]
  },

  "dns-lookup": {
    slug: "dns-lookup",
    toolId: "dns-lookup",
    name: "DNS Record & Propagation Lookup",
    category: "Network & IP",
    tag: "DNS Diagnostics",
    title: "DNS Record & Propagation Lookup Tool | Kashtrix",
    description: "Query live A, AAAA, MX, TXT, NS, CNAME, and SOA DNS records using Google DNS over HTTPS (DoH).",
    explainerHeading: "Diagnosing Domain Name System (DNS) Resolution & Records",
    explainerText: "DNS maps human-readable domain names to IPv4/IPv6 addresses and configures mail servers (MX), domain verification (TXT/SPF), and authoritative name servers (NS).",
    whyItMatters: "Verifying live DNS records detects propagation delays, misconfigured SPF/DKIM mail records, broken CNAME aliases, and Webhook endpoint resolution failures.",
    workedExample: {
      scenario: "Performing a live DNS query for kashtrix.com",
      inputs: {
        "Target Domain": "kashtrix.com",
        "Resolver Engine": "Google DNS-over-HTTPS (1.1.1.1 / 8.8.8.8)",
      },
      results: {
        "A Records": "104.21.48.92, 172.67.182.11",
        "AAAA Records": "2606:4700:3031::6815:305c",
        "MX Records": "10 mail.kashtrix.com",
        "TXT Records": "v=spf1 include:_spf.google.com ~all",
      },
      explanation: "Querying Google DoH returns active IPv4 Anycast addresses, IPv6 endpoints, and valid SPF authorization records.",
    },
    faqs: [
      {
        question: "What is DNS TTL (Time To Live)?",
        answer: "TTL specifies the number of seconds intermediate DNS resolvers may cache a record before querying authoritative name servers for updates."
      },
      {
        question: "What is the function of MX and TXT records?",
        answer: "MX records designate mail exchange servers for email routing. TXT records hold domain validation keys, SPF anti-spoofing policies, and DKIM signatures."
      },
      {
        question: "How does DNS-over-HTTPS (DoH) improve subscriber privacy?",
        answer: "DoH encrypts DNS queries inside HTTPS (port 443) sessions, preventing third-party eavesdropping and DNS spoofing attacks."
      }
    ]
  },

  "what-is-my-ip": {
    slug: "what-is-my-ip",
    toolId: "what-is-my-ip",
    name: "What Is My IP & Client Connection Detector",
    category: "Network & IP",
    tag: "Client Detection",
    title: "What Is My IP Address & Live ISP Connection Detector | Kashtrix",
    description: "Detect your public IPv4 or IPv6 address, reverse DNS hostname, ISP network provider, and geographic gateway location instantly.",
    explainerHeading: "Live Client IP Detection & Connection Diagnostics",
    explainerText: "Your public IP address is the unique numerical identifier assigned to your Internet connection by your ISP, visible to all external servers across the global web.",
    whyItMatters: "Verifying your live public IP confirms whether your connection is routed through a CGNAT pool, an active VPN tunnel, or a dedicated public static IP.",
    workedExample: {
      scenario: "Real-time client browser request from an active fiber broadband connection",
      inputs: {
        "Request Headers": "CF-Connecting-IP / X-Forwarded-For",
        "Server Detector": "Kashtrix Live IP API Endpoint",
      },
      results: {
        "Detected Public IP": "203.0.113.195",
        "Internet Service Provider": "Broadband Network Services",
        "Connection Status": "✓ Live Verified Connection",
      },
      explanation: "Inspecting client HTTP headers server-side detects the actual WAN gateway IP and ISP AS number without relying on third-party tracking scripts.",
    },
    faqs: [
      {
        question: "What is the difference between a Public IP and a Private IP address?",
        answer: "Public IPs are globally routable across the internet. Private IPs (e.g., 192.168.x.x, 10.x.x.x) operate inside local LANs behind NAT routers."
      },
      {
        question: "How do I check if my ISP has placed me behind CGNAT?",
        answer: "Compare the WAN IP reported inside your home router's status page with what this tool detects. If your router WAN IP is in the 100.64.0.0/10 range, you are behind CGNAT."
      },
      {
        question: "Can my public IP address reveal my physical street address?",
        answer: "No. Public IP geolocation identifies your ISP POP city or regional routing hub, not your personal street address."
      }
    ]
  },

  "ip-location-lookup": {
    slug: "ip-location-lookup",
    toolId: "ip-location",
    name: "IP Geolocation & ASN Lookup",
    category: "Network & IP",
    tag: "Geolocation",
    title: "IP Geolocation & Autonomous System (ASN) Lookup | Kashtrix",
    description: "Lookup geographic location, country, city, ISP network, and ASN details for any IPv4 or IPv6 address.",
    explainerHeading: "Geolocating IP Addresses & Autonomous System Numbers (ASN)",
    explainerText: "IP Geolocation correlates IP address ranges with physical country, region, city coordinates, and managing Autonomous System Numbers (ASNs).",
    whyItMatters: "Network administrators use IP geolocation to block malicious traffic from high-risk regions, enforce streaming content licensing, and verify regional BGP routing.",
    workedExample: {
      scenario: "Geolocating target IP address 8.8.8.8",
      inputs: {
        "Target IP Address": "8.8.8.8",
        "Database Engine": "Kashtrix MaxMind / BGP Routing Table Cache",
      },
      results: {
        "IP Address": "8.8.8.8",
        "Country / Region": "United States (US) / California",
        "City Location": "Mountain View",
        "Autonomous System": "AS15169 Google LLC",
      },
      explanation: "Querying BGP routing tables and IP location databases confirms 8.8.8.8 belongs to Google's primary Anycast DNS network (AS15169).",
    },
    faqs: [
      {
        question: "What is an Autonomous System Number (ASN)?",
        answer: "An ASN is a unique number assigned by IANA/RIRs identifying an independent network that participates in global BGP routing."
      },
      {
        question: "How accurate is IP geolocation data?",
        answer: "Country-level geolocation accuracy is over 99%. City-level accuracy ranges between 80% and 90% depending on ISP dynamic IP pools."
      },
      {
        question: "How can ISPs update incorrect IP geolocation entries?",
        answer: "ISPs submit RFC 8805 geofeed files to location providers (MaxMind, IPinfo, DB-IP) to correct subscriber location data."
      }
    ]
  },

  "cidr-calculator": {
    slug: "cidr-calculator",
    toolId: "cidr-calculator",
    name: "CIDR Block & IP Range Calculator",
    category: "Network & IP",
    tag: "CIDR Aggregation",
    title: "CIDR Block & Range Aggregation Calculator | Kashtrix",
    description: "Convert IP ranges to CIDR notation or expand CIDR blocks into starting and ending IP addresses.",
    explainerHeading: "Classless Inter-Domain Routing (CIDR) Block Management",
    explainerText: "CIDR notation (e.g., 10.1.0.0/24) replaces traditional Class A, B, and C networks by appending a prefix length representing active network mask bits.",
    whyItMatters: "CIDR aggregation minimizes global BGP routing table size by summarizing hundreds of individual subnets into single route advertisements.",
    workedExample: {
      scenario: "Calculating CIDR properties for 10.1.0.5 with a /24 mask",
      inputs: {
        "Target CIDR Input": "10.1.0.5/24",
      },
      results: {
        "Network Address": "10.1.0.0",
        "Broadcast Address": "10.1.0.255",
        "Subnet Mask": "255.255.255.0",
        "Total IP Quantity": "256 IP Addresses",
      },
      explanation: "A /24 prefix reserves 24 bits for the network identifier, leaving 8 host bits (2^8 = 256 addresses).",
    },
    faqs: [
      {
        question: "What is CIDR route summarization?",
        answer: "CIDR summarization merges multiple contiguous smaller subnets (e.g., four /24 subnets) into a single larger prefix (e.g., one /22 block)."
      },
      {
        question: "What is the smallest IPv4 prefix allowed in global BGP tables?",
        answer: "Most Tier-1 transit providers drop IPv4 BGP prefixes smaller than /24 to prevent routing table bloat."
      },
      {
        question: "What is the equivalent CIDR prefix for a single host IP?",
        answer: "A single host IPv4 address is represented by a /32 prefix (e.g., 192.168.1.1/32)."
      }
    ]
  }
};

export const ALL_TOOL_SLUGS = Object.keys(TOOLS_DETAIL_MAP);
