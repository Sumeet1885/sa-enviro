import { Quote } from "lucide-react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { testimonials } from "@/constants/siteData";
import { AuthorCard } from "@/components/ui/AuthorCard";

export const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-water-light/50 text-water-deep text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
          </AnimatedSection>
        </div>

        {/* Testimonials Grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            //  <StaggerItem key={i}>
            //    <div className="bg-card rounded-2xl p-8 border border-border card-hover h-full">
            //      <Quote className="w-10 h-10 text-water-sky/30 mb-4" />
            //      <p className="text-foreground text-lg mb-6 leading-relaxed">
            //        "{testimonial.quote}"
            //      </p>
            //      <div className="flex items-center gap-3">
            //        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-water-sea to-water-deep flex items-center justify-center text-primary-foreground font-semibold">
            //          {testimonial.author.charAt(0)}
            //        </div>
            //        <div>
            //          <div className="font-semibold text-foreground">
            //            {testimonial.author}
            //          </div>
            //          <div className="text-sm text-muted-foreground">
            //            Verified Client
            //          </div>
            //        </div>
            //      </div>
            //    </div>
            //  </StaggerItem>
            <StaggerItem key={i}>
              <AuthorCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
