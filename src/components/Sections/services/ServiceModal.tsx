import { memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Droplets } from "lucide-react";

export interface ServiceModalData {
  id: string;
  title: string;
  description: string;
  image: string;
  fullContent?: string;
}

interface ServiceModalProps {
  service: ServiceModalData | null;
  onClose: () => void;
}

const ServiceModal = memo(({ service, onClose }: ServiceModalProps) => {
  // Close on Escape key
  useEffect(() => {
    if (!service) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [service, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = service ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [service]);

  const displayContent = service?.fullContent || service?.description || "";

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9998] bg-foreground/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Modal Wrapper */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="pointer-events-auto relative w-full max-w-4xl bg-popover rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              style={{ maxHeight: "88vh" }}
              initial={{ scale: 0.9, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-5 left-5 z-10 w-10 h-10 bg-foreground/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-foreground transition-colors text-popover"
                onClick={onClose}
                aria-label="Close modal"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <X size={20} strokeWidth={2.5} />
              </motion.button>

              {/* Top Accent Bar — site water-ocean → water-sky gradient */}
              <motion.div
                className="h-[3px] flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(to right, hsl(var(--water-ocean)), hsl(var(--water-sky)), hsl(var(--water-ocean)))",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.35, duration: 0.7 }}
              />

              {/* Content */}
              <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
                {/* Image Side */}
                <motion.div
                  className="md:w-[44%] relative flex-shrink-0 bg-water-deep h-56 md:h-auto overflow-hidden"
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                </motion.div>

                {/* Text Side */}
                <motion.div
                  className="flex-1 p-6 md:p-10 flex flex-col overflow-y-auto min-h-0 relative"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "hsl(var(--border)) transparent",
                  }}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg mb-5 flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--water-ocean)), hsl(var(--water-deep)))",
                      boxShadow: "0 6px 18px hsl(var(--primary) / 0.3)",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.35,
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <Droplets size={24} color="#fff" />
                  </motion.div>

                  <motion.h2
                    className="text-2xl md:text-3xl font-bold text-popover-foreground mb-2 leading-tight"
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {service.title}
                  </motion.h2>

                  <motion.p
                    className="text-sm text-muted-foreground mb-6 font-medium"
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.48 }}
                  >
                    SA Enviro Solutions — Trusted Water Treatment Expert
                  </motion.p>

                  <motion.div
                    className="text-popover-foreground/80 leading-relaxed space-y-3 text-sm md:text-base"
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.55 }}
                  >
                    {displayContent.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </motion.div>

                  {/* Ambient glow */}
                  <motion.div
                    className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                    style={{
                      background: "hsl(var(--primary) / 0.05)",
                      filter: "blur(2rem)",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.65 }}
                  />
                </motion.div>
              </div>

              {/* Floating particles */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={`mp-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 8,
                    height: 8,
                    background: "hsl(var(--water-sky) / 0.35)",
                    left: `${15 + i * 14}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    y: [0, -70],
                    x: [0, Math.sin(i) * 35],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
});

ServiceModal.displayName = "ServiceModal";
export default ServiceModal;
