import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/motion";
import { siteConfig } from "@/constants/siteData";

export const CTASection = () => {
  return (
    <section className="section-padding dark-section relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-water-sky rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-water-light rounded-full blur-3xl animate-wave" />
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to Transform Your Water Treatment?
            </h2>
            <p className="subtext text-lg mb-8 max-w-2xl mx-auto">
              Get in touch with our experts today for a free consultation and
              discover the perfect water treatment solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary-foreground text-primary  font-semibold"
              >
                <Link to="/contact">
                  Get Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-water-light/30 bg-water-light/10"
              >
                <a href={`tel:${siteConfig.contact.phone}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Now
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
