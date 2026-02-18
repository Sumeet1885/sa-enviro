import { useState } from "react";

import { SEO } from "@/components/layout/SEO";
import { AnimatedSection } from "@/components/motion";
import { siteConfig, seoData } from "@/constants/siteData";
import LogoShowcase from "@/components/Sections/Client_Show";
import HeroSection from "@/components/Sections/HeroSection";

const Client = () => {
  return (
    <>
      <SEO
        title={seoData.clients.title}
        description={seoData.clients.description}
      />

      {/* Hero */}
      <HeroSection
        title="Our Clients"
        heading="Our Esteemed Clients"
        subtitle="Trusted by Leading Industries for Water, Wastewater & Environmental Engineering Solutions"
      />
      <LogoShowcase />
    </>
  );
};

export default Client;
