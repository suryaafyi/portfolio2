import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 'shift',
    title: 'SHIFT',
    description: 'A Career Transition Platform | UX Case Study',
    tags: ['UX Research', 'Product Design', 'Figma'],
    link: 'https://www.behance.net/gallery/245704505/Shift-A-Career-Transition-Platform-UX-Case-Study',
    color: '#4060ff',
    className: 'col-span-2'
  },
  {
    id: 'knot',
    title: 'KNOT',
    description: 'Where Moments Became Memories | UX/UI Case Study',
    tags: ['UI Design', 'Motion', 'Figma'],
    link: 'https://www.behance.net/gallery/247113621/knot-Where-Moments-Became-Memories-UXUI-Case-study',
    color: '#f0c060',
    className: 'row-span-2'
  },
  {
    id: 'zendo',
    title: 'ZEN·DO',
    description: 'A Mindful Productivity App | UI/UX Case Study',
    tags: ['UX Research', 'UI Design', 'Productivity'],
    link: 'https://www.behance.net/gallery/246285297/Zen-do-A-Mindful-Productivity-App-UIUX-Case-Study',
    color: '#4ade80',
    className: 'col-span-1'
  },
  {
    id: 'more',
    title: 'MORE SOON',
    description: 'Working on something exciting...',
    tags: ['Next Gen', '2026'],
    link: '#',
    color: '#666',
    className: 'col-span-1 grayscale opacity-50'
  }
];

const CaseStudyCard = ({ project }: { project: typeof projects[0] }) => {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`bg-card group relative p-6 lg:p-8 flex flex-col justify-between overflow-hidden cursor-none border border-black/5 shadow-sm rounded-3xl ${project.className}`}
    >
      {/* Background Tint */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500"
        style={{ backgroundColor: project.color }}
      />

      {/* Card Content */}
      <div className="relative z-10">
        <div className="font-body text-[10px] tracking-widest text-text-primary/40 mb-2 uppercase font-bold">
          {project.tags.join(' · ')}
        </div>
        <h3 className="text-[clamp(1.6rem,3vw,2.5rem)] leading-[0.9] font-display text-text-primary group-hover:text-accent-red transition-colors lowercase tracking-tight">
          {project.title}.
        </h3>
        <p className="font-body text-sm text-text-primary/60 mt-2 max-w-[380px] leading-tight line-clamp-2">
          {project.description}
        </p>
      </div>

      <div className="relative z-10 mt-auto pt-4 flex justify-between items-center">
        <span className="font-body text-[10px] uppercase tracking-[0.2em] font-bold text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Case Study
        </span>
        <div className="flex-none w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-accent-red group-hover:border-accent-red group-hover:text-white transition-all duration-300">
          ↗
        </div>
      </div>
    </motion.a>
  );
};

const BentoGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const progress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const x = useTransform(progress, (p) => `calc(${-p * 100}% + ${p * 100}vw)`);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.05) setShowHint(false);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section id="work" ref={sectionRef} className="relative h-[300vh] bg-bg-primary">
      <div className="sticky top-0 h-screen flex flex-col justify-center items-start overflow-hidden">

        {/* Section Header */}
        <div className="mb-12 relative z-20 px-6 lg:px-24">
          <div className="font-body text-[11px] uppercase tracking-[0.4em] text-accent-red font-bold mb-4">Selected Work</div>
          <h2 className="text-6xl md:text-[clamp(4rem,9vw,11rem)] font-display text-text-primary leading-[0.9] lowercase tracking-tight">
            <span className="font-body font-bold">case</span> <span className="font-display italic">studies.</span>
          </h2>
        </div>

        {/* Scroll Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 font-body text-[10px] uppercase tracking-[0.2em] font-bold text-text-primary/40 flex items-center gap-4 z-30"
            >
              scroll to explore
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Horizontal Container */}
        <div className="w-full h-[60vh] flex items-center">
          <motion.div
            ref={containerRef}
            style={{ x }}
            className="flex gap-8 min-w-max pl-6 lg:pl-24 pr-6 lg:pr-24"
          >
            <div className="grid grid-cols-3 grid-rows-2 gap-8 h-[65vh] min-w-[140vw]">
              {projects.map((project) => (
                <CaseStudyCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
