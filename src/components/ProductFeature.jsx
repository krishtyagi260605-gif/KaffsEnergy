import React from 'react';

export default function ProductFeature() {
  return (
    <section id="product" className="py-24 sm:py-36 bg-[#07090F] border-t border-white/[0.06] relative overflow-hidden">
      
      {/* Subtle Ambient Radial Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Product Packaging Visual */}
          <div className="lg:col-span-6 flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center">
              
              {/* Soft Ground Reflection Shadow */}
              <div className="absolute -bottom-8 w-3/4 h-8 bg-black/80 blur-xl rounded-full" />
              
              <img
                src="/brand/kaffs-pack-10.png"
                alt="KAFF'S Energy 40mg Caffeine Strip Pack"
                className="w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Editorial Product Copy & Clean Specs */}
          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2 text-center lg:text-left">
            
            <div className="text-xs font-sans tracking-[0.2em] text-cyan-400 font-bold uppercase">
              THE SYNERGISTIC NOOTROPIC FORMULA
            </div>

            <h2 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-white uppercase leading-[0.98]">
              ENERGY. <br />
              <span className="text-slate-400">WITHOUT THE BOTTLE.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-lg mx-auto lg:mx-0">
              A pocket-sized oral caffeine strip engineered with bioactive nootropics. Dissolves on your tongue in 30 seconds for direct mucosal absorption. No cans, no water, no jitters.
            </p>

            {/* Real Packaging Bioactive Nootropics Spec Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/[0.08] max-w-lg mx-auto lg:mx-0">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-0.5">
                <div className="text-xl sm:text-2xl font-black font-heading text-white">40mg</div>
                <div className="text-[11px] text-cyan-400 font-bold uppercase">Caffeine</div>
                <div className="text-[10px] text-slate-500">Pure Alertness</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-0.5">
                <div className="text-xl sm:text-2xl font-black font-heading text-white">10mg</div>
                <div className="text-[11px] text-cyan-400 font-bold uppercase">L-Theanine</div>
                <div className="text-[10px] text-slate-500">Smooth Focus</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-0.5">
                <div className="text-xl sm:text-2xl font-black font-heading text-white">1mg B6</div>
                <div className="text-[11px] text-cyan-400 font-bold uppercase">52.6% RDA</div>
                <div className="text-[10px] text-slate-500">Brain Vitality</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-0.5">
                <div className="text-xl sm:text-2xl font-black font-heading text-white">1mcg B12</div>
                <div className="text-[11px] text-cyan-400 font-bold uppercase">45.5% RDA</div>
                <div className="text-[10px] text-slate-500">Cellular Energy</div>
              </div>
            </div>

            {/* Key Benefits Pillars directly from packaging: Energy, Focus, Mind, Endurance */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-slate-300 font-medium">
              <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white font-mono text-[11px] font-semibold">
                ⚡ ENERGY
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white font-mono text-[11px] font-semibold">
                🎯 FOCUS
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white font-mono text-[11px] font-semibold">
                🧠 MIND
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white font-mono text-[11px] font-semibold">
                🏃 ENDURANCE
              </span>
            </div>

            {/* Flavors Available */}
            <div className="pt-1 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-300 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-400/20 text-cyan-300">
                ❄️ Cool Mint
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/40 border border-amber-400/20 text-amber-300">
                ☕ Coffee Clash
              </span>
              <span className="text-slate-500 text-[11px]">
                GMP Certified • FSSAI Registered
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
