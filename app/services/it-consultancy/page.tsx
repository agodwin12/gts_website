"use client";

import React from "react";
import Link  from "next/link";
import { motion } from "framer-motion";
import { BrainCircuit, CheckCircle2, ArrowRight, Lightbulb, Settings, GitMerge, Shield, BarChart3, Users, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button }        from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionLabel";

const features = [
    { icon: <Lightbulb   size={20}/>, title: "Digital Transformation",   desc: "We audit your current operations and create a roadmap to modernise your business with technology." },
    { icon: <BrainCircuit size={20}/>, title: "Technology Strategy",     desc: "Which tools, platforms, and tech stack should your business use? We answer that with data." },
    { icon: <Settings    size={20}/>, title: "Process Automation",       desc: "Identify repetitive manual tasks and replace them with automated workflows that save time and money." },
    { icon: <GitMerge    size={20}/>, title: "Software Architecture",    desc: "System design reviews, microservices planning, and scalable architecture for growing products." },
    { icon: <Users       size={20}/>, title: "IT Project Management",    desc: "We manage your tech projects end-to-end — vendors, timelines, budgets, and delivery." },
    { icon: <BarChart3   size={20}/>, title: "System Optimisation",      desc: "Audit existing systems for performance bottlenecks, inefficiencies, and security gaps." },
    { icon: <Shield      size={20}/>, title: "Cybersecurity Guidance",   desc: "Risk assessments and security strategy to protect your data and infrastructure." },
    { icon: <Lightbulb   size={20}/>, title: "Startup Tech Advisory",    desc: "Helping startups choose the right tech, avoid expensive mistakes, and move fast." },
];

const packages = [
    {
        name: "Advisory Session", price: "50,000 XAF/hour",
        desc: "One-off expert consultation for a specific technical question or decision.",
        color: "border-neutral-200", popular: false,
        features: ["1-hour deep dive session", "Written recommendations", "Action plan document", "Follow-up Q&A (email)", "Book multiple sessions"],
    },
    {
        name: "Project Consultancy", price: "From 300,000 XAF",
        desc: "Dedicated consultancy for a specific project or initiative.",
        color: "border-brand", popular: true,
        features: ["Full project assessment", "Technology recommendation", "Architecture planning", "Vendor evaluation", "Risk assessment", "Implementation roadmap", "Weekly check-ins"],
    },
    {
        name: "Ongoing Retainer", price: "From 200,000 XAF/mo",
        desc: "Your fractional CTO — expert tech guidance every month.",
        color: "border-neutral-200", popular: false,
        features: ["8 hours/month advisory", "Technology reviews", "Team guidance", "Vendor management", "Monthly strategy meeting", "Priority WhatsApp access", "Cancel anytime"],
    },
];

const faqs = [
    { q: "What is IT consultancy and who needs it?", a: "IT consultancy helps businesses make better technology decisions — what tools to use, how to build systems, how to reduce costs. Any business planning a digital project benefits from it." },
    { q: "Can you help us choose between different software vendors?", a: "Yes. We evaluate vendors objectively, compare options, and recommend the best fit for your specific needs and budget." },
    { q: "We have an existing system that's slow and outdated. Can you help?", a: "Yes. We audit your existing systems, identify the root causes of problems, and create a plan to optimise or migrate to something better." },
    { q: "Can you act as our CTO on a part-time basis?", a: "Yes. Our monthly retainer is essentially a fractional CTO service — you get senior tech leadership without the full-time salary." },
    { q: "Do you only consult or do you also build?", a: "Both. GTS is a full-service agency — we consult on strategy AND build the solution. This means our advice is grounded in real delivery experience." },
];

const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello! I'm interested in IT Consultancy services from GTS.")}`;

export default function ITConsultancyPage() {
    return (
        <>
            <Navbar />
            <section className="relative bg-neutral-950 pt-24 pb-20 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-500/8 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="relative z-10 container-gts">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
                        <div className="flex items-center gap-2 font-body text-xs text-neutral-500 mb-6">
                            <Link href="/" className="hover:text-brand transition-colors">Home</Link><span>/</span>
                            <Link href="/services" className="hover:text-brand transition-colors">Services</Link><span>/</span>
                            <span className="text-indigo-400">IT Consultancy</span>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 flex items-center justify-center text-indigo-400"><BrainCircuit size={28} /></div>
                            <span className="font-body text-sm font-semibold text-indigo-400 uppercase tracking-widest">IT Consultancy</span>
                        </div>
                        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance mb-6">
                            Senior Tech Expertise <span className="text-indigo-400">Without the Full-Time Cost</span>
                        </h1>
                        <p className="font-body text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
                            Strategic technology guidance for businesses at every stage — from startup tech decisions to enterprise digital transformation.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Book a Consultation</Link></Button>
                            <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                        </div>
                        <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/8">
                            {[{ value: "5+", label: "Years Experience" }, { value: "30+", label: "Systems Audited" }, { value: "100%", label: "Unbiased Advice" }, { value: "24h", label: "Response Time" }].map(({ value, label }) => (
                                <div key={label}><p className="font-display font-bold text-2xl text-white">{value}</p><p className="font-body text-xs text-neutral-500">{label}</p></div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container-gts">
                    <SectionHeader label="What We Do" heading={<>Strategic Tech <span className="gradient-text">Guidance</span></>} subheading="We help you make the right technology decisions — faster and with less risk." className="mb-14" headingClassName="text-3xl sm:text-4xl" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map(({ icon, title, desc }, i) => (
                            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                                        className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-200">{icon}</div>
                                <h3 className="font-display font-bold text-base text-neutral-900 mb-2">{title}</h3>
                                <p className="font-body text-sm text-neutral-500 leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-gts">
                    <SectionHeader label="Pricing" heading={<>Consultancy <span className="gradient-text">Options</span></>} subheading="Flexible engagement models to fit your needs and budget." align="center" className="mb-14 max-w-2xl mx-auto" headingClassName="text-3xl sm:text-4xl" />
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
                <div className="container-gts max-w-3xl mx-auto">
                    <SectionHeader label="FAQ" heading={<>Consultancy <span className="gradient-text">Questions</span></>} className="mb-10" headingClassName="text-3xl sm:text-4xl" />
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

            <section className="relative bg-neutral-950 py-20 overflow-hidden">
                <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/8 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 container-gts text-center max-w-2xl mx-auto">
                    <h2 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight mb-4">Need Expert <span className="text-indigo-400">Tech Guidance?</span></h2>
                    <p className="font-body text-neutral-400 mb-8">Book a free 30-minute intro call — no commitment required.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild variant="primary" size="lg" rounded="full" rightIcon={<ArrowRight size={16} />}><Link href="/contact">Book Consultation</Link></Button>
                        <Button asChild variant="glass" size="lg" rounded="full" leftIcon={<MessageCircle size={16} />}><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></Button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}