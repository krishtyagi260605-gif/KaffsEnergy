import React from 'react';
import { Zap, Target, Brain, Droplets, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';

export default function BenefitCallouts() {
  const benefits = [
    {
      id: 'instant-energy',
      title: 'INSTANT ENERGY',
      icon: Zap,
      subtitle: '5-Minute Sublingual Capillary Surge',
      badge: 'SPEED',
      accentColor: 'from-cyan-400 to-sky-400',
      description:
        'Oral thin-film technology dissolves within 3 seconds on your tongue. Caffeine enters the bloodstream directly via sublingual capillaries, bypassing gastric digestion delays.',
      points: [
        'Kicks in 3x faster than coffee or energy drinks',
        'Direct capillary absorption without liver first-pass metabolism',
        'Zero waiting for liquid digestion or heavy cans'
      ],
      stat: '5 MINS',
      statLabel: 'Absorption Time',
    },
    {
      id: 'sharper-focus',
      title: 'SHARPER FOCUS',
      icon: Target,
      subtitle: 'Laser Precision Without Hand Tremors',
      badge: 'PRECISION',
      accentColor: 'from-sky-300 to-cyan-400',
      description:
        'Precisely metered 40mg dosage blocks adenosine receptors smoothly, sustaining peak alpha brainwave activity for high-stakes coding, gaming, or all-night study sessions.',
      points: [
        'Zero sugar crash and zero jittery hand tremors',
        'Engineered for deep flow-state concentration',
        'Smooth sustained alertness curve for 4+ hours'
      ],
      stat: '100%',
      statLabel: 'Clean Alertness',
    },
    {
      id: 'clearer-mind',
      title: 'CLEARER MIND',
      icon: Brain,
      subtitle: 'Cool Mint Refreshment & Zero Acidity',
      badge: 'CLARITY',
      accentColor: 'from-emerald-300 to-cyan-400',
      description:
        'Crisp Cool Mint essential flavor awakens oral sensory nerves while eliminating the stomach acid reflux and gastrointestinal distress commonly caused by hot coffee.',
      points: [
        'Invigorating natural Cool Mint freshness',
        'Zero gastrointestinal upset or acidic heartburn',
        '0g Sugar, 0 Calories, 100% dental-friendly'
      ],
      stat: '0g',
      statLabel: 'Sugar & Acid',
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-[#030508] relative overflow-hidden border-t border-cyan-500/15">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full frost-pill border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest glow-ice-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Approved Brand Asset Callouts
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight leading-tight">
            THE TRIPLE POWER OF <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-300 bg-clip-text text-transparent glow-text-ice">
              KAFF'S 40mg COOL MINT
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Directly from the approved brand poster — the three scientifically engineered pillars that set KAFF'S energy strips apart from all legacy caffeine formats.
          </p>
        </div>

        {/* 3 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                className="frost-card rounded-3xl p-8 flex flex-col justify-between border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Internal Card Glow Accent */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-bl-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-colors" />

                <div className="space-y-6 relative z-10">
                  
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#0B1526] to-[#040810] border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-cyan-400 filter drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black tracking-widest uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                      {b.badge}
                    </span>
                  </div>

                  {/* Benefit Title & Subtitle */}
                  <div className="space-y-1.5">
                    <h3 className="text-2xl font-black font-heading text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/90 font-bold uppercase tracking-wider">
                      {b.subtitle}
                    </p>
                  </div>

                  {/* Benefit Description */}
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {b.description}
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                    {b.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Bottom Stat Callout */}
                <div className="mt-8 pt-4 border-t border-cyan-500/15 flex items-baseline justify-between">
                  <span className="text-xs font-mono text-slate-400 font-medium">
                    {b.statLabel}
                  </span>
                  <span className="text-2xl font-black font-heading text-white group-hover:text-cyan-400 transition-colors">
                    {b.stat}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
