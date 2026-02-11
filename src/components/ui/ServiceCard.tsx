import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Droplets } from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface Service {
  image: string;
  title: string;
  description: string;
  fullContent?: string;
}

interface ServiceCardProps {
  service: Service;
}

// ============================================================================
// MINIMALIST ANIMATED ARTICLE CARD WITH READ MORE POPUP
// ============================================================================

export const ServiceCard = memo<ServiceCardProps>(({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Close popup on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isPopupOpen) {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      window.addEventListener("scroll", handleScroll);
      // Prevent body scroll when popup is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isPopupOpen]);

  // Use fullContent if provided, otherwise use description
  const displayContent = service.fullContent || service.description;

  return (
    <article className="mx-auto lg:max-w-2xl w-[80%]">
      <motion.div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        {/* Image Container with Hover Effect */}
        <motion.div
          className="relative overflow-hidden rounded-2xl lg:rounded-3xl"
          whileHover={{ scale: 1.02 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          <motion.img
            src={service.image}
            className="w-full aspect-[3/2] lg:aspect-[4/5] h-48 lg:h-[28rem] object-cover"
            alt={service.title}
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          />

          {/* Overlay gradient on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{
              x: isHovered ? "100%" : "-100%",
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Content Card with Animation */}
        <motion.div
          className="lg:rounded-l-[30px] lg:rounded-t-[30px] bg-white lg:absolute bottom-3 -right-16 lg:w-[18rem] px-5 py-4 lg:h-[18rem] shadow-xl"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          whileHover={{
            y: -8,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 25,
            },
          }}
        >
          {/* Title with Hover Effect */}
          <motion.h2
            className="text-2xl lg:text-3xl font-bold leading-tight mt-3 text-gray-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {service.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-gray-700 my-7 leading-relaxed text-sm lg:text-base line-clamp-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {service.description}
          </motion.p>

          {/* Read More Button - Enhanced */}
          <motion.button
            onClick={() => setIsPopupOpen(true)}
            className="group/btn absolute bottom-5 right-5 flex justify-end items-center uppercase text-blue-800 font-bold text-sm overflow-hidden cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            whileHover="hover"
          >
            {/* Animated line */}
            <motion.span
              className="relative mr-4 block h-0.5 bg-blue-800 overflow-hidden"
              variants={{
                initial: { width: "2.5rem" },
                hover: { width: "4rem" },
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              {/* Shine effect on line */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.span>

            {/* Text with underline effect */}
            <span className="relative">
              read more
              {/* Animated underline */}
              <motion.span
                className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-800"
                initial={{ scaleX: 0 }}
                variants={{
                  hover: { scaleX: 1 },
                }}
                style={{ transformOrigin: "left" }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              />
            </span>

            {/* Arrow Icon */}
            <motion.svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              variants={{
                initial: { x: 0, opacity: 0.7 },
                hover: { x: 4, opacity: 1 },
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </motion.svg>

            {/* Dot particles on hover */}
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{
                  right: `${20 + i * 15}%`,
                  top: "50%",
                }}
                initial={{ opacity: 0, scale: 0 }}
                variants={{
                  hover: {
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    y: [0, -15],
                  },
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </motion.button>

          {/* Bottom corner accent */}
          <motion.div
            className="absolute bottom-0 left-0 w-16 h-16 opacity-0"
            animate={{
              opacity: isHovered ? 0.05 : 0,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="100"
                cy="100"
                r="100"
                fill="currentColor"
                className="text-gray-300"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Floating particles around card */}
        {isHovered &&
          [0, 1, 2, 3].map((i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-blue-400/60 rounded-full pointer-events-none"
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + (i % 2) * 30}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -40],
                x: [0, Math.sin(i) * 20],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
      </motion.div>

      {/* ====================================================================== */}
      {/* CONTENT POPUP MODAL - Similar to Reference Image */}
      {/* ====================================================================== */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop with blur - Click to close */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPopupOpen(false)}
            />

            {/* Modal Container - Rectangular and Centered */}
            <motion.div
              className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl mx-auto"
              style={{ maxHeight: "85vh" }}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {/* Close Button - Top Left */}
              <motion.button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-6 left-6 z-10 w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-gray-900 transition-colors group/close"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
              >
                <X
                  className="w-5 h-5 text-white group-hover/close:rotate-90 transition-transform duration-300"
                  strokeWidth={2.5}
                />
              </motion.button>

              {/* Content Layout - Similar to Reference Image */}
              <div className="flex flex-col lg:flex-row h-full">
                {/* Left Side - Image */}
                <motion.div
                  className="lg:w-1/2 relative overflow-hidden bg-gray-100 h-64 lg:h-auto"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>

                {/* Right Side - Content */}
                <motion.div
                  className="lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center overflow-y-auto"
                  style={{ maxHeight: "85vh" }}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  {/* Logo/Icon placeholder */}
                  <motion.div
                    className="mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {service.title}
                  </motion.h2>

                  {/* Subtitle */}
                  <motion.p
                    className="text-sm text-gray-500 mb-6 font-medium"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Get started today!
                  </motion.p>

                  {/* Full Content */}
                  <motion.div
                    className="text-gray-700 leading-relaxed space-y-4 mb-8 max-h-48 overflow-y-auto pr-2 custom-scrollbar"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {displayContent.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-sm lg:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </motion.div>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute bottom-8 right-8 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 }}
                  />
                </motion.div>
              </div>

              {/* Animated border accent */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
            </motion.div>

            {/* Floating particles around modal */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={`modal-particle-${i}`}
                className="absolute w-2 h-2 bg-blue-400/40 rounded-full pointer-events-none"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -80],
                  x: [0, Math.sin(i) * 40],
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
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </article>
  );
});

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
