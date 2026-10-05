import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';

export function Explainer() {
  return (
    <section id="the-problem" className="section relative">
      <div className="container">
        
        <div className="mb-16">
          <h2 className="heading-lg">What is Nudge?</h2>
          <p className="subtitle" style={{ color: 'var(--text-primary)' }}>One clear explanation of the product.</p>
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

        {/* Value Proposition Box */}
        <div 
          className="flat-card text-center p-16 text-white !border-none"
          style={{ background: 'var(--accent-blue)' }}
        >
          <h3 className="text-[3rem] font-normal mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Six reasons buying anything feels like work
          </h3>
          <p className="text-[1.25rem] opacity-90 mb-12" style={{ fontFamily: 'var(--font-text)' }}>
            The problem is not finding products. It is choosing one.
          </p>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 text-left">
            {[
              { id: '01', title: 'Endless Tabs', desc: 'Losing track of options across 20 open browser tabs.' },
              { id: '02', title: 'Sponsored Junk', desc: 'Sifting through ads disguised as genuine recommendations.' },
              { id: '03', title: 'Fake Reviews', desc: 'Trying to figure out which Amazon reviews are actually real.' },
              { id: '04', title: 'SEO Spam', desc: 'Reading 5000-word blog posts just to find one product name.' },
              { id: '05', title: 'Option Paralysis', desc: 'Freezing when faced with 100 identical-looking variations.' },
              { id: '06', title: 'Buyer\'s Remorse', desc: 'Second-guessing your choice immediately after checkout.' }
            ].map((reason) => (
              <div key={reason.id} className="bg-white/10 p-6 rounded-xl border border-white/20">
                <div className="text-[var(--accent-orange)] font-bold mb-2" style={{ fontFamily: 'var(--font-text)' }}>{reason.id}</div>
                <h4 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>{reason.title}</h4>
                <p className="text-white/70 text-[0.95rem]">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
