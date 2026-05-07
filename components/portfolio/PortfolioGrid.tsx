"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Portfolio Grid
//   Project cards + pagination
// ═══════════════════════════════════════════════════════════════

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowRight, ExternalLink, Calendar,
    Clock, ChevronLeft, ChevronRight,
    FolderOpen,
} from "lucide-react";
import { cn, formatDateShort, enumToLabel } from "@/lib/utils";
import { Badge, CategoryBadge, TechBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { ProjectCard } from "@/lib/types";

// ─────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────

function ProjectCard({ project, index }: {
    project: ProjectCard;
    index:   number;
}) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{
                duration: 0.5,
                delay:    index * 0.06,
                ease:     [0.22, 1, 0.36, 1],
            }}
            className={cn(
                "group flex flex-col rounded-2xl overflow-hidden",
                "bg-white border border-neutral-100",
                "shadow-card hover:shadow-card-hover",
                "hover:-translate-y-1 transition-all duration-300"
            )}
        >
            {/* Cover image */}
            <div className="relative h-52 bg-neutral-100 overflow-hidden shrink-0">
                <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-neutral-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-neutral-900 font-body font-semibold text-sm hover:bg-brand hover:text-white transition-colors duration-200 translate-y-2 group-hover:translate-y-0 transition-transform"
                        aria-label={`View ${project.title}`}
                    >
                        View Project <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <CategoryBadge
                        label={enumToLabel(project.category).replace(" Development", " Dev")}
                        className="backdrop-blur-sm bg-white/90 text-neutral-700 border-white/50"
                    />
                </div>

                {/* Live badge */}
                {project.liveUrl && (
                    <div className="absolute top-3 right-3">
                        <Badge
                            variant="success"
                            size="sm"
                            dot
                            className="backdrop-blur-sm bg-white/90 border-white/50"
                        >
                            Live
                        </Badge>
                    </div>
                )}

                {/* Featured ribbon */}
                {project.featured && (
                    <div className="absolute bottom-3 left-3">
                        <Badge variant="brand-solid" size="sm">
                            ⭐ Featured
                        </Badge>
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                    {project.clientName && (
                        <span className="font-body text-xs text-neutral-400 truncate">
              {project.clientName}
                            {project.clientCountry ? ` · ${project.clientCountry}` : ""}
            </span>
                    )}
                    {project.duration && (
                        <span className="font-body text-xs text-neutral-400 flex items-center gap-1 shrink-0">
              <Clock size={10} /> {project.duration}
            </span>
                    )}
                </div>

                <h3 className="font-display font-bold text-lg text-neutral-900 mb-2 group-hover:text-brand transition-colors line-clamp-2">
                    <Link href={`/portfolio/${project.slug}`}>{project.title}</Link>
                </h3>

                <p className="font-body text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-2 flex-1">
                    {project.summary}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 3).map((t) => (
                        <TechBadge key={t} name={t} />
                    ))}
                    {project.techStack.length > 3 && (
                        <span className="font-mono text-[11px] text-neutral-400 self-center">
              +{project.techStack.length - 3}
            </span>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    {project.deliveredAt && (
                        <span className="font-body text-xs text-neutral-400 flex items-center gap-1">
              <Calendar size={10} /> {formatDateShort(project.deliveredAt)}
            </span>
                    )}
                    <div className="flex items-center gap-2 ml-auto">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${project.title}`}
                                className="p-1.5 rounded-lg text-neutral-400 hover:text-brand hover:bg-brand/8 transition-colors"
                            >
                                <ExternalLink size={14} />
                            </a>
                        )}
                        <Link
                            href={`/portfolio/${project.slug}`}
                            className="inline-flex items-center gap-1 font-body text-xs font-semibold text-brand hover:gap-2 transition-all duration-200"
                        >
                            Case Study <ArrowRight size={12} />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

// ─────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────

function EmptyState({ search, category }: { search: string; category: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0  }}
            className="flex flex-col items-center justify-center py-24 text-center"
        >
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
                <FolderOpen size={28} className="text-neutral-400" />
            </div>
            <h3 className="font-display font-bold text-xl text-neutral-900 mb-2">
                No projects found
            </h3>
            <p className="font-body text-sm text-neutral-500 max-w-sm mb-6">
                {search
                    ? `No projects matched "${search}". Try a different search term.`
                    : category
                        ? "No published projects in this category yet."
                        : "No projects published yet."}
            </p>
            <Button asChild variant="secondary" size="md">
                <Link href="/portfolio">Clear Filters</Link>
            </Button>
        </motion.div>
    );
}

// ─────────────────────────────────────────
// PAGINATION
// ─────────────────────────────────────────

function Pagination({
                        currentPage,
                        totalPages,
                        search,
                        category,
                    }: {
    currentPage: number;
    totalPages:  number;
    search:      string;
    category:    string;
}) {
    const router   = useRouter();
    const pathname = usePathname();

    if (totalPages <= 1) return null;

    const goTo = (page: number) => {
        const params = new URLSearchParams();
        if (category) params.set("category", category);
        if (search)   params.set("search",   search);
        if (page > 1) params.set("page",     String(page));
        router.push(`${pathname}?${params.toString()}`);
    };

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div
            className="flex items-center justify-center gap-2 pt-10"
            role="navigation"
            aria-label="Pagination"
        >
            <button
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center",
                    "border font-body text-sm transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                    currentPage === 1
                        ? "border-neutral-100 text-neutral-300 cursor-not-allowed"
                        : "border-neutral-200 text-neutral-600 hover:border-brand hover:text-brand"
                )}
            >
                <ChevronLeft size={16} />
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => goTo(p)}
                    aria-label={`Page ${p}`}
                    aria-current={currentPage === p ? "page" : undefined}
                    className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center",
                        "border font-body text-sm font-medium transition-all duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                        currentPage === p
                            ? "bg-brand text-white border-brand shadow-brand-sm"
                            : "border-neutral-200 text-neutral-600 hover:border-brand hover:text-brand"
                    )}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center",
                    "border font-body text-sm transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                    currentPage === totalPages
                        ? "border-neutral-100 text-neutral-300 cursor-not-allowed"
                        : "border-neutral-200 text-neutral-600 hover:border-brand hover:text-brand"
                )}
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
}

// ─────────────────────────────────────────
// MAIN GRID
// ─────────────────────────────────────────

interface PortfolioGridProps {
    projects:    ProjectCard[];
    currentPage: number;
    totalPages:  number;
    total:       number;
    search:      string;
    category:    string;
}

export default function PortfolioGrid({
                                          projects,
                                          currentPage,
                                          totalPages,
                                          total,
                                          search,
                                          category,
                                      }: PortfolioGridProps) {
    if (projects.length === 0) {
        return <EmptyState search={search} category={category} />;
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                search={search}
                category={category}
            />
        </div>
    );
}