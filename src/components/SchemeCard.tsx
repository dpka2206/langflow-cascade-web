
import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  IndianRupee, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';

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

  const categoryColors: Record<string, string> = {
    'Financial': 'bg-green-100 text-green-800 border-green-200',
    'Education': 'bg-blue-100 text-blue-800 border-blue-200',
    'Healthcare': 'bg-red-100 text-red-800 border-red-200',
    'Agriculture': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Employment': 'bg-purple-100 text-purple-800 border-purple-200',
    'Housing': 'bg-orange-100 text-orange-800 border-orange-200',
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Financial': return IndianRupee;
      case 'Education': return Award;
      case 'Healthcare': return CheckCircle;
      default: return Users;
    }
  };

  const CategoryIcon = getCategoryIcon(category);

  return (
    <Card className={`group ${bgColor} hover:shadow-2xl transition-all duration-500 border-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50/50 hover:scale-[1.02] hover:-translate-y-1`}>
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" 
           style={{ padding: '2px' }}>
        <div className="w-full h-full bg-white rounded-2xl"></div>
      </div>
      
      <CardHeader className="relative pb-4">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <Sparkles className="w-full h-full text-blue-500" />
        </div>
        
        <div className="flex justify-between items-start mb-4">
          <CardTitle className="text-xl font-bold text-gray-800 leading-tight group-hover:text-blue-900 transition-colors duration-300">
            {t(titleKey)}
          </CardTitle>
          <Badge 
            variant="secondary" 
            className={`${categoryColors[category] || 'bg-gray-100 text-gray-800'} font-semibold px-3 py-1 rounded-full border flex items-center space-x-1 shadow-sm`}
          >
            <CategoryIcon className="h-3 w-3" />
            <span>{category}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 pb-6">
        <p className="text-gray-600 leading-relaxed text-sm">
          {t(descriptionKey)}
        </p>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
            <div className="flex items-start space-x-3">
              <Users className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide block mb-1">
                  {t('common.eligibility')}
                </span>
                <span className="text-sm text-gray-700 font-medium">
                  {t(eligibilityKey)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
            <div className="flex items-start space-x-3">
              <IndianRupee className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wide block mb-1">
                  {t('common.benefit')}
                </span>
                <span className="text-sm font-bold text-green-700">
                  {t(benefitKey)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-3 pt-2 pb-6">
        <Button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
          <span>{t('common.apply')}</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 font-semibold py-2.5 rounded-xl transition-all duration-300 hover:scale-105"
        >
          {t('common.learnMore')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SchemeCard;
