import { Navbar } from "@/features/landing/components/Navbar";
import { Hero } from "@/features/landing/components/Hero";
import { TrustedCompanies } from "@/features/landing/components/TrustedCompanies";
import { FeaturesGrid } from "@/features/landing/components/FeaturesGrid";
import { AIShowcase } from "@/features/landing/components/AIShowcase";
import { HowItWorks } from "@/features/landing/components/HowItWorks";
import { Benefits } from "@/features/landing/components/Benefits";
import { Testimonials } from "@/features/landing/components/Testimonials";
import { PricingPreview } from "@/features/landing/components/PricingPreview";
import { FAQ } from "@/features/landing/components/FAQ";
import { CTA } from "@/features/landing/components/CTA";
import { Footer } from "@/features/landing/components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-blue-200 dark:selection:bg-blue-900">
      <Navbar />
      <Hero />
      <TrustedCompanies />
      <FeaturesGrid />
      <AIShowcase />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <PricingPreview />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
