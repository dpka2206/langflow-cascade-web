
import React, { useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, DollarSign, FileText, Play } from 'lucide-react';
import { Scheme } from '@/pages/SchemeFinderPage';
import SchemeDetailModal from '@/components/SchemeDetailModal';

interface SchemeFinderResultsProps {
  schemes: Scheme[];
  loading: boolean;
  searchQuery: string;
}

const SchemeFinderResults: React.FC<SchemeFinderResultsProps> = ({
  schemes,
  loading,
  searchQuery
}) => {
  const { t } = useTranslation();
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'health':
        return <Heart className="h-5 w-5" />;
      case 'employment':
        return <Users className="h-5 w-5" />;
      case 'agriculture':
        return <DollarSign className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'employment':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'agriculture':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'education':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'housing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'social':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (schemes.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {t('schemeFinder.noResults')}
        </h3>
        <p className="text-gray-600">
          {searchQuery 
            ? t('schemeFinder.noResultsSearch') 
            : t('schemeFinder.noResultsFilter')
          }
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <p className="text-gray-600">
          {`${schemes.length} ${t('schemeFinder.resultsFound')}`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map((scheme) => (
          <Card key={scheme.id} className={`hover:shadow-lg transition-shadow duration-300 border-l-4 ${getCategoryColor(scheme.category).includes('border-red') ? 'border-l-red-500' : getCategoryColor(scheme.category).includes('border-purple') ? 'border-l-purple-500' : getCategoryColor(scheme.category).includes('border-green') ? 'border-l-green-500' : getCategoryColor(scheme.category).includes('border-blue') ? 'border-l-blue-500' : getCategoryColor(scheme.category).includes('border-yellow') ? 'border-l-yellow-500' : 'border-l-gray-500'}`}>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2">
                  {scheme.translations?.title || scheme.key}
                </CardTitle>
                <Badge className={`${getCategoryColor(scheme.category)} flex items-center gap-1`}>
                  {getCategoryIcon(scheme.category)}
                  {t(`category.${scheme.category}`)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-gray-600 text-sm line-clamp-3">
                {scheme.translations?.description || t('schemeFinder.noDescription')}
              </p>
              
              {scheme.translations?.benefits && scheme.translations.benefits.length > 0 && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    {scheme.translations.benefits[0]}
                  </span>
                </div>
              )}
              
              {scheme.translations?.eligibility && scheme.translations.eligibility.length > 0 && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600 line-clamp-1">
                    {scheme.translations.eligibility[0]}
                  </span>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex gap-3">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => setSelectedScheme(scheme)}
              >
                <Play className="h-4 w-4 mr-2" />
                {t('schemeFinder.knowMore')}
              </Button>
              <Button variant="outline" className="flex-1">
                {t('common.apply')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedScheme && (
        <SchemeDetailModal
          scheme={selectedScheme}
          isOpen={!!selectedScheme}
          onClose={() => setSelectedScheme(null)}
        />
      )}
    </>
  );
};

export default SchemeFinderResults;
