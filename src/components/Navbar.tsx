import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Writing', href: '#writing' },
    { name: 'Lets Talk', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${isScrolled ? 'py-4 bg-bg-primary/80 backdrop-blur-md border-b border-black/5' : 'py-8'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display text-text-primary tracking-tighter lowercase font-bold"
        >
          surya.
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="px-5 py-2 border border-black/10 rounded-full font-body text-[11px] uppercase tracking-[0.1em] font-bold hover:bg-black hover:text-white transition-all duration-300"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-black/10 mx-2" />

          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/5 bg-white/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-body font-bold uppercase tracking-widest text-green-600">Available for work</span>
          </div>

          {/* CTA Button */}
          {/* <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 bg-accent-red text-white border border-accent-red rounded-full font-body text-[11px] uppercase tracking-[0.1em] font-bold hover:bg-black hover:border-black transition-all duration-300"
          >
            Let's Talk
          </motion.a> */}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-primary p-2 border border-black/10 rounded-full"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg-primary z-[2000] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-display text-text-primary font-bold lowercase">surya.</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 border border-black/10 rounded-full"
              >
                <X size={24} className="text-text-primary" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-display text-text-primary hover:text-accent-red font-bold lowercase"
                >
                  {link.name}.
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 px-8 py-4 bg-accent-red text-white rounded-full font-body text-center text-[12px] uppercase tracking-[0.2em] font-bold"
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
