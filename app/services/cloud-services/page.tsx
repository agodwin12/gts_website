"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Cloud Services Page
// ═══════════════════════════════════════════════════════════════

import React from "react";
import Link  from "next/link";
import { motion } from "framer-motion";
import {
    Cloud, CheckCircle2, ArrowRight,
    Server, Database, Lock, RefreshCw,
    Globe, Mail, GitBranch, MessageCircle,
    Cpu, HardDrive,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button }       from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { TechBadge }    from "@/components/ui/Badge";

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────

const cloudServices = [
    { icon: <Server     size={20} />, title: "VPS & Server Setup",      desc: "We configure, secure, and optimise your VPS from scratch — Nginx, SSL, firewall, and more." },
    { icon: <Cloud      size={20} />, title: "Cloud Deployment",        desc: "Deploy your applications to AWS, DigitalOcean, Hetzner, or Vercel with best practices." },
    { icon: <RefreshCw  size={20} />, title: "Cloud Migration",         desc: "Move your existing systems from local servers to the cloud with zero downtime." },
    { icon: <Database   size={20} />, title: "Database Hosting",        desc: "Managed PostgreSQL, MySQL, and MongoDB hosting with automated backups." },
    { icon: <HardDrive  size={20} />, title: "Backup Systems",          desc: "Automated daily backups with point-in-time recovery so your data is always safe." },
    { icon: <Globe      size={20} />, title: "Domain & DNS",            desc: "Domain registration, DNS configuration, and CDN setup for fast global delivery." },
    { icon: <Mail       size={20} />, title: "Email Hosting",           desc: "Professional email setup — yourname@yourdomain.com with spam filtering." },
    { icon: <GitBranch  size={20} />, title: "CI/CD Pipelines",         desc: "Automated deployment pipelines so code goes from GitHub to production instantly." },
    { icon: <Lock       size={20} />, title: "Security Hardening",      desc: "SSL certificates, firewall rules, fail2ban, and server hardening to protect your infrastructure." },
    { icon: <Cpu        size={20} />, title: "Performance Monitoring",  desc: "24/7 uptime monitoring with instant alerts when anything goes wrong." },
];

const packages = [
    {
        name:    "Basic Hosting",
        price:   "From 50,000 XAF/mo",
        desc:    "Managed hosting for small websites and apps.",
        color:   "border-neutral-200",
        features: [
            "1 VPS server managed",
            "SSL certificate",
            "Daily backups",
            "Domain & DNS setup",
            "Email hosting (5 accounts)",
            "Uptime monitoring",
            "Monthly report",
        ],
    },
    {
        name:    "Business Cloud",
        price:   "From 150,000 XAF/mo",
        desc:    "Full cloud management for growing businesses.",
        color:   "border-brand",
        popular: true,
        features: [
            "Up to 3 servers managed",
            "CI/CD pipeline setup",
            "Automated backups",
            "Database management",
            "Email hosting (20 accounts)",
            "Performance monitoring",
            "Security hardening",
            "Priority support",
            "Weekly reports",
        ],
    },
    {
        name:    "Enterprise",
        price:   "From 400,000 XAF/mo",
        desc:    "Full DevOps team for large scale infrastructure.",
        color:   "border-neutral-200",
        features: [
            "Unlimited servers managed",
            "Multi-region deployment",
            "Zero-downtime deploys",
            "Load balancing",
            "Advanced monitoring",
            "Disaster recovery plan",
            "Dedicated DevOps engineer",
            "24/7 emergency support",
            "Daily reports",
        ],
    },
];

const techStack = [
    "Docker", "Nginx", "Linux (Ubuntu)",
    "GitHub Actions", "AWS", "DigitalOcean",
    "Vercel", "Hetzner", "Certbot (SSL)",
    "PostgreSQL", "Redis", "Cloudflare",
];

const faqs = [
    { q: "What is a VPS and do I need one?", a: "A VPS (Virtual Private Server) is a dedicated server in the cloud for your website or app. You need one if shared hosting is too slow, you need more control, or your app requires a custom server environment." },
    { q: "Can you migrate my existing website to the cloud?", a: "Yes! We handle full cloud migrations — from local servers, cPanel hosting, or any other environment to a modern cloud setup with zero downtime." },
    { q: "What happens if my server goes down?", a: "We set up 24/7 uptime monitoring with instant alerts. For managed clients, we respond immediately and restore service as fast as possible." },
    { q: "Do you handle SSL certificates?", a: "Yes. We set up free Let's Encrypt SSL certificates on all servers we manage and auto-renew them so your site is always secure (HTTPS)." },
    { q: "Can you set up a professional email for my business?", a: "Yes. We set up professional email hosting so your team can use yourname@yourcompany.com with spam filtering and reliable delivery." },
];

const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello! I'm interested in Cloud Services from GTS.")}`;

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────

