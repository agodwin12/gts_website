"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Portfolio Section
//   Category filters · Project cards · Live link badges
//   Pulls featured projects from seed data (static for homepage)
// ═══════════════════════════════════════════════════════════════

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight, ExternalLink, Calendar,
    Clock, Tag, ChevronRight,
} from "lucide-react";
import { cn, formatDateShort, enumToLabel } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Badge, CategoryBadge, TechBadge } from "@/components/ui/Badge";
import type { ProjectCategory } from "@/lib/types";

// ─────────────────────────────────────────
// STATIC FEATURED PROJECTS
// In production these come from the DB via
// a server component / API route. For the
// homepage we use static data that matches
// the seed so it works before DB is set up.
// ─────────────────────────────────────────

const featuredProjects = [
    {
        id:            "1",
        title:         "Maviance Business Portal",
        slug:          "maviance-business-portal",
        summary:       "A full-scale B2B payment and transaction management portal for one of Cameroon's leading fintech companies.",
        category:      "WEB_DEVELOPMENT"  as ProjectCategory,
        tags:          ["Next.js", "TypeScript", "PostgreSQL"],
        coverImage:    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        clientName:    "Maviance PLC",
        clientCountry: "Cameroon",
        techStack:     ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
        duration:      "4 months",
        deliveredAt:   new Date("2024-08-15"),
        liveUrl:       "https://portal.maviance.com",
        featured:      true,
    },
    {
        id:            "2",
        title:         "CamerSchools Learning Platform",
        slug:          "camerschools-learning-platform",
        summary:       "A modern e-learning PWA for secondary school students across Cameroon with offline support.",
        category:      "WEB_DEVELOPMENT"  as ProjectCategory,
        tags:          ["Next.js", "PWA", "Cloudinary"],
        coverImage:    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        clientName:    "CamerSchools",
        clientCountry: "Cameroon",
        techStack:     ["Next.js", "TypeScript", "Tailwind CSS", "PWA"],
        duration:      "5 months",
        deliveredAt:   new Date("2024-06-01"),
        liveUrl:       "https://camerschools.cm",
        featured:      true,
    },
    {
        id:            "3",
        title:         "AfriRide Driver & Passenger App",
        slug:          "afriride-driver-passenger-app",
        summary:       "Cross-platform ride-hailing app for Douala and Douala with real-time GPS and Mobile Money.",
        category:      "APP_DEVELOPMENT"  as ProjectCategory,
        tags:          ["React Native", "Expo", "Google Maps"],
        coverImage:    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        clientName:    "AfriRide Technologies",
        clientCountry: "Cameroon",
        techStack:     ["React Native", "Expo", "Node.js", "Socket.io"],
        duration:      "6 months",
        deliveredAt:   new Date("2024-09-20"),
        liveUrl:       null,
        featured:      true,
    },
    {
        id:            "4",
        title:         "ShopCamer Multi-Vendor Marketplace",
        slug:          "shopcamer-multi-vendor-marketplace",
        summary:       "A full-featured multi-vendor marketplace for Cameroonian sellers with Mobile Money payments.",
        category:      "ECOMMERCE"         as ProjectCategory,
        tags:          ["Next.js", "Stripe", "Mobile Money"],
        coverImage:    "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        clientName:    "ShopCamer Ltd",
        clientCountry: "Cameroon",
        techStack:     ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
        duration:      "7 months",
        deliveredAt:   new Date("2024-11-01"),
        liveUrl:       "https://shopcamer.cm",
        featured:      true,
    },
    {
        id:            "5",
        title:         "TeleCam AI Customer Support Bot",
        slug:          "telecam-ai-customer-support-bot",
        summary:       "AI-powered WhatsApp and web chatbot handling 80% of customer queries automatically.",
        category:      "AUTOMATION_AI"    as ProjectCategory,
        tags:          ["OpenAI GPT-4", "WhatsApp API", "Node.js"],
        coverImage:    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
        clientName:    "TeleCam Networks",
        clientCountry: "Cameroon",
        techStack:     ["OpenAI API", "Node.js", "WhatsApp Cloud API"],
        duration:      "3 months",
        deliveredAt:   new Date("2024-10-05"),
        liveUrl:       null,
        featured:      true,
    },
    {
        id:            "6",
        title:         "NexBank Mobile Banking UI",
        slug:          "nexbank-mobile-banking-ui",
        summary:       "Complete UI/UX design system and interactive prototype for a modern mobile banking app.",
        category:      "UI_UX_DESIGN"     as ProjectCategory,
        tags:          ["Figma", "Design System", "Prototype"],
        coverImage:    "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?w=800&q=80",
        clientName:    "NexBank Africa",
        clientCountry: "Cameroon",
        techStack:     ["Figma", "FigJam", "Maze"],
        duration:      "2 months",
        deliveredAt:   new Date("2024-05-20"),
        liveUrl:       null,
        featured:      true,
    },
];

