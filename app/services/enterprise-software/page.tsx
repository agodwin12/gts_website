"use client";

import React from "react";
import Link  from "next/link";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, ArrowRight, GraduationCap, Heart, Users, ShoppingBag, Truck, BarChart3, MessageCircle, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button }        from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { TechBadge }     from "@/components/ui/Badge";

const systems = [
    { icon: <GraduationCap size={20}/>, title: "School Management",      desc: "Admissions, grades, timetables, fee collection with Mobile Money, parent portals, and staff payroll." },
    { icon: <Heart         size={20}/>, title: "Hospital Management",     desc: "Patient records, appointment booking, billing, pharmacy, lab results, and doctor portals." },
    { icon: <Users         size={20}/>, title: "HR & Payroll Systems",    desc: "Employee management, payroll calculation, leave management, and performance tracking." },
    { icon: <BarChart3     size={20}/>, title: "Accounting Systems",      desc: "Invoicing, expense tracking, financial reports, and tax management for Cameroonian businesses." },
    { icon: <ShoppingBag   size={20}/>, title: "POS Systems",             desc: "Point of sale for retail shops, restaurants, and supermarkets — Mobile Money and cash supported." },
    { icon: <Layers        size={20}/>, title: "Inventory Management",    desc: "Stock tracking, purchase orders, supplier management, and low-stock alerts." },
    { icon: <Truck         size={20}/>, title: "Logistics Platforms",     desc: "Delivery management, route optimisation, driver tracking, and customer delivery notifications." },
    { icon: <Building2     size={20}/>, title: "Company Portals",         desc: "Internal intranets, document management, team collaboration, and company communication hubs." },
];

const packages = [
    {
        name: "Departmental System", price: "From 1,500,000 XAF",
        desc: "A focused system for one department or function.",
        color: "border-neutral-200", popular: false,
        features: ["Single module (e.g. HR or Inventory)", "User roles & permissions", "Data import tools", "Mobile responsive", "Training session", "3 months support"],
    },
    {
        name: "Full Business System", price: "From 3,000,000 XAF",
        desc: "A complete management system for your entire organisation.",
        color: "border-brand", popular: true,
        features: ["Multiple integrated modules", "Role-based access control", "Mobile Money integration", "Custom reports & analytics", "Staff training included", "Data migration", "Admin super-panel", "6 months support"],
    },
    {
        name: "Enterprise Platform", price: "From 8,000,000 XAF",
        desc: "Large-scale platform for organisations with 100+ users.",
        color: "border-neutral-200", popular: false,
        features: ["Unlimited modules", "Multi-branch support", "Advanced analytics & BI", "API for third-party integration", "Custom mobile app", "Dedicated server setup", "SLA guarantee", "12 months support"],
    },
];

const techStack = ["Next.js", "React", "Node.js", "PostgreSQL", "Prisma", "Docker", "Redis", "MTN MoMo API", "Orange Money API", "Tailwind CSS"];

const faqs = [
    { q: "How long does it take to build a school management system?", a: "A standard school management system takes 2–4 months depending on the number of modules and number of students. We've built systems serving 1,200+ students." },
    { q: "Can the system handle Mobile Money payments for school fees?", a: "Yes. MTN Mobile Money and Orange Money integration is standard in all our school and business management systems." },
    { q: "Can it work in both English and French?", a: "Yes. Being Cameroon-based, we build fully bilingual systems — critical for schools and organisations operating in both languages." },
    { q: "Will my staff need technical training to use the system?", a: "We design all systems to be as intuitive as possible. We also provide full training sessions and documentation for your staff after delivery." },
    { q: "Can the system be accessed on mobile phones?", a: "Yes. All our enterprise systems are fully responsive and work on smartphones, tablets, and desktop computers." },
];

const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello! I'm interested in Enterprise Software from GTS.")}`;

