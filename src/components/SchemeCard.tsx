
import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SchemeCardProps {
  id: string;
  titleKey: string;
  descriptionKey: string;
  eligibilityKey: string;
  benefitKey: string;
  category: string;
  bgColor?: string;
}

const SchemeCard: React.FC<SchemeCardProps> = ({
  id,
  titleKey,
  descriptionKey,
  eligibilityKey,
  benefitKey,
  category,
  bgColor = 'bg-white'
}) => {
  const { t } = useTranslation();

  return (
    <Card className={`${bgColor} hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-gray-800">
            {t(titleKey)}
          </CardTitle>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-600 leading-relaxed">
          {t(descriptionKey)}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              {t('common.eligibility')}:
            </span>
            <span className="text-sm text-gray-700">
              {t(eligibilityKey)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              {t('common.benefit')}:
            </span>
            <span className="text-sm font-semibold text-green-600">
              {t(benefitKey)}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-3">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          {t('common.apply')}
        </Button>
        <Button variant="outline" className="flex-1">
          {t('common.learnMore')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SchemeCard;
