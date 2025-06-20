
import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Sprout, 
  Heart, 
  GraduationCap, 
  Home, 
  Briefcase, 
  Users 
} from 'lucide-react';

const CategoriesSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const categories = [
    {
      key: 'category.agriculture',
      categoryValue: 'agriculture',
      icon: Sprout,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      key: 'category.health',
      categoryValue: 'health',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      key: 'category.education',
      categoryValue: 'education',
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      key: 'category.housing',
      categoryValue: 'housing',
      icon: Home,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      key: 'category.employment',
      categoryValue: 'employment',
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      key: 'category.social',
      categoryValue: 'social',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  const handleCategoryClick = (categoryValue: string) => {
    navigate(`/schemes?category=${categoryValue}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('categories.title')}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.key} 
                className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleCategoryClick(category.categoryValue)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`h-8 w-8 ${category.color}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {t(category.key)}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
