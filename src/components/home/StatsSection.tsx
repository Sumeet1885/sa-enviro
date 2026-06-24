import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- Utility Hook ---
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setWindowSize({ width: window.innerWidth });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// --- Design Tokens ---
const theme = {
  colors: {
    background: '#0D3B66',
    surface: '#FFFFFF',
    textMain: '#FFFFFF',
    border: 'rgba(255, 255, 255, 0.3)',
  },
};

// --- Icons ---
interface IconProps {
  size?: number;
  color?: string;
}

const IconCheckCircle = ({ size = 24, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconUsers = ({ size = 24, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconMapPin = ({ size = 24, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconAward = ({ size = 24, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const IconShield = ({ size = 24, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconHeadset = ({ size = 24, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

// --- Data ---
interface FeatureItem {
  id: number;
  icon: React.ComponentType<IconProps>;
  title: string;
}

const featuresData: FeatureItem[] = [
  { id: 1, icon: IconCheckCircle, title: '66+ Completed Projects' },
  { id: 2, icon: IconUsers,       title: '45+ Workers' },
  { id: 3, icon: IconMapPin,      title: '2+ Office Locations' },
  { id: 4, icon: IconAward,       title: '10+ Years of Trust & Partnership' },
  { id: 5, icon: IconShield,      title: 'ISO Certified Quality' },
  { id: 6, icon: IconHeadset,     title: 'Free Consulting Service' },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren' },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    // 1.5s covers the 5 gaps between 6 items (0.3s per gap)
    transition: { duration: 1.5, ease: 'linear' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  }),
};

// --- Component ---
export const StatsSection = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const styles: Record<string, React.CSSProperties> = {
    section: {
      backgroundColor: theme.colors.background,
      fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: theme.colors.textMain,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '60px 20px' : '60px 40px',
      position: 'relative',
      overflow: 'hidden',
    },
    ambientOrb1: {
      position: 'absolute',
      top: '-10%',
      left: '-5%',
      width: '40vw',
      height: '40vw',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)',
      filter: 'blur(60px)',
      zIndex: 0,
    },
    ambientOrb2: {
      position: 'absolute',
      bottom: '-10%',
      right: '-5%',
      width: '50vw',
      height: '50vw',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)',
      filter: 'blur(80px)',
      zIndex: 0,
    },
    container: {
      maxWidth: '1280px',
      width: '100%',
      margin: '0 auto',
      position: 'relative',
      zIndex: 1,
    },
    featuresWrapper: {
      position: 'relative',
      margin: 0,
    },
    connectingLine: {
      position: 'absolute',
      top: '40px', // vertically centers on the 80px icon wrapper
      left: '8.33%',
      right: '8.33%',
      height: '2px',
      backgroundColor: theme.colors.border,
      zIndex: 0,
      display: isMobile || isTablet ? 'none' : 'block',
      transformOrigin: 'left center',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)',
      gap: isMobile ? '24px' : '20px',
      position: 'relative',
      zIndex: 1,
    },
    featureCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      padding: '0 12px',
    },
    featureIconOuter: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
      position: 'relative',
    },
    featureIconInner: {
      width: '72px',
      height: '72px',
      borderRadius: '50%',
      backgroundColor: theme.colors.background,
      border: `1px solid ${theme.colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colors.surface,
      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease',
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: 600,
      color: theme.colors.textMain,
      marginBottom: '16px',
      lineHeight: 1.3,
      minHeight: '42px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    featureBottomLine: {
      width: '24px',
      height: '2px',
      backgroundColor: theme.colors.border,
      marginTop: 'auto',
    },
  };

  return (
    <section style={styles.section}>
      {/* Ambient Background Orbs */}
      <div style={styles.ambientOrb1} />
      <div style={styles.ambientOrb2} />

      <motion.div
        style={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div style={styles.featuresWrapper}>
          {/* Animated connecting line — desktop only */}
          <motion.div style={styles.connectingLine} variants={lineVariants} />

          <motion.div style={styles.featuresGrid} variants={containerVariants}>
            {featuresData.map((feature, index) => (
              <motion.div
                key={feature.id}
                style={styles.featureCard}
                custom={index}
                variants={cardVariants}
                whileHover="hover"
              >
                <div style={styles.featureIconOuter}>
                  <motion.div
                    style={styles.featureIconInner}
                    variants={{
                      hover: {
                        y: -5,
                        boxShadow: '0 15px 30px -5px rgba(255,255,255,0.15)',
                        borderColor: theme.colors.surface,
                        color: theme.colors.surface,
                      },
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <feature.icon size={28} />
                  </motion.div>
                </div>

                <h3 style={styles.featureTitle}>{feature.title}</h3>

                <motion.div
                  style={styles.featureBottomLine}
                  variants={{
                    hover: { width: '48px', backgroundColor: theme.colors.surface },
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
