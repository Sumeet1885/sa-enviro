import { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import ServiceModal, { ServiceModalData } from "./ServiceModal";
import { services } from "@/constants/siteData";

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
            className="rounded-md w-full mt-auto bg-primary py-2 px-4 border border-transparent text-center text-sm font-medium text-white transition-all shadow-md hover:shadow-lg focus:bg-primary/90 focus:shadow-none active:bg-primary/90 hover:bg-primary/90 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
      style={{ background: "hsl(var(--water-deep))" }}
    >
      <div className="container-wide">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{
              background: "hsl(var(--water-sky) / 0.12)",
              border: "1px solid hsl(var(--water-sky) / 0.3)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "hsl(var(--water-sky))",
                boxShadow: "0 0 8px hsl(var(--water-sky))",
              }}
            />
            <p
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "hsl(var(--water-sky))" }}
            >
              What We Do
            </p>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ color: "#ffffff" }}>
            Our Core Services
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "hsl(var(--water-light) / 0.6)" }}>
            End-to-end environmental engineering solutions tailored to your
            unique requirements.
          </p>
        </AnimatedSection>

        {/* Tab Switcher */}
        <AnimatedSection delay={0.1} className="flex justify-center mb-14">
          <div
            className="inline-flex p-1.5 rounded-full gap-1"
            style={{
              background: "hsl(var(--water-sea) / 0.15)",
              border: "1px solid hsl(var(--water-sea) / 0.3)",
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
                      ? "hsl(var(--water-sky))"
                      : "transparent",
                    color: isActive
                      ? "hsl(var(--water-deep))"
                      : "hsl(var(--water-light) / 0.7)",
                    boxShadow: isActive
                      ? "0 4px 14px hsl(var(--water-sky) / 0.35)"
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
      </div>

      {/* Modal (singleton) */}
      <ServiceModal service={openService} onClose={handleClose} />
    </section>
  );
}
