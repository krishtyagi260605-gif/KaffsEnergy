import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Check, Lock, ArrowRight } from 'lucide-react';

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, total, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, cod
  const [formData, setFormData] = useState({
    name: 'Krish Tyagi',
    phone: '9876543210',
    email: 'krish@kaffs.in',
    address: 'Sector 14 / Tech Park',
    city: 'Ghaziabad',
    pincode: '201002',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handlePayNow = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#080B12] border border-white/[0.08] rounded-3xl max-w-xl w-full p-6 sm:p-10 relative shadow-2xl my-8">
        
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close Checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>SECURE CHECKOUT</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase tracking-tight">
                COMPLETE ORDER
              </h3>
            </div>

            {/* Form */}
            <form onSubmit={handlePayNow} className="space-y-6">
              
              {/* Shipping Information */}
              <div className="space-y-3">
                <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                  Shipping Address (India)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-4 py-3 bg-[#0B0F19] border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-white/40"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="px-4 py-3 bg-[#0B0F19] border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-white/40"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Address (House/Apartment, Street)"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0B0F19] border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-white/40"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="px-4 py-3 bg-[#0B0F19] border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-white/40"
                  />
                  <input
                    type="text"
                    required
                    placeholder="PIN Code"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="px-4 py-3 bg-[#0B0F19] border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-3 px-2 rounded-xl border text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#0B0F19] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    UPI
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 px-2 rounded-xl border text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#0B0F19] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-3 px-2 rounded-xl border text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#0B0F19] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    COD
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-white text-black font-mono font-bold text-xs tracking-[0.18em] uppercase hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>CONFIRMING ORDER...</span>
                ) : (
                  <>
                    <span>CONFIRM & PAY ₹{total}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 rounded-full border border-cyan-400/40 text-cyan-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono tracking-[0.2em] text-cyan-400 uppercase">
                ORDER CONFIRMED
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase">
                THANK YOU FOR YOUR ORDER.
              </h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                Your KAFF'S Energy strips are being packed and will be dispatched within 24 hours.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B0F19] border border-white/[0.06] max-w-sm mx-auto text-xs text-slate-400 space-y-1 font-mono">
              <div>Shipping to: <span className="text-white">{formData.name}</span></div>
              <div>Destination: <span className="text-white">{formData.city}, {formData.pincode}</span></div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3.5 rounded-full font-mono font-bold text-xs tracking-widest uppercase bg-white text-black hover:bg-cyan-300 transition-all cursor-pointer"
            >
              RETURN TO SITE
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
