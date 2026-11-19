import React from 'react';
import { ArrowRight } from './Icons';

export default function BrandClosing() {
  const scrollToShop = () => {
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-28 sm:py-40 bg-[#060709] border-t border-white/[0.06] relative overflow-hidden text-center">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 space-y-8">
        
        <div className="text-xs font-sans tracking-[0.25em] uppercase text-cyan-400 font-bold">
          KAFF'S ENERGY • BATCH 001
        </div>

        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-heading tracking-tight text-white uppercase leading-[0.95]">
          STAY SHARP. <br />
          <span className="text-gradient-white">STAY MOVING.</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-md mx-auto font-normal">
          Instant sublingual caffeine in your pocket. No sugar. No water. No crash.
        </p>

        <div className="pt-2">
          <button
            onClick={scrollToShop}
            className="px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-black font-sans font-bold text-xs tracking-wider uppercase hover:bg-slate-200 transition-all duration-200 inline-flex items-center gap-2.5 shadow-2xl active:scale-98 cursor-pointer"
          >
            <span>PRE-ORDER NOW — FROM ₹195</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
