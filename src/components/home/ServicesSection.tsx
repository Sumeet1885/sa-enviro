import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { services } from "@/constants/siteData";

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
            <StaggerItem key={service.id}>
              <div className="group relative h-full">
                {/* Main card */}
                <div className="relative bg-white dark:bg-card rounded-2xl overflow-hidden border border-blue-100 dark:border-blue-950/50 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 h-full hover:-translate-y-1">
                  {/* Subtle water ripple effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-cyan-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-cyan-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Image container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Clean blue overlay - water effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-blue-500/10 to-transparent" />
                  </div>

                  {/* Content section */}
                  <div className="relative p-6 bg-white dark:bg-card">
                    {/* Animated line at the top of content - MAIN FEATURE */}
                    <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                    </div>

                    {/* Small water drop icon decoration */}
                    {/* <div className="absolute -top-3 right-6 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-blue-500/50" /> */}

                    {/* Title */}
                    <h3 className="relative text-xl font-semibold text-slate-900 dark:text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 inline-block">
                      {service.title}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Simple CTA link */}
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-sm group/link hover:gap-3 transition-all duration-300"
                    >
                      Learn More
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                    </Link>
                  </div>

                  {/* Subtle left border accent */}
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-500 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 rounded-r" />
                </div>
              </div>
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
