"use client";

import React from "react";
import Link  from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2, ArrowRight, Search, BarChart3, Target, Globe, Star, Megaphone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button }        from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { TechBadge }     from "@/components/ui/Badge";

const features = [
    { icon: <Search    size={20}/>, title: "SEO Optimisation",       desc: "Get found on Google. We optimise your site structure, content, and technical SEO to rank higher." },
    { icon: <Search    size={20}/>, title: "Technical SEO",          desc: "Site speed, Core Web Vitals, schema markup, and crawlability fixes that Google rewards." },
    { icon: <Target    size={20}/>, title: "Google Ads",             desc: "Targeted campaigns that put your business in front of people actively searching for what you offer." },
    { icon: <Megaphone size={20}/>, title: "Social Media Ads",       desc: "Facebook, Instagram, and TikTok ad campaigns designed for the Cameroonian audience." },
    { icon: <BarChart3 size={20}/>, title: "Analytics & Tracking",   desc: "GA4, Google Tag Manager, and conversion tracking so you know exactly what's working." },
    { icon: <TrendingUp size={20}/>, title: "Conversion Optimisation",desc: "A/B testing, landing page optimisation, and UX improvements that turn visitors into clients." },
    { icon: <Globe     size={20}/>, title: "Local SEO",               desc: "Dominate Google searches in Yaoundé, Douala, and across Cameroon for your business category." },
    { icon: <Star      size={20}/>, title: "Performance Reports",     desc: "Monthly reports showing traffic, rankings, leads, and ROI — in plain language." },
];

const packages = [
    {
        name: "SEO Starter", price: "From 150,000 XAF/mo",
        desc: "Get your website ranking on Google and attracting organic traffic.",
        color: "border-neutral-200", popular: false,
        features: ["Technical SEO audit", "On-page optimisation", "5 target keywords", "Google Search Console setup", "Monthly report", "3-month minimum"],
    },
    {
        name: "Growth Package", price: "From 350,000 XAF/mo",
        desc: "Full digital marketing — SEO + Google Ads + analytics.",
        color: "border-brand", popular: true,
        features: ["Full SEO (20 keywords)", "Google Ads management", "GA4 + GTM setup", "Social media ads (1 platform)", "Landing page optimisation", "Bi-weekly reports", "Dedicated account manager"],
    },
    {
        name: "Market Leader", price: "From 700,000 XAF/mo",
        desc: "Dominate your market online with a full performance marketing strategy.",
        color: "border-neutral-200", popular: false,
        features: ["Full SEO (50+ keywords)", "Google + Meta + TikTok Ads", "Full funnel strategy", "Conversion rate optimisation", "Competitor analysis", "Content strategy", "Weekly reports", "Priority support"],
    },
];

const techStack = ["Google Analytics 4", "Google Ads", "Google Search Console", "Google Tag Manager", "Meta Ads", "Semrush", "Ahrefs", "Hotjar"];

const faqs = [
    { q: "How long before I see SEO results?", a: "SEO is a long-term strategy. Most clients see significant improvement in 3–6 months. Google Ads can drive traffic from day one." },
    { q: "Do you run ads for Cameroonian businesses?", a: "Yes. We run highly targeted Google and social media campaigns specifically designed for the Cameroonian and Central African market." },
    { q: "What is Google Analytics 4 and do I need it?", a: "GA4 is Google's latest analytics platform. You absolutely need it — it shows you who visits your site, where they come from, and what they do." },
    { q: "Can you help my local business appear on Google Maps?", a: "Yes. Local SEO and Google Business Profile optimisation is part of our SEO service — critical for businesses serving Yaoundé and Douala." },
    { q: "How do you measure success?", a: "We track rankings, organic traffic, ad click-through rates, conversions, and ROI. You get a clear monthly report showing exactly what your investment achieved." },
];

const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello! I'm interested in Digital Marketing services from GTS.")}`;

export default function DigitalMarketingPage() {
    return (
        <>
            <Navbar />
            <section className="relative bg-neutral-950 pt-24 pb-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/8 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(249,115,22,0.05) 1px, transparent 1px),linear-gradient(90deg, rgba(249,115,22,0.05) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="relative z-10 container-gts">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
                        <div className="flex items-center gap-2 font-body text-xs text-neutral-500 mb-6">
                            <Link href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
                            <Link href="/services" className="hover:text-brand transition-colors">Services</Link><span>/</span>
                            <span className="text-orange-400">Digital Marketing</span>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-orange-500/15 flex items-center justify-center text-orange-400"><TrendingUp size={28} /></div>
                            <span className="font-body text-sm font-semibold text-orange-400 uppercase tracking-widest">Digital Marketing</span>
                        </div>
                        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance mb-6">
                            Get Found. Get Clicks. <span className="text-orange-400">Get Clients.</span>
                        </h1>
                        <p className="font-body text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
                            Data-driven SEO, Google Ads, and social campaigns that bring measurable results — more traffic, more leads, and more revenue for your business.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Start Growing</Link></Button>
                            <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                        </div>
                        <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/8">
                            {[{ value: "312%", label: "Avg Traffic Increase" }, { value: "2x", label: "Avg Lead Growth" }, { value: "6mo", label: "Avg ROI Timeline" }, { value: "10+", label: "Campaigns Managed" }].map(({ value, label }) => (
                                <div key={label}><p className="font-display font-bold text-2xl text-white">{value}</p><p className="font-body text-xs text-neutral-500">{label}</p></div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container-gts">
                    <SectionHeader label="What We Do" heading={<>Full-Funnel <span className="gradient-text">Digital Marketing</span></>} subheading="From getting found on Google to converting visitors into paying clients." className="mb-14" headingClassName="text-3xl sm:text-4xl" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map(({ icon, title, desc }, i) => (
                            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                                        className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-orange-200 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all duration-200">{icon}</div>
                                <h3 className="font-display font-bold text-base text-neutral-900 mb-2">{title}</h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts">
                    <SectionHeader label="Pricing" heading={<>Marketing <span className="gradient-text">Packages</span></>} subheading="Monthly retainer packages. Cancel anytime. Results guaranteed." align="center" className="mb-14 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
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
                    <SectionHeader label="Tools" heading={<>Our <span className="gradient-text">Marketing Stack</span></>} align="center" className="mb-10 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
                    <div className="flex flex-wrap justify-center gap-3">{techStack.map((t) => <TechBadge key={t} name={t} size="lg" />)}</div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts max-w-3xl mx-auto">
                    <SectionHeader label="FAQ" heading={<>Marketing <span className="gradient-text">Questions</span></>} className="mb-10" headingClassName="text-3xl sm:text-4xl" />
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
                <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange-500/8 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 container-gts text-center max-w-2xl mx-auto">
                    <h2 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight mb-4">Ready to <span className="text-orange-400">Grow Your Business Online?</span></h2>
                    <p className="font-body text-neutral-400 mb-8">Free audit · Custom strategy · Results you can measure.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Start Growing</Link></Button>
                        <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}