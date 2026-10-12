import type { Metadata } from "next";
import type { ReactNode } from "react";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Login | Kashtrix Enterprise Platform",
  description: "Sign in to the Kashtrix enterprise telecom platform portal.",
  canonical: "https://kashtrix.com/login",
  noindex: true,
});

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
