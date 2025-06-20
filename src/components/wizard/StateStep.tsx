
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface StateStepProps {
  value: string;
  onChange: (value: string) => void;
}

const StateStep: React.FC<StateStepProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  const states = [
    'Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 
    'Kerala', 'Maharashtra', 'Gujarat', 'Rajasthan',
    'Uttar Pradesh', 'Bihar', 'West Bengal', 'Odisha',
    'Madhya Pradesh', 'Chhattisgarh', 'Jharkhand', 'Haryana',
    'Punjab', 'Himachal Pradesh', 'Uttarakhand', 'Delhi',
    'Goa', 'Assam', 'Meghalaya', 'Manipur', 'Tripura',
    'Mizoram', 'Nagaland', 'Arunachal Pradesh', 'Sikkim'
  ];

  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {t('wizard.state.title')}
      </h2>
      <p className="text-gray-600 mb-8">
        {t('wizard.state.subtitle')}
      </p>

      <div className="max-h-80 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {states.map((state) => (
            <Button
              key={state}
              onClick={() => onChange(state)}
              variant={value === state ? "default" : "outline"}
              className={`
                h-16 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md
                ${value === state 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'border-2 hover:border-purple-300 hover:bg-purple-50'
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="font-medium text-sm">{state}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StateStep;
