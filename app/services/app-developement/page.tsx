"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — App Development Service Page
// ═══════════════════════════════════════════════════════════════

import React from "react";
import Link  from "next/link";
import { motion } from "framer-motion";
import {
    Smartphone, CheckCircle2, ArrowRight,
    Cpu, Wifi, MapPin, Bell,
    ShoppingCart, CreditCard, MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button }        from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { TechBadge }     from "@/components/ui/Badge";

const appTypes = [
    { icon: <Smartphone  size={20} />, title: "Android Apps",         desc: "Native Android apps optimised for Cameroonian devices and network conditions." },
    { icon: <Smartphone  size={20} />, title: "iOS Apps",             desc: "Polished iOS apps that meet Apple standards and deliver a premium experience." },
    { icon: <Cpu         size={20} />, title: "Cross-Platform Apps",  desc: "Flutter and React Native apps that look and feel native on both Android and iOS." },
    { icon: <CreditCard  size={20} />, title: "Fintech Apps",         desc: "Mobile banking, payments, and MTN/Orange Mobile Money integrations." },
    { icon: <ShoppingCart size={20}/>, title: "E-Commerce Apps",      desc: "Shopping apps with product catalogues, cart, and Mobile Money checkout." },
    { icon: <MapPin      size={20} />, title: "Location-Based Apps",  desc: "Ride-hailing, delivery tracking with real-time GPS integration." },
    { icon: <Wifi        size={20} />, title: "Offline-First Apps",   desc: "Apps that work without internet — critical for rural Cameroon." },
    { icon: <Bell        size={20} />, title: "Push Notifications",   desc: "Real-time alerts, order updates, and engagement features in every app." },
];

const packages = [
    {
        name: "Basic App", price: "From 1,500,000 XAF",
        desc: "A focused single-platform app for a specific business need.",
        color: "border-neutral-200", popular: false,
        features: ["Android OR iOS", "Up to 8 screens", "User authentication", "Basic API integration", "Push notifications", "1 month support", "Delivery in 4–6 weeks"],
    },
    {
        name: "Cross-Platform", price: "From 2,000,000 XAF",
        desc: "Android + iOS from one codebase. The smart choice for most businesses.",
        color: "border-brand", popular: true,
        features: ["Android AND iOS", "Up to 15 screens", "User authentication", "Mobile Money integration", "Push notifications", "Offline support", "Admin dashboard", "3 months support", "Delivery in 6–10 weeks"],
    },
    {
        name: "Full Product", price: "From 4,000,000 XAF",
        desc: "A complete market-ready product with backend, admin panel, and analytics.",
        color: "border-neutral-200", popular: false,
        features: ["Android AND iOS", "Unlimited screens", "Full backend API", "Payment gateway", "Real-time features", "Analytics dashboard", "App Store submission", "6 months support", "Delivery in 10–16 weeks"],
    },
];

const techStack = ["Flutter", "React Native", "Expo", "Kotlin", "Swift", "Node.js", "PostgreSQL", "Firebase", "Google Maps SDK", "MTN MoMo API", "Orange Money API"];

const process = [
    { step: 1, title: "Discovery",   desc: "We understand your app idea, target users, and key features." },
    { step: 2, title: "Design",      desc: "UI/UX wireframes and interactive prototypes for your approval." },
    { step: 3, title: "Development", desc: "Sprint-based development with weekly demo sessions." },
    { step: 4, title: "Testing",     desc: "QA across real Android and iOS devices at various screen sizes." },
    { step: 5, title: "Launch",      desc: "App Store and Play Store submission handled by our team." },
    { step: 6, title: "Support",     desc: "30 days free post-launch support and optional maintenance." },
];

const faqs = [
    { q: "Should I build for Android or iOS first?", a: "In Cameroon, Android dominates (80%+ market share). We recommend starting with Android or going cross-platform with Flutter to cover both from day one." },
    { q: "What is Flutter and why do you use it?", a: "Flutter is Google's framework for building native-quality apps for Android and iOS from a single codebase. It's faster to build, cheaper, and the apps feel fully native." },
    { q: "Can you integrate Mobile Money into my app?", a: "Yes! MTN Mobile Money and Orange Money integration is one of our specialties. We've built multiple fintech apps with these payment systems." },
    { q: "Will my app work without internet?", a: "Yes if needed. We build offline-first apps that cache data locally and sync when connectivity returns — important for Cameroonian network conditions." },
    { q: "Do you submit the app to the App Store and Play Store?", a: "Yes. We handle the full submission process to both Google Play and Apple App Store including screenshots, descriptions, and compliance." },
];

