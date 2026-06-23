import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Droplets } from "lucide-react";

// --- Types ---
type StepData = {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

// --- Hooks for Responsiveness (Since external CSS is forbidden) ---
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// --- Icons (Custom SVGs for zero dependencies) ---
const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const ClipboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    <line x1="8" y1="10" x2="16" y2="10"></line>
    <line x1="8" y1="14" x2="16" y2="14"></line>
    <line x1="8" y1="14" x2="16" y2="14"></line>
    <line x1="8" y1="18" x2="12" y2="18"></line>
  </svg>
);

const BulbIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6"></path>
    <path d="M10 22h4"></path>
    <path d="M12 2v1"></path>
    <path d="M12 7v1"></path>
    <path d="M22 12h-1"></path>
    <path d="M5 12H4"></path>
    <path d="M19.07 4.93l-.71.71"></path>
    <path d="M5.64 19.07l-.71.71"></path>
    <path d="M19.07 19.07l-.71-.71"></path>
    <path d="M5.64 4.93l-.71-.71"></path>
    <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
  </svg>
);

const CogIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
    <path d="M3 14l5-5 4 4 9-9"></path>
    <path d="M15 4h6v6"></path>
  </svg>
);

// --- Data ---
const processData: StepData[] = [
  { num: '01', title: 'Assess', desc: 'Site survey, requirement analysis and environmental impact evaluation to understand your exact needs.', icon: <SearchIcon /> },
  { num: '02', title: 'Design', desc: 'Engineering design, process selection and detailed technical drawings tailored to your application.', icon: <BulbIcon /> },
  { num: '03', title: 'Fabricate', desc: 'Manufacturing with quality-checked materials, precision fabrication and ISO-compliant processes.', icon: <CogIcon /> },
  { num: '04', title: 'Install', desc: 'Erection, commissioning and on-site testing to ensure the system performs to specification.', icon: <ClipboardIcon /> },
  { num: '05', title: 'Support', desc: 'AMC, online monitoring, calibration and ongoing technical support to keep your plant running.', icon: <ChartIcon /> },
];

// --- Theme Constants ---
const theme = {
  colors: {
    primary: '#005DE8', // Rich Blue matching the page theme
    primaryLight: '#dbeafe',
    textDark: '#0f172a',
    textMedium: '#334155',
    textMuted: '#64748b',
    background: '#ffffff',
    white: '#ffffff',
    line: '#cbd5e1',
  },
  fonts: {
    serif: '"Playfair Display", "Merriweather", "Georgia", serif',
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  }
};

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const timelineContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.5, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { duration: 3, ease: "linear", delay: 0.1 }
  }
};

export default function ServicesProcess() {
  const { width } = useWindowSize();
  const isMobile = width < 900;

  return (
    <section style={{
      fontFamily: theme.fonts.sans,
      backgroundColor: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
      padding: isMobile ? '60px 20px' : '100px 40px',
      color: theme.colors.textDark
    }}>
      {/* Background Ambient Glows (radial tint matching ServicesHero) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 20% 60%, hsl(var(--primary) / 0.05) 0%, transparent 60%), " +
            "radial-gradient(ellipse at 80% 10%, hsl(var(--water-sky) / 0.06) 0%, transparent 50%)",
        }}
      />

      <div style={{ maxWidth: '1200px', width: '100%', zIndex: 1, position: 'relative', margin: '0 auto' }}>
        
        {/* Header Section */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          style={{ textAlign: 'center', marginBottom: isMobile ? '60px' : '80px' }}
        >
          {/* Badge styled like the "What We Do" badge */}
          <motion.div
            variants={itemVariants}
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
              Our Process
            </div>
            <div style={{ height: "1px", width: "40px", backgroundColor: "#005DE8", opacity: 0.5 }} />
          </motion.div>

          <motion.h2 variants={itemVariants} style={{ 
            fontFamily: theme.fonts.serif,
            fontSize: isMobile ? '2.5rem' : '4.0rem',
            fontWeight: 700,
            lineHeight: 1.2,
            margin: '0 0 24px 0',
            color: theme.colors.textDark
          }}>
            Simple Steps. <span style={{ color: theme.colors.primary }}>Powerful Results.</span>
          </motion.h2>

          <motion.p variants={itemVariants} style={{
            color: theme.colors.textMuted,
            fontSize: isMobile ? '1rem' : '1.125rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            A clear, collaborative process that turns challenges into sustainable water solutions.
          </motion.p>
        </motion.div>

        {/* Timeline Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={timelineContainerVariants}
          style={{ 
            position: 'relative',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: isMobile ? '60px' : '0'
          }}
        >
          {/* Responsive Connecting Line */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: '81px', // Align exactly with center of the 90px circles
              left: '10%',
              right: '10%',
              height: '100px',
              zIndex: 0,
              pointerEvents: 'none'
            }}>
              <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                <motion.path 
                  variants={lineVariants}
                  d="M 0,50 C 150,50 200,20 250,50 S 400,80 500,50 S 700,20 750,50 S 900,80 1000,50" 
                  fill="none" 
                  stroke="#005DE8" 
                  strokeWidth="2" 
                  vectorEffect="non-scaling-stroke"
                />
                {/* Small start/end dots on the line */}
                <circle cx="0" cy="50" r="4" fill="#005DE8" />
                <circle cx="1000" cy="50" r="4" fill="#005DE8" />
              </svg>
            </div>
          )}

          {/* Steps */}
          {processData.map((step, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: isMobile ? '100%' : '20%',
                maxWidth: isMobile ? '300px' : 'none',
                position: 'relative',
                zIndex: 1
              }}
            >
              {/* Number */}
              <div style={{
                color: theme.colors.primary,
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '16px',
                fontFamily: theme.fonts.sans
              }}>
                {step.num}
              </div>

              {/* Icon Container with Hover Effects */}
              <motion.div 
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  width: '90px',
                  height: '90px',
                  backgroundColor: theme.colors.white,
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '32px',
                  position: 'relative',
                  boxShadow: '0 10px 40px -10px rgba(0, 93, 232, 0.15)',
                  color: theme.colors.primary,
                  cursor: 'pointer',
                  border: '1px solid rgba(0, 93, 232, 0.08)'
                }}
              >
                {/* Decorative Arc (The blue semi-circle in the design) */}
                <div style={{
                  position: 'absolute',
                  top: '-4px',
                  left: '-4px',
                  right: '-4px',
                  bottom: '-4px',
                  borderRadius: '50%',
                  border: `2px solid transparent`,
                  borderTopColor: theme.colors.primaryLight,
                  borderLeftColor: theme.colors.primaryLight,
                  transform: 'rotate(-45deg)',
                  transition: 'all 0.3s ease',
                }} />
                
                {/* Icon Wrapper for internal scaling on hover */}
                <motion.div 
                   whileHover={{ scale: 1.1, color: '#1e3a8a' }}
                   style={{ display: 'flex', transition: 'color 0.3s ease' }}
                >
                  {step.icon}
                </motion.div>
              </motion.div>

              {/* Text Content */}
              <div style={{ textAlign: 'center', padding: '0 10px' }}>
                <h3 style={{
                  fontFamily: theme.fonts.serif,
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: theme.colors.textDark,
                  margin: '0 0 16px 0'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: theme.colors.textMuted,
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {step.desc}
                </p>
              </div>

              {/* Mobile connecting line (vertical) */}
              {isMobile && index < processData.length - 1 && (
                <div style={{
                  height: '40px',
                  width: '2px',
                  backgroundColor: '#005DE8',
                  marginTop: '30px'
                }} />
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}