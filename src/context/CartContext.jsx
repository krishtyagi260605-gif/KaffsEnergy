import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultContext = {
  cartItems: [],
  isCartOpen: false,
  setIsCartOpen: () => {},
  isCheckoutOpen: false,
  setIsCheckoutOpen: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  subtotal: 0,
  discountAmount: 0,
  shippingFee: 0,
  total: 0,
  totalItemCount: 0,
  appliedPromo: {
    code: 'FOUNDER001',
    discountAmount: 40,
    label: 'Founder Delivery Waiver (-₹40)',
  },
  setAppliedPromo: () => {},
};

const CartContext = createContext(defaultContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('kaffs_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Auto-applied Founder Batch 1 ₹40 Delivery Waiver Coupon
  const [appliedPromo, setAppliedPromo] = useState({
    code: 'FOUNDER001',
    discountAmount: 40,
    label: 'Founder Delivery Waiver (-₹40)',
  });

  useEffect(() => {
    try {
      localStorage.setItem('kaffs_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  const addToCart = (product, packSize, flavor, price) => {
    const selectedFlavor = flavor || 'Cool Mint';
    setCartItems((prev) => {
      const itemId = `${product.id}-${packSize}-${selectedFlavor}`;
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          name: "KAFF'S energy",
          caffeine: '40mg',
          packSize: packSize,
          stripCount: packSize, // 5 or 10
          flavor: selectedFlavor, // 'Cool Mint' or 'Coffee Clash'
          price: price,
          quantity: 1,
          badge: packSize === 10 ? 'BEST VALUE' : 'STARTER PACK',
          color: selectedFlavor === 'Coffee Clash' ? 'amber' : 'cyan',
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // Standard delivery is ₹40, fully waived with FOUNDER001 promo coupon
  const shippingFee = cartItems.length > 0 ? 40 : 0;
  const discountAmount = appliedPromo && cartItems.length > 0 ? (appliedPromo.discountAmount || 40) : 0;
  
  // Total keeps your product price intact: ₹229 for 5-pack, ₹399 for 10-pack
  const total = Math.max(0, subtotal + shippingFee - discountAmount);

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        totalItemCount,
        appliedPromo,
        setAppliedPromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context || defaultContext;
}
