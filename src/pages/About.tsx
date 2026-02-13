import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/layout/SEO";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { aboutData, seoData, certifications } from "@/constants/siteData";
import aboutImage from "@/assets/about-hero.jpg";

const About = () => {
  return (
    <>
      <SEO
        title={seoData.about.title}
        description={seoData.about.description}
      />

      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-water-deep to-water-ocean text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={aboutImage}
            alt="About SA Enviro Solutions"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-wide relative z-10">
          <AnimatedSection className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-water-sky/20 text-water-sky text-sm font-medium mb-4">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              Leading Water Treatment Excellence
            </h1>
            <p className="text-water-light/90 text-lg">{aboutData.intro}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection direction="left">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-water">
                <img
                  src={aboutImage}
                  alt="Our Facility"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>

            <div className="space-y-6">
              <AnimatedSection direction="right">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                  Our <span className="gradient-text">Story</span>
                </h2>
              </AnimatedSection>
              <AnimatedSection direction="right" delay={0.1}>
                <p className="text-muted-foreground leading-relaxed">
                  {aboutData.description}
                </p>
              </AnimatedSection>
              <AnimatedSection direction="right" delay={0.2}>
                <p className="text-muted-foreground leading-relaxed">
                  {aboutData.founders}
                </p>
              </AnimatedSection>
              <AnimatedSection direction="right" delay={0.3}>
                <p className="text-muted-foreground leading-relaxed">
                  {aboutData.team}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: "ISO Certified",
                desc: "Quality assured processes",
              },
              {
                icon: Users,
                title: "Expert Team",
                desc: "Qualified professionals",
              },
              {
                icon: Building2,
                title: "Modern Facility",
                desc: "State-of-the-art workshop",
              },
              {
                icon: MapPin,
                title: "Located in Pune",
                desc: "Chinchwad, Maharashtra",
              },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="bg-card rounded-2xl p-6 border border-border card-hover text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

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

      {/* CTA */}
      <section className="py-16 bg-water-deep text-primary-foreground">
        <div className="container-wide text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-display font-bold mb-6">
              Ready to Work With Us?
            </h2>
            <Button
              variant="link"
              asChild
              size="lg"
              className="bg-water-sky hover:bg-water-sea text-water-deep"
            >
              <Link to="/contact">
                Contact Us Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default About;
