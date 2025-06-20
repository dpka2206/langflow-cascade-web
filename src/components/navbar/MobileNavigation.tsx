
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const MobileNavigation = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/schemes', label: t('nav.schemes') },
    { href: '/services', label: 'Services' },
    { href: '/personalized-finder', label: t('nav.personalizedFinder') },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-lg font-medium transition-colors hover:text-blue-600 ${
                location.pathname === item.href
                  ? 'text-blue-600'
                  : 'text-gray-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
