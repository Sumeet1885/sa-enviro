import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Droplets, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroData } from "@/constants/siteData";
import heroImage from "@/assets/hero-water-treatment.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Water Treatment Facility"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-water-sky/20 backdrop-blur-sm border border-water-sky/30 mb-6"
          >
            <Droplets className="w-4 h-4 text-water-sky" />
            <span className="text-sm text-water-light font-medium">
              {heroData.subtitle}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6"
          >
            {heroData.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-water-light/90 mb-8 max-w-2xl"
          >
            {heroData.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-water-sky hover:bg-water-sea text-water-deep font-semibold px-8"
            >
              <Link to={heroData.cta.primary.href}>
                {heroData.cta.primary.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-water-light/30 text-primary-foreground hover:bg-water-light/10"
            >
              <Link to={heroData.cta.secondary.href}>
                {heroData.cta.secondary.text}
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 mt-12"
        >
          {[
            { icon: Shield, text: "ISO Certified" },
            { icon: Clock, text: "On-Time Delivery" },
            { icon: Droplets, text: "Pure Water Solutions" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass"
            >
              <item.icon className="w-4 h-4 text-water-sky" />
              <span className="text-sm text-primary-foreground font-medium">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
