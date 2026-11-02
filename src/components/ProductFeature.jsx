import React from 'react';

export default function ProductFeature() {
  return (
    <section id="product" className="py-28 sm:py-36 bg-[#07090F] border-t border-white/[0.06] relative overflow-hidden">
      
      {/* Subtle Ambient Radial Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Real Approved Product Packaging Visual */}
          <div className="lg:col-span-6 flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center">
              
              {/* Soft Ground Reflection Shadow */}
              <div className="absolute -bottom-8 w-3/4 h-8 bg-black/80 blur-xl rounded-full" />
              
              <img
                src="/brand/kaffs-pack-10.png"
                alt="KAFF'S Energy 40mg Caffeine Strip Pack"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Editorial Product Copy & Minimal Specs */}
          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2 text-center lg:text-left">
            
            <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 font-bold uppercase">
              THE FORMULA
            </div>

            <h2 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-white uppercase leading-[0.98]">
              ENERGY. <br />
              <span className="text-slate-400">WITHOUT THE BOTTLE.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
              A micro-thin caffeine strip that dissolves on your tongue. No drink. No preparation. Just place, dissolve and go.
            </p>

            {/* Quiet Specs Strip */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/[0.08] max-w-md mx-auto lg:mx-0">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black font-heading text-white">40mg</div>
                <div className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">Caffeine / strip</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black font-heading text-white">0g</div>
                <div className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">Sugar</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black font-heading text-white">0</div>
                <div className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">Calories</div>
              </div>
            </div>

            {/* Flavors Mentioned */}
            <div className="pt-2 text-xs font-mono tracking-widest text-cyan-400 uppercase">
              Available in 2 Signature Flavors: ❄️ Cool Mint & ☕ Coffee Clash
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