// ─────────────────────────────────────────
// CATEGORY FILTERS
// ─────────────────────────────────────────

const filterCategories: { value: ProjectCategory | "ALL"; label: string }[] = [
    { value: "ALL",              label: "All Work"       },
    { value: "WEB_DEVELOPMENT",  label: "Web Dev"        },
    { value: "APP_DEVELOPMENT",  label: "Mobile Apps"    },
    { value: "ECOMMERCE",        label: "E-Commerce"     },
    { value: "AUTOMATION_AI",    label: "AI & Auto"      },
    { value: "UI_UX_DESIGN",     label: "UI/UX"          },
];

// ─────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────

function ProjectCard({ project, index }: {
    project: typeof featuredProjects[0];
    index:   number;
}) {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1     }}
            exit={{    opacity: 0, scale: 0.95  }}
            transition={{
                duration: 0.4,
                delay:    index * 0.06,
                ease:     [0.22, 1, 0.36, 1],
            }}
            className={cn(
                "group relative flex flex-col",
                "rounded-2xl overflow-hidden",
                "bg-white border border-neutral-100",
                "shadow-card hover:shadow-card-hover",
                "hover:-translate-y-1 transition-all duration-300"
            )}
        >
            {/* Cover image */}
            <div className="relative h-52 overflow-hidden bg-neutral-100 shrink-0">
                <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay on hover */}
                <div
                    className={cn(
                        "absolute inset-0 bg-neutral-950/50",
                        "opacity-0 group-hover:opacity-100",
                        "transition-opacity duration-300",
                        "flex items-center justify-center"
                    )}
                >
                    <Link
                        href={`/portfolio/${project.slug}`}
                        className={cn(
                            "inline-flex items-center gap-2",
                            "px-4 py-2 rounded-full",
                            "bg-white text-neutral-900",
                            "font-body font-semibold text-sm",
                            "hover:bg-brand hover:text-white",
                            "transition-colors duration-200",
                            "translate-y-2 group-hover:translate-y-0",
                            "transition-transform duration-300"
                        )}
                        aria-label={`View ${project.title} case study`}
                    >
                        View Case Study <ChevronRight size={14} />
                    </Link>
                </div>

                {/* Category badge — top left */}
                <div className="absolute top-3 left-3">
                    <CategoryBadge
                        label={enumToLabel(project.category)}
                        className="backdrop-blur-sm bg-white/90 text-neutral-700 border-white/50"
                    />
                </div>

                {/* Live badge — top right */}
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
            </div>

            {/* Card body */}
            <div className="flex flex-col flex-1 p-5">
                {/* Client + duration */}
                <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-body text-xs text-neutral-400 flex items-center gap-1.5">
            <Tag size={11} aria-hidden="true" />
              {project.clientName}
          </span>
                    <span className="font-body text-xs text-neutral-400 flex items-center gap-1.5">
            <Clock size={11} aria-hidden="true" />
                        {project.duration}
          </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg text-neutral-900 mb-2 group-hover:text-brand transition-colors duration-200 line-clamp-2">
                    <Link href={`/portfolio/${project.slug}`}>
                        {project.title}
                    </Link>
                </h3>

                {/* Summary */}
                <p className="font-body text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-2 flex-1">
                    {project.summary}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                        <TechBadge key={tech} name={tech} />
                    ))}
                    {project.techStack.length > 3 && (
                        <span className="font-mono text-[11px] text-neutral-400 self-center">
              +{project.techStack.length - 3}
            </span>
                    )}
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 gap-3">
                    {/* Delivery date */}
                    {project.deliveredAt && (
                        <span className="font-body text-xs text-neutral-400 flex items-center gap-1.5">
              <Calendar size={11} aria-hidden="true" />
                            {formatDateShort(project.deliveredAt)}
            </span>
                    )}

                    <div className="flex items-center gap-2 ml-auto">
                        {/* Live link */}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${project.title} live site`}
                                className={cn(
                                    "p-1.5 rounded-lg",
                                    "text-neutral-400 hover:text-brand",
                                    "hover:bg-brand/8",
                                    "transition-colors duration-150"
                                )}
                            >
                                <ExternalLink size={14} />
                            </a>
                        )}

                        {/* Case study link */}
                        <Link
                            href={`/portfolio/${project.slug}`}
                            className={cn(
                                "inline-flex items-center gap-1",
                                "font-body text-xs font-semibold text-brand",
                                "hover:gap-2 transition-all duration-200"
                            )}
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
// MAIN SECTION
// ─────────────────────────────────────────

export default function PortfolioSection() {
    const [activeFilter, setActiveFilter] = useState<ProjectCategory | "ALL">("ALL");

    const filtered = useMemo(() => {
        if (activeFilter === "ALL") return featuredProjects;
        return featuredProjects.filter((p) => p.category === activeFilter);
    }, [activeFilter]);

    return (
        <section
            id="portfolio"
            className="section bg-white"
            aria-labelledby="portfolio-heading"
        >
            <div className="container-gts">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
                    <SectionHeader
                        label="Our Portfolio"
                        heading={
                            <>
                                Work That{" "}
                                <span className="gradient-text">Speaks for Itself</span>
                            </>
                        }
                        subheading="Real projects. Real clients. Real results — across Cameroon and beyond."
                        headingClassName="text-3xl sm:text-4xl lg:text-5xl"
                    />

                    <Button
                        asChild
                        variant="secondary"
                        size="md"
                        rightIcon={<ArrowRight size={16} />}
                        className="shrink-0 self-start lg:self-auto"
                    >
                        <Link href="/portfolio">View All Projects</Link>
                    </Button>
                </div>

                {/* Category filter chips */}
                <div
                    className="flex flex-wrap gap-2 mb-10"
                    role="group"
                    aria-label="Filter projects by category"
                >
                    {filterCategories.map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => setActiveFilter(value)}
                            aria-pressed={activeFilter === value}
                            className={cn(
                                "px-4 py-2 rounded-full",
                                "font-body text-sm font-medium",
                                "border transition-all duration-200",
                                "focus-visible:outline-none focus-visible:ring-2",
                                "focus-visible:ring-brand focus-visible:ring-offset-2",
                                activeFilter === value
                                    ? "bg-brand text-white border-brand shadow-brand-sm"
                                    : "bg-white text-neutral-600 border-neutral-200 hover:border-brand/40 hover:text-brand"
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Projects grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="font-body text-neutral-400">
                            No projects in this category yet.
                        </p>
                    </motion.div>
                )}

                {/* View all CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-14 text-center"
                >
                    <p className="font-body text-neutral-500 mb-4">
                        These are just a few highlights —
                        <span className="text-neutral-700 font-medium"> we've delivered 150+ projects</span> in total.
                    </p>
                    <Button
                        asChild
                        variant="primary"
                        size="lg"
                        rounded="full"
                        rightIcon={<ArrowRight size={18} />}
                    >
                        <Link href="/portfolio">Explore Full Portfolio</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}