import React, { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from './Icons';

function PremiumCard({ sku, onAddToCart, isFeatured }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [selectedFlavor, setSelectedFlavor] = useState('Cool Mint'); // 'Cool Mint' or 'Coffee Clash'

  const handleMouseMove = (e) => {
    // Disable 3D tilt on touch screens to prevent stutter during scrolling
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const currentImage = selectedFlavor === 'Coffee Clash' ? (sku.coffeeImage || sku.image) : sku.image;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className={`rounded-3xl p-5 sm:p-8 md:p-10 flex flex-col justify-between relative transition-all duration-300 ${
        isFeatured
          ? 'panel-featured border-cyan-400/40 shadow-[0_0_50px_rgba(0,240,255,0.12)]'
          : 'panel-dark'
      }`}
    >
      {/* Best Value / SKU Badge */}
      {sku.badge && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase font-bold px-2.5 sm:px-3 py-1 rounded-full bg-cyan-400 text-black shadow-lg shadow-cyan-400/20">
            {sku.badge}
          </span>
        </div>
      )}

      {/* Card Header Info */}
      <div className="space-y-1.5 sm:space-y-2 pr-16 sm:pr-0">
        <h3 className="text-xl sm:text-3xl font-black font-heading text-white uppercase tracking-tight">
          {sku.title}
        </h3>
        <p className="text-[11px] sm:text-xs font-mono tracking-wider text-slate-400 uppercase">
          {sku.strips} STRIPS • 40MG CAFFEINE PER STRIP
        </p>
      </div>

      {/* Product Packaging Render with dynamic flavor packaging */}
      <div className="my-4 sm:my-8 flex items-center justify-center relative">
        <div className={`w-full max-w-[200px] sm:max-w-[240px] aspect-[4/5] flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-500 ${
          selectedFlavor === 'Coffee Clash' ? 'filter drop-shadow-[0_15px_30px_rgba(245,158,11,0.35)]' : 'filter drop-shadow-[0_15px_30px_rgba(0,240,255,0.35)]'
        }`}>
          <img
            key={`${sku.id}-${selectedFlavor}`}
            src={currentImage}
            alt={`${sku.title} - ${selectedFlavor}`}
            className="w-full h-full object-contain transition-all duration-500"
            loading="lazy"
          />
        </div>
      </div>

      {/* Flavor Selection Toggle */}
      <div className="space-y-2 pt-3 sm:pt-4 border-t border-white/[0.08]">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider">
          <span className="text-slate-400">Flavor:</span>
          <span className={`font-bold ${selectedFlavor === 'Coffee Clash' ? 'text-amber-400' : 'text-cyan-400'}`}>
            {selectedFlavor}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setSelectedFlavor('Cool Mint')}
            className={`py-2.5 px-3 rounded-xl border text-[11px] font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 touch-manipulation ${
              selectedFlavor === 'Cool Mint'
                ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400 font-bold shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                : 'bg-[#0B0F19] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <span>❄️</span>
            <span>Cool Mint</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedFlavor('Coffee Clash')}
            className={`py-2.5 px-3 rounded-xl border text-[11px] font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 touch-manipulation ${
              selectedFlavor === 'Coffee Clash'
                ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'bg-[#0B0F19] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <span>☕</span>
            <span>Coffee Clash</span>
          </button>
        </div>
      </div>

      {/* Price & Pre-Order CTA */}
      <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
        <div className="flex items-baseline justify-between">
          <div className="text-2xl sm:text-4xl font-black font-heading text-white">
            ₹{sku.price}
          </div>
          <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase">
            {sku.unitPrice}
          </div>
        </div>

        <div className="text-[9.5px] sm:text-[10px] font-mono text-cyan-300 text-center uppercase tracking-wider py-1.5 px-2 bg-cyan-400/10 rounded-lg border border-cyan-400/20 flex items-center justify-center gap-1">
          <span>⚡</span>
          <span>₹40 DELIVERY WAIVED VIA 'FOUNDER001'</span>
        </div>

        <button
          onClick={() => onAddToCart(sku, selectedFlavor)}
          className={`w-full py-3.5 sm:py-4 rounded-full font-mono font-bold text-xs tracking-[0.16em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] touch-manipulation ${
            isFeatured
              ? 'bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.3)] font-black'
              : 'bg-white/[0.08] text-white hover:bg-white hover:text-black border border-white/20'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>PRE-ORDER {sku.title} • ₹{sku.price}</span>
        </button>
      </div>

    </div>
  );
}

export default function ProductShowcase() {
  const { addToCart, setIsCartOpen } = useCart();

  const skus = [
    {
      id: 'kaffs-5',
      title: 'PACK OF 5',
      price: 229,
      strips: 5,
      unitPrice: '₹45.80 / strip',
      badge: 'STARTER PACK',
      image: '/brand/kaffs-pack-5.png',
      coffeeImage: '/brand/kaffs-pack-5-coffee.jpg',
      isFeatured: false,
    },
    {
      id: 'kaffs-10',
      title: 'PACK OF 10',
      price: 399,
      strips: 10,
      unitPrice: '₹39.90 / strip',
      badge: 'BEST VALUE',
      image: '/brand/kaffs-pack-10.png',
      coffeeImage: '/brand/kaffs-pack-10-coffee.jpg',
      isFeatured: true,
    },
  ];

  const handleAdd = (sku, selectedFlavor) => {
    addToCart(
      {
        id: sku.id,
        name: "KAFF'S energy",
        caffeine: '40mg',
        badge: sku.badge,
        color: selectedFlavor === 'Coffee Clash' ? 'amber' : 'cyan',
      },
      sku.strips,
      selectedFlavor || 'Cool Mint',
      sku.price
    );
    setIsCartOpen(true);
  };

  return (
    <section id="shop" className="py-20 sm:py-36 bg-[#07090F] border-t border-white/[0.06] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-10 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 font-bold uppercase">
            BATCH 001 ALLOCATION
          </div>
          <h2 className="text-3xl sm:text-6xl font-black font-heading tracking-tight text-white uppercase">
            SELECT PACK & FLAVOR.
          </h2>
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase pt-1">
            ❄️ COOL MINT & ☕ COFFEE CLASH • ₹40 DELIVERY DISCOUNT VIA 'FOUNDER001' • SHIPS IN 2–3 WEEKS
          </p>
        </div>

        {/* Two Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {skus.map((sku) => (
            <PremiumCard
              key={sku.id}
              sku={sku}
              onAddToCart={handleAdd}
              isFeatured={sku.isFeatured}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
