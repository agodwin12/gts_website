// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Project Case Study Page
//   /portfolio/[slug]
//   Server Component — fetches single project from DB
// ═══════════════════════════════════════════════════════════════

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft, ExternalLink, Calendar,
    Clock, Globe2, Tag, CheckCircle2,
    ArrowRight,
} from "lucide-react";
import { db } from "@/lib/db";
import { siteConfig } from "@/lib/config";
import { cn, formatDate, enumToLabel, absoluteUrl } from "@/lib/utils";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button }        from "@/components/ui/Button";
import { TechBadge, CategoryBadge } from "@/components/ui/Badge";

// ─────────────────────────────────────────
// PARAMS
// ─────────────────────────────────────────

interface PageProps {
    params: Promise<{ slug: string }>;
}

// ─────────────────────────────────────────
// STATIC PARAMS — pre-render all published projects
// ─────────────────────────────────────────

export async function generateStaticParams() {
    const projects = await db.project.findMany({
        where:  { status: "PUBLISHED" },
        select: { slug: true },
    });
    return projects.map((p) => ({ slug: p.slug }));
}

// ─────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project  = await db.project.findUnique({
        where:  { slug },
        select: { title: true, summary: true, coverImage: true, metaTitle: true, metaDescription: true, category: true },
    });

    if (!project) return { title: "Project Not Found" };

    return {
        title:       project.metaTitle    || `${project.title} — Case Study`,
        description: project.metaDescription || project.summary,
        openGraph: {
            title:       project.metaTitle  || project.title,
            description: project.metaDescription || project.summary,
            images:      [{ url: project.coverImage, width: 1200, height: 630 }],
            type:        "article",
        },
        alternates: {
            canonical: absoluteUrl(`/portfolio/${slug}`),
        },
    };
}

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;

    const project = await db.project.findUnique({ where: { slug } });

    if (!project || project.status !== "PUBLISHED") notFound();

    // Related projects — same category, different slug
    const related = await db.project.findMany({
        where: {
            status:   "PUBLISHED",
            category: project.category,
            slug:     { not: slug },
        },
        select: {
            id: true, title: true, slug: true,
            summary: true, coverImage: true, category: true,
            clientName: true, techStack: true,
            status: true, clientCountry: true,
            clientIndustry: true, tags: true,
            duration: true, deliveredAt: true,
            liveUrl: true, featured: true, order: true,
        },
        take:    3,
        orderBy: { order: "asc" },
    });

    return (
        <>
            <Navbar />

            {/* ── Hero image ── */}
            <div className="relative h-[50vh] min-h-[360px] bg-neutral-950 -mt-0 overflow-hidden">
                <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover opacity-50"
                    sizes="100vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/20" />

                {/* Back button */}
                <div className="absolute top-8 left-0 right-0 z-10 container-gts">
                    <Link
                        href="/portfolio"
                        className={cn(
                            "inline-flex items-center gap-2",
                            "font-body text-sm font-medium text-white/70",
                            "hover:text-white transition-colors duration-200"
                        )}
                    >
                        <ArrowLeft size={15} /> Back to Portfolio
                    </Link>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 container-gts pb-10 z-10">
                    <CategoryBadge
                        label={enumToLabel(project.category)}
                        className="mb-4 bg-brand/20 text-brand border-brand/30"
                    />
                    <h1 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance max-w-3xl">
                        {project.title}
                    </h1>
                </div>
            </div>

            {/* ── Main content ── */}
            <div className="bg-white">
                <div className="container-gts py-14 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

                        {/* ── LEFT — Project details ── */}
                        <div className="lg:col-span-2 space-y-10">

                            {/* Summary */}
                            <div>
                                <p className="font-body text-xl text-neutral-600 leading-relaxed">
                                    {project.summary}
                                </p>
                            </div>

                            {/* Description */}
                            <div className="prose prose-neutral max-w-none">
                                <h2 className="font-display font-bold text-2xl text-neutral-900 mb-4">
                                    About This Project
                                </h2>
                                {project.description.split("\n\n").map((para, i) => (
                                    <p key={i} className="font-body text-base text-neutral-600 leading-relaxed mb-4">
                                        {para}
                                    </p>
                                ))}
                            </div>

                            {/* Gallery */}
                            {project.images && project.images.length > 0 && (
                                <div>
                                    <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">
                                        Project Gallery
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {project.images.map((img, i) => (
                                            <div key={i} className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100">
                                                <Image
                                                    src={img}
                                                    alt={`${project.title} screenshot ${i + 1}`}
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width:640px) 100vw, 50vw"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tags */}
                            {project.tags.length > 0 && (
                                <div>
                                    <h3 className="font-display font-semibold text-lg text-neutral-900 mb-3 flex items-center gap-2">
                                        <Tag size={16} className="text-brand" /> Keywords
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 rounded-full bg-neutral-100 font-body text-sm text-neutral-600"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ── RIGHT — Sidebar ── */}
                        <div className="space-y-6">

                            {/* Project info card */}
                            <div className={cn(
                                "rounded-2xl border border-neutral-100",
                                "bg-neutral-50 p-6 space-y-5"
                            )}>
                                <h3 className="font-display font-bold text-base text-neutral-900">
                                    Project Details
                                </h3>

                                {[
                                    { icon: <Globe2    size={14} />, label: "Client",    value: project.clientName    },
                                    { icon: <Globe2    size={14} />, label: "Country",   value: project.clientCountry },
                                    { icon: <Tag       size={14} />, label: "Industry",  value: project.clientIndustry},
                                    { icon: <Clock     size={14} />, label: "Duration",  value: project.duration      },
                                    { icon: <Calendar  size={14} />, label: "Delivered", value: project.deliveredAt ? formatDate(project.deliveredAt) : null },
                                    { icon: <CheckCircle2 size={14}/>, label: "Category", value: enumToLabel(project.category) },
                                ].filter((item) => item.value).map(({ icon, label, value }) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <span className="text-brand mt-0.5 shrink-0">{icon}</span>
                                        <div>
                                            <p className="font-body text-xs text-neutral-400 uppercase tracking-wider">
                                                {label}
                                            </p>
                                            <p className="font-body text-sm font-medium text-neutral-900 mt-0.5">
                                                {value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Tech stack */}
                            {project.techStack.length > 0 && (
                                <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
                                    <h3 className="font-display font-bold text-base text-neutral-900 mb-4">
                                        Tech Stack
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <TechBadge key={tech} name={tech} size="md" />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Live link */}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "flex items-center justify-between gap-3 p-4 rounded-2xl",
                                        "bg-brand text-white",
                                        "hover:bg-brand-dark shadow-brand hover:shadow-brand-lg",
                                        "transition-all duration-200 hover:-translate-y-0.5",
                                        "group"
                                    )}
                                >
                                    <div>
                                        <p className="font-display font-bold text-sm">View Live Site</p>
                                        <p className="font-body text-xs text-white/70 mt-0.5 truncate">
                                            {project.liveUrl.replace(/^https?:\/\//, "")}
                                        </p>
                                    </div>
                                    <ExternalLink
                                        size={18}
                                        className="shrink-0 group-hover:scale-110 transition-transform"
                                    />
                                </a>
                            )}

                            {/* CTA */}
                            <div className={cn(
                                "rounded-2xl p-6 space-y-3",
                                "bg-gradient-to-br from-neutral-900 to-neutral-800"
                            )}>
                                <p className="font-display font-bold text-white text-base">
                                    Like what you see?
                                </p>
                                <p className="font-body text-sm text-neutral-400">
                                    Let&apos;s build something just as impressive for your business.
                                </p>
                                <Button
                                    asChild
                                    variant="primary"
                                    size="md"
                                    fullWidth
                                    rounded="full"
                                >
                                    <Link href="/contact">Start a Project</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Related projects ── */}
            {related.length > 0 && (
                <section className="bg-neutral-50 py-16">
                    <div className="container-gts">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-display font-bold text-2xl text-neutral-900">
                                More{" "}
                                <span className="text-brand">{enumToLabel(project.category)}</span>{" "}
                                Projects
                            </h2>
                            <Button asChild variant="ghost" size="sm" rightIcon={<ArrowRight size={14} />}>
                                <Link href="/portfolio">View All</Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {related.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/portfolio/${rel.slug}`}
                                    className={cn(
                                        "group flex flex-col rounded-2xl overflow-hidden",
                                        "bg-white border border-neutral-100",
                                        "shadow-card hover:shadow-card-hover",
                                        "hover:-translate-y-1 transition-all duration-300"
                                    )}
                                >
                                    <div className="relative h-44 bg-neutral-100 overflow-hidden">
                                        <Image
                                            src={rel.coverImage}
                                            alt={rel.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <p className="font-body text-xs text-neutral-400 mb-1">
                                            {rel.clientName}
                                        </p>
                                        <h3 className="font-display font-bold text-base text-neutral-900 group-hover:text-brand transition-colors line-clamp-2">
                                            {rel.title}
                                        </h3>
                                        <p className="font-body text-sm text-neutral-500 mt-2 line-clamp-2">
                                            {rel.summary}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </>
    );
}