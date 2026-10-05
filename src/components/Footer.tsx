import React from 'react';
import { Apple, Play } from 'lucide-react';
import { APP_URL } from '../config';

export function Footer() {
  return (
    <footer className="section !pb-8 text-white" style={{ background: 'var(--charcoal-black)' }}>
      <div className="container">
        
        {/* Top Section */}
        <div className="mb-16">
          <h2 className="text-[2rem] font-bold tracking-tight mb-3" style={{ fontFamily: 'var(--font-display)' }}>nudge</h2>
          <p className="text-[0.95rem] text-white/60">
            Nudge is a knowledgeable friend. Not a corporate assistant, not a search engine and not an influencer.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h4 className="font-bold mb-6 text-[0.9rem] tracking-[0.5px]">PRODUCT</h4>
            <div className="flex flex-col gap-4">
              <a href={`${APP_URL}/login`} className="text-white/60 hover:text-white transition-colors">Try Nudge Web</a>
              <a href="#the-features" className="text-white/60 hover:text-white transition-colors">Features</a>
              <a href="#the-solution" className="text-white/60 hover:text-white transition-colors">How it works</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Get the App</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-[0.9rem] tracking-[0.5px]">RESOURCES</h4>
            <div className="flex flex-col gap-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">Help Center</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Blog</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-[0.9rem] tracking-[0.5px]">COMPANY</h4>
            <div className="flex flex-col gap-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">About</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Careers</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-[0.9rem] tracking-[0.5px]">LEGAL</h4>
            <div className="flex flex-col gap-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Do Not Sell/Share</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 mt-16 gap-8">
          
          {/* App Download Buttons */}
          <div className="flex gap-4">
            <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors px-5 py-2.5 rounded-xl text-white font-medium text-left">
              <Apple size={24} />
              <div>
                <div className="text-[0.6rem] text-white/60 leading-none mb-1 uppercase tracking-wide">Download on the</div>
                <div className="text-[0.95rem] leading-none">App Store</div>
              </div>
            </button>
            <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors px-5 py-2.5 rounded-xl text-white font-medium text-left">
              <Play size={24} />
              <div>
                <div className="text-[0.6rem] text-white/60 leading-none mb-1 uppercase tracking-wide">Get it on</div>
                <div className="text-[0.95rem] leading-none">Google Play</div>
              </div>
            </button>
          </div>

          {/* Copyright */}
          <div className="text-center text-white/60">
            <p className="font-medium text-[0.95rem] text-white mb-1">
              © {new Date().getFullYear()} NUDGE INC.
            </p>
            <p className="text-[0.85rem]">
              All rights reserved.
            </p>
          </div>

          {/* Socials */}
          <div className="flex gap-6 items-center">
            <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
