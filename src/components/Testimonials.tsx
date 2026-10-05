import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';
import { APP_URL } from '../config';

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "Nudge found me the exact pair of running shoes I needed in 30 seconds. No endless scrolling, just the perfect pick.",
      name: "Alex P.",
      role: "Marathon Runner",
      delay: 0.1
    },
    {
      id: 2,
      quote: "It's like having a personal shopper who actually listens. The explanations for why it picked an item are spot on.",
      name: "Sarah K.",
      role: "Tech Reviewer",
      delay: 0.2
    },
    {
      id: 3,
      quote: "I used to spend weeks researching laptops. Nudge gave me three perfect options and I bought one the same day.",
      name: "Marcus T.",
      role: "Designer",
      delay: 0.3
    }
  ];

  return (
    <section id="testimonials" className="section">
      <div className="container">
        
        <div className="mb-16">
          <h2 className="heading-lg">What users say</h2>
          <p className="subtitle" style={{ color: 'var(--text-primary)' }}>Real experiences from Nudge users.</p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mb-16">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="flat-card"
            >
              <div 
                className="h-20 w-20 rounded-full mb-6 flex items-center justify-center text-white text-2xl font-semibold shadow-[0_8px_24px_rgba(32,56,226,0.2)]"
                style={{ fontFamily: 'var(--font-display)', background: 'var(--accent-blue)' }}
              >
                {test.name.charAt(0)}
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--accent-orange)" color="var(--accent-orange)" />
                ))}
              </div>
              
              <p className="text-[1.1rem] mb-8 italic" style={{ fontFamily: 'var(--font-editorial)', color: 'var(--text-secondary)' }}>
                "{test.quote}"
              </p>
              
              <div className="border-t border-[var(--border-color)] pt-4">
                <p className="font-semibold text-[0.95rem]">— {test.name}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{test.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Pull Quote Banner */}
        <div
          className="flat-card mb-16 py-20 px-10 flex flex-col items-center justify-center text-center text-white"
          style={{ background: 'var(--text-primary)' }}
        >
          <div className="text-[var(--accent-orange)] mb-6">
            <Star size={32} fill="var(--accent-orange)" />
          </div>
          <h3 
            className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] font-normal max-w-[800px] mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            "The most intuitive shopping experience since the invention of the search bar."
          </h3>
          <p className="text-base tracking-[2px] uppercase text-white/60" style={{ fontFamily: 'var(--font-text)' }}>
            — TechCrunch
          </p>
        </div>

        <div className="flex justify-center">
          <MagneticButton className="btn-primary py-4 px-10 text-[1.1rem]" intensity={0.2} onClick={() => window.location.href = `${APP_URL}/login`}>
            Try Nudge Web <ArrowRight size={20} />
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}
