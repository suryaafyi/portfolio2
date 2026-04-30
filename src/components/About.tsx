import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import OriginStory from './About/OriginStory';
import WhyWorkWithMe from './About/WhyWorkWithMe';
import BeyondTheScreen from './About/BeyondTheScreen';
import FavoriteThings from './About/FavoriteThings';

// ─────────────────────────────────────────────
// Counter
// ─────────────────────────────────────────────
const Counter = ({ value, label }: { value: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    let startTs: number | null = null;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      setCount(Math.floor(p * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);
  return (
    <div ref={ref} className="flex flex-col">
      <span className="text-6xl md:text-8xl font-display text-text-primary tracking-tighter font-bold">{count}</span>
      <span className="font-body text-[10px] uppercase tracking-widest text-text-primary font-bold mt-2 opacity-40">{label}</span>
    </div>
  );
};

// ─────────────────────────────────────────────
// InlineImage
// ─────────────────────────────────────────────
const InlineImage = ({ imageUrl, className = '' }: { imageUrl?: string; className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const clip = useTransform(scrollYProgress, [0.3, 0.5], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);
  const width = useTransform(scrollYProgress, [0.3, 0.5], ['0px', '200px']);
  return (
    <motion.div
      ref={ref}
      style={{ width, clipPath: clip }}
      className={`inline-block h-[1.1em] mx-1 rounded-[0.2em] relative align-middle overflow-hidden ${className}`}
    >
      {imageUrl && <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// About — main component
// ─────────────────────────────────────────────
const About = () => {
  return (
    <section id="about" className="relative bg-bg-primary">
      {/* ── Hero text ─────────────────────────────── */}
      <div className="container mx-auto px-6 pt-32 pb-64">
        <div className="max-w-6xl mx-auto space-y-16">
          <h2 className="text-[clamp(3.5rem,10vw,12rem)] font-display text-text-primary leading-[0.85] lowercase tracking-tighter flex items-baseline flex-wrap">
            engineer turned designer.
          </h2>
          <div className="space-y-4">
            <div className="text-[clamp(1.5rem,4vw,3.5rem)] font-body text-text-primary leading-[1.1] tracking-tight flex items-baseline flex-wrap">
              spent 2.6 years <InlineImage imageUrl="/writing-code.jpeg" className="!h-[0.9em] !mx-3" /> writing code.
            </div>
            <div className="text-[clamp(1.5rem,4vw,3.5rem)] font-body text-text-primary leading-[1.1] tracking-tight flex items-baseline flex-wrap">
              switched to design <InlineImage imageUrl="/figma.png" className="!h-[0.9em] !mx-3" /> and never looked back.
            </div>
            <div className="text-[clamp(1.5rem,4vw,3.5rem)] font-body text-text-primary leading-[1.1] tracking-tight flex items-center flex-wrap">
              i know what breaks <span className="w-3 h-3 bg-accent-red rounded-full mx-4" /> in production.
            </div>
            <div className="text-[clamp(1.5rem,4vw,3.5rem)] font-body text-text-primary leading-[1.1] tracking-tight flex items-baseline flex-wrap">
              i design things <InlineImage imageUrl="/ships.png" className="!h-[0.9em] !mx-3" /> that actually ship.
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-20 pt-12 border-t border-black/5">
            <Counter value={3} label="case studies shipped." />
            <div className="flex flex-col">
              <span className="text-6xl md:text-8xl font-display text-text-primary tracking-tighter font-bold">0</span>
              <span className="font-body text-[10px] uppercase tracking-widest text-text-primary font-bold mt-2 opacity-40">unrealistic specs.</span>
            </div>
            <div className="flex flex-col">
              <span className="text-6xl md:text-8xl font-display text-text-primary tracking-tighter font-bold">1</span>
              <span className="font-body text-[10px] uppercase tracking-widest text-text-primary font-bold mt-2 opacity-40">designer who gets both sides.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Origin Story ───────────────── */}
      <OriginStory />

      {/* ── Why Work With Me ──────────────────────── */}
      <WhyWorkWithMe />

      {/* ── Beyond The Screen ──────────────────────── */}
      {/* <BeyondTheScreen /> */}

      {/* ── Favorite Things ──────────────────────── */}
      <FavoriteThings />

    </section>
  );
};

export default About;
