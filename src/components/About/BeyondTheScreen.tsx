import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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

const BeyondTheScreen = () => {
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
  );
};

export default BeyondTheScreen;
