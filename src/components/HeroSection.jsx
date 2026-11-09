import React from 'react';
import { ArrowRight, Play } from './Icons';

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-[100svh] flex flex-col justify-between pt-28 sm:pt-36 pb-8 sm:pb-12 px-4 sm:px-8 bg-[#060709] overflow-hidden">
      
      {/* Background Cinematic Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="/brand/kaffs-hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 filter contrast-115 brightness-90 scale-105"
        />
        {/* Natural Vignette & Soft Gradient Transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/55 to-[#060709]/75" />
        <div className="absolute inset-0 bg-radial-[circle_at_center_rgba(0,0,0,0)_0%,rgba(6,7,9,0.9)_85%]" />
      </div>

      {/* Top Editorial Eyebrow */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-1 sm:pt-4 text-center sm:text-left flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/25 backdrop-blur-md text-xs font-sans font-semibold text-orange-300">
          <span>🪔</span>
          <span>After Diwali Sale — Flat 21% OFF</span>
        </div>
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-xs font-sans font-medium text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span>Free Delivery on All Orders</span>
        </div>
      </div>

      {/* Main Dramatic Headline */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-8 sm:py-12 text-center sm:text-left">
        <div className="space-y-6 sm:space-y-7 max-w-3xl">
          
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight text-white uppercase leading-[0.96]">
            POCKET ENERGY. <br />
            <span className="text-gradient-white">ZERO BOTTLE.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-normal max-w-xl leading-relaxed mx-auto sm:mx-0">
            Flavored caffeine micro-strips that dissolve on your tongue in 3 seconds. 40mg of fast, clean alertness without liquid bloat, sugar, or jitters.
          </p>

          {/* Clean 4-Pillar Spec Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-xl pt-1">
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm text-left">
              <div className="text-lg sm:text-xl font-bold font-heading text-white">40mg</div>
              <div className="text-[11px] text-slate-400 font-medium">Pure Caffeine</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm text-left">
              <div className="text-lg sm:text-xl font-bold font-heading text-white">0g Sugar</div>
              <div className="text-[11px] text-slate-400 font-medium">Zero Calorie Crash</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm text-left">
              <div className="text-lg sm:text-xl font-bold font-heading text-white">3 Sec</div>
              <div className="text-[11px] text-slate-400 font-medium">Melts On Tongue</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm text-left">
              <div className="text-lg sm:text-xl font-bold font-heading text-white">FSSAI</div>
              <div className="text-[11px] text-slate-400 font-medium">Quality Certified</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => scrollTo('shop')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-sans font-bold text-xs tracking-wider uppercase hover:bg-slate-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl active:scale-[0.98] cursor-pointer touch-manipulation"
            >
              <span>ORDER NOW — FROM ₹181</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => scrollTo('film')}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 text-white font-sans font-semibold text-xs tracking-wider uppercase hover:bg-white/[0.12] hover:border-white/30 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] touch-manipulation"
            >
              <Play className="w-3.5 h-3.5 fill-current text-white" />
              <span>WATCH BRAND FILM</span>
            </button>
          </div>

          {/* Trust Banner */}
          <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-xs text-slate-400">
            <span className="text-orange-300 font-semibold">🪔 21% OFF — After Diwali Sale</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">✓ Free Delivery</span>
            <span>•</span>
            <span>Ships in 2–3 weeks</span>
          </div>

        </div>
      </div>

      {/* Bottom Pack Pricing Strip */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-4 sm:pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs tracking-wide uppercase text-slate-400 text-center sm:text-left">
        <div className="flex items-center gap-4 sm:gap-6 font-semibold">
          <span className="text-white">Pack of 5 — <span className="line-through text-slate-500">₹229</span> ₹181</span>
          <span className="text-slate-600">/</span>
          <span className="text-white">Pack of 10 — <span className="line-through text-slate-500">₹399</span> ₹315 <span className="text-cyan-400 font-normal">(Best Value)</span></span>
        </div>

        <div className="text-[11px] text-slate-400 font-medium">
          ❄️ Cool Mint & ☕ Coffee Clash • 100% Plant-Based & Sugar-Free
        </div>
      </div>

    </section>
  );
}
