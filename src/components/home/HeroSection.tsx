import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroData } from "@/constants/siteData";

const extended = [...heroData.slides, ...heroData.slides, ...heroData.slides];
const CENTER = heroData.slides.length;

export function UltimateWaterButton() {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="
        mt-10 px-14 py-6 rounded-full 
        bg-white text-black font-bold text-xl
        relative overflow-hidden
        shadow-[0_0_50px_rgba(6,182,212,0.6),0_15px_40px_rgba(0,0,0,0.25),inset_0_2px_10px_rgba(255,255,255,0.8)]
        hover:shadow-[0_0_80px_rgba(6,182,212,0.9),0_20px_50px_rgba(0,0,0,0.35),inset_0_2px_15px_rgba(255,255,255,1)]
        transition-all duration-500
        group
        border-2 border-cyan-100
      "
    >
      <Link to={heroData.cta.primary.href}>
        {/* Water filling animation at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-cyan-200/40 via-cyan-100/30 to-transparent rounded-b-full"
          animate={{
            scaleY: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated wave surface */}
        <motion.div
          className="absolute left-0 right-0"
          animate={{
            bottom: ["35%", "45%", "35%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 300 40"
            className="w-full"
            preserveAspectRatio="none"
          >
            <motion.path
              fill="rgba(6, 182, 212, 0.2)"
              animate={{
                d: [
                  "M0,20 Q37.5,10 75,20 T150,20 T225,20 T300,20 L300,40 L0,40 Z",
                  "M0,20 Q37.5,30 75,20 T150,20 T225,20 T300,20 L300,40 L0,40 Z",
                  "M0,20 Q37.5,10 75,20 T150,20 T225,20 T300,20 L300,40 L0,40 Z",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>

        {/* Bubbles rising from bottom */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-white/50 backdrop-blur-sm"
            style={{
              width: `${6 + Math.random() * 8}px`,
              height: `${6 + Math.random() * 8}px`,
              left: `${15 + i * 12}%`,
            }}
            animate={{
              y: [80, -30],
              x: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
              scale: [0.5, 1, 1.2, 0.8],
              opacity: [0, 0.8, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Multiple ripple rings */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`ripple-${i}`}
            className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
            animate={{
              scale: [1, 1.6],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.75,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Shimmer sweep */}
        {/* <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1,
        }}
      /> */}

        {/* Top glass reflection */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 via-white/30 to-transparent rounded-t-full" />

        {/* Radial shine spot */}
        <div
          className="absolute w-16 h-16 bg-white/50 rounded-full blur-xl"
          style={{
            top: "25%",
            left: "30%",
          }}
        />

        {/* Outer pulsing glow - multiple layers */}
        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-300/40 blur-2xl -z-10"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-400/30 blur-3xl -z-20"
          animate={{
            scale: [1.2, 1.6, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        {/* Button content */}
        <span className="relative z-10 flex items-center gap-3">
          {/* <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Droplets className="w-6 h-6 text-cyan-600 drop-shadow-lg" />
        </motion.div> */}
          <span className="drop-shadow-sm">{heroData.cta.primary.text}</span>

          {/* <motion.div
          animate={{
            x: [0, 4, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Waves className="w-5 h-5 text-cyan-600 drop-shadow-lg" />
        </motion.div> */}
        </span>
      </Link>
    </motion.button>
  );
}

export function HeroSection() {
  const [index, setIndex] = useState(CENTER);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => i + 1), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (
      index >= heroData.slides.length * 2 ||
      index <= heroData.slides.length - 1
    ) {
      setTimeout(() => {
        setAnimate(false);
        setIndex(CENTER);
      }, 400);
    }
  }, [index]);

  useEffect(() => {
    if (!animate) requestAnimationFrame(() => setAnimate(true));
  }, [animate]);

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  const active = extended[index % heroData.slides.length];

  return (
    <div className="relative h-screen overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ scale: 1.08, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 1.05, y: -30, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img src={active.img} alt="" className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 z-10" />

      <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              {active.title}
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl italic mt-4 opacity-90">
              {active.subtitle}
            </h2>
            <p className="mt-6 text-sm sm:text-base opacity-80">
              {active.desc}
            </p>
            <UltimateWaterButton />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-0 bottom-10 flex justify-between px-8 z-30 pointer-events-none">
        <button
          onClick={prev}
          className="pointer-events-auto bg-white/70 p-3 rounded-full hover:bg-white transition"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={next}
          className="pointer-events-auto bg-white/70 p-3 rounded-full hover:bg-white transition"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
