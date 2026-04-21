import React from 'react';
import { motion } from 'framer-motion';
import { Figma, Laptop, Code, Cpu, Database, Settings, Sparkles } from 'lucide-react';

const AdobeIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.1,2H2v13.1l13.1-13.1ZM8.5,8.5L2,15.1v6.9l6.5-6.6l6.6,6.6v-6.9l-6.6-6.6ZM15.1,15.1L22,22V8.9l-6.9,6.2ZM22,2H8.9l13.1,13.1V2Z" />
  </svg>
);

const tools = [
  { name: "Figma", desc: '"where ideas become real"', icon: Figma },
  { name: "Adobe Creative Suite", desc: '"the holy trinity: ps + ai + id"', icon: AdobeIcon },
  { name: "React", desc: '"i can read your devs\' code"', icon: Code },
  { name: "Tailwind CSS", desc: '"design tokens but make it code"', icon: Database },
  { name: "Notion", desc: '"where my brain lives"', icon: Cpu },
  { name: "Maze / UT", desc: '"proving designs work"', icon: Settings },
  { name: "Antigravity + Claude", desc: '"vibe coded this whole site 😭"', icon: Sparkles, isEasterEgg: true },
];

const ToolsStack = () => {
  return (
    <section className="py-32 bg-bg-secondary">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-8">
          <div className="space-y-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-text-primary/40">TOOLS I USE</div>
            <h2 className="text-[clamp(64px,8vw,120px)] font-display font-extrabold text-[#1a1a1a] lowercase tracking-tighter leading-[0.85]">
              my stack.
            </h2>
          </div>
          <div className="font-hand text-3xl text-accent-red -rotate-6">the good ones~</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`p-8 bg-white border border-black/5 rounded-3xl transition-all duration-300 shadow-sm flex flex-col justify-between group hover:border-accent-red hover:bg-[#fff9f4] ${tool.isEasterEgg ? 'border-dashed border-accent-red/30 hover:animate-wiggle' : ''
                }`}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-2xl bg-bg-secondary flex items-center justify-center text-text-primary group-hover:bg-accent-red group-hover:text-white transition-colors duration-300">
                  <tool.icon size={24} />
                </div>
                {tool.isEasterEgg && (
                  <div className="px-3 py-1 bg-accent-red/10 text-accent-red text-[10px] uppercase tracking-widest font-bold rounded-full">
                    Easter Egg
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-body text-xl font-bold text-text-primary">{tool.name}</h3>
                <p className="font-hand text-lg text-text-primary/40 leading-tight">
                  {tool.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsStack;
