

import { SEO } from "@/components/layout/SEO";

import {  seoData } from "@/constants/siteData";
import BlogsSection from "@/components/Sections/BlogSection";
import HeroSection from "@/components/Sections/HeroSection";
import { useParams } from "react-router-dom";
import BlogPage from "@/components/Sections/BlogPage";

const Client = () => {
  const { slug } = useParams();

  console.log(slug);

  return (
    <>
      <SEO
        title={seoData.blogs.title}
        description={seoData.blogs.description}
      />

      <HeroSection
        title="Our Blogs"
        heading="SAES Knowledge Hub"
        subtitle="Insights, Innovations & Industry Updates in Water, Wastewater, ZLD & Environmental Engineering"
      />
      {!slug ? <BlogsSection /> : <BlogPage />}
    </>
  );
};

export default Client;
