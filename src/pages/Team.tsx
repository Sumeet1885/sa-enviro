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
      <section className="py-24 lg:py-32 bg-gradient-to-br from-water-deep to-water-ocean text-primary-foreground">
        <div className="container-wide">
          <AnimatedSection className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-water-sky/20 text-water-sky text-sm font-medium mb-4">
              Our Team
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              The Team That Makes It Happen
            </h1>
            <p className="text-water-light/90 text-lg">
              A team united by expertise, driven by results.
            </p>
          </AnimatedSection>
        </div>
      </section>
      <TeamSlider />
    </>
  );
};

export default Team;
