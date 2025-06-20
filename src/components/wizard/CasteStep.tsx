
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Users, User, Shield, Crown } from 'lucide-react';

interface CasteStepProps {
  value: string;
  onChange: (value: string) => void;
}

const CasteStep: React.FC<CasteStepProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  const options = [
    { id: 'general', label: t('wizard.caste.general'), icon: User },
    { id: 'obc', label: t('wizard.caste.obc'), icon: Users },
    { id: 'sc', label: t('wizard.caste.sc'), icon: Shield },
    { id: 'st', label: t('wizard.caste.st'), icon: Crown },
  ];

  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {t('wizard.caste.title')}
      </h2>
      <p className="text-gray-600 mb-8">
        {t('wizard.caste.subtitle')}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
        {options.map((option) => (
          <Button
            key={option.id}
            onClick={() => onChange(option.id)}
            variant={value === option.id ? "default" : "outline"}
            className={`
              h-20 p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg
              ${value === option.id 
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' 
                : 'border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 text-purple-700'
              }
            `}
          >
            <div className="flex flex-col items-center space-y-2">
              <option.icon className="h-6 w-6" />
              <span className="font-medium">{option.label}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CasteStep;
