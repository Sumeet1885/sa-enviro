import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { services } from "@/constants/siteData";
import { ServiceCard } from "@/components/ui/ServiceCard";

export const ServicesSection = () => {
  const featuredServices = services.slice(0, 6);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-water-light/50 text-water-deep text-sm font-medium mb-4">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Comprehensive{" "}
              <span className="gradient-text">Water Solutions</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              SA Enviro Solutions provides quality and customized services in
              Water Treatment, Zero Liquid Discharge, Air Pollution Control,
              Energy, Safety & Waste Management.
            </p>
          </AnimatedSection>
        </div>

        {/* Services Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredServices.map((service) => (
            //  <StaggerItem key={service.id}>
            //    <div className="group bg-card rounded-2xl overflow-hidden border border-border card-hover h-full">
            //      <div className="aspect-[16/10] overflow-hidden">
            //        <img
            //          src={service.image}
            //          alt={service.title}
            //          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            //          loading="lazy"
            //        />
            //      </div>
            //      <div className="p-6">
            //        <h3 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
            //          {service.title}
            //        </h3>
            //        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            //          {service.description}
            //        </p>
            //        <Link
            //          to="/services"
            //          className="inline-flex items-center text-primary font-medium text-sm hover:gap-2 transition-all"
            //        >
            //          Learn More
            //          <ArrowUpRight className="w-4 h-4 ml-1" />
            //        </Link>
            //      </div>
            //    </div>
            //  </StaggerItem>
            <StaggerItem className="h-[80%]" key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
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
