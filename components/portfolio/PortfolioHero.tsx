"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Portfolio Hero
//   Dynamic dark hero · Context-aware subtitle · Stats strip
//   Animated entrance · Search + filter state feedback
// ═══════════════════════════════════════════════════════════════

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Globe2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

interface PortfolioHeroProps {
    totalProjects:  number;
    activeCategory: string;
    search:         string;
}

// ─────────────────────────────────────────
// STAT ITEM
// ─────────────────────────────────────────

function StatItem({
                      icon,
                      value,
                      label,
                      delay,
                  }: {
    icon:  React.ReactNode;
    value: string;
    label: string;
    delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-1.5 text-center"
        >
            <div className="w-10 h-10 rounded-xl bg-brand/15 flex items-center justify-center text-brand mb-1">
                {icon}
            </div>
            <p className="font-display font-bold text-2xl text-white tabular-nums">
                {value}
            </p>
            <p className="font-body text-xs text-neutral-500">{label}</p>
        </motion.div>
    );
}

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────

export default function PortfolioHero({
                                          totalProjects,
                                          activeCategory,
                                          search,
                                      }: PortfolioHeroProps) {
    // Context-aware subtitle
    const isFiltered = activeCategory && activeCategory !== "All Projects";
    const isSearching = !!search;

    const subtitle = isSearching
        ? `Showing results for "${search}"`
        : isFiltered
            ? `Filtered by: ${activeCategory}`
            : "Real projects. Real clients. Real results — from Cameroon to the world.";

    const eyebrow = isSearching || isFiltered
        ? "Search Results"
        : "Our Portfolio";

    return (
        <section
            className="relative bg-neutral-950 overflow-hidden pt-8 pb-16"
            aria-label="Portfolio page header"
        >
            {/* ── Background layers ── */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                {/* Central glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand/8 rounded-full blur-[100px]" />
                {/* Corner accents */}
                <div className="absolute top-1/2 left-0 w-48 h-48 bg-brand/4 rounded-full blur-[60px]" />
                <div className="absolute top-1/2 right-0 w-48 h-48 bg-brand/4 rounded-full blur-[60px]" />

                {/* Grid lines */}
                <div
                    className="absolute inset-0 opacity-25"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)
            `,
                        backgroundSize: "64px 64px",
                    }}
                />

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral-50 to-transparent" />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 container-gts">
                <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">

                    {/* Breadcrumb */}
                    <motion.nav
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        aria-label="Breadcrumb"
                        className="flex items-center gap-2 font-body text-xs text-neutral-500"
                    >
                        <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-neutral-300">Portfolio</span>
                        {isFiltered && (
                            <>
                                <span aria-hidden="true">/</span>
                                <span className="text-brand">{activeCategory}</span>
                            </>
                        )}
                    </motion.nav>

                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0  }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                    >
                        <SectionLabel variant="dark" align="center">
                            {eyebrow}
                        </SectionLabel>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0  }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                            "font-display font-bold text-white tracking-tight text-balance",
                            "text-4xl sm:text-5xl lg:text-6xl"
                        )}
                    >
                        {isFiltered ? (
                            <>
                                {activeCategory}{" "}
                                <span className="text-brand">Projects</span>
                            </>
                        ) : isSearching ? (
                            <>
                                Results for{" "}
                                <span className="text-brand">&ldquo;{search}&rdquo;</span>
                            </>
                        ) : (
                            <>
                                Work That{" "}
                                <span className="text-brand">Speaks</span>{" "}
                                for Itself
                            </>
                        )}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0  }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="font-body text-lg text-neutral-400 leading-relaxed max-w-xl"
                    >
                        {subtitle}
                    </motion.p>

                    {/* Filter state pill */}
                    {(isFiltered || isSearching) && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1   }}
                            transition={{ duration: 0.3, delay: 0.25 }}
                            className="flex items-center gap-3"
                        >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/15 border border-brand/25 font-body text-sm text-brand">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                  {totalProjects} project{totalProjects !== 1 ? "s" : ""} found
              </span>
                            <Button asChild variant="glass" size="sm" rounded="full">
                                <Link href="/portfolio">Clear Filter</Link>
                            </Button>
                        </motion.div>
                    )}

                    {/* CTA — only when not filtering */}
                    {!isFiltered && !isSearching && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0  }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Button
                                asChild
                                variant="primary"
                                size="md"
                                rounded="full"
                                rightIcon={<ArrowRight size={16} />}
                            >
                                <Link href="/contact">Start a Project</Link>
                            </Button>
                        </motion.div>
                    )}
                </div>

                {/* ── Stats strip ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0  }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className={cn(
                        "mt-14 pt-10 border-t border-white/6",
                        "grid grid-cols-3 gap-6 max-w-lg mx-auto"
                    )}
                >
                    <StatItem
                        icon={<Trophy size={18} />}
                        value={`${totalProjects}+`}
                        label="Projects Delivered"
                        delay={0.4}
                    />
                    <StatItem
                        icon={<Briefcase size={18} />}
                        value="12"
                        label="Service Categories"
                        delay={0.5}
                    />
                    <StatItem
                        icon={<Globe2 size={18} />}
                        value="12+"
                        label="Countries Served"
                        delay={0.6}
                    />
                </motion.div>
            </div>
        </section>
    );
}