import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function BrandClosing() {
  const scrollToShop = () => {
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-32 sm:py-44 bg-[#050608] border-t border-white/[0.06] relative overflow-hidden text-center">
      
      {/* Cinematic Ambient Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 space-y-8">
        
        <div className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 font-bold">
          KAFF'S ⚡ ENERGY
        </div>

        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-heading tracking-tight text-white uppercase leading-[0.95]">
          STAY SHARP. <br />
          <span className="text-gradient-silver">STAY MOVING.</span>
        </h2>

        <div className="pt-4">
          <button
            onClick={scrollToShop}
            className="px-10 py-5 rounded-full bg-white text-black font-mono font-bold text-xs tracking-[0.2em] uppercase hover:bg-cyan-300 transition-all duration-300 inline-flex items-center gap-2 shadow-2xl hover:scale-105 cursor-pointer"
          >
            <span>SHOP NOW</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
