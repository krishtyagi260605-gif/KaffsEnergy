import React from 'react';
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

export default function App() {
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
