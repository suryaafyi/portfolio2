import React from 'react';

export const TagChip = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 border border-text-primary/20 rounded-full inline-block mr-2 mb-2">
    {children}
  </span>
);

export const MetadataBar = ({ role, team, timeline, skills }: { role: string, team: string, timeline: string, skills: string }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-text-primary text-bg-primary p-8 rounded-2xl my-12">
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-bg-primary/50 mb-2">Role</div>
      <div className="font-body text-sm">{role}</div>
    </div>
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-bg-primary/50 mb-2">Team</div>
      <div className="font-body text-sm">{team}</div>
    </div>
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-bg-primary/50 mb-2">Timeline</div>
      <div className="font-body text-sm">{timeline}</div>
    </div>
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-bg-primary/50 mb-2">Skills</div>
      <div className="font-body text-sm leading-relaxed">{skills}</div>
    </div>
  </div>
);

export const SectionBlock = ({ id, label, heading, children }: { id?: string, label: string, heading: string, children: React.ReactNode }) => (
  <section id={id} className="mb-24 scroll-mt-24">
    <div className="font-mono text-[11px] uppercase tracking-widest text-accent-red mb-4">{label}</div>
    <h2 className="font-display text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-8">{heading}</h2>
    <div className="font-body text-lg text-text-primary/80 leading-[1.8] space-y-6">
      {children}
    </div>
  </section>
);

export const CalloutBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="my-10 pl-6 lg:pl-8 border-l-2 border-accent-red bg-bg-secondary/50 py-6 pr-6 rounded-r-2xl">
    <p className="font-display italic text-2xl lg:text-3xl leading-tight text-text-primary">
      {children}
    </p>
  </div>
);

export const StatRow = ({ stats }: { stats: { number: string, label: string }[] }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 my-12">
    {stats.map((stat, i) => (
      <div key={i}>
        <div className="font-display text-5xl lg:text-6xl text-accent-red mb-2">{stat.number}</div>
        <div className="font-mono text-[11px] uppercase tracking-widest text-text-primary/60">{stat.label}</div>
      </div>
    ))}
  </div>
);

export const PersonaCard = ({ name, quote, background, goals, painPoints, needs }: any) => (
  <div className="bg-text-primary text-bg-primary p-8 lg:p-10 rounded-3xl my-10">
    <h4 className="font-display text-2xl mb-2">{name}</h4>
    <p className="font-display italic text-xl text-accent-red mb-8">"{quote}"</p>
    
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-bg-primary/50 mb-2">Background</div>
        <p className="font-body text-sm leading-relaxed text-bg-primary/80">{background}</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-bg-primary/50 mb-2">Goals</div>
          <p className="font-body text-sm leading-relaxed text-bg-primary/80">{goals}</p>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-bg-primary/50 mb-2">Pain Points</div>
          <p className="font-body text-sm leading-relaxed text-bg-primary/80">{painPoints}</p>
        </div>
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-bg-primary/50 mb-3">User Needs</div>
        <div className="flex flex-wrap gap-2">
          {needs.map((need: string, i: number) => (
            <span key={i} className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 border border-bg-primary/20 rounded-full">
              {need}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const ImagePlaceholder = ({ color, caption, aspectRatio = 'aspect-[16/9]', src }: { color: string, caption: string, aspectRatio?: string, src?: string }) => (
  <div className="my-10">
    <div className={`w-full ${aspectRatio} rounded-2xl relative overflow-hidden flex items-center justify-center`} style={{ backgroundColor: `${color}20`, border: `1px solid ${color}30` }}>
      {src ? (
        <img src={src} alt={caption} className="w-full h-full object-cover" />
      ) : (
        <>
          <div className="font-mono text-sm tracking-widest text-text-primary/40 uppercase font-bold text-center px-4">{caption}</div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
        </>
      )}
    </div>
  </div>
);

export const NextProjectFooter = ({ link, title, behanceLink }: { link: string, title: string, behanceLink?: string }) => (
  <div className="mt-32 pt-16 border-t border-text-primary/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
    <div>
      <div className="font-mono text-[11px] uppercase tracking-widest text-accent-red mb-6">Next Project →</div>
      <a href={link} className="block group cursor-none" data-cursor="view">
        <h2 className="font-display text-5xl lg:text-7xl lowercase tracking-tight group-hover:text-accent-red transition-colors duration-300">
          {title}.
        </h2>
      </a>
    </div>
    {behanceLink && (
      <a 
        href={behanceLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="font-mono text-xs uppercase tracking-widest text-text-primary/60 hover:text-accent-red transition-colors pb-2 md:pb-4 border-b border-transparent hover:border-accent-red"
        data-cursor="view"
      >
        View Full Case On Behance ↗
      </a>
    )}
  </div>
);

export const SectionDivider = () => (
  <div className="w-full h-px bg-gradient-to-r from-text-primary/20 to-transparent my-24" />
);

export const BeforeAfterBlock = ({ beforeTitle, beforeContent, afterTitle, afterContent, improvements }: any) => (
  <div className="grid lg:grid-cols-2 gap-8 my-10">
    <div className="bg-bg-secondary p-8 rounded-2xl border border-text-primary/5">
      <div className="font-mono text-[11px] uppercase tracking-widest text-text-primary/40 mb-4">{beforeTitle}</div>
      <p className="font-body text-sm text-text-primary/70 leading-relaxed">{beforeContent}</p>
    </div>
    <div className="bg-[#e8432d]/5 p-8 rounded-2xl border border-[#e8432d]/20 relative">
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent-red text-white flex items-center justify-center font-bold text-lg hidden lg:flex shadow-lg z-10">
        →
      </div>
      <div className="font-mono text-[11px] uppercase tracking-widest text-accent-red mb-4">{afterTitle}</div>
      <p className="font-body text-sm text-text-primary/80 leading-relaxed mb-6">{afterContent}</p>
      
      <div className="border-t border-accent-red/20 pt-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-accent-red mb-2">Improvements</div>
        <p className="font-body text-sm italic text-text-primary/70">{improvements}</p>
      </div>
    </div>
  </div>
);
