import React, { useState } from 'react';
import { Plus, Minus } from './Icons';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: 'How do KAFF\'S caffeine strips work?',
      a: 'Place a single micro-strip directly on your tongue. It dissolves on contact within 3 seconds, absorbing caffeine sublingually directly through your oral mucosa into your bloodstream in 3–5 minutes. No water or digestion required.',
    },
    {
      q: 'How much caffeine is in each strip?',
      a: 'Each strip contains precisely 40mg of pharmaceutical-grade caffeine — roughly equivalent to an espresso shot or half a standard energy drink, with 0g sugar and 0 calories.',
    },
    {
      q: 'What flavors and packs are available in Founder Batch 001?',
      a: 'Available in two signature flavors: ❄️ Cool Mint (crisp arctic peppermint) and ☕ Coffee Clash (dark roast espresso). Choose between Pack of 5 (₹229) and Pack of 10 (₹399). Standard delivery fee of ₹40 is 100% waived with code FOUNDER001.',
    },
    {
      q: 'When should I take KAFF\'S?',
      a: 'Anytime you need rapid, clean alertness without liquid bloat — during deep focus work sessions, late night studying, before a workout, competitive gaming, or long highway drives.',
    },
    {
      q: 'Is KAFF\'S safe and legally compliant?',
      a: 'Yes. KAFF\'S Energy is manufactured in state-of-the-art facilities following strict food safety standards and is FSSAI compliant. Formulated for healthy adults. We recommend not exceeding 4 strips in a single day.',
    },
    {
      q: 'When will my pre-order be delivered?',
      a: 'Batch 001 is currently in limited first-run production and dispatches within 2–3 weeks. Once dispatched, you will receive full WhatsApp and SMS courier tracking to your doorstep.',
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#060709] border-t border-white/[0.06]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-10">
        
        <div className="space-y-2">
          <div className="text-xs font-sans tracking-[0.2em] text-cyan-400 font-bold uppercase">
            COMMON QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white uppercase">
            FAQ.
          </h2>
        </div>

        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {faq.q}
                  </span>
                  <span className="text-slate-400 group-hover:text-white transition-colors">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <p className="pt-3 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
