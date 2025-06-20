
import React from 'react';
import NavbarLogo from './navbar/NavbarLogo';
import DesktopNavigation from './navbar/DesktopNavigation';
import MobileNavigation from './navbar/MobileNavigation';
import UserActions from './navbar/UserActions';
import LanguageSwitcher from './navbar/LanguageSwitcher';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-900 via-purple-800 to-violet-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm border-b border-purple-700/50">
      <div className="w-full px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <NavbarLogo />
          <DesktopNavigation />

          {/* User Actions and Language Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <UserActions />
            <LanguageSwitcher />
            <MobileNavigation />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
