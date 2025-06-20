
import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        
        return (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                ${isCompleted 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : isCurrent 
                    ? 'bg-purple-600 text-white shadow-lg ring-4 ring-purple-200' 
                    : 'bg-gray-200 text-gray-500'
                }
              `}
            >
              {isCompleted ? (
                <Check className="h-6 w-6" />
              ) : (
                stepNumber
              )}
            </div>
            
            {stepNumber < totalSteps && (
              <div
                className={`
                  w-8 h-1 mx-2 rounded-full transition-all duration-300
                  ${stepNumber < currentStep ? 'bg-green-500' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
