import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight } from './Icons';

export default function MobileStickyBar() {
  const { isCartOpen, isCheckoutOpen, totalItemCount, setIsCartOpen } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      className="fixed bottom-0 left-0 right-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#060709] via-[#060709]/95 to-transparent backdrop-blur-xl md:hidden transition-all duration-300"
    >
      <div className="max-w-md mx-auto bg-[#0E1118]/95 border border-white/10 rounded-2xl p-3 px-4 flex items-center justify-between shadow-2xl">
        
        {/* Left Info */}
        <div className="space-y-0.5">
          <div className="text-[10px] font-sans tracking-wider uppercase font-bold text-cyan-400">
            🖤 Early Black Friday • 15% OFF
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-black font-heading text-white">FROM ₹195</span>
            <span className="text-[11px] text-slate-500 line-through">₹229</span>
            <span className="text-[10px] font-medium text-emerald-400 font-sans">Free Delivery</span>
          </div>
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center gap-2">
          {totalItemCount > 0 ? (
            <button
              onClick={() => setIsCartOpen(true)}
              className="py-2.5 px-4 rounded-full bg-white text-black font-sans font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>CART ({totalItemCount})</span>
            </button>
          ) : (
            <button
              onClick={scrollToShop}
              className="py-2.5 px-4 rounded-full bg-white text-black font-sans font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer"
            >
              <span>PRE-ORDER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </aside>
  );
}
