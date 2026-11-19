import React, { createContext, useContext, useState, useEffect } from 'react';

// Early Black Friday Sale: flat 15% off on all orders — applied automatically
const SALE_DISCOUNT_PERCENT = 15;

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
  appliedCoupon: null,
  couponDiscount: 0,
  couponError: '',
  applyCoupon: () => {},
  removeCoupon: () => {},
  subtotal: 0,
  saleDiscountAmount: 0,
  discountAmount: 0,
  shippingFee: 0,
  total: 0,
  totalItemCount: 0,
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
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      return localStorage.getItem('kaffs_applied_coupon') || null;
    } catch (e) {
      return null;
    }
  });
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('kaffs_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('kaffs_applied_coupon', appliedCoupon);
      } else {
        localStorage.removeItem('kaffs_applied_coupon');
      }
    } catch (e) {}
  }, [appliedCoupon]);

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
          stripCount: packSize,
          flavor: selectedFlavor,
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

  // Subtotal from cart items
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // Free delivery across India
  const shippingFee = 0;

  // Auto-applied 15% Early Black Friday sale discount
  const saleDiscountAmount = cartItems.length > 0 ? Math.round(subtotal * (SALE_DISCOUNT_PERCENT / 100)) : 0;

  // Coupon evaluation
  let couponDiscount = 0;
  if (appliedCoupon === 'founder001') {
    // Check if founder001 makes 1 unit of Pack of 5 100% free
    const pack5Item = cartItems.find((item) => item.packSize === 5);
    if (pack5Item) {
      // In Early Black Friday Sale, 1 unit of Pack of 5 is ₹195 (sale price) or full price ₹229
      // We deduct the post-sale price of 1 unit of Pack of 5 so that if only 1 unit is in cart, total is exactly ₹0
      const pack5SalePrice = pack5Item.price - Math.round(pack5Item.price * (SALE_DISCOUNT_PERCENT / 100));
      couponDiscount = pack5SalePrice;
    }
  }

  const applyCoupon = async (code) => {
    setCouponError('');
    if (!code || !code.trim()) {
      setCouponError('Please enter a coupon code.');
      return false;
    }
    const cleanCode = code.trim().toLowerCase();

    if (cleanCode === 'founder001') {
      // Check single-use claim status in localStorage and server
      const localClaimed = localStorage.getItem('kaffs_coupon_founder001_claimed');
      if (localClaimed === 'true') {
        setCouponError('This coupon (founder001) has already been claimed and can only be used once.');
        return false;
      }

      // Check server API if reachable
      try {
        const res = await fetch(`/api/check-coupon?code=founder001`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.claimed) {
            localStorage.setItem('kaffs_coupon_founder001_claimed', 'true');
            setCouponError('This coupon (founder001) has already been claimed and can only be used once.');
            return false;
          }
        }
      } catch (e) {
        // Fallback to local check
      }

      // Check if Pack of 5 is in the bag
      const hasPack5 = cartItems.some((i) => i.packSize === 5);
      if (!hasPack5) {
        // Auto add 1 unit of Pack of 5 Cool Mint for convenience
        addToCart(
          {
            id: 'kaffs-5',
            name: "KAFF'S energy",
            caffeine: '40mg',
            badge: 'STARTER PACK',
            color: 'cyan',
          },
          5,
          'Cool Mint',
          229
        );
      }

      setAppliedCoupon('founder001');
      return true;
    } else {
      setCouponError('Invalid coupon code. Please check and try again.');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  // Total discounts combined
  const discountAmount = saleDiscountAmount + couponDiscount;
  
  // Final total payable (never negative)
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
        appliedCoupon,
        couponDiscount,
        couponError,
        applyCoupon,
        removeCoupon,
        subtotal,
        saleDiscountAmount,
        discountAmount,
        shippingFee,
        total,
        totalItemCount,
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
