"use client";

import React from "react";
import Link  from "next/link";
import { motion } from "framer-motion";
import { Palette, CheckCircle2, ArrowRight, Layers, MousePointer2, Smartphone, LayoutDashboard, Figma, Eye, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button }        from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { TechBadge }     from "@/components/ui/Badge";

const features = [
    { icon: <Palette       size={20}/>, title: "UI Design",             desc: "Pixel-perfect, modern interfaces that reflect your brand and delight your users." },
    { icon: <Smartphone    size={20}/>, title: "Mobile App UI/UX",      desc: "Intuitive mobile interfaces optimised for touch interactions and small screens." },
    { icon: <LayoutDashboard size={20}/>, title: "Dashboard Design",   desc: "Clean, data-rich dashboards that make complex information easy to understand." },
    { icon: <MousePointer2 size={20}/>, title: "Wireframing",           desc: "Low and high-fidelity wireframes that map out the user journey before development." },
    { icon: <Figma         size={20}/>, title: "Interactive Prototypes",desc: "Clickable Figma prototypes so you can test and feel the product before building it." },
    { icon: <Layers        size={20}/>, title: "Design Systems",        desc: "Reusable component libraries that keep your product consistent at any scale." },
    { icon: <Eye           size={20}/>, title: "UX Research",           desc: "User interviews, usability testing, and data-driven decisions to improve conversion." },
    { icon: <Palette       size={20}/>, title: "Brand-Consistent UI",   desc: "Every screen respects your brand colours, typography, and visual identity." },
];

const packages = [
    {
        name: "UI Design", price: "From 200,000 XAF",
        desc: "Professional design for a specific screen or feature set.",
        color: "border-neutral-200", popular: false,
        features: ["Up to 8 screens", "Mobile + desktop", "Figma source files", "2 revision rounds", "Design handoff", "Delivery in 1–2 weeks"],
    },
    {
        name: "Full Product Design", price: "From 600,000 XAF",
        desc: "Complete UI/UX for a web app or mobile app.",
        color: "border-brand", popular: true,
        features: ["Unlimited screens", "Wireframes + UI design", "Interactive prototype", "Design system", "User flow diagrams", "Developer handoff package", "Unlimited revisions", "Delivery in 3–5 weeks"],
    },
    {
        name: "Design System", price: "From 400,000 XAF",
        desc: "A complete component library for your product team.",
        color: "border-neutral-200", popular: false,
        features: ["Full component library", "Typography system", "Colour palette", "Icon set", "Spacing & grid guide", "Documentation", "Figma + code tokens"],
    },
];

const techStack = ["Figma", "FigJam", "Adobe Illustrator", "Adobe Photoshop", "Maze (Testing)", "Lottie Animations"];

const faqs = [
    { q: "Do I get the Figma source files?", a: "Yes. All design packages include full Figma source files so you own the design and can make future updates yourself or with any designer." },
    { q: "How many revisions do I get?", a: "Our Full Product Design and Design System packages include unlimited revisions until you're 100% happy. Basic UI includes 2 revision rounds." },
    { q: "Can you design for both mobile and desktop?", a: "Yes. We design responsive layouts that adapt beautifully from mobile phones to large desktop screens." },
    { q: "What is a design system and do I need one?", a: "A design system is a library of reusable UI components (buttons, cards, inputs) with defined rules. You need one if you have a growing product team or want consistency across your app." },
    { q: "Can GTS build what you design?", a: "Yes! We're a full-service agency. We design AND develop. This means the handoff from design to code is seamless — the same team does both." },
];

const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello! I'm interested in UI/UX Design services from GTS.")}`;

