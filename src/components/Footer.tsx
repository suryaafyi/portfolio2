import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Twitter } from 'lucide-react';

// Custom Behance Icon to match Lucide style
const BehanceIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4H4v16h5c2.21 0 4-1.79 4-4s-1.79-4-4-4H4zM4 12h5M18 11a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3" />
    <path d="M15 9h6" />
  </svg>
);

const Footer = () => {
  return (
    <footer id="contact" className="relative pt-32 pb-0 bg-bg-primary overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {/* Column 1: Contact */}
          <div>
            <div className="font-body text-[10px] uppercase tracking-[0.3em] font-bold text-accent-red mb-6">Contact</div>
            <a href="mailto:suryaarunachalam2001@gmail.com" className="text-3xl font-display text-text-primary hover:text-accent-red transition-colors lowercase tracking-tight">
              hello@surya.design
            </a>
          </div>

          {/* Column 2: Socials */}
          <div>
            <div className="font-body text-[10px] uppercase tracking-[0.3em] font-bold text-text-primary/40 mb-6">Connect</div>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {[
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/surya-ux/' },
                { name: 'Github', url: 'https://github.com/suryaafyi' },
                { name: 'Behance', url: 'https://www.behance.net/suryaa-fyi' },
                { name: 'Instagram', url: 'https://www.instagram.com/ft.surxaa' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[14px] font-bold text-text-primary hover:text-accent-red transition-colors lowercase tracking-tight"
                >
                  {social.name}.
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Location */}
          <div>
            <div className="font-body text-[10px] uppercase tracking-[0.3em] font-bold text-text-primary/40 mb-6">Location</div>
            <p className="font-body text-[14px] font-bold text-text-primary lowercase tracking-tight">
              Currently based in <br /> Chennai, India.
            </p>
          </div>
        </div>
      </div>

      {/* Massive Bleeding Text */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none">
        <motion.h2
          initial={{ y: '20%' }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[clamp(10rem,35vw,50rem)] font-display text-text-primary leading-[0.7] tracking-tighter whitespace-nowrap -mb-[0.1em]"
        >
          surya a.
        </motion.h2>
      </div>

      <div className="bg-text-primary text-white py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-body text-[10px] uppercase tracking-widest font-bold">
            © 2026 SURYA ARUNACHALAM · ALL RIGHTS RESERVED
          </div>
          <div className="font-body text-[10px] uppercase tracking-widest font-bold">
            DESIGNED & BUILT WITH OBSESSION
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
