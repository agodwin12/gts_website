// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Site Configuration
//   Central data layer for all static content.
//   Import what you need:
//     import { siteConfig, services, stats } from "@/lib/config";
// ═══════════════════════════════════════════════════════════════

import type {
    SiteConfig,
    NavItem,
    FooterSection,
    StatItem,
    ServiceItem,
    TestimonialItem,
    ProcessStep,
    TechBadge,
} from "@/lib/types";

// ─────────────────────────────────────────
// SITE CONFIG
// ─────────────────────────────────────────

export const siteConfig: SiteConfig = {
    name: "Godwin Tech Solutions",
    tagline: "Engineering the Future of African Business",
    description:
        "Premium IT services company based in Cameroon — Web Development, Mobile Apps, Cloud Solutions, AI Automation, and Enterprise Software for businesses across Africa and beyond.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://godwintechsolutions.com",
    email:
        process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@godwintechsolutions.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+237 000 000 000",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+237000000000",
    location: process.env.NEXT_PUBLIC_LOCATION || "Yaoundé, Cameroon",
    foundedYear: 2020,
    socials: {
        twitter:
            process.env.NEXT_PUBLIC_SOCIAL_TWITTER ||
            "https://twitter.com/godwintechsolutions",
        linkedin:
            process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ||
            "https://linkedin.com/company/godwintechsolutions",
        github:
            process.env.NEXT_PUBLIC_SOCIAL_GITHUB ||
            "https://github.com/godwintechsolutions",
        instagram:
            process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ||
            "https://instagram.com/godwintechsolutions",
        facebook:
            process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ||
            "https://facebook.com/godwintechsolutions",
        whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "237000000000"}`,
    },
};

// ─────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────

export const navItems: NavItem[] = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Services",
        href: "/services",
        children: [
            {
                label: "Web Development",
                href: "/services/web-development",
                description: "Corporate sites, SaaS platforms, PWAs & web apps",
                icon: "Globe",
            },
            {
                label: "App Development",
                href: "/services/app-development",
                description: "iOS, Android & cross-platform mobile apps",
                icon: "Smartphone",
            },
            {
                label: "Cloud Services",
                href: "/services/cloud-services",
                description: "VPS setup, cloud migration & CI/CD pipelines",
                icon: "Cloud",
            },
            {
                label: "E-Commerce",
                href: "/services/ecommerce",
                description: "Online stores, marketplaces & payment integrations",
                icon: "ShoppingCart",
            },
            {
                label: "UI/UX Design",
                href: "/services/ui-ux-design",
                description: "Modern interfaces, design systems & prototypes",
                icon: "Palette",
            },
            {
                label: "Digital Marketing",
                href: "/services/digital-marketing",
                description: "SEO, Google Ads, social campaigns & analytics",
                icon: "TrendingUp",
            },
            {
                label: "IT Consultancy",
                href: "/services/it-consultancy",
                description: "Tech strategy, digital transformation & architecture",
                icon: "BrainCircuit",
            },
            {
                label: "API & Integrations",
                href: "/services/api-integration",
                description: "Mobile Money, CRM, ERP & third-party APIs",
                icon: "Plug",
            },
            {
                label: "AI & Automation",
                href: "/services/automation-ai",
                description: "Chatbots, workflow automation & AI-powered tools",
                icon: "Bot",
            },
            {
                label: "Enterprise Software",
                href: "/services/enterprise-software",
                description: "School, hospital, HR & business management systems",
                icon: "Building2",
            },
            {
                label: "Cybersecurity",
                href: "/services/cybersecurity",
                description: "Security audits, SSL, firewalls & data protection",
                icon: "Shield",
            },
            {
                label: "Branding",
                href: "/services/branding",
                description: "Logo design, brand identity & digital assets",
                icon: "Sparkles",
            },
        ],
    },
    {
        label: "Portfolio",
        href: "/portfolio",
    },
    {
        label: "About",
        href: "/about",
    },
    {
        label: "Blog",
        href: "/blog",
        badge: "Soon",
    },
    {
        label: "Contact",
        href: "/contact",
    },
];

// ─────────────────────────────────────────
// FOOTER LINKS
// ─────────────────────────────────────────

export const footerSections: FooterSection[] = [
    {
        title: "Services",
        links: [
            { label: "Web Development",    href: "/services/web-development" },
            { label: "App Development",    href: "/services/app-development" },
            { label: "Cloud Services",     href: "/services/cloud-services" },
            { label: "E-Commerce",         href: "/services/ecommerce" },
            { label: "UI/UX Design",       href: "/services/ui-ux-design" },
            { label: "Digital Marketing",  href: "/services/digital-marketing" },
        ],
    },
    {
        title: "Solutions",
        links: [
            { label: "IT Consultancy",      href: "/services/it-consultancy" },
            { label: "API & Integrations",  href: "/services/api-integration" },
            { label: "AI & Automation",     href: "/services/automation-ai" },
            { label: "Enterprise Software", href: "/services/enterprise-software" },
            { label: "Cybersecurity",       href: "/services/cybersecurity" },
            { label: "Branding",            href: "/services/branding" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us",    href: "/about" },
            { label: "Portfolio",   href: "/portfolio" },
            { label: "Blog",        href: "/blog" },
            { label: "Careers",     href: "/careers" },
            { label: "Contact",     href: "/contact" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy",    href: "/privacy" },
            { label: "Terms of Service",  href: "/terms" },
            { label: "Cookie Policy",     href: "/cookies" },
        ],
    },
];

// ─────────────────────────────────────────
// COMPANY STATISTICS
// ─────────────────────────────────────────

export const stats: StatItem[] = [
    {
        value: 150,
        suffix: "+",
        label: "Projects Delivered",
        description: "Across web, mobile, cloud & enterprise",
    },
    {
        value: 80,
        suffix: "+",
        label: "Happy Clients",
        description: "From startups to large enterprises",
    },
    {
        value: 12,
        suffix: "+",
        label: "Countries Reached",
        description: "Clients across Africa and Europe",
    },
    {
        value: 5,
        suffix: "+",
        label: "Years of Excellence",
        description: "Building digital solutions since 2020",
    },
];

// ─────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────

export const services: ServiceItem[] = [
    {
        title: "Web Development",
        description:
            "From corporate websites to complex SaaS platforms — we build fast, scalable, and beautiful web applications tailored to your business goals.",
        icon: "Globe",
        href: "/services/web-development",
        color: "text-sky-500",
        features: [
            "Corporate & business websites",
            "SaaS platforms & web apps",
            "Progressive Web Apps (PWA)",
            "CMS integrations",
            "Client dashboards & portals",
            "Booking & membership systems",
        ],
    },
    {
        title: "App Development",
        description:
            "Native and cross-platform mobile apps for iOS and Android — built for performance, designed for users, and engineered for growth.",
        icon: "Smartphone",
        href: "/services/app-development",
        color: "text-violet-500",
        features: [
            "Android & iOS development",
            "Cross-platform (React Native)",
            "Fintech & e-commerce apps",
            "API-powered mobile apps",
            "App maintenance & updates",
            "Custom business apps",
        ],
    },
    {
        title: "Cloud Services",
        description:
            "Reliable, secure cloud infrastructure — from initial VPS setup and domain management to full CI/CD pipelines and cloud migrations.",
        icon: "Cloud",
        href: "/services/cloud-services",
        color: "text-cyan-500",
        features: [
            "VPS & server setup",
            "Cloud migration & hosting",
            "CI/CD deployment pipelines",
            "Database & backup systems",
            "Domain & DNS management",
            "Email hosting setup",
        ],
    },
    {
        title: "E-Commerce Solutions",
        description:
            "End-to-end online store development with Mobile Money and card payment integrations built specifically for African markets.",
        icon: "ShoppingCart",
        href: "/services/ecommerce",
        color: "text-emerald-500",
        features: [
            "Online stores & marketplaces",
            "Mobile Money integration",
            "Multi-vendor platforms",
            "Inventory & order systems",
            "Subscription & checkout",
            "Store management dashboards",
        ],
    },
    {
        title: "UI/UX Design",
        description:
            "Human-centred design that converts — modern interfaces, intuitive user flows, and consistent design systems your users will love.",
        icon: "Palette",
        href: "/services/ui-ux-design",
        color: "text-pink-500",
        features: [
            "Modern UI design",
            "Mobile app UI/UX",
            "Dashboard design",
            "Wireframing & prototypes",
            "Design systems",
            "User experience optimization",
        ],
    },
    {
        title: "Digital Marketing",
        description:
            "Data-driven growth strategies — SEO, Google Ads, social campaigns, and conversion optimization that bring measurable results.",
        icon: "TrendingUp",
        href: "/services/digital-marketing",
        color: "text-orange-500",
        features: [
            "SEO & technical SEO",
            "Google Ads management",
            "Social media campaigns",
            "Analytics & tracking setup",
            "Conversion optimization",
            "Performance marketing",
        ],
    },
    {
        title: "IT Consultancy",
        description:
            "Strategic technology guidance for businesses at every stage — from startup tech advisory to enterprise digital transformation.",
        icon: "BrainCircuit",
        href: "/services/it-consultancy",
        color: "text-indigo-500",
        features: [
            "Digital transformation",
            "Technology strategy",
            "Business process automation",
            "Software architecture",
            "IT project management",
            "Cybersecurity guidance",
        ],
    },
    {
        title: "API & Integrations",
        description:
            "Seamlessly connect your systems — Mobile Money APIs, CRM, ERP, WhatsApp, SMS gateways, and any third-party service your business needs.",
        icon: "Plug",
        href: "/services/api-integration",
        color: "text-teal-500",
        features: [
            "Mobile Money (MTN/Orange)",
            "Maviance & payment APIs",
            "WhatsApp & SMS gateways",
            "CRM & ERP integrations",
            "REST & GraphQL APIs",
            "Authentication systems",
        ],
    },
    {
        title: "AI & Automation",
        description:
            "Supercharge your business with intelligent automation — AI chatbots, workflow automation, smart dashboards, and CRM intelligence.",
        icon: "Bot",
        href: "/services/automation-ai",
        color: "text-yellow-500",
        features: [
            "AI-powered business tools",
            "Chatbot integration",
            "Workflow automation",
            "CRM automation",
            "Smart reporting dashboards",
            "Business intelligence tools",
        ],
    },
    {
        title: "Enterprise Software",
        description:
            "Custom enterprise systems built for scale — school management, hospital systems, HR platforms, and internal company portals.",
        icon: "Building2",
        href: "/services/enterprise-software",
        color: "text-blue-500",
        features: [
            "School management systems",
            "Hospital management systems",
            "HR & payroll systems",
            "POS & inventory systems",
            "Logistics platforms",
            "Internal company portals",
        ],
    },
    {
        title: "Cybersecurity",
        description:
            "Protect your digital assets — security audits, SSL configuration, firewall setup, server hardening, and ongoing security monitoring.",
        icon: "Shield",
        href: "/services/cybersecurity",
        color: "text-red-500",
        features: [
            "Security audits",
            "SSL configuration",
            "Firewall & server hardening",
            "Secure authentication",
            "Access management",
            "Data protection consulting",
        ],
    },
    {
        title: "Branding & Creative",
        description:
            "Build a brand that commands attention — logo design, corporate identity, marketing collateral, and product mockups that tell your story.",
        icon: "Sparkles",
        href: "/services/branding",
        color: "text-fuchsia-500",
        features: [
            "Logo & brand identity",
            "Marketing flyers & assets",
            "Corporate identity systems",
            "Presentation design",
            "Product mockups",
            "Digital asset creation",
        ],
    },
];

// ─────────────────────────────────────────
// HOW WE WORK — PROCESS STEPS
// ─────────────────────────────────────────

export const processSteps: ProcessStep[] = [
    {
        step: 1,
        title: "Discovery & Strategy",
        description:
            "We start with a deep-dive into your business goals, target audience, and technical requirements. This shapes our entire approach.",
        icon: "Search",
    },
    {
        step: 2,
        title: "Design & Prototype",
        description:
            "Our designers craft wireframes and interactive prototypes for your approval before a single line of code is written.",
        icon: "PenTool",
    },
    {
        step: 3,
        title: "Development & Build",
        description:
            "Our engineers build your solution using modern, scalable technology — with regular check-ins and transparent progress updates.",
        icon: "Code2",
    },
    {
        step: 4,
        title: "Testing & QA",
        description:
            "Rigorous testing across devices, browsers, and edge cases ensures your product works flawlessly before it reaches your users.",
        icon: "TestTube",
    },
    {
        step: 5,
        title: "Launch & Deploy",
        description:
            "We handle the full deployment — server setup, domain configuration, SSL, and a smooth go-live with zero downtime.",
        icon: "Rocket",
    },
    {
        step: 6,
        title: "Support & Growth",
        description:
            "Post-launch, we provide ongoing maintenance, performance monitoring, and strategic guidance to keep your product growing.",
        icon: "HeartHandshake",
    },
];

// ─────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────

export const testimonials: TestimonialItem[] = [
    {
        id: "t1",
        name: "Jean-Baptiste Mbarga",
        role: "CEO",
        company: "Maviance PLC",
        country: "Cameroon",
        quote:
            "GTS delivered our business portal on time and beyond expectations. The team's technical depth and communication throughout the project were exceptional. Our clients now have a seamless payment experience.",
        rating: 5,
        projectCategory: "WEB_DEVELOPMENT",
    },
    {
        id: "t2",
        name: "Amina Oumarou",
        role: "Founder",
        company: "FarmConnect Africa",
        country: "Cameroon",
        quote:
            "Building an offline-first app for rural farmers seemed impossible. GTS made it a reality. The app works even with poor network coverage and our farmers absolutely love it.",
        rating: 5,
        projectCategory: "APP_DEVELOPMENT",
    },
    {
        id: "t3",
        name: "Dr. Samuel Nkeng",
        role: "Director",
        company: "HealthLink Medical Group",
        country: "Cameroon",
        quote:
            "Our cloud migration was handled with zero downtime across all 12 clinics. GTS's infrastructure expertise is world-class. We sleep better knowing our patient data is secure and backed up daily.",
        rating: 5,
        projectCategory: "CLOUD_SERVICES",
    },
    {
        id: "t4",
        name: "Christelle Biyong",
        role: "Head of Marketing",
        company: "LuxeHotel Douala",
        country: "Cameroon",
        quote:
            "Our direct bookings doubled in 6 months. GTS's SEO strategy and Google Ads campaigns completely transformed how we acquire customers. The ROI has been incredible.",
        rating: 5,
        projectCategory: "DIGITAL_MARKETING",
    },
    {
        id: "t5",
        name: "Emmanuel Tabi",
        role: "CTO",
        company: "NexBank Africa",
        country: "Cameroon",
        quote:
            "The UI/UX design GTS delivered for our banking app was stunning. 94/100 in usability testing speaks for itself. Our dev team had a perfect handoff package to work from.",
        rating: 5,
        projectCategory: "UI_UX_DESIGN",
    },
    {
        id: "t6",
        name: "Patience Fongang",
        role: "Principal",
        company: "Bilingual Academy Yaoundé",
        country: "Cameroon",
        quote:
            "From admissions to fee payments, everything is now digital. GTS understood our bilingual environment perfectly and built a system that our staff adopted with no training issues.",
        rating: 5,
        projectCategory: "ENTERPRISE_SOFTWARE",
    },
];

// ─────────────────────────────────────────
// TECH STACK BADGES
// Used in the scrolling ticker on homepage
// ─────────────────────────────────────────

export const techBadges: TechBadge[] = [
    { name: "Next.js",        category: "frontend" },
    { name: "React",          category: "frontend" },
    { name: "TypeScript",     category: "frontend" },
    { name: "Tailwind CSS",   category: "frontend" },
    { name: "React Native",   category: "mobile" },
    { name: "Expo",           category: "mobile" },
    { name: "Node.js",        category: "backend" },
    { name: "PostgreSQL",     category: "database" },
    { name: "Prisma",         category: "database" },
    { name: "Redis",          category: "database" },
    { name: "MongoDB",        category: "database" },
    { name: "Docker",         category: "cloud" },
    { name: "Nginx",          category: "cloud" },
    { name: "AWS",            category: "cloud" },
    { name: "Vercel",         category: "cloud" },
    { name: "GitHub Actions", category: "tool" },
    { name: "Figma",          category: "tool" },
    { name: "OpenAI",         category: "tool" },
    { name: "Stripe",         category: "tool" },
    { name: "MTN MoMo API",   category: "tool" },
];