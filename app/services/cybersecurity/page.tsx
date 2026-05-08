"use client";

import React from "react";
import Link  from "next/link";
import { motion } from "framer-motion";
import { Shield, CheckCircle2, ArrowRight, Lock, Server, Eye, Key, AlertTriangle, FileCheck, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button }        from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { TechBadge }     from "@/components/ui/Badge";

const features = [
    { icon: <Eye         size={20}/>, title: "Security Audits",          desc: "Comprehensive assessment of your website, app, or infrastructure to identify vulnerabilities." },
    { icon: <Lock        size={20}/>, title: "SSL Configuration",        desc: "SSL certificates installed and configured correctly across all your domains and subdomains." },
    { icon: <Server      size={20}/>, title: "Firewall Setup",           desc: "UFW, iptables, and WAF configuration to block unauthorised access to your servers." },
    { icon: <Key         size={20}/>, title: "Secure Authentication",    desc: "Two-factor authentication, OAuth2, and secure password policies for your applications." },
    { icon: <Shield      size={20}/>, title: "Server Hardening",         desc: "Disable unnecessary services, patch vulnerabilities, and lock down your server configuration." },
    { icon: <Eye         size={20}/>, title: "Security Monitoring",      desc: "24/7 log monitoring and intrusion detection to catch threats before they cause damage." },
    { icon: <FileCheck   size={20}/>, title: "Data Protection",          desc: "GDPR-aligned data handling policies, encrypted storage, and secure data transfer protocols." },
    { icon: <AlertTriangle size={20}/>, title: "Vulnerability Scanning", desc: "Automated and manual scanning to find and patch security holes before attackers do." },
];

const packages = [
    {
        name: "Security Audit", price: "From 200,000 XAF",
        desc: "A thorough one-time assessment of your website or application security.",
        color: "border-neutral-200", popular: false,
        features: ["Full vulnerability scan", "SSL check", "Code security review", "Detailed audit report", "Priority vulnerability list", "Remediation guidance", "30-day follow-up check"],
    },
    {
        name: "Security Setup", price: "From 400,000 XAF",
        desc: "Full security hardening for your server and applications.",
        color: "border-brand", popular: true,
        features: ["Security audit included", "SSL installation", "Firewall configuration", "Server hardening", "2FA implementation", "Secure authentication setup", "Security monitoring setup", "3 months monitoring"],
    },
    {
        name: "Ongoing Security", price: "From 150,000 XAF/mo",
        desc: "Continuous security monitoring and maintenance for peace of mind.",
        color: "border-neutral-200", popular: false,
        features: ["24/7 threat monitoring", "Monthly security reports", "Patch management", "Incident response", "Quarterly security audits", "Priority emergency support", "Security advisory"],
    },
];

const techStack = ["Nginx (WAF)", "Certbot SSL", "UFW Firewall", "Fail2ban", "OWASP ZAP", "Nmap", "Linux Security", "2FA / TOTP", "Cloudflare"];

const faqs = [
    { q: "Why does my website need cybersecurity?", a: "Every website is a target — even small ones. Hackers use automated tools to attack thousands of sites daily looking for easy vulnerabilities. A single attack can take your site down, expose customer data, and destroy your reputation." },
    { q: "What is server hardening?", a: "Server hardening is the process of reducing attack surfaces — disabling unnecessary services, removing default passwords, configuring firewalls, and patching vulnerabilities on your server." },
    { q: "Do you offer emergency response if we get hacked?", a: "Yes. If you're under attack or have been compromised, contact us on WhatsApp immediately. We provide emergency incident response as a priority service." },
    { q: "What is an SSL certificate and do I need one?", a: "An SSL certificate encrypts data between your website and visitors. You absolutely need one — Google marks sites without SSL as 'Not Secure' and they rank lower in search results." },
    { q: "Do you help with GDPR compliance?", a: "Yes. We provide data protection consulting to help you understand and implement GDPR-compliant data handling practices — important if you serve European customers." },
];

const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello! I'm interested in Cybersecurity services from GTS.")}`;

export default function CybersecurityPage() {
    return (
        <>
            <Navbar />
            <section className="relative bg-neutral-950 pt-24 pb-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/8 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(239,68,68,0.05) 1px, transparent 1px),linear-gradient(90deg, rgba(239,68,68,0.05) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="relative z-10 container-gts">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
                        <div className="flex items-center gap-2 font-body text-xs text-neutral-500 mb-6">
                            <Link href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
                            <Link href="/services" className="hover:text-brand transition-colors">Services</Link><span>/</span>
                            <span className="text-red-400">Cybersecurity</span>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-red-500/15 flex items-center justify-center text-red-400"><Shield size={28} /></div>
                            <span className="font-body text-sm font-semibold text-red-400 uppercase tracking-widest">Cybersecurity</span>
                        </div>
                        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance mb-6">
                            Protect Your Business <span className="text-red-400">Before It&apos;s Too Late</span>
                        </h1>
                        <p className="font-body text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
                            Security audits, server hardening, SSL, firewalls, and 24/7 monitoring — we protect your digital assets so you can focus on growing your business.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Get a Security Audit</Link></Button>
                            <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                        </div>
                        <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/8">
                            {[{ value: "0", label: "Data Breaches on Our Watch" }, { value: "24/7", label: "Monitoring Available" }, { value: "100%", label: "SSL Success Rate" }, { value: "48h", label: "Audit Turnaround" }].map(({ value, label }) => (
                                <div key={label}><p className="font-display font-bold text-2xl text-white">{value}</p><p className="font-body text-xs text-neutral-500">{label}</p></div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container-gts">
                    <SectionHeader label="What We Do" heading={<>Full-Spectrum <span className="gradient-text">Security Coverage</span></>} subheading="From SSL to 24/7 monitoring — we protect every layer of your digital infrastructure." className="mb-14" headingClassName="text-3xl sm:text-4xl" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map(({ icon, title, desc }, i) => (
                            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                                        className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-red-200 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-4 group-hover:bg-red-500 group-hover:text-white transition-all duration-200">{icon}</div>
                                <h3 className="font-display font-bold text-base text-neutral-900 mb-2">{title}</h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts">
                    <SectionHeader label="Pricing" heading={<>Security <span className="gradient-text">Packages</span></>} subheading="Invest in security now or pay much more after a breach." align="center" className="mb-14 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
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
                    <SectionHeader label="Tools" heading={<>Our <span className="gradient-text">Security Stack</span></>} align="center" className="mb-10 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
                    <div className="flex flex-wrap justify-center gap-3">{techStack.map((t) => <TechBadge key={t} name={t} size="lg" />)}</div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts max-w-3xl mx-auto">
                    <SectionHeader label="FAQ" heading={<>Security <span className="gradient-text">Questions</span></>} className="mb-10" headingClassName="text-3xl sm:text-4xl" />
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
                <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-500/8 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 container-gts text-center max-w-2xl mx-auto">
                    <h2 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight mb-4">Is Your Business <span className="text-red-400">Secure?</span></h2>
                    <p className="font-body text-neutral-400 mb-8">Get a free security assessment and find out before hackers do.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Get a Free Audit</Link></Button>
                        <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}