
import React from 'react';
import { TranslationProvider } from '../contexts/TranslationContext';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SchemesSection from '../components/SchemesSection';
import CategoriesSection from '../components/CategoriesSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <TranslationProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <CategoriesSection />
        <SchemesSection />
        <Footer />
      </div>
    </TranslationProvider>
  );
};

export default Index;
