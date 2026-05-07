import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Building2, MapPin, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/layout/SEO";
import { motion, AnimatePresence } from 'framer-motion';



import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { aboutData, seoData } from "@/constants/siteData";
import aboutImage from "@/assets/about-hero.webp";
import Profile from "@/assets/About.webp"
import { VisionSection } from "@/components/Sections/VisionSection";

const About = () => {

  const [index, setIndex] = useState(0);
  const highlights = ["Story", "Legacy", "Vision", "Mission"];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % highlights.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <SEO
        title={seoData.about.title}
        description={seoData.about.description}
      />

      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-water-deep to-water-ocean text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={aboutImage}
            alt="About SA Enviro Solutions"
            className="w-full h-full object-cover"
            loading="lazy"
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

      <section className="section-padding bg-background relative overflow-hidden py-24">

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">


            <AnimatedSection direction="left">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-water bg-card">
                  <img
                    src={Profile}
                    alt="Our Facility"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </AnimatedSection>


            <div className="space-y-8">
              <div className="space-y-4">

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                    Established in Pune
                  </span>
                </motion.div>


                <AnimatedSection direction="right">
                  <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
                    Our <br className="md:hidden" />
                    <span className="relative inline-block min-w-[180px]">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={highlights[index]}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.5, ease: "circOut" }}
                          className="gradient-text block"
                        >
                          {highlights[index]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </h2>
                </AnimatedSection>
              </div>


              <div className="space-y-6 relative">
                <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-border/30">

                  <motion.div
                    initial={{ top: "-20%", height: "20%" }}
                    animate={{
                      top: ["-20%", "100%"],
                      height: ["20%", "40%", "20%"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute w-full bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_10px_hsl(var(--primary)/0.8)]"
                  />
                </div>
                <AnimatedSection direction="right" delay={0.1}>
                  <p className="text-muted-foreground leading-relaxed text-lg   pl-6">
                    {aboutData.description}
                  </p>
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.2}>
                  <div className="flex items-start gap-4">

                    <div className="mt-1 p-1 rounded-md bg-primary/10 text-primary">

                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="relative z-10 mt-1"
                      >
                        <Sparkles className="w-6 h-6 text-primary fill-primary/20 drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                      </motion.div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {aboutData.founders}
                    </p>
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.3}>
                  <div className="p-6 rounded-xl bg-muted/30 border border-border/50 relative overflow-hidden">

                    <motion.div
                      animate={{
                        opacity: [0.05, 0.15, 0.05],
                        filter: [
                          "drop-shadow(0 0 0px hsl(var(--primary)/0))",
                          "drop-shadow(0 0 20px hsl(var(--primary)/0.4))",
                          "drop-shadow(0 0 0px hsl(var(--primary)/0))"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -right-4 -bottom-4 pointer-events-none"
                    >
                      <Zap className="w-24 h-24 text-primary -rotate-12 fill-primary/10" />
                    </motion.div>
                    <p className="text-muted-foreground leading-relaxed relative z-10">
                      {aboutData.team}
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>


      <VisionSection />

      <section className="section-padding bg-muted/30 py-16">
        <style dangerouslySetInnerHTML={{
          __html: `
        .feature-card:hover .hover-overlay {
          transform: scale(8) translateZ(0);
        }
        .feature-card:hover .icon-circle {
          background-color: hsl(var(--primary));
          border-color: hsl(var(--primary-foreground) / 0.2);
        }
        .feature-card:hover .icon-circle::after {
          background-color: hsl(var(--primary-foreground) / 0.2);
        }
      `}} />

        <div className="container-wide px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Why Choose Us
              </span>
            </motion.div>


            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
            >
              Setting the Standard in <span className="text-primary">Industrial Excellence</span>
            </motion.h2>


            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              Combining state-of-the-art facilities with a decade of expertise to deliver
              world-class solutions right from the heart of Pune.
            </motion.p>


            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1.5 bg-primary rounded-full mx-auto mt-8"
            />
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
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
            },].map((item, i) => (
              <StaggerItem key={i}>
                <div className="feature-card group relative flex flex-col items-center justify-center p-8 bg-card border border-border rounded-tr-[40px] rounded-bl-[40px] rounded-tl-xl rounded-br-xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 min-h-[300px] text-center">


                  <div className="hover-overlay absolute w-24 h-24 bg-primary rounded-full -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out scale-0 group-hover:scale-[8]" />


                  <div className="icon-circle relative z-10 w-28 h-28 rounded-full border-2 border-primary bg-card flex items-center justify-center transition-all duration-300 after:content-[''] after:absolute after:inset-1.5 after:rounded-full after:bg-primary after:transition-colors after:duration-300">
                    <item.icon className="relative z-20 w-10 h-10 text-primary-foreground transition-colors duration-300" />
                  </div>


                  <div className="relative z-10 mt-6 transition-colors duration-300">
                    <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary-foreground mb-2 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-primary-foreground/80 text-sm transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16 bg-water-deep text-primary-foreground">
        <div className="container-wide text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-display font-bold mb-6">
              Ready to Work With Us?
            </h2>
            <Button variant="default" asChild size="lg" className=" ">
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
