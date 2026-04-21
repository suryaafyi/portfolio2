import React from 'react';
import { motion } from 'framer-motion';

const SocialProofBar = () => {
  const stats = [
    "3 Case Studies",
    "2.6 Yrs Engineering",
    "Available Now",
    "Chennai → Anywhere"
  ];

  return (
    <div className="w-full bg-bg-secondary py-8 border-y border-black/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center gap-y-6">
          {stats.map((stat, i) => (
            <React.Fragment key={stat}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="font-mono text-[13px] uppercase tracking-[0.2em] font-bold text-text-primary/70 flex items-center gap-4"
              >
                {stat}
              </motion.div>
              {i !== stats.length - 1 && (
                <div className="hidden md:block w-2 h-2 bg-accent-red rounded-full mx-4" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProofBar;
