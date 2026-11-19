import React from 'react';

export default function ComparisonSection() {
  const comparisons = [
    {
      feature: 'Speed of Alertness',
      kaffs: '3–5 Minutes (Direct)',
      energyDrinks: '30–45 Minutes',
      coffee: '25–40 Minutes',
      winner: true,
    },
    {
      feature: 'Sugar & Added Calories',
      kaffs: '0g Sugar • 0 Calories',
      energyDrinks: '27g–54g High Sugar',
      coffee: '0–25g (with milk/sugar)',
      winner: true,
    },
    {
      feature: 'Liquid Volume & Bloat',
      kaffs: 'Zero liquid • Micro-strip',
      energyDrinks: '250ml–500ml heavy can',
      coffee: '200ml–350ml hot/cold cup',
      winner: true,
    },
    {
      feature: 'Portability',
      kaffs: 'Fits flat in wallet/pocket',
      energyDrinks: 'Requires backpack / fridge',
      coffee: 'Spills easily / needs prep',
      winner: true,
    },
    {
      feature: 'Post-Energy Crash',
      kaffs: 'Clean drop-off, no crash',
      energyDrinks: 'Severe sugar insulin crash',
      coffee: 'Afternoon fatigue dip',
      winner: true,
    },
    {
      feature: 'Cost Per Serving',
      kaffs: '₹33.90 – ₹39.00',
      energyDrinks: '₹125 – ₹160 / can',
      coffee: '₹150 – ₹280 / cup',
      winner: true,
    },
  ];

  return (
    <section id="compare" className="py-24 sm:py-32 bg-[#060709] border-t border-white/[0.06] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-xs font-sans tracking-[0.2em] text-cyan-400 font-bold uppercase">
            THE UPGRADE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white uppercase leading-[1.05]">
            WHY DITCH THE BOTTLE?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Everything you want from energy, none of the sugar, liquids, or baggage.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-white/[0.08] bg-[#0C0F17]/90 shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[580px]">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                <th className="p-4 sm:p-5 text-xs font-bold uppercase text-slate-400 w-2/5">
                  Comparison Metric
                </th>
                <th className="p-4 sm:p-5 text-sm sm:text-base font-black font-heading text-cyan-400 bg-cyan-950/20 border-x border-cyan-400/20 text-center w-1/4">
                  ⚡ KAFF'S STRIP
                </th>
                <th className="p-4 sm:p-5 text-xs font-bold uppercase text-slate-400 text-center w-1/5">
                  Energy Drinks
                </th>
                <th className="p-4 sm:p-5 text-xs font-bold uppercase text-slate-400 text-center w-1/5">
                  Cafe Coffee
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-xs sm:text-sm">
              {comparisons.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-slate-200">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-white bg-cyan-950/10 border-x border-cyan-400/20 text-center">
                    <span className="inline-flex items-center gap-1.5 text-cyan-300">
                      <span>✓</span>
                      <span>{row.kaffs}</span>
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-400 text-center">
                    {row.energyDrinks}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-400 text-center">
                    {row.coffee}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
