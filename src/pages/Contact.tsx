import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SEO } from "@/components/layout/SEO";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { siteConfig, seoData } from "@/constants/siteData";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <SEO
        title={seoData.contact.title}
        description={seoData.contact.description}
      />

      {/* Hero */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-water-deep to-water-ocean text-primary-foreground">
        <div className="container-wide">
          <AnimatedSection className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-water-sky/20 text-water-sky text-sm font-medium mb-4">
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-water-light/90 text-lg">
              Have questions about our water treatment solutions? We'd love to
              hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="left">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Contact Information
                </h2>
              </AnimatedSection>
              <StaggerContainer className="space-y-6">
                <StaggerItem>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Address
                      </h3>
                      <p className="text-muted-foreground">
                        {siteConfig.contact.address}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Phone
                      </h3>
                      <a
                        href={`tel:${siteConfig.contact.phone}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Email
                      </h3>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Business Hours
                      </h3>
                      <p className="text-muted-foreground">
                        Mon - Sat: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="right">
                <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    Send Us a Message
                  </h2>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Thank You!
                      </h3>
                      <p className="text-muted-foreground">
                        We'll get back to you as soon as possible.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Name *
                          </label>
                          <Input placeholder="Your name" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Email *
                          </label>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Phone
                          </label>
                          <Input type="tel" placeholder="+91 00000 00000" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Company
                          </label>
                          <Input placeholder="Company name" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Service Interested In
                        </label>
                        <Input placeholder="e.g., Water Treatment Plant, RO System" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Message *
                        </label>
                        <Textarea
                          placeholder="Tell us about your requirements..."
                          rows={5}
                          required
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full">
                        Send Message
                        <Send className="w-5 h-5 ml-2" />
                      </Button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}

      <section className="h-96 bg-muted/50">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7560.953207737685!2d73.755293!3d18.642597!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b971516a19ef%3A0x3ea59c22a36936fe!2sHarmony%20society!5e0!3m2!1sen!2sus!4v1771304158041!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="SA Enviro Solutions Location"
        ></iframe>
      </section>
    </>
  );
};

export default Contact;
