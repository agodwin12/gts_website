"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Hero Section
//   Dark mesh background · Staggered reveal · Floating stat cards
//   Tech ticker · Dual CTAs · Grid lines overlay
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Play,
    Globe,
    Smartphone,
    Cloud,
    Bot,
    Shield,
    TrendingUp,
    CheckCircle2,
    Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig, stats, techBadges } from "@/lib/config";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

// ─────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren:   0.2,
        },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show:   {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
};

const fadeIn = {
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { duration: 0.5 } },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.88 },
    show:   {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

// ─────────────────────────────────────────
// SERVICE ICON PILLS — floating around hero
// ─────────────────────────────────────────

const heroServices = [
    { icon: <Globe     size={15} />, label: "Web Dev",    delay: 0    },
    { icon: <Smartphone size={15}/>, label: "Mobile Apps",delay: 0.4  },
    { icon: <Cloud     size={15} />, label: "Cloud",      delay: 0.8  },
    { icon: <Bot       size={15} />, label: "AI & Auto",  delay: 1.2  },
    { icon: <Shield    size={15} />, label: "Security",   delay: 1.6  },
    { icon: <TrendingUp size={15}/>, label: "Marketing",  delay: 2.0  },
];

// ─────────────────────────────────────────
// FLOATING STAT CARD
// ─────────────────────────────────────────

function FloatingCard({
                          className,
                          delay = 0,
                          children,
                      }: {
    className?: string;
    delay?: number;
    children: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
                "absolute z-20",
                "bg-white/8 backdrop-blur-md",
                "border border-white/12",
                "rounded-2xl px-4 py-3",
                "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
                className
            )}
        >
            {children}
        </motion.div>
    );
}

// ─────────────────────────────────────────
// TECH TICKER
// ─────────────────────────────────────────

