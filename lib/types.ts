// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Shared TypeScript Types
//   Fully standalone — no dependency on @prisma/client.
//   Mirrors the Prisma schema exactly so types match once
//   `prisma generate` is run.
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────

export type ProjectStatus =
    | "PUBLISHED"
    | "DRAFT"
    | "ARCHIVED";

export type ProjectCategory =
    | "WEB_DEVELOPMENT"
    | "APP_DEVELOPMENT"
    | "CLOUD_SERVICES"
    | "ECOMMERCE"
    | "UI_UX_DESIGN"
    | "DIGITAL_MARKETING"
    | "IT_CONSULTANCY"
    | "API_INTEGRATION"
    | "ENTERPRISE_SOFTWARE"
    | "AUTOMATION_AI"
    | "CYBERSECURITY"
    | "BRANDING";

// ─────────────────────────────────────────
// PROJECT — mirrors Prisma model
// ─────────────────────────────────────────

export type Project = {
    id:              string;
    createdAt:       Date;
    updatedAt:       Date;
    title:           string;
    slug:            string;
    summary:         string;
    description:     string;
    category:        ProjectCategory;
    tags:            string[];
    status:          ProjectStatus;
    clientName:      string | null;
    clientCountry:   string | null;
    clientIndustry:  string | null;
    coverImage:      string;
    images:          string[];
    videoUrl:        string | null;
    techStack:       string[];
    duration:        string | null;
    deliveredAt:     Date   | null;
    liveUrl:         string | null;
    caseStudyUrl:    string | null;
    githubUrl:       string | null;
    featured:        boolean;
    order:           number;
    metaTitle:       string | null;
    metaDescription: string | null;
};

export type ProjectCard = Pick<
    Project,
    | "id" | "title" | "slug" | "summary" | "category" | "tags"
    | "status" | "coverImage" | "clientName" | "clientCountry"
    | "clientIndustry" | "techStack" | "duration" | "deliveredAt"
    | "liveUrl" | "featured" | "order"
>;

export type ProjectMeta = Pick<
    Project,
    | "title" | "slug" | "summary" | "coverImage"
    | "metaTitle" | "metaDescription" | "category" | "deliveredAt"
>;

export type CreateProjectInput = Omit<Project, "id" | "createdAt" | "updatedAt">;
export type UpdateProjectInput = Partial<CreateProjectInput>;

// ─────────────────────────────────────────
// FILTERS
// ─────────────────────────────────────────

export type ProjectCategoryValue = ProjectCategory;
export type ProjectStatusValue   = ProjectStatus;

export interface CategoryMeta {
    value:       ProjectCategoryValue;
    label:       string;
    description: string;
    icon:        string;
    color:       string;
}

export interface ProjectFilters {
    category?: ProjectCategoryValue | "ALL";
    status?:   ProjectStatusValue;
    featured?: boolean;
    search?:   string;
    page?:     number;
    limit?:    number;
}

// ─────────────────────────────────────────
// API RESPONSES
// ─────────────────────────────────────────

export interface ApiSuccess<T> {
    success: true;
    data:    T;
    message?: string;
}

export interface ApiError {
    success: false;
    error:   string;
    code?:   string;
    details?: Record<string, string[]>;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface PaginatedResponse<T> {
    success: true;
    data:    T[];
    pagination: {
        page:        number;
        limit:       number;
        total:       number;
        totalPages:  number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

// ─────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────

export type ServiceInterest =
    | "web-development" | "app-development" | "cloud-services"
    | "ecommerce" | "ui-ux-design" | "digital-marketing"
    | "it-consultancy" | "api-integration" | "enterprise-software"
    | "automation-ai" | "cybersecurity" | "branding" | "other";

export type BudgetRange =
    | "under-500k" | "500k-1m" | "1m-5m"
    | "5m-10m" | "above-10m" | "discuss";

export interface ContactFormData {
    name:     string;
    email:    string;
    phone?:   string;
    company?: string;
    service:  ServiceInterest;
    budget?:  BudgetRange;
    message:  string;
}

// ─────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────

export interface NavItem {
    label:        string;
    href:         string;
    description?: string;
    icon?:        string;
    badge?:       string;
    external?:    boolean;
    children?:    NavItem[];
}

export interface FooterLink {
    label:     string;
    href:      string;
    external?: boolean;
}

export interface FooterSection {
    title: string;
    links: FooterLink[];
}

// ─────────────────────────────────────────
// SITE CONFIG
// ─────────────────────────────────────────

export interface SocialLinks {
    twitter?:   string;
    linkedin?:  string;
    github?:    string;
    instagram?: string;
    facebook?:  string;
    whatsapp?:  string;
}

export interface SiteConfig {
    name:        string;
    tagline:     string;
    description: string;
    url:         string;
    email:       string;
    phone:       string;
    whatsapp:    string;
    location:    string;
    socials:     SocialLinks;
    foundedYear: number;
}

// ─────────────────────────────────────────
// HOMEPAGE SECTIONS
// ─────────────────────────────────────────

export interface StatItem {
    value:        number;
    suffix?:      string;
    label:        string;
    description?: string;
}

export interface ServiceItem {
    title:       string;
    description: string;
    icon:        string;
    href:        string;
    features:    string[];
    color?:      string;
}

export interface TestimonialItem {
    id:               string;
    name:             string;
    role:             string;
    company:          string;
    country:          string;
    avatar?:          string;
    quote:            string;
    rating:           number;
    projectCategory?: ProjectCategoryValue;
}

export interface ProcessStep {
    step:        number;
    title:       string;
    description: string;
    icon:        string;
}

export interface TechBadge {
    name:     string;
    icon?:    string;
    category: "frontend" | "backend" | "mobile" | "cloud" | "database" | "tool";
}

// ─────────────────────────────────────────
// ADMIN
// ─────────────────────────────────────────

export interface AdminLoginInput {
    email:    string;
    password: string;
}

export interface AdminSession {
    id:        string;
    email:     string;
    expiresAt: Date;
}

export interface AdminDashboardStats {
    totalProjects:     number;
    publishedProjects: number;
    draftProjects:     number;
    featuredProjects:  number;
    categoryCounts:    Record<ProjectCategoryValue, number>;
}

// ─────────────────────────────────────────
// UTILITY TYPES
// ─────────────────────────────────────────

export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Nullable<T> = T | null | undefined;
export type Children      = { children: React.ReactNode };
export type WithClassName = { className?: string };
export type PropsWithClassName = Children & WithClassName;