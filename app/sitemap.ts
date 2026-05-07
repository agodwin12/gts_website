// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Sitemap
//   Auto-generated at /sitemap.xml
//   Includes static routes + dynamic /portfolio/[slug] pages
//   Re-generated on every build (ISR-aware)
// ═══════════════════════════════════════════════════════════════

import type { MetadataRoute } from "next";
import { db }                 from "@/lib/db";
import { siteConfig }         from "@/lib/config";

// ─────────────────────────────────────────
// STATIC ROUTES
// ─────────────────────────────────────────

const staticRoutes: MetadataRoute.Sitemap = [
    {
        url:              siteConfig.url,
        lastModified:     new Date(),
        changeFrequency:  "weekly",
        priority:         1.0,
    },
    {
        url:              `${siteConfig.url}/about`,
        lastModified:     new Date(),
        changeFrequency:  "monthly",
        priority:         0.8,
    },
    {
        url:              `${siteConfig.url}/services`,
        lastModified:     new Date(),
        changeFrequency:  "monthly",
        priority:         0.9,
    },
    {
        url:              `${siteConfig.url}/portfolio`,
        lastModified:     new Date(),
        changeFrequency:  "weekly",
        priority:         0.9,
    },
    {
        url:              `${siteConfig.url}/contact`,
        lastModified:     new Date(),
        changeFrequency:  "yearly",
        priority:         0.8,
    },
    // Individual service pages
    ...[
        "web-development",
        "app-development",
        "cloud-services",
        "ecommerce",
        "ui-ux-design",
        "digital-marketing",
        "it-consultancy",
        "api-integration",
        "enterprise-software",
        "automation-ai",
        "cybersecurity",
        "branding",
    ].map((slug) => ({
        url:             `${siteConfig.url}/services/${slug}`,
        lastModified:    new Date(),
        changeFrequency: "monthly" as const,
        priority:        0.7,
    })),
];

// ─────────────────────────────────────────
// SITEMAP GENERATOR
// ─────────────────────────────────────────

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch all published project slugs from the DB
    let projectRoutes: MetadataRoute.Sitemap = [];

    try {
        const projects = await db.project.findMany({
            where:   { status: "PUBLISHED" },
            select:  { slug: true, updatedAt: true },
            orderBy: { updatedAt: "desc" },
        });

        projectRoutes = projects.map((p) => ({
            url:             `${siteConfig.url}/portfolio/${p.slug}`,
            lastModified:    p.updatedAt,
            changeFrequency: "monthly" as const,
            priority:        0.6,
        }));
    } catch {
        // DB unavailable during build — skip dynamic routes gracefully
        console.warn("Sitemap: could not fetch projects from DB — using static routes only");
    }

    return [...staticRoutes, ...projectRoutes];
}

// Revalidate sitemap every 24 hours
export const revalidate = 86400;