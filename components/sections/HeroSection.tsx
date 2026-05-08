"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Hero Section
//   5-slide service carousel · Unsplash backgrounds · Auto-play
//   Per-slide accent colours · Vertical nav · Tech ticker
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link  from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight, ChevronLeft, ChevronRight,
    CheckCircle2, Globe, Smartphone, Cloud,
    Bot, Shield, TrendingUp, ShoppingCart,
    Palette, Plug, Building2, Sparkles,
    MessageCircle,
} from "lucide-react";
import { cn }          from "@/lib/utils";
import { techBadges }  from "@/lib/config";
import { Button }      from "@/components/ui/Button";

// ─────────────────────────────────────────
// SLIDES
// ─────────────────────────────────────────

const slides = [
    {
        id:       1,
        tag:      "Web & Mobile",
        heading1: "We Build Digital",
        heading2: "Products That Scale",
        sub:      "Modern websites, SaaS platforms, and mobile apps built with Next.js, Flutter & React Native — engineered for performance, speed, and growth.",
        image:    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80",
        accent:   "#0ea5e9",
        rgb:      "14,165,233",
        services: [
            { icon: <Globe      size={13}/>, label: "Web Development"  },
            { icon: <Smartphone size={13}/>, label: "App Development"  },
        ],
        pills:   ["Next.js", "Flutter", "React Native", "TypeScript"],
        stats:   [{ v: "80+", l: "Web & Mobile Apps" }, { v: "100%", l: "Mobile Responsive" }],
        cta:     { label: "Start Building",   href: "/services/web-development"  },
    },
    {
        id:       2,
        tag:      "Cloud & E-Commerce",
        heading1: "Your Business,",
        heading2: "Powered by the Cloud",
        sub:      "Cloud infrastructure, DevOps pipelines, and MTN/Orange Mobile Money e-commerce platforms that keep your business running and selling 24/7.",
        image:    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80",
        accent:   "#06b6d4",
        rgb:      "6,182,212",
        services: [
            { icon: <Cloud        size={13}/>, label: "Cloud Services" },
            { icon: <ShoppingCart size={13}/>, label: "E-Commerce"     },
        ],
        pills:   ["Docker", "AWS", "MTN MoMo", "Stripe"],
        stats:   [{ v: "99.9%", l: "Uptime SLA" }, { v: "MTN+Orange", l: "Mobile Money" }],
        cta:     { label: "Explore Cloud",    href: "/services/cloud-services"   },
    },
    {
        id:       3,
        tag:      "Design & Marketing",
        heading1: "Interfaces That Convert.",
        heading2: "Brands That Stick.",
        sub:      "Pixel-perfect UI/UX design in Figma, Google Ads campaigns, SEO optimisation, and social media marketing that bring measurable results.",
        image:    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=80",
        accent:   "#ec4899",
        rgb:      "236,72,153",
        services: [
            { icon: <Palette    size={13}/>, label: "UI/UX Design"     },
            { icon: <TrendingUp size={13}/>, label: "Digital Marketing"},
            { icon: <Sparkles   size={13}/>, label: "Branding"         },
        ],
        pills:   ["Figma", "Google Ads", "SEO", "Meta Ads"],
        stats:   [{ v: "312%", l: "Avg Traffic Growth" }, { v: "94/100", l: "Usability Score" }],
        cta:     { label: "See Our Work",     href: "/portfolio"                 },
    },
    {
        id:       4,
        tag:      "AI, Automation & Integrations",
        heading1: "AI Tools That Work",
        heading2: "While You Sleep",
        sub:      "WhatsApp chatbots in English, French & Pidgin. Workflow automation, Mobile Money API integrations, and AI-powered business tools built for Africa.",
        image:    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&q=80",
        accent:   "#f59e0b",
        rgb:      "245,158,11",
        services: [
            { icon: <Bot  size={13}/>, label: "AI & Automation"   },
            { icon: <Plug size={13}/>, label: "API & Integrations" },
        ],
        pills:   ["OpenAI", "Gemini", "WhatsApp API", "MTN MoMo API"],
        stats:   [{ v: "80%", l: "Query Automation" }, { v: "10x", l: "Average ROI" }],
        cta:     { label: "Automate Now",     href: "/services/automation-ai"   },
    },
    {
        id:       5,
        tag:      "Enterprise, Security & Consulting",
        heading1: "Complete Digital",
        heading2: "Transformation",
        sub:      "School & hospital management systems, server hardening & cybersecurity, IT consultancy, and end-to-end digital transformation for Cameroonian organisations.",
        image:    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80",
        accent:   "#a855f7",
        rgb:      "168,85,247",
        services: [
            { icon: <Building2 size={13}/>, label: "Enterprise Software" },
            { icon: <Shield    size={13}/>, label: "Cybersecurity"       },
        ],
        pills:   ["PostgreSQL", "Docker", "Linux", "Prisma"],
        stats:   [{ v: "15+", l: "Enterprise Systems" }, { v: "0", l: "Data Breaches" }],
        cta:     { label: "Transform Business", href: "/services/enterprise-software" },
    },
];

