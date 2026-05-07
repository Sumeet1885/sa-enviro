
import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import { Download, ArrowRight, ArrowLeft, Leaf } from "lucide-react";
import { siteConfig, stats } from "@/constants/siteData";

const BROCHURE_PDF_URL = "/Broucher.pdf";

const PARTICLES = [
  { x: "6%", y: "72%", delay: 0, size: 3 },
  { x: "18%", y: "50%", delay: 1.4, size: 2 },
  { x: "35%", y: "82%", delay: 0.7, size: 3 },
  { x: "52%", y: "60%", delay: 2.0, size: 2 },
  { x: "68%", y: "78%", delay: 0.4, size: 4 },
  { x: "80%", y: "45%", delay: 1.7, size: 2 },
  { x: "92%", y: "68%", delay: 1.0, size: 3 },
];

const Particle = ({ x, y, delay, size }: (typeof PARTICLES)[0]) => (
  <motion.span
    className="absolute rounded-full bg-gradient-hero pointer-events-none z-0"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{ opacity: [0, 0.4, 0], y: [0, -22, -44] }}
    transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

const Spine = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{ originY: 0 }}
    className="hidden md:flex flex-col items-center relative z-20 w-px bg-popover"
  >
    <div
      className="absolute inset-y-0 w-6 -translate-x-1/2 bg-popover"
      style={{
        background:
          "linear-gradient(to right,transparent,rgba(59,158,187,0.09),transparent)",
      }}
    />
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 0.5, duration: 0.4, ease: "backOut" }}
      className="w-1.5 h-1.5 rounded-full dark-section mt-6 shrink-0 bg-popover"
    />
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 0.55, duration: 0.4, ease: "backOut" }}
      className="w-1.5 h-1.5 rounded-full dark-section mb-6 mt-auto shrink-0 bg-popover"
    />
  </motion.div>
);

