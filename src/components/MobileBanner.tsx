import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Monitor } from 'lucide-react';

const MobileBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner only on mobile/tablet screens after a short delay
    const checkScreenSize = () => {
      if (window.innerWidth < 1024) { // lg breakpoint is 1024px
        const hasSeenBanner = sessionStorage.getItem('hasSeenMobileBanner');
        if (!hasSeenBanner) {
          // Add a small delay so it doesn't pop up instantly on page load
          setTimeout(() => setIsVisible(true), 2500); 
        }
      } else {
        setIsVisible(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenMobileBanner', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-6 left-4 right-4 z-[9999] lg:hidden"
        >
          <div className="bg-[#1a1a1a] text-[#f0ede8] p-4 md:p-5 rounded-2xl flex items-start gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-white/10 relative overflow-hidden">
            {/* Subtle grain texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px',
              }}
            />
            
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 relative z-10">
              <Monitor size={18} className="text-[#e8432d]" />
            </div>
            
            <div className="flex-1 pt-0.5 relative z-10">
              <p className="font-body text-[15px] font-bold leading-snug tracking-tight">
                best viewed on desktop.
              </p>
              <p className="font-body text-[10px] text-white/50 mt-1 uppercase tracking-[0.2em] font-bold">
                for the full experience
              </p>
            </div>
            
            <button 
              onClick={handleClose}
              className="p-2 -mr-1 -mt-1 text-white/40 hover:text-white transition-colors relative z-10"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileBanner;
