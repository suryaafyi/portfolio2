import React from 'react';
import { motion } from 'framer-motion';

const obsessions = [
  { title: "AI-First Design", subtitle: "interfaces that think with you, not for you", rotate: -1.5 },
  { title: "Imperfect by Design", subtitle: "the most powerful thing you can do is look human", rotate: 1.2 },
  { title: "Design that Ships", subtitle: "beautiful is useless if it breaks in production", rotate: -0.8 },
  { title: "Motion as Meaning", subtitle: "animating with purpose, not just for polish", rotate: 1.5 },
];

const HorizontalTicker = () => {
  return (
    <section className="py-24 bg-bg-secondary overflow-hidden border-y border-black/5">
      <div className="container mx-auto px-6 mb-12">
        <h3 className="font-serif italic text-3xl text-text-primary lowercase tracking-tight">
          what’s living in my head rn.
        </h3>
      </div>

      <div className="flex overflow-hidden">
        <motion.div
           animate={{ x: [0, -1000] }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           className="flex gap-8 px-8"
        >
          {[...Array(3)].map((_, i) => (
             <React.Fragment key={i}>
                {obsessions.map((item, idx) => (
                   <div
                    key={idx}
                    className="flex-shrink-0 p-10 bg-card border border-black/5 shadow-sm min-w-[400px] flex flex-col gap-4 rounded-[2rem]"
                    style={{ transform: `rotate(${item.rotate}deg)` }}
                  >
                    <h4 className="font-display text-4xl text-text-primary leading-none lowercase tracking-tight">
                      {item.title}.
                    </h4>
                    <p className="font-body text-sm text-text-primary/60 leading-tight">
                      {item.subtitle}
                    </p>
                  </div>
                ))}
             </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalTicker;
