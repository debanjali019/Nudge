import React from 'react';
import { Play } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';
import Timeline from './ui/timeline';

const REASON_TOP_DATA = [
  {
    id: 'reason-01',
    year: '01',
    month: 'Endless Tabs',
    content: 'Losing track of options across 20 open browser tabs.',
  },
  {
    id: 'reason-02',
    year: '02',
    month: 'Sponsored Junk',
    content: 'Sifting through ads disguised as genuine recommendations.',
  },
  {
    id: 'reason-03',
    year: '03',
    month: 'Fake Reviews',
    content: 'Trying to figure out which Amazon reviews are actually real.',
  },
  {
    id: 'reason-04',
    year: '04',
    month: 'SEO Spam',
    content: 'Reading 5000-word blog posts just to find one product name.',
  },
];

const REASON_BOTTOM_DATA = [
  {
    id: 'reason-05',
    year: '05',
    month: 'Option Paralysis',
    content: 'Freezing when faced with 100 identical-looking variations.',
  },
  {
    id: 'reason-06',
    year: '06',
    month: "Buyer's Remorse",
    content: 'Second-guessing your choice immediately after checkout.',
  },
];

export function Explainer() {
  return (
    <>
      <section id="the-problem" className="section relative !pb-12">
        <div className="container">
          <div className="mb-16">
            <h2 className="heading-lg">What is Nudge?</h2>
            <p className="subtitle" style={{ color: 'var(--text-primary)' }}>
              One clear explanation of the product.
            </p>
          </div>

          {/* Video Area */}
          <div 
            className="flat-card h-[600px] flex items-center justify-center mb-10 relative overflow-hidden !p-0 !border-none"
            style={{ background: 'var(--text-primary)' }}
          >
            <div className="absolute top-6 left-6 text-[0.8rem] text-white/50 tracking-[1px]">
              INTRODUCING NUDGE
            </div>

            <MagneticButton 
              intensity={0.4}
              className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer z-10 !border-none !p-0 !gap-0"
              style={{ background: 'var(--accent-orange)', color: 'white' }}
            >
              <Play fill="white" size={24} className="ml-1" />
            </MagneticButton>

            <div className="absolute bottom-10 text-center w-full text-white/50 tracking-[2px] text-[0.9rem]">
              PLAY FULL DEMO (1:42)
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Pinning Scroll Timeline */}
      <Timeline
        title="Six Reasons Buying Anything Feels Like Work"
        periodLabel="The problem is not finding products. It is choosing one."
        backgroundColor="var(--accent-blue, #2038E2)"
        textColor="#ffffff"
        mutedTextColor="rgba(255, 255, 255, 0.85)"
        activeColor="#FF5A00"
        imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80"
        imageAlt="Multiple tabs open on workspace"
        duration={1.2}
        topData={REASON_TOP_DATA}
        bottomData={REASON_BOTTOM_DATA}
      />
    </>
  );
}
