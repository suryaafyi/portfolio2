import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Timeline from '../components/Timeline';
import ToolsStack from '../components/ToolsStack';
import SocialProofBar from '../components/SocialProofBar';
import BentoGrid from '../components/BentoGrid';
import Writing from '../components/Writing';
import HorizontalTicker from '../components/HorizontalTicker';
import Footer from '../components/Footer';

interface HomeProps {
  splashDonePhase: boolean;
}

const Home: React.FC<HomeProps> = ({ splashDonePhase }) => {
  return (
    <main>
      <Hero splashDonePhase={splashDonePhase} />
      <BentoGrid />
      <SocialProofBar />
      <About />
      <HorizontalTicker />
      <Timeline />
      <ToolsStack />
      <Writing />
      <Footer />
    </main>
  );
};

export default Home;
