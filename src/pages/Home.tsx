import { lazy, Suspense } from "react";
import { SEO } from "@/components/layout/SEO";
import { HeroSection, StatsSection } from "@/components/home";
import { seoData } from "@/constants/siteData";

const AboutSection = lazy(() => import("@/components/home/AboutSection").then(m => ({ default: m.AboutSection })));
const BrochureSection = lazy(() => import("@/components/home/BrochureSection").then(m => ({ default: m.BrochureSection })));
const ServicesSection = lazy(() => import("@/components/home/ServicesSection").then(m => ({ default: m.ServicesSection })));
const WhyChooseUsSection = lazy(() => import("@/components/home/WhyChooseUsSection").then(m => ({ default: m.WhyChooseUsSection })));
const Certification_Section = lazy(() => import("@/components/home/Certification").then(m => ({ default: m.Certification_Section })));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const CTASection = lazy(() => import("@/components/home/CTASection").then(m => ({ default: m.CTASection })));

const Home = () => {
  return (
    <>
      <SEO title={seoData.home.title} description={seoData.home.description} />
      <HeroSection />
      <StatsSection />
      <Suspense fallback={<div className="min-h-[100px]" />}>
        <AboutSection />
        <BrochureSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <Certification_Section />
        <TestimonialsSection />
      </Suspense>
    </>
  );
};

export default Home;
