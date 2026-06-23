import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SEO } from "@/components/layout/SEO";
import { seoData, LOGOS } from "@/constants/siteData";
import logo from "@/assets/logo.webp";

// --- Types ---
interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

// --- Custom Hooks ---
function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

// --- Theme ---
const theme = {
  colors: {
    bg: "#F8FAFC",
    textDark: "#0F172A",
    textMuted: "#475569",
    bluePrimary: "#0066FF",
    blueLight: "#E0EFFF",
    white: "#FFFFFF",
    border: "#E2E8F0",
  },
  easing: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

// --- Icons ---
const Icons = {
  handshake: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3-6.11 6.11" />
      <path d="M5.3 9A6.5 6.5 0 0 1 11 4" />
      <path d="M7.11 18 3 22" />
      <path d="m5 7 2 2" />
      <path d="m5 22 3-3" />
      <path d="m7 5 2 2" />
      <path d="m9 20 3-3" />
      <path d="m9 7 2 2" />
    </svg>
  ),
  globe: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  ),
  building: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  ),
  people: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

// --- Stats Data ---
const statsData = [
  { icon: "handshake" as const, value: "100+", label: "Happy Clients" },
  { icon: "globe" as const, value: "15+", label: "Countries Served" },
  { icon: "building" as const, value: "20+", label: "Industries Covered" },
  { icon: "people" as const, value: "Long-term", label: "Partnerships" },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- Main Client Page ---
const Client = () => {
  const size = useWindowSize();
  const isMobile = size.width ? size.width < 768 : false;

  return (
    <>
      <SEO
        title={seoData.clients.title}
        description={seoData.clients.description}
      />

      <div
        style={{
          background: `radial-gradient(circle at 20% -10%, ${theme.colors.blueLight} 0%, ${theme.colors.bg} 50%, ${theme.colors.bg} 100%)`,
          color: theme.colors.textDark,
          minHeight: "100vh",
          width: "100%",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            maxWidth: "1280px",
            width: "100%",
            padding: `clamp(3rem, 9.5vw, 8rem) clamp(1.5rem, 4vw, 4rem)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4rem",
          }}
        >
          {/* ── Hero Row ── */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "3rem",
            }}
          >
            {/* ── Left: Logo + Heading + Description ── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isMobile ? "center" : "flex-start",
                textAlign: isMobile ? "center" : "left",
                maxWidth: "550px",
                gap: "1.25rem",
                flex: 1,
              }}
            >
              {/* Heading */}
              <motion.h1
                variants={itemVariants}
                style={{
                  fontFamily: "var(--font-family-serif)",
                  fontSize: "3.2rem",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  color: theme.colors.textDark,
                }}
              >
                Trusted Partnerships.
                <br />
                <span style={{ color: theme.colors.bluePrimary }}>
                  Transforming Water.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                style={{
                  fontFamily: "var(--font-family-sans)",
                  fontSize: "var(--text-hero-text-size)",
                  lineHeight: 1.7,
                  color: theme.colors.textMuted,
                  margin: 0,
                  maxWidth: "480px",
                }}
              >
                We collaborate with leading organizations across industries to
                deliver sustainable water treatment solutions that create lasting
                impact.
              </motion.p>
            </div>

            {/* ── Right: 2×2 Stats Card Grid ── */}
            <motion.div
              variants={itemVariants}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                backgroundColor: theme.colors.white,
                borderRadius: "1.5rem",
                boxShadow:
                  "0 20px 40px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)",
                overflow: "hidden",
                flex: 1,
                maxWidth: "460px",
                width: "100%",
                marginTop: isMobile ? "0" : "3rem",
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              {statsData.map((stat, index) => {
                // checkerboard: cells 1 & 2 (index 1 and 2) are blue
                const isDark = index === 1 || index === 2;
                const isLastRow = index >= 2;
                const isRightCol = index % 2 === 1;

                return (
                  <motion.div
                    key={index}
                    
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1.5rem",
                      backgroundColor: isDark
                        ? "#0D3B66"
                        : "transparent",
                      borderRight:
                        !isMobile && !isRightCol
                          ? `1px solid ${isDark ? "rgba(255,255,255,0.15)" : theme.colors.border}`
                          : "none",
                      borderBottom:
                        !isLastRow
                          ? `1px solid ${isDark ? "rgba(255,255,255,0.15)" : theme.colors.border}`
                          : "none",
                      cursor: "default",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    {/* Icon circle */}
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.18)"
                          : theme.colors.blueLight,
                        color: isDark
                          ? theme.colors.white
                          : theme.colors.bluePrimary,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {Icons[stat.icon]}
                    </div>

                    {/* Text */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-family-sans)",
                          fontSize: "var(--text-card-title-size)",
                          fontWeight: 700,
                          color: isDark
                            ? theme.colors.white
                            : theme.colors.bluePrimary,
                          lineHeight: 1.2,
                        }}
                      >
                        {stat.value}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-family-sans)",
                          fontSize: "var(--text-badge-text-size)",
                          color: isDark
                            ? "rgba(255,255,255,0.8)"
                            : theme.colors.textMuted,
                          fontWeight: 500,
                          marginTop: "0.2rem",
                        }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* ── Logo Grid Section ── */}
          <motion.div
            variants={itemVariants}
            style={{ width: "100%", textAlign: "center" }}
          >
            {/* Section heading */}

            {/* Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(3, 1fr)"
                  : "repeat(5, 1fr)",
                gap: isMobile ? "0.75rem" : "1rem",
                width: "100%",
              }}
            >
              {LOGOS.map((logo) => (
                <motion.div
                  key={logo.id}
                  whileHover={{ scale: 1.04, translateY: -4 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    aspectRatio: "3 / 2",
                    backgroundColor: theme.colors.white,
                    borderRadius: "0.875rem",
                    border: `1px solid ${theme.colors.border}`,
                    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.06)",
                    padding: isMobile ? "0.5rem" : "0.875rem",
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={logo.imgUrl}
                    alt={logo.alt}
                    loading="lazy"
                    draggable={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      userSelect: "none",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── CTA Card ── */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: theme.colors.white,
              borderRadius: "2rem",
              padding: "clamp(3rem, 5vw, 4rem) clamp(2rem, 5vw, 3rem)",
              width: "100%",
              maxWidth: "820px",
              boxShadow:
                "0 20px 40px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.03)",
              border: `1px solid ${theme.colors.border}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background glow */}
            <div
              style={{
                position: "absolute",
                top: "-60%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                height: "100%",
                background: `radial-gradient(ellipse at top, ${theme.colors.blueLight} 0%, transparent 70%)`,
                pointerEvents: "none",
                opacity: 0.8,
                zIndex: 0,
              }}
            />

            <h2
              style={{
                fontFamily: "var(--font-family-serif)",
                fontSize: "3rem",
                fontWeight: 800,
                color: theme.colors.textDark,
                margin: "0 0 1rem 0",
                letterSpacing: "-0.02em",
                position: "relative",
                zIndex: 1,
              }}
            >
              Ready to{" "}
              <span style={{ color: theme.colors.bluePrimary }}>Transform</span>{" "}
              Your Water Solutions?
            </h2>

            <p
              style={{
                fontFamily: "var(--font-family-sans)",
                fontSize: "var(--text-section-subheading-size)",
                color: theme.colors.textMuted,
                maxWidth: "560px",
                margin: "0 0 2.5rem 0",
                lineHeight: 1.7,
                position: "relative",
                zIndex: 1,
              }}
            >
              Join hundreds of global industry leaders who trust us to deliver
              sustainable, innovative, and long-lasting water treatment impact.
            </p>

            <Link to="/contact" style={{ textDecoration: "none", position: "relative", zIndex: 1 }}>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 12px 28px -6px rgba(0, 102, 255, 0.42)",
                }}
                whileTap={{ scale: 0.96 }}
                style={{
                  backgroundColor: theme.colors.bluePrimary,
                  color: theme.colors.white,
                  padding: "0.9rem 2.25rem",
                  borderRadius: "999px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  letterSpacing: "0.01em",
                }}
              >
                Get Started Today
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Client;
