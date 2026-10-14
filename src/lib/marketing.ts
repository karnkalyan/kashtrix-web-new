export type ServiceAccent =
  | "oss"
  | "bss"
  | "billing"
  | "support"
  | "noc"
  | "msp"
  | "isp"
  | "fiber"
  | "wireless"
  | "security"
  | "field"
  | "integrations"
  | "inventory"
  | "ai";

export const SERVICE_ACCENTS: Record<ServiceAccent, { primary: string; secondary: string; soft: string; gradient: string }> = {
  oss: { primary: "#06B6D4", secondary: "#3B82F6", soft: "rgba(6,182,212,.12)", gradient: "linear-gradient(135deg,#06B6D4,#3B82F6)" },
  bss: { primary: "#EC4899", secondary: "#8B5CF6", soft: "rgba(236,72,153,.12)", gradient: "linear-gradient(135deg,#EC4899,#8B5CF6)" },
  billing: { primary: "#F59E0B", secondary: "#EF4444", soft: "rgba(245,158,11,.12)", gradient: "linear-gradient(135deg,#F59E0B,#EF4444)" },
  support: { primary: "#0EA5E9", secondary: "#14B8A6", soft: "rgba(14,165,233,.12)", gradient: "linear-gradient(135deg,#0EA5E9,#14B8A6)" },
  noc: { primary: "#10B981", secondary: "#06B6D4", soft: "rgba(16,185,129,.12)", gradient: "linear-gradient(135deg,#10B981,#06B6D4)" },
  msp: { primary: "#0D9488", secondary: "#4F46E5", soft: "rgba(13,148,136,.12)", gradient: "linear-gradient(135deg,#0D9488,#4F46E5)" },
  isp: { primary: "#2563EB", secondary: "#6366F1", soft: "rgba(37,99,235,.12)", gradient: "linear-gradient(135deg,#2563EB,#6366F1)" },
  fiber: { primary: "#059669", secondary: "#0284C7", soft: "rgba(5,150,105,.12)", gradient: "linear-gradient(135deg,#059669,#0284C7)" },
  wireless: { primary: "#6366F1", secondary: "#A855F7", soft: "rgba(99,102,241,.12)", gradient: "linear-gradient(135deg,#6366F1,#A855F7)" },
  security: { primary: "#16A34A", secondary: "#0D9488", soft: "rgba(22,163,74,.12)", gradient: "linear-gradient(135deg,#16A34A,#0D9488)" },
  field: { primary: "#EA580C", secondary: "#D97706", soft: "rgba(234,88,12,.12)", gradient: "linear-gradient(135deg,#EA580C,#D97706)" },
  integrations: { primary: "#8B5CF6", secondary: "#06B6D4", soft: "rgba(139,92,246,.12)", gradient: "linear-gradient(135deg,#8B5CF6,#06B6D4)" },
  inventory: { primary: "#D97706", secondary: "#9333EA", soft: "rgba(217,119,6,.12)", gradient: "linear-gradient(135deg,#D97706,#9333EA)" },
  ai: { primary: "#A855F7", secondary: "#EC4899", soft: "rgba(168,85,247,.12)", gradient: "linear-gradient(135deg,#A855F7,#EC4899)" },
};

export const OSS_BSS_ASSETS = {
  ossOverview: "/assets/01580174-2bd9-4e23-8664-ca9cb115db84.png",
  nocMonitoring: "/assets/030d7016-5b75-4531-ab1e-2bd488cf5ac0.png",
  fiberMap: "/assets/0366310c-3fd7-4211-b47f-b0ff3a5a0827.png",
  fiberNetworks: "/assets/1081f78c-e048-4269-9f85-93ce7e2524e8.png",
  oltManagement: "/assets/155b0e7e-b923-4898-90b3-50590dbf43ce.png",
  radiusControl: "/assets/17e42f35-08cb-42cd-ac57-cbd61bb8685a.png",
  radiusDisconnect: "/assets/222f9fea-166b-487f-a9b2-596c015f6847.png",
  tr069: "/assets/25acdc87-1eb2-4bd4-b755-f3b753c994de.png",
  tr069Device: "/assets/25c80313-5f2a-420f-a310-7ad706ebde36.png",
  networkInventory: "/assets/2bfe62a8-dea8-42c5-afac-c1b83f6705da.png",
  bssOverview: "/assets/3140276e-172c-4c25-8c75-9766d2f06a4e.png",
  billing: "/assets/38de87f4-1fdf-4a22-aa0b-04140a2fedcf.png",
  customerManagement: "/assets/3e6ac14b-32a8-4abc-80ad-dd4a3ffdc888.png",
  revenueManagement: "/assets/40b5a0f0-27ad-412e-9bc9-2f2af5c578ad.png",
  support: "/assets/43e05fec-724d-490b-943a-80a1430b28fe.png",
  fieldTasks: "/assets/5fb0e71a-8322-4013-8e25-a01918528e3c.png",
  inventoryLifecycle: "/assets/62477c36-f04b-4465-ba1c-30f22b7fc4ec.png",
  campaigns: "/assets/681113a7-64d7-4ebc-9185-ab087804e4dc.png",
  voice: "/assets/68c35006-c428-4b18-85b3-fc46dd973192.png",
  aiAgents: "/assets/kirtinet-light-colla.png",
  asterisk: "/assets/6e5aaa99-344d-43af-aa72-ef3d75694b27.png",
} as const;
