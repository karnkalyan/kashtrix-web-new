import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Disable X-Powered-By header for security & server compliance
  poweredByHeader: false,

  // Enforce consistent trailing-slash behavior (no trailing slash)
  trailingSlash: false,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "kashtrix.com" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      // Canonical: www -> non-www
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.kashtrix.com" }],
        destination: "https://kashtrix.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
