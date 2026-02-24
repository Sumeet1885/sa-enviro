import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/motion";
import { aboutData } from "@/constants/siteData";
import aboutImage from "@/assets/about-hero.webp";
import { AnimatedImgCard } from "@/components/ui/AnimatedImgCard";

import { useState } from "react";

export const AboutSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className=" section-padding light-section relative overflow-hidden border-border border-2">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection direction="left" className="lg:hidden">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-water">
              <img
                src={aboutImage}
                loading="lazy"
                alt="Our Facility"
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection direction="left" className="hidden lg:block">
            <AnimatedImgCard aboutImage={aboutImage} />
          </AnimatedSection>

          {/* Content */}
          <div>
            <AnimatedSection direction="right">
              <span className="inline-block px-4 py-1.5 rounded-full gradient-water-deep  text-sm font-medium mb-4">
                {aboutData.title}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
                Leading the Way in{" "}
                <span className="gradient-text">Water Treatment</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {aboutData.intro}
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {aboutData.description}
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Award, label: "ISO Certified", value: "Quality" },
                  { icon: Users, label: "Expert Team", value: "30+ Members" },
                  {
                    icon: Wrench,
                    label: "Custom Solutions",
                    value: "Tailored",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 card">
                    <div className="w-10 h-10  flex items-center justify-center">
                      <item.icon className="w-5 h-5 " />
                    </div>
                    <div>
                      <div className="text-sm font-semibold ">{item.value}</div>
                      <div className="text-xs ">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection
              direction="up"
              className="flex items-center justify-between"
              delay={0.3}
            >
              <Button className="button-primary" asChild size="lg">
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};
