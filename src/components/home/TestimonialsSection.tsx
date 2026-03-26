
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { testimonials } from "@/constants/siteData";
import { AuthorCard } from "@/components/ui/AuthorCard";

export const TestimonialsSection = () => {
  return (
    <section className="section-padding light-section">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full gradient-water-deep text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
          </AnimatedSection>
        </div>

        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <StaggerItem key={i}>
              <AuthorCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
