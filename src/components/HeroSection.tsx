
import React, { useState } from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { Search, Sparkles, ArrowRight, Users, Award, Clock, Star } from 'lucide-react';
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
    <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white overflow-hidden min-h-screen flex items-center">
      {/* Textured background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='0' cy='30' r='4'/%3E%3Ccircle cx='60' cy='30' r='4'/%3E%3Ccircle cx='30' cy='0' r='4'/%3E%3Ccircle cx='30' cy='60' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-purple-300/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <Star className="h-2 w-2 text-white/20" />
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-8 animate-fade-in shadow-2xl">
          <Sparkles className="h-5 w-5 mr-3 text-purple-200 animate-pulse" />
          <span className="text-sm font-semibold tracking-wide text-purple-100">✨ Empowering Citizens Through Digital Innovation</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in">
          <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
            {t('hero.title')}
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-16 max-w-4xl mx-auto leading-relaxed text-purple-100 animate-fade-in-delay font-light">
          {t('hero.subtitle')}
        </p>
        
        <div className="max-w-4xl mx-auto mb-20 animate-fade-in-delay">
          <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white/15">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/80 h-6 w-6" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('hero.search.placeholder')}
                className="pl-14 py-6 text-lg text-white placeholder-white/70 bg-transparent border-0 rounded-2xl shadow-none focus:ring-2 focus:ring-purple-300/50 font-medium"
              />
            </div>
            <Button 
              onClick={handleSearch}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-10 py-6 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group border-0 text-lg"
            >
              <span>{t('hero.search.button')}</span>
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in-delay">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 group hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-2xl"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm shadow-lg">
                <stat.icon className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold mb-3 text-white">
                {stat.value}
              </div>
              <div className="text-purple-200 font-semibold text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-32 fill-current text-white">
          <path d="M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,144C672,128,768,128,864,144C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
