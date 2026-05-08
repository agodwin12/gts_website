"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Web Development Service Page
// ═══════════════════════════════════════════════════════════════

import React from "react";
import Link  from "next/link";
import { motion } from "framer-motion";
import {
    Globe, CheckCircle2, ArrowRight,
    Zap, Shield, Smartphone, Search,
    ShoppingBag, LayoutDashboard, BookOpen,
    MessageCircle, Star, Clock, Users,
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

const features = [
    { icon: <Globe       size={20} />, title: "Corporate Websites",       desc: "Professional, fast, and SEO-optimised websites that represent your brand online 24/7." },
    { icon: <ShoppingBag size={20} />, title: "E-Commerce Platforms",     desc: "Full online stores with Mobile Money, card payments, and inventory management." },
    { icon: <LayoutDashboard size={20}/>, title: "Web Applications",      desc: "Complex SaaS platforms, dashboards, booking systems, and membership portals." },
    { icon: <Smartphone  size={20} />, title: "Progressive Web Apps",     desc: "Apps that work offline and install on phones — no App Store required." },
    { icon: <BookOpen    size={20} />, title: "CMS Integrations",         desc: "Manage your own content easily with Sanity, Strapi, or WordPress CMS." },
    { icon: <Search      size={20} />, title: "SEO-Optimised",            desc: "Built with technical SEO from day one so Google finds and ranks your site." },
    { icon: <Shield      size={20} />, title: "Secure & Reliable",        desc: "SSL, security headers, protected routes, and regular security audits." },
    { icon: <Zap        size={20} />,  title: "Blazing Fast",             desc: "Optimised for speed — 90+ Lighthouse scores, lazy loading, and CDN delivery." },
];

const packages = [
    {
        name:     "Starter",
        price:    "From 150,000 XAF",
        desc:     "Perfect for individuals, freelancers, and small businesses getting online.",
        color:    "border-neutral-200",
        features: [
            "Up to 5 pages",
            "Mobile responsive design",
            "Contact form",
            "Basic SEO setup",
            "1 month support",
            "Delivery in 1–2 weeks",
        ],
    },
    {
        name:     "Business",
        price:    "From 400,000 XAF",
        desc:     "For growing businesses that need a professional online presence.",
        color:    "border-brand",
        popular:  true,
        features: [
            "Up to 15 pages",
            "Custom UI/UX design",
            "CMS integration",
            "Advanced SEO",
            "Analytics setup",
            "WhatsApp integration",
            "3 months support",
            "Delivery in 2–4 weeks",
        ],
    },
    {
        name:     "Enterprise",
        price:    "From 1,000,000 XAF",
        desc:     "For businesses needing complex web applications and platforms.",
        color:    "border-neutral-200",
        features: [
            "Unlimited pages",
            "Custom web application",
            "User authentication",
            "Database & API",
            "Payment integration",
            "Admin dashboard",
            "6 months support",
            "Delivery in 4–12 weeks",
        ],
    },
];

const techStack = [
    "Next.js", "React", "TypeScript", "Tailwind CSS",
    "Node.js", "PostgreSQL", "Prisma", "Vercel",
    "Cloudinary", "Stripe", "MTN MoMo API",
];

const faqs = [
    { q: "Do you build WordPress sites?", a: "Yes, we can build on WordPress if you prefer it. However, we specialise in modern frameworks like Next.js which are faster, more secure, and more scalable." },
    { q: "Will my website work on mobile phones?", a: "Absolutely. Every website we build is fully responsive and tested on all screen sizes — from small Android phones to large desktop monitors." },
    { q: "Can I update the content myself?", a: "Yes! We integrate a CMS (Content Management System) so you can easily update text, images, and pages without touching any code." },
    { q: "Do you host the website after building it?", a: "Yes. We offer hosting management as part of our Cloud Services. We handle domain, SSL, server, and uptime monitoring." },
    { q: "How long does it take to build my website?", a: "A simple website takes 1–2 weeks. A business site takes 2–4 weeks. A complex web application can take 4–12 weeks depending on features." },
];

const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello! I'm interested in Web Development services from GTS.")}`;

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────

export default function WebDevelopmentPage() {
    return (
        <>
            <Navbar />

            {/* ── Hero ── */}
            <section className="relative bg-neutral-950 pt-24 pb-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-sky-500/8 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(14,165,233,0.05) 1px, transparent 1px),linear-gradient(90deg, rgba(14,165,233,0.05) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                </div>

                <div className="relative z-10 container-gts">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0  }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 font-body text-xs text-neutral-500 mb-6">
                            <Link href="/"        className="hover:text-brand transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/services" className="hover:text-brand transition-colors">Services</Link>
                            <span>/</span>
                            <span className="text-brand">Web Development</span>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-sky-500/15 flex items-center justify-center text-sky-400">
                                <Globe size={28} />
                            </div>
                            <span className="font-body text-sm font-semibold text-sky-400 uppercase tracking-widest">
                Web Development
              </span>
                        </div>

                        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance mb-6">
                            Websites & Web Apps That{" "}
                            <span className="text-sky-400">Drive Results</span>
                        </h1>

                        <p className="font-body text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
                            From simple landing pages to complex SaaS platforms — we build fast, secure, and beautiful web experiences that turn visitors into clients.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}>
                                <Link href="/contact">Start Your Project</Link>
                            </Button>
                            <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}>
                                <a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/8">
                            {[
                                { value: "50+",  label: "Websites Delivered" },
                                { value: "2–4",  label: "Weeks Average" },
                                { value: "90+",  label: "Lighthouse Score" },
                                { value: "100%", label: "Mobile Responsive" },
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

            {/* ── Features ── */}
            <section className="section bg-white">
                <div className="container-gts">
                    <SectionHeader
                        label="What We Build"
                        heading={<>Everything You Need <span className="gradient-text">Online</span></>}
                        subheading="Whether you need a simple site or a complex platform, we have the expertise to deliver it."
                        className="mb-14"
                        headingClassName="text-3xl sm:text-4xl"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map(({ icon, title, desc }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.07 }}
                                className={cn(
                                    "p-6 rounded-2xl bg-neutral-50 border border-neutral-100",
                                    "hover:border-brand/20 hover:shadow-brand-sm hover:-translate-y-1",
                                    "transition-all duration-300 group"
                                )}
                            >
                                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-4 group-hover:bg-sky-500 group-hover:text-white transition-all duration-200">
                                    {icon}
                                </div>
                                <h3 className="font-display font-bold text-base text-neutral-900 mb-2">{title}</h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed">{desc}</p>
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
                        heading={<>Simple, <span className="gradient-text">Transparent Pricing</span></>}
                        subheading="Choose a package that fits your needs. All prices in XAF. Custom quotes available."
                        align="center"
                        className="mb-14 max-w-2xl mx-auto"
                        headingClassName="text-3xl sm:text-4xl"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {packages.map(({ name, price, desc, color, popular, features: pkgFeatures }) => (
                            <motion.div
                                key={name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
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
                                <div className="mb-5">
                                    <h3 className="font-display font-bold text-xl text-neutral-900 mb-1">{name}</h3>
                                    <p className="font-display font-bold text-2xl text-brand mb-2">{price}</p>
                                    <p className="font-body text-sm text-neutral-500">{desc}</p>
                                </div>
                                <ul className="space-y-2.5 flex-1 mb-6">
                                    {pkgFeatures.map((f) => (
                                        <li key={f} className="flex items-center gap-2 font-body text-sm text-neutral-700">
                                            <CheckCircle2 size={14} className="text-brand shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild variant={popular ? "primary" : "secondary"} size="md" fullWidth rounded="full">
                                    <Link href="/contact">Get Started</Link>
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Tech Stack ── */}
            <section className="section bg-white">
                <div className="container-gts">
                    <SectionHeader
                        label="Technology"
                        heading={<>Built With <span className="gradient-text">Modern Tech</span></>}
                        subheading="We use the latest, most reliable technologies to build your web presence."
                        align="center"
                        className="mb-10 max-w-2xl mx-auto"
                        headingClassName="text-3xl sm:text-4xl"
                    />
                    <div className="flex flex-wrap justify-center gap-3">
                        {techStack.map((tech) => (
                            <TechBadge key={tech} name={tech} size="lg" />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="section bg-neutral-50">
                <div className="container-gts max-w-3xl mx-auto">
                    <SectionHeader
                        label="FAQ"
                        heading={<>Common <span className="gradient-text">Questions</span></>}
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
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand/8 rounded-full blur-[100px]" />
                </div>
                <div className="relative z-10 container-gts text-center max-w-2xl mx-auto">
                    <h2 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight mb-4">
                        Ready to Build Your <span className="text-brand">Website?</span>
                    </h2>
                    <p className="font-body text-neutral-400 mb-8">
                        Get a free consultation and custom quote within 24 hours.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}>
                            <Link href="/contact">Start a Project</Link>
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