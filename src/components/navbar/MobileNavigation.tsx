
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const MobileNavigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/schemes', label: 'Schemes' },
    { href: '/services', label: 'Services' },
    { href: '/personalized-finder', label: 'Personalized Finder' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-white hover:bg-white/10 transition-colors"
        >
          <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[280px] sm:w-[350px] bg-gradient-to-b from-purple-900 to-violet-900 border-l border-purple-700/50"
      >
        <div className="flex items-center justify-between mb-8 pt-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">Menu</h2>
        </div>
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={handleLinkClick}
              className={`text-base sm:text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-white/10 hover:scale-105 ${
                location.pathname === item.href
                  ? 'text-blue-300 bg-white/10 font-semibold'
                  : 'text-white/90'
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
