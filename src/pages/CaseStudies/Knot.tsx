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

export const KnotCaseStudy = () => {
  const tocSections = [
    { id: 'context', label: '01. Context' },
    { id: 'problem', label: '02. The Problem' },
    { id: 'research', label: '03. Research' },
    { id: 'define', label: '04. Define' },
    { id: 'ideate', label: '05. Ideate' },
    { id: 'wireframes', label: '06. Wireframes' },
    { id: 'visual-design', label: '07. Visual Design' },
    { id: 'testing', label: '08. Testing' },
    { id: 'reflection', label: '09. Reflection' },
  ];

  return (
    <CaseStudyLayout
      tags={['UX RESEARCH', 'UI DESIGN', 'MOBILE APP', 'FIGMA']}
      headline="Designing Knot — Where Moments Become Memories"
      metadata={
        <MetadataBar
          role="UI/UX Designer (100%)"
          team="Solo Project"
          timeline="2025"
          skills="UX Research, Interaction Design, Visual Design, Usability Testing"
        />
      }
      heroImageColor="#f0c060"
      heroImageCaption="KNOT APP MOCKUP"
      heroImageSrc="/public/case-studies/knot-hero.png"
      tocSections={tocSections}
    >
      <SectionBlock id="context" label="CONTEXT" heading="A private space for families to keep what matters.">
        <p>Meaningful moments are scattered across apps — photos in galleries, conversations in chats, reminders in calendars. Nothing connects them into a single, living memory. Knot was designed to be that space: private, intentional, and built for the people who matter most.</p>
      </SectionBlock>

      <SectionBlock id="problem" label="THE PROBLEM" heading="Memories don't disappear. They just lose their place.">
        <div className="space-y-4 my-8">
          {[
            { title: 'Scattered across platforms', desc: 'Memories live in silos with no unified timeline.' },
            { title: 'Built for sharing, not remembering', desc: 'Platforms optimize for engagement, not preserving meaning over time.' },
            { title: 'No space designed for families', desc: 'No private, structured space for families to capture and revisit shared moments.' }
          ].map((item, i) => (
            <div key={i} className="bg-bg-secondary p-6 rounded-2xl">
              <h5 className="font-bold font-body text-accent-red mb-2">{item.title}</h5>
              <p className="font-body text-sm text-text-primary/70">{item.desc}</p>
            </div>
          ))}
        </div>
        <CalloutBlock>
          So the moments that matter most end up unstructured, unseen, or forgotten.
        </CalloutBlock>
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="research" label="RESEARCH" heading="Understanding how people hold on to what matters.">
        <StatRow stats={[
          { number: "72%", label: "Forget important personal dates" },
          { number: "65%", label: "Rely on WhatsApp for sharing" },
          { number: "58%", label: "Rarely revisit old photos" }
        ]} />
        <h4 className="font-mono text-sm tracking-widest uppercase mt-12 mb-6">Qualitative Insights</h4>
        <ul className="list-disc pl-6 space-y-4 font-body text-text-primary/80">
          <li>People don't struggle to remember dates — they struggle to act on them</li>
          <li>Memories stored across apps but rarely revisited meaningfully</li>
          <li>Important moments get buried in chats and notifications</li>
          <li>Users feel guilty when they forget meaningful events</li>
          <li>Privacy is a strong need</li>
        </ul>
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="define" label="DEFINE" heading="Framing the core challenge.">
        <CalloutBlock>
          People don't forget important moments — they miss them at the wrong time. Existing tools are fragmented, emotionally disconnected, and lack privacy.
        </CalloutBlock>

        <PersonaCard
          name="Sugumar — The Family Anchor"
          quote="Everything is somewhere… but never where I need it."
          background="35 years old. The one who organizes family gatherings and keeps track of everyone's birthdays."
          goals="Centralize records, stay updated."
          painPoints="Scattered info, app fatigue."
          needs={['Private Space', 'Emotional Reminders', 'Structured Environment']}
        />

        <h4 className="font-mono text-sm tracking-widest uppercase mt-12 mb-6">How Might We...</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            'Design a system that feels like a shared home rather than a storage app?',
            'Make digital reminders feel warm and emotionally significant?',
            'Balance high structure with the fluidity of human relationships?',
            'Provide total privacy without creating silos of isolation?'
          ].map((hmw, i) => (
            <div key={i} className="border border-text-primary/10 p-6 rounded-2xl font-body text-sm">
              {hmw}
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="ideate" label="IDEATE" heading="Exploring solutions and shaping the family experience.">
        <ImagePlaceholder color="#f0c060" caption="USER JOURNEY" src="/public/case-studies/knot-user-journey.png" />
        <h4 className="font-mono text-sm tracking-widest uppercase mt-12 mb-6">Strategic Design Decisions</h4>
        <div className="space-y-4">
          {[
            { q: 'Why Timeline?', a: 'Linear narratives help families see their growth over time.' },
            { q: 'Why Smart Prompts?', a: 'Life is busy — nudges without guilt.' },
            { q: 'Why Family Graph?', a: 'Relationships aren\'t flat, they\'re connected.' },
            { q: 'Why Vault?', a: 'Utility breeds retention.' }
          ].map((item, i) => (
            <div key={i} className="bg-bg-secondary p-6 rounded-2xl flex flex-col sm:flex-row gap-4 sm:items-center">
              <div className="font-bold text-accent-red min-w-[150px]">{item.q}</div>
              <div className="font-body text-sm text-text-primary/80">{item.a}</div>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="wireframes" label="WIREFRAMES" heading="Starting with pen, not pixels.">
        <p>Before structure and polish, ideas were explored quickly — focusing on flows, relationships, and how memories should feel.</p>
        <ImagePlaceholder color="#f0c060" caption="WIREFRAME FLOWS" src="/public/case-studies/knot-wireframes.png" />
        <CalloutBlock>
          Clarity over complexity. Every screen had a purpose.
        </CalloutBlock>
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="visual-design" label="VISUAL DESIGN" heading="A system designed to feel calm, personal, and expressive.">
        <p>Soft tones, thoughtful typography, and subtle depth create an experience that feels intimate — not overwhelming.</p>
        <ImagePlaceholder color="#f0c060" caption="UI DESIGN SCREENS" src="/public/case-studies/knot-ui.png" />
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="testing" label="TESTING" heading="Validating with real users.">
        <StatRow stats={[
          { number: "10", label: "Responses" },
          { number: "9", label: "Tasks" },
          { number: "100%", label: "Success Rate" }
        ]} />
        <CalloutBlock>
          Users struggled to find the Family Graph feature — 21.1% misclick rate. Family Graph was nested under Profile, not visible in primary navigation.
        </CalloutBlock>
        <div className="bg-[#e8432d]/5 p-8 rounded-2xl border border-[#e8432d]/20 mt-8">
          <h5 className="font-mono text-xs uppercase tracking-widest text-accent-red mb-2">The Fix</h5>
          <p className="font-body text-sm text-text-primary/80">Added contextual coach marks and onboarding layer highlighting key entry points for first-time users. This improved discoverability, resulted in faster task completion, and reduced misclick behavior.</p>
        </div>
      </SectionBlock>

      <SectionDivider />

      <SectionBlock id="reflection" label="REFLECTION" heading="What this taught me.">
        <p>Knot taught me that emotional design isn't a nice-to-have — it's the entire product. The challenge wasn't building features; it was designing interactions that feel like care, not utility. The Family Graph discoverability issue was a reminder that even great features fail without proper onboarding and navigation clarity.</p>
      </SectionBlock>

      <NextProjectFooter 
        link="/work/zendo" 
        title="Zen Do" 
        behanceLink="https://www.behance.net/gallery/247113621/knot-Where-Moments-Became-Memories-UXUI-Case-study" 
      />
    </CaseStudyLayout>
  );
};
