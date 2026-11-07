import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductFeature from './components/ProductFeature';
import HowItWorks from './components/HowItWorks';
import ComparisonSection from './components/ComparisonSection';
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
      <div className="min-h-screen bg-[#060709] text-slate-100 font-sans selection:bg-cyan-400 selection:text-black">
        {/* Navigation */}
        <Navbar />

        {/* 01 — Hero (POCKET ENERGY. ZERO BOTTLE. + 4 Value Pillars) */}
        <HeroSection />

        {/* 02 — The Strip (Packaging Render, 40mg Caffeine, 0 Sugar, 0 Cal) */}
        <ProductFeature />

        {/* 03 — How It Works (4 Steps: Peel, Place, Dissolve in 3s, Activate) */}
        <HowItWorks />

        {/* 04 — Comparison (KAFF'S vs Energy Drinks vs Cafe Coffee) */}
        <ComparisonSection />

        {/* 05 — Why KAFF'S (Fast Absorption, Clean Focus, Pocket Sized) */}
        <WhyKaffs />

        {/* 06 — Film Section (4K Brand Film Player) */}
        <FilmSection />

        {/* 07 — Shop (Pack of 5 ₹229, Pack of 10 ₹399 with Sensory Flavor Profiles) */}
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
