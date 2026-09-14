import React, { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Check } from 'lucide-react';

function PremiumCard({ sku, onAddToCart, isFeatured }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
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
      className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative transition-all duration-300 ${
        isFeatured
          ? 'panel-featured border-cyan-400/40'
          : 'panel-dark'
      }`}
    >
      {/* Best Value Badge */}
      {sku.badge && (
        <div className="absolute top-6 right-6 z-20">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold px-3 py-1 rounded-full bg-cyan-400 text-black shadow-lg shadow-cyan-400/20">
            {sku.badge}
          </span>
        </div>
      )}

      {/* Card Header Info */}
      <div className="space-y-2">
        <h3 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase tracking-tight">
          {sku.title}
        </h3>
        <p className="text-xs font-mono tracking-wider text-slate-400 uppercase">
          {sku.strips} STRIPS • 40MG PER STRIP
        </p>
      </div>

      {/* Product Packaging Render */}
      <div className="my-8 sm:my-10 flex items-center justify-center relative">
        <div className="w-full max-w-[240px] aspect-[4/5] flex items-center justify-center">
          <img
            src={sku.image}
            alt={sku.title}
            className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Price & CTA */}
      <div className="space-y-4 pt-6 border-t border-white/[0.08]">
        <div className="flex items-baseline justify-between">
          <div className="text-3xl sm:text-4xl font-black font-heading text-white">
            ₹{sku.price}
          </div>
          <div className="text-[11px] font-mono text-slate-400 uppercase">
            {sku.unitPrice}
          </div>
        </div>

        <button
          onClick={() => onAddToCart(sku)}
          className={`w-full py-4 rounded-full font-mono font-bold text-xs tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
            isFeatured
              ? 'bg-white text-black hover:bg-cyan-300 shadow-xl'
              : 'bg-white/[0.08] text-white hover:bg-white hover:text-black border border-white/20'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>ADD TO CART</span>
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
      badge: null,
      image: '/brand/kaffs-pack-5.png',
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
      isFeatured: true,
    },
  ];

  const handleAdd = (sku) => {
    addToCart(
      {
        id: sku.id,
        name: "KAFF'S energy",
        caffeine: '40mg',
        badge: sku.badge,
        color: 'cyan',
      },
      sku.strips,
      'Cool Mint',
      sku.price
    );
    setIsCartOpen(true);
  };

  return (
    <section id="shop" className="py-28 sm:py-36 bg-[#07090F] border-t border-white/[0.06] relative">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 font-bold uppercase">
            STORE
          </div>
          <h2 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-white uppercase">
            SELECT YOUR PACK.
          </h2>
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase pt-1">
            FREE SHIPPING ON ₹399+
          </p>
        </div>

        {/* Two Product Cards Only */}
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
