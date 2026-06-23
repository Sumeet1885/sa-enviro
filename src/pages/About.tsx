import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SEO } from "@/components/layout/SEO";
import { seoData } from "@/constants/siteData";
import TeamSlider from "@/components/Sections/Team_Section";
import { Droplet } from 'lucide-react';

// --- Types & Theme ---

type Breakpoints = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

const colors = {
  primary: '#0D3B66', // Deep corporate blue
  accent: '#0056B3',  // Bright action blue
  textMain: '#1A2A3A',
  textLight: '#5C6B7A',
  bgLight: '#F8FAFC',
  white: '#FFFFFF',
  border: '#E2E8F0',
  navyDark: '#0A1526',
  blueAccent: '#005DE8',
};

const typography = {
  fontSans: 'var(--font-family-sans)',
  fontSerif: 'var(--font-family-serif)',
};

// --- Hooks ---

function useResponsive(): Breakpoints {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: windowWidth < 768,
    isTablet: windowWidth >= 768 && windowWidth < 1024,
    isDesktop: windowWidth >= 1024,
  };
}

// --- Icons (Inline SVGs) ---

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
    <path d="M12 2.5C12 2.5 5 10 5 15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15C19 10 12 2.5 12 2.5Z" fill={colors.accent}/>
    <path d="M12 10.5C12 10.5 8 15 8 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const DropOutlineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3C12 3 5 10.5 5 15.5C5 19.0899 7.91015 22 11.5 22C15.0899 22 18 19.0899 18 15.5C18 10.5 12 3 12 3Z" stroke={colors.accent} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M15 15.5C15 17.433 13.433 19 11.5 19" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// --- New Icons for Features Bar ---
