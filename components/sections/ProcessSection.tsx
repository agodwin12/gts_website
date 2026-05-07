"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Process Section
//   6-step workflow · Connecting lines · Scroll-triggered reveals
// ═══════════════════════════════════════════════════════════════

import React from "react";
import { motion } from "framer-motion";
import {
    Search, PenTool, Code2,
    TestTube, Rocket, HeartHandshake,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { processSteps } from "@/lib/config";
import { SectionHeader } from "@/components/ui/SectionLabel";

// ─────────────────────────────────────────
// ICON MAP
// ─────────────────────────────────────────

const iconMap: Record<string, React.ReactNode> = {
    Search:        <Search        size={20} />,
    PenTool:       <PenTool       size={20} />,
    Code2:         <Code2         size={20} />,
    TestTube:      <TestTube      size={20} />,
    Rocket:        <Rocket        size={20} />,
    HeartHandshake:<HeartHandshake size={20} />,
};

// ─────────────────────────────────────────
// STEP CARD
// ─────────────────────────────────────────

function StepCard({
                      step,
                      title,
                      description,
                      icon,
                      index,
                      isLast,
                  }: {
    step:        number;
    title:       string;
    description: string;
    icon:        string;
    index:       number;
    isLast:      boolean;
}) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
                duration: 0.6,
                delay:    index * 0.1,
                ease:     [0.22, 1, 0.36, 1],
            }}
            className="relative flex flex-col items-center text-center group"
        >
            {/* Connector line — hidden on last item and on mobile */}
            {!isLast && (
                <div
                    aria-hidden="true"
                    className={cn(
                        "absolute top-10 left-[calc(50%+2.75rem)] right-0",
                        "hidden lg:block",
                        "h-px",
                        "bg-gradient-to-r from-brand/40 via-brand/20 to-transparent"
                    )}
                >
                    {/* Animated dot travelling along the line */}
                    <motion.div
                        initial={{ left: "0%" }}
                        whileInView={{ left: "100%" }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1.8,
                            delay:    index * 0.3 + 0.5,
                            ease:     "linear",
                            repeat:   Infinity,
                            repeatDelay: 3,
                        }}
                        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand shadow-[0_0_6px_2px_rgba(14,165,233,0.5)]"
                    />
                </div>
            )}

            {/* Step number + icon bubble */}
            <div className="relative mb-6">
                {/* Outer glow ring */}
                <div
                    aria-hidden="true"
                    className={cn(
                        "absolute inset-0 rounded-2xl",
                        "bg-brand/10 blur-md",
                        "scale-110 opacity-0 group-hover:opacity-100",
                        "transition-opacity duration-300"
                    )}
                />

                {/* Icon box */}
                <div
                    className={cn(
                        "relative w-20 h-20 rounded-2xl",
                        "flex items-center justify-center",
                        "bg-white border-2 border-neutral-100",
                        "shadow-card group-hover:shadow-card-hover",
                        "group-hover:border-brand/30",
                        "transition-all duration-300"
                    )}
                >
                    {/* Step number badge */}
                    <span
                        className={cn(
                            "absolute -top-3 -right-3",
                            "w-7 h-7 rounded-full",
                            "flex items-center justify-center",
                            "bg-brand text-white",
                            "font-display font-bold text-xs",
                            "shadow-brand-sm",
                            "border-2 border-white"
                        )}
                    >
            {step}
          </span>

                    {/* Icon */}
                    <span
                        className={cn(
                            "text-neutral-400",
                            "group-hover:text-brand",
                            "transition-colors duration-200"
                        )}
                    >
            {iconMap[icon] ?? <Search size={20} />}
          </span>
                </div>
            </div>

            {/* Text content */}
            <h3
                className={cn(
                    "font-display font-bold text-lg text-neutral-900 mb-2",
                    "group-hover:text-brand transition-colors duration-200"
                )}
            >
                {title}
            </h3>
            <p className="font-body text-sm text-neutral-500 leading-relaxed max-w-[180px]">
                {description}
            </p>
        </motion.div>
    );
}

// ─────────────────────────────────────────
// MOBILE STEP — vertical timeline variant
// ─────────────────────────────────────────

