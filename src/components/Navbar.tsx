
import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { useAuth } from '../contexts/AuthContext';
import { Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { language, setLanguage, t } = useTranslation();
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.schemes', href: '#schemes' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ];

  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-white hover:text-blue-200">
              {t('nav.title')}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors"
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>

          {/* User Actions and Language Switcher */}
          <div className="flex items-center space-x-4">
            {/* User Actions */}
            {user ? (
              <div className="flex items-center space-x-3">
                {userRole === 'admin' ? (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="text-blue-900 border-white hover:bg-blue-800 hover:text-white">
                      {t('admin.title')}
                    </Button>
                  </Link>
                ) : (
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="text-blue-900 border-white hover:bg-blue-800 hover:text-white">
                      {t('nav.dashboard')}
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-white hover:bg-blue-800">
                  {t('nav.signout')}
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="text-blue-900 border-white hover:bg-blue-800 hover:text-white">
                  {t('nav.login')}
                </Button>
              </Link>
            )}

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-blue-900 border-white hover:bg-blue-800 hover:text-white">
                  <Globe className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'English' : 'తెలుగు'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border shadow-lg">
                <DropdownMenuItem 
                  onClick={() => setLanguage('en')}
                  className={`cursor-pointer ${language === 'en' ? 'bg-blue-50' : ''}`}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('te')}
                  className={`cursor-pointer ${language === 'te' ? 'bg-blue-50' : ''}`}
                >
                  తెలుగు
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:bg-blue-800"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-blue-800">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
              {!user && (
                <Link
                  to="/auth"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.login')}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
