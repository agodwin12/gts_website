"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Services Page
//   All 12 services · Feature lists · Process overview · CTAs
// ═══════════════════════════════════════════════════════════════

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Globe, Smartphone, Cloud, ShoppingCart,
    Palette, TrendingUp, BrainCircuit, Plug,
    Bot, Building2, Shield, Sparkles,
    ArrowRight, CheckCircle2, ChevronDown,
    MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { services, siteConfig } from "@/lib/config";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button }      from "@/components/ui/Button";
import { SectionLabel, SectionHeader } from "@/components/ui/SectionLabel";
import type { ServiceItem } from "@/lib/types";

// ─────────────────────────────────────────
// ICON MAP
// ─────────────────────────────────────────

const iconMap: Record<string, React.ReactNode> = {
    Globe:        <Globe        size={24} />,
    Smartphone:   <Smartphone   size={24} />,
    Cloud:        <Cloud        size={24} />,
    ShoppingCart: <ShoppingCart size={24} />,
    Palette:      <Palette      size={24} />,
    TrendingUp:   <TrendingUp   size={24} />,
    BrainCircuit: <BrainCircuit size={24} />,
    Plug:         <Plug         size={24} />,
    Bot:          <Bot          size={24} />,
    Building2:    <Building2    size={24} />,
    Shield:       <Shield       size={24} />,
    Sparkles:     <Sparkles     size={24} />,
};

// Color map for service accents
const colorBgMap: Record<string, string> = {
    "text-sky-500":     "bg-sky-500/10",
    "text-violet-500":  "bg-violet-500/10",
    "text-cyan-500":    "bg-cyan-500/10",
    "text-emerald-500": "bg-emerald-500/10",
    "text-pink-500":    "bg-pink-500/10",
    "text-orange-500":  "bg-orange-500/10",
    "text-indigo-500":  "bg-indigo-500/10",
    "text-teal-500":    "bg-teal-500/10",
    "text-yellow-500":  "bg-yellow-500/10",
    "text-blue-500":    "bg-blue-500/10",
    "text-red-500":     "bg-red-500/10",
    "text-fuchsia-500": "bg-fuchsia-500/10",
};

// ─────────────────────────────────────────
// SERVICE CARD — expanded view
// ─────────────────────────────────────────

function ServiceCard({
                         service,
                         index,
                     }: {
    service: ServiceItem;
    index:   number;
}) {
    const [expanded, setExpanded] = useState(false);
    const colorText = service.color ?? "text-brand";
    const colorBg   = colorBgMap[colorText] ?? "bg-brand/10";

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
                duration: 0.5,
                delay:    (index % 3) * 0.1,
                ease:     [0.22, 1, 0.36, 1],
            }}
            className={cn(
                "group flex flex-col",
                "rounded-2xl bg-white",
                "border border-neutral-100",
                "shadow-card hover:shadow-card-hover",
                "hover:border-brand/20",
                "transition-all duration-300"
            )}
        >
            {/* Card header */}
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                    {/* Icon */}
                    <div className={cn(
                        "w-12 h-12 rounded-xl shrink-0",
                        "flex items-center justify-center",
                        colorBg, colorText,
                        "group-hover:scale-110 transition-transform duration-300"
                    )}>
                        {iconMap[service.icon] ?? <Globe size={24} />}
                    </div>

                    {/* Service number */}
                    <span className="font-mono text-xs text-neutral-300 font-bold mt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
                </div>

                <h2 className={cn(
                    "font-display font-bold text-xl text-neutral-900 mb-2",
                    "group-hover:text-brand transition-colors duration-200"
                )}>
                    {service.title}
                </h2>

                <p className="font-body text-sm text-neutral-500 leading-relaxed">
                    {service.description}
                </p>
            </div>

            {/* Feature list */}
            <div className="px-6 pb-4 flex-1">
                <ul className="space-y-2">
                    {service.features
                        .slice(0, expanded ? service.features.length : 4)
                        .map((f) => (
                            <li
                                key={f}
                                className="flex items-start gap-2 font-body text-sm text-neutral-600"
                            >
                                <CheckCircle2
                                    size={13}
                                    className={cn("shrink-0 mt-0.5", colorText)}
                                    aria-hidden="true"
                                />
                                {f}
                            </li>
                        ))}
                </ul>

                {/* Show more toggle */}
                {service.features.length > 4 && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className={cn(
                            "mt-3 inline-flex items-center gap-1",
                            "font-body text-xs font-medium",
                            colorText,
                            "hover:opacity-70 transition-opacity"
                        )}
                        aria-expanded={expanded}
                    >
                        <ChevronDown
                            size={13}
                            className={cn(
                                "transition-transform duration-200",
                                expanded && "rotate-180"
                            )}
                        />
                        {expanded
                            ? "Show less"
                            : `+${service.features.length - 4} more`}
                    </button>
                )}
            </div>

            {/* Card footer */}
            <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                <Link
                    href={service.href}
                    className={cn(
                        "inline-flex items-center gap-1.5",
                        "font-body text-sm font-semibold",
                        colorText,
                        "hover:gap-2.5 transition-all duration-200"
                    )}
                >
                    Learn more <ArrowRight size={13} />
                </Link>

                <Button asChild variant="primary" size="sm" rounded="full">
                    <Link href="/contact">Get Quote</Link>
                </Button>
            </div>
        </motion.div>
    );
}

