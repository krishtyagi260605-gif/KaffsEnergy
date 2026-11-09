import React from 'react';
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
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dim Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-[#0C0F17] border-l border-white/[0.08] flex flex-col justify-between shadow-2xl z-10">
        
        {/* Header */}
        <div className="p-5 sm:p-7 border-b border-white/[0.08] flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-sans font-semibold tracking-wider text-orange-400 uppercase">
              After Diwali Sale — 21% OFF
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-heading text-white uppercase tracking-tight">
              YOUR ORDER
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

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Your Bag is Empty</h4>
                <p className="text-xs text-slate-400">Select a pack and flavor to order.</p>
              </div>
            </div>
          ) : (
            cartItems.map((item) => {
              const itemTotal = item.price * item.quantity;
              const itemDiscount = Math.round(itemTotal * 0.21);
              const itemSalePrice = itemTotal - itemDiscount;
              return (
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
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="text-sm font-black text-white">₹{itemSalePrice}</span>
                      <span className="text-[11px] text-slate-500 line-through">₹{itemTotal}</span>
                      <span className="text-[10px] font-bold text-orange-400">21% OFF</span>
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
              );
            })
          )}
        </div>

        {/* Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 sm:p-7 pb-[max(1.5rem,env(safe-area-inset-bottom))] border-t border-white/[0.08] bg-[#090B10] space-y-4">

            {/* Price Breakdown */}
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-500 line-through">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-orange-400 font-semibold">
                <span>After Diwali Sale (21% OFF)</span>
                <span>−₹{discountAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-emerald-400 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2.5 border-t border-white/[0.08] font-heading">
                <span>You Pay</span>
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
              <span>CHECKOUT • ₹{total}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="text-[11px] text-slate-400 text-center font-medium">
              🔒 Secure Checkout via Cashfree • Free Delivery
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
