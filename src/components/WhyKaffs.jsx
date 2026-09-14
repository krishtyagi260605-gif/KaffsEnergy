import React from 'react';

export default function WhyKaffs() {
  const benefits = [
    {
      num: '01',
      title: 'FAST ENERGY',
      spec: '40mg per strip',
      detail: 'Absorbs sublingually on contact — no waiting for stomach digestion.',
    },
    {
      num: '02',
      title: 'SHARPER FOCUS',
      spec: 'Zero crash',
      detail: 'Made for moments you need to stay switched on. Clean alertness without jitters.',
    },
    {
      num: '03',
      title: 'POCKET READY',
      spec: 'Anytime, anywhere',
      detail: 'No bottle, no mixing, no water. Fits flat in your pocket or wallet.',
    },
  ];

  return (
    <section id="why-kaffs" className="py-28 sm:py-36 bg-[#050608] border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="mb-16 sm:mb-20 space-y-3">
          <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 font-bold uppercase">
            PERFORMANCE
          </div>
          <h2 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-white uppercase">
            WHY KAFF'S.
          </h2>
        </div>

        {/* 3 Benefits in Large Cinematic Type — No Icon Grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {benefits.map((b) => (
            <div
              key={b.num}
              className="space-y-4 pt-6 border-t border-white/[0.12] hover:border-cyan-400/50 transition-colors duration-500 group"
            >
              <div className="text-xs font-mono tracking-[0.2em] text-slate-500 group-hover:text-cyan-400 transition-colors">
                {b.num}
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white uppercase">
                {b.title}
              </h3>

              <div className="text-xs font-mono tracking-wider text-cyan-400/80 uppercase font-bold">
                {b.spec}
              </div>

              <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                {b.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
