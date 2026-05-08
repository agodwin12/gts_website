"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — About Us Page
//   Company story · Values · Philosophy · Services overview
// ═══════════════════════════════════════════════════════════════

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Zap, Code2, Globe2, Users, Lightbulb,
    Shield, Rocket, HeartHandshake, ArrowRight,
    CheckCircle2, Star, Trophy, Calendar,
    BrainCircuit, Cloud, Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig, stats } from "@/lib/config";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button }       from "@/components/ui/Button";
import { SectionLabel, SectionHeader } from "@/components/ui/SectionLabel";

// ─────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { duration: 0.5 } },
};

const stagger = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.1 } },
};

// ─────────────────────────────────────────
// CORE VALUES
// ─────────────────────────────────────────

const values = [
    {
        icon:        <Zap size={20} />,
        title:       "Technical Precision",
        description: "Every line of code, every system decision, and every deployment is made with deliberate care. We don't cut corners.",
        color:       "text-amber-500",
        bg:          "bg-amber-500/10",
    },
    {
        icon:        <Lightbulb size={20} />,
        title:       "Creative Thinking",
        description: "We approach every problem with fresh eyes. Great technology is born where engineering meets imagination.",
        color:       "text-violet-500",
        bg:          "bg-violet-500/10",
    },
    {
        icon:        <Users size={20} />,
        title:       "Client Partnership",
        description: "We don't just deliver and disappear. We become invested in your success — before, during, and after launch.",
        color:       "text-blue-500",
        bg:          "bg-blue-500/10",
    },
    {
        icon:        <Shield size={20} />,
        title:       "Built to Last",
        description: "Security, scalability, and performance are baked in from day one — not bolted on as an afterthought.",
        color:       "text-green-500",
        bg:          "bg-green-500/10",
    },
    {
        icon:        <Globe2 size={20} />,
        title:       "African Excellence",
        description: "We build world-class technology rooted in the African context — understanding local markets, languages, and payment systems.",
        color:       "text-brand",
        bg:          "bg-brand/10",
    },
    {
        icon:        <HeartHandshake size={20} />,
        title:       "Real Impact",
        description: "We measure success by the growth our clients achieve — not just by shipped features or closed tickets.",
        color:       "text-red-500",
        bg:          "bg-red-500/10",
    },
];

// ─────────────────────────────────────────
// EXPERTISE AREAS
// ─────────────────────────────────────────

const expertise = [
    { icon: <Code2        size={18} />, label: "Full Stack Web Development"  },
    { icon: <Smartphone   size={18} />, label: "Mobile App Development"      },
    { icon: <Cloud        size={18} />, label: "Cloud Systems & DevOps"      },
    { icon: <BrainCircuit size={18} />, label: "AI & Automation Integration" },
    { icon: <Globe2       size={18} />, label: "UI/UX Design"                },
    { icon: <Shield       size={18} />, label: "Digital Infrastructure"      },
];

// ─────────────────────────────────────────
// MILESTONE TIMELINE
// ─────────────────────────────────────────

const milestones = [
    {
        year:  "2020",
        title: "Founded",
        body:  "GTS was founded in Douala, Cameroon with a vision to deliver world-class technology solutions from Africa.",
    },
    {
        year:  "2021",
        title: "First Enterprise Client",
        body:  "Delivered our first large-scale enterprise platform — a school management system serving 1,000+ students.",
    },
    {
        year:  "2022",
        title: "Mobile & Cloud Expansion",
        body:  "Expanded into mobile app development and cloud services, building our first React Native and Docker-deployed products.",
    },
    {
        year:  "2023",
        title: "Fintech & AI",
        body:  "Integrated Mobile Money APIs and launched our first AI-powered automation tools for Cameroonian businesses.",
    },
    {
        year:  "2024",
        title: "100+ Projects",
        body:  "Crossed the 100-project milestone, serving clients across Cameroon, Central Africa, and Europe.",
    },
    {
        year:  "2025+",
        title: "Engineering the Future",
        body:  "Continuing to grow — building the next generation of digital infrastructure for African businesses.",
    },
];

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────

