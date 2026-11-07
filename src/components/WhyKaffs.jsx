import React from 'react';

export default function WhyKaffs() {
  const benefits = [
    {
      num: '01',
      title: 'FAST ABSORPTION',
      spec: 'Sublingual Mucosa Delivery',
      detail: 'Absorbs through your oral mucosa in 3 to 5 minutes. No waiting for stomach digestion or delayed liquid breakdown.',
    },
    {
      num: '02',
      title: 'CLEAN FOCUS',
      spec: 'Zero Sugar • Zero Crash',
      detail: 'Formulated for high-focus moments: deep work, late study, gym sessions, and driving. Smooth alertness without the jitters.',
    },
    {
      num: '03',
      title: 'ALWAYS ON HAND',
      spec: 'Pocket & Wallet Sized',
      detail: 'Ultra-thin, flat, and leak-proof. Fits in your wallet, jeans pocket, or laptop sleeve without taking up space.',
    },
  ];

  return (
    <section id="why-kaffs" className="py-24 sm:py-36 bg-[#060709] border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="mb-14 sm:mb-20 space-y-3">
          <div className="text-xs font-sans tracking-[0.2em] text-cyan-400 font-bold uppercase">
            PERFORMANCE & PURITY
          </div>
          <h2 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-white uppercase">
            WHY KAFF'S.
          </h2>
        </div>

        {/* 3 Benefits in Large Cinematic Editorial Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {benefits.map((b) => (
            <div
              key={b.num}
              className="space-y-4 pt-6 border-t border-white/[0.12] hover:border-cyan-400/50 transition-colors duration-500 group"
            >
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-slate-500 group-hover:text-cyan-400 transition-colors">
                {b.num}
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white uppercase">
                {b.title}
              </h3>

              <div className="text-xs font-sans tracking-wide text-cyan-400 font-bold uppercase">
                {b.spec}
              </div>

              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                {b.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
