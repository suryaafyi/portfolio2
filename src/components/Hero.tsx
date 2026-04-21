import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(prev =>
        text.split('').map((char, index) => {
          if (index < iterations) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );

      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className="font-display">{displayText}</span>;
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-16 overflow-hidden">
      {/* Floating Doodles */}
      <motion.div
        animate={{
          rotate: [0, 360],
          y: [0, -10, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[15%] text-accent-red/20 pointer-events-none hidden lg:block"
      >
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M50 10L60 40L90 50L60 60L50 90L40 60L10 50L40 40Z" />
        </svg>
      </motion.div>

      <motion.div
        animate={{
          rotate: [0, -360],
          x: [0, 15, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[20%] left-[10%] text-accent-gold/20 pointer-events-none hidden lg:block"
      >
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
          <circle cx="50" cy="50" r="30" strokeDasharray="10 5" />
        </svg>
      </motion.div>

      {/* Marquee Ticker - Full Width */}
      <div className="w-full overflow-hidden bg-bg-secondary py-6 border-y border-black/5 mb-20 relative z-20">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center flex-shrink-0">
              <span className="text-[12px] font-body uppercase tracking-[0.3em] font-bold text-text-primary/40">✦ PRODUCT DESIGN</span>
              <span className="text-[12px] font-body uppercase tracking-[0.3em] font-bold text-text-primary/40">✦ AI-FIRST EXPERIENCE</span>
              <span className="text-[12px] font-body uppercase tracking-[0.3em] font-bold text-text-primary/40">✦ DESIGN SYSTEMS</span>
              <span className="text-[12px] font-body uppercase tracking-[0.3em] font-bold text-text-primary/40">✦ FIGMA TO CODE</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-body text-[11px] uppercase tracking-[0.4em] text-accent-red font-bold mb-12"
        >
          Product Designer & Ex-Engineer — 2026
        </motion.div>

        <h1 className="text-[clamp(3.5rem,10vw,12rem)] leading-[0.9] text-text-primary mb-12 lowercase tracking-tight">
          <div className="overflow-hidden mb-4">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            >
              <ScrambleText text="surya a." />
            </motion.div>
          </div>

          <div className="flex flex-wrap items-center gap-x-[0.2em]">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body font-bold"
            >
              designs
            </motion.span>
            {/* <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block w-[0.8em] h-[0.6em] bg-accent-cream rounded-[0.1em] overflow-hidden rotate-[-2deg] my-auto"
            >
              <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&auto=format&fit=crop&q=60" alt="design icon" className="w-full h-full object-cover opacity-80" />
            </motion.span> */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display"
            >
              that
            </motion.span>
          </div>
          <div className="flex flex-wrap items-center gap-x-[0.2em] font-display italic relative">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative z-10"
            >
              ship.
              <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-4 z-[-1]" viewBox="0 0 200 20" fill="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 1.5, ease: "easeInOut" }}
                  d="M5 15C40 5 160 5 195 15"
                  stroke="#e8432d"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </motion.span>
            {/* <motion.span 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.6 }}
              className="inline-block w-[1.2em] h-[0.6em] bg-accent-cream rounded-full overflow-hidden rotate-[3deg] my-auto"
            >
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=60" alt="abstract icon" className="w-full h-full object-cover opacity-80" />
            </motion.span> */}
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-[600px] text-text-primary text-2xl font-body leading-tight mb-12 tracking-tight"
        >
          I'm Surya, a product designer crafting high-fidelity
          digital experiences that feel human. Mixed with
          engineering precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap gap-4 mb-24"
        >
          <a href="#work" className="magnetic px-10 py-5 bg-black text-white rounded-full font-body font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-accent-red transition-all duration-300 hover:-rotate-1">
            Selected Work
          </a>
          <a href="#contact" className="px-10 py-5 border border-black/10 rounded-full font-body font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300">
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* Marquee Ticker */}
      <div className="w-full overflow-hidden bg-bg-secondary py-6 border-y border-black/5">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap px-16"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center flex-shrink-0">
              <span className="text-[12px] font-body uppercase tracking-[0.3em] font-bold text-text-primary/40">✦ PRODUCT DESIGN</span>
              <span className="text-[12px] font-body uppercase tracking-[0.3em] font-bold text-text-primary/40">✦ AI-FIRST EXPERIENCE</span>
              <span className="text-[12px] font-body uppercase tracking-[0.3em] font-bold text-text-primary/40">✦ DESIGN SYSTEMS</span>
              <span className="text-[12px] font-body uppercase tracking-[0.3em] font-bold text-text-primary/40">✦ FIGMA TO CODE</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
