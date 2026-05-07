"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Testimonials Section
//   Auto-playing carousel · Star ratings · Client cards
//   Keyboard accessible · Pause on hover
// ═══════════════════════════════════════════════════════════════

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star, ChevronLeft, ChevronRight, Quote,
} from "lucide-react";
import { cn, enumToLabel, getInitials } from "@/lib/utils";
import { testimonials } from "@/lib/config";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { CategoryBadge } from "@/components/ui/Badge";

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────

const AUTOPLAY_INTERVAL = 5500;
const CARDS_PER_VIEW    = { mobile: 1, tablet: 2, desktop: 3 } as const;

// ─────────────────────────────────────────
// STAR RATING
// ─────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
    return (
        <div
            className="flex items-center gap-0.5"
            aria-label={`${rating} out of 5 stars`}
            role="img"
        >
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={14}
                    className={cn(
                        i < rating ? "text-amber-400 fill-amber-400" : "text-neutral-300"
                    )}
                    aria-hidden="true"
                />
            ))}
        </div>
    );
}

// ─────────────────────────────────────────
// AVATAR
// ─────────────────────────────────────────

function Avatar({
                    name,
                    avatar,
                    size = "md",
                }: {
    name:    string;
    avatar?: string;
    size?:   "sm" | "md" | "lg";
}) {
    const sizeClass = {
        sm: "w-8  h-8  text-xs",
        md: "w-11 h-11 text-sm",
        lg: "w-14 h-14 text-base",
    }[size];

    if (avatar) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={avatar}
                alt={name}
                className={cn(sizeClass, "rounded-full object-cover shrink-0")}
            />
        );
    }

    return (
        <div
            className={cn(
                sizeClass,
                "rounded-full shrink-0",
                "bg-gradient-to-br from-brand to-brand-dark",
                "flex items-center justify-center",
                "font-display font-bold text-white"
            )}
            aria-hidden="true"
        >
            {getInitials(name)}
        </div>
    );
}

// ─────────────────────────────────────────
// TESTIMONIAL CARD
// ─────────────────────────────────────────

