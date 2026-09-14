import React from 'react';
import { Layers, Droplets, Zap, ShieldCheck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'PEEL & PLACE',
      desc: 'Pull out a single foil strip anywhere. Place directly on your tongue.',
      icon: Layers,
      color: 'cyan',
    },
    {
      num: '02',
      title: 'INSTANT DISSOLVE',
      desc: 'Melts in 3 seconds on contact with oral mucosa. No water needed.',
      icon: Droplets,
      color: 'emerald',
    },
    {
      num: '03',
      title: 'SUBLINGUAL ENTRY',
      desc: 'Caffeine enters bloodstream via sublingual capillaries, bypassing gastric delay.',
      icon: Zap,
      color: 'rose',
    },
    {
      num: '04',
      title: 'SUSTAINED ALERTNESS',
      desc: 'Feel peak focus in 5 mins. Zero sugar, zero stomach acidity, zero crash.',
      icon: ShieldCheck,
      color: 'amber',
    },
  ];

  return (
    <section className="py-20 bg-[#090A0F] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight">
            4 STEPS TO INSTANT FOCUS
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            How oral thin film technology delivers speed and convenience without liquid bloat.
          </p>
        </div>

        {/* 4 Step Pipeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-[#0D111A] border border-slate-800 rounded-3xl p-6 relative hover:border-cyan-500/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-slate-600 group-hover:text-cyan-400 transition-colors">
                      {s.num}
                    </span>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black font-heading text-white">
                    {s.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
