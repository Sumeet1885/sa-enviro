import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/layout/SEO";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { siteConfig, seoData } from "@/constants/siteData";
import TeamSlider from "@/components/ui/Used/Team_Section";
import HeroSection from "@/components/Sections/HeroSection";

const Team = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <SEO
        title={seoData.contact.title}
        description={seoData.contact.description}
      />

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
