import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X } from './Icons';

export default function Navbar() {
  const { totalItemCount, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Pre-Order Ticker */}
      <div className="bg-gradient-to-r from-cyan-950/95 via-[#060911] to-cyan-950/95 border-b border-cyan-500/30 py-1.5 px-3 sm:px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-3 text-[9.5px] xs:text-[10px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest uppercase text-cyan-300 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block flex-shrink-0" />
          <span>BATCH 001 PRE-ORDER OPEN • 71% CLAIMED</span>
          <span className="text-cyan-700 hidden sm:inline">•</span>
          <span className="text-white/90 hidden sm:inline">2 FLAVORS: ❄️ COOL MINT & ☕ COFFEE CLASH</span>
          <span className="text-cyan-700 hidden sm:inline">•</span>
          <span className="text-emerald-400 hidden md:inline">₹40 DELIVERY WAIVED VIA 'FOUNDER001'</span>
        </div>
      </div>

      <header
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#050608]/92 backdrop-blur-xl border-b border-white/[0.08] py-3'
            : 'bg-[#050608]/40 backdrop-blur-sm py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* Minimal Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group text-left cursor-pointer active:scale-95 transition-transform"
        >
          <span className="text-base sm:text-xl font-black font-heading tracking-widest text-white">
            KAFF'S
          </span>
          <span className="text-cyan-400 text-xs sm:text-sm font-bold">⚡</span>
          <span className="text-[11px] sm:text-sm font-bold font-mono tracking-[0.2em] sm:tracking-[0.25em] text-slate-400 group-hover:text-white transition-colors uppercase">
            ENERGY
          </span>
        </button>

        {/* Desktop Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-[0.18em] uppercase text-slate-400">
          <button
            onClick={() => scrollToSection('product')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            PRODUCT
          </button>
          <button
            onClick={() => scrollToSection('why-kaffs')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            WHY KAFF'S
          </button>
          <button
            onClick={() => scrollToSection('film')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            FILM
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            FAQ
          </button>
        </nav>

        {/* Right Action: Cart & Shop Now */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => scrollToSection('shop')}
            className="hidden sm:inline-flex text-[11px] font-mono tracking-[0.15em] uppercase font-bold text-white px-4 py-2 rounded-full border border-white/20 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer"
          >
            SHOP NOW
          </button>

          {/* Cart Icon Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-300 hover:text-white active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 touch-manipulation"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItemCount > 0 && (
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded-full border border-cyan-400/30">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white active:scale-90 transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07090E]/98 backdrop-blur-2xl border-b border-cyan-400/20 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          <div className="flex flex-col space-y-3.5 text-xs font-mono tracking-widest uppercase text-slate-300">
            <button
              onClick={() => scrollToSection('product')}
              className="text-left py-2 hover:text-cyan-300 transition-colors border-b border-white/[0.04] flex items-center justify-between"
            >
              <span>01 // PRODUCT</span>
              <span className="text-[10px] text-cyan-400 font-bold">40MG STRIP</span>
            </button>
            <button
              onClick={() => scrollToSection('why-kaffs')}
              className="text-left py-2 hover:text-cyan-300 transition-colors border-b border-white/[0.04] flex items-center justify-between"
            >
              <span>02 // WHY KAFF'S</span>
              <span className="text-[10px] text-slate-500">SCIENCE</span>
            </button>
            <button
              onClick={() => scrollToSection('film')}
              className="text-left py-2 hover:text-cyan-300 transition-colors border-b border-white/[0.04] flex items-center justify-between"
            >
              <span>03 // BRAND FILM</span>
              <span className="text-[10px] text-cyan-400">WATCH</span>
            </button>
            <button
              onClick={() => scrollToSection('shop')}
              className="text-left py-2 hover:text-cyan-300 transition-colors border-b border-white/[0.04] flex items-center justify-between"
            >
              <span>04 // SHOP PRE-ORDER</span>
              <span className="text-[10px] text-emerald-400 font-bold">FROM ₹229</span>
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-2 hover:text-cyan-300 transition-colors flex items-center justify-between"
            >
              <span>05 // FAQ</span>
              <span className="text-[10px] text-slate-500">QUESTIONS</span>
            </button>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('shop');
              }}
              className="w-full py-3.5 rounded-xl bg-cyan-400 text-black font-mono font-black text-xs tracking-widest uppercase text-center active:scale-[0.98] transition-transform shadow-lg shadow-cyan-400/20"
            >
              PRE-ORDER BATCH 001 (FROM ₹229)
            </button>
          </div>
        </div>
      )}
    </header>
  </div>
  );
}