export default function EnterpriseSoftwarePage() {
    return (
        <>
            <Navbar />
            <section className="relative bg-neutral-950 pt-24 pb-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/8 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="relative z-10 container-gts">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
                        <div className="flex items-center gap-2 font-body text-xs text-neutral-500 mb-6">
                            <Link href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
                            <Link href="/services" className="hover:text-brand transition-colors">Services</Link><span>/</span>
                            <span className="text-blue-400">Enterprise Software</span>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 flex items-center justify-center text-blue-400"><Building2 size={28} /></div>
                            <span className="font-body text-sm font-semibold text-blue-400 uppercase tracking-widest">Enterprise Software</span>
                        </div>
                        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance mb-6">
                            Custom Systems for <span className="text-blue-400">Serious Organisations</span>
                        </h1>
                        <p className="font-body text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
                            School management, hospital systems, HR, POS, and logistics platforms — built for Cameroonian organisations with Mobile Money, bilingual support, and offline capability.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Discuss Your System</Link></Button>
                            <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                        </div>
                        <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/8">
                            {[{ value: "15+", label: "Systems Delivered" }, { value: "5000+", label: "End Users Served" }, { value: "Bilingual", label: "EN & FR Support" }, { value: "Mobile Money", label: "Payments Built-in" }].map(({ value, label }) => (
                                <div key={label}><p className="font-display font-bold text-2xl text-white">{value}</p><p className="font-body text-xs text-neutral-500">{label}</p></div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container-gts">
                    <SectionHeader label="What We Build" heading={<>Systems for Every <span className="gradient-text">Organisation Type</span></>} subheading="From schools to hospitals to logistics companies — we build systems that run your operations." className="mb-14" headingClassName="text-3xl sm:text-4xl" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {systems.map(({ icon, title, desc }, i) => (
                            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                                        className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-all duration-200">{icon}</div>
                                <h3 className="font-display font-bold text-base text-neutral-900 mb-2">{title}</h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts">
                    <SectionHeader label="Pricing" heading={<>Enterprise <span className="gradient-text">Packages</span></>} subheading="All prices in XAF. Every system is custom-scoped. Free consultation before any quote." align="center" className="mb-14 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {packages.map(({ name, price, desc, color, popular, features: f }) => (
                            <div key={name} className={cn("relative flex flex-col p-6 rounded-2xl bg-white border-2", color, popular && "shadow-brand")}>
                                {popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand text-white font-body text-xs font-bold">Most Popular</span>}
                                <h3 className="font-display font-bold text-xl text-neutral-900 mb-1">{name}</h3>
                                <p className="font-display font-bold text-2xl text-brand mb-2">{price}</p>
                                <p className="font-body text-sm text-neutral-500 mb-5">{desc}</p>
                                <ul className="space-y-2.5 flex-1 mb-6">{f.map((item) => (<li key={item} className="flex items-center gap-2 font-body text-sm text-neutral-700"><CheckCircle2 size={14} className="text-brand shrink-0" />{item}</li>))}</ul>
                                <Button asChild variant={popular ? "primary" : "secondary"} size="md" fullWidth rounded="full"><Link href="/contact">Get a Quote</Link></Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container-gts text-center">
                    <SectionHeader label="Technology" heading={<>Built With <span className="gradient-text">Enterprise-Grade Tech</span></>} align="center" className="mb-10 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
                    <div className="flex flex-wrap justify-center gap-3">{techStack.map((t) => <TechBadge key={t} name={t} size="lg" />)}</div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts max-w-3xl mx-auto">
                    <SectionHeader label="FAQ" heading={<>Enterprise <span className="gradient-text">Questions</span></>} className="mb-10" headingClassName="text-3xl sm:text-4xl" />
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
                <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-500/8 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 container-gts text-center max-w-2xl mx-auto">
                    <h2 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight mb-4">Ready to <span className="text-blue-400">Digitalise Your Organisation?</span></h2>
                    <p className="font-body text-neutral-400 mb-8">Free consultation · Custom scoping · Bilingual delivery · Mobile Money included.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Discuss Your System</Link></Button>
                        <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}