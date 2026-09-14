import React from 'react';
import { Terminal, Cpu, Rocket, Globe, Sparkles, Check } from 'lucide-react';

export default function FounderStory() {
  return (
    <section id="founder" className="py-24 bg-[#030508] relative overflow-hidden border-t border-cyan-500/15">
      
      {/* Ambient Radial Backing */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Energetic Founder Profile Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="frost-card rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-cyan-400 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/15 rounded-bl-full blur-2xl pointer-events-none" />
              
              {/* Founder Avatar / Profile Emblem */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-400 to-sky-400 p-1 shadow-xl shadow-cyan-500/40">
                    <div className="w-full h-full bg-[#030508] rounded-xl flex items-center justify-center font-black font-heading text-2xl text-white">
                      KT
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-cyan-400 text-black text-[9px] font-black font-mono px-1.5 py-0.5 rounded shadow">
                    FOUNDER
                  </span>
                </div>

                <div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    <Terminal className="w-3 h-3" /> Solo Founder & Builder
                  </div>
                  <h3 className="text-2xl font-black font-heading text-white">
                    Krish Tyagi
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Founder of KAFF'S Energy
                  </p>
                </div>
              </div>

              {/* Founder Highlights */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Tech Background:
                  </span>
                  <span className="font-bold text-white">Magic Ecosystem (13+ AI Products)</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Rocket className="w-3.5 h-3.5 text-cyan-400" /> Execution:
                  </span>
                  <span className="font-bold text-cyan-300">100% Bootstrapped & Self-Driven</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" /> Mission:
                  </span>
                  <span className="font-bold text-white">India's First Caffeine Strip</span>
                </div>
              </div>

              {/* Direct Founder Quote */}
              <blockquote className="text-xs text-slate-300 italic leading-relaxed pt-4 border-t border-slate-800">
                "Building high-impact technology requires non-stop focus. I created KAFF'S energy so anyone grinding for their goals gets instant alertness in 5 minutes without liquid bloat or coffee breaks."
              </blockquote>

            </div>
          </div>

          {/* Right Column: Authentic Story & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full frost-pill border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Energetic Founder Story
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight leading-tight">
              COMBINING TECH DISCIPLINE WITH PHYSICAL NUTRACEUTICAL INNOVATION
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              KAFF'S energy was born out of real late-night necessity—building fast-absorbing oral caffeine strips for people who move fast and don't slow down for coffee breaks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-cyan-400 font-mono font-bold text-xs">01. ZERO VC FLUFF</div>
                <h4 className="text-base font-bold text-white">Bootstrapped Hustle</h4>
                <p className="text-xs text-slate-400">
                  Sourcing, formulation, packaging design, and tech infrastructure built directly by Krish.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-cyan-400 font-mono font-bold text-xs">02. NUTRACEUTICAL INNOVATION</div>
                <h4 className="text-base font-bold text-white">Sublingual Oral Film</h4>
                <p className="text-xs text-slate-400">
                  Delivering precise 40mg caffeine dosing in Cool Mint that dissolves on your tongue in 3 seconds.
                </p>
              </div>
            </div>

            {/* Connect Badge */}
            <div className="pt-4 flex items-center gap-4">
              <span className="text-xs font-mono text-slate-400">Connect with the founder:</span>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-400">
                  @krishtyagi
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
                  Energetic Founder
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
