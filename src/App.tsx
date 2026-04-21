import React, { useEffect, useLayoutEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import ToolsStack from './components/ToolsStack';
import SocialProofBar from './components/SocialProofBar';
import BentoGrid from './components/BentoGrid';
import Writing from './components/Writing';
import Footer from './components/Footer';

function App() {
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative bg-bg-primary text-text-primary selection:bg-accent-gold selection:text-bg-primary">
      {/* Global Utility Components */}
      <CustomCursor />
      <Navbar />

      {/* Page Content */}
      <main>
        <Hero />
        <BentoGrid />
        <SocialProofBar />
        <About />
        <Timeline />
        <ToolsStack />
        <Writing />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
