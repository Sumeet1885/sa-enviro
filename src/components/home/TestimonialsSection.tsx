import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Droplet,
  Users,
  ShieldCheck,
  Handshake,
  Waves,
  Gauge,
  Factory,
  FlaskConical,
} from 'lucide-react';
import { testimonials as siteTestimonials } from '@/constants/siteData';


// --- Custom Hooks ---
const useWindowSize = () => {
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
};

const useAnimatedNumber = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOut = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(end * easeOut));
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
};


// --- Data Models ---
interface StatItem {
  id: number;
  number: number;
  suffix: string;
  label: string;
  icon: React.ReactElement;
}

// Icon pool — cycles through for any number of testimonials
const iconPool = [
  <FlaskConical size={28} color="#005DE8" strokeWidth={1.5} />,
  <Gauge size={28} color="#005DE8" strokeWidth={1.5} />,
  <Factory size={28} color="#005DE8" strokeWidth={1.5} />,
  <Waves size={28} color="#005DE8" strokeWidth={1.5} />,
  <ShieldCheck size={28} color="#005DE8" strokeWidth={1.5} />,
  <Droplet size={28} color="#005DE8" strokeWidth={1.5} />,
];

// Build testimonials from siteData in a loop
const testimonialCards = siteTestimonials.map((t, i) => ({
  id: i + 1,
  quote: t.quote,
  clientName: t.author,
  clientType: '',
  icon: iconPool[i % iconPool.length],
}));

const statsData: StatItem[] = [
  {
    id: 1,
    number: 120,
    suffix: '+',
    label: 'Water Treatment\nPlants Delivered',
    icon: <Droplet size={26} color="#005DE8" strokeWidth={1.5} />,
  },
  {
    id: 2,
    number: 250,
    suffix: '+',
    label: 'Happy\nClients',
    icon: <Users size={26} color="#005DE8" strokeWidth={1.5} />,
  },
  {
    id: 3,
    number: 98,
    suffix: '%',
    label: 'Client\nSatisfaction',
    icon: <ShieldCheck size={26} color="#005DE8" strokeWidth={1.5} />,
  },
  {
    id: 4,
    number: 10,
    suffix: '+',
    label: 'Years of Trust\n& Partnership',
    icon: <Handshake size={26} color="#005DE8" strokeWidth={1.5} />,
  },
];