function MobileStep({
                        step,
                        title,
                        description,
                        icon,
                        index,
                        isLast,
                    }: {
    step:        number;
    title:       string;
    description: string;
    icon:        string;
    index:       number;
    isLast:      boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
                duration: 0.5,
                delay:    index * 0.1,
                ease:     [0.22, 1, 0.36, 1],
            }}
            className="relative flex gap-5"
        >
            {/* Left timeline column */}
            <div className="flex flex-col items-center shrink-0">
                {/* Icon circle */}
                <div
                    className={cn(
                        "w-12 h-12 rounded-xl shrink-0",
                        "flex items-center justify-center",
                        "bg-white border-2 border-neutral-100 shadow-card",
                        "relative"
                    )}
                >
          <span
              className={cn(
                  "absolute -top-2 -right-2",
                  "w-5 h-5 rounded-full",
                  "flex items-center justify-center",
                  "bg-brand text-white",
                  "font-display font-bold text-[10px]",
                  "border border-white"
              )}
          >
            {step}
          </span>
                    <span className="text-brand">
            {iconMap[icon] ?? <Search size={16} />}
          </span>
                </div>

                {/* Vertical line */}
                {!isLast && (
                    <div className="w-px flex-1 mt-3 bg-gradient-to-b from-brand/30 to-transparent min-h-[40px]" />
                )}
            </div>

            {/* Right content */}
            <div className="pb-8 pt-1">
                <h3 className="font-display font-bold text-base text-neutral-900 mb-1.5">
                    {title}
                </h3>
                <p className="font-body text-sm text-neutral-500 leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

// ─────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────

export default function ProcessSection() {
    return (
        <section
            id="process"
            className="section bg-neutral-50/40"
            aria-labelledby="process-heading"
        >
            <div className="container-gts">

                {/* Header */}
                <SectionHeader
                    label="How We Work"
                    heading={
                        <>
                            A Process Built{" "}
                            <span className="gradient-text">for Results</span>
                        </>
                    }
                    subheading="Every project follows our proven six-step framework — designed to reduce risk, maximise quality, and deliver on time."
                    align="center"
                    className="mb-20 max-w-2xl mx-auto"
                    headingClassName="text-3xl sm:text-4xl lg:text-5xl"
                />

                {/* Desktop — horizontal step flow */}
                <div
                    className="hidden lg:grid grid-cols-6 gap-4 relative"
                    aria-label="Our 6-step process"
                >
                    {processSteps.map((s, i) => (
                        <StepCard
                            key={s.step}
                            step={s.step}
                            title={s.title}
                            description={s.description}
                            icon={s.icon}
                            index={i}
                            isLast={i === processSteps.length - 1}
                        />
                    ))}
                </div>

                {/* Mobile — vertical timeline */}
                <div
                    className="lg:hidden max-w-md mx-auto"
                    aria-label="Our 6-step process"
                >
                    {processSteps.map((s, i) => (
                        <MobileStep
                            key={s.step}
                            step={s.step}
                            title={s.title}
                            description={s.description}
                            icon={s.icon}
                            index={i}
                            isLast={i === processSteps.length - 1}
                        />
                    ))}
                </div>

                {/* Bottom assurance strip */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className={cn(
                        "mt-20 grid grid-cols-1 sm:grid-cols-3 gap-5"
                    )}
                >
                    {[
                        {
                            title: "Transparent Communication",
                            body:  "Weekly progress updates, a shared project board, and a direct line to your dedicated project manager.",
                        },
                        {
                            title: "Fixed-Price Contracts",
                            body:  "No surprise invoices. We agree on scope and price upfront — what we quote is what you pay.",
                        },
                        {
                            title: "Post-Launch Support",
                            body:  "Every project includes a 30-day post-launch support window to handle any issues that arise.",
                        },
                    ].map(({ title, body }) => (
                        <div
                            key={title}
                            className={cn(
                                "p-6 rounded-2xl",
                                "bg-white border border-neutral-100 shadow-card",
                                "hover:border-brand/20 hover:shadow-card-hover",
                                "transition-all duration-300"
                            )}
                        >
                            <h4 className="font-display font-bold text-base text-neutral-900 mb-2">
                                {title}
                            </h4>
                            <p className="font-body text-sm text-neutral-500 leading-relaxed">
                                {body}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}