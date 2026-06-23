import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { siteConfig } from "@/constants/siteData";
import ServicesPhoto from "@/assets/Services.jpg"

import { Droplets, Recycle, ShieldCheck, Settings } from "lucide-react";

// Three hero feature pills
const FEATURES = [
  {
    icon: Droplets,
    label: "Water Treatment",
    sub: "Advanced WTP, RO, Softeners & DM Plants.",
    color: "text-blue-500",
    bgColor: "bg-blue-50/80",
  },
  {
    icon: Recycle,
    label: "Wastewater Management",
    sub: "Efficient STP, ETP, and ZLD solutions.",
    color: "text-green-600",
    bgColor: "bg-green-50/80",
  },
  {
    icon: ShieldCheck,
    label: "AMC Services",
    sub: "Reliable maintenance & operational support.",
    color: "text-amber-600",
    bgColor: "bg-amber-50/80",
  },
];

export default function ServicesHero() {
  return (
    <section className="py-24 lg:py-20 relative overflow-hidden bg-white">
      {/* Subtle radial tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 20% 60%, hsl(var(--primary) / 0.05) 0%, transparent 60%), " +
            "radial-gradient(ellipse at 80% 10%, hsl(var(--water-sky) / 0.06) 0%, transparent 50%)",
        }}
      />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection className="max-w-3xl order-2 lg:order-1">
          

          {/* Heading */}
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5 text-foreground">
            Comprehensive Environmental{" "}
            <span
              className="relative inline-block"
              style={{ color: "#005DE8" }}
            >
              Services
              <svg
                viewBox="0 0 240 12"
                className="absolute -bottom-1 left-0 w-full overflow-visible"
                aria-hidden="true"
              >
                <path
                  d="M4 8 Q60 2 120 6 Q180 10 236 4"
                  stroke="#005DE8"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
            </span>
          </h1>

          {/* Sub-heading */}
          <p className="text-lg max-w-xl leading-relaxed mb-8 text-muted-foreground">
            We provide end-to-end solutions for Water and Wastewater Treatment, Zero Liquid Discharge, and comprehensive Annual Maintenance Contracts (AMC) tailored to your industry needs.
          </p>


          
          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div 
                  key={f.label} 
                  className="flex items-start gap-2.5 p-3 rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 w-full"
                >
                  <div className={`p-2 rounded-xl ${f.bgColor} shrink-0 mt-0.5`}>
                    <Icon className={`w-5 h-5 ${f.color}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">
                      {f.label}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {f.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 14px 28px rgba(13, 114, 233, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById("core-services")?.scrollIntoView({ behavior: "smooth" });
              }}
              id="hero-explore-services-btn"
              style={{
                background: '#0D72E9',
                color: 'white',
                border: 'none',
                borderRadius: '100px',
                padding: '14px 32px',
                fontSize: '13px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(13, 114, 233, 0.35)',
                letterSpacing: '0.5px',
              }}
            >
              Explore Our Services
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>

            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(11,27,61,0.04)',
                }}
                whileTap={{ scale: 0.95 }}
                id="hero-contact-us-btn"
                style={{
                  background: 'white',
                  color: '#0B1B3D',
                  border: '1px solid #E2E8F0',
                  borderRadius: '100px',
                  padding: '14px 32px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                Contact Us
              </motion.button>
            </Link>
          </div>
        </AnimatedSection>

        {/* Right Column Visual — Photo Collage */}
        <AnimatedSection delay={0.2} className="relative w-full order-1 lg:order-2 hidden md:block">
          <style>{`
            @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
            @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}</style>
          <div style={{ position: "relative", height: 600, width: "100%", maxWidth: 550, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", top: 20, right: 0, zIndex: 1, display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 9, opacity: 0.3 }}>
              {Array.from({ length: 20 }).map((_, i) => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "hsl(var(--primary))" }} />)}
            </div>
            
            {/* The Main "Busy" Card */}
            <div style={{ position: "absolute", left: 0, top: 40, width: 380, height: 480, borderRadius: 16, overflow: "hidden", zIndex: 10, boxShadow: "0 24px 60px rgba(0,0,0,0.15)" }}>
              <img src={ServicesPhoto} alt="Team collaborating on services" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
                <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", borderRadius: 12, padding: "20px 32px", textAlign: "center", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <p className="font-display" style={{ fontFamily: "var(--font-family-serif)", fontSize: "var(--text-card-title-size)", fontWeight: 800, color: "#FFF", lineHeight: 1.2, letterSpacing: "0.04em" }}>SA ENVIRO<br />SOLUTIONS</p>
                </div>
              </div>
            </div>

            {/* Services Floating Card */}
            <div style={{ position: "absolute", top: 0, right: 10, width: 180, height: 180, borderRadius: 12, overflow: "hidden", zIndex: 3, boxShadow: "0 12px 40px rgba(0,0,0,0.12)", animation: "float 7s ease-in-out infinite" }}>
              <div style={{ width: "100%", height: "100%", background: "linear-gradient(145deg, hsl(var(--background)), hsl(var(--muted)))", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }}>
                <Settings className="w-12 h-12 text-primary" style={{ animation: "spin-slow 20s linear infinite" }} />
                <p style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--text-badge-text-size)", color: "hsl(var(--foreground))", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Services</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
  );
}
