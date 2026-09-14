import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

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
  const [appliedPromo, setAppliedPromo] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('kaffs_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  const addToCart = (product, packSize, flavor, price) => {
    setCartItems((prev) => {
      const itemId = `${product.id}-${packSize}-${flavor}`;
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
          flavor: flavor || 'Cool Mint',
          price: price,
          quantity: 1,
          badge: packSize === 10 ? 'BEST VALUE • FREE SHIPPING' : 'STARTER PACK',
          color: 'cyan',
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
    setAppliedPromo(null);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round(subtotal * (appliedPromo.discountPercent / 100)) : 0;
  // Free shipping on orders of ₹399 or higher
  const shippingFee = subtotal >= 399 || cartItems.length === 0 ? 0 : 49;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

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
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
