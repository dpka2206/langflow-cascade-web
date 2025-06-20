
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-transparent border-white/50 text-white hover:bg-white hover:text-purple-900 transition-all duration-300 hover:scale-105 font-semibold"
        >
          <Globe className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden xs:inline sm:inline text-xs sm:text-sm">
            {language === 'en' ? 'EN' : 'తె'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white/95 backdrop-blur-sm border border-purple-200 shadow-xl rounded-xl z-50">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className={`cursor-pointer hover:bg-purple-50 text-sm sm:text-base ${language === 'en' ? 'bg-purple-50 font-semibold' : ''}`}
        >
          🇺🇸 English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('te')}
          className={`cursor-pointer hover:bg-purple-50 text-sm sm:text-base ${language === 'te' ? 'bg-purple-50 font-semibold' : ''}`}
        >
          🇮🇳 తెలుగు
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
