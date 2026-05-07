"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Services Section
//   12-service grid · Animated cards · Feature lists · CTAs
// ═══════════════════════════════════════════════════════════════

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Globe, Smartphone, Cloud, ShoppingCart, Palette,
    TrendingUp, BrainCircuit, Plug, Bot, Building2,
    Shield, Sparkles, ArrowRight, CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/lib/config";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import type { ServiceItem } from "@/lib/types";

// ─────────────────────────────────────────
// ICON MAP
// ─────────────────────────────────────────

const iconMap: Record<string, React.ReactNode> = {
    Globe:        <Globe        size={22} />,
    Smartphone:   <Smartphone   size={22} />,
    Cloud:        <Cloud        size={22} />,
    ShoppingCart: <ShoppingCart size={22} />,
    Palette:      <Palette      size={22} />,
    TrendingUp:   <TrendingUp   size={22} />,
    BrainCircuit: <BrainCircuit size={22} />,
    Plug:         <Plug         size={22} />,
    Bot:          <Bot          size={22} />,
    Building2:    <Building2    size={22} />,
    Shield:       <Shield       size={22} />,
    Sparkles:     <Sparkles     size={22} />,
};

// ─────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────

const containerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

// ─────────────────────────────────────────
// SERVICE CARD
// ─────────────────────────────────────────

function ServiceCard({ service }: { service: ServiceItem }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            variants={cardVariants}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link
                href={service.href}
                className={cn(
                    "group relative flex flex-col h-full",
                    "rounded-2xl p-6",
                    "bg-white border border-neutral-100",
                    "shadow-card",
                    "hover:shadow-card-hover hover:border-brand/20",
                    "hover:-translate-y-1",
                    "transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-brand focus-visible:ring-offset-2"
                )}
            >
                {/* Top accent line on hover */}
                <span
                    aria-hidden="true"
                    className={cn(
                        "absolute top-0 left-6 right-6 h-px rounded-full",
                        "bg-gradient-to-r from-transparent via-brand to-transparent",
                        "transition-opacity duration-300",
                        hovered ? "opacity-100" : "opacity-0"
                    )}
                />

                {/* Icon */}
                <div
                    className={cn(
                        "w-12 h-12 rounded-xl mb-5",
                        "flex items-center justify-center shrink-0",
                        "transition-all duration-300",
                        service.color ?? "text-brand",
                        hovered
                            ? "bg-brand text-white shadow-brand"
                            : "bg-brand/8"
                    )}
                >
                    {iconMap[service.icon] ?? <Globe size={22} />}
                </div>

                {/* Title */}
                <h3
                    className={cn(
                        "font-display font-bold text-lg text-neutral-900",
                        "group-hover:text-brand",
                        "transition-colors duration-200 mb-2"
                    )}
                >
                    {service.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-neutral-500 leading-relaxed mb-5 flex-1">
                    {service.description}
                </p>

                {/* Feature list */}
                <ul className="space-y-1.5 mb-6">
                    {service.features.slice(0, 4).map((feature) => (
                        <li
                            key={feature}
                            className="flex items-start gap-2 font-body text-xs text-neutral-600"
                        >
                            <CheckCircle2
                                size={12}
                                className="text-brand shrink-0 mt-0.5"
                                aria-hidden="true"
                            />
                            {feature}
                        </li>
                    ))}
                    {service.features.length > 4 && (
                        <li className="font-body text-xs text-neutral-400 pl-5">
                            +{service.features.length - 4} more
                        </li>
                    )}
                </ul>

                {/* CTA link */}
                <span
                    className={cn(
                        "inline-flex items-center gap-1.5",
                        "font-body text-sm font-semibold text-brand",
                        "group-hover:gap-2.5 transition-all duration-200"
                    )}
                    aria-hidden="true"
                >
          Learn more <ArrowRight size={14} />
        </span>
            </Link>
        </motion.div>
    );
}

// ─────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────

export default function ServicesSection() {
    return (
        <section
            id="services"
            className="section bg-neutral-50/60"
            aria-labelledby="services-heading"
        >
            <div className="container-gts">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
                    <SectionHeader
                        label="What We Do"
                        heading={
                            <>
                                Every Service Your{" "}
                                <span className="gradient-text">Business Needs</span>
                            </>
                        }
                        subheading="From a simple landing page to a full enterprise platform — we cover every layer of your digital stack."
                        headingClassName="text-3xl sm:text-4xl lg:text-5xl"
                    />

                    <Button
                        asChild
                        variant="secondary"
                        size="md"
                        rightIcon={<ArrowRight size={16} />}
                        className="shrink-0 self-start lg:self-auto"
                    >
                        <Link href="/services">All Services</Link>
                    </Button>
                </div>

                {/* Services grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className={cn(
                        "grid gap-5",
                        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    )}
                >
                    {services.map((service) => (
                        <ServiceCard key={service.title} service={service} />
                    ))}
                </motion.div>

                {/* Bottom CTA strip */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={cn(
                        "mt-14 p-8 rounded-2xl",
                        "bg-gradient-to-r from-neutral-900 to-neutral-800",
                        "flex flex-col sm:flex-row items-start sm:items-center",
                        "justify-between gap-6"
                    )}
                >
                    <div>
                        <h3 className="font-display font-bold text-xl text-white">
                            Not sure which service you need?
                        </h3>
                        <p className="font-body text-sm text-neutral-400 mt-1">
                            Tell us about your project and we&apos;ll recommend the right approach.
                        </p>
                    </div>
                    <Button
                        asChild
                        variant="primary"
                        size="md"
                        rounded="full"
                        rightIcon={<ArrowRight size={16} />}
                        className="shrink-0"
                    >
                        <Link href="/contact">Talk to Us</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}