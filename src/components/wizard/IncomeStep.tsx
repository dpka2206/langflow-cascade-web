
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Coins, DollarSign, CreditCard, Banknote } from 'lucide-react';

interface IncomeStepProps {
  value: string;
  onChange: (value: string) => void;
}

const IncomeStep: React.FC<IncomeStepProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  const options = [
    { id: 'below-2lakh', label: t('wizard.income.below2lakh'), icon: Coins },
    { id: '2-5lakh', label: t('wizard.income.between2and5lakh'), icon: DollarSign },
    { id: '5-10lakh', label: t('wizard.income.between5and10lakh'), icon: CreditCard },
    { id: 'above-10lakh', label: t('wizard.income.above10lakh'), icon: Banknote },
  ];

  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {t('wizard.income.title')}
      </h2>
      <p className="text-gray-600 mb-8">
        {t('wizard.income.subtitle')}
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

export default IncomeStep;
