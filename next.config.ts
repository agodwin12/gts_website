import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-accordion",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
      "swiper",
    ],
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com",           pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com",            pathname: "/**" },
      { protocol: "https", hostname: "cdn.godwintechsolutions.com",    pathname: "/**" },
      { protocol: "https", hostname: "avatars.githubusercontent.com", pathname: "/**" },
      { protocol: "https", hostname: "lh3.googleusercontent.com",     pathname: "/**" },
      { protocol: "https", hostname: "www.google.com",                 pathname: "/**" },
      { protocol: "https", hostname: "*.googleusercontent.com",        pathname: "/**" },
      { protocol: "https", hostname: "*.googleapis.com",               pathname: "/**" },
      { protocol: "https", hostname: "*.gstatic.com",                  pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos",                  pathname: "/**" },
      { protocol: "https", hostname: "via.placeholder.com",            pathname: "/**" },
      // Cloudflare R2 public bucket
      { protocol: "https", hostname: "pub-2b2f1ec06bd046e8a1cfdbd55e528441.r2.dev", pathname: "/**" },
      { protocol: "https", hostname: "*.r2.dev",                       pathname: "/**" },
    ],
    formats:          ["image/avif", "image/webp"],
    deviceSizes:      [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes:       [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL:  60 * 60 * 24 * 60,
    dangerouslyAllowSVG:       true,
    contentDispositionType:    "attachment",
    contentSecurityPolicy:     "default-src 'self'; script-src 'none'; sandbox;",
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "X-Content-Type-Options",     value: "nosniff" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control",     value: "on" },
          { key: "Strict-Transport-Security",  value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
      {
        source: "/static/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/fonts/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },

  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
    ];
  },

  async rewrites() {
    return [];
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  output:
    process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,

  generateEtags:   true,
  compress:        true,
  poweredByHeader: false,

  typescript: {
    ignoreBuildErrors: false,
  },



  env: {
    NEXT_PUBLIC_SITE_NAME:        "Godwin Tech Solutions",
    NEXT_PUBLIC_SITE_URL:         process.env.NEXT_PUBLIC_SITE_URL        || "https://godwintechsolutions.com",
    NEXT_PUBLIC_SITE_DESCRIPTION: "Premium IT services — Web, Mobile, Cloud, AI & Enterprise Solutions based in Cameroon.",
    NEXT_PUBLIC_CONTACT_EMAIL:    process.env.NEXT_PUBLIC_CONTACT_EMAIL   || "hello@godwintechsolutions.com",
    NEXT_PUBLIC_CONTACT_PHONE:    process.env.NEXT_PUBLIC_CONTACT_PHONE   || "+237 000 000 000",
    NEXT_PUBLIC_LOCATION:         "Yaoundé, Cameroon",
  },

  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
};

export default nextConfig;