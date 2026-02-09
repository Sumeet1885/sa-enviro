import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { heroData } from "@/constants/siteData";
import { Link } from "react-router-dom";

interface Colors {
  primaryBlue: string;
  accentBlue: string;
  textDark: string;
  textMuted: string;
  glowBlue: string;
}

const colors: Colors = {
  primaryBlue: "#0066FF",
  accentBlue: "#2684FF",
  textDark: "#0F172A",
  textMuted: "#475569",
  glowBlue: "rgba(0, 102, 255, 0.15)",
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1, x: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const HeroSection = () => {
  const [index, setIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const yContent = useTransform(smoothProgress, [0, 1], [50, -50]);
  const yImage = useTransform(smoothProgress, [0, 1], [-30, 30]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroData.images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroData.images.length]);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .premium-shadow {
          box-shadow:
            0 1px 3px rgba(15, 23, 42, 0.03),
            0 8px 24px rgba(15, 23, 42, 0.08),
            0 16px 48px rgba(15, 23, 42, 0.06);
        }

        .text-shadow-premium {
          text-shadow: 0 2px 12px rgba(0, 102, 255, 0.08);
        }

        .premium-shadow-lg {
          box-shadow:
            12px 0 40px -35px rgba(0, 0, 0, 0.18),
            0 18px 40px -75px rgba(0, 0, 0, 0.14),
            0 -18px 40px -106px rgba(0, 0, 0, 0.12);
        }
      `}</style>

      <motion.section
        ref={sectionRef}
        style={{ opacity }}
        className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 bg-white"
      >
        {/* Ambient glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50/30 rounded-full blur-3xl" />

        <div className="max-w-9xl mx-auto w-full">
          <motion.div
            className="grid lg:grid-cols-2  items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* LEFT CONTENT */}
            <motion.div
              className="lg:block space-y-8 lg:space-y-10 z-10"
              style={{ y: yContent }}
            >
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-6xl lg:text-5xl font-black leading-[1.1]  text-slate-900"
              >
                {heroData.title} <br />
                <span className="text-blue-600 text-shadow-premium relative inline-block">
                  {heroData.subtitle}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-m sm:text-l lg:text-xl text-slate-600 max-w-xl leading-relaxed font-light"
              >
                {heroData.description}
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 "
              >
                <motion.button
                  className="group px-7 py-4 rounded-2xl border-2 border-slate-200 font-semibold text-slate-700 bg-white premium-shadow relative overflow-hidden"
                  whileHover={{ scale: 1.02, borderColor: colors.primaryBlue }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Link to={heroData.cta.primary.href}>
                      {heroData.cta.primary.text}
                    </Link>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.button
                  className="group px-7 py-4 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold premium-shadow relative overflow-hidden"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 12px 40px rgba(0, 102, 255, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Link to={heroData.cta.secondary.href}>
                      {heroData.cta.secondary.text}
                    </Link>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              className=" hidden lg:block relative aspect-[4/3] rounded-[2rem] overflow-hidden"
              variants={imageVariants}
              style={{ y: yImage }}
            >
              <motion.div
                className="relative aspect-[3/3] rounded-[2rem] overflow-hidden premium-shadow-lg"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Image carousel with updated fade effect */}
                <div className="relative w-full h-full premium-shadow-lg">
                  {heroData.images.map((img, i) => (
                    <motion.img
                      key={i}
                      src={img}
                      className="absolute inset-0 w-full h-full object-cover rounded-[2rem]"
                      animate={{ opacity: index === i ? 1 : 0 }}
                      transition={{ duration: 1 }}
                      /* 🔥 THIS IS THE REAL FIX */
                      style={{
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent 8%, black 38%)",
                        maskImage:
                          "linear-gradient( 120deg black 50% transparent 95%)",
                      }}
                    />
                  ))}
                </div>

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 opacity-[0.06]" />

                {/* Inner glow border */}
                <div
                  className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full blur-3xl"
                  style={{ background: colors.glowBlue }}
                />
              </motion.div>

              {/* Floating glow elements */}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2  "
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-blue-600 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-water-sky" />
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
};
