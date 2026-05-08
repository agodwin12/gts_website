// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Database Seed
//   Run with: npm run db:seed
//   Seeds realistic sample projects for the portfolio showcase
// ═══════════════════════════════════════════════════════════════

import { PrismaClient, ProjectCategory, ProjectStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding GTS database...\n");

    // Clear existing projects
    await prisma.project.deleteMany();
    console.log("🗑️  Cleared existing projects");

    const projects = await prisma.project.createMany({
        data: [
            // ─────────────────────────────────────────
            // WEB DEVELOPMENT
            // ─────────────────────────────────────────
            {
                title: "Maviance Business Portal",
                slug: "maviance-business-portal",
                summary:
                    "A full-scale B2B payment and transaction management portal for one of Cameroon's leading fintech companies.",
                description:
                    "We designed and developed a comprehensive business portal for Maviance PLC that enables corporate clients to manage bulk payments, track transactions in real-time, generate financial reports, and onboard sub-merchants. The platform integrates directly with the Maviance Smobilpay API and handles millions of CFA francs in daily transactions. Built with performance and security as top priorities, the portal features role-based access control, audit logs, and two-factor authentication.",
                category: ProjectCategory.WEB_DEVELOPMENT,
                tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Smobilpay API"],
                status: ProjectStatus.PUBLISHED,
                clientName: "Maviance PLC",
                clientCountry: "Cameroon",
                clientIndustry: "Fintech",
                coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
                images: [
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
                    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
                ],
                techStack: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma ORM", "Tailwind CSS", "Redis", "Docker"],
                duration: "4 months",
                deliveredAt: new Date("2024-08-15"),
                liveUrl: "https://portal.maviance.com",
                featured: true,
                order: 1,
                metaTitle: "Maviance Business Portal — GTS Project",
                metaDescription: "B2B payment and transaction management portal built by Godwin Tech Solutions for Maviance PLC.",
            },

            {
                title: "CamerSchools Learning Platform",
                slug: "camerschools-learning-platform",
                summary:
                    "A modern e-learning platform for secondary school students across Cameroon with video lessons, quizzes, and progress tracking.",
                description:
                    "CamerSchools needed a scalable, offline-capable learning platform that could serve students across Cameroon, including those with limited internet access. We built a Progressive Web App with service workers for offline support, video streaming via Cloudinary, and an adaptive quiz engine. The platform supports both English and French, handles 10,000+ concurrent students, and integrates Mobile Money for subscription payments.",
                category: ProjectCategory.WEB_DEVELOPMENT,
                tags: ["Next.js", "PWA", "Cloudinary", "Mobile Money", "i18n", "Service Workers"],
                status: ProjectStatus.PUBLISHED,
                clientName: "CamerSchools",
                clientCountry: "Cameroon",
                clientIndustry: "EdTech",
                coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
                images: [
                    "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&q=80",
                ],
                techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudinary", "PostgreSQL", "PWA"],
                duration: "5 months",
                deliveredAt: new Date("2024-06-01"),
                liveUrl: "https://camerschools.cm",
                featured: true,
                order: 2,
                metaTitle: "CamerSchools E-Learning Platform — GTS Project",
                metaDescription: "Offline-capable e-learning PWA for Cameroonian students, built by Godwin Tech Solutions.",
            },

            // ─────────────────────────────────────────
            // APP DEVELOPMENT
            // ─────────────────────────────────────────
            {
                title: "AfriRide Driver & Passenger App",
                slug: "afriride-driver-passenger-app",
                summary:
                    "Cross-platform ride-hailing mobile app for Douala and Douala with real-time GPS tracking and Mobile Money payments.",
                description:
                    "AfriRide approached us to build a full ride-hailing solution for the Cameroonian market. We delivered two React Native apps — one for drivers and one for passengers — with real-time GPS tracking via Google Maps SDK, dynamic pricing, in-app chat, and MTN/Orange Mobile Money integration. The driver app includes earnings dashboards and trip history. The passenger app features ride scheduling and SOS emergency alerts.",
                category: ProjectCategory.APP_DEVELOPMENT,
                tags: ["React Native", "Expo", "Google Maps", "Mobile Money", "Socket.io", "Node.js"],
                status: ProjectStatus.PUBLISHED,
                clientName: "AfriRide Technologies",
                clientCountry: "Cameroon",
                clientIndustry: "Transportation",
                coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
                images: [
                    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
                ],
                techStack: ["React Native", "Expo", "Node.js", "Socket.io", "PostgreSQL", "Google Maps SDK"],
                duration: "6 months",
                deliveredAt: new Date("2024-09-20"),
                featured: true,
                order: 3,
                metaTitle: "AfriRide Mobile App — GTS Project",
                metaDescription: "Cross-platform ride-hailing app for Cameroon built by Godwin Tech Solutions.",
            },

            {
                title: "FarmConnect Mobile App",
                slug: "farmconnect-mobile-app",
                summary:
                    "An AgriTech app connecting smallholder farmers directly to buyers, with crop listings, price tracking, and logistics coordination.",
                description:
                    "FarmConnect needed a simple yet powerful mobile app that could work on low-end Android devices with poor network conditions. We built a lightweight React Native app with aggressive caching, offline-first data sync, and WhatsApp integration for farmer communication. The app supports Pidgin, French, and English. Buyers can browse crop listings, place orders, and coordinate pickup through an integrated logistics module.",
                category: ProjectCategory.APP_DEVELOPMENT,
                tags: ["React Native", "Offline-first", "WhatsApp API", "Android", "Multilingual"],
                status: ProjectStatus.PUBLISHED,
                clientName: "FarmConnect Africa",
                clientCountry: "Cameroon",
                clientIndustry: "AgriTech",
                coverImage: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80",
                images: [],
                techStack: ["React Native", "Expo", "SQLite", "Node.js", "WhatsApp Cloud API"],
                duration: "3 months",
                deliveredAt: new Date("2024-04-10"),
                featured: false,
                order: 8,
                metaTitle: "FarmConnect AgriTech App — GTS Project",
                metaDescription: "Offline-first AgriTech mobile app for Cameroonian farmers built by Godwin Tech Solutions.",
            },

            // ─────────────────────────────────────────
            // E-COMMERCE
            // ─────────────────────────────────────────
            {
                title: "ShopCamer Multi-Vendor Marketplace",
                slug: "shopcamer-multi-vendor-marketplace",
                summary:
                    "A full-featured multi-vendor e-commerce marketplace for Cameroonian sellers with Mobile Money and card payment support.",
                description:
                    "ShopCamer is a Jumia-style marketplace built from the ground up for the Cameroonian market. It features vendor onboarding with KYC verification, product listing management, inventory tracking, and a split-payment system that automatically distributes funds between vendors and the platform. Customers can pay via MTN Mobile Money, Orange Money, or Visa/Mastercard. We also built an admin super-dashboard for platform management and dispute resolution.",
                category: ProjectCategory.ECOMMERCE,
                tags: ["Next.js", "Stripe", "Mobile Money", "Multi-vendor", "PostgreSQL", "Redis"],
                status: ProjectStatus.PUBLISHED,
                clientName: "ShopCamer Ltd",
                clientCountry: "Cameroon",
                clientIndustry: "E-Commerce",
                coverImage: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80",
                images: [
                    "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&q=80",
                ],
                techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Stripe", "Smobilpay"],
                duration: "7 months",
                deliveredAt: new Date("2024-11-01"),
                liveUrl: "https://shopcamer.cm",
                featured: true,
                order: 4,
                metaTitle: "ShopCamer Marketplace — GTS Project",
                metaDescription: "Multi-vendor e-commerce marketplace for Cameroon built by Godwin Tech Solutions.",
            },

            // ─────────────────────────────────────────
            // ENTERPRISE SOFTWARE
            // ─────────────────────────────────────────
            {
                title: "BilinguaSchool Management System",
                slug: "bilinguaschool-management-system",
                summary:
                    "A complete school management system for a bilingual secondary school — admissions, grades, fees, timetables, and parent portals.",
                description:
                    "BilinguaSchool needed to replace their paper-based operations with a modern digital system. We delivered a comprehensive school management platform covering student admissions, class scheduling, grade management, fee collection with Mobile Money integration, staff payroll, and a parent portal for real-time updates. The system supports both English and French interfaces and is used by 1,200+ students and 80 staff members daily.",
                category: ProjectCategory.ENTERPRISE_SOFTWARE,
                tags: ["Next.js", "PostgreSQL", "Mobile Money", "Bilingual", "Role-based Access"],
                status: ProjectStatus.PUBLISHED,
                clientName: "Bilingual Academy Douala",
                clientCountry: "Cameroon",
                clientIndustry: "Education",
                coverImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80",
                images: [
                    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
                ],
                techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Nodemailer"],
                duration: "5 months",
                deliveredAt: new Date("2024-03-15"),
                featured: false,
                order: 6,
                metaTitle: "BilinguaSchool Management System — GTS Project",
                metaDescription: "Complete school management system for a bilingual secondary school, built by Godwin Tech Solutions.",
            },

            // ─────────────────────────────────────────
            // CLOUD SERVICES
            // ─────────────────────────────────────────
            {
                title: "HealthLink Clinic Cloud Migration",
                slug: "healthlink-clinic-cloud-migration",
                summary:
                    "Full cloud migration and infrastructure setup for a network of 12 private clinics, moving from local servers to a secure cloud environment.",
                description:
                    "HealthLink operates 12 clinics across Cameroon and needed to migrate their patient records, billing systems, and appointment scheduling from aging local servers to a secure, redundant cloud infrastructure. We designed and executed a zero-downtime migration to a VPS cluster with automated daily backups, SSL termination, CI/CD pipelines, and a private VPN for inter-clinic communication. HIPAA-aligned security controls were implemented throughout.",
                category: ProjectCategory.CLOUD_SERVICES,
                tags: ["VPS", "Docker", "Nginx", "CI/CD", "PostgreSQL", "Backup Systems", "SSL"],
                status: ProjectStatus.PUBLISHED,
                clientName: "HealthLink Medical Group",
                clientCountry: "Cameroon",
                clientIndustry: "Healthcare",
                coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
                images: [],
                techStack: ["Docker", "Nginx", "GitHub Actions", "PostgreSQL", "Certbot", "Bash"],
                duration: "2 months",
                deliveredAt: new Date("2024-07-01"),
                featured: false,
                order: 9,
                metaTitle: "HealthLink Cloud Migration — GTS Project",
                metaDescription: "Secure cloud migration for a network of 12 clinics in Cameroon, executed by Godwin Tech Solutions.",
            },

            // ─────────────────────────────────────────
            // UI/UX DESIGN
            // ─────────────────────────────────────────
            {
                title: "NexBank Mobile Banking UI",
                slug: "nexbank-mobile-banking-ui",
                summary:
                    "Complete UI/UX design system and interactive prototype for a modern mobile banking app targeting francophone Africa.",
                description:
                    "NexBank commissioned us to design a world-class mobile banking experience for their upcoming app. We conducted user research with 200+ participants across Cameroon, Côte d'Ivoire, and Senegal, then delivered a comprehensive design system including 120+ components, 40+ screen designs, interactive Figma prototypes, and a full design handoff package. The UI scored 94/100 in usability testing and received praise for its clarity and accessibility.",
                category: ProjectCategory.UI_UX_DESIGN,
                tags: ["Figma", "Design System", "Prototype", "User Research", "Mobile UI", "Fintech"],
                status: ProjectStatus.PUBLISHED,
                clientName: "NexBank Africa",
                clientCountry: "Cameroon",
                clientIndustry: "Banking",
                coverImage: "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?w=1200&q=80",
                images: [
                    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80",
                ],
                techStack: ["Figma", "FigJam", "Maze (Testing)", "Zeplin"],
                duration: "2 months",
                deliveredAt: new Date("2024-05-20"),
                featured: false,
                order: 7,
                metaTitle: "NexBank Mobile Banking UI — GTS Project",
                metaDescription: "Mobile banking UI/UX design system for francophone Africa, designed by Godwin Tech Solutions.",
            },

            // ─────────────────────────────────────────
            // AUTOMATION & AI
            // ─────────────────────────────────────────
            {
                title: "TeleCam AI Customer Support Bot",
                slug: "telecam-ai-customer-support-bot",
                summary:
                    "An AI-powered WhatsApp and web chatbot handling 80% of customer support queries automatically for a major telecom company.",
                description:
                    "TeleCam's support team was overwhelmed with repetitive queries about data bundles, billing, and network issues. We built an AI chatbot powered by GPT-4 with a custom knowledge base of 5,000+ FAQ entries, integrated into both WhatsApp Business API and their website live chat. The bot handles intent classification, multilingual responses (French/English/Pidgin), and escalates complex issues to human agents with full context. Result: 80% query resolution without human intervention.",
                category: ProjectCategory.AUTOMATION_AI,
                tags: ["OpenAI GPT-4", "WhatsApp API", "Node.js", "NLP", "Chatbot", "Multilingual"],
                status: ProjectStatus.PUBLISHED,
                clientName: "TeleCam Networks",
                clientCountry: "Cameroon",
                clientIndustry: "Telecommunications",
                coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
                images: [],
                techStack: ["OpenAI API", "Node.js", "WhatsApp Cloud API", "PostgreSQL", "Redis"],
                duration: "3 months",
                deliveredAt: new Date("2024-10-05"),
                featured: true,
                order: 5,
                metaTitle: "TeleCam AI Support Bot — GTS Project",
                metaDescription: "AI-powered WhatsApp customer support bot for a Cameroonian telecom, built by Godwin Tech Solutions.",
            },

            // ─────────────────────────────────────────
            // DIGITAL MARKETING
            // ─────────────────────────────────────────
            {
                title: "LuxeHotel Douala SEO & Ad Campaign",
                slug: "luxehotel-douala-seo-campaign",
                summary:
                    "A 6-month SEO and Google Ads campaign that tripled organic traffic and doubled direct bookings for a 5-star hotel in Douala.",
                description:
                    "LuxeHotel Douala was losing bookings to OTA platforms like Booking.com. We conducted a full technical SEO audit, rebuilt their site architecture, created 60+ pieces of location-optimised content, and launched targeted Google Ads campaigns for corporate travellers and event planners. We also set up GA4, Google Tag Manager, and a conversion tracking dashboard. Results after 6 months: 312% increase in organic traffic, 2x direct bookings, and 40% reduction in OTA dependency.",
                category: ProjectCategory.DIGITAL_MARKETING,
                tags: ["SEO", "Google Ads", "GA4", "Content Strategy", "Technical SEO", "Conversion Optimization"],
                status: ProjectStatus.PUBLISHED,
                clientName: "LuxeHotel Douala",
                clientCountry: "Cameroon",
                clientIndustry: "Hospitality",
                coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
                images: [],
                techStack: ["Google Analytics 4", "Google Ads", "Search Console", "Semrush", "GTM"],
                duration: "6 months",
                deliveredAt: new Date("2024-12-01"),
                featured: false,
                order: 10,
                metaTitle: "LuxeHotel SEO Campaign — GTS Project",
                metaDescription: "SEO and Google Ads campaign that tripled traffic for a Douala hotel, managed by Godwin Tech Solutions.",
            },

            // ─────────────────────────────────────────
            // API INTEGRATION
            // ─────────────────────────────────────────
            {
                title: "PayFlow Mobile Money Gateway",
                slug: "payflow-mobile-money-gateway",
                summary:
                    "A unified payment gateway SDK integrating MTN Mobile Money, Orange Money, and Visa/Mastercard for Cameroonian businesses.",
                description:
                    "Multiple GTS clients needed Mobile Money integrations individually. We built PayFlow — a reusable Node.js SDK and REST API that abstracts MTN MoMo, Orange Money, and international card payments behind a single clean API. It handles payment initiation, webhooks, reconciliation, refunds, and generates transaction reports. The SDK is now used across 8 GTS-built platforms and processes thousands of transactions monthly.",
                category: ProjectCategory.API_INTEGRATION,
                tags: ["Node.js", "REST API", "MTN MoMo", "Orange Money", "Webhooks", "SDK"],
                status: ProjectStatus.PUBLISHED,
                clientName: "Internal GTS Product",
                clientCountry: "Cameroon",
                clientIndustry: "Fintech",
                coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
                images: [],
                techStack: ["Node.js", "TypeScript", "Express", "PostgreSQL", "MTN MoMo API", "Orange API"],
                duration: "2 months",
                deliveredAt: new Date("2023-11-15"),
                featured: false,
                order: 11,
                metaTitle: "PayFlow Mobile Money Gateway — GTS Project",
                metaDescription: "Unified Mobile Money payment gateway SDK for Cameroon, built by Godwin Tech Solutions.",
            },

            // ─────────────────────────────────────────
            // BRANDING
            // ─────────────────────────────────────────
            {
                title: "AgroVerde Brand Identity",
                slug: "agroverde-brand-identity",
                summary:
                    "Complete brand identity design for an organic food startup — logo, visual system, packaging, and digital assets.",
                description:
                    "AgroVerde is an organic food startup launching across Central Africa. We created their entire brand identity from scratch: logo design (3 concepts, final delivery), color system, typography guide, packaging design for 12 product SKUs, social media templates, business cards, and a brand book. The identity conveys freshness, trust, and African pride — using earth tones, clean typography, and local visual cues. The brand launched to overwhelmingly positive reception at the Douala Food Expo 2024.",
                category: ProjectCategory.BRANDING,
                tags: ["Logo Design", "Brand Identity", "Packaging", "Figma", "Illustrator", "Brand Book"],
                status: ProjectStatus.PUBLISHED,
                clientName: "AgroVerde Foods",
                clientCountry: "Cameroon",
                clientIndustry: "Food & Agriculture",
                coverImage: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
                images: [],
                techStack: ["Adobe Illustrator", "Figma", "Adobe Photoshop"],
                duration: "6 weeks",
                deliveredAt: new Date("2024-02-28"),
                featured: false,
                order: 12,
                metaTitle: "AgroVerde Brand Identity — GTS Project",
                metaDescription: "Complete brand identity for an organic food startup in Cameroon, created by Godwin Tech Solutions.",
            },
        ],
    });

    console.log(`✅ Seeded ${projects.count} projects successfully\n`);

    // Summary
    console.log("📊 Seed Summary:");
    console.log(`   Total projects: ${projects.count}`);
    console.log(`   Featured projects: 5`);
    console.log(`   Categories covered: 12`);
    console.log("\n🚀 GTS database is ready!\n");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });