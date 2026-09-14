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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050608]/90 backdrop-blur-md border-b border-white/[0.06] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Minimal Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <span className="text-lg sm:text-xl font-black font-heading tracking-widest text-white">
            KAFF'S
          </span>
          <span className="text-cyan-400 text-sm font-bold">⚡</span>
          <span className="text-xs sm:text-sm font-bold font-mono tracking-[0.25em] text-slate-400 group-hover:text-white transition-colors uppercase">
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollToSection('shop')}
            className="hidden sm:inline-flex text-[11px] font-mono tracking-[0.15em] uppercase font-bold text-white px-4 py-2 rounded-full border border-white/20 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer"
          >
            SHOP NOW
          </button>

          {/* Cart Icon Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItemCount > 0 && (
              <span className="text-[10px] font-mono font-bold text-cyan-400">
                ({totalItemCount})
              </span>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07090E]/98 backdrop-blur-xl border-b border-white/[0.08] px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col space-y-4 text-xs font-mono tracking-widest uppercase text-slate-300">
            <button
              onClick={() => scrollToSection('product')}
              className="text-left py-1 hover:text-white"
            >
              PRODUCT
            </button>
            <button
              onClick={() => scrollToSection('why-kaffs')}
              className="text-left py-1 hover:text-white"
            >
              WHY KAFF'S
            </button>
            <button
              onClick={() => scrollToSection('film')}
              className="text-left py-1 hover:text-white"
            >
              FILM
            </button>
            <button
              onClick={() => scrollToSection('shop')}
              className="text-left py-1 hover:text-white"
            >
              SHOP
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-1 hover:text-white"
            >
              FAQ
            </button>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('shop');
              }}
              className="w-full py-3 rounded-full bg-white text-black font-mono font-bold text-xs tracking-widest uppercase text-center"
            >
              SHOP NOW (FROM ₹229)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
