import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
  onRevealMain: () => void;
}

const generateStaticStars = () => {
  const stars = [];
  for (let i = 0; i < 150; i++) {
    const sizeCategory = Math.random();
    let size = '1px';
    let baseOpacity = 0.5;
    if (sizeCategory > 0.9) {
      size = '2px';
      baseOpacity = 0.9;
    } else if (sizeCategory > 0.66) {
      size = '1.5px';
      baseOpacity = 0.75;
    } else {
      size = '1px';
      baseOpacity = 0.55;
    }

    stars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size,
      baseOpacity,
      duration: 2 + Math.random() * 3, // 2s - 5s
      delay: Math.random() * 5
    });
  }
  return stars;
};

const STATIC_STARS = generateStaticStars();

const ShootingStars = ({ isActive }: { isActive: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let shootingStars: any[] = [];
    let lastSpawn = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = (time: number) => {
      if (document.visibilityState !== 'visible' || !isActive) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn logic
      if (time - lastSpawn > Math.random() * 700 + 800 && shootingStars.length < 3) { // 0.8s - 1.5s
        const isTop = Math.random() > 0.5;
        // Start at top edge or left edge
        const startX = isTop ? Math.random() * canvas.width : 0;
        const startY = isTop ? 0 : Math.random() * (canvas.height * 0.5);

        shootingStars.push({
          x: startX,
          y: startY,
          length: Math.random() * 100 + 80, // 80-180
          speed: (Math.random() * 1.5 + 1.5) * 1000, // duration 1.5s to 3.0s (slower)
          startTime: time,
          angle: 35 * (Math.PI / 180) // 35 deg angle down-left
        });
        lastSpawn = time;
      }

      // Update and draw
      shootingStars = shootingStars.filter(star => {
        const progress = (time - star.startTime) / star.speed;
        if (progress > 1) return false;

        const distance = progress * canvas.width * 1.5;
        // Move right and down
        const currentX = star.x + Math.cos(star.angle) * distance;
        const currentY = star.y + Math.sin(star.angle) * distance;

        // Opacity fades in quickly and out at end
        let opacity = 1;
        if (progress < 0.1) opacity = progress / 0.1;
        if (progress > 0.8) opacity = (1 - progress) / 0.2;

        ctx.save();
        ctx.globalAlpha = opacity;

        // Translate to current position and rotate
        ctx.translate(currentX, currentY);
        ctx.rotate(Math.PI + star.angle); // point tail backwards

        // Tail
        const gradient = ctx.createLinearGradient(0, 0, star.length, 0);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'white';

        ctx.beginPath();
        ctx.rect(0, -0.75, star.length, 1.5);
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();

        ctx.restore();

        return true;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[101] pointer-events-none" />;
};

export default function SplashScreen({ onComplete, onRevealMain }: SplashScreenProps) {
  // -1: Prompt to click, 0: Started (Phase 1), 2: Dot (Phase 2), 3: Quote (Phase 3), 4: Attribution (Phase 4), 6: Wipe (Phase 6), 7: Done
  const [phase, setPhase] = useState<number>(-1);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const springConfig = { damping: 25, stiffness: 150 };
  const marsX = useSpring(typeof window !== 'undefined' ? window.innerWidth / 2 : 800, springConfig);
  const marsY = useSpring(typeof window !== 'undefined' ? window.innerHeight / 2 : 400, springConfig);
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth * 0.8 : 800);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight * 0.5 : 400);

  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMarsCenter = () => {
      if (phase < 6 && dotRef.current) {
        const rect = dotRef.current.getBoundingClientRect();
        marsX.set(rect.left + rect.width / 2);
        marsY.set(rect.top + rect.height / 2);
      }
    };
    
    updateMarsCenter();
    window.addEventListener('resize', updateMarsCenter);
    return () => window.removeEventListener('resize', updateMarsCenter);
  }, [phase, marsX, marsY]);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(!window.matchMedia('(pointer: coarse)').matches);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (phase >= 6 && isDesktop) {
        marsX.set(e.clientX);
        marsY.set(e.clientY);
      }
    };
    
    if (isDesktop) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [phase, isDesktop, marsX, marsY, mouseX, mouseY]);

  useEffect(() => {
    if (phase === 6 && isDesktop) {
      marsX.set(mouseX.get());
      marsY.set(mouseY.get());
    }
  }, [phase, isDesktop, marsX, marsY, mouseX, mouseY]);

  const playWhoosh = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();

      const bufferSize = audioCtx.sampleRate * 1.2;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noiseSource = audioCtx.createBufferSource();
      noiseSource.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(80, audioCtx.currentTime);
      filter.frequency.linearRampToValueAtTime(2000, audioCtx.currentTime + 1.2);

      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.6);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.2);

      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      noiseSource.start();
    } catch (e) {
      console.warn('Audio API error:', e);
    }
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    // Shifted all timings down by 800ms to skip Phase 1 dark silence immediately on click
    const t1 = setTimeout(() => {
      playWhoosh();
      setPhase(2);
    }, 0);

    const t2 = setTimeout(() => setPhase(3), 700);
    const t3 = setTimeout(() => setPhase(4), 2000);
    const t4 = setTimeout(() => setPhase(6), 3200);

    const t5 = setTimeout(() => {
      onRevealMain();
    }, 3700);

    const t6 = setTimeout(() => {
      onComplete();
    }, 4700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStarted]);

  const handleEnter = () => {
    setPhase(0);
    setIsStarted(true);
  };

  const handleSkip = () => {
    if (phase >= 6) return;
    setPhase(6);
    setTimeout(() => {
      onRevealMain();
    }, 500);
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const line1 = "Design is not for philosophy —".split(" ");
  const line2 = "it's for life.".split(" ");

  return (
    <>
      {/* Background Layer (z-[100]) */}
      <div className="fixed inset-0 z-[100] bg-[#020408] pointer-events-none overflow-hidden">

        {/* Cosmos Group (fades out at phase 6) */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: phase >= 6 ? 0 : 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Nebulas */}
          <div className="absolute top-[-10%] right-[-10%] w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] rounded-full opacity-80 mix-blend-screen" style={{ background: 'radial-gradient(ellipse at center, rgba(30,50,120,0.15) 0%, transparent 60%)' }} />
          <div className="absolute bottom-[-10%] left-[-10%] w-[100vw] h-[100vw] md:w-[50vw] md:h-[50vw] rounded-full opacity-80 mix-blend-screen" style={{ background: 'radial-gradient(ellipse at center, rgba(60,20,80,0.12) 0%, transparent 50%)' }} />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] rounded-full opacity-60 mix-blend-screen" style={{ background: 'radial-gradient(ellipse at center, rgba(232,67,45,0.06) 0%, transparent 50%)' }} />

          {/* Static Stars */}
          <div className="absolute inset-0">
            {STATIC_STARS.map(star => (
              <div
                key={star.id}
                className="absolute bg-white rounded-full"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                  animation: `star-twinkle ${star.duration}s infinite ease-in-out ${star.delay}s`,
                  '--twinkle-max': star.baseOpacity,
                  '--twinkle-min': Math.max(0, star.baseOpacity - 0.3),
                } as React.CSSProperties}
              />
            ))}
          </div>

          <ShootingStars isActive={phase < 6} />
        </motion.div>

        {/* The expanding cream circle */}
        <motion.div
          className="absolute inset-0 bg-bg-primary"
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{ clipPath: phase >= 6 ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 50%)' }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>

      {/* Phase -1 Click anywhere interaction (z-[200]) */}
      <AnimatePresence>
        {phase === -1 && (
          <div
            className="fixed inset-0 z-[200] flex items-end justify-center pb-[40px] cursor-pointer"
            onClick={handleEnter}
          >
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="text-[#f5e6c8] font-['Space_Mono'] text-[11px] uppercase tracking-[4px]"
            >
              Click anywhere to enter
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Mars Cursor (z-[130]) */}
      <motion.div
        className="fixed top-0 left-0 z-[130] pointer-events-none flex items-center justify-center"
        style={{
          x: marsX,
          y: marsY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <AnimatePresence>
          {(phase >= 2 && phase < 7) && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: phase >= 6 && !isDesktop ? 0 : 1, scale: phase === 2 ? [1, 1.3, 1] : 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.4 } }}
              className="relative flex items-center justify-center"
            >
              {/* Orbital Ring */}
              <motion.div
                className="absolute w-[60px] h-[60px] border border-white/10 rounded-full"
                style={{ rotate: -20, scaleY: 0.3 }}
                animate={{ opacity: phase >= 6 ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* Mars Planet with bobbing */}
              <motion.div
                animate={phase < 6 ? { y: [-4, 4] } : { y: 0 }}
                transition={phase < 6 ? { duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' } : { duration: 0.2 }}
              >
                {/* Scale down and shadow transition */}
                <motion.div
                  className="rounded-full bg-[#e8432d] overflow-hidden relative"
                  animate={{
                    width: phase >= 6 && isDesktop ? 16 : 28,
                    height: phase >= 6 && isDesktop ? 16 : 28,
                    boxShadow: phase >= 6 ? (isDesktop ? '0 0 6px rgba(232,67,45,0.4)' : 'none') : '0 0 8px rgba(232,67,45,0.6), 0 0 20px rgba(232,67,45,0.3), 0 0 40px rgba(232,67,45,0.1)'
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Texture with Rotation */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: phase >= 6 ? 0 : 1, rotate: 360 }}
                    transition={{ 
                      opacity: { duration: 0.4 }, 
                      rotate: { duration: 20, repeat: Infinity, ease: 'linear' } 
                    }}
                  >
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(120,30,10,0.4) 0%, transparent 60%)' }} />
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 70%, rgba(240,120,80,0.3) 0%, transparent 50%)' }} />
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[rgba(80,20,10,0.5)] rotate-[-15deg] scale-y-50" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Content Layer (z-[120]) */}
      <div className="fixed inset-0 z-[120] pointer-events-none flex flex-col items-center justify-center">
        <div className="w-full max-w-[520px] text-center flex flex-col items-center justify-center relative">

          {/* Placeholder for Mars so Quote layout doesn't shift */}
          <div ref={dotRef} className="w-[28px] h-[28px] mb-[24px] opacity-0 pointer-events-none" />

          {/* Quote Container */}
          <motion.div
            animate={{ opacity: phase >= 6 ? 0 : 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            {/* Line 1 */}
            <div className="font-['Playfair_Display'] italic text-bg-primary text-[22px] md:text-[28px] overflow-hidden flex gap-[8px] justify-center flex-wrap">
              {line1.map((word, i) => (
                <motion.span
                  key={`l1-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Line 2 */}
            <div className="font-['Playfair_Display'] italic text-bg-primary text-[22px] md:text-[28px] overflow-hidden flex gap-[8px] justify-center mt-2">
              {line2.map((word, i) => (
                <motion.span
                  key={`l2-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: (line1.length * 0.12) + 0.3 + (i * 0.12) }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Attribution */}
            <motion.div
              className="font-['Space_Mono'] text-[11px] md:text-[12px] text-[#aaa] tracking-[3px] uppercase mt-8"
              initial={{ opacity: 0 }}
              animate={phase >= 4 ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              — Issey Miyake
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Skip Button (z-[120], pointer-events-auto) */}
      <AnimatePresence>
        {(phase >= 3 && phase < 6) && (
          <motion.button
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-[24px] right-[24px] z-[120] font-['Space_Mono'] text-[11px] text-text-muted uppercase hover:text-bg-primary transition-colors duration-300 pointer-events-auto cursor-pointer"
          >
            skip →
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