const up = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const BrochureSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const brochureAvailable = true;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x1 = useTransform(mouseX, [-1, 1], [-5, 5]);
  const y1 = useTransform(mouseY, [-1, 1], [-3, 3]);
  const x3 = useTransform(mouseX, [-1, 1], [5, -5]);
  const y3 = useTransform(mouseY, [-1, 1], [3, -3]);

  const rectRef = useRef<DOMRect | null>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const { left, top, width, height } = rectRef.current;
    mouseX.set(((e.clientX - left) / width) * 2 - 1);
    mouseY.set(((e.clientY - top) / height) * 2 - 1);
  };
  const onLeave = () => {
    rectRef.current = null;
    animate(mouseX, 0, { duration: 0.9 });
    animate(mouseY, 0, { duration: 0.9 });
  };

  const [page, setPage] = useState(0);

  const [dl, setDl] = useState(false);

  const handleDownload = () => {
    setDl(true);
    setTimeout(() => setDl(false), 2000);
  };

  const Page1 = () => (
    <motion.div
      style={{ x: x1, y: y1 }}
      className="flex-1 flex flex-col justify-between
                 px-7 sm:px-10 py-10 md:py-14 min-h-[420px] md:min-h-0"
    >
      <motion.div
        custom={0}
        variants={up}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex items-center gap-2"
      >
        <Leaf className="w-3 h-3 " />
        <span className="text-[9px] tracking-[0.3em] uppercase  font-medium">
          {siteConfig.name}
        </span>
      </motion.div>

      <div>
        <div className="overflow-hidden">
          <motion.h2
            custom={0}
            variants={up}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold  leading-[1.0] tracking-tight"
          >
            A Cleaner
          </motion.h2>
        </div>

        <div className="overflow-hidden">
          <motion.div
            custom={1}
            variants={up}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <svg
              viewBox="0 0 420 90"
              className="w-full max-w-[420px] overflow-visible"
              style={{ height: "clamp(64px, 10vw, 90px)" }}
              aria-label="World."
            >
              <defs>
                <linearGradient
                  id="textGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="hsl(var(--water-ocean))" />
                  <stop offset="45%" stopColor="hsl(var(--water-sky))" />
                  <stop offset="100%" stopColor="hsl(var(--water-deep))" />
                </linearGradient>
              </defs>

              <text
                x="0"
                y="78"
                fontFamily="'Playfair Display', serif"
                fontStyle="italic"
                fontWeight="700"
                fontSize="88"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinejoin="round"
              >
                World.
              </text>

              <text
                x="0"
                y="78"
                fontFamily="'Playfair Display', serif"
                fontStyle="italic"
                fontWeight="700"
                fontSize="88"
                fill="url(#textGrad)"
              >
                World.
              </text>
            </svg>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="w-8 h-px bg-water-light mt-6"
        />
      </div>

      <motion.p
        custom={3}
        variants={up}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-[9px] tracking-[0.22em] uppercase  font-light"
      >
        {new Date().getFullYear()} Edition · Annual Brochure
      </motion.p>
    </motion.div>
  );

  const Page2 = () => (
    <motion.div
      className="flex-1 flex flex-col justify-between
                 px-7 sm:px-10 py-10 md:py-14 min-h-[420px] md:min-h-0"
    >
      <motion.p
        custom={0}
        variants={up}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-[9px] tracking-[0.3em] uppercase  font-medium"
      >
        Our Impact
      </motion.p>

      <div>
        <motion.p
          custom={1}
          variants={up}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-8xl sm:text-9xl font-bold  leading-none mb-2"
        >
          {siteConfig.stats.Experience}
          <span className="text-water-light">+</span>
        </motion.p>
        <motion.p
          custom={2}
          variants={up}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[10px] tracking-[0.22em] uppercase text-primary-foreground/60 text-[#8BA8C0] font-light"
        >
          Experience
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ originX: 0 }}
          className="w-8 h-px bg-water-light mt-6 mb-6"
        />

        <div className="flex gap-8">
          {stats.map((item, i) => (
            <motion.div
              key={item.value}
              custom={i + 3}
              variants={up}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <p
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl font-bold  leading-none mb-1"
              >
                {item.value}
              </p>
              <p className="text-[9px] tracking-[0.15em] uppercase text-primary-foreground/60 font-light">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p
        custom={6}
        variants={up}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-[9px] tracking-[0.22em] uppercase "
      >
        02 / Impact
      </motion.p>
    </motion.div>
  );

  const Page3 = () => (
    <motion.div
      style={{ x: x3, y: y3 }}
      className="flex-1 flex flex-col justify-between
                 px-7 sm:px-10 py-10 md:py-14 min-h-[420px] md:min-h-0"
    >

      <motion.p
        custom={0}
        variants={up}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-[9px] tracking-[0.3em] uppercase  font-medium"
      >
        Download
      </motion.p>

      <div className="flex flex-col gap-8">
        <div>
          <motion.p
            custom={1}
            variants={up}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-2xl font-light  leading-snug mb-2 max-w-[180px]"
          >
            See the full picture.
          </motion.p>
          <motion.p
            custom={2}
            variants={up}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-xs font-light text-primary-foreground/60 leading-relaxed max-w-[180px]"
          >
            Products, case studies & specs — one PDF.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 1 }}
      >
        {brochureAvailable && <motion.a
          href={`${BROCHURE_PDF_URL}`}
          download={`${siteConfig.shortName}.pdf`}
          onClick={handleDownload}
          type="button"
          whileHover="hover"
          whileTap={{ scale: 0.97 }}
          className="flex group relative w-full overflow-hidden border border-border
                      items-center justify-between px-5 py-4 cursor-pointer"
        >
          <motion.span
            className="absolute inset-0 bg-primary-foreground"
            style={{ originX: 0 }}
            initial={{ scaleX: 0 }}
            variants={{ hover: { scaleX: 1 } }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          />
          <span
            className="relative z-10 text-[10px] tracking-[0.2em] uppercase font-medium
                            group-hover:text-foreground transition-colors duration-300"
          >
            {dl ? "Preparing…" : "Download Brochure"}
          </span>
          <motion.span
            className="relative z-10"
            variants={{ hover: { x: 4 } }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Download className="w-3.5 h-3.5 group-hover:text-foreground transition-colors duration-300" />
          </motion.span>

          {dl && (
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 bg-water-sky"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
            />
          )}
        </motion.a>}
        
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <style>{`
        .brochure-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.038;
          pointer-events: none;
          z-index: 1;
        }

        .brochure-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 59px,
            rgba(59,158,187,0.055) 60px
          );
          pointer-events: none;
          z-index: 0;
        }

      `}</style>

      <section
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="brochure-bg relative overflow-hidden dark-section"
        style={{ fontFamily: "'Archivo', sans-serif" }}
      >
        {PARTICLES.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        {["top-0", "bottom-0"].map((pos) => (
          <motion.div
            key={pos}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0.5 }}
            className={`absolute ${pos} left-0 right-0 h-px border-border opacity-20 z-20`}
          />
        ))}
        <div className="hidden md:flex items-stretch min-h-[480px]">
          <Page1 />
          <Spine delay={0.15} />
          <Page2 />
          <Spine delay={0.25} />
          <Page3 />
        </div>

        <div className="flex flex-col md:hidden">
          <div className="flex items-center justify-between px-7 pt-6 pb-0 z-10 relative">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.button
                  aria-label="Switch Button"
                  key={i}
                  onClick={() => setPage(i)}
                  animate={{ width: page === i ? 20 : 6 }}
                  transition={{ duration: 0.3 }}
                  className={`h-1 rounded-full transition-colors duration-300 ${page === i ? "bg-[#3B9EBB]" : "bg-[#1B3A5C]"
                    }`}
                />
              ))}
            </div>
            <span className="text-[9px] tracking-[0.2em] uppercase ">
              {page + 1} / 3
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              {page === 0 && <Page1 />}
              {page === 1 && <Page2 />}
              {page === 2 && <Page3 />}
            </motion.div>
          </AnimatePresence>


          <div className="flex justify-between items-center px-7 pb-6 pt-0 z-10 relative">
            <motion.button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase
                          transition-opacity duration-200 text-[#8BA8C0]
                          ${page === 0 ? "opacity-20 pointer-events-none" : "opacity-100"}`}
            >
              <ArrowLeft className="w-3 h-3" /> Prev
            </motion.button>
            <motion.button
              onClick={() => setPage((p) => Math.min(2, p + 1))}
              disabled={page === 2}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase
                          transition-opacity duration-200 text-[#8BA8C0]
                          ${page === 2 ? "opacity-20 pointer-events-none" : "opacity-100"}`}
            >
              Next <ArrowRight className="w-3 h-3" />
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
};