import React from 'react';
import { motion } from 'framer-motion';

const Writing = () => {
  return (
    <section id="writing" className="py-32 bg-bg-primary">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-6xl md:text-[clamp(4rem,9vw,10rem)] font-display text-text-primary lowercase tracking-tight">
            <span className="font-body font-bold">writ</span><span className="font-display italic">ing.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Article Card 1 */}
          <motion.a
            href="https://www.linkedin.com/pulse/design-paradox-2026-why-most-powerful-thing-you-can-do-surya-a-c1jmc"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card group p-10 flex flex-col justify-between min-h-[360px] border border-black/5 shadow-sm rounded-[2rem] transition-all duration-500 hover:-translate-y-2"
          >
            <div>
               <div className="font-body text-[10px] uppercase tracking-[0.2em] font-bold text-accent-red mb-6">
                LinkedIn Article
              </div>
              <h3 className="text-3xl font-display text-text-primary leading-tight lowercase tracking-tight">
                The design paradox of 2026: why the most powerful thing you can do is look imperfect.
              </h3>
              <p className="font-body text-[16px] text-text-primary/60 mt-6 leading-snug tracking-tight">
                AI makes everything perfect. Perfect is losing.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-text-primary font-body text-[11px] uppercase tracking-[0.2em] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              read now ↗
            </div>
          </motion.a>

          {/* Article Card 2 - Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border border-dashed border-black/10 rounded-[2rem] p-10 flex flex-col items-center justify-center min-h-[360px] opacity-40 group"
          >
            <div className="font-serif italic text-3xl text-text-primary transform group-hover:scale-110 transition-transform lowercase">
              Next article dropping soon.
            </div>
            <p className="font-body text-[10px] uppercase tracking-widest mt-6 font-bold">
              Stay Tuned
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Writing;