export default function UIUXDesignPage() {
    return (
        <>
            <Navbar />

            <section className="relative bg-neutral-950 pt-24 pb-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-pink-500/8 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(236,72,153,0.05) 1px, transparent 1px),linear-gradient(90deg, rgba(236,72,153,0.05) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="relative z-10 container-gts">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
                        <div className="flex items-center gap-2 font-body text-xs text-neutral-500 mb-6">
                            <Link href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
                            <Link href="/services" className="hover:text-brand transition-colors">Services</Link><span>/</span>
                            <span className="text-pink-400">UI/UX Design</span>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-pink-500/15 flex items-center justify-center text-pink-400"><Palette size={28} /></div>
                            <span className="font-body text-sm font-semibold text-pink-400 uppercase tracking-widest">UI/UX Design</span>
                        </div>
                        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance mb-6">
                            Interfaces That <span className="text-pink-400">Convert & Delight</span>
                        </h1>
                        <p className="font-body text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
                            Beautiful, intuitive designs that turn visitors into customers. We combine aesthetics with user psychology to create digital experiences people love.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Start Your Design</Link></Button>
                            <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                        </div>
                        <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/8">
                            {[{ value: "40+", label: "Products Designed" }, { value: "94/100", label: "Avg Usability Score" }, { value: "100%", label: "Figma Files Delivered" }, { value: "∞", label: "Revisions Included" }].map(({ value, label }) => (
                                <div key={label}><p className="font-display font-bold text-2xl text-white">{value}</p><p className="font-body text-xs text-neutral-500">{label}</p></div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container-gts">
                    <SectionHeader label="What We Design" heading={<>Every Screen, <span className="gradient-text">Perfectly Crafted</span></>} subheading="From wireframes to final pixel-perfect designs — we cover the full design process." className="mb-14" headingClassName="text-3xl sm:text-4xl" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map(({ icon, title, desc }, i) => (
                            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                                        className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-pink-200 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center mb-4 group-hover:bg-pink-500 group-hover:text-white transition-all duration-200">{icon}</div>
                                <h3 className="font-display font-bold text-base text-neutral-900 mb-2">{title}</h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts">
                    <SectionHeader label="Pricing" heading={<>Design <span className="gradient-text">Packages</span></>} subheading="Transparent pricing in XAF. All packages include Figma source files." align="center" className="mb-14 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {packages.map(({ name, price, desc, color, popular, features: f }) => (
                            <div key={name} className={cn("relative flex flex-col p-6 rounded-2xl bg-white border-2", color, popular && "shadow-brand")}>
                                {popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand text-white font-body text-xs font-bold">Most Popular</span>}
                                <h3 className="font-display font-bold text-xl text-neutral-900 mb-1">{name}</h3>
                                <p className="font-display font-bold text-2xl text-brand mb-2">{price}</p>
                                <p className="font-body text-sm text-neutral-500 mb-5">{desc}</p>
                                <ul className="space-y-2.5 flex-1 mb-6">{f.map((item) => (<li key={item} className="flex items-center gap-2 font-body text-sm text-neutral-700"><CheckCircle2 size={14} className="text-brand shrink-0" />{item}</li>))}</ul>
                                <Button asChild variant={popular ? "primary" : "secondary"} size="md" fullWidth rounded="full"><Link href="/contact">Get Started</Link></Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container-gts text-center">
                    <SectionHeader label="Tools" heading={<>Our <span className="gradient-text">Design Tools</span></>} align="center" className="mb-10 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
                    <div className="flex flex-wrap justify-center gap-3">{techStack.map((t) => <TechBadge key={t} name={t} size="lg" />)}</div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts max-w-3xl mx-auto">
                    <SectionHeader label="FAQ" heading={<>Design <span className="gradient-text">Questions</span></>} className="mb-10" headingClassName="text-3xl sm:text-4xl" />
                    <div className="space-y-4">
                        {faqs.map(({ q, a }) => (
                            <div key={q} className="p-6 rounded-2xl bg-white border border-neutral-100">
                                <h3 className="font-display font-semibold text-base text-neutral-900 mb-2 flex items-start gap-2"><span className="text-brand shrink-0 mt-0.5">Q.</span>{q}</h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed pl-5">{a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative bg-neutral-950 py-20 overflow-hidden">
                <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-pink-500/8 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 container-gts text-center max-w-2xl mx-auto">
                    <h2 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight mb-4">Ready to <span className="text-pink-400">Design Something Beautiful?</span></h2>
                    <p className="font-body text-neutral-400 mb-8">Free consultation · Figma files delivered · Unlimited revisions on full packages.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Start Your Design</Link></Button>
                        <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}