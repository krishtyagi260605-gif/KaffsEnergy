import React, { useState } from 'react';
import { X, ShieldCheck } from './Icons';

export default function Footer() {
  const [activePolicy, setActivePolicy] = useState(null); // 'privacy', 'terms', 'shipping', 'returns', 'contact'

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const policies = {
    privacy: {
      title: 'Privacy Policy',
      content: (
        <div className="space-y-4 text-xs font-mono text-slate-300 leading-relaxed">
          <p>
            At <strong>KAFF'S ENERGY</strong> (operated under registered brand kaffsenergy.shop), we are committed to protecting your personal information.
          </p>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm pt-2">1. Information We Collect</h4>
          <p>
            When you place a pre-order, we collect your name, shipping address, mobile phone number, and email address solely for fulfilling your order, providing tracking updates, and customer support.
          </p>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm pt-2">2. Payment Security</h4>
          <p>
            We do not store or process debit/credit card numbers or UPI PINs. All payments are encrypted and processed through RBI-authorized payment aggregator <strong>Cashfree Payments India Pvt. Ltd.</strong> (PCI-DSS Level 1 compliant).
          </p>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm pt-2">3. Data Sharing</h4>
          <p>
            We never sell, trade, or rent your personal information to third parties. Customer address details are shared only with registered logistics partners (e.g. Shiprocket/Delhivery/Bluedart) for delivery fulfillment.
          </p>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm pt-2">4. Contact</h4>
          <p>
            For privacy inquiries or data removal, write to: <a href="mailto:support@kaffsenergy.shop" className="text-cyan-400 underline">support@kaffsenergy.shop</a>.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions',
      content: (
        <div className="space-y-4 text-xs font-mono text-slate-300 leading-relaxed">
          <p>
            By placing an order on <strong>kaffsenergy.shop</strong>, you agree to the following terms:
          </p>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm pt-2">1. Batch 001 Pre-Orders</h4>
          <p>
            Batch 001 orders are produced in limited founder quantities. Orders dispatch within 2 to 3 weeks of confirmation. Real-time courier tracking numbers are sent via SMS/WhatsApp upon dispatch.
          </p>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm pt-2">2. Pricing & Currency</h4>
          <p>
            All prices are in Indian Rupees (INR) inclusive of applicable taxes. Pack of 5 is priced at ₹229, and Pack of 10 at ₹399. Founder delivery waiver of ₹40 applies automatically with code FOUNDER001.
          </p>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm pt-2">3. Product Consumption</h4>
          <p>
            KAFF'S Energy oral dissolving strips contain 40mg caffeine per strip. Intended for healthy adults aged 18+. Not recommended for children, pregnant or nursing women, or individuals sensitive to caffeine.
          </p>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm pt-2">4. Jurisdiction</h4>
          <p>
            All transactions and disputes are governed by the laws of India and subject to the exclusive jurisdiction of the courts of Ghaziabad, Uttar Pradesh.
          </p>
        </div>
      ),
    },
    shipping: {
      title: 'Shipping & Delivery Policy',
      content: (
        <div className="space-y-4 text-xs font-mono text-slate-300 leading-relaxed">
          <p>
            We deliver to all serviceable PIN codes across India via premier courier networks.
          </p>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm pt-2">1. Dispatch Timeline</h4>
          <p>
            Batch 001 pre-orders will dispatch within <strong>2 to 3 weeks</strong> of placement. Subsequent production batches dispatch within 24 to 48 hours of order confirmation.
          </p>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm pt-2">2. Delivery Timeframes</h4>
          <p>
            Once dispatched, standard delivery timelines are:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Metro Cities (Delhi-NCR, Mumbai, Bengaluru, etc.): 2–3 business days</li>
            <li>Rest of India: 3–5 business days</li>
            <li>North-East & Remote Regions: 5–7 business days</li>
          </ul>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm pt-2">3. Shipping Charges</h4>
          <p>
            Standard shipping fee is ₹40 per order, which is completely waived for all Founder Batch 001 customers using promo code <strong>FOUNDER001</strong>.
          </p>
        </div>
      ),
    },
    returns: {
      title: 'Refund & Cancellation Policy',
      content: (
        <div className="space-y-4 text-xs font-mono text-slate-300 leading-relaxed">
          <p>
            Your satisfaction is our priority. As KAFF'S Energy is an ingestible consumable nutraceutical product, our policy is as follows:
          </p>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm pt-2">1. Cancellations</h4>
          <p>
            You may cancel your pre-order any time before dispatch by emailing <a href="mailto:support@kaffsenergy.shop" className="text-cyan-400 underline">support@kaffsenergy.shop</a> or messaging our customer care with your Order ID. Full 100% refund is initiated back to your original payment method within 24 hours.
          </p>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm pt-2">2. Damaged or Tampered Products</h4>
          <p>
            If your order arrives damaged, defective, or with a broken seal, please notify us within 48 hours of delivery with photos of the package. We will immediately ship a replacement at zero charge or issue a 100% full refund.
          </p>
          <h4 className="text-white font-bold uppercase tracking-wider text-sm pt-2">3. Refund Processing Time</h4>
          <p>
            Approved refunds are credited to the original bank account / UPI ID within 5 to 7 business days per RBI payment gateway banking cycles.
          </p>
        </div>
      ),
    },
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
            <a href="mailto:support@kaffsenergy.shop" className="hover:text-white transition-colors">
              Contact
            </a>
            <button
              onClick={() => setActivePolicy('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button
              onClick={() => setActivePolicy('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms
            </button>
            <button
              onClick={() => setActivePolicy('shipping')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Shipping
            </button>
            <button
              onClick={() => setActivePolicy('returns')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Returns
            </button>
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
              Fulfillment & Origin: Ghaziabad, Uttar Pradesh, India • support@kaffsenergy.shop
            </div>
          </div>
        </div>

      </div>

      {/* Policy Modal */}
      {activePolicy && policies[activePolicy] && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#080B11] border border-white/10 rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base sm:text-lg font-bold font-heading text-white uppercase tracking-wider">
                  {policies[activePolicy].title}
                </h3>
              </div>
              <button
                onClick={() => setActivePolicy(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {policies[activePolicy].content}
            </div>

            <div className="pt-4 border-t border-white/[0.08] text-center">
              <button
                onClick={() => setActivePolicy(null)}
                className="px-6 py-2.5 rounded-full bg-cyan-400 text-black font-mono font-bold text-xs uppercase hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </footer>
  );
}
