import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const strengthCards = [
  { 
    icon: '🔍', 
    title: 'Research First', 
    body: "I start with understanding people, not pixels. Every design decision has a reason rooted in real user behavior, not assumptions." 
  },
  { 
    icon: '⚙️', 
    title: 'Dev Friendly', 
    body: "2.6 years writing code means I speak developer. I know what's feasible, what breaks in production, and how to design things that actually ship without 47 revision rounds." 
  },
  { 
    icon: '⚡', 
    title: 'Fast Executor', 
    body: "I move fast without breaking things. 3 case studies from scratch in under a year — research, design, prototype, test. Full cycle, no hand-holding required." 
  },
  { 
    icon: '🎯', 
    title: 'Big Picture Thinker', 
    body: "I don't just design the screen in front of me. I think about the flow, the system, the edge cases, and the user who's exhausted at 11pm trying to get something done." 
  },
];

const WhyWorkWithMe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  return (
    <div ref={ref} className="w-full bg-[#1a1a1a] py-[120px] px-6 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-6xl mx-auto flex flex-col"
      >
        {/* HEADER */}
        <div className="flex flex-col">
          <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#e8432d] mb-4">
            WHY WORK WITH ME
          </div>
          <h2 className="font-serif italic font-normal text-[#f0ede8] text-[40px] md:text-[56px] leading-[1.1] tracking-tight">
            I don't just design screens.
          </h2>
          <h2 className="font-serif font-bold text-[#f0ede8] text-[40px] md:text-[56px] leading-[1.1] tracking-tight">
            I solve problems.
          </h2>
          <p className="font-body text-[#f0ede8]/60 text-[18px] mt-[16px]">
            Here's what you actually get.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[64px]">
          {strengthCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
              className="bg-[#f0ede8]/5 border border-[#f0ede8]/10 rounded-[16px] p-[40px] transition-all duration-300 ease-out hover:bg-[#f0ede8]/10 hover:border-[#e8432d]/40 group"
            >
              <div className="text-[32px] mb-[24px] leading-none">{card.icon}</div>
              <h3 className="font-body text-[22px] font-semibold text-[#f0ede8] mb-3">
                {card.title}
              </h3>
              <p className="font-body text-[15px] text-[#f0ede8]/60 leading-[1.8]">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CLOSING LINE & CTA */}
        <div className="flex flex-col items-center text-center mt-[80px]">
          <p className="font-serif italic text-[24px] md:text-[32px] text-[#f0ede8]/80 leading-tight">
            an artist's eye. an engineer's brain. a designer who ships.
          </p>
          <span className="font-hand text-[18px] text-[#e8432d] -rotate-1 mt-2 mb-[32px] inline-block">
            → that's the pitch~
          </span>

          <a 
            href="#contact"
            className="font-body text-[#f0ede8] border border-[#f0ede8]/30 rounded-full px-[32px] py-[14px] bg-transparent hover:bg-[#e8432d] hover:border-[#e8432d] hover:text-[#f0ede8] transition-all duration-300 ease-out"
          >
            Let's build something →
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default WhyWorkWithMe;
