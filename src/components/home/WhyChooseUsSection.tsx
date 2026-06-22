import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

// ─── Font Loader ─────────────────────────────────────────────────────────────
// Injects Cormorant Garamond + Plus Jakarta Sans once into <head>.
const useFonts = () => {
  useEffect(() => {
    const id = 'why-choose-us-fonts';
    if (document.getElementById(id)) return;

    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';

    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap';

    document.head.appendChild(preconnect1);
    document.head.appendChild(preconnect2);
    document.head.appendChild(link);
  }, []);
};

// ─── Theme ───────────────────────────────────────────────────────────────────
const theme = {
  bg: '#F8FAFC',
  textDark: '#111827',
  textMuted: '#4b5563',
  primary: '#005DE8',
  primaryHover: '#004fc5',
  primaryLight: 'rgba(0, 93, 232, 0.05)',
  border: 'rgba(0, 93, 232, 0.08)',
  cardBg: 'rgba(255, 255, 255, 0.75)',
  cardShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.03)',
  glow: 'rgba(0, 93, 232, 0.05)',
  divider: 'rgba(0, 0, 0, 0.06)',
  bannerBg: 'rgba(0, 93, 232, 0.03)',
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface ValuePillar {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  stat: string;
  statLabel: string;
  color: string;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

// ─── Pillars Data ─────────────────────────────────────────────────────────────
const pillars: ValuePillar[] = [
  {
    id: 'turnkey',
    title: 'Turnkey Solutions',
    description:
      'From concept to commissioning, we offer end-to-end water treatment plant solutions tailored to your needs.',
    stat: '100%',
    statLabel: 'Full Execution Guarantee',
    color: '#3b82f6',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" />
      </svg>
    ),
  },
  {
    id: 'advanced',
    title: 'Advanced Technology',
    description:
      'We integrate proven, cutting-edge technologies to deliver maximum performance with minimum environmental impact.',
    stat: '0.01μm',
    statLabel: 'Ultrafiltration Precision',
    color: '#10b981',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" style={{ transformOrigin: 'center' }}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    id: 'quality',
    title: 'Quality & Reliability',
    description:
      'Engineered for durability and consistent performance, our systems ensure safe water—every time.',
    stat: '99.98%',
    statLabel: 'System Operational Uptime',
    color: '#f59e0b',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'sustainable',
    title: 'Sustainable by Design',
    description:
      'We build solutions that conserve resources, reduce energy consumption, and support a cleaner future.',
    stat: '40%',
    statLabel: 'Reduced Energy Footprint',
    color: '#14b8a6',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M2 22 16 8" />
        <path d="M14 14a8 8 0 0 0 8-8 8 8 0 0 0-8 8z" />
        <path d="M18 10a6 6 0 0 0-6 6" />
      </svg>
    ),
  },
  {
    id: 'expertise',
    title: 'Expertise That Matters',
    description:
      'Backed by decades of experience, our team brings deep domain knowledge and a passion for solving complex challenges.',
    stat: '35+',
    statLabel: 'Years Global Domain Presence',
    color: '#8b5cf6',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'partnership',
    title: 'Long-Term Partnership',
    description:
      'We go beyond delivery—offering reliable support, maintenance, and upgrades to keep your plant running at its best.',
    stat: '24/7',
    statLabel: 'Telemetry & Field Support',
    color: '#ec4899',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export const WhyChooseUsSection: React.FC = () => {
  useFonts();

  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const t = theme;
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1100;

  const sparklesList = useMemo<Sparkle[]>(() => {
    const list: Sparkle[] = [];
    for (let i = 0; i < 20; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 6 + 4,
      });
    }
    return list;
  }, []);

  return (
    <section
      style={{
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        backgroundColor: t.bg,
        color: t.textDark,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition:
          'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1), color 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: isMobile ? '32px 16px' : '64px 40px',
      }}
    >
      {/* ── Ambient glow blobs ── */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '5%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${t.glow} 0%, rgba(0,0,0,0) 70%)`,
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '5%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(37, 99, 235, 0.04) 0%, rgba(0,0,0,0) 80%)`,
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />



      {/* ── Main content wrapper ── */}
      <div
        style={{
          maxWidth: '1280px',
          width: '100%',
          zIndex: 2,
          position: 'relative',
        }}
      >
        {/* ── Header: Title block + Promise block ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
            gap: isMobile ? '24px' : '64px',
            alignItems: 'start',
            marginBottom: isMobile ? '32px' : '40px',
          }}
        >
          {/* Left Column: Title Block */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: '#005DE8',
                  textTransform: 'uppercase',
                }}
              >
                Why Choose Us
              </span>
              <div style={{ width: '40px', height: '1.5px', backgroundColor: '#005DE8' }} />
            </div>

            <h2
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: isMobile ? '40px' : isTablet ? '52px' : '64px',
                fontWeight: 400,
                color: t.textDark,
                lineHeight: 1.15,
                margin: '0 0 24px 0',
                letterSpacing: '-0.02em',
              }}
            >
              Engineering Clean Water.
              <br />
              <span
                style={{
                  fontStyle: 'italic',
                  color: '#005DE8',
                  fontWeight: 600,
                  position: 'relative',
                  display: 'inline-block',
                }}
              >
                Enriching Lives.
                <svg
                  width="18"
                  height="24"
                  viewBox="0 0 18 24"
                  fill="none"
                  style={{
                    position: 'absolute',
                    right: isMobile ? '-24px' : '-32px',
                    bottom: '12px',
                    color: '#005DE8',
                  }}
                >
                  <path
                    d="M9 22c4.418 0 8-3.582 8-8 0-4.3-8-13-8-13S1 9.7 1 14c0 4.418 3.582 8 8 8z"
                    fill="currentColor"
                    opacity="0.15"
                  />
                  <path
                    d="M9 22a8 8 0 0 0 8-8c0-4.3-8-13-8-13S1 9.7 1 14a8 8 0 0 0 8 8z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </h2>

            <p
              style={{
                fontSize: isMobile ? '15px' : '17px',
                lineHeight: 1.65,
                color: t.textMuted,
                maxWidth: '540px',
                margin: 0,
              }}
            >
              We design and deliver advanced water treatment solutions that ensure purity, efficiency,
              and sustainability—today and for generations to come.
            </p>
          </div>

          {/* Right Column: "Our Promise" block */}
          <div
            style={{
              borderLeft: isMobile ? 'none' : `1px solid ${t.divider}`,
              paddingLeft: isMobile ? '0' : '48px',
              paddingTop: isMobile ? '16px' : '12px',
              borderTop: isMobile ? `1px solid ${t.divider}` : 'none',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '24px',
              marginTop: '12px',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(0, 93, 232, 0.05)',
                borderRadius: '50%',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#005DE8',
                boxShadow: '0 8px 24px -6px rgba(0, 93, 232, 0.15)',
                flexShrink: 0,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" />
                <path d="M12 11c-1.5 0-3 1.5-3 3" />
              </svg>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#005DE8',
                  margin: '0 0 10px 0',
                  letterSpacing: '-0.01em',
                }}
              >
                Our Promise
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: t.textMuted,
                  margin: 0,
                }}
              >
                Every project we undertake is guided by our commitment to quality, safety, and the
                responsible use of water—nature's most precious resource.
              </p>
            </div>
          </div>
        </div>

        {/* ── Pulsing divider line with tracking dot ── */}
        {!isMobile && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '1px',
              backgroundColor: t.divider,
              marginBottom: '32px',
            }}
          >
            <motion.div
               animate={{
                 left: hoveredPillar
                   ? `${(pillars.findIndex((p) => p.id === hoveredPillar) * 16.66) + 8.33}%`
                   : '50%',
                 backgroundColor: hoveredPillar
                   ? pillars.find((p) => p.id === hoveredPillar)?.color
                   : '#005DE8',
               }}
               transition={{ type: 'spring', stiffness: 80, damping: 15 }}
               style={{
                 position: 'absolute',
                 top: '-5px',
                 width: '11px',
                 height: '11px',
                 borderRadius: '50%',
                 boxShadow: '0 0 14px 4px rgba(0, 93, 232, 0.4)',
                 transform: 'translateX(-50%)',
                 zIndex: 4,
               }}
            />
          </div>
        )}

        {/* ── 6-Pillar Card Grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(6, 1fr)',
            gap: isMobile ? '24px' : '20px',
            marginBottom: '16px',
          }}
        >
          {pillars.map((pillar) => {
            const isHovered = hoveredPillar === pillar.id;
            return (
              <motion.div
                key={pillar.id}
                onMouseEnter={() => setHoveredPillar(pillar.id)}
                onMouseLeave={() => setHoveredPillar(null)}
                whileHover={{ y: -8 }}
                style={{
                  backgroundColor: t.cardBg,
                  borderRadius: '16px',
                  padding: '24px 20px',
                  border: `1px solid ${isHovered ? pillar.color : t.border}`,
                  boxShadow: isHovered
                    ? `0 24px 48px -15px rgba(0, 93, 232, 0.08)`
                    : t.cardShadow,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  textAlign: isMobile ? 'left' : 'center',
                  transition:
                    'border-color 0.4s ease, box-shadow 0.4s ease, background-color 0.5s ease',
                  overflow: 'hidden',
                }}
              >
                {/* Micro glow behind hovered card */}
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-40px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${pillar.color}25 0%, rgba(0,0,0,0) 70%)`,
                      pointerEvents: 'none',
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Card connector dot (desktop) */}
                {!isMobile && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-52px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: isHovered ? pillar.color : '#cbd5e1',
                      border: `2px solid ${t.bg}`,
                      zIndex: 5,
                      transition: 'background-color 0.3s ease',
                    }}
                  />
                )}

                {/* Animated icon circle */}
                <div
                  style={{
                    backgroundColor: isHovered ? `${pillar.color}15` : 'rgba(0,0,0,0.02)',
                    borderRadius: '50%',
                    width: '56px',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isHovered ? pillar.color : t.textMuted,
                    marginBottom: '20px',
                    border: `1px solid ${isHovered ? `${pillar.color}30` : 'transparent'}`,
                    transition: 'all 0.3s ease',
                    zIndex: 1,
                  }}
                >
                  <motion.div
                    animate={isHovered ? { rotate: [0, 5, -5, 0], scale: 1.08 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {pillar.icon}
                  </motion.div>
                </div>

                {/* Pillar title */}
                <h4
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: t.textDark,
                    margin: '0 0 12px 0',
                    lineHeight: 1.35,
                    zIndex: 1,
                  }}
                >
                  {pillar.title}
                </h4>

                {/* Pillar description */}
                <p
                  style={{
                    fontSize: '11.5px',
                    lineHeight: 1.65,
                    color: '#0f172a',
                    fontWeight: 500,
                    margin: '0 0 20px 0',
                    flexGrow: 1,
                    zIndex: 1,
                  }}
                >
                  {pillar.description}
                </p>

                {/* Decorative accent line */}
                <div
                  style={{
                    width: '32px',
                    height: '2px',
                    backgroundColor: isHovered ? pillar.color : t.divider,
                    borderRadius: '1px',
                    transition: 'all 0.3s ease',
                    zIndex: 1,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
