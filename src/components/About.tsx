import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';

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
// PolaroidCard
// ─────────────────────────────────────────────
const PolaroidCard = ({
  caption, backText, rotation, imageUrl, gradient, className = '',
}: {
  caption: string; backText: string; rotation: number;
  imageUrl?: string; gradient?: string; className?: string;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <motion.div
      style={{ rotate: rotation, perspective: '1200px' }}
      className={`relative w-56 h-72 md:w-64 md:h-80 cursor-pointer select-none ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => setIsFlipped(f => !f)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
          className="bg-white shadow-2xl rounded-sm p-3 pb-12 md:p-4 md:pb-14 flex flex-col"
        >
          <div className="flex-1 rounded-sm overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt={caption} className="w-full h-full object-cover" />
            ) : (
              <div className={`w-full h-full ${gradient || 'bg-gradient-to-br from-bg-secondary to-bg-primary'}`} />
            )}
          </div>
          <div className="h-12 flex items-center justify-center text-center px-2 mt-2">
            <span className="font-hand text-base md:text-lg text-text-primary/80">{caption}</span>
          </div>
        </div>
        {/* Back */}
        <div
          style={{
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)', position: 'absolute', inset: 0,
          }}
          className="bg-[#f0ede8] shadow-2xl rounded-sm p-5 flex flex-col justify-center text-center"
        >
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-2 h-2 bg-accent-red rounded-full opacity-70" />
            <p className="font-hand text-base md:text-xl text-text-primary leading-tight whitespace-pre-line">{backText}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// InkWord — individual word with SVG ink-bleed fill
// ─────────────────────────────────────────────
const InkWord = ({
  word, fillColor, wordStartProg, wordEndProg, scrollProgress, isRed = false,
}: {
  word: string; fillColor: string; wordStartProg: number; wordEndProg: number;
  scrollProgress: any; isRed?: boolean;
}) => {
  // Viscous spring: stiff=35, damp=14 → slow, ink-like
  const widthRaw = useTransform(scrollProgress, [wordStartProg, wordEndProg], ['0%', '112%']);
  const width = useSpring(widthRaw, { stiffness: 35, damping: 14, restDelta: 0.001 });
  // Line 2 gets a slight scale-up as it fills
  const scale = useTransform(scrollProgress, [wordStartProg, wordEndProg], isRed ? [0.93, 1.0] : [1, 1]);

  return (
    <span
      className="relative inline-block"
      style={{ marginRight: '0.28em', verticalAlign: 'baseline' }}
    >
      {/* Layout reference + Outline layer */}
      <span
        style={{
          display: 'block',
          color: 'transparent',
          WebkitTextStroke: isRed ? '1.5px #e8432d' : '1.5px #1a1a1a',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          fontStyle: 'inherit',
          letterSpacing: 'inherit',
          lineHeight: 'inherit',
        }}
        aria-hidden="true"
      >
        {word}
      </span>

      {/* Ink fill layer — clipped by animated width */}
      <motion.span
        style={{
          width,
          scale,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          overflow: 'hidden',
          display: 'block',
          color: fillColor,
          // SVG turbulence filter creates organic ink-bleed edge
          filter: 'url(#ink-bleed)',
          whiteSpace: 'nowrap',
          transformOrigin: 'left center',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          fontStyle: 'inherit',
          letterSpacing: 'inherit',
          lineHeight: 'inherit',
        }}
        aria-hidden="true"
      >
        {word}
      </motion.span>
    </span>
  );
};

// ─────────────────────────────────────────────
// OriginStorySection — sticky ink-bleed scroll animation
// ─────────────────────────────────────────────
const OriginStorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  const LINE1_END = 0.42;
  const LINE2_START = 0.37;
  const LINE2_END = 0.92;

  const line1Words = ["i", "didn't", "choose", "design."];
  const line2Words = ["design", "chose", "me."];

  // Body content fades after both lines finish
  const bodyOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.82, 0.95], [20, 0]);

  return (
    <div ref={containerRef} className="relative h-[380vh] bg-[#f0ede8]">

      {/* Global SVG ink-bleed filter — hidden, just for defs */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          <filter id="ink-bleed" x="-5%" y="-20%" width="125%" height="150%">
            {/* Organic turbulence — low frequency = broad, slow waves */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.012"
              numOctaves="4"
              seed="3"
              result="noise"
            />
            {/* Only displace horizontally at a small scale so interior text stays crisp */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Paper grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-10 w-full space-y-4">

          {/* Line 1 — "i didn't choose design." — DM Sans semibold */}
          <div
            className="flex flex-wrap items-baseline"
            style={{
              fontSize: 'clamp(36px, 5.5vw, 80px)',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              textTransform: 'lowercase',
            }}
          >
            {line1Words.map((word, i) => {
              const span = LINE1_END;
              const wStart = (i / line1Words.length) * span;
              const wEnd = Math.min(((i + 1.4) / line1Words.length) * span, LINE1_END);
              return (
                <InkWord
                  key={i}
                  word={word}
                  fillColor="#1a1a1a"
                  scrollProgress={scrollYProgress}
                  wordStartProg={wStart}
                  wordEndProg={wEnd}
                />
              );
            })}
          </div>

          {/* Line 2 — "design chose me." — Playfair italic, red-orange */}
          <div
            className="flex flex-wrap items-baseline"
            style={{
              fontSize: 'clamp(40px, 7vw, 96px)',
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              textTransform: 'lowercase',
            }}
          >
            {line2Words.map((word, i) => {
              const span = LINE2_END - LINE2_START;
              const wStart = LINE2_START + (i / line2Words.length) * span;
              const wEnd = Math.min(LINE2_START + ((i + 1.5) / line2Words.length) * span, LINE2_END);
              return (
                <InkWord
                  key={i}
                  word={word}
                  fillColor="#e8432d"
                  scrollProgress={scrollYProgress}
                  wordStartProg={wStart}
                  wordEndProg={wEnd}
                  isRed
                />
              );
            })}
          </div>


          {/* ── Static body copy — always visible below headlines ── */}
          <div className="pt-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-body text-[clamp(14px,1.4vw,18px)] text-text-primary/70 leading-relaxed">
              <p>
                Long before Figma, there was a sketchbook.
                I've always seen the world a little differently —
                noticing the kerning on a restaurant menu,
                the way light hits a building, why some posters
                stop you and others don't.
              </p>
              <p>
                Won art competitions in school and college.
                Spent 2.6 years as a software engineer.
                Started learning product design in 2025.
              </p>
            </div>

            <div className="pt-6 border-t border-black/8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="text-[clamp(18px,2.5vw,36px)] font-display font-extrabold text-[#e8432d] leading-none lowercase tracking-tighter">
                an artist's eye + an engineer's brain
              </span>
              <span className="font-hand text-lg text-text-primary/30" style={{ transform: 'rotate(-1deg)', display: 'inline-block' }}>
                → this is the whole thesis~
              </span>
            </div>

            <p className="font-body text-[clamp(14px,1.4vw,18px)] text-text-primary/60 leading-relaxed">
              Turns out — an artist's eye + an engineer's brain
              is exactly what product design was waiting for.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// WhyWorkWithMe — dark recruiter section
// ─────────────────────────────────────────────
const strengthCards = [
  { icon: '🔍', title: 'I validate before I build.', body: "No pixel pushed without knowing why it's there. User research isn't optional — it's the whole point." },
  { icon: '⚙️', title: 'My handoffs actually work.', body: '2.6 years as an engineer means I speak dev fluently. No "just make it work" conversations. Ever.' },
  { icon: '⚡', title: 'I ship. Fast.', body: '3 case studies in under a year, starting from zero design experience. Speed without cutting corners.' },
  { icon: '🎯', title: 'I think product, not just screens.', body: "Every design decision connects to a business goal. Pretty is worthless if it doesn't convert." },
];

const WhyWorkWithMe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <div ref={ref} className="bg-[#1a1a1a] py-32 md:py-40 px-6">
      <div className="max-w-5xl mx-auto space-y-20">
        <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/30 text-center">WHY WORK WITH ME</div>
        <div className="text-center space-y-2">
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-serif italic font-extrabold text-[#f0ede8] leading-[0.9] lowercase tracking-tighter">
            I don't just design screens.
          </h2>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-serif italic font-extrabold text-[#e8432d] leading-[0.9] lowercase tracking-tighter">
            I solve problems.
          </h2>
        </div>
        <p className="text-center font-body text-base md:text-lg text-white/50 leading-relaxed max-w-xl mx-auto">
          Most designers hand off specs and hope for the best.
          I've been on the dev side. I know what breaks.
          I know what ships. That changes everything.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strengthCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -4 }}
              className="group bg-[#222] border border-white/8 rounded-xl p-8 space-y-4 cursor-default transition-colors duration-300 hover:border-[#e8432d]"
            >
              <div className="text-3xl">{card.icon}</div>
              <h3 className="font-body text-xl font-bold text-[#f0ede8] group-hover:text-[#e8432d] transition-colors duration-300 leading-tight">{card.title}</h3>
              <p className="font-body text-sm text-white/50 leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center space-y-10 pt-8">
          <p className="text-[clamp(1.6rem,3.5vw,3rem)] font-serif italic text-[#e8432d] leading-[1.1] lowercase tracking-tighter max-w-2xl mx-auto">
            "an artist's eye. an engineer's brain. a designer who ships."
          </p>
          <motion.a
            href="#contact"
            initial={{ rotate: -1 }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            style={{ rotate: -1, display: 'inline-flex' }}
            className="items-center gap-3 bg-[#e8432d] text-[#f0ede8] font-body font-bold text-base md:text-lg px-8 py-4 rounded-full cursor-pointer"
          >
            Let's build something →
          </motion.a>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// About — main component
// ─────────────────────────────────────────────
const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const sc = { stiffness: 55, damping: 18, restDelta: 0.001 };

  // Helper — cannot use hooks in a helper fn, so inline all 6
  const y1Raw = useTransform(scrollYProgress, [0.02, 0.12, 0.2], ['100vh', '0vh', '-100vh']);
  const o1Raw = useTransform(scrollYProgress, [0.02, 0.07, 0.16, 0.2], [0, 1, 1, 0]);
  const y1 = useSpring(y1Raw, sc); const opacity1 = useSpring(o1Raw, sc);

  const y2Raw = useTransform(scrollYProgress, [0.17, 0.27, 0.37], ['100vh', '0vh', '-100vh']);
  const o2Raw = useTransform(scrollYProgress, [0.17, 0.23, 0.32, 0.37], [0, 1, 1, 0]);
  const y2 = useSpring(y2Raw, sc); const opacity2 = useSpring(o2Raw, sc);

  const y3Raw = useTransform(scrollYProgress, [0.33, 0.44, 0.54], ['100vh', '0vh', '-100vh']);
  const o3Raw = useTransform(scrollYProgress, [0.33, 0.39, 0.49, 0.54], [0, 1, 1, 0]);
  const y3 = useSpring(y3Raw, sc); const opacity3 = useSpring(o3Raw, sc);

  const y4Raw = useTransform(scrollYProgress, [0.50, 0.61, 0.71], ['100vh', '0vh', '-100vh']);
  const o4Raw = useTransform(scrollYProgress, [0.50, 0.56, 0.66, 0.71], [0, 1, 1, 0]);
  const y4 = useSpring(y4Raw, sc); const opacity4 = useSpring(o4Raw, sc);

  const y5Raw = useTransform(scrollYProgress, [0.67, 0.78, 0.87], ['100vh', '0vh', '-100vh']);
  const o5Raw = useTransform(scrollYProgress, [0.67, 0.73, 0.82, 0.87], [0, 1, 1, 0]);
  const y5 = useSpring(y5Raw, sc); const opacity5 = useSpring(o5Raw, sc);

  const y6Raw = useTransform(scrollYProgress, [0.83, 0.91, 0.98], ['100vh', '0vh', '-100vh']);
  const o6Raw = useTransform(scrollYProgress, [0.83, 0.88, 0.95, 0.98], [0, 1, 1, 0]);
  const y6 = useSpring(y6Raw, sc); const opacity6 = useSpring(o6Raw, sc);

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

      {/* ── Origin Story — Ink Bleed ───────────────── */}
      <OriginStorySection />

      {/* ── Why Work With Me ──────────────────────── */}
      <WhyWorkWithMe />

      {/* ── Beyond The Screen — 6-card scrollytelling */}
      <div ref={sectionRef} className="relative h-[700vh] bg-bg-primary">
        <div className="sticky top-0 h-screen pointer-events-none" style={{ overflow: 'visible' }}>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="text-center space-y-5 md:space-y-6 max-w-[500px] px-4 pointer-events-auto">
              <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-text-primary/40">BEYOND THE SCREEN</div>
              <div className="space-y-1">
                <h2 className="text-[clamp(2rem,5vw,4rem)] font-serif italic text-text-primary leading-[0.9] lowercase tracking-tighter">
                  i contain multitudes.
                </h2>
                <p className="font-hand text-[21px] text-[#888]" style={{ transform: 'rotate(-1.5deg)', display: 'inline-block' }}>
                  (and too much caffeine)
                </p>
              </div>
              <div className="space-y-2 font-body text-sm text-text-primary/60 leading-relaxed max-w-[340px] mx-auto text-left">
                <p>Finished The Last of Us in 48 hours and cried.</p>
                <p>Has 22,000+ Spotify minutes and zero regrets.</p>
                <p>Thinks in grids during the day, respawns at night.</p>
                <p>Notices bad kerning on restaurant menus and says nothing.</p>
                <p>Believes good coffee and good design follow the same rule — if you notice it's bad, it's bad.</p>
              </div>
              <div className="font-body font-extrabold text-[#e8432d] text-sm md:text-base leading-snug">
                batman hours. figma open. headphones in.
              </div>
              <div className="w-fit mx-auto px-5 py-2 border border-[#e8432d] rounded-full" style={{ transform: 'rotate(-1deg)' }}>
                <span className="font-hand text-base text-[#e8432d]">OBSESSIVE · CAFFEINATED · SHIPS AT 2AM</span>
              </div>
            </div>
          </div>

          {/* Card 1 — LEFT */}
          <motion.div style={{ y: y1, opacity: opacity1 }} className="absolute z-30 top-[14%] left-6 md:left-10 lg:left-16 pointer-events-auto">
            <PolaroidCard rotation={-8} caption="school art competition 🏆" imageUrl="/polaroid-1.jpeg"
              backText={"won 1st place.\ndidn't know it was\ncalled 'design' yet.~"} />
          </motion.div>

          {/* Card 2 — RIGHT */}
          <motion.div style={{ y: y2, opacity: opacity2 }} className="absolute z-30 top-[14%] right-6 md:right-10 lg:right-16 pointer-events-auto">
            <PolaroidCard rotation={5} caption="always sketching ✏️" imageUrl="/polaroid-2.jpeg"
              backText={"sketchbook before\nFigma. always.\nstill do it.~"} />
          </motion.div>

          {/* Card 3 — LEFT */}
          <motion.div style={{ y: y3, opacity: opacity3 }} className="absolute z-30 bottom-[14%] left-6 md:left-10 lg:left-16 pointer-events-auto">
            <PolaroidCard rotation={-3} caption="seeing design everywhere 👁️" imageUrl="/polaroid-3.jpeg"
              backText={"i notice kerning\non restaurant menus.\nsend help.~"} />
          </motion.div>

          {/* Card 4 — RIGHT */}
          <motion.div style={{ y: y4, opacity: opacity4 }} className="absolute z-30 top-[14%] right-6 md:right-10 lg:right-16 pointer-events-auto">
            <PolaroidCard rotation={7} caption="RDR 2 is life 🤠"
              imageUrl="/polaroid-4.jpeg"
              gradient="bg-gradient-to-br from-amber-800 to-yellow-900"
              backText={"completed last of us\nin 48 hours straight.\nno regrets. zero."} />
          </motion.div>

          {/* Card 5 — LEFT */}
          <motion.div style={{ y: y5, opacity: opacity5 }} className="absolute z-30 bottom-[14%] left-6 md:left-10 lg:left-16 pointer-events-auto">
            <PolaroidCard rotation={-6} caption="22k Spotify mins 🎧"
              imageUrl="/polaroid-5.jpeg"
              gradient="bg-gradient-to-br from-green-900 to-emerald-950"
              backText={"doesn't leave the house\nwithout headphones.\nmusic is non-negotiable."} />
          </motion.div>

          {/* Card 6 — RIGHT */}
          <motion.div style={{ y: y6, opacity: opacity6 }} className="absolute z-30 bottom-[14%] right-6 md:right-10 lg:right-16 pointer-events-auto">
            <PolaroidCard rotation={-2} caption="night owl ☕🦇"
              imageUrl="/polaroid-6.jpeg"
              gradient="bg-gradient-to-br from-gray-900 to-zinc-950"
              backText={"most productive at 2am.\ncoffee in one hand.\nfigma in the other."} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