function TestimonialCard({
                             testimonial,
                             active,
                         }: {
    testimonial: typeof testimonials[0];
    active:      boolean;
}) {
    return (
        <motion.div
            layout
            className={cn(
                "relative flex flex-col",
                "p-6 rounded-2xl h-full",
                "bg-white border",
                "transition-all duration-300",
                active
                    ? "border-brand/30 shadow-brand"
                    : "border-neutral-100 shadow-card"
            )}
        >
            {/* Quote icon */}
            <div
                aria-hidden="true"
                className="absolute top-5 right-5 text-brand/10"
            >
                <Quote size={40} className="fill-brand/10" />
            </div>

            {/* Top row — rating + category */}
            <div className="flex items-center justify-between mb-4">
                <StarRating rating={testimonial.rating} />
                {testimonial.projectCategory && (
                    <CategoryBadge
                        label={enumToLabel(testimonial.projectCategory)
                            .replace(" Development", " Dev")
                            .replace(" Design", "")}
                        className="text-[9px]"
                    />
                )}
            </div>

            {/* Quote text */}
            <blockquote className="flex-1 mb-6">
                <p className="font-body text-sm text-neutral-700 leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                </p>
            </blockquote>

            {/* Client info */}
            <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                <Avatar name={testimonial.name} avatar={testimonial.avatar} />
                <div className="min-w-0">
                    <p className="font-display font-semibold text-sm text-neutral-900 truncate">
                        {testimonial.name}
                    </p>
                    <p className="font-body text-xs text-neutral-500 truncate">
                        {testimonial.role} · {testimonial.company}
                    </p>
                    <p className="font-body text-xs text-brand mt-0.5">
                        {testimonial.country}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

// ─────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────

export default function TestimonialsSection() {
    const [current,  setCurrent]  = useState(0);
    const [paused,   setPaused]   = useState(false);
    const [perView,  setPerView]  = useState<number>(CARDS_PER_VIEW.desktop);
    const intervalRef             = useRef<ReturnType<typeof setInterval> | null>(null);

    const total     = testimonials.length;
    const maxIndex  = Math.max(0, total - perView);

    // ── Responsive perView ──
    useEffect(() => {
        const update = () => {
            if (window.innerWidth < 640)       setPerView(CARDS_PER_VIEW.mobile);
            else if (window.innerWidth < 1024) setPerView(CARDS_PER_VIEW.tablet);
            else                               setPerView(CARDS_PER_VIEW.desktop);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    // Reset index if perView changes
    useEffect(() => {
        setCurrent((c) => Math.min(c, Math.max(0, total - perView)));
    }, [perView, total]);

    // ── Autoplay ──
    const next = useCallback(() => {
        setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
    }, [maxIndex]);

    const prev = useCallback(() => {
        setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
    }, [maxIndex]);

    useEffect(() => {
        if (paused) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }
        intervalRef.current = setInterval(next, AUTOPLAY_INTERVAL);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [paused, next]);

    // ── Keyboard navigation ──
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft")  { prev(); setPaused(true); }
        if (e.key === "ArrowRight") { next(); setPaused(true); }
    };

    // Visible slice
    const visible = testimonials.slice(current, current + perView);

    return (
        <section
            id="testimonials"
            className="section bg-neutral-50/60 overflow-hidden"
            aria-labelledby="testimonials-heading"
        >
            <div className="container-gts">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14">
                    <SectionHeader
                        label="Client Stories"
                        heading={
                            <>
                                What Our Clients{" "}
                                <span className="gradient-text">Say About Us</span>
                            </>
                        }
                        subheading="Don't just take our word for it — hear from the businesses we've helped grow."
                        headingClassName="text-3xl sm:text-4xl lg:text-5xl"
                    />

                    {/* Nav controls */}
                    <div
                        className="flex items-center gap-3 shrink-0"
                        role="group"
                        aria-label="Testimonial navigation"
                    >
                        <button
                            onClick={() => { prev(); setPaused(true); }}
                            aria-label="Previous testimonial"
                            className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center",
                                "border border-neutral-200 text-neutral-500",
                                "hover:border-brand hover:text-brand hover:bg-brand/5",
                                "transition-all duration-200",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                            )}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={() => { next(); setPaused(true); }}
                            aria-label="Next testimonial"
                            className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center",
                                "border border-neutral-200 text-neutral-500",
                                "hover:border-brand hover:text-brand hover:bg-brand/5",
                                "transition-all duration-200",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                            )}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={()    => setPaused(true)}
                    onBlur={()     => setPaused(false)}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="region"
                    aria-label="Testimonials carousel"
                    aria-live="polite"
                    className={cn(
                        "grid gap-5 outline-none",
                        perView === 1 ? "grid-cols-1" :
                            perView === 2 ? "grid-cols-2" :
                                "grid-cols-3"
                    )}
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visible.map((t, i) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, x: 40  }}
                                animate={{ opacity: 1, x: 0   }}
                                exit={{    opacity: 0, x: -40 }}
                                transition={{
                                    duration: 0.35,
                                    delay:    i * 0.05,
                                    ease:     [0.22, 1, 0.36, 1],
                                }}
                            >
                                <TestimonialCard
                                    testimonial={t}
                                    active={i === 0 && perView === 1}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Dot indicators */}
                <div
                    className="flex items-center justify-center gap-2 mt-10"
                    role="group"
                    aria-label="Testimonial position indicators"
                >
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setCurrent(i); setPaused(true); }}
                            aria-label={`Go to testimonial ${i + 1}`}
                            aria-current={current === i}
                            className={cn(
                                "rounded-full transition-all duration-300",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                                current === i
                                    ? "w-6 h-2 bg-brand"
                                    : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400"
                            )}
                        />
                    ))}
                </div>

                {/* Progress bar */}
                <div className="mt-4 mx-auto max-w-xs h-px bg-neutral-200 rounded-full overflow-hidden">
                    <motion.div
                        key={`${current}-${paused}`}
                        initial={{ width: "0%" }}
                        animate={{ width: paused ? "0%" : "100%" }}
                        transition={{
                            duration: paused ? 0 : AUTOPLAY_INTERVAL / 1000,
                            ease:     "linear",
                        }}
                        className="h-full bg-brand rounded-full"
                    />
                </div>

                {/* Overall rating strip */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={cn(
                        "mt-14 flex flex-col sm:flex-row items-center justify-center gap-6",
                        "py-6 px-8 rounded-2xl",
                        "bg-white border border-neutral-100 shadow-card"
                    )}
                >
                    {/* Overall score */}
                    <div className="flex items-center gap-3">
                        <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={20}
                                    className="text-amber-400 fill-amber-400"
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                        <span className="font-display font-bold text-2xl text-neutral-900">
              5.0
            </span>
                        <span className="font-body text-sm text-neutral-500">
              average rating
            </span>
                    </div>

                    <div className="hidden sm:block w-px h-8 bg-neutral-200" aria-hidden="true" />

                    <p className="font-body text-sm text-neutral-500 text-center sm:text-left">
                        Based on{" "}
                        <span className="font-semibold text-neutral-900">80+ client reviews</span>
                        {" "}across all service categories
                    </p>
                </motion.div>
            </div>
        </section>
    );
}