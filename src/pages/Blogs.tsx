import { useState } from "react";

import { SEO } from "@/components/layout/SEO";
import { AnimatedSection } from "@/components/motion";
import { siteConfig, seoData } from "@/constants/siteData";
import BlogSection from "@/components/ui/Used/BlogSection";
import HeroSection from "@/components/Sections/HeroSection";
import { useParams } from "react-router-dom";
import BlogPage from "@/components/Sections/BlogPage";

const Client = () => {
  const { slug } = useParams();

  console.log(slug);

  return (
    <>
      <SEO
        title={seoData.contact.title}
        description={seoData.contact.description}
      />

      <HeroSection
        title="Our Blogs"
        heading="SAES Knowledge Hub"
        subtitle="Insights, Innovations & Industry Updates in Water, Wastewater, ZLD & Environmental Engineering"
      />
      {!slug ? <BlogSection /> : <BlogPage />}
    </>
  );
};

export default Client;
