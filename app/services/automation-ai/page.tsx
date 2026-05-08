"use client";

import React from "react";
import Link  from "next/link";
import { motion } from "framer-motion";
import { Bot, CheckCircle2, ArrowRight, Zap, BarChart3, Bell, RefreshCw, Brain, MessageCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button }        from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { TechBadge }     from "@/components/ui/Badge";

const features = [
    { icon: <Bot        size={20}/>, title: "AI Chatbots",             desc: "WhatsApp and web chatbots that handle customer queries 24/7 — in English, French, and Pidgin." },
    { icon: <Zap        size={20}/>, title: "Workflow Automation",     desc: "Replace repetitive manual tasks with automated workflows that run without human input." },
    { icon: <RefreshCw  size={20}/>, title: "CRM Automation",         desc: "Automatic lead capture, follow-up emails, and pipeline management in your CRM." },
    { icon: <Brain      size={20}/>, title: "AI Business Tools",       desc: "Custom AI-powered tools — document analysis, smart search, recommendation engines." },
    { icon: <BarChart3  size={20}/>, title: "Smart Dashboards",        desc: "Automated reporting dashboards that pull data from multiple sources in real time." },
    { icon: <Bell       size={20}/>, title: "Automated Notifications", desc: "Smart alerts for your team and customers — triggered by business events automatically." },
    { icon: <Users      size={20}/>, title: "AI Customer Support",     desc: "AI that handles common support queries and escalates complex issues to humans." },
    { icon: <BarChart3  size={20}/>, title: "Business Intelligence",   desc: "Automated data collection, analysis, and visualisation to drive smarter decisions." },
];

const packages = [
    {
        name: "AI Chatbot", price: "From 500,000 XAF",
        desc: "A smart chatbot for your website or WhatsApp that handles customer queries automatically.",
        color: "border-neutral-200", popular: false,
        features: ["Website OR WhatsApp chatbot", "Custom knowledge base", "Multilingual (EN/FR/Pidgin)", "Human handoff", "Chat history & analytics", "1 month support"],
    },
    {
        name: "Automation Suite", price: "From 1,000,000 XAF",
        desc: "Full business process automation — chatbot + workflows + notifications.",
        color: "border-brand", popular: true,
        features: ["Website + WhatsApp chatbot", "3 automated workflows", "CRM integration", "Automated email sequences", "Smart notifications", "Analytics dashboard", "3 months support"],
    },
    {
        name: "AI Business Platform", price: "From 2,500,000 XAF",
        desc: "A fully AI-powered business operation — from sales to support to reporting.",
        color: "border-neutral-200", popular: false,
        features: ["Full chatbot system", "Unlimited workflows", "AI document processing", "Custom AI tools", "Business intelligence dashboard", "Full CRM automation", "6 months support"],
    },
];

const techStack = ["OpenAI GPT-4", "Google Gemini", "LangChain", "WhatsApp Cloud API", "n8n", "Zapier", "Node.js", "Python", "PostgreSQL"];

const faqs = [
    { q: "Can the chatbot speak Cameroon Pidgin?", a: "Yes! We train our chatbots on multilingual data including Cameroon Pidgin English, French, and English. The bot detects the language and responds naturally." },
    { q: "Will the chatbot replace my customer support team?", a: "Not replace — enhance. The bot handles routine queries (80%+ of volume) so your team focuses on complex issues that need human judgment." },
    { q: "What kinds of workflows can be automated?", a: "Invoice generation, lead follow-up emails, order notifications, report generation, data entry, approval workflows, and much more." },
    { q: "Is AI expensive to run?", a: "Much less than you think. For a typical business chatbot, the AI API costs are a few thousand XAF per month. The ROI from saved staff time is usually 10x or more." },
    { q: "How do I update what the chatbot knows?", a: "We build a simple admin panel where you can update the chatbot's knowledge base, add new FAQs, and review conversation history — no technical skills needed." },
];

const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello! I'm interested in AI & Automation services from GTS.")}`;

export default function AutomationAIPage() {
    return (
        <>
            <Navbar />
            <section className="relative bg-neutral-950 pt-24 pb-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-yellow-500/8 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(234,179,8,0.05) 1px, transparent 1px),linear-gradient(90deg, rgba(234,179,8,0.05) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="relative z-10 container-gts">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
                        <div className="flex items-center gap-2 font-body text-xs text-neutral-500 mb-6">
                            <Link href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
                            <Link href="/services" className="hover:text-brand transition-colors">Services</Link><span>/</span>
                            <span className="text-yellow-400">AI & Automation</span>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-yellow-500/15 flex items-center justify-center text-yellow-400"><Bot size={28} /></div>
                            <span className="font-body text-sm font-semibold text-yellow-400 uppercase tracking-widest">AI & Automation</span>
                        </div>
                        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance mb-6">
                            Work Smarter with <span className="text-yellow-400">AI & Automation</span>
                        </h1>
                        <p className="font-body text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
                            AI chatbots, workflow automation, and intelligent business tools that reduce manual work, cut costs, and help your business scale without adding headcount.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Automate My Business</Link></Button>
                            <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                        </div>
                        <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/8">
                            {[{ value: "80%", label: "Query Automation Rate" }, { value: "10x", label: "Avg ROI on Automation" }, { value: "24/7", label: "Bot Availability" }, { value: "4", label: "Languages Supported" }].map(({ value, label }) => (
                                <div key={label}><p className="font-display font-bold text-2xl text-white">{value}</p><p className="font-body text-xs text-neutral-500">{label}</p></div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container-gts">
                    <SectionHeader label="What We Build" heading={<>AI Tools That <span className="gradient-text">Work While You Sleep</span></>} subheading="From chatbots to full business automation — we deploy AI that creates real impact." className="mb-14" headingClassName="text-3xl sm:text-4xl" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map(({ icon, title, desc }, i) => (
                            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                                        className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-yellow-200 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center mb-4 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-200">{icon}</div>
                                <h3 className="font-display font-bold text-base text-neutral-900 mb-2">{title}</h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts">
                    <SectionHeader label="Pricing" heading={<>AI & Automation <span className="gradient-text">Packages</span></>} subheading="One-time build fee. Low ongoing AI API costs." align="center" className="mb-14 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
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
                    <SectionHeader label="Technology" heading={<>Our <span className="gradient-text">AI Stack</span></>} align="center" className="mb-10 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
                    <div className="flex flex-wrap justify-center gap-3">{techStack.map((t) => <TechBadge key={t} name={t} size="lg" />)}</div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts max-w-3xl mx-auto">
                    <SectionHeader label="FAQ" heading={<>AI & Automation <span className="gradient-text">Questions</span></>} className="mb-10" headingClassName="text-3xl sm:text-4xl" />
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
                <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-yellow-500/8 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 container-gts text-center max-w-2xl mx-auto">
                    <h2 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight mb-4">Ready to <span className="text-yellow-400">Automate Your Business?</span></h2>
                    <p className="font-body text-neutral-400 mb-8">Free consultation · Demo included · ROI guaranteed.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Automate My Business</Link></Button>
                        <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}