import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductFeature from './components/ProductFeature';
import WhyKaffs from './components/WhyKaffs';
import FilmSection from './components/FilmSection';
import ProductShowcase from './components/ProductShowcase';
import BrandClosing from './components/BrandClosing';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import MobileStickyBar from './components/MobileStickyBar';
import AdminPortal from './components/AdminPortal';

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      return path === '/admin' || path === '/admin/' || hash === '#admin';
    }
    return false;
  });

  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      setIsAdminRoute(path === '/admin' || path === '/admin/' || hash === '#admin');
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const handleExitAdmin = () => {
    if (typeof window !== 'undefined' && window.history) {
      window.history.pushState(null, '', '/');
    }
    setIsAdminRoute(false);
  };

  if (isAdminRoute) {
    return <AdminPortal onExit={handleExitAdmin} />;
  }
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#050608] text-slate-100 font-sans selection:bg-cyan-400 selection:text-black">
        {/* Navigation */}
        <Navbar />

        {/* 01 — Hero (Video Background, DAILY POWER-UP, CTAs, Pack Pricing) */}
        <HeroSection />

        {/* 02 — The Product (ENERGY. WITHOUT THE BOTTLE., 40mg, 0 Sugar, 0 Cal, Real Renders) */}
        <ProductFeature />

        {/* 03 — Why KAFF'S (Fast Energy, Sharper Focus, Pocket Ready - Cinematic Type) */}
        <WhyKaffs />

        {/* 04 — Film Section (Full-Width Real Brand Video, SMALL STRIP. BIG ENERGY.) */}
        <FilmSection />

        {/* 05 — Shop (Pack of 5 ₹229, Pack of 10 ₹399 Best Value, Free Shipping on ₹399+) */}
        <ProductShowcase />

        {/* Common Questions */}
        <FAQSection />

        {/* 06 — Final Brand Statement (STAY SHARP. STAY MOVING. / KAFF'S ENERGY.) */}
        <BrandClosing />

        {/* 07 — Footer (Clean, Editorial, FSSAI Licensed & Certified) */}
        <Footer />

        {/* Mobile Floating Quick-Buy Bar */}
        <MobileStickyBar />

        {/* Preserved E-Commerce Modals */}
        <CartDrawer />
        <CheckoutModal />
      </div>
    </CartProvider>
  );
}
