import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

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
    if (code === 'KAFFS10') {
      setAppliedPromo({ code: 'KAFFS10', discountPercent: 10, label: '10% Launch Discount' });
      setPromoError('');
    } else if (code === 'DAILYPOWER') {
      setAppliedPromo({ code: 'DAILYPOWER', discountPercent: 15, label: '15% Daily Power Discount' });
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try KAFFS10.');
    }
  };

  const freeShippingThreshold = 399;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dim Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#07090E] border-l border-white/[0.08] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-white/[0.06] flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-lg font-black font-heading tracking-wider uppercase text-white">
                YOUR CART
              </h3>
              <p className="text-[11px] font-mono tracking-widest text-slate-500 uppercase">
                KAFF'S ⚡ ENERGY
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Notice */}
          <div className="px-6 sm:px-8 py-3 bg-[#0A0D15] border-b border-white/[0.06] text-xs font-mono tracking-wider uppercase flex items-center justify-between">
            <span className="text-slate-400">Shipping</span>
            {subtotal >= freeShippingThreshold ? (
              <span className="text-cyan-400 font-bold">FREE SHIPPING UNLOCKED</span>
            ) : (
              <span className="text-slate-400">Add ₹{freeShippingThreshold - subtotal} for Free Shipping</span>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <ShoppingBag className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cart is Empty</h4>
                  <p className="text-xs text-slate-500 font-mono">Select a pack to power up.</p>
                </div>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#0B0E16] border border-white/[0.06] flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white uppercase tracking-tight">
                      {item.packSize === 5 ? 'PACK OF 5' : 'PACK OF 10'}
                    </h4>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">
                      {item.stripCount} Strips • 40mg per strip
                    </div>
                    <div className="text-sm font-black text-white pt-1">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-lg border border-white/10 bg-black/40">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-500 hover:text-white p-1 transition-colors cursor-pointer"
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
            <div className="p-6 sm:p-8 border-t border-white/[0.08] bg-[#05060A] space-y-5">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="PROMO CODE (KAFFS10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#090C14] border border-white/10 rounded-xl text-xs text-white uppercase placeholder-slate-600 focus:outline-none focus:border-white/40 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.15] text-xs font-mono font-bold text-white rounded-xl border border-white/10 transition-colors cursor-pointer"
                  >
                    APPLY
                  </button>
                </div>
                {promoError && <p className="text-[10px] font-mono text-rose-400">{promoError}</p>}
                {appliedPromo && (
                  <p className="text-[10px] font-mono text-cyan-400">
                    {appliedPromo.label} applied!
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-white">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-cyan-400">
                    <span>DISCOUNT</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>SHIPPING</span>
                  <span className="text-white">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/[0.08] font-heading">
                  <span>TOTAL</span>
                  <span className="text-white">₹{total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-4 rounded-full bg-white text-black font-mono font-bold text-xs tracking-[0.18em] uppercase hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>CHECKOUT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
