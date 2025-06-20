
import React from 'react';
import { TranslationProvider } from '../contexts/TranslationContext';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SchemesSection from '../components/SchemesSection';
import CategoriesSection from '../components/CategoriesSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-violet-100/50 relative">
      {/* Squared textured background overlay */}
      <div className="absolute inset-0 textured-squares opacity-20"></div>
      
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <CategoriesSection />
        <SchemesSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
