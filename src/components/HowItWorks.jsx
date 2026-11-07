import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Peel',
      timing: 'Instant',
      description: 'Slide out a single moisture-sealed micro-strip from the pocket pack. Flat as a card, ready anywhere.',
      icon: '📂',
    },
    {
      num: '02',
      title: 'Place',
      timing: '1 Second',
      description: 'Place the strip directly on your tongue. No water, no glass, no shaker bottle needed.',
      icon: '👅',
    },
    {
      num: '03',
      title: 'Dissolve',
      timing: '3 Seconds',
      description: 'The strip instantly dissolves on contact, releasing pure refreshing flavor — Cool Mint or Coffee Clash.',
      icon: '⚡',
    },
    {
      num: '04',
      title: 'Activate',
      timing: '3–5 Minutes',
      description: 'Absorbs directly through your oral mucosa into your bloodstream for fast, clean, jitter-free focus.',
      icon: '🎯',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#090B10] border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-sans tracking-[0.2em] text-cyan-400 font-bold uppercase">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white uppercase leading-[1.05]">
            FAST ENERGY. <br />
            <span className="text-slate-400">NO WATER NEEDED.</span>
          </h2>
          <p className="text-base text-slate-300 font-normal leading-relaxed pt-1">
            Engineered for moments you can't carry a beverage or wait 45 minutes for stomach digestion.
          </p>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="p-6 rounded-3xl bg-[#0F121A]/80 border border-white/[0.07] hover:border-white/20 transition-all duration-300 space-y-4 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-slate-500 group-hover:text-cyan-400 transition-colors">
                  {s.num}
                </span>
                <span className="text-xs font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                  {s.timing}
                </span>
              </div>

              <div className="space-y-1 pt-1">
                <div className="text-2xl font-black font-heading text-white tracking-tight">
                  {s.title}
                </div>
                <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Sublingual Science Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F131C] to-[#0A0D14] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="text-xs uppercase font-bold tracking-wider text-cyan-400">
              The Sublingual Advantage
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              When caffeine is swallowed in drinks or pills, it must pass through the gastrointestinal tract and liver before reaching your bloodstream. Oral strips bypass the gut for faster onset and zero stomach irritation.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 flex-shrink-0">
            <div className="text-3xl">⏱️</div>
            <div>
              <div className="text-white font-bold text-sm">3–5 Min Kick</div>
              <div className="text-xs text-slate-400">vs 30–45 min for liquids</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
