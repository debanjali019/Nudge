import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Skiper16Stack } from './ui/skiper-ui/skiper16';

export function HowItWorks() {
  const steps = [
    { 
      id: '01', 
      title: 'Pick a category', 
      desc: 'Fashion, electronics, beauty, home or fitness.', 
      color: 'var(--card-bg)', 
      text: 'var(--text-primary)' 
    },
    { 
      id: '02', 
      title: 'Pick a product', 
      desc: 'Face wash, earbuds, jeans, whey protein and more.', 
      color: 'var(--bg-color)', 
      text: 'var(--text-primary)' 
    },
    { 
      id: '03', 
      title: 'Get your top 3', 
      desc: 'Three picks, ranked, with a reason for each.', 
      color: 'var(--accent-blue)', 
      text: 'white' 
    },
  ];

  const cards = steps.map((step, idx) => (
    <div 
      key={idx}
      className="flat-card grid grid-cols-1 md:grid-cols-2 w-full max-w-[1000px] gap-16 items-center p-12 md:p-20 shadow-[0_24px_60px_rgba(0,0,0,0.08)]"
      style={{ background: step.color, color: step.text, border: '1px solid var(--border-color)' }}
    >
      <div>
        <div className="text-[6rem] md:text-[8rem] font-bold opacity-10 leading-[0.8] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          {step.id}
        </div>
        <h3 className="heading-lg mb-4" style={{ color: step.text }}>{step.title}</h3>
        <p className="text-[1.25rem] opacity-80" style={{ fontFamily: 'var(--font-text)', color: step.text }}>{step.desc}</p>
      </div>
      <div 
        className="h-[300px] md:h-full rounded-2xl flex items-center justify-center relative overflow-hidden"
        style={{ background: idx === 2 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)' }}
      >
        {idx === 0 && <div className="absolute top-6 left-[20%] w-[60%] h-2 rounded opacity-20" style={{ background: 'var(--text-primary)' }} />}
        {idx === 1 && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full opacity-20" style={{ background: 'var(--text-primary)' }} />}
        {idx === 2 && <div className="absolute bottom-6 left-[10%] w-[80%] h-[40%] rounded-lg bg-white/20" />}
      </div>
    </div>
  ));

  return (
    <section id="the-solution" className="relative" style={{ background: 'var(--bg-color-light)' }}>
      
      {/* Introduction text */}
      <div className="container pt-[140px] pb-5">
        <h2 className="heading-lg">Three steps. Under two minutes.</h2>
        <p className="subtitle" style={{ color: 'var(--text-primary)' }}>Nudge does not add another place to browse. It removes the browsing entirely and replaces it with a decision.</p>
      </div>

      {/* Skiper16 Smooth Card Stack */}
      <Skiper16Stack cards={cards} />

      {/* Product Flow Visual */}
      <div className="container pb-[140px] relative z-10" style={{ backgroundColor: 'var(--bg-color-light)' }}>
        <div
          className="flat-card px-10 py-16 flex items-center justify-between flex-wrap gap-8"
          style={{ background: 'var(--bg-color)' }}
        >
          <div className="flex-[1_1_300px]">
            <h3 className="text-[2.5rem] font-normal mb-4 leading-[1.1]" style={{ fontFamily: 'var(--font-display)' }}>Every result ends in an action, not another list.</h3>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Nudge integrates directly into your purchasing workflow. Found the perfect item? Save it to your shelf, share it with your huddle, or buy it immediately.</p>
          </div>
          
          <div className="flex-[1_1_400px] flex gap-4 items-center justify-center">
            <div className="py-4 px-6 bg-white rounded-full border border-[var(--border-color)] font-medium text-[0.9rem]">Save it</div>
            <ArrowRight size={20} style={{ color: 'var(--text-secondary)' }} />
            <div className="py-4 px-6 bg-white rounded-full border border-[var(--border-color)] font-medium text-[0.9rem]">Share it</div>
            <ArrowRight size={20} style={{ color: 'var(--text-secondary)' }} />
            <div className="py-4 px-6 rounded-full font-semibold text-[0.9rem] text-white" style={{ background: 'var(--accent-orange)' }}>Shop it</div>
          </div>
        </div>
      </div>

    </section>
  );
}
