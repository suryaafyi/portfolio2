import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// ─────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────
type FavoriteItem = {
  id: string;
  title: string;
  subtitle: string;
  imageSrc?: string;
  gradientTint: string;
  backText: string;
  rotation: number;
};

type Category = {
  name: string;
  aspectRatio: string;
  items: FavoriteItem[];
};

const categories: Category[] = [
  {
    name: 'Books',
    aspectRatio: 'aspect-[2/3]',
    items: [
      { id: 'b1', imageSrc: '/fav-things/verity.jpg', title: 'Verity', subtitle: 'COLLEEN HOOVER', gradientTint: 'from-blue-900 to-indigo-950', rotation: -2, backText: 'I love how this book messes with me. It makes me question what’s real, what’s written, and what people are capable of hiding. It’s uncomfortable in the best way.' },
      { id: 'b2', imageSrc: '/fav-things/moby-dick.jpg', title: 'Moby-Dick', subtitle: 'HERMAN MELVILLE', gradientTint: 'from-orange-800 to-red-950', rotation: 1, backText: 'This isn’t just a story, it feels like being inside someone’s obsession. I’m drawn to how intense and consuming it is, like watching a mind slowly drift too far.' },
      { id: 'b3', imageSrc: '/fav-things/wuthering-heights.jpg', title: 'Wuthering Heights', subtitle: 'EMILY BRONTË', gradientTint: 'from-neutral-800 to-neutral-950', rotation: -1, backText: 'I like that it doesn’t try to be beautiful. The emotions are messy, almost violent, and that honesty makes it feel real.' },
      { id: 'b4', imageSrc: '/fav-things/a-song-of-ice-and-fire.jpg', title: 'A Song of Ice and Fire', subtitle: 'GEORGE R. R. MARTIN', gradientTint: 'from-teal-700 to-blue-900', rotation: 3, backText: 'I love how unpredictable it is. No one is safe, no choice is simple, and every action leaves a mark. It feels alive because of that.' },
    ]
  },
  {
    name: 'Movies & Shows',
    aspectRatio: 'aspect-[2/3]',
    items: [
      { id: 'm1', imageSrc: '/fav-things/interstellar.jpg', title: 'Interstellar', subtitle: 'CHRISTOPHER NOLAN', gradientTint: 'from-sky-500 to-blue-800', rotation: 0, backText: 'This one makes me feel small and emotional at the same time. It’s not just space, it’s about love, time, and how far we’re willing to go.' },
      { id: 'm2', imageSrc: '/fav-things/game-of-thrones.jpg', title: 'Game of Thrones', subtitle: 'HBO', gradientTint: 'from-cyan-600 to-blue-800', rotation: -2, backText: 'I like how ruthless it is with its characters. It doesn’t protect anyone, and that makes every moment feel tense and real.' },
      { id: 'm3', imageSrc: '/fav-things/wall-e.jpg', title: 'WALL·E', subtitle: 'PIXAR', gradientTint: 'from-amber-700 to-yellow-900', rotation: 1, backText: 'I love how it says so much without saying much at all. It’s simple on the surface, but it hits deeply.' },
      { id: 'm4', imageSrc: '/fav-things/fight-club.jpg', title: 'Fight Club', subtitle: 'DAVID FINCHER', gradientTint: 'from-emerald-600 to-teal-800', rotation: 3, backText: '“The first rule of fight club is you do not talk about fight club.”' },
    ]
  },
  {
    name: 'Songs',
    aspectRatio: 'aspect-square',
    items: [
      { id: 's1', imageSrc: '/fav-things/wildflower.jpg', title: 'Wildflower', subtitle: 'BILLIE EILISH', gradientTint: 'from-blue-600 to-indigo-800', rotation: -1, backText: 'It feels soft but heavy at the same time. Like something fragile carrying a lot of emotion underneath.' },
      { id: 's2', imageSrc: '/fav-things/apocalypse.jpg', title: 'Apocalypse', subtitle: 'CIGARETTES AFTER SEX', gradientTint: 'from-zinc-800 to-black', rotation: 2, backText: 'This song feels like a memory. Distant, slow, and a little painful to hold onto.' },
      { id: 's3', imageSrc: '/fav-things/like-him.jpg', title: 'Like Him', subtitle: 'TYLER, THE CREATOR', gradientTint: 'from-green-800 to-emerald-950', rotation: -2, backText: 'There’s something quiet and personal about it. It doesn’t try too hard, and that’s what makes it hit.' },
      { id: 's4', imageSrc: '/fav-things/505.jpg', title: '505', subtitle: 'ARCTIC MONKEYS', gradientTint: 'from-blue-800 to-blue-950', rotation: 1, backText: 'I love how it builds. By the end, it feels like everything just spills out at once.' },
    ]
  },
  {
    name: 'Games',
    aspectRatio: 'aspect-[3/4]',
    items: [
      { id: 'g1', imageSrc: '/fav-things/rdr2.jpg', title: 'Red Dead Redemption 2', subtitle: 'ROCKSTAR GAMES', gradientTint: 'from-neutral-200 to-neutral-400', rotation: 0, backText: 'It feels like I’m living inside the world, not just playing it. The story stays with me even after I’m done.' },
      { id: 'g2', imageSrc: '/fav-things/farcry.jpg', title: 'Far Cry', subtitle: 'UBISOFT', gradientTint: 'from-neutral-800 to-neutral-950', rotation: -2, backText: 'I like the freedom it gives me. Every situation feels like mine to figure out.' },
      { id: 'g3', imageSrc: '/fav-things/uncharted.jpg', title: 'Uncharted 4', subtitle: 'NAUGHTY DOG', gradientTint: 'from-orange-600 to-red-800', rotation: 1, backText: 'It feels like being part of an adventure movie, but with real emotion behind it.' },
      { id: 'g4', imageSrc: '/fav-things/the-last-of-us.jpg', title: 'The Last of Us', subtitle: 'NAUGHTY DOG', gradientTint: 'from-red-800 to-red-950', rotation: 2, backText: 'This one stays heavy. It makes me think about people, choices, and what survival really means.' },
    ]
  }
];

