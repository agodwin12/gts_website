// ═══════════════════════════════════════════════════════════════
//   GODWIN TECH SOLUTIONS — Homepage
//   Assembles all homepage sections in order.
//   Server Component — metadata exported here.
// ═══════════════════════════════════════════════════════════════

import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import Navbar          from "@/components/layout/Navbar";
import Footer          from "@/components/layout/Footer";
import HeroSection     from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection    from "@/components/sections/StatsSection";
import ProcessSection  from "@/components/sections/ProcessSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaSection      from "@/components/sections/CtaSection";


// ─────────────────────────────────────────
// PAGE METADATA
// ─────────────────────────────────────────

export const metadata: Metadata = {
  title:       `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  openGraph: {
    title:       `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url:         siteConfig.url,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────

export default function HomePage() {
  return (
      <>
        {/* Navigation */}
        <Navbar />

        {/* Page sections — in visual order */}
          <HeroSection />
          <ServicesSection />
          <StatsSection />
          <ProcessSection />
          <PortfolioSection />
          <TestimonialsSection />
          <CtaSection />

        {/* Footer */}
        <Footer />
      </>
  );
}