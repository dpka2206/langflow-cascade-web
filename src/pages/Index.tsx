
import React from 'react';
import { TranslationProvider } from '../contexts/TranslationContext';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SchemesSection from '../components/SchemesSection';
import CategoriesSection from '../components/CategoriesSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-violet-100/50">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <SchemesSection />
      <Footer />
    </div>
  );
};

export default Index;
