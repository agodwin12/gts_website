"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — CTA Section
//   Final homepage conversion section · Dark gradient
//   Multiple contact paths · WhatsApp · Urgency signals
// ═══════════════════════════════════════════════════════════════

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight, MessageCircle, Mail,
    Phone, Calendar, CheckCircle2, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

// ─────────────────────────────────────────
// CONTACT OPTION CARD
// ─────────────────────────────────────────

function ContactOption({
                           icon,
                           label,
                           value,
                           description,
                           href,
                           external,
                           delay,
                       }: {
    icon:        React.ReactNode;
    label:       string;
    value:       string;
    description: string;
    href:        string;
    external?:   boolean;
    delay:       number;
}) {
    return (
        <motion.a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "group flex items-start gap-4 p-5 rounded-2xl",
                "bg-white/5 border border-white/8",
                "hover:bg-white/8 hover:border-brand/30",
                "transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-brand focus-visible:ring-offset-2",
                "focus-visible:ring-offset-neutral-950"
            )}
        >
            {/* Icon */}
            <div
                className={cn(
                    "w-11 h-11 rounded-xl shrink-0",
                    "flex items-center justify-center",
                    "bg-brand/15 text-brand",
                    "group-hover:bg-brand group-hover:text-white",
                    "transition-all duration-300"
                )}
            >
                {icon}
            </div>

            {/* Text */}
            <div className="min-w-0">
                <p className="font-body text-xs text-neutral-500 mb-0.5 uppercase tracking-wider">
                    {label}
                </p>
                <p className="font-display font-semibold text-sm text-white truncate group-hover:text-brand transition-colors duration-200">
                    {value}
                </p>
                <p className="font-body text-xs text-neutral-500 mt-0.5">
                    {description}
                </p>
            </div>
        </motion.a>
    );
}

// ─────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────

export default function CtaSection() {
    const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hello! I'd like to discuss a project with Godwin Tech Solutions."
    )}`;

    const contactOptions = [
        {
            icon:        <Mail size={18} />,
            label:       "Email Us",
            value:       siteConfig.email,
            description: "We reply within 24 hours",
            href:        `mailto:${siteConfig.email}`,
            external:    false,
            delay:       0.2,
        },
        {
            icon:        <Phone size={18} />,
            label:       "Call Us",
            value:       siteConfig.phone,
            description: "Mon – Fri, 8am – 6pm WAT",
            href:        `tel:${siteConfig.phone}`,
            external:    false,
            delay:       0.3,
        },
        {
            icon:        <MessageCircle size={18} />,
            label:       "WhatsApp",
            value:       "Chat Instantly",
            description: "Quick replies during business hours",
            href:        waLink,
            external:    true,
            delay:       0.4,
        },
    ];

    return (
        <section
            id="cta"
            className={cn(
                "relative overflow-hidden",
                "bg-neutral-950 py-24 lg:py-32"
            )}
            aria-labelledby="cta-heading"
        >
            {/* ── Background layers ── */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                {/* Central radial glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-brand/8 blur-[120px]" />

                {/* Grid */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)
            `,
                        backgroundSize: "64px 64px",
                    }}
                />

                {/* Top border glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
            </div>

            <div className="relative z-10 container-gts">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* ── LEFT — Main message ── */}
                    <div className="flex flex-col gap-8">

                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <SectionLabel variant="dark">
                                <Zap size={12} className="fill-brand" />
                                Start Your Project Today
                            </SectionLabel>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            id="cta-heading"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className={cn(
                                "font-display font-bold text-white tracking-tight",
                                "text-4xl sm:text-5xl lg:text-6xl",
                                "leading-[1.05] text-balance"
                            )}
                        >
                            Let&apos;s Build{" "}
                            <span className="gradient-text-white">Something</span>{" "}
                            <span className="text-brand">Great Together</span>
                        </motion.h2>

                        {/* Body copy */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="font-body text-lg text-neutral-400 leading-relaxed max-w-lg"
                        >
                            Whether you have a detailed brief or just an idea on a napkin —
                            we&apos;re ready to help you turn it into a real, working product
                            that your users will love and your business will grow from.
                        </motion.p>

                        {/* Trust checklist */}
                        <motion.ul
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="space-y-2.5"
                        >
                            {[
                                "Free initial consultation — no commitment required",
                                "Fixed-price quotes with transparent scope",
                                "Dedicated project manager from day one",
                                "Built and delivered from Cameroon with global standards",
                            ].map((point) => (
                                <li
                                    key={point}
                                    className="flex items-start gap-2.5 font-body text-sm text-neutral-400"
                                >
                                    <CheckCircle2
                                        size={15}
                                        className="text-brand shrink-0 mt-0.5"
                                        aria-hidden="true"
                                    />
                                    {point}
                                </li>
                            ))}
                        </motion.ul>

                        {/* Primary CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.35 }}
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
                                leftIcon={<Calendar size={16} />}
                            >
                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Book a Free Call
                                </a>
                            </Button>
                        </motion.div>

                        {/* Urgency signal */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                            className="font-body text-xs text-neutral-600 flex items-center gap-1.5"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                            We&apos;re currently accepting new projects for{" "}
                            {new Date().getFullYear()} — slots fill quickly.
                        </motion.p>
                    </div>

                    {/* ── RIGHT — Contact options ── */}
                    <div className="flex flex-col gap-5">

                        {/* Contact cards */}
                        <div className="space-y-3">
                            {contactOptions.map((opt) => (
                                <ContactOption key={opt.label} {...opt} />
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-3 py-2">
                            <div className="flex-1 h-px bg-white/6" />
                            <span className="font-body text-xs text-neutral-600">or</span>
                            <div className="flex-1 h-px bg-white/6" />
                        </div>

                        {/* Response time card */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className={cn(
                                "p-6 rounded-2xl",
                                "bg-gradient-to-br from-brand/10 to-brand/5",
                                "border border-brand/20"
                            )}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={cn(
                                        "w-11 h-11 rounded-xl shrink-0",
                                        "flex items-center justify-center",
                                        "bg-brand text-white shadow-brand"
                                    )}
                                >
                                    <Zap size={18} />
                                </div>
                                <div>
                                    <p className="font-display font-bold text-white mb-1">
                                        Fast Response Guarantee
                                    </p>
                                    <p className="font-body text-sm text-neutral-400 leading-relaxed">
                                        Send us your project brief and we&apos;ll respond with a
                                        preliminary assessment and quote within{" "}
                                        <span className="text-brand font-semibold">
                      24 business hours
                    </span>
                                        . No ghosting, ever.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Location + timezone */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            className="flex items-center justify-between px-1"
                        >
                            <p className="font-body text-xs text-neutral-600">
                                📍 {siteConfig.location}
                            </p>
                            <p className="font-body text-xs text-neutral-600">
                                🕐 West Africa Time (UTC+1)
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}