export default function AboutPage() {
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
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
                </div>

                <div className="relative z-10 container-gts">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto"
                    >
                        <motion.div variants={fadeIn}>
                            <SectionLabel variant="dark" align="center">
                                About Godwin Tech Solutions
                            </SectionLabel>
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance"
                        >
                            Technology That{" "}
                            <span className="text-brand">Feels Futuristic</span>,{" "}
                            Solves{" "}
                            <span className="gradient-text-white">Today&apos;s Problems</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="font-body text-lg text-neutral-400 leading-relaxed max-w-2xl"
                        >
                            At GTS, technology isn&apos;t just code on a screen. It&apos;s architecture,
                            strategy, design, automation, and problem-solving woven into one
                            digital engine.{" "}
                            <span className="text-brand font-medium">⚡</span>
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                            <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}>
                                <Link href="/contact">Work With Us</Link>
                            </Button>
                            <Button asChild variant="glass" size="lg" rounded="full">
                                <Link href="/portfolio">Our Work</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── Company Story ── */}
            <section className="section bg-white">
                <div className="container-gts">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left — story text */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col gap-6"
                        >
                            <SectionHeader
                                label="Our Story"
                                heading="Built to Help Businesses Transform"
                                headingClassName="text-3xl sm:text-4xl"
                            />

                            <div className="space-y-4">
                                {[
                                    `Founded by Awah Wilbroad Nde a passionate full stack developer and IT consultant with experience across web development, cloud systems, mobile applications, AI integrations, UI/UX design, and digital infrastructure, Godwin Tech Solutions was built to help businesses transform ideas into scalable digital products and marketed by Djousse Chimelle.`,
                                    `We specialize in creating modern websites, powerful web applications, mobile apps, cloud-powered systems, and intelligent business solutions that combine performance with clean user experience. From startups looking for their first online presence to businesses ready to automate operations and scale, GTS delivers technology that works beautifully and performs reliably.`,
                                    `Our approach blends technical precision with creative thinking. Every project is crafted with attention to speed, security, responsiveness, scalability, and modern design standards.`,
                                ].map((para, i) => (
                                    <p key={i} className="font-body text-base text-neutral-600 leading-relaxed">
                                        {para}
                                    </p>
                                ))}
                            </div>

                            {/* Expertise tags */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {expertise.map(({ icon, label }) => (
                                    <span
                                        key={label}
                                        className={cn(
                                            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
                                            "bg-neutral-50 border border-neutral-200",
                                            "font-body text-sm text-neutral-700",
                                            "hover:border-brand/40 hover:text-brand hover:bg-brand/5",
                                            "transition-all duration-200"
                                        )}
                                    >
                    <span className="text-brand">{icon}</span>
                                        {label}
                  </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right — stats + founder note */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col gap-6"
                        >
                            {/* Stat cards */}
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map(({ value, suffix, label, description }) => (
                                    <div
                                        key={label}
                                        className={cn(
                                            "p-5 rounded-2xl",
                                            "bg-neutral-50 border border-neutral-100",
                                            "hover:border-brand/20 hover:shadow-brand-sm",
                                            "transition-all duration-300"
                                        )}
                                    >
                                        <p className="font-display font-bold text-3xl text-neutral-900">
                                            {value}{suffix}
                                        </p>
                                        <p className="font-display font-semibold text-sm text-neutral-700 mt-1">
                                            {label}
                                        </p>
                                        {description && (
                                            <p className="font-body text-xs text-neutral-400 mt-0.5 leading-snug">
                                                {description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Founder philosophy card */}
                            <div
                                className={cn(
                                    "relative p-6 rounded-2xl overflow-hidden",
                                    "bg-gradient-to-br from-neutral-900 to-neutral-800",
                                    "border border-white/5"
                                )}
                            >
                                <div
                                    aria-hidden="true"
                                    className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-[40px]"
                                />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl",
                                            "bg-brand text-white",
                                            "flex items-center justify-center",
                                            "font-display font-bold text-base",
                                            "shadow-brand"
                                        )}>
                                            G
                                        </div>
                                        <div>
                                            <p className="font-display font-bold text-sm text-white">
                                                Godwin — Founder & CTO
                                            </p>
                                            <p className="font-body text-xs text-neutral-400">
                                                Full Stack Developer & IT Consultant
                                            </p>
                                        </div>
                                    </div>
                                    <blockquote>
                                        <p className="font-body text-sm text-neutral-300 leading-relaxed italic">
                                            &ldquo;We don&apos;t just develop software. We engineer digital
                                            experiences that help businesses grow, compete, and lead
                                            in a rapidly evolving world.&rdquo;
                                        </p>
                                    </blockquote>
                                </div>
                            </div>

                            {/* Founded badge */}
                            <div className="flex items-center gap-3 px-1">
                                <Calendar size={14} className="text-brand shrink-0" />
                                <p className="font-body text-sm text-neutral-500">
                                    Founded in{" "}
                                    <span className="font-semibold text-neutral-900">{siteConfig.foundedYear}</span>
                                    {" "}· Based in{" "}
                                    <span className="font-semibold text-neutral-900">{siteConfig.location}</span>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Philosophy banner ── */}
            <section className="relative bg-neutral-950 py-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-20"
                         style={{
                             backgroundImage: `linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px),linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)`,
                             backgroundSize: "64px 64px",
                         }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-brand/8 rounded-full blur-[80px]" />
                </div>

                <div className="relative z-10 container-gts text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <SectionLabel variant="dark" align="center">
                            Our Philosophy
                        </SectionLabel>

                        <h2 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance">
                            Build technology that feels{" "}
                            <span className="text-brand">futuristic</span>,
                            but solves{" "}
                            <span className="gradient-text-white">today&apos;s problems</span>.
                        </h2>

                        <p className="font-body text-lg text-neutral-400 leading-relaxed">
                            Whether it&apos;s developing enterprise software, deploying cloud
                            infrastructure, integrating AI systems, or consulting on digital
                            transformation — we focus on solutions that create real business impact.
                        </p>

                        {[
                            "We don't just develop software.",
                            "We engineer digital experiences.",
                        ].map((line) => (
                            <p key={line} className="font-display font-semibold text-xl text-white/90">
                                {line}
                            </p>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Core Values ── */}
            <section className="section bg-neutral-50/60">
                <div className="container-gts">
                    <SectionHeader
                        label="What Drives Us"
                        heading={<>Our Core <span className="gradient-text">Values</span></>}
                        subheading="The principles that guide every project, every decision, and every line of code we write."
                        align="center"
                        className="mb-14 max-w-2xl mx-auto"
                        headingClassName="text-3xl sm:text-4xl"
                    />

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {values.map(({ icon, title, description, color, bg }) => (
                            <motion.div
                                key={title}
                                variants={fadeUp}
                                className={cn(
                                    "p-6 rounded-2xl bg-white",
                                    "border border-neutral-100",
                                    "shadow-card hover:shadow-card-hover",
                                    "hover:-translate-y-1 hover:border-brand/20",
                                    "transition-all duration-300 group"
                                )}
                            >
                                <div className={cn(
                                    "w-11 h-11 rounded-xl mb-4",
                                    "flex items-center justify-center",
                                    bg, color,
                                    "group-hover:scale-110 transition-transform duration-200"
                                )}>
                                    {icon}
                                </div>
                                <h3 className="font-display font-bold text-lg text-neutral-900 mb-2">
                                    {title}
                                </h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed">
                                    {description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Timeline ── */}
            <section className="section bg-white">
                <div className="container-gts">
                    <SectionHeader
                        label="Our Journey"
                        heading={<>From Idea to <span className="gradient-text">Impact</span></>}
                        subheading="The key milestones that shaped Godwin Tech Solutions into what it is today."
                        className="mb-14"
                        headingClassName="text-3xl sm:text-4xl"
                    />

                    <div className="relative">
                        {/* Vertical line */}
                        <div
                            aria-hidden="true"
                            className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand/40 via-brand/20 to-transparent"
                        />

                        <div className="space-y-10">
                            {milestones.map(({ year, title, body }, i) => {
                                const isEven = i % 2 === 0;
                                return (
                                    <motion.div
                                        key={year}
                                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ duration: 0.5, delay: i * 0.08 }}
                                        className={cn(
                                            "relative flex items-start gap-6",
                                            "lg:grid lg:grid-cols-2 lg:gap-12"
                                        )}
                                    >
                                        {/* Dot */}
                                        <div
                                            aria-hidden="true"
                                            className={cn(
                                                "absolute left-4 lg:left-1/2 top-3",
                                                "w-4 h-4 rounded-full",
                                                "bg-brand border-2 border-white shadow-brand-sm",
                                                "lg:-translate-x-1/2 -translate-x-1/2"
                                            )}
                                        />

                                        {/* Left content (even) or spacer (odd) */}
                                        <div className={cn(
                                            "pl-12 lg:pl-0",
                                            isEven ? "lg:text-right" : "lg:col-start-2"
                                        )}>
                                            {isEven && (
                                                <div className={cn(
                                                    "p-5 rounded-2xl bg-neutral-50",
                                                    "border border-neutral-100",
                                                    "hover:border-brand/20 transition-colors"
                                                )}>
                          <span className="font-mono text-xs text-brand font-bold tracking-widest">
                            {year}
                          </span>
                                                    <h3 className="font-display font-bold text-lg text-neutral-900 mt-1 mb-1.5">
                                                        {title}
                                                    </h3>
                                                    <p className="font-body text-sm text-neutral-500 leading-relaxed">
                                                        {body}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right content (odd) or spacer (even) */}
                                        <div className={cn(
                                            "pl-12 lg:pl-0",
                                            !isEven ? "" : "hidden lg:block"
                                        )}>
                                            {!isEven && (
                                                <div className={cn(
                                                    "p-5 rounded-2xl bg-neutral-50",
                                                    "border border-neutral-100",
                                                    "hover:border-brand/20 transition-colors"
                                                )}>
                          <span className="font-mono text-xs text-brand font-bold tracking-widest">
                            {year}
                          </span>
                                                    <h3 className="font-display font-bold text-lg text-neutral-900 mt-1 mb-1.5">
                                                        {title}
                                                    </h3>
                                                    <p className="font-body text-sm text-neutral-500 leading-relaxed">
                                                        {body}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Why Choose GTS ── */}
            <section className="section bg-neutral-50/60">
                <div className="container-gts">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <SectionHeader
                                label="Why GTS"
                                heading={<>Why Businesses <span className="gradient-text">Choose Us</span></>}
                                subheading="We're not just a vendor — we're a technology partner invested in your long-term success."
                                headingClassName="text-3xl sm:text-4xl"
                            />
                        </motion.div>

                        <motion.ul
                            variants={stagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            {[
                                { icon: <Rocket       size={16} />, title: "Speed Without Compromise",      body: "We move fast without sacrificing quality. Agile delivery with weekly check-ins and transparent progress." },
                                { icon: <Trophy       size={16} />, title: "Proven Track Record",           body: "150+ delivered projects across web, mobile, cloud, and enterprise — with a 5★ average client rating." },
                                { icon: <Star         size={16} />, title: "Modern Tech Stack",             body: "Next.js, React Native, PostgreSQL, Docker, OpenAI — we use tools that scale with your business." },
                                { icon: <Globe2       size={16} />, title: "African Market Expertise",      body: "Deep understanding of Mobile Money, local regulations, language contexts, and African business realities." },
                                { icon: <CheckCircle2 size={16} />, title: "Fixed-Price Transparency",     body: "No surprise invoices. Clear scope, agreed price, and full accountability throughout the project." },
                                { icon: <HeartHandshake size={16}/>, title: "Post-Launch Partnership",     body: "30-day support after every launch, plus ongoing maintenance and scaling support as you grow." },
                            ].map(({ icon, title, body }) => (
                                <motion.li
                                    key={title}
                                    variants={fadeUp}
                                    className={cn(
                                        "flex items-start gap-4 p-4 rounded-2xl",
                                        "bg-white border border-neutral-100",
                                        "hover:border-brand/20 hover:shadow-brand-sm",
                                        "transition-all duration-200 group"
                                    )}
                                >
                  <span className={cn(
                      "w-8 h-8 rounded-lg shrink-0 mt-0.5",
                      "flex items-center justify-center",
                      "bg-brand/8 text-brand",
                      "group-hover:bg-brand group-hover:text-white",
                      "transition-all duration-200"
                  )}>
                    {icon}
                  </span>
                                    <div>
                                        <p className="font-display font-bold text-sm text-neutral-900 mb-0.5">
                                            {title}
                                        </p>
                                        <p className="font-body text-sm text-neutral-500 leading-relaxed">
                                            {body}
                                        </p>
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="relative bg-neutral-950 py-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-brand/8 rounded-full blur-[80px]" />
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
                            Ready to Build?
                        </SectionLabel>
                        <h2 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight text-balance">
                            Let&apos;s Engineer Your{" "}
                            <span className="text-brand">Digital Future</span>
                        </h2>
                        <p className="font-body text-neutral-400 leading-relaxed">
                            Whether you have a detailed brief or just a rough idea — we&apos;re
                            ready to help turn it into a real, working product.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}>
                                <Link href="/contact">Start a Project</Link>
                            </Button>
                            <Button asChild variant="glass" size="lg" rounded="full">
                                <Link href="/portfolio">View Our Work</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </>
    );
}