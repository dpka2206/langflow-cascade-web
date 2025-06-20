
import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { useAuth } from '../contexts/AuthContext';
import { Globe, Menu, X, User, Settings, LogOut, Home, Search, Info, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
    { key: 'nav.home', href: '/', icon: Home },
    { key: 'nav.schemes', href: '/schemes', icon: Search },
    { key: 'nav.about', href: '/#about', icon: Info },
    { key: 'nav.contact', href: '/#contact', icon: Phone },
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
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-purple-800 to-violet-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm border-b border-purple-700/50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
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

          {/* Enhanced Desktop Navigation */}
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

          {/* Enhanced User Actions and Language Switcher */}
          <div className="flex items-center space-x-3">
            {/* Enhanced User Actions */}
            {user ? (
              <div className="flex items-center space-x-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center space-x-2 backdrop-blur-sm"
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline font-semibold">Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white/95 backdrop-blur-sm border border-purple-200 shadow-xl rounded-xl">
                    {userRole === 'admin' ? (
                      <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer hover:bg-purple-50">
                        <Settings className="h-4 w-4 mr-2" />
                        {t('nav.admin')}
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer hover:bg-purple-50">
                        <User className="h-4 w-4 mr-2" />
                        {t('nav.dashboard')}
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 hover:bg-red-50">
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('nav.signout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link to="/auth">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent border-white/50 text-white hover:bg-white hover:text-purple-900 transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <User className="h-4 w-4 mr-2" />
                  {t('nav.login')}
                </Button>
              </Link>
            )}

            {/* Enhanced Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent border-white/50 text-white hover:bg-white hover:text-purple-900 transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'EN' : 'తె'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-sm border border-purple-200 shadow-xl rounded-xl">
                <DropdownMenuItem 
                  onClick={() => setLanguage('en')}
                  className={`cursor-pointer hover:bg-purple-50 ${language === 'en' ? 'bg-purple-50 font-semibold' : ''}`}
                >
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('te')}
                  className={`cursor-pointer hover:bg-purple-50 ${language === 'te' ? 'bg-purple-50 font-semibold' : ''}`}
                >
                  🇮🇳 తెలుగు
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Enhanced Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:bg-white/10 transition-all duration-300"
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

        {/* Enhanced Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-purple-700/50 backdrop-blur-sm">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className="group w-full text-left px-4 py-3 rounded-xl text-base font-semibold hover:bg-white/10 transition-all duration-300 flex items-center space-x-3"
                >
                  <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>{t(item.key)}</span>
                </button>
              ))}
              {!user && (
                <Link
                  to="/auth"
                  className="group w-full text-left px-4 py-3 rounded-xl text-base font-semibold hover:bg-white/10 transition-all duration-300 flex items-center space-x-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>{t('nav.login')}</span>
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
