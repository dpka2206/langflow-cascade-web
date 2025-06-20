
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const categoryColors: Record<string, string> = {
    'Financial': 'bg-purple-100 text-purple-800 border-purple-200',
    'Education': 'bg-purple-100 text-purple-800 border-purple-200',
    'Healthcare': 'bg-purple-100 text-purple-800 border-purple-200',
    'Agriculture': 'bg-purple-100 text-purple-800 border-purple-200',
    'Employment': 'bg-purple-100 text-purple-800 border-purple-200',
    'Housing': 'bg-purple-100 text-purple-800 border-purple-200',
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

  const handleApplyNow = () => {
    // Navigate to schemes page with filter for this specific scheme type
    navigate('/schemes', { state: { selectedCategory: category, searchTerm: t(titleKey) } });
  };

  const handleLearnMore = () => {
    // Navigate to schemes page to view more details
    navigate('/schemes', { state: { selectedCategory: category } });
  };

  return (
    <Card className={`group ${bgColor} hover:shadow-2xl transition-all duration-500 border-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50/50 hover:scale-[1.02] hover:-translate-y-1`}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" 
           style={{ padding: '2px' }}>
        <div className="w-full h-full bg-white rounded-2xl"></div>
      </div>
      
      <CardHeader className="relative pb-3 sm:pb-4 p-4 sm:p-6">
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-5">
          <Sparkles className="w-full h-full text-purple-500" />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-3 sm:mb-4">
          <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 leading-tight group-hover:text-purple-900 transition-colors duration-300 flex-1 pr-0 sm:pr-4">
            {t(titleKey)}
          </CardTitle>
          <Badge 
            variant="secondary" 
            className={`${categoryColors[category] || 'bg-purple-100 text-purple-800'} font-semibold px-2 sm:px-3 py-1 rounded-full border flex items-center space-x-1 shadow-sm self-start sm:self-auto shrink-0`}
          >
            <CategoryIcon className="h-3 w-3" />
            <span className="text-xs sm:text-sm">{category}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 sm:space-y-6 pb-4 sm:pb-6 px-4 sm:px-6">
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          {t(descriptionKey)}
        </p>
        
        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-50 border border-purple-100">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <Users className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide block mb-1">
                  {t('common.eligibility')}
                </span>
                <span className="text-sm text-gray-700 font-medium break-words">
                  {t(eligibilityKey)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-50 border border-purple-100">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <IndianRupee className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide block mb-1">
                  {t('common.benefit')}
                </span>
                <span className="text-sm font-bold text-purple-700 break-words">
                  {t(benefitKey)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 pb-4 sm:pb-6 px-4 sm:px-6">
        <Button 
          className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          onClick={handleApplyNow}
        >
          <span className="text-sm sm:text-base">{t('common.apply')}</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
        <Button 
          variant="outline" 
          className="w-full sm:flex-1 border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 font-semibold py-2.5 rounded-xl transition-all duration-300 hover:scale-105 text-purple-700"
          onClick={handleLearnMore}
        >
          <span className="text-sm sm:text-base">{t('common.learnMore')}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SchemeCard;
