// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Portfolio Page
//   Server Component — fetches projects from PostgreSQL via Prisma
//   Category filters · Search · Pagination · SEO metadata
// ═══════════════════════════════════════════════════════════════

import type { Metadata } from "next";
import { Suspense } from "react";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { siteConfig } from "@/lib/config";
import { enumToLabel } from "@/lib/utils";
import Navbar           from "@/components/layout/Navbar";
import Footer           from "@/components/layout/Footer";
import PortfolioGrid    from "@/components/portfolio/PortfolioGrid";
import PortfolioFilters from "@/components/portfolio/PortfolioFilters";
import PortfolioHero    from "@/components/portfolio/PortfolioHero";
import type { ProjectCategory } from "@/lib/types";

// ─────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────

export const metadata: Metadata = {
    title:       "Portfolio — Our Work",
    description: `Explore ${siteConfig.name}'s portfolio of delivered projects — web apps, mobile apps, enterprise software, e-commerce platforms, and more across Cameroon and Africa.`,
    openGraph: {
        title:       `Portfolio | ${siteConfig.name}`,
        description: "Real projects. Real clients. Real results — across Cameroon and beyond.",
        images:      [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
};

// ─────────────────────────────────────────
// VALID CATEGORIES
// ─────────────────────────────────────────

const validCategories: ProjectCategory[] = [
    "WEB_DEVELOPMENT", "APP_DEVELOPMENT", "CLOUD_SERVICES",
    "ECOMMERCE", "UI_UX_DESIGN", "DIGITAL_MARKETING",
    "IT_CONSULTANCY", "API_INTEGRATION", "ENTERPRISE_SOFTWARE",
    "AUTOMATION_AI", "CYBERSECURITY", "BRANDING",
];

// ─────────────────────────────────────────
// PAGE PROPS
// ─────────────────────────────────────────

interface PortfolioPageProps {
    searchParams: Promise<{
        category?: string;
        search?:   string;
        page?:     string;
    }>;
}

// ─────────────────────────────────────────
// DATA FETCHING
// ─────────────────────────────────────────

async function getProjects(params: {
    category?: string;
    search?:   string;
    page:      number;
}) {
    const { category, search, page } = params;
    const limit  = 9;
    const offset = (page - 1) * limit;

    // Build where clause — typed explicitly with Prisma.ProjectWhereInput
    const where: Prisma.ProjectWhereInput = {
        status: "PUBLISHED",
        ...(category && validCategories.includes(category as ProjectCategory)
            ? { category: category as ProjectCategory }
            : {}),
        ...(search
            ? {
                OR: [
                    { title:      { contains: search, mode: Prisma.QueryMode.insensitive } },
                    { summary:    { contains: search, mode: Prisma.QueryMode.insensitive } },
                    { clientName: { contains: search, mode: Prisma.QueryMode.insensitive } },
                    { tags:       { has: search } },
                ],
            }
            : {}),
    };

    const [projects, total] = await Promise.all([
        db.project.findMany({
            where,
            orderBy: [
                { featured:    "desc" },
                { order:       "asc"  },
                { deliveredAt: "desc" },
            ],
            take:   limit,
            skip:   offset,
            select: {
                id:             true,
                title:          true,
                slug:           true,
                summary:        true,
                category:       true,
                tags:           true,
                coverImage:     true,
                clientName:     true,
                clientCountry:  true,
                clientIndustry: true,
                techStack:      true,
                duration:       true,
                deliveredAt:    true,
                liveUrl:        true,
                featured:       true,
                order:          true,
                status:         true,
            },
        }),
        db.project.count({ where }),
    ]);

    // Category counts for filter badge numbers
    const categoryCounts = await db.project.groupBy({
        by:     ["category"],
        where:  { status: "PUBLISHED" },
        _count: { _all: true },
    });

    return {
        projects,
        total,
        totalPages: Math.ceil(total / limit),
        page,
        categoryCounts: categoryCounts.map((c) => ({
            category: c.category,
            count:    c._count._all,
        })),
    };
}

// ─────────────────────────────────────────
// SKELETON LOADER
// ─────────────────────────────────────────

function GridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-neutral-100">
                    <div className="skeleton h-52 w-full rounded-none" />
                    <div className="p-5 space-y-3">
                        <div className="skeleton h-3 w-24 rounded" />
                        <div className="skeleton h-5 w-3/4 rounded" />
                        <div className="skeleton h-3 w-full rounded" />
                        <div className="skeleton h-3 w-5/6 rounded" />
                        <div className="flex gap-2 mt-4">
                            <div className="skeleton h-5 w-16 rounded-full" />
                            <div className="skeleton h-5 w-20 rounded-full" />
                            <div className="skeleton h-5 w-14 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────

export default async function PortfolioPage({
                                                searchParams,
                                            }: PortfolioPageProps) {
    const params   = await searchParams;
    const category = params.category || "";
    const search   = params.search   || "";
    const page     = Math.max(1, Number(params.page) || 1);

    const data = await getProjects({ category, search, page });

    const activeCategoryLabel = category
        ? enumToLabel(category)
        : "All Projects";

    return (
        <>
            <Navbar />

            <PortfolioHero
                totalProjects={data.total}
                activeCategory={activeCategoryLabel}
                search={search}
            />

            <section className="bg-neutral-50 py-12 lg:py-20 min-h-[60vh]">
                <div className="container-gts space-y-10">

                    <PortfolioFilters
                        categoryCounts={data.categoryCounts}
                        activeCategory={category}
                        search={search}
                        totalResults={data.total}
                    />

                    <Suspense fallback={<GridSkeleton />}>
                        <PortfolioGrid
                            projects={data.projects}
                            currentPage={data.page}
                            totalPages={data.totalPages}
                            total={data.total}
                            search={search}
                            category={category}
                        />
                    </Suspense>
                </div>
            </section>

            <Footer />
        </>
    );
}