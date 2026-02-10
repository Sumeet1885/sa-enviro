import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image1 from "@/assets/about-hero.jpg";
import Image2 from "@/assets/hero-water-treatment.jpg";
import Image3 from "@/assets/hero2.jpg";
import Image4 from "@/assets/hero3.jpg";

const slides = [
  {
    id: 1,
    title: "Modern Wastewater Treatment Facility",
    subtitle: "Engineering clean water for a sustainable future",
    desc: "An aerial view of an advanced wastewater treatment plant featuring large circular clarifier tanks, interconnected pipelines.",
    img: Image1,
  },
  {
    id: 2,
    title: "Industrial Water Filtration System",
    subtitle: "Precision-engineered purification infrastructure",
    desc: "Interior view of a high-grade industrial filtration plant featuring stainless steel pressure vessels, interconnected pipe networks.",
    img: Image2,
  },
  {
    id: 3,
    title: "Rural Wastewater Treatment Site",
    subtitle: "Compact ecological water management",
    desc: "Top-down aerial view of a community-scale wastewater treatment plant featuring circular settling tanks, sludge basins.",
    img: Image3,
  },
  {
    id: 3,
    title: "Abstract Perspectives",
    subtitle: "Finding symmetry in chaos",
    desc: "Modern abstract forms and human emotion.",
    img: Image4,
  },
  {
    id: 4,
    title: "Municipal Clarifier Basin",
    subtitle: "Final stage sedimentation for clean discharge",
    desc: "Ground-level view of a circular secondary clarifier where treated water is separated from residual solids using a slow rotating bridge and scraper system.",
    img: Image4,
  },
];

const extended = [...slides, ...slides, ...slides];
const CENTER = slides.length;

export function HeroSection() {
  const [index, setIndex] = useState(CENTER);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => i + 1), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (index >= slides.length * 2 || index <= slides.length - 1) {
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

  const active = extended[index % slides.length];

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

            <button className="mt-10 px-12 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition">
              Explore
            </button>
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
