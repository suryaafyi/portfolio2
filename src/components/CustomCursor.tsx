import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoverState, setHoverState] = useState<'default' | 'hover' | 'view'>('default');
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(!window.matchMedia('(pointer: coarse)').matches);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.classList.contains('magnetic')) {
        setHoverState('hover');
      } else if (target.closest('[data-cursor="view"]')) {
        setHoverState('view');
      } else {
        setHoverState('default');
      }
    };

    if (!window.matchMedia('(pointer: coarse)').matches) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseover', handleMouseOver);
    }

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Ambient Glow */}
      <motion.div
        className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-[1] rounded-full opacity-[0.4]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(232, 67, 45, 0.08) 0%, rgba(232, 67, 45, 0) 70%)',
        }}
      />

      {/* Main Cursor Dot */}
      <motion.div
        className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] flex items-center justify-center transition-colors duration-300 ${
          hoverState !== 'default' ? 'bg-white mix-blend-difference' : 'bg-[#e8432d]'
        }`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: hoverState === 'hover' ? 2.5 : hoverState === 'view' ? 8 : 1,
        }}
      >
        {hoverState === 'view' && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[4px] font-mono uppercase text-black font-bold"
          >
            view
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
