
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  IndianRupee, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Award,
  Heart,
  Briefcase,
  GraduationCap,
  Home
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

  const categoryColors: Record<string, { bg: string; icon: any; gradient: string }> = {
    'Financial': { 
      bg: 'bg-purple-50 text-purple-700 border-purple-200', 
      icon: IndianRupee,
      gradient: 'from-purple-500 to-purple-600'
    },
    'Education': { 
      bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', 
      icon: GraduationCap,
      gradient: 'from-indigo-500 to-indigo-600'
    },
    'Healthcare': { 
      bg: 'bg-purple-50 text-purple-700 border-purple-200', 
      icon: Heart,
      gradient: 'from-purple-500 to-purple-600'
    },
    'Agriculture': { 
      bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', 
      icon: Sparkles,
      gradient: 'from-indigo-500 to-indigo-600'
    },
    'Employment': { 
      bg: 'bg-purple-50 text-purple-700 border-purple-200', 
      icon: Briefcase,
      gradient: 'from-purple-500 to-purple-600'
    },
    'Housing': { 
      bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', 
      icon: Home,
      gradient: 'from-indigo-500 to-indigo-600'
    },
  };

  const categoryInfo = categoryColors[category] || { 
    bg: 'bg-purple-50 text-purple-700 border-purple-200', 
    icon: Award,
    gradient: 'from-purple-500 to-purple-600'
  };
  const CategoryIcon = categoryInfo.icon;

  const handleApplyNow = () => {
    navigate('/schemes', { state: { selectedCategory: category, searchTerm: t(titleKey) } });
  };

  const handleLearnMore = () => {
    navigate('/schemes', { state: { selectedCategory: category } });
  };

  return (
    <Card className="group relative bg-white hover:shadow-2xl transition-all duration-700 border-0 rounded-3xl overflow-hidden hover:scale-[1.02] hover:-translate-y-2">
      {/* Gradient border effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${categoryInfo.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]`}>
        <div className="w-full h-full bg-white rounded-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <CardHeader className="pb-4 p-8">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5 overflow-hidden">
            <Sparkles className="w-full h-full text-purple-500 transform rotate-12" />
          </div>
          
          <div className="flex justify-between items-start gap-4 mb-4">
            <CardTitle className="text-xl font-bold text-gray-800 leading-tight group-hover:text-purple-900 transition-colors duration-300 flex-1">
              {t(titleKey)}
            </CardTitle>
            <Badge className={`${categoryInfo.bg} font-semibold px-4 py-2 rounded-full border-2 flex items-center space-x-2 shadow-lg hover:scale-105 transition-transform duration-300`}>
              <CategoryIcon className="h-4 w-4" />
              <span className="text-sm">{category}</span>
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 pb-6 px-8">
          <p className="text-gray-600 leading-relaxed text-base">
            {t(descriptionKey)}
          </p>
          
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-100 hover:border-purple-200 transition-colors duration-300">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-purple-500 text-white">
                  <Users className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-wide block mb-2">
                    {t('common.eligibility')}
                  </span>
                  <span className="text-sm text-gray-700 font-medium">
                    {t(eligibilityKey)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-100 hover:border-indigo-200 transition-colors duration-300">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-indigo-500 text-white">
                  <IndianRupee className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide block mb-2">
                    {t('common.benefit')}
                  </span>
                  <span className="text-sm font-bold text-indigo-700">
                    {t(benefitKey)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex gap-4 pt-4 pb-8 px-8">
          <Button 
            className={`flex-1 bg-gradient-to-r ${categoryInfo.gradient} hover:shadow-xl text-white font-semibold py-3 rounded-2xl transition-all duration-300 group-hover:scale-105`}
            onClick={handleApplyNow}
          >
            <span>{t('common.apply')}</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 font-semibold py-3 rounded-2xl transition-all duration-300 hover:scale-105"
            onClick={handleLearnMore}
          >
            <span>{t('common.learnMore')}</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default SchemeCard;