// ─────────────────────────────────────────────
// FlipCard Component
// ─────────────────────────────────────────────
const FlipCard = ({ item, aspectRatio }: { item: FavoriteItem, aspectRatio: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-start min-w-[200px] w-[200px] md:min-w-[220px] md:w-[220px]">
      <motion.div
        className="relative w-full cursor-pointer perspective-[1200px]"
        initial={{ rotate: item.rotation }}
        animate={{ rotate: isFlipped ? 0 : item.rotation }}
        whileHover={{ scale: isFlipped ? 1 : 1.02, zIndex: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className={`relative w-full ${aspectRatio} transform-style-3d`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-sm"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradientTint} opacity-80`} />
            {item.imageSrc ? (
              <img src={item.imageSrc} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-mono text-[10px] text-white/30 tracking-widest">[ IMAGE ]</span>
              </div>
            )}
            {/* // swap with real image src */}
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 rounded-2xl bg-white shadow-md flex flex-col justify-between p-6"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <p className="font-body text-[14px] text-text-primary leading-relaxed">
              {item.backText}
            </p>
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-primary/40 text-right w-full">
              FLIP BACK
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Info below card (hidden when flipped) */}
      <motion.div
        className="mt-4 flex flex-col origin-top"
        animate={{ opacity: isFlipped ? 0 : 1, y: isFlipped ? -10 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h4 className="font-body text-[16px] text-text-primary font-medium leading-tight">{item.title}</h4>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-primary/50 mt-1">
          {item.subtitle}
        </span>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────
const FavoriteThings = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  const currentCategory = categories[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full bg-[#f0ede8] py-[120px] overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto flex flex-col items-center px-4 md:px-12 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full text-center mb-6"
        >
          <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#e8432d] mb-4">
            A FEW OF MY FAVORITE THINGS
          </div>

          {/* Category Title with AnimatePresence for smooth transitions */}
          <div className="h-[60px] relative overflow-hidden flex justify-center">
            <AnimatePresence mode="wait">
              <motion.h3
                key={currentCategory.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="font-serif font-normal text-text-primary text-[40px] md:text-[48px] absolute"
              >
                {currentCategory.name}
              </motion.h3>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Carousel / Display Area */}
        <div className="w-full relative mt-12 flex items-center justify-center">

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:-left-8 z-20 w-10 h-10 rounded-md bg-[#e8e4de] text-text-primary flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Previous Category"
            data-cursor="pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          </button>

          {/* Cards Container */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full px-12 md:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-row flex-wrap justify-center gap-6 md:gap-8 max-w-[1000px]"
              >
                {currentCategory.items.map((item, i) => (
                  <FlipCard key={item.id} item={item} aspectRatio={currentCategory.aspectRatio} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:-right-8 z-20 w-10 h-10 rounded-md bg-[#e8e4de] text-text-primary flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Next Category"
            data-cursor="pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>

        </div>
      </div>
    </div>
  );
};

export default FavoriteThings;
