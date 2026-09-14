import React, { useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-10 sm:pb-12 px-6 sm:px-8 bg-[#050608] overflow-hidden">
      
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

      {/* Top Branding Eyebrow */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-4 sm:pt-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-cyan-400/90 font-bold">
          <span>KAFF'S ⚡ ENERGY</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">CAFFEINE DISSOLVING STRIPS</span>
        </div>
      </div>

      {/* Main Dramatic Billboard Headline */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-12 sm:py-16 text-center sm:text-left">
        <div className="space-y-6 max-w-3xl">
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black font-heading tracking-tight text-white uppercase leading-[0.92]">
            DAILY <br />
            <span className="text-gradient-silver">POWER-UP.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-light max-w-xl leading-relaxed">
            Flavored caffeine strips designed for fast, convenient energy — whenever you need it.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 sm:pt-6">
            <button
              onClick={() => scrollTo('shop')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-mono font-bold text-xs tracking-[0.15em] uppercase hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 shadow-2xl hover:scale-[1.02] cursor-pointer"
            >
              <span>SHOP KAFF'S</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => scrollTo('film')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 text-white font-mono font-bold text-xs tracking-[0.15em] uppercase hover:bg-white/[0.12] hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-cyan-400" />
              <span>WATCH FILM</span>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Quiet Pack Pricing Bar */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono tracking-[0.2em] uppercase text-slate-400 text-center sm:text-left">
        <div className="flex items-center gap-6 sm:gap-8">
          <span className="text-white font-bold">PACK OF 5 — ₹229</span>
          <span className="text-slate-600">/</span>
          <span className="text-cyan-400 font-bold">PACK OF 10 — ₹399</span>
        </div>

        <div className="text-[11px] text-slate-500 hidden sm:block">
          NO WATER • NO DELAY • 40mg PER STRIP
        </div>
      </div>

    </section>
  );
}
