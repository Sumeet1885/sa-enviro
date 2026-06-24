import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ─── Window Size Hook ─────────────────────────────────────────────────────────
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// ─── Theme ────────────────────────────────────────────────────────────────────
const theme = {
  colors: {
    bgLight: '#F8FAFC',
    navyDark: '#0A1526',
    bluePrimary: '#005DE8',
    blueAccent: '#005DE8',
    textMain: '#1E293B',
    textMuted: '#64748B',
    white: '#FFFFFF',
    borderLight: '#E2E8F0',
  },
  fonts: {
    serif: "var(--font-family-serif)",
    sans: "var(--font-family-sans)",
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icons = {
  WaterDrop: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      <path d="M12 18h.01" />
    </svg>
  ),
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Leaf: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 4 13v-5a2 2 0 0 1 2-2h5a7 7 0 0 1 7 7v5a2 2 0 0 1-2 2h-5z" />
      <path d="M11 20v-5" />
      <path d="M7 16l4-4" />
      <path d="M15 12l4-4" />
    </svg>
  ),
  Document: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Download: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Play: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3l14 9-14 9V3z" />
    </svg>
  ),
  HandDrawnArrow: () => (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ overflow: 'visible' }}>
      <path d="M80,90 Q50,90 30,50 Q15,10 10,20" />
      <path d="M5,10 L10,20 L20,15" />
    </svg>
  ),
};

// ─── Brochure Config (matches BrochureSection) ───────────────────────────────
const BROCHURE_PDF_URL = '/Broucher.pdf';
const BROCHURE_FILENAME = 'SA.pdf';

// ─── Background Component (same style as Certification) ──────────────────────
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
        <linearGradient id="about-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#e0f2fe', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path d="M-100 200 C 200 100, 400 400, 800 200 S 1200 400, 1600 100" fill="none" stroke="#e0f2fe" strokeWidth="1" opacity="0.5" />
      <path d="M-100 220 C 250 120, 350 420, 850 220 S 1150 420, 1600 120" fill="none" stroke="#bae6fd" strokeWidth="0.5" opacity="0.4" />
      <path d="M-100 240 C 300 140, 300 440, 900 240 S 1100 440, 1600 140" fill="none" stroke="#e0f2fe" strokeWidth="1.5" opacity="0.3" />
      <path d="M-100 800 C 300 900, 500 600, 1000 800 S 1400 600, 1800 900" fill="none" stroke="#e0f2fe" strokeWidth="1" opacity="0.5" />
      <circle cx="10%" cy="20%" r="300" fill="url(#about-grad1)" opacity="0.4" />
      <circle cx="90%" cy="80%" r="400" fill="url(#about-grad1)" opacity="0.3" />
    </svg>
  </div>
);

