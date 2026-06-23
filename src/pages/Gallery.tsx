import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
            minHeight: isMobile ? '160px' : '180px',
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
              padding: isMobile ? '80px 24px 16px' : '125px 50px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
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
                marginBottom: '0px',
                maxWidth: 'none',
                whiteSpace: isMobile ? 'normal' : 'nowrap',
                textAlign: 'center',
              }}
            >
              Our Work in{' '}
              <span style={{ color: theme.colors.accent }}>
                Actions.
              </span>
            </motion.h1>
          </div>
        </section>

        {/* ================= MASONRY GALLERY SECTION ================= */}
        <section
          id="gallery-section"
          style={{
            position: 'relative',
            padding: isMobile ? '16px 20px 60px' : '24px 60px 80px',
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
