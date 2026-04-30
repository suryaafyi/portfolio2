import React, { useEffect, useLayoutEffect, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import MobileBanner from './components/MobileBanner';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import { ShiftCaseStudy } from './pages/CaseStudies/Shift';
import { KnotCaseStudy } from './pages/CaseStudies/Knot';
import { ZenDoCaseStudy } from './pages/CaseStudies/ZenDo';

function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [splashDonePhase, setSplashDonePhase] = useState(false);

  useEffect(() => {
    const entries = window.performance.getEntriesByType('navigation');
    const isReload = entries.length > 0 && (entries[0] as PerformanceNavigationTiming).type === 'reload';

    if (isReload) {
      sessionStorage.removeItem('splashShown');
    }

    const hasSeenSplash = sessionStorage.getItem('splashShown');
    if (!hasSeenSplash) {
      setShowSplash(true);
    } else {
      setSplashDonePhase(true);
    }
  }, []);

  const handleSplashRevealMain = () => {
    setSplashDonePhase(true);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('splashShown', 'true');
  };
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

    // Expose lenis to window for programmatic scrolling on route change
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return (
    <Router>
      <AppContent
        showSplash={showSplash}
        splashDonePhase={splashDonePhase}
        handleSplashRevealMain={handleSplashRevealMain}
        handleSplashComplete={handleSplashComplete}
      />
    </Router>
  );
}

function AppContent({
  showSplash,
  splashDonePhase,
  handleSplashRevealMain,
  handleSplashComplete
}: any) {
  // Scroll to top on route change using Lenis
  const location = useLocation();
  useEffect(() => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="relative bg-bg-primary text-text-primary selection:bg-accent-gold selection:text-bg-primary overflow-x-clip">
      {showSplash && (
        <SplashScreen
          onRevealMain={handleSplashRevealMain}
          onComplete={handleSplashComplete}
        />
      )}

      {/* Main Content Wrapper - Fades in after splash */}
      <div
        className={`relative z-[110] transition-opacity duration-400 ease-in-out ${splashDonePhase ? 'opacity-100' : 'opacity-0'
          }`}
      >
        {/* Global Utility Components */}
        <CustomCursor />
        <Navbar />
        <MobileBanner />

        {/* Page Content Routes */}
        <Routes>
          <Route path="/" element={<Home splashDonePhase={splashDonePhase} />} />
          <Route path="/work/shift" element={<ShiftCaseStudy />} />
          <Route path="/work/knot" element={<KnotCaseStudy />} />
          <Route path="/work/zendo" element={<ZenDoCaseStudy />} />
        </Routes>
      </div>

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
