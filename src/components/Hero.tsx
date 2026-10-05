import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';
import { ScrambleText } from './ui/ScrambleText';
import { APP_URL } from '../config';

export function Hero() {
  const products = [
    { name: 'SHOE', type: 'Fashion', delay: 0, x: -140, y: -120 },
    { name: 'BAG', type: 'Accessories', delay: 1, x: 160, y: -140 },
    { name: 'WATCH', type: 'Electronics', delay: 2, x: 180, y: 40 },
    { name: 'DRESS', type: 'Apparel', delay: 3, x: -160, y: 100 },
    { name: 'TECH', type: 'Gadget', delay: 4, x: 120, y: 160 },
  ];

  return (
    <section className="section min-h-screen flex items-center pt-[120px]">
      <div className="container grid grid-cols-[1.2fr_0.8fr] gap-8 items-center">
        
        {/* Left Column: Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="heading-xl">
            Shopping got easier.<br />
            <span style={{ color: 'var(--text-secondary)' }}>Choosing got harder.</span>
          </h1>
          <p className="subtitle mb-10 font-medium" style={{ color: 'var(--text-primary)' }}>
            <ScrambleText text="Nudge is an AI shopping companion. It replaces hours of comparing and second guessing with three perfect picks, in under two minutes." delay={0.5} />
          </p>
          
          <div className="flex gap-4 mb-8">
            <MagneticButton className="btn-primary" intensity={0.3} onClick={() => window.location.href = `${APP_URL}/login`}>
              Try Nudge Web <ArrowRight size={18} />
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right Column: Motion / Product Spiral */}
        <div className="relative h-[600px] flex items-center justify-center">
          
          {/* Concentric Circles */}
          <div className="absolute w-[280px] h-[280px] border border-[var(--border-color)] rounded-full" />
          <div className="absolute w-[420px] h-[420px] border border-dashed border-[var(--border-color)] rounded-full animate-[spin_40s_linear_infinite]" />

          {/* Center Avatar */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flat-card relative z-10 w-[160px] h-[160px] flex flex-col items-center justify-center rounded-full"
            style={{ background: 'var(--accent-blue)', color: 'white', border: 'none' }}
          >
            <div className="font-bold text-2xl tracking-[-0.02em]" style={{ fontFamily: 'var(--font-display)' }}>nudge</div>
            <div className="text-xs opacity-80 mt-1">companion</div>
          </motion.div>

          {/* Floating Products */}
          {products.map((prod, i) => (
            <motion.div
              key={prod.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
              style={{
                position: 'absolute',
                x: prod.x,
                y: prod.y,
                animation: `float-spiral 6s ease-in-out infinite ${prod.delay}s`
              }}
            >
              <div className="flat-card px-6 py-4 flex flex-col items-center shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <span className="font-bold text-base" style={{ fontFamily: 'var(--font-display)' }}>{prod.name}</span>
                <span className="text-xs uppercase tracking-[0.05em]" style={{ color: 'var(--text-secondary)' }}>{prod.type}</span>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
