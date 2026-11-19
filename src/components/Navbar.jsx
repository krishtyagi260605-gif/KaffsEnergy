import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X } from './Icons';

export default function Navbar() {
  const { totalItemCount, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
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
      {/* Top Pre-Order Announcement Ticker */}
      <div className="bg-[#0B0E14] border-b border-white/[0.06] py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-300 font-sans font-medium">
          <span className="inline-flex items-center gap-1.5 text-cyan-400 font-semibold uppercase text-[10px] tracking-wider bg-cyan-400/10 px-2 py-0.5 rounded-full border border-cyan-400/20">
            Batch 001
          </span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <span>Pre-Orders Live • 40mg Caffeine Micro-Strips</span>
          <span className="hidden md:inline text-slate-400">•</span>
          <span className="hidden md:inline text-cyan-300 font-semibold">
            🖤 Early Black Friday Sale — Flat 15% OFF + Free Delivery
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#060709]/90 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-xl'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Brand Wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group text-left cursor-pointer active:scale-98 transition-transform"
          >
            <span className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
              KAFF'S
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block mb-1" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors uppercase">
              ENERGY
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-sans tracking-wide uppercase font-semibold text-slate-400">
            <button
              onClick={() => scrollToSection('product')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              The Strip
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('why-kaffs')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Why KAFF'S
            </button>
            <button
              onClick={() => scrollToSection('compare')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Comparison
            </button>
            <button
              onClick={() => scrollToSection('film')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Film
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action: Pre-Order & Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollToSection('shop')}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-sans font-bold tracking-wider uppercase bg-white text-black px-5 py-2.5 rounded-full hover:bg-slate-200 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <span>PRE-ORDER NOW</span>
              <span className="text-cyan-600 font-extrabold text-[11px]">→</span>
            </button>

            {/* Cart Icon Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white active:scale-95 transition-all cursor-pointer flex items-center justify-center border border-white/10"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] font-bold text-black bg-cyan-400 w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white active:scale-90 transition-all cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A0D14]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
            <div className="flex flex-col space-y-3.5 text-sm font-sans tracking-wide uppercase font-semibold text-slate-300">
              <button
                onClick={() => scrollToSection('product')}
                className="text-left py-2 hover:text-cyan-300 transition-colors border-b border-white/[0.04] flex items-center justify-between"
              >
                <span>The Strip</span>
                <span className="text-xs text-cyan-400 font-mono">40mg</span>
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left py-2 hover:text-cyan-300 transition-colors border-b border-white/[0.04] flex items-center justify-between"
              >
                <span>How It Works</span>
                <span className="text-xs text-slate-500">30 Seconds</span>
              </button>
              <button
                onClick={() => scrollToSection('why-kaffs')}
                className="text-left py-2 hover:text-cyan-300 transition-colors border-b border-white/[0.04] flex items-center justify-between"
              >
                <span>Why KAFF'S</span>
                <span className="text-xs text-slate-500">Zero Crash</span>
              </button>
              <button
                onClick={() => scrollToSection('compare')}
                className="text-left py-2 hover:text-cyan-300 transition-colors border-b border-white/[0.04] flex items-center justify-between"
              >
                <span>Vs. Energy Drinks</span>
                <span className="text-xs text-slate-500">0 Sugar</span>
              </button>
              <button
                onClick={() => scrollToSection('film')}
                className="text-left py-2 hover:text-cyan-300 transition-colors border-b border-white/[0.04] flex items-center justify-between"
              >
                <span>Brand Film</span>
                <span className="text-xs text-cyan-400">Watch</span>
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left py-2 hover:text-cyan-300 transition-colors flex items-center justify-between"
              >
                <span>FAQ</span>
                <span className="text-xs text-slate-500">Common Questions</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('shop');
                }}
                className="w-full py-3.5 rounded-full bg-white text-black font-sans font-bold text-xs tracking-wider uppercase text-center active:scale-98 transition-transform shadow-lg"
              >
                PRE-ORDER BATCH 001 (FROM ₹195)
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
