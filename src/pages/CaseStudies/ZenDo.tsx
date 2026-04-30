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
  BeforeAfterBlock
} from '../../components/CaseStudy/UIComponents';

export const ZenDoCaseStudy = () => {
  const tocSections = [
    { id: 'context', label: '01. Context' },
    { id: 'problem', label: '02. The Problem' },
    { id: 'research', label: '03. Research' },
    { id: 'define', label: '04. Define' },
    { id: 'ideate', label: '05. Ideate' },
    { id: 'prototype', label: '06. Prototype' },
    { id: 'visual-design', label: '07. Visual Design' },
    { id: 'testing', label: '08. Testing' },
    { id: 'iterations', label: '09. Iterations' },
    { id: 'reflection', label: '10. Reflection' },
  ];

  return (
    <CaseStudyLayout
      tags={['UX RESEARCH', 'UI DESIGN', 'PRODUCTIVITY', 'MOBILE APP', 'FIGMA']}
      headline="Designing Zen Do — A Mindful Productivity App"
      metadata={
        <MetadataBar
          role="UI/UX Designer (100%)"
          team="Solo Project"
          timeline="2025"
          skills="UX Research, Interaction Design, Motion Design, Usability Testing"
        />
      }
      heroImageColor="#4ade80"
      heroImageCaption="ZEN DO APP MOCKUP"
      heroImageSrc="/case-studies/zendo-hero.png"
      tocSections={tocSections}
    >
      <SectionBlock id="context" label="CONTEXT" heading="Designing a calmer way to stay productive.">
        <p>In today's fast-paced world, staying focused has become increasingly difficult. Constant notifications, multitasking, and overwhelming workloads lead to distraction, inconsistency, and burnout. While many productivity tools aim to help users get more done, they often overlook the user's mental well-being. Zen Do was designed to create a balanced productivity experience through focus, recovery, and reflection.</p>
        <CalloutBlock>
          Productivity isn't just about doing more. It's about doing it sustainably.
        </CalloutBlock>
      </SectionBlock>

      <SectionBlock id="problem" label="THE PROBLEM" heading="Staying productive shouldn't feel overwhelming.">
        <div className="grid grid-cols-2 gap-4 my-8">
          {[
            'Too many tasks, no clear focus',
            'Constant distractions break concentration',
            'No structured system for deep work',
            'Lack of balance between work and rest'
          ].map((item, i) => (
            <div key={i} className="bg-bg-secondary p-6 rounded-2xl">
              <p className="font-body text-sm font-bold">{item}</p>
            </div>
          ))}
        </div>
        <CalloutBlock>
          Productivity without balance leads to burnout.
        </CalloutBlock>
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="research" label="RESEARCH" heading="Understanding users through research.">
        <p>Both qualitative and quantitative research methods were used to understand user behavior, challenges, and gaps in existing solutions.</p>

        <StatRow stats={[
          { number: "78%", label: "Difficulty staying focused" },
          { number: "92%", label: "Report weekly digital fatigue" },
          { number: "64%", label: "Abandon apps within 14 days" },
          { number: "41%", label: "Tasks moved to next day" }
        ]} />

        <h4 className="font-mono text-sm tracking-widest uppercase mt-12 mb-6">Voice of the User</h4>
        <div className="space-y-4">
          {[
            "It just feels like another job. I want something that helps me breathe.",
            "I love the focus timers, but I always forget to take a break.",
            "The streaks are stressful. If I miss one day, I lose everything.",
            "I need an app that understands I'm human, not a task-processing machine.",
            "Everything is so cluttered. My brain hurts just looking at the dashboard."
          ].map((quote, i) => (
            <div key={i} className="border-l-2 border-accent-red pl-6 py-2 font-display italic text-lg text-text-primary/80">
              "{quote}"
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="define" label="DEFINE" heading="Defining the problem with clarity.">
        <CalloutBlock>
          Users struggle to maintain consistent focus due to distractions, lack of structured workflows, and absence of balance between work and rest. Existing tools either overwhelm users with tasks or provide rigid systems that fail to adapt to individual needs.
        </CalloutBlock>

        <PersonaCard
          name="Deepak — Overwhelmed Student"
          quote="I just need something that helps me stay focused and not fall behind."
          background="Student balancing internship with MBA."
          goals="Stay consistent, minimize context switching."
          painPoints="Information overload, difficulty tracking non-academic goals, lack of mindful breaks."
          needs={['Structured Focus', 'Mindful Breaks', 'Simple Interface']}
        />

        <PersonaCard
          name="Avantika — Inconsistent Planner"
          quote="I plan a lot… but I don't always follow through."
          background="Professional struggling to maintain a routine."
          goals="Improve follow-through rate, reduce screen time distractions."
          painPoints="Over-planning leads to burnout, notifications break focus, rigid tools feel suffocating."
          needs={['Flexible Planning', 'Gentle Nudges', 'Distraction Free Mode']}
        />
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="ideate" label="IDEATE" heading="Transforming insights into structured solutions.">
        <ImagePlaceholder color="#4ade80" caption="USER JOURNEY MAP" src="/public/case-studies/zendo-user-journey.png" />
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="prototype" label="PROTOTYPE" heading="From structure to screens.">
        <p>Low-fidelity wireframes were created to explore layout, structure, and user flows before moving into visual design.</p>
        <ImagePlaceholder color="#4ade80" caption="WIREFRAME GRID" src="/public/case-studies/zendo-wireframes.png" />
        <CalloutBlock>
          Iterating at low fidelity allowed us to discard heavy UI patterns and focus entirely on the spatial relationship between a user's task and their focus.
        </CalloutBlock>
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="visual-design" label="VISUAL DESIGN" heading="Designing for calm, clarity, and focus.">
        <p>The visual system is designed to reduce cognitive load, promote calmness, and support deep focus through minimal and intentional design choices.</p>
        <ImagePlaceholder color="#4ade80" caption="UI DESIGN SYSTEM" src="/public/case-studies/zendo-ui.png" />
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="testing" label="TESTING" heading="Measuring clarity, speed, and friction.">
        <StatRow stats={[
          { number: "5", label: "Users Tested" },
          { number: "6", label: "Tasks" },
          { number: "100%", label: "Success Rate" },
          { number: "0%", label: "Drop-off" }
        ]} />
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="iterations" label="ITERATIONS" heading="From friction to flow.">
        <BeforeAfterBlock
          beforeTitle="BEFORE: Complex Ambient Sound Selection"
          beforeContent="Users had to select ambient sounds from the main screen then confirm again separately. This caused a double interaction and cognitive interruption."
          afterTitle="AFTER: Single Immersive Bottom Sheet"
          afterContent="Redesigned into a single immersive bottom sheet with direct control and real-time feedback."
          improvements="One-tap interaction, integrated playback controls, reduced cognitive load."
        />

        <BeforeAfterBlock
          beforeTitle="BEFORE: No Post-Task Feedback"
          beforeContent="After marking a task done, users returned to the task list without confirmation. There was no sense of accomplishment."
          afterTitle="AFTER: Completion Reward Screen"
          afterContent="Completion screen with actual time tracking, streaks, and progress indicators."
          improvements="Clear completion confirmation, gamification, strong emotional reward."
        />

        <BeforeAfterBlock
          beforeTitle="BEFORE: Abrupt Task-to-Focus Transition"
          beforeContent="After creating a task, users were directly redirected without acknowledgment or next step guidance."
          afterTitle="AFTER: Confirmation & Recommendations"
          afterContent="Confirmation screen added with clear next actions and contextual recommendations."
          improvements="Immediate feedback, suggested next step, smooth transition into focus mode."
        />
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="reflection" label="REFLECTION" heading="Designing beyond productivity.">
        <p>Zen Do evolved from a simple task manager into a sanctuary for focus. By stripping away the noise of traditional productivity apps, we discovered that the most powerful tool for achievement is mental clarity.</p>
        <h4 className="font-mono text-sm tracking-widest uppercase mt-12 mb-6">What I Learned</h4>
        <ol className="list-decimal pl-6 space-y-4 font-body text-text-primary/80">
          <li>Minimalism isn't just about removing elements — it's about prioritizing the right ones to reduce cognitive load.</li>
          <li>Tonal hierarchy is more effective than structural borders for creating digital calm.</li>
          <li>Asymmetry in layout can guide the eye more naturally than a rigid grid.</li>
          <li>Interaction feedback should be felt (weight shifts) not just seen (bright flashes).</li>
          <li>Mindfulness in UX requires intentional pauses — spacing is as important as the buttons themselves.</li>
        </ol>

        <div className="mt-16 border-t border-text-primary/10 pt-16">
          <p className="font-display italic text-3xl lg:text-5xl leading-tight text-center max-w-4xl mx-auto">
            "We don't need more time; we need more space to be present in the time we already have."
          </p>
        </div>
      </SectionBlock>

      <NextProjectFooter 
        link="/" 
        title="Back to Home" 
        behanceLink="https://www.behance.net/gallery/246285297/Zen-do-A-Mindful-Productivity-App-UIUX-Case-Study" 
      />
    </CaseStudyLayout>
  );
};
