import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from './ui/MagneticButton';
import { APP_URL } from '../config';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-6 left-0 right-0 mx-auto z-[100] h-[72px] w-[calc(100%-48px)] max-w-[1280px] flex items-center rounded-2xl pr-4 pl-6 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-[16px] border border-black/8 shadow-[0_12px_40px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)]' 
          : 'bg-white border border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span 
            className="text-[1.75rem] font-bold tracking-[-0.02em]"
            style={{ fontFamily: "'Poppins', sans-serif", color: 'var(--text-primary)' }}
          >
            nudge
          </span>
        </div>

        <div className="flex items-center gap-12">
          <div className="flex gap-8 items-center nav-links">
            {['The Problem', 'The Solution', 'The Features'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="no-underline text-[0.9rem] font-semibold transition-colors duration-200 hover:!text-[var(--text-primary)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item}
              </a>
            ))}
          </div>

          <div>
            <MagneticButton className="btn-primary py-3 px-6 text-[0.9rem]" onClick={() => window.location.href = `${APP_URL}/login`}>
              Try Nudge Web
            </MagneticButton>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