const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello! I'm interested in App Development services from GTS.")}`;

export default function AppDevelopmentPage() {
    return (
        <>
            <Navbar />

            {/* Hero */}
            <section className="relative bg-neutral-950 pt-24 pb-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-500/8 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px),linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                </div>

                <div className="relative z-10 container-gts">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
                        <div className="flex items-center gap-2 font-body text-xs text-neutral-500 mb-6">
                            <Link href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
                            <Link href="/services" className="hover:text-brand transition-colors">Services</Link><span>/</span>
                            <span className="text-violet-400">App Development</span>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-violet-500/15 flex items-center justify-center text-violet-400"><Smartphone size={28} /></div>
                            <span className="font-body text-sm font-semibold text-violet-400 uppercase tracking-widest">App Development</span>
                        </div>
                        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance mb-6">
                            Mobile Apps Built for <span className="text-violet-400">Africa</span>
                        </h1>
                        <p className="font-body text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
                            Android, iOS, and cross-platform apps designed for the African market — Mobile Money ready, offline capable, and built to perform on all devices.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Start Your App</Link></Button>
                            <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                        </div>
                        <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/8">
                            {[{ value: "30+", label: "Apps Delivered" }, { value: "2", label: "Platforms" }, { value: "98%", label: "On-Time" }, { value: "4.9★", label: "Rating" }].map(({ value, label }) => (
                                <div key={label}><p className="font-display font-bold text-2xl text-white">{value}</p><p className="font-body text-xs text-neutral-500">{label}</p></div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* App Types */}
            <section className="section bg-white">
                <div className="container-gts">
                    <SectionHeader label="What We Build" heading={<>Apps for Every <span className="gradient-text">Use Case</span></>} subheading="From simple utility apps to complex fintech platforms — we've built it all." className="mb-14" headingClassName="text-3xl sm:text-4xl" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {appTypes.map(({ icon, title, desc }, i) => (
                            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                                        className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-violet-200 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center mb-4 group-hover:bg-violet-500 group-hover:text-white transition-all duration-200">{icon}</div>
                                <h3 className="font-display font-bold text-base text-neutral-900 mb-2">{title}</h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="section bg-neutral-50">
                <div className="container-gts">
                    <SectionHeader label="Our Process" heading={<>From Idea to <span className="gradient-text">App Store</span></>} subheading="A proven 6-step process that delivers quality apps on time." align="center" className="mb-14 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
                        {process.map(({ step, title, desc }) => (
                            <div key={step} className="p-6 rounded-2xl bg-white border border-neutral-100 shadow-card">
                                <span className="font-mono text-xs text-violet-400 font-bold tracking-widest">STEP {step.toString().padStart(2, "0")}</span>
                                <h3 className="font-display font-bold text-lg text-neutral-900 mt-2 mb-2">{title}</h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Packages */}
            <section className="section bg-white">
                <div className="container-gts">
                    <SectionHeader label="Pricing" heading={<>App <span className="gradient-text">Packages</span></>} subheading="Transparent pricing in XAF. Custom quotes always available." align="center" className="mb-14 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
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

            {/* Tech Stack */}
            <section className="section bg-neutral-50">
                <div className="container-gts text-center">
                    <SectionHeader label="Technology" heading={<>Our <span className="gradient-text">Mobile Stack</span></>} align="center" className="mb-10 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
                    <div className="flex flex-wrap justify-center gap-3">{techStack.map((t) => <TechBadge key={t} name={t} size="lg" />)}</div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section bg-white">
                <div className="container-gts max-w-3xl mx-auto">
                    <SectionHeader label="FAQ" heading={<>App Dev <span className="gradient-text">Questions</span></>} className="mb-10" headingClassName="text-3xl sm:text-4xl" />
                    <div className="space-y-4">
                        {faqs.map(({ q, a }) => (
                            <div key={q} className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
                                <h3 className="font-display font-semibold text-base text-neutral-900 mb-2 flex items-start gap-2"><span className="text-brand shrink-0 mt-0.5">Q.</span>{q}</h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed pl-5">{a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative bg-neutral-950 py-20 overflow-hidden">
                <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-500/8 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 container-gts text-center max-w-2xl mx-auto">
                    <h2 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight mb-4">Ready to Build Your <span className="text-violet-400">App?</span></h2>
                    <p className="font-body text-neutral-400 mb-8">Free consultation · Custom quote within 24 hours · No commitment required.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Start Your App</Link></Button>
                        <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}