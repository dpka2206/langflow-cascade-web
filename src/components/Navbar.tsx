
import React from 'react';
import NavbarLogo from './navbar/NavbarLogo';
import DesktopNavigation from './navbar/DesktopNavigation';
import MobileNavigation from './navbar/MobileNavigation';
import UserActions from './navbar/UserActions';
import LanguageSwitcher from './navbar/LanguageSwitcher';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-lg border-b border-purple-700/30">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavbarLogo />
          </div>

          {/* Desktop Navigation - Hidden on mobile and tablet */}
          <div className="flex-1 flex justify-center">
            <DesktopNavigation />
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* User Actions - Hidden on small screens */}
            <div className="hidden sm:block">
              <UserActions />
            </div>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Mobile Navigation */}
            <MobileNavigation />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