const DURATION = 6000;

// ─────────────────────────────────────────
// TECH TICKER
// ─────────────────────────────────────────

function TechTicker() {
    const doubled = [...techBadges, ...techBadges];
    return (
        <div className="relative w-full overflow-hidden py-4" aria-label="Technologies we work with">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-neutral-950 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-neutral-950 to-transparent pointer-events-none" />
            <div className="flex">
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
              <span className="w-1.5 h-1.5 rounded-full bg-brand/60 shrink-0" aria-hidden="true" />
                            {tech.name}
            </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────
// MAIN HERO
// ─────────────────────────────────────────

export default function HeroSection() {
    const [cur,    setCur]    = useState(0);
    const [paused, setPaused] = useState(false);
    const [mounted,setMounted]= useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => { setMounted(true); }, []);

    const goTo = useCallback((i: number) => setCur(i), []);
    const next = useCallback(() => setCur((c) => (c + 1) % slides.length), []);
    const prev = useCallback(() => setCur((c) => (c - 1 + slides.length) % slides.length), []);

    useEffect(() => {
        if (paused) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }
        timerRef.current = setInterval(next, DURATION);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [paused, next]);

    const slide = slides[cur];

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft")  { prev(); setPaused(true); }
        if (e.key === "ArrowRight") { next(); setPaused(true); }
    };

    if (!mounted) return null;

    return (
        <section
            className="relative flex flex-col min-h-[100svh] overflow-hidden bg-neutral-950 -mt-[72px]"
            aria-label="Hero — GTS services"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onKeyDown={handleKey}
            tabIndex={-1}
        >
            {/* ── BACKGROUND IMAGE CROSSFADE ── */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={slide.id}
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1    }}
                        exit={{    opacity: 0              }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={slide.image}
                            alt={slide.tag}
                            fill
                            priority={slide.id === 1}
                            className="object-cover"
                            sizes="100vw"
                        />
                        {/* Multi-layer overlay */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `
                  linear-gradient(to right, rgba(2,6,23,0.97) 0%, rgba(2,6,23,0.88) 50%, rgba(2,6,23,0.55) 100%),
                  linear-gradient(to top, rgba(2,6,23,0.9) 0%, transparent 60%)
                `,
                            }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Grid lines */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
                        backgroundSize: "64px 64px",
                    }}
                />
            </div>

            {/* ── ACCENT GLOW ── */}
            <AnimatePresence>
                <motion.div
                    key={`glow-${slide.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{    opacity: 0 }}
                    transition={{ duration: 1.4 }}
                    aria-hidden="true"
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse 60% 50% at 100% 50%, rgba(${slide.rgb},0.18) 0%, transparent 70%)`,
                    }}
                />
            </AnimatePresence>

            {/* ── CONTENT ── */}
            <div className="relative z-10 flex-1 flex flex-col justify-center pt-[72px]">
                <div className="container-gts py-12 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">

                        {/* ── LEFT — Text (7 cols) ── */}
                        <div className="lg:col-span-7 flex flex-col gap-8">

                            {/* Location pill */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`loc-${slide.id}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0  }}
                                    exit={{    opacity: 0        }}
                                    transition={{ duration: 0.35 }}
                                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-body text-xs text-neutral-400">
                    🇨🇲 Based in Douala, Cameroon · Serving Africa & Beyond
                  </span>
                                </motion.div>
                            </AnimatePresence>

                            {/* Service tag */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`tag-${slide.id}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0   }}
                                    exit={{    opacity: 0, x: 20  }}
                                    transition={{ duration: 0.4, delay: 0.05 }}
                                    className="flex flex-wrap items-center gap-3"
                                >
                                    {/* Active tag */}
                                    <span
                                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border font-body text-xs font-semibold"
                                        style={{
                                            borderColor: `rgba(${slide.rgb},0.5)`,
                                            color:       `rgb(${slide.rgb})`,
                                            background:  `rgba(${slide.rgb},0.1)`,
                                        }}
                                    >
                    <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                        style={{ background: `rgb(${slide.rgb})` }}
                    />
                                        {slide.tag}
                  </span>

                                    {/* Service icons */}
                                    {slide.services.map(({ icon, label }) => (
                                        <span
                                            key={label}
                                            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/8 font-body text-[11px] text-neutral-400"
                                        >
                      <span style={{ color: `rgb(${slide.rgb})` }}>{icon}</span>
                                            {label}
                    </span>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            {/* Heading */}
                            <AnimatePresence mode="wait">
                                <motion.h1
                                    key={`h-${slide.id}`}
                                    initial={{ opacity: 0, y: 40  }}
                                    animate={{ opacity: 1, y: 0   }}
                                    exit={{    opacity: 0, y: -20 }}
                                    transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                                    className="font-display font-bold text-white tracking-tight leading-[1.06] text-balance"
                                    style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }}
                                >
                                    <span className="block">{slide.heading1}</span>
                                    <span
                                        className="block mt-1"
                                        style={{
                                            background:           `linear-gradient(135deg, #fff 0%, rgb(${slide.rgb}) 100%)`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor:  "transparent",
                                            backgroundClip:       "text",
                                        }}
                                    >
                    {slide.heading2}
                  </span>
                                </motion.h1>
                            </AnimatePresence>

                            {/* Subtext */}
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={`sub-${slide.id}`}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0  }}
                                    exit={{    opacity: 0        }}
                                    transition={{ duration: 0.45, delay: 0.15 }}
                                    className="font-body text-lg text-neutral-400 leading-relaxed max-w-xl"
                                >
                                    {slide.sub}
                                </motion.p>
                            </AnimatePresence>

                            {/* Tech pills */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`pills-${slide.id}`}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0  }}
                                    exit={{    opacity: 0        }}
                                    transition={{ duration: 0.4, delay: 0.18 }}
                                    className="flex flex-wrap gap-2"
                                >
                                    {slide.pills.map((p) => (
                                        <span
                                            key={p}
                                            className="px-3 py-1 rounded-full font-mono text-xs border"
                                            style={{
                                                borderColor: `rgba(${slide.rgb},0.25)`,
                                                color:       `rgba(${slide.rgb},0.9)`,
                                                background:  `rgba(${slide.rgb},0.06)`,
                                            }}
                                        >
                      {p}
                    </span>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            {/* Stats + trust signals */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`stats-${slide.id}`}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0  }}
                                    exit={{    opacity: 0        }}
                                    transition={{ duration: 0.4, delay: 0.22 }}
                                    className="flex flex-wrap items-center gap-6"
                                >
                                    {slide.stats.map(({ v, l }) => (
                                        <div key={l}>
                                            <p
                                                className="font-display font-bold text-2xl"
                                                style={{ color: `rgb(${slide.rgb})` }}
                                            >
                                                {v}
                                            </p>
                                            <p className="font-body text-xs text-neutral-500">{l}</p>
                                        </div>
                                    ))}

                                    <div className="w-px h-8 bg-white/10 hidden sm:block" />

                                    {["150+ Projects", "5★ Rating", "98% On-Time"].map((s) => (
                                        <span key={s} className="inline-flex items-center gap-1.5 font-body text-sm text-neutral-500">
                      <CheckCircle2 size={12} className="text-brand shrink-0" />
                                            {s}
                    </span>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            {/* CTAs */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`cta-${slide.id}`}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0  }}
                                    exit={{    opacity: 0        }}
                                    transition={{ duration: 0.4, delay: 0.28 }}
                                    className="flex flex-wrap items-center gap-4"
                                >
                                    {/* Slide-specific CTA */}
                                    <a
                                        href={slide.cta.href}
                                        className={cn(
                                            "inline-flex items-center gap-2",
                                            "px-7 py-3.5 rounded-full",
                                            "font-body font-semibold text-base text-white",
                                            "transition-all duration-200 hover:-translate-y-0.5",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                        )}
                                        style={{
                                            background: `linear-gradient(135deg, rgb(${slide.rgb}), rgba(${slide.rgb},0.65))`,
                                            boxShadow:  `0 8px 28px rgba(${slide.rgb},0.38)`,
                                        }}
                                    >
                                        {slide.cta.label}
                                        <ArrowRight size={16} />
                                    </a>

                                    {/* Always-present secondary CTA */}
                                    <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={15} />}>
                                        <Link href="/contact">Contact Us</Link>
                                    </Button>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* ── RIGHT — Vertical slide nav (5 cols) ── */}
                        <div className="hidden lg:flex lg:col-span-5 flex-col gap-2.5">
                            {slides.map((s, i) => {
                                const isActive = i === cur;
                                return (
                                    <button
                                        key={s.id}
                                        onClick={() => { goTo(i); setPaused(true); }}
                                        aria-label={`View ${s.tag}`}
                                        aria-current={isActive}
                                        className={cn(
                                            "group relative flex items-start gap-4 text-left",
                                            "px-5 py-4 rounded-2xl border",
                                            "transition-all duration-300 overflow-hidden",
                                            isActive
                                                ? "border-white/15 bg-white/8 backdrop-blur-md"
                                                : "border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10"
                                        )}
                                    >
                                        {/* Progress bar left edge */}
                                        <div className="w-0.5 self-stretch rounded-full bg-white/8 shrink-0 overflow-hidden">
                                            {isActive && (
                                                <motion.div
                                                    key={`prog-${s.id}-${paused}`}
                                                    initial={{ height: "0%" }}
                                                    animate={{ height: paused ? "0%" : "100%" }}
                                                    transition={{
                                                        duration:   paused ? 0 : DURATION / 1000,
                                                        ease:       "linear",
                                                    }}
                                                    className="w-full rounded-full"
                                                    style={{ background: `rgb(${s.rgb})` }}
                                                />
                                            )}
                                        </div>

                                        {/* Slide content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <p className={cn(
                                                    "font-display font-semibold text-sm truncate",
                                                    isActive
                                                        ? "text-white"
                                                        : "text-neutral-500 group-hover:text-neutral-300 transition-colors"
                                                )}>
                                                    {s.tag}
                                                </p>
                                                <span className="font-mono text-[10px] text-neutral-700 shrink-0">
                          0{s.id}
                        </span>
                                            </div>

                                            {/* Service tags — shown when active */}
                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{    opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.25 }}
                                                        className="flex flex-wrap gap-1.5 mt-2 overflow-hidden"
                                                    >
                                                        {s.services.map(({ icon, label }) => (
                                                            <span
                                                                key={label}
                                                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-body text-[10px]"
                                                                style={{
                                                                    background: `rgba(${s.rgb},0.1)`,
                                                                    color:      `rgb(${s.rgb})`,
                                                                }}
                                                            >
                                {icon} {label}
                              </span>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </button>
                                );
                            })}

                            {/* View all services link */}
                            <Link
                                href="/services"
                                className="flex items-center justify-center gap-2 mt-1 py-3 rounded-2xl border border-white/5 font-body text-sm text-neutral-500 hover:text-neutral-200 hover:border-white/10 hover:bg-white/3 transition-all duration-200"
                            >
                                View all 12 services <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── BOTTOM CONTROLS ── */}
            <div className="relative z-10 px-6 lg:px-8 pb-5 flex items-center justify-between">

                {/* Dots */}
                <div className="flex items-center gap-2" role="group" aria-label="Slides">
                    {slides.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => { goTo(i); setPaused(true); }}
                            aria-label={`Slide ${i + 1}: ${s.tag}`}
                            aria-current={i === cur}
                            className={cn(
                                "rounded-full transition-all duration-350",
                                i === cur ? "w-8 h-2" : "w-2 h-2 bg-white/15 hover:bg-white/30"
                            )}
                            style={i === cur ? {
                                background: `rgb(${slide.rgb})`,
                                boxShadow:  `0 0 10px rgba(${slide.rgb},0.6)`,
                            } : {}}
                        />
                    ))}
                </div>

                {/* Prev / Next / Counter */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => { prev(); setPaused(true); }}
                        aria-label="Previous slide"
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/8 text-neutral-400 hover:bg-white/10 hover:text-white hover:border-white/15 transition-all duration-200"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => { next(); setPaused(true); }}
                        aria-label="Next slide"
                        className="w-10 h-10 rounded-xl flex items-center justify-center border text-white transition-all duration-200 hover:opacity-80"
                        style={{
                            background:  `rgba(${slide.rgb},0.2)`,
                            borderColor: `rgba(${slide.rgb},0.45)`,
                        }}
                    >
                        <ChevronRight size={18} />
                    </button>
                    <span className="font-mono text-xs text-neutral-600 ml-1">
            <span style={{ color: `rgb(${slide.rgb})` }}>0{cur + 1}</span>
                        {" / "}05
          </span>
                </div>
            </div>

            {/* ── TECH TICKER ── */}
            <div className="relative z-10 border-t border-white/5 bg-neutral-950/80 backdrop-blur-sm">
                <TechTicker />
            </div>
        </section>
    );
}