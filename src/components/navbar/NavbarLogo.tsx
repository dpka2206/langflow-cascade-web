
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';

const NavbarLogo = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-shrink-0">
      <Link 
        to="/" 
        className="text-2xl font-bold text-white hover:text-purple-200 transition-all duration-300 hover:scale-105 flex items-center space-x-3"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-white to-purple-200 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-purple-700 font-bold text-lg">S</span>
        </div>
        <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-bold">
          {t('nav.title')}
        </span>
      </Link>
    </div>
  );
};

export default NavbarLogo;