const ShieldIcon = ({ color = colors.primary }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BulbIcon = ({ color = colors.primary }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18H15M10 21H14M15.14 14.85C16.31 13.68 17 12.02 17 10C17 7.24 14.76 5 12 5C9.24 5 7 7.24 7 10C7 12.02 7.69 13.68 8.86 14.85L9 15V18H15V15L15.14 14.85Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2V3M4.22 4.22L4.93 4.93M1 12H2M4.22 19.78L4.93 19.07M19.78 4.22L19.07 4.93M23 12H22M19.78 19.78L19.07 19.07" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LeafIcon = ({ color = colors.primary }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 22C2 22 3 10 11 4C19 -2 22 2 22 2C22 2 26 12 18 18C10 24 2 22 2 22Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 22L14 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BullseyeIcon = ({ color = colors.primary }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="1" fill={color}/>
    <path d="M21 3L15 9M21 3L17 3M21 3L21 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EyeIcon = ({ color = colors.accent }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke={colors.white} strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="5" stroke={colors.white} strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="1" fill={colors.white}/>
    <path d="M21 3L15 9" stroke={colors.white} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// --- Animations ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// --- Background Pattern Component (matching homepage About section) ---
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
        <linearGradient id="about-hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#e0f2fe', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path d="M-100 200 C 200 100, 400 400, 800 200 S 1200 400, 1600 100" fill="none" stroke="#e0f2fe" strokeWidth="1" opacity="0.5" />
      <path d="M-100 220 C 250 120, 350 420, 850 220 S 1150 420, 1600 120" fill="none" stroke="#bae6fd" strokeWidth="0.5" opacity="0.4" />
      <path d="M-100 240 C 300 140, 300 440, 900 240 S 1100 440, 1600 140" fill="none" stroke="#e0f2fe" strokeWidth="1.5" opacity="0.3" />
      <path d="M-100 800 C 300 900, 500 600, 1000 800 S 1400 600, 1800 900" fill="none" stroke="#e0f2fe" strokeWidth="1" opacity="0.5" />
      <circle cx="10%" cy="20%" r="300" fill="url(#about-hero-grad)" opacity="0.4" />
      <circle cx="90%" cy="80%" r="400" fill="url(#about-hero-grad)" opacity="0.3" />
    </svg>
  </div>
);


// --- Components ---

const HeroSection = () => {
  const { isMobile, isTablet } = useResponsive();

  const heroStyles: React.CSSProperties = {
    position: 'relative',
    minHeight: isMobile || isTablet ? 'auto' : '100vh',
    height: 'auto',
    overflow: 'visible',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.white,
    paddingTop: isMobile || isTablet ? '120px' : '130px', // Space for header
  };

  const topContentWrapper: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: isMobile || isTablet ? 'column' : 'row',
    alignItems: 'center',
    padding: isMobile ? '0 5% 40px' : isTablet ? '0 5% 40px' : '0 5% 15px 10%',
    position: 'relative',
    zIndex: 2,
    minHeight: 0,
  };

  const textContentStyles: React.CSSProperties = {
    flex: '1.2',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 0,
  };

  const imageWrapperStyles: React.CSSProperties = {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: isMobile || isTablet ? '40px 0' : '0 0 0 5%',
    minHeight: 0,
  };

  const featuresBarStyles: React.CSSProperties = {
    width: '100%',
    backgroundColor: colors.white,
    position: 'relative',
    zIndex: 2,
    padding: isMobile || isTablet ? '20px 0 40px' : '10px 0 32px',
  };

  const featuresGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(4, 1fr)',
    gap: '16px',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: isMobile ? '0 5%' : '0 5%',
    alignItems: 'stretch',
  };

  const features = [
    { title: 'Trusted', desc: 'Built on integrity, transparency, and trust.', renderIcon: (c: string) => <ShieldIcon color={c} /> },
    { title: 'Innovative', desc: 'Leveraging technology for smarter solutions.', renderIcon: (c: string) => <BulbIcon color={c} /> },
    { title: 'Responsible', desc: 'Committed to communities and the environment.', renderIcon: (c: string) => <LeafIcon color={c} /> },
    { title: 'Results-Driven', desc: 'Focused on performance that creates real impact.', renderIcon: (c: string) => <BullseyeIcon color={c} /> },
  ];

  return (
    <section style={heroStyles}>
      <BackgroundPattern />

      {/* Main Hero Split */}
      <div style={topContentWrapper}>
        
        {/* Left Content Area */}
        <div style={textContentStyles}>
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>

            <motion.h1 variants={fadeInUp} style={{
              fontFamily: typography.fontSerif,
              color: colors.navyDark,
              fontSize: isMobile ? '3rem' : isTablet ? '3.2rem' : '3.8rem',
              lineHeight: 1.15,
              fontWeight: 600,
              marginBottom: isMobile || isTablet ? '32px' : '16px',
            }}>
              Pure Solutions.<br/>
              <span style={{ color: colors.blueAccent }}>Stronger Tomorrow.</span>
            </motion.h1>

            <motion.div variants={fadeInUp} style={{ width: '30px', height: '2px', backgroundColor: colors.accent, marginBottom: isMobile || isTablet ? '32px' : '16px' }} />

            <motion.p variants={fadeInUp} style={{
              fontFamily: typography.fontSans,
              color: colors.textLight,
              fontSize: isMobile || isTablet ? '1.1rem' : '1.05rem',
              lineHeight: isMobile || isTablet ? 1.8 : 1.6,
              maxWidth: '550px',
              marginBottom: isMobile || isTablet ? '48px' : '20px',
            }}>
              At SA Enviro Solutions, we believe clean water is the foundation 
              of healthy communities and a sustainable future. With innovation, 
              expertise, and a deep sense of responsibility, we deliver reliable 
              water treatment solutions that make a lasting difference.
            </motion.p>

            <motion.div variants={fadeInUp} style={{
               display: 'flex',
               alignItems: 'center',
               borderLeft: `2px solid ${colors.accent}`,
               paddingLeft: '24px',
            }}>
              <div style={{
                width: isMobile || isTablet ? '56px' : '44px',
                height: isMobile || isTablet ? '56px' : '44px',
                borderRadius: '50%',
                backgroundColor: '#F0F6FC',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: isMobile || isTablet ? '20px' : '14px',
                flexShrink: 0,
              }}>
                <DropOutlineIcon />
              </div>
              <span style={{
                fontFamily: typography.fontSans,
                color: colors.primary,
                fontWeight: 600,
                fontSize: isMobile || isTablet ? '1.1rem' : '0.95rem',
                lineHeight: 1.4,
              }}>
                Clean Water. Better Life. 
                <span style={{ color: colors.blueAccent }}> Sustainable Future.</span>
              </span>
            </motion.div>

          </motion.div>
        </div>

        {/* Right Image Area */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={imageWrapperStyles}
        >
          <img 
            src="https://res.cloudinary.com/dwttz8kvz/image/upload/v1782049270/About_vhb7ec.webp" 
            alt="Water Treatment Solutions"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: isMobile ? '350px' : isTablet ? '500px' : '55vh',
              objectFit: 'contain', 
              pointerEvents: 'none', 
              filter: 'drop-shadow(0 20px 40px rgba(13, 59, 102, 0.1))',
            }}
          />
        </motion.div>
      </div>

      {/* Bottom Features Bar */}
      <div style={featuresBarStyles}>
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          style={featuresGridStyles}
        >
          {features.map((feature, idx) => {
            const isDark = feature.title === 'Trusted' || feature.title === 'Responsible';
            const iconColor = isDark ? colors.white : colors.primary;

            return (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: isMobile || isTablet ? '24px' : '16px 20px',
                  backgroundColor: isDark ? '#0D3B66' : colors.white,
                  borderRadius: '16px',
                  boxShadow: isDark ? '0 10px 30px rgba(13,59,102,0.15)' : 'none',
                  border: isDark ? 'none' : `1px solid ${colors.border}`,
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#F0F6FC',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '16px',
                  flexShrink: 0,
                }}>
                  {feature.renderIcon(iconColor)}
                </div>
                <div>
                  <h4 style={{
                    fontFamily: typography.fontSerif,
                    color: isDark ? colors.white : colors.primary,
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    marginBottom: '4px',
                  }}>{feature.title}</h4>
                  <p style={{
                    fontFamily: typography.fontSans,
                    color: isDark ? 'rgba(255,255,255,0.8)' : colors.textLight,
                    fontSize: '0.8rem',
                    lineHeight: 1.5,
                    margin: 0,
                  }}>{feature.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const VisionMissionValues = () => {
  const { isMobile } = useResponsive();

  const sectionStyle: React.CSSProperties = {
    padding: isMobile ? '4rem 1.5rem' : '4rem 2rem',
    backgroundColor: '#ffffff', 
    position: 'relative',
    zIndex: 5,
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'left',
    marginBottom: isMobile ? '40px' : '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const bentoGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    alignItems: 'stretch',
  };

  return (
    <section style={sectionStyle}>
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        
        {/* Asymmetrical Section Header */}
        <motion.div variants={fadeInUp} style={headerStyle}>
          <span style={{
            fontFamily: typography.fontSans,
            color: colors.blueAccent,
            fontWeight: 700,
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px'
          }}>
            Our Philosophy
            <div style={{ width: '40px', height: '1.5px', backgroundColor: colors.accent }} />
          </span>
          <h2 style={{
            fontFamily: typography.fontSerif,
            fontSize: isMobile ? '2.5rem' : '3.5rem', // Reduced font size here
            lineHeight: 1.1,
            fontWeight: 600,
            marginBottom: '0',
            letterSpacing: '-0.02em',
          }}>
            Purpose & <span style={{  color: colors.blueAccent }}>Principles.</span>
          </h2>
        </motion.div>

        {/* Asymmetrical Bento Grid */}
        <div style={bentoGridStyle}>
          
          {/* Values - Tall Left Card (Soft & Light) */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ y: -5 }}
            style={{
              gridColumn: isMobile ? '1 / -1' : '1 / 6',
              gridRow: isMobile ? 'auto' : '1 / 3',
              backgroundColor: colors.white,
              borderRadius: '40px 4px 40px 4px', 
              padding: isMobile ? '30px 20px' : '36px 40px',
              border: `1px solid ${colors.border}`,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 50px rgba(13, 59, 102, 0.05)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: isMobile ? 'auto' : '400px',
            }}
          >
            <div style={{ position: 'relative', zIndex: 1, marginBottom: '24px' }}>
              <div style={{ 
                width: '50px', height: '50px', borderRadius: '50%', 
                backgroundColor: '#F0F6FC', display: 'flex', 
                justifyContent: 'center', alignItems: 'center', marginBottom: '16px' 
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 9L12 22L22 9L17 2H7L2 9Z" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{
                fontFamily: typography.fontSerif,
                color: colors.primary,
                fontSize: '2rem',
                fontWeight: 600,
                marginBottom: '0',
              }}>Our Values</h3>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative',
              zIndex: 1,
            }}>
              {[
                { name: 'Respect', num: '01' },
                { name: 'Integrity', num: '02' },
                { name: 'Accountability', num: '03' },
                { name: 'Reliability', num: '04' }
              ].map((val, idx) => (
                <div key={idx} style={{ 
                  display: 'flex', 
                  alignItems: 'baseline', 
                  gap: '16px',
                  borderBottom: `1px solid ${colors.border}`,
                  paddingBottom: '12px'
                }}>
                  <span style={{ 
                    fontFamily: typography.fontSans, 
                    color: colors.accent, 
                    fontSize: '0.85rem', 
                    fontWeight: 600 
                  }}>{val.num}</span>
                  <span style={{ 
                    fontFamily: typography.fontSans, 
                    color: colors.textMain, 
                    fontSize: '1.1rem',
                    fontWeight: 500,
                  }}>{val.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mission - Top Right Card (Dark & Corporate) */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ y: -5 }}
            style={{
              gridColumn: isMobile ? '1 / -1' : '6 / 13',
              gridRow: isMobile ? 'auto' : '1 / 2',
              backgroundColor: '#0D3B66',
              borderRadius: '4px 40px 4px 4px',
              padding: isMobile ? '30px 20px' : '36px 40px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              gap: '24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 60%)',
              pointerEvents: 'none',
            }}/>
            
            <div style={{ flexShrink: 0, zIndex: 1 }}>
              <div style={{ 
                width: '50px', height: '50px', borderRadius: '50%', 
                backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', 
                justifyContent: 'center', alignItems: 'center' 
              }}>
                <TargetIcon />
              </div>
            </div>

            <div style={{ zIndex: 1 }}>
              <h3 style={{
                fontFamily: typography.fontSerif,
                color: colors.white,
                fontSize: '1.75rem',
                fontWeight: 600,
                marginBottom: '8px',
              }}>Mission</h3>
              <p style={{
                fontFamily: typography.fontSans,
                color: 'rgba(255,255,255,0.85)',
                fontSize: '1.05rem',
                lineHeight: 1.5,
                maxWidth: '400px',
                margin: 0,
              }}>
                To meet Industries requirement in regards with best clamed services.
              </p>
            </div>
          </motion.div>

          {/* Vision - Bottom Right Card (Vibrant & Structural) */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ y: -5 }}
            style={{
              gridColumn: isMobile ? '1 / -1' : '6 / 13',
              gridRow: isMobile ? 'auto' : '2 / 3',
              backgroundColor: colors.accent,
              borderRadius: '4px 4px 40px 4px',
              padding: isMobile ? '30px 20px' : '36px 40px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
               <EyeIcon color={colors.white} /> 
               <h3 style={{
                  fontFamily: typography.fontSerif,
                  color: colors.white,
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  margin: 0,
                }}>Vision</h3>
            </div>
            
             <p style={{
              fontFamily: typography.fontSans,
              color: colors.white,
              fontSize: '1.35rem',
              lineHeight: 1.4,
              fontWeight: 400,
              maxWidth: '500px',
              margin: 0,
            }}>
              Assisting to secure our planet’s most <span style={{ fontWeight: 600, borderBottom: '2px solid white' }}>valuable resources.</span>
            </p>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};



// --- Our Story Component ---

const storyTheme = {
  colors: {
    background: '#F8FAFC', // Matches Testimonials section background
    primaryBlue: '#005DE8', // Vibrant, trustworthy enterprise blue
    primaryBlueLight: '#E8EFFC',
    textMain: '#0F172A', // Slate 900
    textMuted: '#475569', // Slate 600
    textLighter: '#64748B', // Slate 500
    borderLight: '#E2E8F0', // Slate 200
    lineColor: '#CBD5E1', // Slate 300
    cardBg: 'rgba(255, 255, 255, 0.85)',
  },
  fonts: {
    serif: 'var(--font-family-serif)',
    sans: 'var(--font-family-sans)',
  },
  shadows: {
    soft: '0 10px 40px -10px rgba(15, 23, 42, 0.05)',
    hover: '0 20px 40px -10px rgba(21, 74, 201, 0.1)',
  }
};

interface TimelineItem {
  num: string;
  title: string;
  desc: string;
}

const timelineData: TimelineItem[] = [
  {
    num: "01",
    title: "The Beginning",
    desc: "Our story started with a small dream – to make clean water accessible to every community."
  },
  {
    num: "02",
    title: "Growing Stronger",
    desc: "Through innovation and dedication, we expanded our solutions and earned the trust of industries and communities."
  },
  {
    num: "03",
    title: "Creating Impact",
    desc: "Today, our solutions empower a cleaner, healthier world and create a lasting impact for generations."
  },
  {
    num: "04",
    title: "The Future",
    desc: "We continue to evolve, embrace new technologies, and shape a sustainable future—together."
  }
];

const staggerOurStory = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const fadeUpOurStory = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', damping: 25, stiffness: 100 } 
  }
};

const OurStory = () => {
  const { isMobile } = useResponsive();

  const styles: Record<string, React.CSSProperties> = {
    section: {
      position: 'relative',
      backgroundColor: storyTheme.colors.background,
      fontFamily: storyTheme.fonts.sans,
      color: storyTheme.colors.textMain,
      overflow: 'hidden',
      padding: isMobile ? '4rem 1.5rem' : '0rem 1.5rem',
      display: 'flex',
      justifyContent: 'center',
    },
    ambientGlowTop: {
      position: 'absolute',
      top: '-10%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: isMobile ? '300px' : '600px',
      height: isMobile ? '300px' : '600px',
      background: `radial-gradient(circle, rgba(21, 74, 201, 0.03) 0%, rgba(248, 250, 252, 0) 70%)`,
      filter: 'blur(40px)',
      zIndex: 0,
      pointerEvents: 'none',
    },
    container: {
      maxWidth: '1100px',
      width: '100%',
      position: 'relative',
      zIndex: 1,
    },
    headerWrapper: {
      textAlign: 'center',
      maxWidth: '800px',
      margin: '3rem auto 0',
    },
    kicker: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      marginBottom: '1rem',
    },
    kickerLine: {
      width: '40px',
      height: '1px',
      backgroundColor: storyTheme.colors.primaryBlue,
      opacity: 0.5,
    },
    kickerText: {
      textTransform: 'uppercase',
      color: storyTheme.colors.primaryBlue,
      fontWeight: 600,
      letterSpacing: '0.1em',
      fontSize: '0.875rem',
    },
    iconWrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1.5rem',
      color: storyTheme.colors.primaryBlue,
    },
    title: {
      fontFamily: storyTheme.fonts.serif,
      fontSize: isMobile ? '2.5rem' : '4rem',
      fontWeight: 400,
      lineHeight: 1.1,
      marginBottom: '1.5rem',
      letterSpacing: '-0.02em',
    },
    titleAccent: {
      color: storyTheme.colors.primaryBlue,
      display: 'block',
    },
    subtitle: {
      fontSize: isMobile ? '1rem' : '1.125rem',
      color: storyTheme.colors.textMuted,
      lineHeight: 1.7,
      maxWidth: '700px',
      margin: isMobile ? '0 auto 2rem' : '0 auto 3.5rem',
    },
    timelineGrid: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '2.5rem' : '2rem',
      marginBottom: isMobile ? '4rem' : '6rem',
    },
    timelineItem: {
      flex: 1,
      position: 'relative',
    },
    timelineHeaderRow: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1.5rem',
      position: 'relative',
    },
    timelineNumber: {
      fontFamily: storyTheme.fonts.serif,
      fontSize: '2.5rem',
      color: storyTheme.colors.primaryBlue,
      lineHeight: 1,
    },
    timelineDot: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: storyTheme.colors.primaryBlue,
      marginLeft: '1rem',
      position: 'relative',
      zIndex: 2,
    },
    timelineConnectingLine: {
      flex: 1,
      height: '1px',
      backgroundColor: storyTheme.colors.lineColor,
      marginLeft: '1rem',
      position: 'relative',
      zIndex: 1,
    },
    timelineItemTitle: {
      fontSize: '1.25rem',
      fontWeight: 500,
      marginBottom: '1rem',
      color: storyTheme.colors.textMain,
    },
    timelineItemDesc: {
      fontSize: '0.95rem',
      color: storyTheme.colors.textMuted,
      lineHeight: 1.6,
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.ambientGlowTop} />
      
      <div style={styles.container}>
        
        {/* --- HEADER AREA --- */}
        <motion.div 
          style={styles.headerWrapper}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerOurStory}
        >
          <motion.div
            variants={fadeUpOurStory}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div style={{ height: '1px', width: '40px', backgroundColor: storyTheme.colors.primaryBlue, opacity: 0.5 }} />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: storyTheme.colors.primaryBlue,
              fontWeight: 600,
              letterSpacing: '1px',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
            }}>
              <Droplet size={16} color={storyTheme.colors.primaryBlue} fill={storyTheme.colors.primaryBlue} />
              OUR STORY
            </div>
            <div style={{ height: '1px', width: '40px', backgroundColor: storyTheme.colors.primaryBlue, opacity: 0.5 }} />
          </motion.div>

          <motion.h1 variants={fadeUpOurStory} style={styles.title}>
            Driven by Purpose.
            <span style={styles.titleAccent}>Inspired by Impact.</span>
          </motion.h1>

          <motion.p variants={fadeUpOurStory} style={styles.subtitle}>
            What began as a simple belief in the power of clean water has grown into
            a mission that touches lives and protects our planet. Our journey is built on trust,
            innovation, and an unwavering commitment to a better tomorrow.
          </motion.p>
        </motion.div>

        {/* --- TIMELINE AREA --- */}
        <motion.div 
          style={styles.timelineGrid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerOurStory}
        >
          {timelineData.map((item, index) => {
            const isLast = index === timelineData.length - 1;
            
            return (
              <motion.div 
                key={index} 
                variants={fadeUpOurStory} 
                style={styles.timelineItem}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div style={styles.timelineHeaderRow}>
                  <span style={styles.timelineNumber}>{item.num}</span>
                  <div style={styles.timelineDot} />
                  {/* Render connecting line on desktop, hide on mobile or if it's the last item */}
                  {(!isLast && !isMobile) && (
                    <motion.div 
                      style={styles.timelineConnectingLine}
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + (index * 0.2), ease: "easeOut" }}
                    />
                  )}
                </div>
                <h3 style={styles.timelineItemTitle}>{item.title}</h3>
                <p style={styles.timelineItemDesc}>{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};


// --- Main App Component ---

export default function About() {
  return (
    <div style={{ 
      fontFamily: typography.fontSans, 
      color: colors.textMain,
      backgroundColor: colors.white,
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      <SEO
        title={seoData.about.title}
        description={seoData.about.description}
      />
      <HeroSection />
      <OurStory />
      <VisionMissionValues />
      <TeamSlider />
    </div>
  );
}

