import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from './Icons';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    appliedPromo,
    setAppliedPromo,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'FOUNDER001' || code === 'FOUNDER1' || code === 'BATCH1') {
      setAppliedPromo({ code: 'FOUNDER001', discountAmount: 40, label: 'Founder Delivery Waiver (-₹40)' });
      setPromoError('');
    } else {
      setPromoError("Invalid code. Use 'FOUNDER001' to waive ₹40 delivery fee.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dim Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-[#080B12] border-l border-white/[0.08] flex flex-col justify-between shadow-2xl z-10">
        
        {/* Header */}
        <div className="p-5 sm:p-8 border-b border-white/[0.08] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
              BATCH 001 ALLOCATION
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-heading text-white uppercase tracking-tight">
              YOUR PRE-ORDER
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-slate-400 hover:text-white active:scale-90 transition-transform cursor-pointer rounded-lg bg-white/5"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-3 sm:space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cart is Empty</h4>
                  <p className="text-xs text-slate-500 font-mono">Select a pack and flavor to pre-order.</p>
                </div>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#0B0E16] border border-white/[0.06] flex items-center justify-between gap-3 sm:gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight">
                        {item.packSize === 5 ? 'PACK OF 5' : 'PACK OF 10'}
                      </h4>
                      <span className={`text-[9.5px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        item.flavor === 'Coffee Clash'
                          ? 'border-amber-400/30 text-amber-300 bg-amber-400/10'
                          : 'border-cyan-400/30 text-cyan-300 bg-cyan-400/10'
                      }`}>
                        {item.flavor === 'Coffee Clash' ? '☕' : '❄️'} {item.flavor || 'Cool Mint'}
                      </span>
                    </div>

                    <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase">
                      {item.stripCount} Strips • 40mg Caffeine / Strip
                    </div>
                    <div className="text-sm font-black text-white pt-0.5">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center rounded-lg border border-white/10 bg-black/40">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 sm:px-2 sm:py-1 text-slate-400 hover:text-white active:scale-90 transition-transform cursor-pointer touch-manipulation"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 sm:px-2 sm:py-1 text-slate-400 hover:text-white active:scale-90 transition-transform cursor-pointer touch-manipulation"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-500 hover:text-white p-2 active:scale-90 transition-all cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 sm:p-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] border-t border-white/[0.08] bg-[#05060A] space-y-4 sm:space-y-5">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="PROMO CODE (FOUNDER001)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 px-3 py-2.5 bg-[#090C14] border border-white/10 rounded-xl text-base sm:text-xs text-white uppercase placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-white/[0.08] hover:bg-white/[0.15] active:scale-95 text-xs font-mono font-bold text-white rounded-xl border border-white/10 transition-all cursor-pointer touch-manipulation"
                  >
                    APPLY
                  </button>
                </div>
                {promoError && <p className="text-[10px] font-mono text-rose-400">{promoError}</p>}
                {appliedPromo && (
                  <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span>✓</span>
                    <span>{appliedPromo.label || appliedPromo.code} applied!</span>
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>PRODUCT SUBTOTAL</span>
                  <span className="text-white">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>STANDARD DELIVERY</span>
                  <span className="text-white">₹{shippingFee}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>FOUNDER WAIVER ({appliedPromo?.code || 'FOUNDER001'})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/[0.08] font-heading">
                  <span>TOTAL PAYABLE</span>
                  <span className="text-cyan-400">₹{total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 sm:py-4 rounded-full bg-cyan-400 text-black font-mono font-black text-xs tracking-[0.16em] uppercase hover:bg-cyan-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(0,240,255,0.3)] touch-manipulation"
              >
                <span>CLAIM BATCH 001 (₹{total})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-[9.5px] sm:text-[10px] font-mono text-slate-500 text-center uppercase tracking-wider">
                📦 Batch 001 • Ships in 2–3 weeks • Secure
              </div>

            </div>
          )}

        </div>
      </div>
    );
  }
