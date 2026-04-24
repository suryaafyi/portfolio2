import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const milestones = [
  {
    year: "📍 School & College",
    title: "Won art competitions",
    description: "Always the kid who made things look good."
  },
  {
    year: "📍 2021–2025",
    title: "Software Engineer",
    description: "2.6 years writing code at AVASOFT. Learned how things actually get built."
  },
  {
    year: "📍 2025",
    title: "Picked up Figma. Never put it down.",
    description: "Started learning product design. Completed UI/UX course from HCL GUVI, 3 case studies in 6 months."
  },
  {
    year: "📍 2026",
    yearSuffix: "— now",
    title: "Available for hire.",
    description: "Looking for a team that ships things that actually matter.",
    isCurrent: true
  }
];

const Timeline = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef
  });

  const progress = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  const x = useTransform(progress, (p) => `calc(${-p * 100}% + ${p * 100}vw)`);

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-bg-primary">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-text-primary/40">THE JOURNEY</div>
        </div>

        <motion.div style={{ x }} className="flex pl-6 md:pl-16 pr-6 md:pr-16 gap-12 md:gap-32 items-center w-max">
          {milestones.map((milestone, i) => (
            <div key={i} className={`flex-shrink-0 ${i === milestones.length - 1 ? 'w-[85vw] md:w-[780px]' : 'w-[85vw] md:w-[550px]'} relative group`}>
              {/* Connecting Line */}
              {i !== milestones.length - 1 && (
                <div className="absolute top-1/2 right-0 w-full h-[2px] bg-accent-red/20 translate-y-[-50%] translate-x-[50%] z-0" />
              )}

              <div className="relative z-10 space-y-8">
                {/* Marker */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-6">
                    <div className={`w-5 h-5 rounded-full ${milestone.isCurrent ? 'bg-accent-red animate-pulse-red' : 'bg-accent-red'}`} />
                    <div className="font-display text-[clamp(48px,6vw,80px)] font-extrabold text-[#1a1a1a] lowercase tracking-tighter leading-none">
                      {milestone.year.replace('📍 ', '')}
                    </div>
                    {(milestone as any).yearSuffix && (
                      <div className="font-mono text-[clamp(14px,1.5vw,20px)] text-accent-red uppercase tracking-widest font-bold mt-1">
                        {(milestone as any).yearSuffix}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-body text-[clamp(20px,2.5vw,28px)] font-bold text-text-primary italic tracking-tight">
                      {milestone.title}
                    </h3>
                    <p className="font-body text-[14px] text-[#666] max-w-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-12 left-24 right-24 h-[1px] bg-black/5">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-full bg-accent-red origin-left"
          />
        </div>
      </div>
    </section>
  );
};

export default Timeline;
