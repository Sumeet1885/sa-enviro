import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Droplet,
  PlayCircle,
  Image as ImageIcon,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { SEO } from '@/components/layout/SEO';
import { seoData, galleryImages } from '@/constants/siteData';



// --- Theme Constants ---
const theme = {
  colors: {
    primary: '#0B1B3D',
    accent: '#0D72E9',
    textLight: '#64748B',
    bgWhite: '#FFFFFF',
    borderLight: '#E2E8F0',
  },
  fonts: {
    main: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
};

export default function Gallery() {
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024 && windowWidth >= 768;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <SEO title={seoData.gallery.title} description={seoData.gallery.description} />

      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: theme.colors.bgWhite,
          fontFamily: theme.fonts.main,
          overflowX: 'hidden',
        }}
      >
        {/* ================= HERO SECTION ================= */}
        <section
          style={{
            position: 'relative',
            width: '100%',
            minHeight: isMobile ? '320px' : '240px',
            background: '#FFFFFF',
            overflow: 'hidden',
          }}
        >
          {/* Subtle ambient orbs on white */}
          <motion.div
            animate={{ x: [-30, 50, -30], y: [-20, 40, -20], scale: [1, 1.2, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '-20%',
              right: '5%',
              width: '450px',
              height: '450px',
              background: 'rgba(13, 114, 233, 0.06)',
              filter: 'blur(80px)',
              borderRadius: '50%',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={{ x: [20, -40, 20], y: [15, -30, 15], scale: [1, 1.15, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            style={{
              position: 'absolute',
              bottom: '-10%',
              left: '0%',
              width: '350px',
              height: '350px',
              background: 'rgba(13, 114, 233, 0.04)',
              filter: 'blur(60px)',
              borderRadius: '50%',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Dot grid texture overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(circle, rgba(13,114,233,0.07) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* Content Container */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '1400px',
              margin: '0 auto',
              padding: isMobile ? '75px 24px 40px' : '120px 50px 32px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontSize: isMobile ? '38px' : '50px',
                fontWeight: 800,
                color: theme.colors.primary,
                lineHeight: 1.12,
                letterSpacing: '-1.5px',
                marginBottom: '20px',
                maxWidth: '620px',
              }}
            >
              Engineering Cleaner
              <br />
              Water.{' '}
              <span style={{ color: theme.colors.accent }}>
                Every Day.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: '16px',
                color: theme.colors.textLight,
                lineHeight: 1.7,
                marginBottom: '32px',
                maxWidth: '480px',
              }}
            >
              Explore our water treatment plants, cutting-edge technology,
              and the people behind our mission to create a sustainable future.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                display: 'flex',
                gap: '14px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 14px 28px rgba(13, 114, 233, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' })
                }
                style={{
                  background: theme.colors.accent,
                  color: 'white',
                  border: 'none',
                  borderRadius: '100px',
                  padding: '14px 32px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(13, 114, 233, 0.35)',
                  letterSpacing: '0.5px',
                }}
              >
                <ImageIcon size={17} />
                EXPLORE GALLERY
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(11,27,61,0.04)',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate('/');
                  // Poll until the lazy-loaded AboutSection is mounted in the DOM
                  const maxAttempts = 20;
                  let attempts = 0;
                  const tryScroll = () => {
                    const el = document.getElementById('about');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else if (attempts < maxAttempts) {
                      attempts++;
                      setTimeout(tryScroll, 100);
                    }
                  };
                  setTimeout(tryScroll, 200);
                }}
                style={{
                  background: 'white',
                  color: theme.colors.primary,
                  border: `1px solid ${theme.colors.borderLight}`,
                  borderRadius: '100px',
                  padding: '14px 32px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <PlayCircle size={17} color={theme.colors.primary} />
                WATCH VIDEO
              </motion.button>
            </motion.div>
          </div>

          {/* Floating CTA Card — desktop only */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 80, damping: 15 }}
              style={{
                position: 'absolute',
                top: '25%',
                right: '8%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: '#FFFFFF',
                border: `1px solid ${theme.colors.borderLight}`,
                borderRadius: '24px',
                padding: '28px',
                width: '300px',
                boxShadow:
                  '0 24px 60px rgba(13, 114, 233, 0.1), 0 4px 16px rgba(0,0,0,0.06)',
                overflow: 'hidden',
              }}
            >
              {/* Accent top bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #0D72E9 0%, #60A5FA 100%)',
                }}
              />

              {/* Card Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Icon & Badge */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #0D72E9 0%, #094CA1 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 20px rgba(13, 114, 233, 0.3)',
                    }}
                  >
                    <Calendar size={22} color="white" />
                  </div>
                  <span
                    style={{
                      background: 'rgba(13,114,233,0.08)',
                      color: theme.colors.accent,
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '6px 12px',
                      borderRadius: '100px',
                      letterSpacing: '0.5px',
                      border: `1px solid rgba(13,114,233,0.15)`,
                    }}
                  >
                    PRIORITY SUPPORT
                  </span>
                </div>

                <h3
                  style={{
                    color: theme.colors.primary,
                    fontSize: '20px',
                    fontWeight: 800,
                    marginBottom: '10px',
                    lineHeight: 1.2,
                  }}
                >
                  Ready for the Next Level?
                </h3>
                <p
                  style={{
                    color: theme.colors.textLight,
                    fontSize: '13px',
                    lineHeight: 1.65,
                    marginBottom: '24px',
                  }}
                >
                  Connect with our lead engineers to design scalable and sustainable water
                  treatment infrastructure.
                </p>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 12px 28px rgba(13, 114, 233, 0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/contact')}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(90deg, #0D72E9 0%, #094CA1 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px',
                    fontSize: '14px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Shine sweep */}
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      top: 0, left: 0,
                      width: '50%', height: '100%',
                      background:
                        'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 100%)',
                      transform: 'skewX(-20deg)',
                      pointerEvents: 'none',
                    }}
                  />
                  <span
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    Contact Our Team
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight size={17} />
                    </motion.div>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </section>

        {/* ================= MASONRY GALLERY SECTION ================= */}
        <section
          id="gallery-section"
          style={{
            position: 'relative',
            padding: isMobile ? '32px 20px 60px' : '48px 60px 80px',
            backgroundColor: theme.colors.bgWhite,
            zIndex: 5,
          }}
        >
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '1400px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Masonry Grid */}
            <div
              style={{
                columnCount: isMobile ? 1 : isTablet ? 2 : 3,
                columnGap: '24px',
                width: '100%',
              }}
            >
              {galleryImages.map((item, index) => {
                return (
                  <motion.div
                    key={item.src}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      position: 'relative',
                      height: 'auto',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      boxShadow: hoveredIndex === index
                        ? '0 20px 40px rgba(0,0,0,0.16)'
                        : '0 8px 24px rgba(0,0,0,0.08)',
                      breakInside: 'avoid',
                      marginBottom: '24px',
                      display: 'inline-block',
                      width: '100%',
                      transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                      transform: hoveredIndex === index ? 'translateY(-6px)' : 'translateY(0)',
                    }}
                  >
                    <motion.img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                      }}
                    />

                    {/* Dark gradient overlay — on hover */}
                    <motion.div
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '65%',
                        background:
                          'linear-gradient(to top, rgba(9, 28, 63, 0.88) 0%, rgba(9, 28, 63, 0) 100%)',
                        zIndex: 1,
                      }}
                    />

                    {/* Title — slides up on hover */}
                    <motion.div
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        y: hoveredIndex === index ? 0 : 12,
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        bottom: '18px',
                        left: '18px',
                        right: '18px',
                        zIndex: 2,
                      }}
                    >
                      <h3
                        style={{
                          color: 'white',
                          fontSize: '14px',
                          fontWeight: 600,
                          margin: 0,
                          letterSpacing: '-0.2px',
                          lineHeight: 1.3,
                        }}
                      >
                        {item.alt}
                      </h3>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            
          </div>
        </section>
      </div>
    </>
  );
}
