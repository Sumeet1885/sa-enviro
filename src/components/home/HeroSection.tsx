import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroData } from "@/constants/siteData";
import ButtonGrid from "../ui/ButtonGrid";
import Product_Content from "../Sections/ProductContent";
import Drawer from "@/components/ui/Drawer";

const extended = [...heroData.slides, ...heroData.slides, ...heroData.slides];
const CENTER = heroData.slides.length;

export function HeroSection() {
  const [index, setIndex] = useState(CENTER);
  const [animate, setAnimate] = useState(true);
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [label, setLabel] = useState("");

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

  const ButtonClick = (values: { label: string; key: string }) => {
    setSlug(values.key);
    setLabel(values.label);
    setOpen(true);
  };

  return (
    <>
      <div className="relative  py-24 lg:py-32 h-screen overflow-hidden bg-black text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ scale: 1.08, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 1.05, y: -30, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <img
              fetchPriority="high"
              src={active.img}
              alt=""
              className="w-full h-full object-cover"
            />
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
              <h2 className="text-xl sm:text-2xl lg:text-3xl  mt-4 opacity-90">
                {active.subtitle}
              </h2>
              <p className="mt-6 text-sm sm:text-base opacity-80">
                {active.desc}
              </p>
              <ButtonGrid ButtonRow={active.buttons} onClick={ButtonClick} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-0 bottom-20 flex justify-between px-8 z-30 pointer-events-none">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="pointer-events-auto p-3 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-sm border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.5)] group-focus:ring-2 group-focus:ring-white/50 group-focus:outline-none transition"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            aria-label="Next slide"
            className="pointer-events-auto p-3 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-sm border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.5)] group-focus:ring-2 group-focus:ring-white/50 group-focus:outline-none transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <Drawer open={open} onClose={setOpen} side="bottom" title={label}>
        <Product_Content slug={slug} layout="2" />
      </Drawer>
    </>
  );
}
