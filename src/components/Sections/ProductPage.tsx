import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight, Activity, ArrowUpRight, Sparkles, Droplet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, PageDescriptionBlock } from '../../constants/type';

const SectionTitle = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-10 md:mb-20">
    <motion.span 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="text-xl md:text-xl font-normal font-sans text-slate-900 leading-tight"
    >
      {title}
    </motion.h2>
  </div>
);

const MetricCard = ({ label, value, index }: { label: string, value: string, index: number }) => {
  const isAlt = index % 2 === 1;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`relative flex flex-col items-center justify-center p-5 md:p-6 rounded-tr-[30px] rounded-bl-[30px] rounded-tl-xl rounded-br-xl overflow-hidden min-h-[160px] text-center shadow-sm ${
        isAlt 
          ? 'bg-[#0D3B66] border border-[#0D3B66]/10 text-white' 
          : 'bg-white border border-slate-100 text-black'
      }`}
    >
      {/* Metric Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className={`font-display font-bold text-2xl md:text-3xl drop-shadow-sm px-2 text-center break-words max-w-full ${
          isAlt ? 'text-white' : 'text-black'
        }`}>
          {value}
        </div>
        <div className={`w-12 h-1 mt-4 mb-3 rounded-full ${
          isAlt ? 'bg-white/40' : 'bg-black'
        }`} />
        <p className={`font-semibold uppercase tracking-widest text-xs ${
          isAlt ? 'text-slate-200' : 'text-slate-600'
        }`}>
          {label}
        </p>
      </div>
    </motion.div>
  );
};

const RenderPageDescription = ({ content }: { content?: PageDescriptionBlock[] }) => {
  if (!content) return null;
  return (
    <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
      {content.map((block, index) => {
        if (block.type === 'p') {
          return <p key={index}>{block.content}</p>;
        }
        if (block.type === 'subtitle') {
          return <h3 key={index} className="text-2xl font-bold text-slate-800 mt-8 mb-4">{block.content}</h3>;
        }
        if (block.type === 'list') {
          return (
            <ul key={index} className={`pl-6 space-y-2 ${block.style === 'number' ? 'list-decimal' : 'list-disc'} text-slate-700`}>
              {block.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          );
        }
        if (block.type === 'keyValue') {
          return (
            <div key={index} className="bg-slate-50 p-6 rounded-2xl space-y-4 border border-slate-100">
              {block.items.map((item, i) => (
                <div key={i}>
                  <strong className="text-primary">{item.key}:</strong> <span className="text-slate-700">{item.value}</span>
                </div>
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

const BackgroundPattern = () => (
  <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none opacity-60">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0">
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

export default function ProductPage({ product }: { product: Product }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroImageSrc = product.main.image;
  const archImageSrc = product.images?.[0]?.url;
  const fullImageSrc = product.images?.[1]?.url;
  const gridImages = product.images?.slice(2) || [];

  return (
    <div ref={containerRef} className="bg-white text-slate-900 font-sans selection:bg-violet-500/30 selection:text-violet-900">
      
      {/* Hero */}
      <section className="relative h-[25vh] min-h-[280px] flex flex-col justify-center px-6 md:px-12 overflow-hidden bg-white">
        <BackgroundPattern />
        <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full mt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-12"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-badge-text font-bold tracking-[0.2em] text-[#005DE8] uppercase">
                  Wastewater Solutions
                </span>
                <div className="w-10 h-[1.5px] bg-[#005DE8]" />
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tight text-[#0A1526] mb-4 max-w-5xl">
                {product.main.title.split(' ').map((word, i) => (
                  <span key={i} className="inline-block mr-3">
                    {word}
                  </span>
                ))}
              </h1>
            </motion.div>

          </div>
        </div>

      </section>

      {/* Description & Ticker Image (Images[0]) */}
      <section className="relative pb-20 md:py-20  md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
          <div className="flex flex-col justify-center order-2 lg:order-none">
            <SectionTitle title={product.main.description} subtitle="Details & Specifications" />
            <div className="mb-12">
              <RenderPageDescription content={product.Page_Description} />
            </div>
            
            <p className="border-l-4 border-primary pl-8 py-6 text-slate-800 font-medium bg-white rounded-r-2xl shadow-sm text-xl">
              "We provide cost-effective and reliable solutions for wastewater management."
            </p>
          </div>
          {archImageSrc && (
            <div className="relative w-full lg:sticky top-2 overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] order-1 lg:order-none">
              <motion.img 
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
                src={archImageSrc} 
                className="w-full h-auto object-contain"
                alt="Architecture Visualization"
              />
            </div>
          )}
        </div>
      </section>

      {/* Full Image Section (Images[1]) */}
      {fullImageSrc && (
        <section className="relative h-[80vh] overflow-hidden">
          <motion.div 
            initial={{ clipPath: 'inset(10% 10% 10% 10%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <img 
              src={fullImageSrc} 
              className="w-full h-full object-cover brightness-90"
              alt="Fullscreen Immersive"
            />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-gradient-to-t from-slate-900/60 to-transparent">
            <motion.h3 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-4xl md:text-7xl font-display font-bold text-white tracking-tight px-12 text-center max-w-4xl drop-shadow-xl"
            >
              Efficiency through <span className="text-water-sky font-serif">precision</span>.
            </motion.h3>
          </div>
        </section>
      )}

      {/* Grid Images (Images[2...]) - Masonry Layout */}
      {gridImages.length > 0 && (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-white">
          <SectionTitle title="Technical Installations" subtitle="Visual Components" />
          
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {gridImages.map((img, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-slate-50 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img 
                  src={img.url} 
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105" 
                  alt={img.alt} 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <div className="text-xs uppercase tracking-widest font-bold mb-1 opacity-80">{product.main.title}</div>
                    <div className="text-sm font-semibold">{img.alt}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Metrics */}
      {product.metrics && product.metrics.length > 0 && (
        <section className="bg-[#F8FAFC] py-32 px-6 md:px-12 relative overflow-hidden">
          {/* Background glow for section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  marginBottom: '24px',
                }}
              >
                <div style={{ height: '1px', width: '40px', backgroundColor: '#005DE8', opacity: 0.5 }} />
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#005DE8',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                }}>
                  <Droplet size={16} color="#005DE8" fill="#005DE8" />
                  SYSTEM SPECIFICATIONS
                </div>
                <div style={{ height: '1px', width: '40px', backgroundColor: '#005DE8', opacity: 0.5 }} />
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-display font-bold text-[#0A1526] mb-6"
              >
                Technical Highlights
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {product.metrics.map((m, i) => (
                <MetricCard key={i} index={i} {...m} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium Full-Width CTA (Light) */}
      <section className="relative py-16 md:py-20 px-6 md:px-12 overflow-hidden bg-white flex items-center justify-center min-h-[40vh]">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-water-sky/10 rounded-full blur-[120px] -mr-[400px] -mt-[400px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -ml-[300px] -mb-[300px] pointer-events-none" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-8 tracking-tight drop-shadow-sm"
          >
            Ready to <span className="text-transparent bg-clip-text bg-[#005DE8] pr-2">transform</span> your facility?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-14 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Partner with SA Enviro Solutions for cutting-edge environmental infrastructure. Let's design a customized, high-efficiency system tailored to your exact operational requirements.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact" style={{ textDecoration: 'none' }} className="w-full sm:w-auto flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 14px 28px rgba(13, 114, 233, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: '#0D72E9',
                  color: 'white',
                  border: 'none',
                  borderRadius: '100px',
                  padding: '14px 32px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(13, 114, 233, 0.35)',
                  letterSpacing: '0.5px',
                  width: '100%',
                }}
              >
                SCHEDULE CONSULTATION
                <ArrowRight size={16} />
              </motion.button>
            </Link>
            
            <Link to="/about" style={{ textDecoration: 'none' }} className="w-full sm:w-auto flex justify-center">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(11,27,61,0.04)',
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'white',
                  color: '#0B1B3D',
                  border: '1px solid #E2E8F0',
                  borderRadius: '100px',
                  padding: '14px 32px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  width: '100%',
                }}
              >
                KNOW MORE ABOUT US
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}