// ─── About Section ────────────────────────────────────────────────────────────
export const AboutSection: React.FC = () => {
  const { width } = useWindowSize();
  const isMobile = width < 1024;
  const isTablet = width >= 768 && width < 1024;

  const [dl, setDl] = useState(false);

  const handleDownload = () => {
    setDl(true);
    setTimeout(() => setDl(false), 2000);
  };

  return (
    <>


      <div id="about" style={{
        minHeight: isMobile ? 'auto' : '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: '#ffffff',
        padding: isMobile ? '60px 24px' : isTablet ? '60px 48px' : '80px 6%',
      }}>
        <BackgroundPattern />

        {/* ── Center-aligned Badge (similar to Certification badge) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            width: '100%',
            zIndex: 10,
          }}
        >
          <div style={{ height: '1px', width: '40px', backgroundColor: theme.colors.bluePrimary, opacity: 0.5 }} />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: theme.colors.bluePrimary,
            fontWeight: 600,
            letterSpacing: '1px',
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            fontFamily: theme.fonts.sans,
          }}>
            <svg viewBox="0 0 24 24" fill={theme.colors.bluePrimary} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
              <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
            </svg>
            About Us
          </div>
          <div style={{ height: '1px', width: '40px', backgroundColor: theme.colors.bluePrimary, opacity: 0.5 }} />
        </motion.div>

        {/* ── Columns Container ── */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          flex: 1,
          alignItems: 'center',
        }}>

          {/* ── LEFT COLUMN (CONTENT) ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              width: isMobile ? '100%' : '55%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              zIndex: 10,
              position: 'relative',
              paddingRight: isMobile ? '0' : '4%',
            }}
          >


          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: theme.fonts.serif,
              fontSize: 'clamp(2.5rem, 3.5vw, 4rem)',
              lineHeight: 1.1,
              color: theme.colors.navyDark,
              marginBottom: '20px',
              fontWeight: 400,
            }}
          >
            Solutions that<br/>
            go beyond treatment.<br/>
            <span style={{
              color: theme.colors.blueAccent,
              fontWeight: 400,
            }}>
              Impact that flows forward.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: theme.fonts.sans,
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: theme.colors.textMuted,
              lineHeight: 1.5,
              maxWidth: '480px',
              marginBottom: '32px',
              fontWeight: 300,
            }}
          >
            We design and deliver intelligent water treatment systems that ensure purity, protect resources, and empower a sustainable future.
          </motion.p>

          {/* Features Timeline */}
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { title: 'Our Purpose', desc: 'To deliver clean water solutions that improve lives and preserve the planet.', icon: Icons.WaterDrop },
                { title: 'Our Commitment', desc: 'We combine innovation, expertise, and responsibility in every project we undertake.', icon: Icons.Shield },
                { title: 'Our Promise', desc: 'Reliable systems. Responsible processes. Real results that last.', icon: Icons.Leaf },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (idx * 0.2) }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative', zIndex: 1 }}
                >
                  {!isMobile && (
                    <>
                      {idx === 0 && (
                        <svg
                          style={{
                            position: 'absolute',
                            top: '-48px',
                            height: '68px',
                            left: '-24px',
                            width: '44px',
                            zIndex: -1,
                            pointerEvents: 'none',
                            overflow: 'visible',
                          }}
                          preserveAspectRatio="none"
                          viewBox="0 0 100 100"
                        >
                          <motion.path
                            d="M 50 0 C 50 60, -10 60, 100 100"
                            fill="none"
                            stroke={theme.colors.borderLight}
                            strokeWidth="1.5"
                            vectorEffect="non-scaling-stroke"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                          />
                        </svg>
                      )}

                      {idx < 2 && (
                        <svg
                          style={{
                            position: 'absolute',
                            top: '20px',
                            bottom: '-40px',
                            left: '-24px',
                            width: '44px',
                            zIndex: -1,
                            pointerEvents: 'none',
                            overflow: 'visible',
                          }}
                          preserveAspectRatio="none"
                          viewBox="0 0 100 100"
                        >
                          <motion.path
                            d="M 100 0 C -20 0, -20 100, 100 100"
                            fill="none"
                            stroke={theme.colors.bluePrimary}
                            strokeWidth="1.5"
                            vectorEffect="non-scaling-stroke"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.8 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.5 + (idx * 0.2) }}
                          />
                        </svg>
                      )}
                    </>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.1, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: theme.colors.white,
                      border: `1px solid ${theme.colors.borderLight}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.colors.navyDark,
                      flexShrink: 0,
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                      cursor: 'default',
                    }}
                  >
                    <div style={{ transform: 'scale(0.8)' }}>
                      <feature.icon />
                    </div>
                  </motion.div>
                  <div>
                    <h3 style={{
                      fontFamily: theme.fonts.serif,
                      fontSize: '1.1rem',
                      color: theme.colors.navyDark,
                      marginBottom: '4px',
                      fontWeight: 600,
                    }}>
                      {feature.title}
                    </h3>
                    <p style={{
                      fontFamily: theme.fonts.sans,
                      fontSize: '0.85rem',
                      color: theme.colors.textMuted,
                      lineHeight: 1.4,
                      maxWidth: '350px',
                      fontWeight: 300,
                    }}>
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN (VISUALS) ────────────────────────────────── */}
        <div style={{
          width: isMobile ? '100%' : '45%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '24px',
          padding: isMobile ? '20px 24px 60px' : '80px 48px 80px 0',
          zIndex: 5,
          position: 'relative',
        }}>

          {/* Video Container */}
          <div style={{
            width: '100%',
            aspectRatio: '16 / 9',
            // height: isMobile ? undefined : '60vh',
            // maxHeight: isMobile ? undefined : '550px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px',
            border: `6px solid ${theme.colors.bgLight}`,
            outline: `2px solid ${theme.colors.bluePrimary}`,
            boxShadow: `0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 2px ${theme.colors.bluePrimary}22`,
          }}>
            {/* Background Video */}
            <video
              src="https://res.cloudinary.com/dwttz8kvz/video/upload/v1778074474/SAEnviro_1_t0abij"
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                zIndex: 1,
              }}
            />
          </div>

          {/* CTA Box — Download Brochure */}
          <motion.a
            href={BROCHURE_PDF_URL}
            download={BROCHURE_FILENAME}
            onClick={handleDownload}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -4, boxShadow: '0 20px 40px -10px rgba(10, 22, 40, 0.4)' }}
            style={{
              textDecoration: 'none',
              backgroundColor: '#0D3B66',
              borderRadius: '16px',
              padding: isMobile ? '20px' : '16px 24px',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: isMobile ? '20px' : '0',
              boxShadow: '0 10px 30px -5px rgba(10, 22, 40, 0.3)',
              width: '100%',
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.colors.white,
              }}>
                <div style={{ transform: 'scale(0.8)' }}>
                  <Icons.Document />
                </div>
              </div>
              <p style={{
                fontFamily: theme.fonts.sans,
                fontSize: '0.85rem',
                color: theme.colors.white,
                lineHeight: 1.4,
                maxWidth: '220px',
                fontWeight: 400,
                margin: 0,
              }}>
                Explore our capabilities, technologies, and projects in detail.
              </p>
            </div>

            {!isMobile && (
              <div style={{ width: '1px', height: '32px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
            )}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color: theme.colors.white,
                fontFamily: theme.fonts.serif,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '8px',
                userSelect: 'none',
              }}
            >
              <div style={{ transform: 'scale(0.9)' }}>
                <Icons.Download />
              </div>
              {dl ? 'Preparing…' : 'Download Brochure'}
            </motion.div>
          </motion.a>

        </div>
      </div>
    </div>
  </>
  );
};
