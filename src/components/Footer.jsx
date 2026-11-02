import React from 'react';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030406] border-t border-white/[0.08] text-slate-400 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          {/* Brand Wordmark */}
          <div className="space-y-2">
            <div className="text-xl sm:text-2xl font-black font-heading tracking-widest text-white">
              KAFF'S ⚡ ENERGY
            </div>
            <p className="text-xs font-mono tracking-wider text-slate-500 uppercase">
              DAILY POWER-UP, FLAVORED CAFFEINE STRIPS
            </p>
          </div>

          {/* Minimal Links */}
          <div className="flex flex-wrap gap-6 sm:gap-8 text-xs font-mono tracking-wider uppercase">
            <button onClick={() => scrollTo('product')} className="hover:text-white transition-colors cursor-pointer">
              Products
            </button>
            <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors cursor-pointer">
              FAQ
            </button>
            <a href="mailto:support@kaffs.in" className="hover:text-white transition-colors">
              Contact
            </a>
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Shipping
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Returns
            </span>
          </div>

        </div>

        {/* Regulatory Information — FSSAI Licensed & Certified */}
        <div className="pt-8 border-t border-white/[0.06] space-y-4 text-xs font-mono text-slate-500 leading-relaxed">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>FSSAI LICENSED & LAB TESTED</span>
          </div>
          <p>
            <strong className="text-slate-300">Regulatory & Safety:</strong> Manufactured in FSSAI-licensed, GMP-certified facilities under strict food safety and nutraceutical standards. KAFF'S Energy oral dissolving strips contain 40mg caffeine per strip. Not recommended for children under 18 years, pregnant or nursing women, or individuals sensitive to caffeine. Do not exceed 400mg total caffeine daily.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] pt-2">
            <div>
              © {new Date().getFullYear()} KAFF'S ENERGY. All rights reserved.
            </div>
            <div>
              Fulfillment & Origin: Ghaziabad, India
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
