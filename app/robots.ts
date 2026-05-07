// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Robots.txt
//   Auto-generated at /robots.txt
//   Blocks admin and API routes from crawlers
//   Allows all public-facing pages
// ═══════════════════════════════════════════════════════════════

import type { MetadataRoute } from "next";
import { siteConfig }         from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                // Allow all well-behaved crawlers on public pages
                userAgent:    "*",
                allow:        "/",
                disallow: [
                    "/admin",           // Admin dashboard
                    "/admin/",          // Admin sub-routes
                    "/api/",            // All API routes
                    "/_next/",          // Next.js internals
                ],
            },
            {
                // Block known bad bots entirely
                userAgent: [
                    "AhrefsBot",
                    "MJ12bot",
                    "DotBot",
                    "SemrushBot",
                    "Baiduspider",
                ],
                disallow: "/",
            },
        ],

        // Point crawlers to the sitemap
        sitemap: `${siteConfig.url}/sitemap.xml`,

        // Host declaration
        host: siteConfig.url,
    };
}