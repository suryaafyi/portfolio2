import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const OriginStory = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  return (
    <div ref={ref} className="w-full bg-[#f0ede8] py-[120px] px-6 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-6xl mx-auto flex flex-col"
      >
        {/* TOP BLOCK */}
        <div className="mb-16">
          <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#e8432d] mb-8">
            ORIGIN STORY
          </div>
          <div className="flex flex-col">
            <h2 className="font-serif italic font-normal text-[#1a1a1a] text-[48px] md:text-[72px] leading-[1.1] tracking-tight">
              i didn't choose
            </h2>
            <h2 className="font-serif italic font-bold text-[#e8432d] text-[48px] md:text-[72px] leading-[1.1] tracking-tight">
              design.
            </h2>
            <p className="font-body font-light text-[#1a1a1a] text-[20px] max-w-[480px] mt-[8px]">
              design chose me.
            </p>
          </div>
        </div>

        {/* BODY BLOCK */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 flex flex-col">
            <p className="font-body text-[17px] text-[#1a1a1a] leading-[1.9] max-w-[560px]">
              Long before Figma, there was a sketchbook. I was always the kid 
              making things look good — winning art competitions in school, obsessing over how things felt, not just how they worked. Then I became a software engineer. 2.6 years at HCL GUVI, writing code, shipping products, learning how things break in production. In 2025, I picked up Figma. I never put it down.
            </p>

            <div className="mt-[40px] pl-[24px] border-l-[3px] border-[#e8432d] flex flex-col items-start">
              <p className="font-serif italic text-[28px] text-[#1a1a1a] leading-tight">
                "an artist's eye. an engineer's brain."
              </p>
              <span className="font-hand text-[18px] text-[#1a1a1a] mt-2 -rotate-1 inline-block">
                → this is the whole thesis~
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM BLOCK */}
        <div className="w-full text-center mt-[80px]">
          <p className="font-hand text-[32px] text-[#1a1a1a]/40 -rotate-1 inline-block">
            art nerd → engineer → designer. in that order.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OriginStory;
