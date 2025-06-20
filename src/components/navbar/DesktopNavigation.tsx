
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';

const DesktopNavigation = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/schemes', label: t('nav.schemes') },
    { href: '/services', label: 'Services' },
    { href: '/personalized-finder', label: t('nav.personalizedFinder') },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`text-sm font-medium transition-colors hover:text-blue-600 ${
            location.pathname === item.href
              ? 'text-blue-600'
              : 'text-gray-700'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
