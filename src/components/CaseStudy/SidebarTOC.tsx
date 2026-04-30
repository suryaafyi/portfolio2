import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface TOCSection {
  id: string;
  label: string;
}

export const SidebarTOC = ({ sections }: { sections: TOCSection[] }) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden lg:block sticky top-24 w-64 flex-shrink-0">
      <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm tracking-widest uppercase mb-12 hover:text-accent-red transition-colors" data-cursor="view">
        <span className="text-lg leading-none">←</span> Work
      </Link>
      
      <div className="bg-bg-secondary p-6 rounded-2xl">
        <h4 className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-6">Table of Contents</h4>
        <nav className="flex flex-col gap-4">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => scrollTo(e, section.id)}
              className={`font-body text-sm transition-colors duration-300 relative ${
                activeSection === section.id ? 'text-accent-red font-bold' : 'text-text-primary/70 hover:text-text-primary'
              }`}
            >
              {activeSection === section.id && (
                <motion.div 
                  layoutId="activeTocIndicator"
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-red" 
                />
              )}
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};
