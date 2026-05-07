import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 group cursor-default"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                What We Do
              </span>
            </motion.div>
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

        <div className="section-padding bg-background">
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
