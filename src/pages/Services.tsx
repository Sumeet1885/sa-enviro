import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SEO } from "@/components/layout/SEO";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { services, seoData } from "@/constants/siteData";
import { ServiceCard } from "@/components/ui/ServiceCard";
import HeroSection from "@/components/Sections/HeroSection";

const Services = () => {
  return (
    <>
      <SEO
        title={seoData.services.title}
        description={seoData.services.description}
      />

      {/* Hero */}
      <HeroSection
        title="Our Service"
        heading="💧 Integrated Environmental Solutions"
        subtitle="Comprehensive Environmental Engineering Solutions for Water, Wastewater, ZLD & Pollution Control"
      />

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container-wide text-center">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Contact us to discuss your specific requirements and get a
              tailored solution.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact Our Experts
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
