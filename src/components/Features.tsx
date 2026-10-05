import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Sparkles, Layers, ListChecks } from 'lucide-react';

export function Features() {
  const features = [
    {
      id: '01',
      title: 'SHELF',
      desc: 'Saved products / personal collection',
      icon: <Bookmark size={24} color="var(--accent-orange)" />,
      delay: 0.1,
      colSpan: 'col-span-12 md:col-span-7'
    },
    {
      id: '02',
      title: 'HUDDLE',
      desc: 'Huddle feature interaction',
      icon: <Layers size={24} color="var(--accent-orange)" />,
      delay: 0.2,
      colSpan: 'col-span-12 md:col-span-5'
    },
    {
      id: '03',
      title: 'NUDGE AI',
      desc: 'AI-powered recommendations',
      icon: <Sparkles size={24} color="var(--accent-orange)" />,
      delay: 0.3,
      colSpan: 'col-span-12 md:col-span-4'
    },
    {
      id: '04',
      title: 'SWIPE + QUESTIONS',
      desc: 'Answer → swipe → product',
      icon: <ListChecks size={24} color="var(--accent-orange)" />,
      delay: 0.4,
      colSpan: 'col-span-12 md:col-span-8'
    }
  ];

  return (
    <section id="the-features" className="section">
      <div className="container">
        
        <div className="mb-16">
          <h2 className="heading-lg">Four features. One decision.</h2>
          <p className="subtitle" style={{ color: 'var(--text-primary)' }}>Everything Nudge does sits behind three ideas, working across five product categories.</p>
        </div>

        <div className="grid grid-cols-12 gap-8 mb-16">
          {features.map((feat, idx) => (
            <div
              key={feat.id}
              className={`flat-card ${feat.colSpan} min-h-[400px] flex flex-col`}
            >
              <div className="flex-1 flex items-center justify-center">
                <div 
                  className="w-full h-[240px] rounded-xl flex items-center justify-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden relative"
                  style={{ background: idx % 2 === 0 ? 'var(--bg-color)' : 'var(--border-color)' }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                  >
                    {feat.icon}
                  </motion.div>
                </div>
              </div>
              
              <div className="text-left mt-8">
                <h3 className="text-[2rem] font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  <span className="text-[var(--text-secondary)] mr-4 opacity-50">{feat.id}</span>
                  {feat.title}
                </h3>
                <p className="text-[var(--text-secondary)]">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
