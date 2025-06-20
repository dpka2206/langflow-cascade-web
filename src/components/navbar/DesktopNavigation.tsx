
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { useNavigate } from 'react-router-dom';
import { Home, Search, UserCog } from 'lucide-react';

const DesktopNavigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navItems = [
    { key: 'nav.home', href: '/', icon: Home },
    { key: 'nav.schemes', href: '/schemes', icon: Search },
    { key: 'nav.personalizedSchemes', href: '/personalized-finder', icon: UserCog },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const hash = href.substring(2);
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
  };

  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-2">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => handleNavClick(item.href)}
            className="group relative px-5 py-3 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all duration-300 cursor-pointer flex items-center space-x-2 hover:scale-105 backdrop-blur-sm"
          >
            <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
            <span>{t(item.key)}</span>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 rounded-full"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DesktopNavigation;
