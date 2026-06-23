import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { seoData, blogs } from '@/constants/siteData';
import BlogPage from '@/components/Sections/BlogPage';

// --- Types ---
interface BlogPost {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
}

// --- Theme Constants (Inline Styles System) ---
const theme = {
  colors: {
    heroBgLeft: '#ffffff',
    heroBgRightGradient: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)',
    accentCyan: '#4dc2f8',
    accentBlue: '#1e66f5',
    badgeBg: '#1e66f5',
    textWhite: '#ffffff',
    textMutedWhite: 'rgba(255, 255, 255, 0.7)',
    textDark: '#1a202c',
    textGray: '#718096',
    glassBg: 'rgba(15, 32, 56, 0.65)',
    glassBorder: 'rgba(255, 255, 255, 0.15)',
    cardBg: '#ffffff',
    bgLight: '#f8fafc',
  },
  fonts: {
    serif: 'var(--font-family-serif)',
    sans: 'var(--font-family-sans)',
  },
  shadows: {
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
    card: '0 4px 20px rgba(0, 0, 0, 0.05)',
    cardHover: '0 20px 40px rgba(0, 0, 0, 0.12)',
  },
  easing: [0.25, 0.1, 0.25, 1],
};

// --- Hooks ---
const useResponsive = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
};

// --- Icons ---
const Icons = {
  Drop: () => (
    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 16C9.31371 16 12 13.3137 12 10C12 6.68629 6 0 6 0C6 0 0 6.68629 0 10C0 13.3137 2.68629 16 6 16Z" fill={theme.colors.accentCyan} />
    </svg>
  ),
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
  Bookmark: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  ),
};

// --- Components ---

// --- Background Pattern Component (matching About page hero section) ---
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

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalResults: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ searchQuery, setSearchQuery, totalResults }) => {
  const { isMobile } = useResponsive();

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: theme.easing } },
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: isMobile ? '80vh' : '75vh',
      backgroundColor: theme.colors.heroBgLeft,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>
      <BackgroundPattern />

      {/* Right Background Image with Diagonal Cut */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: isMobile ? '100%' : '65%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1544253163-718b528a2b53?auto=format&fit=crop&q=80&w=2000)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          clipPath: isMobile ? 'none' : 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)',
          zIndex: 1,
        }}
      >
        {/* Gradient overlays to blend image into the dark background and darken edges */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: isMobile 
            ? 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.5) 100%)' 
            : theme.colors.heroBgRightGradient,
        }} />
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, transparent 40%, rgba(255,255,255,0.1) 100%)',
        }} />
      </motion.div>

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        padding: isMobile ? '6rem 2rem 8rem 2rem' : '5.5rem 4rem 12rem 4rem',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        
        {/* Left Text Block */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          style={{ width: isMobile ? '100%' : '50%', color: '#0D3B66' }}
        >
          

          {/* Headings */}
          <motion.h1 variants={fadeUp} style={{ 
            fontFamily: theme.fonts.serif, 
            fontSize: isMobile ? '3.5rem' : '4.5rem', 
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '0.5rem',
            color: '#0A1526'
          }}>
            Our Blog
          </motion.h1>
          
          <motion.h2 variants={fadeUp} style={{ 
            fontFamily: theme.fonts.serif, 
            fontSize: isMobile ? '2rem' : '2.8rem', 
            fontWeight: 600,
            color: '#005DE8',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}>
            Insights That Create Impact.
          </motion.h2>

          {/* Decorative Divider */}
          <motion.div variants={fadeUp} style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '2rem',
            gap: '1rem',
            opacity: 0.6
          }}>
            <div style={{ height: '1px', width: '40px', backgroundColor: 'rgba(13, 59, 102, 0.2)' }} />
            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 16C9.31371 16 12 13.3137 12 10C12 6.68629 6 0 6 0C6 0 0 6.68629 0 10C0 13.3137 2.68629 16 6 16Z" fill="#005DE8" />
            </svg>
            <div style={{ height: '1px', width: '200px', background: 'linear-gradient(90deg, rgba(13, 59, 102, 0.2) 0%, transparent 100%)' }} />
          </motion.div>

          {/* Description */}
          <motion.p variants={fadeUp} style={{
            fontFamily: theme.fonts.sans,
            fontSize: '1.05rem',
            lineHeight: 1.6,
            color: '#475569',
            maxWidth: '420px',
            fontWeight: 400
          }}>
            Thoughts, innovations, and expert perspectives on water treatment, sustainability, and building a cleaner tomorrow.
          </motion.p>
        </motion.div>

        {/* Right Container for Search & Count */}
        <div style={{
          marginTop: isMobile ? '3rem' : '10rem',
          width: isMobile ? '100%' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          gap: '0.75rem',
        }}>
          {/* Result Count */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: theme.easing }}
            style={{
              fontFamily: theme.fonts.sans,
              fontSize: '0.85rem',
              color: '#64748b',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              paddingRight: isMobile ? '0' : '1.5rem',
              paddingLeft: isMobile ? '1.5rem' : '0',
            }}
          >
            {totalResults} {totalResults === 1 ? 'Article' : 'Articles'} Found
          </motion.div>

          {/* Right Glass Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.8, ease: theme.easing }}
            style={{
              width: isMobile ? '100%' : 'auto',
              minWidth: isMobile ? '100%' : '480px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(13, 59, 102, 0.35)',
              borderRadius: '999px',
              padding: '0.5rem 0.5rem 0.5rem 1.5rem',
              boxShadow: '0 8px 32px rgba(13, 59, 102, 0.08)',
            }}
          >
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#0d3b66',
                fontFamily: theme.fonts.sans,
                fontSize: '1rem',
                minWidth: 0,
              }}
            />
            <button style={{
              background: 'transparent',
              border: 'none',
              color: '#0d3b66',
              cursor: 'pointer',
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              opacity: 0.8
            }}>
              <Icons.Search />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const BlogCard: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
  // Variants for parent card to trigger children animations
  const cardVariants = {
    hover: { y: -8, boxShadow: theme.shadows.cardHover, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  const imageVariants = {
    hover: { scale: 1.05, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const arrowVariants = {
    hover: { x: 6, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.15, ease: theme.easing }}
        variants={cardVariants}
        whileHover="hover"
        style={{
          backgroundColor: theme.colors.cardBg,
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          cursor: 'pointer',
          border: '1px solid rgba(0,0,0,0.04)',
          boxShadow: theme.shadows.card,
        }}
      >
        {/* Image Container */}
        <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
          <motion.img 
            variants={imageVariants}
            src={post.image} 
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transformOrigin: 'center' }}
          />
          {/* Gradient Overlay for better badge contrast */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)'
          }} />
          
          {/* Category Badge */}
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '1.5rem',
            backgroundColor: theme.colors.badgeBg,
            color: theme.colors.textWhite,
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            fontFamily: theme.fonts.sans,
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}>
            {post.category}
          </div>
        </div>

        {/* Content Container */}
        <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
          
          {/* Meta Data */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: theme.fonts.sans,
            fontSize: '0.85rem',
            color: theme.colors.textGray,
            marginBottom: '1.2rem'
          }}>
            <div>
              <span>{post.date}</span>
              <span style={{ margin: '0 0.5rem' }}>•</span>
              <span>{post.readTime}</span>
            </div>
            <motion.div whileHover={{ scale: 1.1, color: theme.colors.accentBlue }}>
              <Icons.Bookmark />
            </motion.div>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: theme.fonts.serif,
            fontSize: '1.4rem',
            color: theme.colors.textDark,
            lineHeight: 1.3,
            marginBottom: '1rem',
            fontWeight: 500,
          }}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p style={{
            fontFamily: theme.fonts.sans,
            fontSize: '0.95rem',
            color: theme.colors.textGray,
            lineHeight: 1.6,
            marginBottom: '2rem',
            flex: 1, // Pushes footer to bottom
          }}>
            {post.excerpt}
          </p>

          {/* Footer / CTA */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: theme.fonts.sans,
            fontSize: '0.9rem',
            fontWeight: 500,
            color: theme.colors.accentBlue,
            marginTop: 'auto',
          }}>
            Read More
            <motion.div variants={arrowVariants} style={{ display: 'flex', alignItems: 'center' }}>
              <Icons.ArrowRight />
            </motion.div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};


