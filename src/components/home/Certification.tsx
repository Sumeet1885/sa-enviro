import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

import { certifications } from "@/constants/siteData";

export const Certification_Section = () => {
  return (
    <>
      {/* Certifications */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <AnimatedSection className="text-center mb-12">
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
