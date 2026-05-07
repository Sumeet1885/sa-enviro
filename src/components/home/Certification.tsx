import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { certifications } from "@/constants/siteData";

export const Certification_Section = () => {
  return (
    <>
      <section className="section-padding bg-background">
        <div className="container-wide">
          <AnimatedSection className="text-center mb-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 group cursor-default"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Certifications
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Our <span className="gradient-text">Certifications</span>
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {certifications.map((cert, i) => (
              <StaggerItem key={i}>
                <div className="bg-card rounded-2xl p-4 border border-border card-hover">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
};
