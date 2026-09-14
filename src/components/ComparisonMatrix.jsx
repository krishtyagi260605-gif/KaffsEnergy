import React from 'react';
import { Check, X, Zap, ShieldCheck } from 'lucide-react';

export default function ComparisonMatrix() {
  const comparisonData = [
    {
      feature: 'Sublingual Absorption Speed',
      kaffs: '⚡ 5 Mins (Direct Capillary Entry)',
      energyDrink: '⏳ 45-60 Mins (Digestion)',
      coffee: '⏳ 45-60 Mins (Digestion)',
      pills: '⏳ 30-45 Mins',
    },
    {
      feature: 'Water / Liquid Needed',
      kaffs: '❌ NONE (Dissolves in 3s)',
      energyDrink: '✔️ 250ml Liquid',
      coffee: '✔️ Hot Water / Cup',
      pills: '✔️ Water Glass',
    },
    {
      feature: 'Sugar & Caloric Content',
      kaffs: '🌱 0g Sugar (0 Calories)',
      energyDrink: '⚠️ 27g Sugar (110 kcal)',
      coffee: '⚠️ 12g Sugar (Latte)',
      pills: '🌱 0g Sugar',
    },
    {
      feature: 'Gastric Acidity & Crash',
      kaffs: '✅ Zero Acid / Zero Crash',
      energyDrink: '❌ Heavy Sugar Crash',
      coffee: '❌ High Stomach Acidity',
      pills: '⚠️ Stomach Upset Risk',
    },
    {
      feature: 'Portability (Fits in Pocket)',
      kaffs: '👛 Ultra Thin (Fits in Wallet)',
      energyDrink: '🥤 Heavy Bulky Can',
      coffee: '☕ Fragile Hot Mug',
      pills: '💊 Bulky Pill Bottle',
    },
    {
      feature: 'Cost per Dose (Approx.)',
      kaffs: '💰 ₹39.90 - ₹45.80',
      energyDrink: '💸 ₹125 - ₹165',
      coffee: '💸 ₹150 - ₹280',
      pills: '💰 ₹35 - ₹50',
    },
  ];

  return (
    <section id="why-kaffs" className="py-24 bg-[#030508] relative border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full frost-pill border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest glow-ice-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Direct Benchmark
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            WHY KAFF'S WINS EVERY TIME
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Compare 40mg sublingual dissolving strips directly against traditional liquid caffeine options.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-cyan-500/30 shadow-2xl bg-slate-950/80 max-w-5xl mx-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-800 bg-[#050C18]">
                <th className="p-5 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Feature / Metric
                </th>
                <th className="p-5 text-sm font-black text-cyan-300 bg-cyan-500/15 border-x border-cyan-400/40 shadow-inner">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400 fill-current animate-pulse" />
                    KAFF'S (40mg Cool Mint)
                  </div>
                </th>
                <th className="p-5 text-xs font-bold text-slate-400">Energy Drinks</th>
                <th className="p-5 text-xs font-bold text-slate-400">Café Coffee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm font-medium">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-5 font-bold text-slate-200">{row.feature}</td>
                  <td className="p-5 font-extrabold text-white bg-cyan-500/10 border-x border-cyan-500/20 text-cyan-200">
                    {row.kaffs}
                  </td>
                  <td className="p-5 text-slate-400">{row.energyDrink}</td>
                  <td className="p-5 text-slate-400">{row.coffee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Callout */}
        <div className="mt-8 text-center">
          <span className="text-xs font-mono text-cyan-400 font-bold">
            ⚡ Save time, money, and calories — Pack of 5 (₹229) & Pack of 10 (₹399)
          </span>
        </div>

      </div>
    </section>
  );
}
