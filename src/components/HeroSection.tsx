
import React, { useState } from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { Search, Sparkles, ArrowRight, Users, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/schemes?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/schemes');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const stats = [
    { icon: Users, value: '50,000+', label: 'Citizens Served' },
    { icon: Award, value: '1,200+', label: 'Active Schemes' },
    { icon: Clock, value: '24/7', label: 'Support Available' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-50 via-white to-mint-50 text-gray-800 overflow-hidden">
      {/* Subtle Paper Grain Texture Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(0,0,0,0.05)_49%,rgba(0,0,0,0.05)_51%,transparent_52%)] bg-[length:16px_16px]"></div>
      </div>

      {/* Floating Translucent Gradient Squares */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 animate-pulse">
        <div className="absolute top-16 right-16 w-48 h-48 bg-gradient-to-br from-sky-400 to-blue-300 rounded-3xl rotate-12 blur-sm"></div>
        <div className="absolute top-32 right-8 w-32 h-32 bg-gradient-to-br from-lavender-400 to-purple-300 rounded-2xl -rotate-6 blur-sm"></div>
        <div className="absolute top-8 right-40 w-24 h-24 bg-gradient-to-br from-mint-400 to-green-300 rounded-xl rotate-45 blur-sm"></div>
      </div>

      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10 animate-pulse delay-1000">
        <div className="absolute bottom-16 left-16 w-48 h-48 bg-gradient-to-br from-mint-400 to-emerald-300 rounded-3xl -rotate-12 blur-sm"></div>
        <div className="absolute bottom-32 left-8 w-32 h-32 bg-gradient-to-br from-sky-400 to-cyan-300 rounded-2xl rotate-6 blur-sm"></div>
        <div className="absolute bottom-8 left-40 w-24 h-24 bg-gradient-to-br from-lavender-400 to-violet-300 rounded-xl -rotate-45 blur-sm"></div>
      </div>

      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 via-lavender-100/30 to-mint-100/50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {/* Enhanced Hero Badge */}
          <div className="inline-flex items-center px-8 py-4 rounded-full bg-white/60 backdrop-blur-md border border-white/40 mb-8 animate-fade-in shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/70">
            <Sparkles className="h-5 w-5 mr-3 text-sky-600 animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-gray-700">Empowering Citizens Through Digital Innovation</span>
          </div>

          {/* Hero Title with Enhanced Styling */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-sky-600 via-purple-600 to-mint-600 bg-clip-text text-transparent drop-shadow-sm">
              {t('hero.title')}
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl mb-16 max-w-4xl mx-auto leading-relaxed text-gray-600 animate-fade-in-delay font-medium">
            {t('hero.subtitle')}
          </p>
          
          {/* Premium Search Bar with Soft Styling */}
          <div className="max-w-4xl mx-auto mb-20 animate-fade-in-delay">
            <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-3xl bg-white/70 backdrop-blur-md border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/80">
              <div className="flex-1 relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 h-6 w-6" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('hero.search.placeholder')}
                  className="pl-14 py-6 text-gray-700 placeholder-gray-500 bg-transparent border-0 rounded-2xl shadow-none focus:ring-2 focus:ring-sky-300/50 text-lg font-medium"
                />
              </div>
              <Button 
                onClick={handleSearch}
                size="lg" 
                className="bg-gradient-to-r from-sky-500 to-mint-500 hover:from-sky-600 hover:to-mint-600 text-white px-12 py-6 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border-0"
              >
                <span className="text-lg">Check My Eligibility</span>
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>

          {/* Enhanced Stats Section with Soft Glassmorphism Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in-delay">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-8 rounded-3xl bg-white/50 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/60 hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-sky-100 to-mint-100 flex items-center justify-center group-hover:from-sky-200 group-hover:to-mint-200 transition-all duration-300 backdrop-blur-sm">
                  <stat.icon className="h-8 w-8 text-sky-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-4xl font-bold mb-3 bg-gradient-to-r from-sky-600 to-mint-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Soft Wave Pattern at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-24 fill-current text-white/80">
          <path d="M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,144C672,128,768,128,864,144C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
