
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
    <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-violet-900 text-white overflow-hidden">
      <div className="absolute inset-0 textured-squares"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-purple-700/85 to-violet-900/90"></div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-96 h-48 sm:h-96 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-40 sm:w-80 h-40 sm:h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-16 sm:-bottom-32 left-20 sm:left-40 w-36 sm:w-72 h-36 sm:h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32">
        <div className="text-center">
          <div className="inline-flex items-center px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 mb-6 sm:mb-8 animate-fade-in shadow-lg">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-yellow-300 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">Empowering Citizens Through Digital Innovation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 leading-tight animate-fade-in px-2 sm:px-0">
            <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent drop-shadow-sm">
              {t('hero.title')}
            </span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl mb-10 sm:mb-16 max-w-4xl mx-auto leading-relaxed text-purple-100 animate-fade-in-delay font-medium px-4 sm:px-0">
            {t('hero.subtitle')}
          </p>
          
          <div className="max-w-4xl mx-auto mb-12 sm:mb-20 animate-fade-in-delay px-3 sm:px-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 p-2 sm:p-3 rounded-2xl sm:rounded-3xl bg-white/15 backdrop-blur-md border border-white/25 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex-1 relative">
                <Search className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-white/80 h-5 w-5 sm:h-6 sm:w-6" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('hero.search.placeholder')}
                  className="pl-10 sm:pl-14 py-3 sm:py-5 text-white placeholder-white/70 bg-transparent border-0 rounded-xl sm:rounded-2xl shadow-none focus:ring-2 focus:ring-white/30 text-base sm:text-lg font-medium"
                />
              </div>
              <Button 
                onClick={handleSearch}
                size="lg" 
                className="bg-gradient-to-r from-white to-purple-50 hover:from-purple-50 hover:to-white text-purple-700 px-6 sm:px-10 py-3 sm:py-5 rounded-xl sm:rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group border-0 w-full sm:w-auto"
              >
                <span className="text-base sm:text-lg">{t('hero.search.button')}</span>
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto animate-fade-in-delay px-3 sm:px-0">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4 sm:p-8 rounded-2xl sm:rounded-3xl glossy-card group"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 backdrop-blur-sm">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-purple-200 font-semibold text-sm sm:text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-16 sm:h-24 fill-current text-white">
          <path d="M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,144C672,128,768,128,864,144C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
