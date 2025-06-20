
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
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', 
      icon: IndianRupee,
      gradient: 'from-emerald-500 to-green-500'
    },
    'Education': { 
      bg: 'bg-blue-50 text-blue-700 border-blue-200', 
      icon: GraduationCap,
      gradient: 'from-blue-500 to-indigo-500'
    },
    'Healthcare': { 
      bg: 'bg-rose-50 text-rose-700 border-rose-200', 
      icon: Heart,
      gradient: 'from-rose-500 to-pink-500'
    },
    'Agriculture': { 
      bg: 'bg-green-50 text-green-700 border-green-200', 
      icon: Sparkles,
      gradient: 'from-green-500 to-emerald-500'
    },
    'Employment': { 
      bg: 'bg-purple-50 text-purple-700 border-purple-200', 
      icon: Briefcase,
      gradient: 'from-purple-500 to-indigo-500'
    },
    'Housing': { 
      bg: 'bg-orange-50 text-orange-700 border-orange-200', 
      icon: Home,
      gradient: 'from-orange-500 to-red-500'
    },
  };

  const categoryInfo = categoryColors[category] || { 
    bg: 'bg-gray-50 text-gray-700 border-gray-200', 
    icon: Award,
    gradient: 'from-gray-500 to-slate-500'
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
            <Sparkles className="w-full h-full text-blue-500 transform rotate-12" />
          </div>
          
          <div className="flex justify-between items-start gap-4 mb-4">
            <CardTitle className="text-xl font-bold text-gray-800 leading-tight group-hover:text-blue-900 transition-colors duration-300 flex-1">
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
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 hover:border-blue-200 transition-colors duration-300">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-blue-500 text-white">
                  <Users className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide block mb-2">
                    {t('common.eligibility')}
                  </span>
                  <span className="text-sm text-gray-700 font-medium">
                    {t(eligibilityKey)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-100 hover:border-emerald-200 transition-colors duration-300">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-emerald-500 text-white">
                  <IndianRupee className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide block mb-2">
                    {t('common.benefit')}
                  </span>
                  <span className="text-sm font-bold text-emerald-700">
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
            className="flex-1 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 font-semibold py-3 rounded-2xl transition-all duration-300 hover:scale-105"
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
