import React, { useState } from 'react';
import { Plus, Minus } from './Icons';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: 'How do KAFF\'S strips work?',
      a: 'Place a single strip directly on your tongue. It dissolves on contact within 3 seconds, absorbing caffeine sublingually into your bloodstream in minutes without water or digestion.',
    },
    {
      q: 'How much caffeine is in each strip?',
      a: 'Each strip contains exactly 40mg of pure caffeine — equivalent to a strong espresso shot or an energy drink can, with 0g sugar and 0 calories.',
    },
    {
      q: 'What packs are available?',
      a: 'Pack of 5 for ₹229 (₹45.80/strip) and Pack of 10 for ₹399 (₹39.90/strip, Best Value). Free shipping is automatically applied on all orders of ₹399 or more.',
    },
    {
      q: 'When should I take KAFF\'S?',
      a: 'Whenever you need clean alertness without liquid bloat — during deep work sessions, late study hours, pre-workout, competitive gaming, or long drives.',
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#050608] border-t border-white/[0.06]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-10">
        
        <div className="space-y-2">
          <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 font-bold uppercase">
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
                  <p className="pt-3 text-sm text-slate-400 font-light leading-relaxed">
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