// --- Sub-components ---
interface AnimatedStatProps {
  number: number;
  suffix: string;
  label: string;
  icon: React.ReactElement;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ number, suffix, label, icon }) => {
  const count = useAnimatedNumber(number);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '10px' }}>
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#F0F6FF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#005DE8',
            lineHeight: 1,
            marginBottom: '6px',
            display: 'flex',
            alignItems: 'baseline',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {count}
          {suffix}
        </div>
        <div
          style={{
            fontSize: '13px',
            color: '#334155',
            fontWeight: 500,
            lineHeight: 1.4,
            whiteSpace: 'pre-line',
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};


// --- Main Component ---
export const TestimonialsSection: React.FC = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 900;

  // Mobile carousel state
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play on mobile
  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialCards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isMobile]);

  // Always render all cards — layout handled by flexWrap

  const colors = {
    primary: '#005DE8',
    primaryLight: '#E8F2FF',
    primaryBorder: '#B3D4FF',
    textMain: '#0B1120',
    textMuted: '#64748B',
    bgLight: '#F8FAFC',
    white: '#FFFFFF',
  };

  const styles: Record<string, React.CSSProperties> = {
    section: {
      width: '100%',
      backgroundColor: colors.bgLight,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: isMobile ? '60px 20px' : '100px 40px',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      boxSizing: 'border-box',
    },
    topRightBadge: {
      position: 'absolute',
      top: isMobile ? '20px' : '60px',
      right: isMobile ? '20px' : '80px',
      width: '140px',
      height: '140px',
      pointerEvents: 'none',
      zIndex: 0,
    },
    contentWrapper: {
      position: 'relative',
      zIndex: 1,
      width: '100%',
      maxWidth: '1280px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    badge: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: colors.primaryLight,
      padding: '8px 20px',
      borderRadius: '100px',
      marginBottom: '24px',
    },
    badgeText: {
      color: colors.primary,
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
    },
    heading: {
      fontSize: isMobile ? '38px' : '56px',
      fontWeight: 700,
      color: colors.textMain,
      textAlign: 'center',
      marginBottom: '16px',
      letterSpacing: '-0.5px',
      lineHeight: 1.1,
      fontFamily: '"Merriweather", "Georgia", serif',
    },
    headingHighlight: {
      color: colors.primary,
    },
    dividerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '32px',
    },
    subtitle: {
      fontSize: isMobile ? '15px' : '16px',
      color: colors.textMuted,
      textAlign: 'center',
      maxWidth: '600px',
      lineHeight: 1.6,
      marginBottom: '20px',
      fontWeight: 400,
    },
    carouselWrapper: {
      width: '100%',
      overflow: isMobile ? 'hidden' : 'visible',
      position: 'relative',
      marginBottom: isMobile ? '0' : '40px',
    },
    carouselContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: isMobile ? 'nowrap' : 'wrap',
      alignItems: 'stretch',
      justifyContent: isMobile ? 'flex-start' : 'center',
      gap: isMobile ? '0' : '20px',
      width: '100%',
      position: 'relative',
      transform: isMobile ? `translateX(-${activeIndex * 100}%)` : 'none',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
    },
    pagination: {
      display: isMobile ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginTop: '24px',
      marginBottom: '32px',
    },
    statsWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: isMobile ? '20px' : '24px',
      width: '100%',
      position: 'relative',
      zIndex: 2,
    },
    statCard: {
      backgroundColor: colors.white,
      borderRadius: '20px',
      padding: '24px 32px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
      border: '1px solid #F8FAFC',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: isMobile ? '100%' : isTablet ? '40%' : 'auto',
      minWidth: '220px',
      display: 'flex',
      justifyContent: 'center',
    },
  };

  const cardStyle = (isBlue: boolean): React.CSSProperties => ({
    backgroundColor: isBlue ? colors.primary : colors.white,
    borderRadius: '40px 0 40px 0',
    padding: isMobile ? '30px' : '40px 24px',
    flexGrow: 1,
    flexShrink: 1,
    // Mobile: full-width sliding cards. Non-mobile: min 220px, grows to fill row of 4
    flexBasis: isMobile ? 'calc(100% - 40px)' : '220px',
    width: isMobile ? '100%' : 'auto',
    margin: isMobile ? '0 20px' : '0',
    border: isBlue ? 'none' : `1.5px solid ${colors.primaryBorder}`,
    boxShadow: isBlue
      ? '0 20px 50px rgba(0, 93, 232, 0.15)'
      : '0 10px 30px rgba(0, 0, 0, 0.04)',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'all 0.4s ease',
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div style={styles.section}>

      {/* Rotating circular badge */}
      <div style={styles.topRightBadge}>
        <motion.svg
          viewBox="0 0 150 150"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ width: '100%', height: '100%' }}
        >
          <path
            id="testimonialsTextPath"
            d="M 75, 75 m -55, 0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0"
            fill="none"
          />
          <text
            fontSize="11"
            fontWeight="600"
            fill="#94A3B8"
            letterSpacing="3px"
            fontFamily="sans-serif"
          >
            <textPath href="#testimonialsTextPath" startOffset="0%">
              CLEANER WATER • BETTER TOMORROW •{' '}
            </textPath>
          </text>
          <circle
            cx="75"
            cy="75"
            r="32"
            fill="none"
            stroke="#005DE8"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </motion.svg>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#005DE8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
          </svg>
        </div>
      </div>

      <div style={styles.contentWrapper}>

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
        >
          <motion.div variants={fadeUp} style={styles.badge}>
            <Droplet size={14} color={colors.primary} fill={colors.primary} />
            <span style={styles.badgeText}>TESTIMONIALS</span>
          </motion.div>

          <motion.h2 variants={fadeUp} style={styles.heading}>
            Voices that{' '}
            <span style={styles.headingHighlight}>reflect our impact.</span>
          </motion.h2>

          {/* Wavy Divider */}
          <motion.div variants={fadeUp} style={styles.dividerContainer}>
            <svg width="38" height="12" viewBox="0 0 38 12">
              <path
                d="M2 6 Q 6.5 1 11 6 T 20 6 Q 24.5 1 29 6 T 38 6"
                fill="none"
                stroke="#005DE8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <Droplet size={10} color={colors.primary} fill={colors.primary} />
            <svg width="38" height="12" viewBox="0 0 38 12">
              <path
                d="M0 6 Q 4.5 1 9 6 T 18 6 Q 22.5 1 27 6 T 36 6"
                fill="none"
                stroke="#005DE8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          <motion.p variants={fadeUp} style={styles.subtitle}>
            Real experiences from partners who trust our expertise
            <br />
            in delivering sustainable water treatment solutions.
          </motion.p>
        </motion.div>

        {/* Cards — static on desktop, swipeable on mobile */}
        <div style={styles.carouselWrapper}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            style={styles.carouselContainer}
          >
            {testimonialCards.map(
              (testimonial, index) => {
                const isBlue = index % 2 === 1;

                return (
                  <motion.div
                    key={testimonial.id}
                    variants={fadeUp}
                    style={cardStyle(isBlue)}
                  >
                    {/* Card header */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '24px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '64px',
                          color: isBlue ? 'rgba(255,255,255,0.15)' : colors.primaryLight,
                          fontFamily: 'serif',
                          lineHeight: 0.8,
                          display: 'block',
                        }}
                      >
                        &ldquo;
                      </span>
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          backgroundColor: isBlue
                            ? 'rgba(255,255,255,0.15)'
                            : colors.bgLight,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: isBlue
                            ? '1px solid rgba(255,255,255,0.2)'
                            : '1px solid #F1F5F9',
                          transition: 'all 0.4s ease',
                        }}
                      >
                        {React.cloneElement(testimonial.icon, {
                          color: isBlue ? '#FFFFFF' : '#005DE8',
                        })}
                      </div>
                    </div>

                    {/* Quote text */}
                    <div
                      style={{
                        fontSize: '15px',
                        color: isBlue ? '#F8FAFC' : '#334155',
                        lineHeight: 1.7,
                        flexGrow: 1,
                        marginBottom: '32px',
                        fontWeight: isBlue ? 500 : 400,
                        textAlign: 'left',
                        transition: 'color 0.4s ease',
                      }}
                    >
                      {testimonial.quote}
                    </div>

                    {/* Card footer */}
                    <div
                      style={{
                        marginTop: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '100%',
                      }}
                    >
                      {!isBlue && (
                        <div
                          style={{
                            width: '24px',
                            height: '2px',
                            backgroundColor: colors.primary,
                            marginBottom: '16px',
                          }}
                        />
                      )}
                      <div
                        style={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: isBlue ? '#FFFFFF' : colors.textMain,
                          marginBottom: '4px',
                          transition: 'color 0.4s ease',
                        }}
                      >
                        — {testimonial.clientName}
                      </div>
                      <div
                        style={{
                          fontSize: '13px',
                          color: isBlue ? 'rgba(255,255,255,0.7)' : colors.textMuted,
                          transition: 'color 0.4s ease',
                        }}
                      >
                        {testimonial.clientType}
                      </div>
                    </div>
                  </motion.div>
                );
              }
            )}
          </motion.div>
        </div>

        {/* Mobile Pagination Dots */}
        <div style={styles.pagination}>
          {testimonialCards.map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: i === activeIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: i === activeIndex ? colors.primary : '#CBD5E1',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={styles.statsWrapper}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              style={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 15px 45px rgba(0, 93, 232, 0.05)' }}
            >
              <AnimatedStat
                number={stat.number}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};
