
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import SchemesSection from "@/components/SchemesSection";
import ServicesSection from "@/components/ServicesSection";
import PersonalizedSchemeFinder from "@/components/PersonalizedSchemeFinder";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <SchemesSection />
      <ServicesSection />
      <PersonalizedSchemeFinder />
      <Footer />
    </div>
  );
};

export default Index;
