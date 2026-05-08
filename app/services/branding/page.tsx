"use client";

import React from "react";
import Link  from "next/link";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight, Pen, Image, Layout, Presentation, Package, Palette, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button }        from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { TechBadge }     from "@/components/ui/Badge";

const features = [
    { icon: <Sparkles    size={20}/>, title: "Logo Design",             desc: "3 unique concept directions, refined to a final logo that captures your brand's identity." },
    { icon: <Palette     size={20}/>, title: "Brand Identity",          desc: "Complete visual identity — colours, typography, logo variations, and usage guidelines." },
    { icon: <Image       size={20}/>, title: "Marketing Flyers",        desc: "Print and digital flyers, posters, and banners for promotions, events, and campaigns." },
    { icon: <Layout      size={20}/>, title: "Social Media Kits",       desc: "Branded templates for Instagram, Facebook, LinkedIn, and TikTok posts and stories." },
    { icon: <Presentation size={20}/>, title: "Presentation Design",   desc: "Professional PowerPoint and Google Slides decks for pitches, reports, and proposals." },
    { icon: <Package     size={20}/>, title: "Product Mockups",         desc: "Photorealistic mockups showing your product, app, or brand in real-world contexts." },
    { icon: <Pen         size={20}/>, title: "Corporate Identity",      desc: "Business cards, letterheads, email signatures, and branded document templates." },
    { icon: <Image       size={20}/>, title: "Digital Assets",          desc: "Icons, illustrations, banners, and all digital graphics your brand needs to stand out." },
];

const packages = [
    {
        name: "Logo Package", price: "From 150,000 XAF",
        desc: "A professional logo that represents your brand.",
        color: "border-neutral-200", popular: false,
        features: ["3 logo concepts", "2 revision rounds", "Final files (SVG, PNG, PDF)", "Light & dark versions", "Colour + mono versions", "Delivery in 5–7 days"],
    },
    {
        name: "Brand Identity", price: "From 400,000 XAF",
        desc: "A complete brand system for a professional, consistent look everywhere.",
        color: "border-brand", popular: true,
        features: ["Logo design (full package)", "Brand colour palette", "Typography system", "Brand guidelines document", "Business card design", "Social media kit (5 templates)", "Email signature design", "Delivery in 2–3 weeks"],
    },
    {
        name: "Full Brand Suite", price: "From 800,000 XAF",
        desc: "Everything you need to launch or rebrand your business completely.",
        color: "border-neutral-200", popular: false,
        features: ["Complete brand identity", "30 social media templates", "10 marketing flyers", "Presentation template", "Product mockups (5)", "Brand video intro", "Full brand book", "Delivery in 4–6 weeks"],
    },
];

const techStack = ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Adobe InDesign", "Canva Pro", "After Effects"];

const faqs = [
    { q: "How many logo concepts do I get?", a: "All logo packages start with 3 distinct concept directions. You choose one direction and we refine it through revision rounds until you're fully satisfied." },
    { q: "What file formats will I receive?", a: "You'll receive SVG (scalable vector), PNG (transparent background), PDF, and AI/EPS source files. These cover print, digital, and any future use case." },
    { q: "Can you redesign my existing logo?", a: "Yes. We offer logo refresh and rebranding services — we modernise your existing brand while keeping what makes it recognisable." },
    { q: "Do you design for Cameroonian businesses specifically?", a: "Yes. We understand the Cameroonian and African aesthetic, market context, and cultural sensitivities. Our designs feel authentic and relevant to your local audience." },
    { q: "Can I use my new branding with the website GTS builds?", a: "Absolutely. Being a full-service agency, we design your brand AND build your website — the integration is seamless and consistent across every touchpoint." },
];

const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello! I'm interested in Branding & Creative services from GTS.")}`;

export default function BrandingPage() {
    return (
        <>
            <Navbar />
            <section className="relative bg-neutral-950 pt-24 pb-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-fuchsia-500/8 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(217,70,239,0.05) 1px, transparent 1px),linear-gradient(90deg, rgba(217,70,239,0.05) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="relative z-10 container-gts">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
                        <div className="flex items-center gap-2 font-body text-xs text-neutral-500 mb-6">
                            <Link href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
                            <Link href="/services" className="hover:text-brand transition-colors">Services</Link><span>/</span>
                            <span className="text-fuchsia-400">Branding & Creative</span>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/15 flex items-center justify-center text-fuchsia-400"><Sparkles size={28} /></div>
                            <span className="font-body text-sm font-semibold text-fuchsia-400 uppercase tracking-widest">Branding & Creative</span>
                        </div>
                        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance mb-6">
                            A Brand That <span className="text-fuchsia-400">Commands Attention</span>
                        </h1>
                        <p className="font-body text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
                            Logo design, brand identity, marketing materials, and digital assets — everything your business needs to look professional, memorable, and trustworthy.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Start Your Brand</Link></Button>
                            <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                        </div>
                        <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/8">
                            {[{ value: "60+", label: "Brands Created" }, { value: "3", label: "Concepts per Brief" }, { value: "∞", label: "Revisions on Full Packages" }, { value: "5 days", label: "Logo Delivery" }].map(({ value, label }) => (
                                <div key={label}><p className="font-display font-bold text-2xl text-white">{value}</p><p className="font-body text-xs text-neutral-500">{label}</p></div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container-gts">
                    <SectionHeader label="What We Create" heading={<>Creative Services That <span className="gradient-text">Build Trust</span></>} subheading="From your first logo to a complete brand system — we make your business look its best." className="mb-14" headingClassName="text-3xl sm:text-4xl" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map(({ icon, title, desc }, i) => (
                            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                                        className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-fuchsia-200 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 text-fuchsia-500 flex items-center justify-center mb-4 group-hover:bg-fuchsia-500 group-hover:text-white transition-all duration-200">{icon}</div>
                                <h3 className="font-display font-bold text-base text-neutral-900 mb-2">{title}</h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts">
                    <SectionHeader label="Pricing" heading={<>Branding <span className="gradient-text">Packages</span></>} subheading="Transparent pricing in XAF. All source files included." align="center" className="mb-14 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
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
                    <SectionHeader label="Tools" heading={<>Our <span className="gradient-text">Creative Tools</span></>} align="center" className="mb-10 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
                    <div className="flex flex-wrap justify-center gap-3">{techStack.map((t) => <TechBadge key={t} name={t} size="lg" />)}</div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts max-w-3xl mx-auto">
                    <SectionHeader label="FAQ" heading={<>Branding <span className="gradient-text">Questions</span></>} className="mb-10" headingClassName="text-3xl sm:text-4xl" />
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
                <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-fuchsia-500/8 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 container-gts text-center max-w-2xl mx-auto">
                    <h2 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight mb-4">Ready to Build a <span className="text-fuchsia-400">Brand That Stands Out?</span></h2>
                    <p className="font-body text-neutral-400 mb-8">Free brief consultation · 3 concepts · Source files delivered · Your brand, your ownership.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Start Your Brand</Link></Button>
                        <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}