import { useState } from "react";

import { SEO } from "@/components/layout/SEO";
import { AnimatedSection } from "@/components/motion";
import { siteConfig, seoData } from "@/constants/siteData";
import LogoShowcase from "@/components/ui/Used/Client_Show";

const Client = () => {
  return (
    <>
      <SEO
        title={seoData.contact.title}
        description={seoData.contact.description}
      />

      {/* Hero */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-water-deep to-water-ocean text-primary-foreground">
        <div className="container-wide">
          <AnimatedSection className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-water-sky/20 text-water-sky text-sm font-medium mb-4">
              Our Client
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              The Client that we have worked in the past.
            </h1>
            <p className="text-water-light/90 text-lg">
              See how we’ve helped ambitious brands turn bold ideas into
              measurable results.
            </p>
          </AnimatedSection>
        </div>
      </section>
      <LogoShowcase />
    </>
  );
};

export default Client;
