"use client";

// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Contact Page
//   React Hook Form + Zod validation + API submission
//   WhatsApp CTA · Office info · Service selector
// ═══════════════════════════════════════════════════════════════

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
    Mail, Phone, MapPin, MessageCircle,
    ArrowRight, Send, CheckCircle2,
    Clock, Globe, Linkedin, Twitter,
    Github, Instagram, Facebook,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

// ─────────────────────────────────────────
// FORM SCHEMA
// ─────────────────────────────────────────

const contactSchema = z.object({
    name:    z.string().min(2,  "Name must be at least 2 characters"),
    email:   z.string().email("Please enter a valid email address"),
    phone:   z.string().optional(),
    company: z.string().optional(),
    service: z.string().min(1, "Please select a service"),
    budget:  z.string().optional(),
    message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─────────────────────────────────────────
// SELECT OPTIONS
// ─────────────────────────────────────────

const serviceOptions = [
    { value: "",                    label: "Select a service..."      },
    { value: "web-development",     label: "Web Development"          },
    { value: "app-development",     label: "App Development"          },
    { value: "cloud-services",      label: "Cloud Services"           },
    { value: "ecommerce",           label: "E-Commerce Solutions"     },
    { value: "ui-ux-design",        label: "UI/UX Design"             },
    { value: "digital-marketing",   label: "Digital Marketing"        },
    { value: "it-consultancy",      label: "IT Consultancy"           },
    { value: "api-integration",     label: "API & Integrations"       },
    { value: "enterprise-software", label: "Enterprise Software"      },
    { value: "automation-ai",       label: "AI & Automation"          },
    { value: "cybersecurity",       label: "Cybersecurity"            },
    { value: "branding",            label: "Branding & Creative"      },
    { value: "other",               label: "Other / Not sure"         },
];

const budgetOptions = [
    { value: "",           label: "Select a budget range..."  },
    { value: "under-500k", label: "Under 500K XAF"           },
    { value: "500k-1m",    label: "500K – 1M XAF"            },
    { value: "1m-5m",      label: "1M – 5M XAF"              },
    { value: "5m-10m",     label: "5M – 10M XAF"             },
    { value: "above-10m",  label: "Above 10M XAF"            },
    { value: "discuss",    label: "Prefer to discuss"         },
];

// ─────────────────────────────────────────
// CONTACT INFO ITEMS
// ─────────────────────────────────────────

const contactInfo = [
    {
        icon:  <Mail    size={18} />,
        label: "Email",
        value: siteConfig.email,
        href:  `mailto:${siteConfig.email}`,
        description: "We reply within 24 business hours",
    },
    {
        icon:  <Phone   size={18} />,
        label: "Phone",
        value: siteConfig.phone,
        href:  `tel:${siteConfig.phone}`,
        description: "Mon – Fri, 8am – 6pm WAT",
    },
    {
        icon:  <MapPin  size={18} />,
        label: "Location",
        value: siteConfig.location,
        href:  "https://maps.google.com/?q=Yaoundé,Cameroon",
        description: "Serving clients globally",
    },
    {
        icon:  <Globe   size={18} />,
        label: "Website",
        value: "godwintechsolutions.com",
        href:  siteConfig.url,
        description: "View our work & services",
    },
];

const socialLinks = [
    { icon: <Twitter   size={16} />, href: siteConfig.socials.twitter,   label: "Twitter"   },
    { icon: <Linkedin  size={16} />, href: siteConfig.socials.linkedin,  label: "LinkedIn"  },
    { icon: <Github    size={16} />, href: siteConfig.socials.github,    label: "GitHub"    },
    { icon: <Instagram size={16} />, href: siteConfig.socials.instagram, label: "Instagram" },
    { icon: <Facebook  size={16} />, href: siteConfig.socials.facebook,  label: "Facebook"  },
].filter((s) => s.href);

// ─────────────────────────────────────────
// FORM FIELD COMPONENTS
// ─────────────────────────────────────────

function FormField({
                       label,
                       error,
                       required,
                       children,
                   }: {
    label:     string;
    error?:    string;
    required?: boolean;
    children:  React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium text-neutral-700">
                {label}
                {required && <span className="text-brand ml-1" aria-hidden="true">*</span>}
            </label>
            {children}
            {error && (
                <p className="font-body text-xs text-red-500 flex items-center gap-1" role="alert">
                    <span aria-hidden="true">⚠</span> {error}
                </p>
            )}
        </div>
    );
}

const inputClass = cn(
    "w-full rounded-xl border border-neutral-200",
    "bg-white px-4 py-3",
    "font-body text-sm text-neutral-900",
    "placeholder:text-neutral-400",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand",
    "disabled:opacity-50 disabled:bg-neutral-50"
);

const errorInputClass = "border-red-300 focus:ring-red-200 focus:border-red-400";

// ─────────────────────────────────────────
// SUCCESS STATE
// ─────────────────────────────────────────

function SuccessState({ onReset }: { onReset: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-16 px-8"
        >
            <div className={cn(
                "w-20 h-20 rounded-full mb-6",
                "bg-green-500/10 flex items-center justify-center",
                "border-2 border-green-500/20"
            )}>
                <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h3 className="font-display font-bold text-2xl text-neutral-900 mb-3">
                Message Sent!
            </h3>
            <p className="font-body text-neutral-500 leading-relaxed max-w-sm mb-2">
                Thanks for reaching out. We&apos;ve received your message and sent a
                confirmation to your email.
            </p>
            <p className="font-body text-sm text-neutral-400 mb-8">
                Expect a reply within <span className="text-neutral-700 font-medium">24 business hours</span>.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                    variant="primary"
                    size="md"
                    rounded="full"
                    onClick={onReset}
                >
                    Send Another Message
                </Button>
                <Button asChild variant="secondary" size="md" rounded="full">
                    <Link href="/portfolio">View Our Work</Link>
                </Button>
            </div>
        </motion.div>
    );
}

// ─────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────

function ContactForm() {
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            const res = await fetch("/api/contact", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(data),
            });

            const json = await res.json();

            if (!res.ok || !json.success) {
                toast.error(json.error || "Something went wrong. Please try again.");
                return;
            }

            setSubmitted(true);
            toast.success("Message sent successfully!");
        } catch {
            toast.error("Network error. Please check your connection and try again.");
        }
    };

    if (submitted) {
        return <SuccessState onReset={() => { reset(); setSubmitted(false); }} />;
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
            aria-label="Contact form"
        >
            {/* Row 1 — Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Full Name" error={errors.name?.message} required>
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Jean-Baptiste Mbarga"
                        autoComplete="name"
                        className={cn(inputClass, errors.name && errorInputClass)}
                        disabled={isSubmitting}
                    />
                </FormField>

                <FormField label="Email Address" error={errors.email?.message} required>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="you@company.com"
                        autoComplete="email"
                        className={cn(inputClass, errors.email && errorInputClass)}
                        disabled={isSubmitting}
                    />
                </FormField>
            </div>

            {/* Row 2 — Phone + Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Phone / WhatsApp" error={errors.phone?.message}>
                    <input
                        {...register("phone")}
                        type="tel"
                        placeholder="+237 6XX XXX XXX"
                        autoComplete="tel"
                        className={cn(inputClass, errors.phone && errorInputClass)}
                        disabled={isSubmitting}
                    />
                </FormField>

                <FormField label="Company / Organisation" error={errors.company?.message}>
                    <input
                        {...register("company")}
                        type="text"
                        placeholder="Your Company Ltd"
                        autoComplete="organization"
                        className={cn(inputClass, errors.company && errorInputClass)}
                        disabled={isSubmitting}
                    />
                </FormField>
            </div>

            {/* Row 3 — Service + Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Service Needed" error={errors.service?.message} required>
                    <select
                        {...register("service")}
                        className={cn(inputClass, errors.service && errorInputClass)}
                        disabled={isSubmitting}
                    >
                        {serviceOptions.map((opt) => (
                            <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Estimated Budget" error={errors.budget?.message}>
                    <select
                        {...register("budget")}
                        className={cn(inputClass)}
                        disabled={isSubmitting}
                    >
                        {budgetOptions.map((opt) => (
                            <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </FormField>
            </div>

            {/* Message */}
            <FormField label="Project Details" error={errors.message?.message} required>
        <textarea
            {...register("message")}
            rows={6}
            placeholder="Tell us about your project — what you're building, your goals, timeline, and any technical requirements..."
            className={cn(inputClass, "resize-none", errors.message && errorInputClass)}
            disabled={isSubmitting}
        />
                <p className="font-body text-xs text-neutral-400 mt-1">
                    The more detail you provide, the more accurate our response will be.
                </p>
            </FormField>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    rounded="full"
                    loading={isSubmitting}
                    loadingText="Sending..."
                    rightIcon={!isSubmitting ? <Send size={16} /> : undefined}
                    className="w-full sm:w-auto shadow-brand-lg"
                >
                    Send Message
                </Button>
                <p className="font-body text-xs text-neutral-400">
                    🔒 Your information is safe and will never be shared.
                </p>
            </div>
        </form>
    );
}

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────

