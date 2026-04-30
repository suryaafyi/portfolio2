import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SidebarTOC, TOCSection } from '../../components/CaseStudy/SidebarTOC';
import { TagChip } from '../../components/CaseStudy/UIComponents';

interface CaseStudyLayoutProps {
  tags: string[];
  headline: string;
  subDescription?: string;
  metadata: React.ReactNode;
  heroImageColor: string;
  heroImageCaption: string;
  heroImageSrc?: string;
  tocSections: TOCSection[];
  children: React.ReactNode;
}

export const CaseStudyLayout = ({
  tags,
  headline,
  subDescription,
  metadata,
  heroImageColor,
  heroImageCaption,
  heroImageSrc,
  tocSections,
  children
}: CaseStudyLayoutProps) => {

  // Optional scroll to top on mount is handled by AppContent's location listener,
  // but just in case, we can keep the animation smooth.
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen pt-32 pb-24 px-6 lg:px-24"
    >
      {/* Hero Block */}
      <div className="max-w-[1200px] mx-auto mb-20">
        <div className="mb-8">
          {tags.map((tag, i) => (
            <TagChip key={i}>{tag}</TagChip>
          ))}
        </div>
        
        <h1 className="font-display text-5xl lg:text-7xl leading-[1.1] tracking-tight mb-6">
          {headline}
        </h1>
        
        {subDescription && (
          <p className="font-body text-xl lg:text-2xl text-text-primary/70 max-w-3xl mb-12">
            {subDescription}
          </p>
        )}
        
        {metadata}
        
        {/* Hero Mockup Placeholder */}
        <div 
          className="w-full aspect-video rounded-3xl mt-16 relative overflow-hidden flex items-center justify-center shadow-2xl"
          style={{ backgroundColor: `${heroImageColor}20`, border: `1px solid ${heroImageColor}30` }}
        >
          {heroImageSrc ? (
            <img src={heroImageSrc} alt={heroImageCaption} className="w-full h-full object-cover" />
          ) : (
            <>
              <div className="font-mono text-lg tracking-widest text-text-primary/40 uppercase font-bold text-center px-4">
                {heroImageCaption}
              </div>
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
            </>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32 relative items-start">
        <SidebarTOC sections={tocSections} />
        
        {/* Main Content Area */}
        <div className="flex-1 max-w-[800px] w-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
