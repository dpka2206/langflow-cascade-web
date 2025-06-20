
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Home, Search, Info, Phone, UserCog, Bell, User } from 'lucide-react';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { key: 'nav.home', href: '/', icon: Home },
    { key: 'nav.schemes', href: '/schemes', icon: Search },
    { key: 'nav.personalizedSchemes', href: '/personalized-finder', icon: UserCog },
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
    onClose();
  };

  if (!isOpen) return null;

  return (
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
        {user && (
          <button
            onClick={() => {
              navigate('/notifications');
              onClose();
            }}
            className="group w-full text-left px-4 py-3 rounded-xl text-base font-semibold hover:bg-white/10 transition-all duration-300 flex items-center space-x-3"
          >
            <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Notifications</span>
          </button>
        )}
        {!user && (
          <Link
            to="/auth"
            className="group w-full text-left px-4 py-3 rounded-xl text-base font-semibold hover:bg-white/10 transition-all duration-300 flex items-center space-x-3"
            onClick={onClose}
          >
            <User className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <span>{t('nav.login')}</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileNavigation;