// --- Main Application Component ---
export default function Blogs() {
  const { slug } = useParams();
  const { isMobile, isTablet } = useResponsive();
  const [searchQuery, setSearchQuery] = useState('');

  if (slug) {
    return (
      <>
        <SEO
          title={seoData.blogs.title}
          description={seoData.blogs.description}
        />
        <BlogPage />
      </>
    );
  }

  // Map real blogs data from siteData
  const POSTS: BlogPost[] = blogs.map((blog) => ({
    id: blog.key,
    category: blog.category || 'ENVIRONMENT',
    date: blog.date,
    readTime: blog.readTime || '5 min read',
    title: blog.title,
    excerpt: blog.excerpt,
    image: Array.isArray(blog.image) ? blog.image[0] : blog.image,
  }));

  const filteredPosts = POSTS.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SEO
        title={seoData.blogs.title}
        description={seoData.blogs.description}
      />
      <div style={{ backgroundColor: theme.colors.bgLight, minHeight: '100vh' }}>
        <HeroSection 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          totalResults={filteredPosts.length}
        />
        
        {/* Blog Grid Area */}
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: isMobile ? '0 1.5rem 3rem 1.5rem' : '0 4rem 5rem 4rem',
          marginTop: isMobile ? '-7rem' : '-10.5rem',
          position: 'relative',
          zIndex: 10,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: isMobile ? '2rem' : '2.5rem',
          }}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  backgroundColor: theme.colors.cardBg,
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.04)',
                  boxShadow: theme.shadows.card
                }}
              >
                <h3 style={{ fontFamily: theme.fonts.serif, fontSize: '1.8rem', color: theme.colors.textDark, marginBottom: '0.5rem' }}>No articles found</h3>
                <p style={{ fontFamily: theme.fonts.sans, color: theme.colors.textGray }}>
                  We couldn't find any articles matching "{searchQuery}". Try adjusting your search.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
