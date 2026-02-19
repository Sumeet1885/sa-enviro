import { useState } from "react";
import { SEO } from "@/components/layout/SEO";
import { seoData } from "@/constants/siteData";
import TeamSlider from "@/components/Sections/Team_Section";
import HeroSection from "@/components/Sections/HeroSection";

const Team = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <SEO title={seoData.team.title} description={seoData.team.description} />

      {/* Hero */}
      <HeroSection
        title="Our Team"
        heading="🤝 The People Behind SAES"
        subtitle="Experienced Professionals Committed to Excellence in Water, Wastewater & Pollution Control"
      />
      <TeamSlider />
    </>
  );
};

export default Team;