function TechTicker() {
    const doubled = [...techBadges, ...techBadges];

    return (
        <div
            className="relative w-full overflow-hidden py-4"
            aria-label="Technologies we work with"
        >
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-neutral-950 to-transparent pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-neutral-950 to-transparent pointer-events-none" />

            <div className="flex pause-on-hover">
                <div className="flex items-center gap-3 animate-slide-left shrink-0">
                    {doubled.map((tech, i) => (
                        <span
                            key={`${tech.name}-${i}`}
                            className={cn(
                                "inline-flex items-center gap-2 shrink-0",
                                "px-3 py-1.5 rounded-full",
                                "bg-white/5 border border-white/8",
                                "font-mono text-xs text-neutral-400",
                                "hover:border-brand/30 hover:text-brand",
                                "transition-colors duration-200 cursor-default"
                            )}
                        >
              <span
                  className="w-1.5 h-1.5 rounded-full bg-brand/60 shrink-0"
                  aria-hidden="true"
              />
                            {tech.name}
            </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────
// GRID LINES OVERLAY
// ─────────────────────────────────────────

function GridOverlay() {
    return (
        <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{
                backgroundImage: `
          linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)
        `,
                backgroundSize: "64px 64px",
            }}
        />
    );
}

// ─────────────────────────────────────────
// HERO VISUAL — right side composition
// ─────────────────────────────────────────

function HeroVisual() {
    return (
        <div className="relative w-full h-[480px] lg:h-[580px]">

            {/* Central glow orb */}
            <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, rgba(14,165,233,0.04) 50%, transparent 70%)",
                }}
            />

            {/* Main dashboard mockup card */}
            <motion.div
                initial={{ opacity: 0, y: 24, rotateX: 8 }}
                animate={{ opacity: 1, y: 0,  rotateX: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                    "absolute top-1/2 left-1/2",
                    "-translate-x-1/2 -translate-y-1/2",
                    "w-[340px] sm:w-[380px]",
                    "bg-neutral-900/90 backdrop-blur-xl",
                    "border border-white/10 rounded-3xl",
                    "shadow-[0_32px_80px_rgba(0,0,0,0.6)]",
                    "overflow-hidden"
                )}
            >
                {/* Card header bar */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"    />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"  />
                    </div>
                    <span className="font-mono text-[10px] text-neutral-500">
            gts-dashboard.app
          </span>
                    <div className="w-16 h-1.5 rounded-full bg-white/5" />
                </div>

                {/* Card content */}
                <div className="p-5 space-y-4">
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: "Projects",  value: "150+", color: "text-brand"    },
                            { label: "Clients",   value: "80+",  color: "text-green-400" },
                            { label: "Countries", value: "12+",  color: "text-violet-400"},
                        ].map(({ label, value, color }) => (
                            <div
                                key={label}
                                className="bg-white/4 rounded-xl p-3 text-center"
                            >
                                <p className={cn("font-display font-bold text-lg", color)}>
                                    {value}
                                </p>
                                <p className="font-body text-[10px] text-neutral-500 mt-0.5">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Activity bars */}
                    <div className="space-y-2.5">
                        <p className="font-body text-[10px] text-neutral-500 uppercase tracking-widest">
                            Service Activity
                        </p>
                        {[
                            { label: "Web Dev",    pct: 88, color: "bg-brand"     },
                            { label: "Mobile",     pct: 72, color: "bg-violet-500" },
                            { label: "Cloud",      pct: 61, color: "bg-cyan-500"   },
                            { label: "Marketing",  pct: 54, color: "bg-orange-500" },
                        ].map(({ label, pct, color }) => (
                            <div key={label} className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-neutral-500 w-16 shrink-0">
                  {label}
                </span>
                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${pct}%` }}
                                        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                        className={cn("h-full rounded-full", color)}
                                    />
                                </div>
                                <span className="font-mono text-[10px] text-neutral-500 w-8 text-right">
                  {pct}%
                </span>
                            </div>
                        ))}
                    </div>

                    {/* Recent project pill */}
                    <div className="flex items-center gap-3 bg-brand/8 border border-brand/15 rounded-xl px-3 py-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                        <div className="min-w-0">
                            <p className="font-body text-xs font-semibold text-white truncate">
                                Maviance Business Portal
                            </p>
                            <p className="font-mono text-[10px] text-neutral-500">
                                Deployed · 2 days ago
                            </p>
                        </div>
                        <CheckCircle2 size={14} className="text-green-400 shrink-0 ml-auto" />
                    </div>
                </div>
            </motion.div>

            {/* Floating stat card — top left */}
            <FloatingCard
                className="top-8 left-4 sm:left-8"
                delay={0.8}
            >
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand/15 flex items-center justify-center shrink-0">
                        <Star size={14} className="text-brand fill-brand" />
                    </div>
                    <div>
                        <p className="font-display font-bold text-sm text-white">5.0</p>
                        <p className="font-body text-[10px] text-neutral-400">Client Rating</p>
                    </div>
                </div>
            </FloatingCard>

            {/* Floating stat card — bottom right */}
            <FloatingCard
                className="bottom-10 right-4 sm:right-8"
                delay={1.0}
            >
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={14} className="text-green-400" />
                    </div>
                    <div>
                        <p className="font-display font-bold text-sm text-white">On Time</p>
                        <p className="font-body text-[10px] text-neutral-400">98% delivery rate</p>
                    </div>
                </div>
            </FloatingCard>

            {/* Service pills — scattered */}
            {heroServices.map(({ icon, label, delay }, i) => {
                const positions = [
                    "top-4  right-8",
                    "top-20 right-2",
                    "top-36 right-10",
                    "bottom-24 left-2",
                    "bottom-4  left-16",
                    "top-56 left-4",
                ];
                return (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1  }}
                        transition={{ duration: 0.4, delay: delay + 0.6 }}
                        className={cn(
                            "absolute z-10",
                            "inline-flex items-center gap-1.5",
                            "px-2.5 py-1.5 rounded-full",
                            "bg-white/5 backdrop-blur-sm",
                            "border border-white/8",
                            "font-body text-[11px] font-medium text-neutral-300",
                            positions[i]
                        )}
                    >
                        <span className="text-brand">{icon}</span>
                        {label}
                    </motion.div>
                );
            })}
        </div>
    );
}

// ─────────────────────────────────────────
// MAIN HERO SECTION
// ─────────────────────────────────────────

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <section
            className={cn(
                "relative min-h-[90vh] lg:min-h-screen",
                "bg-mesh",                    // Multi-layer radial gradient from globals.css
                "flex flex-col justify-center",
                "overflow-hidden",
                "-mt-[72px] pt-[72px]"        // Pulls under navbar, compensates with padding
            )}
            aria-label="Hero section"
        >
            {/* ── Background layers ── */}
            <GridOverlay />

            {/* Bottom fade to white for section below */}
            <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"
            />

            {/* ── Main content ── */}
            <div className="relative z-20 container-gts">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center py-20 lg:py-28">

                    {/* ── LEFT — Text content ── */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate={mounted ? "show" : "hidden"}
                        className="flex flex-col gap-7"
                    >
                        {/* Eyebrow label */}
                        <motion.div variants={fadeIn}>
                            <SectionLabel variant="dark">
                                🇨🇲 &nbsp;Based in Yaoundé, Cameroon · Serving Africa & Beyond
                            </SectionLabel>
                        </motion.div>

                        {/* Main heading */}
                        <motion.h1
                            variants={fadeUp}
                            className={cn(
                                "font-display font-bold text-white",
                                "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl",
                                "tracking-tight leading-[1.05]",
                                "text-balance"
                            )}
                        >
                            Engineering the{" "}
                            <span
                                className="relative inline-block"
                                aria-label="Future"
                            >
                <span className="gradient-text-white">Future</span>
                                {/* Underline accent */}
                                <motion.span
                                    aria-hidden="true"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1  }}
                                    transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand to-brand-light origin-left rounded-full"
                                />
              </span>
                            {" "}of{" "}
                            <span className="text-brand">African Business</span>
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            variants={fadeUp}
                            className={cn(
                                "font-body text-lg sm:text-xl",
                                "text-neutral-300 leading-relaxed",
                                "max-w-xl"
                            )}
                        >
                            From startup MVPs to enterprise platforms — we build{" "}
                            <span className="text-white font-medium">web apps</span>,{" "}
                            <span className="text-white font-medium">mobile products</span>,{" "}
                            <span className="text-white font-medium">cloud infrastructure</span>,
                            and{" "}
                            <span className="text-white font-medium">AI-powered tools</span>{" "}
                            that move businesses forward.
                        </motion.p>

                        {/* Trust signals */}
                        <motion.div
                            variants={fadeIn}
                            className="flex flex-wrap items-center gap-4"
                        >
                            {[
                                "150+ Projects Delivered",
                                "5★ Client Rating",
                                "98% On-Time Delivery",
                            ].map((signal) => (
                                <span
                                    key={signal}
                                    className="inline-flex items-center gap-1.5 font-body text-sm text-neutral-400"
                                >
                  <CheckCircle2
                      size={13}
                      className="text-brand shrink-0"
                      aria-hidden="true"
                  />
                                    {signal}
                </span>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <Button
                                asChild
                                variant="primary"
                                size="lg"
                                rounded="full"
                                rightIcon={<ArrowRight size={18} />}
                                className="shadow-brand-lg hover:shadow-brand-xl"
                            >
                                <Link href="/contact">Start a Project</Link>
                            </Button>

                            <Button
                                asChild
                                variant="glass"
                                size="lg"
                                rounded="full"
                                leftIcon={<Play size={15} className="fill-white" />}
                            >
                                <Link href="/portfolio">View Our Work</Link>
                            </Button>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            variants={fadeUp}
                            className={cn(
                                "grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4",
                                "border-t border-white/8"
                            )}
                        >
                            {stats.map(({ value, suffix, label }) => (
                                <div key={label} className="flex flex-col gap-0.5">
                  <span className="font-display font-bold text-2xl text-white">
                    {value}{suffix}
                  </span>
                                    <span className="font-body text-xs text-neutral-500 leading-snug">
                    {label}
                  </span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── RIGHT — Visual composition ── */}
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        animate={mounted ? "show" : "hidden"}
                        className="hidden lg:block"
                    >
                        <HeroVisual />
                    </motion.div>
                </div>
            </div>

            {/* ── Tech ticker strip ── */}
            <div className="relative z-20 border-t border-white/5 bg-white/2">
                <TechTicker />
            </div>
        </section>
    );
}