// ─────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────

const faqs = [
    {
        q: "How long does a typical project take?",
        a: "Project timelines vary by complexity. A simple landing page takes 1–2 weeks. A full web application or mobile app typically takes 6–16 weeks. Enterprise systems can take 3–6 months. We'll give you a realistic timeline during our initial consultation.",
    },
    {
        q: "Do you work with clients outside Cameroon?",
        a: "Absolutely. While we're based in Yaoundé, we work with clients across Africa and internationally. We communicate fluently in English and French, and our processes are fully remote-friendly.",
    },
    {
        q: "What payment methods do you accept?",
        a: "We accept MTN Mobile Money, Orange Money, bank transfers, and international payments via card or PayPal. We typically work with a 40% deposit upfront and the remainder on delivery.",
    },
    {
        q: "Do you provide post-launch support?",
        a: "Yes. Every project includes a 30-day post-launch support window at no extra cost. After that, we offer monthly maintenance packages tailored to your needs.",
    },
    {
        q: "Can you work with an existing codebase?",
        a: "Yes. We regularly take over existing projects — auditing the code, fixing technical debt, adding features, and migrating to modern stacks. We'll do a thorough code review before committing to the scope.",
    },
    {
        q: "How do you handle project communication?",
        a: "We assign a dedicated project manager to every project. You'll receive weekly progress updates, have access to a shared project board, and can reach us directly via WhatsApp or email at any time.",
    },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.07 }}
            className="border border-neutral-200 rounded-2xl overflow-hidden"
        >
            <button
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                className={cn(
                    "w-full flex items-center justify-between gap-4",
                    "px-6 py-5 text-left",
                    "font-display font-semibold text-base text-neutral-900",
                    "hover:bg-neutral-50 transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-brand focus-visible:ring-inset"
                )}
            >
                {q}
                <ChevronDown
                    size={18}
                    className={cn(
                        "text-neutral-400 shrink-0",
                        "transition-transform duration-250",
                        open && "rotate-180 text-brand"
                    )}
                    aria-hidden="true"
                />
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{    height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-5 font-body text-sm text-neutral-500 leading-relaxed">
                            {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────

export default function ServicesPage() {
    const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hello! I'd like to discuss a project with Godwin Tech Solutions."
    )}`;

    return (
        <>
            <Navbar />

            {/* ── Hero ── */}
            <section className="relative bg-neutral-950 pt-24 pb-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand/8 rounded-full blur-[120px]" />
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
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-neutral-50 to-transparent" />
                </div>

                <div className="relative z-10 container-gts">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto"
                    >
                        <SectionLabel variant="dark" align="center">
                            What We Offer
                        </SectionLabel>

                        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance">
                            Every Service Your{" "}
                            <span className="text-brand">Business Needs</span>
                        </h1>

                        <p className="font-body text-lg text-neutral-400 leading-relaxed max-w-2xl">
                            From a simple landing page to a full enterprise platform — we cover
                            every layer of your digital stack. One partner, end-to-end.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mt-2">
                            <Button
                                asChild
                                variant="primary"
                                size="lg"
                                rounded="full"
                                rightIcon={<ArrowRight size={16} />}
                            >
                                <Link href="/contact">Start a Project</Link>
                            </Button>
                            <Button
                                asChild
                                variant="glass"
                                size="lg"
                                rounded="full"
                                leftIcon={<MessageCircle size={16} />}
                            >
                                <a href={waLink} target="_blank" rel="noopener noreferrer">
                                    Chat on WhatsApp
                                </a>
                            </Button>
                        </div>

                        {/* Service count badges */}
                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                            {[
                                "12 Service Areas",
                                "Web & Mobile",
                                "Cloud & AI",
                                "Enterprise & Branding",
                            ].map((label) => (
                                <span
                                    key={label}
                                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-body text-xs text-neutral-400"
                                >
                  {label}
                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Services Grid ── */}
            <section
                id="services-grid"
                className="bg-neutral-50 py-16 lg:py-24"
                aria-label="All services"
            >
                <div className="container-gts">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={service.title}
                                service={service}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why GTS Strip ── */}
            <section className="bg-white py-16">
                <div className="container-gts">
                    <SectionHeader
                        label="Why Choose GTS"
                        heading={
                            <>
                                One Partner,{" "}
                                <span className="gradient-text">End-to-End</span>
                            </>
                        }
                        subheading="Instead of juggling multiple agencies and freelancers, work with one team that handles your entire digital stack."
                        align="center"
                        className="mb-12 max-w-2xl mx-auto"
                        headingClassName="text-3xl sm:text-4xl"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                title: "Integrated Approach",
                                body:  "Design, development, cloud, and marketing — all coordinated under one roof for seamless delivery.",
                                icon:  "🔗",
                            },
                            {
                                title: "African Context",
                                body:  "Mobile Money, local languages, bandwidth constraints — we build for the real African market.",
                                icon:  "🌍",
                            },
                            {
                                title: "Fixed Pricing",
                                body:  "No surprise invoices. Transparent scope and pricing agreed before any work begins.",
                                icon:  "💰",
                            },
                            {
                                title: "Ongoing Support",
                                body:  "We don't disappear after launch. Every project includes post-delivery support and maintenance.",
                                icon:  "🛡️",
                            },
                        ].map(({ title, body, icon }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className={cn(
                                    "p-6 rounded-2xl text-center",
                                    "bg-neutral-50 border border-neutral-100",
                                    "hover:border-brand/20 hover:shadow-brand-sm",
                                    "transition-all duration-300"
                                )}
                            >
                <span className="text-3xl mb-4 block" aria-hidden="true">
                  {icon}
                </span>
                                <h3 className="font-display font-bold text-base text-neutral-900 mb-2">
                                    {title}
                                </h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed">
                                    {body}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="bg-neutral-50/60 py-16 lg:py-24">
                <div className="container-gts">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Left — header */}
                        <div className="flex flex-col gap-6">
                            <SectionHeader
                                label="FAQ"
                                heading={
                                    <>
                                        Common{" "}
                                        <span className="gradient-text">Questions</span>
                                    </>
                                }
                                subheading="Everything you need to know before starting a project with us."
                                headingClassName="text-3xl sm:text-4xl"
                            />

                            {/* Contact prompt */}
                            <div className={cn(
                                "p-6 rounded-2xl mt-4",
                                "bg-white border border-neutral-100",
                                "shadow-card"
                            )}>
                                <p className="font-display font-bold text-base text-neutral-900 mb-1">
                                    Still have questions?
                                </p>
                                <p className="font-body text-sm text-neutral-500 mb-4">
                                    We&apos;re happy to answer anything before you commit.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        asChild
                                        variant="primary"
                                        size="sm"
                                        rounded="full"
                                        rightIcon={<ArrowRight size={13} />}
                                    >
                                        <Link href="/contact">Get in Touch</Link>
                                    </Button>
                                    <Button
                                        asChild
                                        variant="secondary"
                                        size="sm"
                                        rounded="full"
                                        leftIcon={<MessageCircle size={13} />}
                                    >
                                        <a
                                            href={waLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            WhatsApp Us
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Right — FAQ list */}
                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Bottom CTA ── */}
            <section className="relative bg-neutral-950 py-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand/8 rounded-full blur-[100px]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
                </div>

                <div className="relative z-10 container-gts text-center max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <SectionLabel variant="dark" align="center">
                            Ready to Start?
                        </SectionLabel>

                        <h2 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight text-balance">
                            Tell Us About Your{" "}
                            <span className="text-brand">Project</span>
                        </h2>

                        <p className="font-body text-neutral-400 leading-relaxed">
                            We&apos;ll review your requirements and get back to you with a
                            tailored proposal within 24 hours — no commitment required.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                asChild
                                variant="primary"
                                size="lg"
                                rounded="full"
                                rightIcon={<ArrowRight size={16} />}
                                className="shadow-brand-lg"
                            >
                                <Link href="/contact">Start a Project</Link>
                            </Button>

                            <Button
                                asChild
                                variant="glass"
                                size="lg"
                                rounded="full"
                            >
                                <Link href="/portfolio">View Our Work</Link>
                            </Button>
                        </div>

                        <p className="font-body text-xs text-neutral-600 flex items-center gap-1.5 mt-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            Free initial consultation · No commitment required
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </>
    );
}