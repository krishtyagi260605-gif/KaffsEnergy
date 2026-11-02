import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight } from './Icons';

export default function MobileStickyBar() {
  const { isCartOpen, isCheckoutOpen, totalItemCount, setIsCartOpen } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 350px (past top hero fold)
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide if cart or checkout is currently open or not scrolled enough
  if (!isVisible || isCartOpen || isCheckoutOpen) return null;

  const scrollToShop = () => {
    const el = document.getElementById('shop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside 
      aria-label="Quick Mobile Pre-Order Bar"
      className="fixed bottom-0 left-0 right-0 z-40 p-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#050608] via-[#050608]/95 to-transparent backdrop-blur-xl md:hidden transition-all duration-300"
    >
      <div className="max-w-md mx-auto bg-[#090D17]/95 border border-cyan-400/40 rounded-2xl p-2.5 px-3.5 flex items-center justify-between shadow-[0_4px_25px_rgba(0,240,255,0.22)]">
        
        {/* Left Info */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>BATCH 001 // PRE-ORDER</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-black font-heading text-white">FROM ₹229</span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-tight">FREE DELIVERY</span>
          </div>
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center gap-2">
          {totalItemCount > 0 ? (
            <button
              onClick={() => setIsCartOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-cyan-400 text-black font-mono font-black text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-lg shadow-cyan-400/25 active:scale-95 transition-transform"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>CART ({totalItemCount})</span>
            </button>
          ) : (
            <button
              onClick={scrollToShop}
              className="py-2.5 px-4 rounded-xl bg-cyan-400 text-black font-mono font-black text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-lg shadow-cyan-400/25 active:scale-95 transition-transform"
            >
              <span>CLAIM NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </aside>
  );
}
