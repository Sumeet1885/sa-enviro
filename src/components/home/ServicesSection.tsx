import { Link } from "react-router-dom";
import { ArrowRight} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AnimatedSection,
} from "@/components/motion";
import { services } from "@/constants/siteData";
import { ServiceCard } from "@/components/ui/ServiceCard";

export const ServicesSection = () => {
  const featuredServices = services.slice(0, 6);

  return (
    <section className="section-padding bg-muted/30 light-section">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full gradient-water-deep text-sm font-medium mb-4">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold  mb-6">
              Comprehensive{" "}
              <span className="gradient-text">Water Solutions</span>
            </h2>
            <p className=" text-lg">
              SA Enviro Solutions provides quality and customized services in
              Water Treatment, Zero Liquid Discharge, Air Pollution Control,
              Energy, Safety & Waste Management.
            </p>
          </AnimatedSection>
        </div>

        <div className="section-padding bg-background line-clamp-3">
        <div className="container-wide">
          <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {featuredServices.map((service) => (
              <div key={service.id}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>

        <AnimatedSection className="text-center">
          <Button asChild size="lg">
            <Link to="/services">
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};
