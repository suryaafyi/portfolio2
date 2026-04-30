import React from 'react';
import { CaseStudyLayout } from './CaseStudyLayout';
import {
  MetadataBar,
  SectionBlock,
  CalloutBlock,
  StatRow,
  PersonaCard,
  ImagePlaceholder,
  NextProjectFooter,
  SectionDivider,
  TagChip
} from '../../components/CaseStudy/UIComponents';

export const ShiftCaseStudy = () => {
  const tocSections = [
    { id: 'context', label: '01. Context' },
    { id: 'problem', label: '02. The Problem' },
    { id: 'research', label: '03. Research' },
    { id: 'define', label: '04. Define' },
    { id: 'ideate', label: '05. Ideate' },
    { id: 'prototype', label: '06. Prototype' },
    { id: 'visual-design', label: '07. Visual Design' },
    { id: 'testing', label: '08. Testing' },
    { id: 'reflection', label: '09. Reflection' },
  ];

  return (
    <CaseStudyLayout
      tags={['UX RESEARCH', 'UI DESIGN', 'CAREER PLATFORM', 'FIGMA']}
      headline="Designing Shift — A Career Transition Platform"
      metadata={
        <MetadataBar
          role="UI/UX Designer (100%)"
          team="Solo Project"
          timeline="2025"
          skills="UX Research, Interaction Design, Visual Design, Prototyping"
        />
      }
      heroImageColor="#4060ff"
      heroImageCaption="SHIFT DASHBOARD MOCKUP"
      heroImageSrc="/case-studies/shift-hero.png"
      tocSections={tocSections}
    >
      <SectionBlock id="context" label="CONTEXT" heading="Helping professionals navigate career change with clarity.">
        <p>Career transitions are complex and unstructured. Most professionals juggle 5+ platforms — job boards, resume tools, interview prep apps — with no single guide helping them understand where they are, what they're missing, and what to do next. Shift was designed to solve that.</p>
      </SectionBlock>

      <SectionBlock id="problem" label="THE PROBLEM" heading="Career switchers are lost between too many tools.">
        <p>Users struggle to understand how their existing skills translate to new roles. Job search, resume building, and interview preparation are scattered across different platforms. This creates confusion, decision fatigue, and a lack of confidence throughout the journey.</p>

        <div className="grid grid-cols-2 gap-4 my-8">
          {['Skill translation confusion', 'Fragmented platforms', 'Resume not tailored for transitions', 'No structured guidance'].map((pain, i) => (
            <div key={i} className="bg-bg-secondary p-6 rounded-2xl flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-accent-red/10 text-accent-red flex items-center justify-center font-bold">!</div>
              <span className="font-body text-sm font-bold">{pain}</span>
            </div>
          ))}
        </div>

        <CalloutBlock>
          Career transition is not a single action — it's a journey. Users need guidance, not just tools.
        </CalloutBlock>
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="research" label="RESEARCH" heading="Understanding the real friction points.">
        <p>Conducted both primary and secondary research to understand existing behaviors and pain points.</p>

        <h4 className="font-mono text-sm tracking-widest uppercase mt-12 mb-6">Secondary Research Insights</h4>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {['Most platforms only solve one part of the journey', 'Constant context switching leads to cognitive overload', 'Resume tools prioritize format over career narrative', 'Users are left guessing their next step'].map((insight, i) => (
            <div key={i} className="border border-text-primary/10 p-6 rounded-2xl">
              <span className="font-body text-sm text-text-primary/80">{insight}</span>
            </div>
          ))}
        </div>

        <StatRow stats={[
          { number: "5+", label: "Platforms used per journey" },
          { number: "0", label: "Clear step-by-step paths found" },
          { number: "4", label: "Core pain points consistently reported" }
        ]} />

        <div className="bg-bg-secondary p-8 rounded-2xl mt-12">
          <h4 className="font-mono text-sm tracking-widest uppercase mb-4">Competitor Analysis</h4>
          <p className="font-body text-sm text-text-primary/70">Analyzed LinkedIn, Indeed, Canva Resume, Resume.io. <strong>Gap identified:</strong> none offered a guided end-to-end transition experience.</p>
        </div>
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="define" label="DEFINE" heading="Framing the problem with a user-centric lens.">
        <CalloutBlock>
          Career switchers lack a structured and guided approach to navigate the transition process. Existing solutions are fragmented, making it difficult for users to understand their path, position themselves effectively, and confidently apply for relevant roles.
        </CalloutBlock>

        <PersonaCard
          name="Surya — The Aspiring UX Designer"
          quote="I don't mind starting fresh, but I don't want to start from zero again."
          background="Software engineer transitioning into UX design. Strong technical skills but struggles to position himself for UX roles."
          goals="Translate technical skills to UX terminology, build portfolio, land Junior UX role."
          painPoints="Difficulty articulating transferable skills, imposter syndrome, lack of clear career path mapping."
          needs={['Skill Gap Analysis', 'Tailored Roadmap', 'Portfolio Review']}
        />

        <h4 className="font-mono text-sm tracking-widest uppercase mt-16 mb-6">Key Insights</h4>
        <ol className="list-decimal pl-6 space-y-4 font-body text-text-primary/80">
          <li>Career transition is a journey, not a single step.</li>
          <li>Users need guidance, not just tools.</li>
          <li>Fragmentation leads to confusion and drop-offs.</li>
          <li>Confidence plays a key role in decision-making.</li>
          <li>Personalized experiences improve trust and engagement.</li>
        </ol>
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="ideate" label="IDEATE" heading="Translating insights into structured solutions.">
        <ImagePlaceholder color="#4060ff" caption="USER JOURNEY MAP" src="/case-studies/shift-user-journey.png" />

        <h4 className="font-mono text-sm tracking-widest uppercase mt-12 mb-6">Key Product Directions</h4>
        <div className="flex flex-wrap gap-3">
          {['Guided Career Path', 'Skill Gap Intelligence', 'Smart Resume Builder', 'Application Tracker', 'Interview Preparation'].map((dir, i) => (
            <TagChip key={i}>{dir}</TagChip>
          ))}
        </div>
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="prototype" label="PROTOTYPE" heading="From sketches to screens.">
        <ul className="space-y-4 list-disc pl-6">
          <li><strong>Paper Sketches:</strong> quick explorations of layout and flows</li>
          <li><strong>Low-Fidelity Wireframes:</strong> structure and hierarchy, reducing friction</li>
          <li><strong>High-Fidelity Designs:</strong> clean minimal visual system, reduced cognitive load</li>
        </ul>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <ImagePlaceholder color="#4060ff" caption="SKETCHES" aspectRatio="aspect-square" src="/case-studies/shift-sketchs.png" />
          <ImagePlaceholder color="#4060ff" caption="WIREFRAMES" aspectRatio="aspect-square" src="/case-studies/shift-low-fi.png" />
          <ImagePlaceholder color="#4060ff" caption="HI-FI" aspectRatio="aspect-square" src="/case-studies/shift-hi-fi.png" />
        </div>
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="visual-design" label="VISUAL DESIGN" heading="A system built for clarity and calm.">
        <p>Soft color gradients, rounded cards, and clear visual hierarchy create a calm experience that allows users to focus on career progress without feeling overwhelmed.</p>
        <ImagePlaceholder color="#4060ff" caption="DESIGN SYSTEM / UI KIT" src="/case-studies/shift-ui.png" />
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="testing" label="TESTING" heading="Validating with real users.">
        <StatRow stats={[
          { number: "6", label: "Participants" },
          { number: "8", label: "Tasks Assigned" },
          { number: "100%", label: "Success Rate" }
        ]} />
        <CalloutBlock>
          "The app felt intuitive and polished. Very clear roadmap for career shifting." — User Quote
        </CalloutBlock>
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="reflection" label="REFLECTION" heading="What I'd do differently.">
        <p>This project taught me that career transition tools need to prioritize emotional confidence as much as functional utility. The biggest lesson — fragmentation isn't just a UX problem, it's an emotional one. Users don't just need tools consolidated; they need to feel guided.</p>
      </SectionBlock>

      <NextProjectFooter 
        link="/work/knot" 
        title="Knot" 
        behanceLink="https://www.behance.net/gallery/245704505/Shift-A-Career-Transition-Platform-UX-Case-Study" 
      />
    </CaseStudyLayout>
  );
};
