import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight, Activity, ArrowUpRight, Sparkles } from 'lucide-react';
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
      className="text-1xl md:text-2xl font-display font-bold text-slate-900 leading-tight"
    >
      {title}
    </motion.h2>
  </div>
);

const MetricCard = ({ label, value, index }: { label: string, value: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    className="group relative flex flex-col items-center justify-center p-5 md:p-6 bg-water-ocean/80 backdrop-blur-md border border-water-sky/20 rounded-tr-[30px] rounded-bl-[30px] rounded-tl-xl rounded-br-xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 min-h-[160px] text-center"
  >
    {/* Hover Expanding Background */}
    <div className="absolute w-24 h-24 bg-primary rounded-full -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out scale-0 group-hover:scale-[10] origin-center" />

    {/* Metric Content */}
    <div className="relative z-10 flex flex-col items-center justify-center transition-all duration-300">
      <div className="font-display font-bold text-2xl md:text-3xl text-primary-foreground drop-shadow-md px-2 text-center break-words max-w-full">
        {value}
      </div>
      <div className="w-12 h-1 bg-primary mt-4 mb-3 group-hover:bg-white transition-colors duration-300 rounded-full" />
      <p className="text-water-light/90 font-semibold group-hover:text-primary-foreground uppercase tracking-widest text-xs transition-colors drop-shadow-md">
        {label}
      </p>
    </div>
  </motion.div>
);

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

export default function ProductPage({ product }: { product: Product }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroImageSrc = product.main.image;
  const archImageSrc = product.architectureImage?.url || product.images?.[0]?.url || product.main.image;
  const fullImageSrc = product.fullImage?.url || product.images?.[1]?.url || product.images?.[0]?.url || product.main.image;
  const gridImages = product.images?.slice(0, 4) || []; // We'll just show up to 4 images in the grid

  return (
    <div ref={containerRef} className="bg-white text-slate-900 font-sans selection:bg-violet-500/30 selection:text-violet-900">
      
      {/* Hero */}
      <section className="relative h-[25vh] min-h-[280px] flex flex-col justify-center px-6 md:px-12 overflow-hidden bg-gradient-to-br from-water-deep to-water-ocean">
        <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full mt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-12"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-water-sky/20 text-water-sky text-xs font-medium mb-4 backdrop-blur-sm border border-water-sky/30">
                Wastewater Solutions
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tight text-white mb-4 max-w-5xl drop-shadow-sm">
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

      {/* Description */}
      <section className="relative py-20 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="flex flex-col justify-center">
            <SectionTitle title={product.main.description} subtitle="The Architecture" />
            <div className="mb-12">
              <RenderPageDescription content={product.Page_Description} />
            </div>
            
            <p className="border-l-4 border-primary pl-8 py-6 italic text-slate-800 font-medium bg-white rounded-r-2xl shadow-sm text-xl">
              "We provide cost-effective and reliable solutions for wastewater management."
            </p>
          </div>
          <div className="relative w-full aspect-square lg:aspect-[4/3] lg:sticky top-32 overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-slate-50 border-[8px] md:border-[12px] border-white flex items-center justify-center">
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
              src={archImageSrc} 
              className="w-full h-full object-cover md:object-contain p-0 md:p-6"
              alt="Architecture Visualization"
            />
          </div>
        </div>
      </section>

      {/* Large Image Section */}
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
            Efficiency through <span className="italic text-water-sky font-serif">precision</span>.
          </motion.h3>
        </div>
      </section>

      {/* Grid Images */}
      {gridImages.length > 0 && (
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-white">
          <SectionTitle title="Technical Installations" subtitle="Visual Components" />
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 h-auto ${gridImages.length === 1 ? 'md:h-[500px]' : gridImages.length === 2 ? 'md:h-[400px]' : 'md:h-[800px]'}`}>
            {gridImages.map((img, i) => {
              let colSpan = 'md:col-span-4';
              if (gridImages.length === 1) {
                colSpan = 'md:col-span-12';
              } else if (gridImages.length === 2) {
                colSpan = 'md:col-span-6';
              } else {
                colSpan = i % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4';
              }
              
              return (
                <div 
                  key={i} 
                  className={`overflow-hidden rounded-3xl bg-slate-100 group relative shadow-md ${colSpan}`}
                >
                  <img src={img.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={img.alt} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-8">
                    <div className="text-xs uppercase tracking-widest font-bold text-white">{img.alt}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Metrics */}
      {product.metrics && product.metrics.length > 0 && (
        <section className="bg-water-deep py-32 px-6 md:px-12 relative overflow-hidden">
          {/* Background glow for dark section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-sm shadow-lg"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  System Specifications
                </span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-20 h-20 bg-white shadow-xl rounded-2xl flex items-center justify-center mx-auto mb-10 border border-slate-100 relative group"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-hover:bg-primary/10 transition-colors duration-500" />
            <Activity className="w-10 h-10 text-primary drop-shadow-sm relative z-10" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 mb-8 tracking-tight drop-shadow-sm"
          >
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-water-deep italic pr-2">transform</span> your facility?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-600 mb-14 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Partner with SA Enviro Solutions for cutting-edge environmental infrastructure. Let's design a customized, high-efficiency system tailored to your exact operational requirements.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/contact" className="relative flex items-center justify-center px-10 py-5 overflow-hidden font-bold text-white bg-primary rounded-2xl group hover:shadow-[0_15px_40px_rgba(var(--primary),0.3)] transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto">
              <span className="absolute inset-0 w-full h-full bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-3 text-lg tracking-wide uppercase">
                Schedule Consultation <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </span>
            </Link>
            <Link to="/products" className="relative flex items-center justify-center px-10 py-5 overflow-hidden font-bold text-slate-700 bg-white border border-slate-200 shadow-sm rounded-2xl group hover:bg-slate-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md w-full sm:w-auto">
              <span className="relative flex items-center gap-3 text-lg tracking-wide">
                Explore More Solutions
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}