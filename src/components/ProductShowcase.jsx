import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from './Icons';

function ProductCard({ sku, onAddToCart, isFeatured }) {
  const [selectedFlavor, setSelectedFlavor] = useState('Cool Mint'); // 'Cool Mint' or 'Coffee Clash'

  const currentImage = selectedFlavor === 'Coffee Clash' ? (sku.coffeeImage || sku.image) : sku.image;

  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between relative transition-all duration-300 ${
        isFeatured
          ? 'glass-card-featured'
          : 'glass-panel'
      }`}
    >
      {/* Best Value / SKU Badge */}
      {sku.badge && (
        <div className="absolute top-5 right-5 sm:top-7 sm:right-7 z-20">
          <span className={`text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-lg ${
            isFeatured ? 'bg-cyan-400 text-black' : 'bg-white/10 text-slate-300 border border-white/15'
          }`}>
            {sku.badge}
          </span>
        </div>
      )}

      {/* Card Header Info */}
      <div className="space-y-1.5 pr-20 sm:pr-0">
        <h3 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase tracking-tight">
          {sku.title}
        </h3>
        <p className="text-xs text-slate-400 font-medium">
          {sku.strips} Caffeine Strips • 40mg Per Strip
        </p>
      </div>

      {/* Product Packaging Render */}
      <div className="my-6 sm:my-8 flex items-center justify-center relative">
        <div className="w-full max-w-[210px] sm:max-w-[250px] aspect-[4/5] flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-500">
          <img
            key={`${sku.id}-${selectedFlavor}`}
            src={currentImage}
            alt={`${sku.title} - ${selectedFlavor}`}
            className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </div>

      {/* Flavor Selection with Sensory Notes */}
      <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Select Flavor:</span>
          <span className={`font-bold uppercase tracking-wider ${selectedFlavor === 'Coffee Clash' ? 'text-amber-400' : 'text-cyan-400'}`}>
            {selectedFlavor}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setSelectedFlavor('Cool Mint')}
            className={`py-3 px-3 rounded-2xl border text-xs font-semibold tracking-wide transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 ${
              selectedFlavor === 'Cool Mint'
                ? 'bg-cyan-500/15 text-cyan-300 border-cyan-400 shadow-sm'
                : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-1 font-bold">❄️ Cool Mint</span>
            <span className="text-[10px] opacity-75 font-normal">Arctic Peppermint</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedFlavor('Coffee Clash')}
            className={`py-3 px-3 rounded-2xl border text-xs font-semibold tracking-wide transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 ${
              selectedFlavor === 'Coffee Clash'
                ? 'bg-amber-500/15 text-amber-300 border-amber-400 shadow-sm'
                : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-1 font-bold">☕ Coffee Clash</span>
            <span className="text-[10px] opacity-75 font-normal">Dark Roast Espresso</span>
          </button>
        </div>
      </div>

      {/* Price & Pre-Order CTA */}
      <div className="space-y-3 pt-5">
        <div className="flex items-baseline justify-between">
          <div className="text-3xl sm:text-4xl font-black font-heading text-white">
            ₹{sku.price}
          </div>
          <div className="text-xs text-slate-400 font-medium">
            {sku.unitPrice}
          </div>
        </div>

        <div className="text-[11px] text-emerald-400 text-center font-medium py-1.5 px-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
          ✓ Free ₹40 delivery automatically applied with code 'FOUNDER001'
        </div>

        <button
          onClick={() => onAddToCart(sku, selectedFlavor)}
          className={`w-full py-4 rounded-full font-sans font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] shadow-lg ${
            isFeatured
              ? 'bg-white text-black hover:bg-slate-200'
              : 'bg-white/10 text-white hover:bg-white hover:text-black border border-white/20'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
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
    <section id="shop" className="py-24 sm:py-36 bg-[#07090F] border-t border-white/[0.06] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-xs font-sans tracking-[0.2em] text-cyan-400 font-bold uppercase">
            FOUNDER BATCH 001
          </div>
          <h2 className="text-3xl sm:text-6xl font-black font-heading tracking-tight text-white uppercase leading-[1.05]">
            CHOOSE YOUR PACK.
          </h2>
          <p className="text-sm text-slate-300 font-normal pt-1">
            Pre-orders now open. Formulated with pure, pharmaceutical-grade caffeine. Dispatches in 2–3 weeks.
          </p>
        </div>

        {/* Two Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {skus.map((sku) => (
            <ProductCard
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
