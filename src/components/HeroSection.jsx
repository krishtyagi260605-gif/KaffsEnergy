import React, { useRef } from 'react';
import { ArrowRight, Play } from './Icons';

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-8 bg-[#050608] overflow-hidden">
      
      {/* Background Cinematic Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="/brand/kaffs-hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-45 filter contrast-110 brightness-95 scale-105"
        />
        {/* Soft Vignette & Editorial Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/50 to-[#050608]/70" />
        <div className="absolute inset-0 bg-radial-[circle_at_center_rgba(0,0,0,0)_0%,rgba(5,6,8,0.85)_80%]" />
      </div>

      {/* Top Branding Eyebrow with High-Tech Badge */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-2 sm:pt-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-400/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)] text-[10px] sm:text-[11px] font-mono tracking-widest text-cyan-300 font-bold uppercase">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span>BATCH 001 // EARLY BIRD PRE-ORDER</span>
        </div>
      </div>

      {/* Main Dramatic Billboard Headline */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-8 sm:py-14 text-center sm:text-left">
        <div className="space-y-5 sm:space-y-6 max-w-3xl">
          
          <h1 className="text-[1.95rem] xs:text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-heading tracking-tight text-white uppercase leading-[0.96]">
            DAILY <br />
            <span className="text-gradient-silver inline-block">POWER-UP.</span>
          </h1>

          <p className="text-sm sm:text-xl text-slate-300 font-light max-w-xl leading-relaxed mx-auto sm:mx-0">
            Flavored caffeine dissolving strips engineered for instant energy without water or sugar. Dissolves in seconds.
          </p>

          {/* Futuristic Batch 001 Console */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-[#080B12]/85 backdrop-blur-md border border-cyan-400/30 max-w-lg space-y-2.5 sm:space-y-3 shadow-[0_0_40px_rgba(0,240,255,0.08)] mx-auto sm:mx-0 text-left">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
              <span className="text-cyan-300 font-bold tracking-wider uppercase flex items-center gap-1.5 sm:gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                BATCH 001 ALLOCATION
              </span>
              <span className="text-white font-bold tracking-wider">714 / 1,000 [71%]</span>
            </div>
            
            {/* Glowing Neon Progress Track */}
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-emerald-300 shadow-[0_0_15px_rgba(0,240,255,0.9)] transition-all duration-1000"
                style={{ width: '71.4%' }}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[9.5px] sm:text-[10px] font-mono text-slate-400 pt-0.5">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span>🏷️</span>
                <span>₹40 DELIVERY WAIVED WITH 'FOUNDER001'</span>
              </span>
              <span className="text-cyan-300 font-medium">SHIPS IN 2–3 WEEKS • 2 FLAVORS</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-1">
            <button
              onClick={() => scrollTo('shop')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-cyan-400 text-black font-mono font-black text-xs tracking-[0.14em] uppercase hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,240,255,0.35)] active:scale-[0.98] cursor-pointer touch-manipulation"
            >
              <span>PRE-ORDER BATCH 001 (FROM ₹229)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => scrollTo('film')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 text-white font-mono font-bold text-xs tracking-[0.14em] uppercase hover:bg-white/[0.12] hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] touch-manipulation"
            >
              <Play className="w-3.5 h-3.5 fill-current text-cyan-400" />
              <span>WATCH FILM</span>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Quiet Pack Pricing Bar */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-4 sm:pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-[11px] sm:text-xs font-mono tracking-[0.18em] uppercase text-slate-400 text-center sm:text-left">
        <div className="flex items-center gap-4 sm:gap-8">
          <span className="text-white font-bold">PACK OF 5 — ₹229</span>
          <span className="text-slate-600">/</span>
          <span className="text-cyan-400 font-bold">PACK OF 10 — ₹399</span>
        </div>

        <div className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block">
          ❄️ COOL MINT & ☕ COFFEE CLASH • ₹40 DELIVERY WAIVED VIA 'FOUNDER001' • SHIPS IN 2–3 WEEKS
        </div>
      </div>

    </section>
  );
}
