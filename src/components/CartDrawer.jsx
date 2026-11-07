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
      {/* Dim Backdrop Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-[#0C0F17] border-l border-white/[0.08] flex flex-col justify-between shadow-2xl z-10">
        
        {/* Header */}
        <div className="p-5 sm:p-7 border-b border-white/[0.08] flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-sans font-semibold tracking-wider text-cyan-400 uppercase">
              Founder Batch 001
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-heading text-white uppercase tracking-tight">
              YOUR PRE-ORDER
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-slate-400 hover:text-white active:scale-90 transition-transform cursor-pointer rounded-full bg-white/5 hover:bg-white/10"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Your Bag is Empty</h4>
                <p className="text-xs text-slate-400">Select a pack and flavor to pre-order.</p>
              </div>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#121622] border border-white/[0.06] flex items-center justify-between gap-3 sm:gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white uppercase tracking-tight">
                      {item.packSize === 5 ? 'PACK OF 5' : 'PACK OF 10'}
                    </h4>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      item.flavor === 'Coffee Clash'
                        ? 'border-amber-400/30 text-amber-300 bg-amber-400/10'
                        : 'border-cyan-400/30 text-cyan-300 bg-cyan-400/10'
                    }`}>
                      {item.flavor === 'Coffee Clash' ? '☕' : '❄️'} {item.flavor || 'Cool Mint'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 font-medium">
                    {item.stripCount} Strips • 40mg Caffeine / Strip
                  </div>
                  <div className="text-sm font-black text-white pt-0.5">
                    ₹{item.price * item.quantity}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center rounded-xl border border-white/10 bg-black/40">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 sm:px-2.5 sm:py-1 text-slate-400 hover:text-white active:scale-90 transition-transform cursor-pointer touch-manipulation"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-mono font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 sm:px-2.5 sm:py-1 text-slate-400 hover:text-white active:scale-90 transition-transform cursor-pointer touch-manipulation"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-500 hover:text-red-400 p-2 active:scale-90 transition-all cursor-pointer"
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
          <div className="p-5 sm:p-7 pb-[max(1.5rem,env(safe-area-inset-bottom))] border-t border-white/[0.08] bg-[#090B10] space-y-4">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (FOUNDER001)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-[#121622] border border-white/10 rounded-xl text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-sans font-bold text-white rounded-xl border border-white/10 transition-all cursor-pointer"
                >
                  APPLY
                </button>
              </div>
              {promoError && <p className="text-[11px] text-rose-400">{promoError}</p>}
              {appliedPromo && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span>✓</span>
                  <span>{appliedPromo.label || appliedPromo.code} applied!</span>
                </p>
              )}
            </form>

            {/* Price Breakdown */}
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Product Subtotal</span>
                <span className="text-white font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Standard Delivery</span>
                <span className="text-white font-medium">₹{shippingFee}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Founder Waiver ({appliedPromo?.code || 'FOUNDER001'})</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-white pt-2.5 border-t border-white/[0.08] font-heading">
                <span>Total Payable</span>
                <span className="text-cyan-400">₹{total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-4 rounded-full bg-white text-black font-sans font-bold text-xs tracking-wider uppercase hover:bg-slate-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
            >
              <span>PROCEED TO CHECKOUT • ₹{total}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="text-[11px] text-slate-400 text-center font-medium">
              🔒 100% Secure Checkout via Cashfree • Ships in 2–3 weeks
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