export default function CloudServicesPage() {
    return (
        <>
            <Navbar />

            {/* ── Hero ── */}
            <section className="relative bg-neutral-950 pt-24 pb-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px),linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                </div>

                <div className="relative z-10 container-gts">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0  }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-2 font-body text-xs text-neutral-500 mb-6">
                            <Link href="/"        className="hover:text-brand transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/services" className="hover:text-brand transition-colors">Services</Link>
                            <span>/</span>
                            <span className="text-cyan-400">Cloud Services</span>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 flex items-center justify-center text-cyan-400">
                                <Cloud size={28} />
                            </div>
                            <span className="font-body text-sm font-semibold text-cyan-400 uppercase tracking-widest">
                Cloud Services
              </span>
                        </div>

                        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance mb-6">
                            Reliable Cloud Infrastructure{" "}
                            <span className="text-cyan-400">You Can Trust</span>
                        </h1>

                        <p className="font-body text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
                            From VPS setup to full DevOps management — we handle your cloud infrastructure so you can focus on your business. Secure, fast, and always on.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}>
                                <Link href="/contact">Get a Quote</Link>
                            </Button>
                            <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}>
                                <a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/8">
                            {[
                                { value: "99.9%", label: "Uptime SLA" },
                                { value: "24/7",  label: "Monitoring" },
                                { value: "12+",   label: "Servers Managed" },
                                { value: "0",     label: "Data Loss Incidents" },
                            ].map(({ value, label }) => (
                                <div key={label}>
                                    <p className="font-display font-bold text-2xl text-white">{value}</p>
                                    <p className="font-body text-xs text-neutral-500">{label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Services ── */}
            <section className="section bg-white">
                <div className="container-gts">
                    <SectionHeader
                        label="What We Offer"
                        heading={<>Full-Stack <span className="gradient-text">Cloud Management</span></>}
                        subheading="Every cloud service your business needs — from setup to ongoing management."
                        className="mb-14"
                        headingClassName="text-3xl sm:text-4xl"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {cloudServices.map(({ icon, title, desc }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                                className={cn(
                                    "p-5 rounded-2xl bg-neutral-50 border border-neutral-100",
                                    "hover:border-cyan-200 hover:-translate-y-1",
                                    "transition-all duration-300 group"
                                )}
                            >
                                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-3 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-200">
                                    {icon}
                                </div>
                                <h3 className="font-display font-bold text-sm text-neutral-900 mb-1">{title}</h3>
                                <p className="font-body text-xs text-neutral-500 leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Packages ── */}
            <section className="section bg-neutral-50">
                <div className="container-gts">
                    <SectionHeader
                        label="Pricing"
                        heading={<>Cloud <span className="gradient-text">Packages</span></>}
                        subheading="Monthly managed cloud services. Cancel anytime."
                        align="center"
                        className="mb-14 max-w-2xl mx-auto"
                        headingClassName="text-3xl sm:text-4xl"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {packages.map(({ name, price, desc, color, popular, features: pkgFeatures }) => (
                            <div
                                key={name}
                                className={cn(
                                    "relative flex flex-col p-6 rounded-2xl bg-white border-2",
                                    color,
                                    popular && "shadow-brand"
                                )}
                            >
                                {popular && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand text-white font-body text-xs font-bold">
                    Most Popular
                  </span>
                                )}
                                <h3 className="font-display font-bold text-xl text-neutral-900 mb-1">{name}</h3>
                                <p className="font-display font-bold text-2xl text-brand mb-2">{price}</p>
                                <p className="font-body text-sm text-neutral-500 mb-5">{desc}</p>
                                <ul className="space-y-2.5 flex-1 mb-6">
                                    {pkgFeatures.map((f) => (
                                        <li key={f} className="flex items-center gap-2 font-body text-sm text-neutral-700">
                                            <CheckCircle2 size={14} className="text-brand shrink-0" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild variant={popular ? "primary" : "secondary"} size="md" fullWidth rounded="full">
                                    <Link href="/contact">Get Started</Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Tech Stack ── */}
            <section className="section bg-white">
                <div className="container-gts text-center">
                    <SectionHeader
                        label="Technology"
                        heading={<>Our <span className="gradient-text">Cloud Stack</span></>}
                        align="center"
                        className="mb-10 max-w-2xl mx-auto"
                        headingClassName="text-3xl sm:text-4xl"
                    />
                    <div className="flex flex-wrap justify-center gap-3">
                        {techStack.map((tech) => <TechBadge key={tech} name={tech} size="lg" />)}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="section bg-neutral-50">
                <div className="container-gts max-w-3xl mx-auto">
                    <SectionHeader
                        label="FAQ"
                        heading={<>Cloud <span className="gradient-text">Questions</span></>}
                        className="mb-10"
                        headingClassName="text-3xl sm:text-4xl"
                    />
                    <div className="space-y-4">
                        {faqs.map(({ q, a }) => (
                            <div key={q} className="p-6 rounded-2xl bg-white border border-neutral-100">
                                <h3 className="font-display font-semibold text-base text-neutral-900 mb-2 flex items-start gap-2">
                                    <span className="text-brand shrink-0 mt-0.5">Q.</span>{q}
                                </h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed pl-5">{a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="relative bg-neutral-950 py-20 overflow-hidden">
                <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 container-gts text-center max-w-2xl mx-auto">
                    <h2 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight mb-4">
                        Ready to Move to the <span className="text-cyan-400">Cloud?</span>
                    </h2>
                    <p className="font-body text-neutral-400 mb-8">Free consultation · Custom quote within 24 hours · Migration handled by our team.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}>
                            <Link href="/contact">Get a Quote</Link>
                        </Button>
                        <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}>
                            <a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}