export default function ContactPage() {
    const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hello! I'd like to discuss a project with Godwin Tech Solutions."
    )}`;

    return (
        <>
            <Navbar />

            {/* Hero */}
            <section className="relative bg-neutral-950 pt-24 pb-16 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand/8 rounded-full blur-[100px]" />
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: `linear-gradient(rgba(14,165,233,0.05) 1px, transparent 1px),linear-gradient(90deg, rgba(14,165,233,0.05) 1px, transparent 1px)`,
                            backgroundSize: "64px 64px",
                        }}
                    />
                </div>

                <div className="relative z-10 container-gts text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <SectionLabel variant="dark" align="center">
                            Get In Touch
                        </SectionLabel>
                        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance">
                            Let&apos;s Build Something{" "}
                            <span className="text-brand">Great Together</span>
                        </h1>
                        <p className="font-body text-lg text-neutral-400 max-w-xl leading-relaxed">
                            Tell us about your project and we&apos;ll get back to you with a
                            tailored proposal within 24 hours.
                        </p>

                        {/* Quick contact pills */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                            <a
                                href={`mailto:${siteConfig.email}`}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 font-body text-sm text-neutral-300 hover:border-brand/40 hover:text-brand transition-all duration-200"
                            >
                                <Mail size={14} className="text-brand" />
                                {siteConfig.email}
                            </a>
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 font-body text-sm text-green-400 hover:bg-green-500/20 transition-all duration-200"
                            >
                                <MessageCircle size={14} />
                                Chat on WhatsApp
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main content */}
            <section className="bg-neutral-50 py-16 lg:py-24">
                <div className="container-gts">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

                        {/* ── LEFT — Info sidebar (2 cols) ── */}
                        <div className="lg:col-span-2 flex flex-col gap-8">

                            {/* WhatsApp CTA — prominent */}
                            <motion.a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className={cn(
                                    "group flex items-center gap-4 p-5 rounded-2xl",
                                    "bg-green-500 hover:bg-green-400",
                                    "transition-all duration-300",
                                    "shadow-[0_4px_24px_rgba(34,197,94,0.3)]",
                                    "hover:shadow-[0_8px_40px_rgba(34,197,94,0.4)]",
                                    "hover:-translate-y-0.5"
                                )}
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                                    <MessageCircle size={22} className="text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-display font-bold text-white text-base">
                                        Chat on WhatsApp
                                    </p>
                                    <p className="font-body text-sm text-green-100">
                                        Get a faster response — we reply instantly
                                    </p>
                                </div>
                                <ArrowRight
                                    size={18}
                                    className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-200 shrink-0"
                                />
                            </motion.a>

                            {/* Contact info */}
                            <div className="space-y-3">
                                {contactInfo.map(({ icon, label, value, href, description }, i) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        target={href.startsWith("http") ? "_blank" : undefined}
                                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        initial={{ opacity: 0, x: -16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                                        className={cn(
                                            "group flex items-start gap-3.5 p-4 rounded-xl",
                                            "bg-white border border-neutral-100",
                                            "hover:border-brand/30 hover:shadow-brand-sm",
                                            "transition-all duration-200"
                                        )}
                                    >
                    <span className={cn(
                        "w-9 h-9 rounded-lg shrink-0 mt-0.5",
                        "flex items-center justify-center",
                        "bg-brand/8 text-brand",
                        "group-hover:bg-brand group-hover:text-white",
                        "transition-all duration-200"
                    )}>
                      {icon}
                    </span>
                                        <div className="min-w-0">
                                            <p className="font-body text-xs text-neutral-400 uppercase tracking-wider mb-0.5">
                                                {label}
                                            </p>
                                            <p className="font-body text-sm font-semibold text-neutral-900 truncate group-hover:text-brand transition-colors">
                                                {value}
                                            </p>
                                            <p className="font-body text-xs text-neutral-400 mt-0.5">
                                                {description}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                            {/* Business hours */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                className="p-5 rounded-2xl bg-white border border-neutral-100"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <Clock size={15} className="text-brand" />
                                    <p className="font-display font-semibold text-sm text-neutral-900">
                                        Business Hours
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
                                        { day: "Saturday",        hours: "9:00 AM – 2:00 PM" },
                                        { day: "Sunday",          hours: "Closed"            },
                                    ].map(({ day, hours }) => (
                                        <div key={day} className="flex justify-between">
                                            <span className="font-body text-xs text-neutral-500">{day}</span>
                                            <span className={cn(
                                                "font-body text-xs font-medium",
                                                hours === "Closed" ? "text-neutral-400" : "text-neutral-900"
                                            )}>
                        {hours}
                      </span>
                                        </div>
                                    ))}
                                </div>
                                <p className="font-body text-xs text-neutral-400 mt-3 pt-3 border-t border-neutral-100">
                                    All times in West Africa Time (WAT · UTC+1)
                                </p>
                            </motion.div>

                            {/* Socials */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                            >
                                <p className="font-body text-xs text-neutral-400 uppercase tracking-wider mb-3">
                                    Follow Us
                                </p>
                                <div className="flex items-center gap-2">
                                    {socialLinks.map(({ icon, href, label }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className={cn(
                                                "w-9 h-9 rounded-lg flex items-center justify-center",
                                                "bg-white border border-neutral-200 text-neutral-400",
                                                "hover:border-brand hover:text-brand hover:bg-brand/5",
                                                "transition-all duration-200"
                                            )}
                                        >
                                            {icon}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* ── RIGHT — Contact form (3 cols) ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-3"
                        >
                            <div className={cn(
                                "bg-white rounded-3xl p-8 lg:p-10",
                                "border border-neutral-100",
                                "shadow-[0_4px_40px_rgba(0,0,0,0.06)]"
                            )}>
                                <div className="mb-8">
                                    <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2">
                                        Send Us a Message
                                    </h2>
                                    <p className="font-body text-sm text-neutral-500">
                                        Fill in the form below and we&apos;ll get back to you within
                                        24 business hours with a tailored response.
                                    </p>
                                </div>

                                <ContactForm />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}