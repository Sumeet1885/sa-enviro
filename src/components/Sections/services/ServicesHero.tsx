import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { siteConfig } from "@/constants/siteData";

// Three hero feature pills
const FEATURES = [
  {
    icon: "💧",
    label: "Water Treatment",
    sub: "Advanced WTP, RO, Softeners & DM Plants.",
  },
  {
    icon: "♻️",
    label: "Wastewater Management",
    sub: "Efficient STP, ETP, and ZLD solutions.",
  },
  {
    icon: "⚙️",
    label: "AMC Services",
    sub: "Reliable maintenance & operational support.",
  },
];

export default function ServicesHero() {
  return (
    <section className="py-24 lg:py-12 relative overflow-hidden bg-background">
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
          {/* Badge */}
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5"
            style={{
              background: "hsl(var(--primary) / 0.08)",
              color: "hsl(var(--primary))",
              border: "1px solid hsl(var(--primary) / 0.2)",
            }}
          >
            Our Services
          </span>

          {/* Heading */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5 text-foreground">
            Comprehensive Environmental{" "}
            <span
              className="relative inline-block"
              style={{ color: "hsl(var(--primary))" }}
            >
              Services
              <svg
                viewBox="0 0 240 12"
                className="absolute -bottom-1 left-0 w-full overflow-visible"
                aria-hidden="true"
              >
                <path
                  d="M4 8 Q60 2 120 6 Q180 10 236 4"
                  stroke="hsl(var(--primary))"
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
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10">
            {FEATURES.map((f) => (
              <div 
                key={f.label} 
                className="flex items-start gap-3 p-4 rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex-1 min-w-[200px]"
              >
                <span className="text-2xl mt-0.5 shrink-0">{f.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">
                    {f.label}
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {f.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                document.getElementById("core-services")?.scrollIntoView({ behavior: "smooth" });
              }}
              id="hero-explore-services-btn"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--water-deep)), hsl(var(--primary)))",
                boxShadow: "0 6px 24px hsl(var(--primary) / 0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 12px 36px hsl(var(--primary) / 0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 6px 24px hsl(var(--primary) / 0.3)";
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
            </button>

            <Link
              to="/contact"
              id="hero-contact-us-btn"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "transparent",
                color: "hsl(var(--primary))",
                border: "1.5px solid hsl(var(--primary) / 0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "hsl(var(--primary))";
                (e.currentTarget as HTMLElement).style.background =
                  "hsl(var(--primary) / 0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "hsl(var(--primary) / 0.4)";
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
              }}
            >
              Contact Us
            </Link>
          </div>
        </AnimatedSection>

        {/* Right Column Visual — Photo Collage */}
        <AnimatedSection delay={0.2} className="relative w-full order-1 lg:order-2 hidden md:block">
          <style>{`
            @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          `}</style>
          <div style={{ position: "relative", height: 600, width: "100%", maxWidth: 550, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", bottom: 20, right: -10, width: 260, height: 260, background: "hsl(var(--muted))", borderRadius: 4, zIndex: 0 }} />
            <div style={{ position: "absolute", top: 20, right: 0, zIndex: 1, display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 9, opacity: 0.3 }}>
              {Array.from({ length: 20 }).map((_, i) => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "hsl(var(--primary))" }} />)}
            </div>
            
            {/* The Main "Busy" Card */}
            <div style={{ position: "absolute", left: 0, top: 40, width: 380, height: 520, borderRadius: 16, overflow: "hidden", zIndex: 10, boxShadow: "0 24px 60px rgba(0,0,0,0.15)" }}>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team collaborating on services" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
                <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", borderRadius: 12, padding: "20px 32px", textAlign: "center", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <p className="font-display" style={{ fontSize: 28, fontWeight: 800, color: "#FFF", lineHeight: 1.2, letterSpacing: "0.04em" }}>SAES<br />ENVIRO<br />SOLUTIONS</p>
                </div>
              </div>
            </div>

            {/* Services Floating Card */}
            <div style={{ position: "absolute", top: 0, right: 10, width: 180, height: 180, borderRadius: 12, overflow: "hidden", zIndex: 3, boxShadow: "0 12px 40px rgba(0,0,0,0.12)", animation: "float 7s ease-in-out infinite" }}>
              <div style={{ width: "100%", height: "100%", background: "linear-gradient(145deg, hsl(var(--background)), hsl(var(--muted)))", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }}>
                <span style={{ fontSize: 44 }}>⚙️</span>
                <p style={{ fontSize: 12, color: "hsl(var(--foreground))", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Services</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
  );
}
