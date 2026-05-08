"use client";

import React from "react";
import Link  from "next/link";
import { motion } from "framer-motion";
import { Plug, CheckCircle2, ArrowRight, CreditCard, MessageCircle as WA, Users, Database, Bell, Lock, GitBranch, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button }        from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { TechBadge }     from "@/components/ui/Badge";
import { MessageCircle } from "lucide-react";

const integrations = [
    { icon: <CreditCard size={20}/>, title: "MTN Mobile Money",      desc: "Full MoMo API integration — payment initiation, webhooks, reconciliation, and refunds." },
    { icon: <CreditCard size={20}/>, title: "Orange Money",          desc: "Orange Money API for payments, transfers, and mobile merchant solutions." },
    { icon: <Zap        size={20}/>, title: "Maviance / Smobilpay",  desc: "Enterprise-grade Cameroonian payment gateway for bulk transactions and B2B payments." },
    { icon: <WA         size={20}/>, title: "WhatsApp Business API", desc: "Automated WhatsApp messaging, chatbots, notifications, and customer support flows." },
    { icon: <Bell       size={20}/>, title: "SMS Gateway",           desc: "Bulk SMS, OTP verification, and transactional SMS for Cameroon and Africa." },
    { icon: <Users      size={20}/>, title: "CRM Integrations",      desc: "HubSpot, Salesforce, Zoho — sync your customer data with your CRM automatically." },
    { icon: <Database   size={20}/>, title: "ERP Integrations",      desc: "Connect your web or mobile app to SAP, Odoo, or custom ERP systems." },
    { icon: <Lock       size={20}/>, title: "Auth Systems",          desc: "OAuth2, Google Sign-In, phone number OTP, and two-factor authentication." },
    { icon: <GitBranch  size={20}/>, title: "REST & GraphQL APIs",   desc: "Custom API development and third-party API integration for any platform." },
];

const packages = [
    {
        name: "Single Integration", price: "From 300,000 XAF",
        desc: "Integrate one specific API or service into your existing system.",
        color: "border-neutral-200", popular: false,
        features: ["1 API integration", "Testing & validation", "Webhook setup", "Error handling", "Documentation", "1 month support"],
    },
    {
        name: "Payment Suite", price: "From 600,000 XAF",
        desc: "Complete Cameroonian payment stack — MTN + Orange + Card.",
        color: "border-brand", popular: true,
        features: ["MTN MoMo integration", "Orange Money integration", "Card payments (Stripe)", "Payment dashboard", "Transaction reconciliation", "Refund handling", "Webhook notifications", "3 months support"],
    },
    {
        name: "Full Integration Suite", price: "From 1,200,000 XAF",
        desc: "Multiple integrations for a complex business ecosystem.",
        color: "border-neutral-200", popular: false,
        features: ["Up to 5 integrations", "WhatsApp API included", "SMS gateway", "CRM connection", "Custom API development", "Admin management dashboard", "6 months support"],
    },
];

const techStack = ["MTN MoMo API", "Orange Money API", "Maviance API", "WhatsApp Cloud API", "Stripe", "PayPal", "Twilio SMS", "HubSpot API", "REST APIs", "GraphQL", "Webhooks"];

const faqs = [
    { q: "Can you integrate MTN and Orange Money into my existing app?", a: "Yes. We integrate both MTN Mobile Money and Orange Money into any existing web app, mobile app, or website — regardless of what technology it was built with." },
    { q: "How do webhooks work?", a: "Webhooks are real-time notifications from payment providers. When a payment succeeds or fails, the provider instantly notifies your system. We set up and handle all webhook events." },
    { q: "Can you build a custom API for my business?", a: "Yes. We design and build custom REST and GraphQL APIs from scratch — documented, secured, and scalable for any number of consumers." },
    { q: "Do you integrate WhatsApp for business automation?", a: "Yes. We use the official WhatsApp Business API to build chatbots, send automated notifications, and create customer support flows." },
    { q: "Can you connect my website to my CRM?", a: "Yes. We integrate with all major CRMs — HubSpot, Salesforce, Zoho — so leads from your website automatically appear in your CRM." },
];

const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello! I'm interested in API & Integration services from GTS.")}`;

export default function APIIntegrationPage() {
    return (
        <>
            <Navbar />
            <section className="relative bg-neutral-950 pt-24 pb-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-500/8 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(20,184,166,0.05) 1px, transparent 1px),linear-gradient(90deg, rgba(20,184,166,0.05) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="relative z-10 container-gts">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
                        <div className="flex items-center gap-2 font-body text-xs text-neutral-500 mb-6">
                            <Link href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
                            <Link href="/services" className="hover:text-brand transition-colors">Services</Link><span>/</span>
                            <span className="text-teal-400">API & Integrations</span>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-teal-500/15 flex items-center justify-center text-teal-400"><Plug size={28} /></div>
                            <span className="font-body text-sm font-semibold text-teal-400 uppercase tracking-widest">API & Integrations</span>
                        </div>
                        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance mb-6">
                            Connect Everything. <span className="text-teal-400">Automate Everything.</span>
                        </h1>
                        <p className="font-body text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
                            Mobile Money, WhatsApp, CRM, SMS — we connect your systems and payment providers so your business runs seamlessly.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Start Integration</Link></Button>
                            <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                        </div>
                        <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/8">
                            {[{ value: "11+", label: "APIs We Support" }, { value: "99.9%", label: "Uptime on Integrations" }, { value: "8+", label: "Platforms Integrated" }, { value: "24h", label: "Avg Setup Time" }].map(({ value, label }) => (
                                <div key={label}><p className="font-display font-bold text-2xl text-white">{value}</p><p className="font-body text-xs text-neutral-500">{label}</p></div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container-gts">
                    <SectionHeader label="Integrations We Build" heading={<>Connect Your <span className="gradient-text">Entire Business</span></>} subheading="From Mobile Money to WhatsApp to CRM — we integrate any system your business needs." className="mb-14" headingClassName="text-3xl sm:text-4xl" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {integrations.map(({ icon, title, desc }, i) => (
                            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                                        className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-teal-200 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4 group-hover:bg-teal-500 group-hover:text-white transition-all duration-200">{icon}</div>
                                <h3 className="font-display font-bold text-base text-neutral-900 mb-2">{title}</h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts">
                    <SectionHeader label="Pricing" heading={<>Integration <span className="gradient-text">Packages</span></>} subheading="Transparent one-time fees. No hidden recurring costs." align="center" className="mb-14 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
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
                    <SectionHeader label="Technologies" heading={<>APIs & <span className="gradient-text">Platforms We Use</span></>} align="center" className="mb-10 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
                    <div className="flex flex-wrap justify-center gap-3">{techStack.map((t) => <TechBadge key={t} name={t} size="lg" />)}</div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts max-w-3xl mx-auto">
                    <SectionHeader label="FAQ" heading={<>Integration <span className="gradient-text">Questions</span></>} className="mb-10" headingClassName="text-3xl sm:text-4xl" />
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
                <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-teal-500/8 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 container-gts text-center max-w-2xl mx-auto">
                    <h2 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight mb-4">Ready to <span className="text-teal-400">Connect Your Systems?</span></h2>
                    <p className="font-body text-neutral-400 mb-8">Tell us what you need to integrate and we'll get it done.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Start Integration</Link></Button>
                        <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}