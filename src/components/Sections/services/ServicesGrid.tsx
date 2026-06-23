import { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import ServiceModal, { ServiceModalData } from "./ServiceModal";
import { services } from "@/constants/siteData";
import { Droplets } from "lucide-react";

// ── TABS ──────────────────────────────────────────────────────────────────────

const TABS = [
  { key: "amc", label: "AMC Services" },
  { key: "general", label: "Other Services" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

// ── SERVICE CARD ──────────────────────────────────────────────────────────────

interface CardProps {
  service: ServiceModalData & { image: string };
  onOpen: (s: ServiceModalData) => void;
  delay?: number;
}

const ServiceGridCard = memo(({ service, onOpen, delay = 0 }: CardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatedSection delay={delay} className="h-full">
      <motion.article
        className="group relative flex flex-col rounded-2xl overflow-hidden bg-card border border-border h-full cursor-pointer"
        style={{
          boxShadow: "0 2px 12px hsl(var(--primary) / 0.06)",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          borderColor: hovered
            ? "hsl(var(--primary) / 0.5)"
            : "hsl(var(--border))",
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{
          y: -6,
          boxShadow: "0 20px 48px hsl(var(--primary) / 0.15)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={() => onOpen(service)}
        tabIndex={0}
        role="button"
        aria-label={`Read more about ${service.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onOpen(service);
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-80 flex-shrink-0 p-2.5">
          <motion.img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="w-full h-full object-cover rounded-md"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: hovered ? "100%" : "-100%" }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
          />
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h2 className="text-base font-bold text-card-foreground leading-snug mb-2">
            {service.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
            {service.description}
          </p>

          {/* Read More Button */}
          <button
            className="rounded-md w-full mt-auto bg-[#005DE8] py-2 px-4 border border-transparent text-center text-sm font-medium text-white transition-all shadow-md hover:shadow-lg focus:bg-[#005DE8]/90 focus:shadow-none active:bg-[#005DE8]/90 hover:bg-[#005DE8]/90 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(service);
            }}
          >
            Read More
          </button>
        </div>
      </motion.article>
    </AnimatedSection>
  );
});

ServiceGridCard.displayName = "ServiceGridCard";

// ── MAIN SERVICES GRID ────────────────────────────────────────────────────────

export default function ServicesGrid() {
  const [activeTab, setActiveTab] = useState<TabKey>("amc");
  const [openService, setOpenService] = useState<ServiceModalData | null>(null);

  const handleOpen = useCallback((s: ServiceModalData) => setOpenService(s), []);
  const handleClose = useCallback(() => setOpenService(null), []);

  const visibleServices = services.filter(
    (s) => (s.category ?? "general") === activeTab
  );

  return (
    <section
      id="core-services"
      className="py-20 relative overflow-hidden"
      style={{ background: "#F8FAFC" }}
    >
      <div className="container-wide">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-10">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div style={{ height: "1px", width: "40px", backgroundColor: "#005DE8", opacity: 0.5 }} />
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#005DE8",
              fontWeight: 600,
              letterSpacing: "1px",
              fontSize: "0.875rem",
              textTransform: "uppercase",
            }}>
              <Droplets size={16} color="#005DE8" fill="#005DE8" />
              What We Do
            </div>
            <div style={{ height: "1px", width: "40px", backgroundColor: "#005DE8", opacity: 0.5 }} />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ color: "#0B1120" }}>
            Our Core <span style={{ color: "#005DE8" }}>Services</span>
          </h2>
          <p className="text-lg sm:text-xl max-w-xl mx-auto" style={{ color: "#64748B" }}>
            End-to-end environmental engineering solutions tailored to your
            unique requirements.
          </p>
        </AnimatedSection>

        {/* Tab Switcher */}
        <AnimatedSection delay={0.1} className="flex justify-center mb-14">
          <div
            className="inline-flex p-1.5 rounded-full gap-1"
            style={{
              background: "rgba(0, 93, 232, 0.05)",
              border: "1px solid rgba(0, 93, 232, 0.1)",
            }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer border-none font-sans"
                  style={{
                    background: isActive
                      ? "#005DE8"
                      : "transparent",
                    color: isActive
                      ? "#ffffff"
                      : "#64748B",
                    boxShadow: isActive
                      ? "0 4px 14px rgba(0, 93, 232, 0.25)"
                      : "none",
                  }}
                  id={`tab-${tab.key}`}
                  aria-selected={isActive}
                  role="tab"
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Cards Grid */}
        {activeTab === "general" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-md max-w-xl mx-auto min-h-[300px]"
            style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)" }}
          >
            <div className="w-16 h-16 rounded-full bg-blue-50/80 flex items-center justify-center mb-6 text-primary">
              <Droplets className="w-8 h-8 text-[#005DE8] animate-bounce" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 font-display">
              More Services Coming Soon
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm sm:text-base max-w-md">
              We are constantly expanding our offerings to bring you more comprehensive environmental engineering solutions. Stay tuned for exciting additions to our services portfolio!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {visibleServices.map((s, i) => (
              <ServiceGridCard
                key={s.id}
                service={s}
                onOpen={handleOpen}
                delay={i * 0.05}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal (singleton) */}
      <ServiceModal service={openService} onClose={handleClose} />
    </section>
  );
}
