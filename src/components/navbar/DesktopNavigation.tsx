
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DesktopNavigation = () => {
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/schemes', label: 'Schemes' },
    { href: '/services', label: 'Services' },
    { href: '/personalized-finder', label: 'Personalized Finder' },
  ];

  return (
    <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`text-sm xl:text-base font-medium transition-all duration-300 hover:text-blue-300 hover:scale-105 ${
            location.pathname === item.href
              ? 'text-blue-300 font-semibold'
              : 'text-white/90'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
