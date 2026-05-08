"use client";

import React from "react";
import Link  from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, CheckCircle2, ArrowRight, CreditCard, Package, BarChart3, Users, Repeat, Truck, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button }        from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { TechBadge }     from "@/components/ui/Badge";

const features = [
    { icon: <ShoppingCart size={20}/>, title: "Online Stores",          desc: "Beautiful product catalogues with categories, search, filters, and a smooth checkout experience." },
    { icon: <CreditCard   size={20}/>, title: "Mobile Money Payments",  desc: "MTN MoMo and Orange Money integration so Cameroonian customers can pay easily." },
    { icon: <Users        size={20}/>, title: "Multi-Vendor Markets",   desc: "Jumia-style marketplaces where multiple sellers can list and manage their products." },
    { icon: <Package      size={20}/>, title: "Inventory Management",   desc: "Track stock levels, set low-stock alerts, and manage your products in real time." },
    { icon: <Repeat       size={20}/>, title: "Subscription Systems",   desc: "Recurring billing, membership plans, and subscription management built in." },
    { icon: <Truck        size={20}/>, title: "Delivery & Logistics",   desc: "Delivery zone management, shipping rates, and order tracking for your customers." },
    { icon: <BarChart3    size={20}/>, title: "Store Dashboard",        desc: "Sales analytics, revenue reports, and customer insights in a clean admin panel." },
    { icon: <CreditCard   size={20}/>, title: "Card Payments",          desc: "Visa, Mastercard, and international card payments via Stripe and PayPal integration." },
];

const packages = [
    {
        name: "Basic Store", price: "From 800,000 XAF",
        desc: "A simple, professional online store to start selling immediately.",
        color: "border-neutral-200", popular: false,
        features: ["Up to 50 products", "Mobile Money payments", "Order management", "Mobile responsive", "Basic SEO", "1 month support"],
    },
    {
        name: "Full E-Commerce", price: "From 1,500,000 XAF",
        desc: "A complete e-commerce solution with all the tools to grow your business.",
        color: "border-brand", popular: true,
        features: ["Unlimited products", "MTN + Orange Money + Card", "Inventory management", "Customer accounts", "Promo codes & discounts", "Analytics dashboard", "Email notifications", "3 months support"],
    },
    {
        name: "Marketplace", price: "From 3,000,000 XAF",
        desc: "A multi-vendor marketplace platform for multiple sellers.",
        color: "border-neutral-200", popular: false,
        features: ["Multi-vendor system", "Vendor onboarding & KYC", "Split payments", "Commission management", "Dispute resolution", "Super admin panel", "6 months support"],
    },
];

const techStack = ["Next.js", "React", "PostgreSQL", "Prisma", "Stripe", "MTN MoMo API", "Orange Money API", "Cloudinary", "Redis", "Tailwind CSS"];

const faqs = [
    { q: "Can Cameroonian customers pay with Mobile Money?", a: "Absolutely. We integrate MTN Mobile Money and Orange Money as primary payment methods — the most widely used payment systems in Cameroon." },
    { q: "Can I manage my products myself?", a: "Yes. We build a full admin dashboard where you can add products, update prices, manage stock, and view orders without any technical knowledge." },
    { q: "Can you build something like Jumia for a specific niche?", a: "Yes! A niche marketplace is one of our most popular Enterprise E-Commerce builds. We've built multi-vendor platforms with full vendor management." },
    { q: "Will my store work on mobile phones?", a: "Yes, absolutely. We build mobile-first — your store will look and work perfectly on any smartphone." },
    { q: "Do you handle delivery/shipping integration?", a: "Yes. We can build delivery zone management, shipping rates, and order tracking. For third-party logistics, we can integrate with local delivery services." },
];

const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello! I'm interested in E-Commerce solutions from GTS.")}`;

export default function EcommercePage() {
    return (
        <>
            <Navbar />

            <section className="relative bg-neutral-950 pt-24 pb-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/8 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(16,185,129,0.05) 1px, transparent 1px),linear-gradient(90deg, rgba(16,185,129,0.05) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="relative z-10 container-gts">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
                        <div className="flex items-center gap-2 font-body text-xs text-neutral-500 mb-6">
                            <Link href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
                            <Link href="/services" className="hover:text-brand transition-colors">Services</Link><span>/</span>
                            <span className="text-emerald-400">E-Commerce</span>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-400"><ShoppingCart size={28} /></div>
                            <span className="font-body text-sm font-semibold text-emerald-400 uppercase tracking-widest">E-Commerce Solutions</span>
                        </div>
                        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance mb-6">
                            Sell Online with <span className="text-emerald-400">Mobile Money</span>
                        </h1>
                        <p className="font-body text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
                            Online stores and marketplaces built for the Cameroonian market — MTN and Orange Money ready, mobile-first, and designed to convert visitors into buyers.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Start Your Store</Link></Button>
                            <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                        </div>
                        <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/8">
                            {[{ value: "20+", label: "Stores Built" }, { value: "MTN+Orange", label: "Mobile Money" }, { value: "99%", label: "Uptime" }, { value: "24/7", label: "Order Processing" }].map(({ value, label }) => (
                                <div key={label}><p className="font-display font-bold text-2xl text-white">{value}</p><p className="font-body text-xs text-neutral-500">{label}</p></div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container-gts">
                    <SectionHeader label="What We Build" heading={<>Complete <span className="gradient-text">E-Commerce Solutions</span></>} subheading="Everything you need to sell online — from a simple store to a full marketplace." className="mb-14" headingClassName="text-3xl sm:text-4xl" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map(({ icon, title, desc }, i) => (
                            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                                        className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-200">{icon}</div>
                                <h3 className="font-display font-bold text-base text-neutral-900 mb-2">{title}</h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts">
                    <SectionHeader label="Pricing" heading={<>E-Commerce <span className="gradient-text">Packages</span></>} subheading="Transparent pricing in XAF. All packages include Mobile Money integration." align="center" className="mb-14 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
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
                    <SectionHeader label="Technology" heading={<>Our <span className="gradient-text">E-Commerce Stack</span></>} align="center" className="mb-10 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
                    <div className="flex flex-wrap justify-center gap-3">{techStack.map((t) => <TechBadge key={t} name={t} size="lg" />)}</div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts max-w-3xl mx-auto">
                    <SectionHeader label="FAQ" heading={<>E-Commerce <span className="gradient-text">Questions</span></>} className="mb-10" headingClassName="text-3xl sm:text-4xl" />
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
                <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/8 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 container-gts text-center max-w-2xl mx-auto">
                    <h2 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight mb-4">Ready to <span className="text-emerald-400">Start Selling?</span></h2>
                    <p className="font-body text-neutral-400 mb-8">Free consultation · Custom quote within 24 hours · Mobile Money included.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Start Your Store</Link></Button>
                        <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}