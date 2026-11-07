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
              THE FORMULA
            </div>

            <h2 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-white uppercase leading-[0.98]">
              ENERGY. <br />
              <span className="text-slate-400">WITHOUT THE BOTTLE.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-lg mx-auto lg:mx-0">
              A micro-thin caffeine strip that dissolves effortlessly on your tongue. No cans, no water, no sugar spike. Just place, melt, and focus.
            </p>

            {/* Clean Spec Grid */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/[0.08] max-w-md mx-auto lg:mx-0">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black font-heading text-white">40mg</div>
                <div className="text-xs text-slate-400 font-medium">Pure Caffeine</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black font-heading text-white">0g</div>
                <div className="text-xs text-slate-400 font-medium">Sugar Added</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black font-heading text-white">0</div>
                <div className="text-xs text-slate-400 font-medium">Total Calories</div>
              </div>
            </div>

            {/* Flavors Available */}
            <div className="pt-1 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-300 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-400/20 text-cyan-300">
                ❄️ Cool Mint
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/40 border border-amber-400/20 text-amber-300">
                ☕ Coffee Clash
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
