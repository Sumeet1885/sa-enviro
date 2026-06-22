import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { certifications } from '@/constants/siteData';

// --- Types ---
type IconProps = React.SVGProps<SVGSVGElement>;

// --- Theme Definition (kept exactly as provided) ---
const theme = {
  primary: '#1662E4',
  secondary: '#0B1B3D',
  accentGreen: '#5CB85C',
  accentDark: '#0D3B66',
  textDark: '#1E293B',
  textLight: '#475569',
  textMuted: '#64748B',
  bgLight: '#F8FAFC',
  borderLight: '#E2E8F0',
};

// --- Custom Hook ---
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

// --- SVG Icons ---
const WaterDropIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const BadgeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const LeafIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const ShieldIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

// --- Background Component ---
const BackgroundPattern = () => (
  <div style={{
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: 'hidden',
    zIndex: 0,
    pointerEvents: 'none',
    opacity: 0.6
  }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0 }}>
      <defs>
        <linearGradient id="cert-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#e0f2fe', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path d="M-100 200 C 200 100, 400 400, 800 200 S 1200 400, 1600 100" fill="none" stroke="#e0f2fe" strokeWidth="1" opacity="0.5" />
      <path d="M-100 220 C 250 120, 350 420, 850 220 S 1150 420, 1600 120" fill="none" stroke="#bae6fd" strokeWidth="0.5" opacity="0.4" />
      <path d="M-100 240 C 300 140, 300 440, 900 240 S 1100 440, 1600 140" fill="none" stroke="#e0f2fe" strokeWidth="1.5" opacity="0.3" />
      <path d="M-100 800 C 300 900, 500 600, 1000 800 S 1400 600, 1800 900" fill="none" stroke="#e0f2fe" strokeWidth="1" opacity="0.5" />
      <circle cx="10%" cy="20%" r="300" fill="url(#cert-grad1)" opacity="0.4" />
      <circle cx="90%" cy="80%" r="400" fill="url(#cert-grad1)" opacity="0.3" />
    </svg>
  </div>
);

// --- Section Header Subtitle ---
const SectionSubtitle = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
    <div style={{ height: '1px', width: '40px', backgroundColor: theme.primary, opacity: 0.5 }} />
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: theme.primary,
      fontWeight: 600,
      letterSpacing: '1px',
      fontSize: '0.875rem',
      textTransform: 'uppercase' as const,
    }}>
      <WaterDropIcon style={{ width: '16px', height: '16px', fill: theme.primary }} />
      {children}
    </div>
    <div style={{ height: '1px', width: '40px', backgroundColor: theme.primary, opacity: 0.5 }} />
  </div>
);

// --- Animated Rectangular Border Component ---
const AnimatedRectangularBorder = ({ color, children }: { color: string; children: React.ReactNode }) => {
  const pathLength = 1210;

  return (
    <div style={{ position: 'relative', width: '284px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        viewBox="0 0 284 400"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'visible' }}
      >
        <path
          d="M 36 4 L 248 4 A 32 32 0 0 1 280 36 L 280 364 A 32 32 0 0 1 248 396 L 36 396 A 32 32 0 0 1 4 364 L 4 36 A 32 32 0 0 1 36 4 Z"
          fill="none"
          stroke={theme.borderLight}
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
        <motion.path
          d="M 36 4 L 248 4 A 32 32 0 0 1 280 36 L 280 364 A 32 32 0 0 1 248 396 L 36 396 A 32 32 0 0 1 4 364 L 4 36 A 32 32 0 0 1 36 4 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={`300 ${pathLength - 300}`}
          animate={{ strokeDashoffset: [pathLength, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          style={{ filter: `drop-shadow(0 0 3px ${color}44)` }}
        />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, padding: '32px 20px 20px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
};

// --- Certification Card Component (image-based) ---
interface CertCardProps {
  icon: React.ReactNode;
  color: string;
  imageUrl: string;
  imageAlt: string;
  delay?: number;
}

const CertCard = ({ icon, color, imageUrl, imageAlt, delay = 0 }: CertCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        textAlign: 'center' as const,
        position: 'relative',
        transformOrigin: 'center',
      }}
    >
      <AnimatedRectangularBorder color={color}>
        <div style={{
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}>
          {/* Floating icon badge */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: `0 10px 25px -5px ${color}66`,
              position: 'absolute',
              top: '-32px',
            }}
          >
            {icon}
          </motion.div>

          
          {/* Certificate image */}
          <div style={{
            flex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: '12px',
          }}>
            <img
              src={imageUrl}
              alt={imageAlt}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          </div>
        </div>
      </AnimatedRectangularBorder>
    </motion.div>
  );
};

// --- Main Exported Component ---
export const Certification_Section = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section style={{
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#ffffff',
      color: theme.textDark,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      padding: isMobile ? '60px 20px' : '60px 40px',
    }}>
      <BackgroundPattern />

      <div style={{
        width: '100%',
        maxWidth: '1200px',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
      }}>

        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '60px' }}
        >
          <SectionSubtitle>CERTIFICATIONS</SectionSubtitle>

          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: 800,
            lineHeight: 1.2,
            color: theme.secondary,
            margin: '0 0 24px 0',
            letterSpacing: '-0.02em',
          }}>
            Certified Standards. <br />
            <span style={{ color: theme.primary }}>Pure Commitment.</span>
          </h2>

          <p style={{
            fontSize: isMobile ? '1rem' : '1.125rem',
            color: theme.textLight,
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Our certifications reflect our dedication to quality, sustainability
            and the safety of communities we serve.
          </p>
        </motion.div>

        {/* Cards Row */}
        <div style={{
          display: 'flex',
          flexDirection: isTablet ? 'column' : 'row' as const,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: isTablet ? '60px' : '40px',
          marginBottom: '40px',
          paddingTop: '10px',
        }}>
          <CertCard
            icon={<BadgeIcon style={{ width: '32px' }} />}
            color={theme.primary}
            
            imageUrl={certifications[1].image}
            imageAlt={certifications[1].title}
            delay={0.1}
          />

          <CertCard
            icon={<LeafIcon style={{ width: '32px' }} />}
            color={theme.accentGreen}
            
            imageUrl={certifications[0].image}
            imageAlt={certifications[0].title}
            delay={0.4}
          />

          <CertCard
            icon={<ShieldIcon style={{ width: '32px' }} />}
            color={theme.accentDark}
            
            imageUrl={certifications[2].image}
            imageAlt={certifications[2].title}
            delay={0.7}
          />
        </div>

      </div>
    </section>
  );
};
