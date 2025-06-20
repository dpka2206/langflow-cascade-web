
import React, { useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Users, 
  FileText, 
  Play, 
  Briefcase, 
  Wheat, 
  GraduationCap, 
  Home, 
  HandHeart,
  Gift,
  UserCheck
} from 'lucide-react';
import { Scheme } from '@/pages/SchemeFinderPage';
import SchemeDetailModal from '@/components/SchemeDetailModal';
import SchemeApplicationForm from '@/components/SchemeApplicationForm';

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
  const [applicationScheme, setApplicationScheme] = useState<Scheme | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'health':
        return <Heart className="h-5 w-5" />;
      case 'employment':
        return <Briefcase className="h-5 w-5" />;
      case 'agriculture':
        return <Wheat className="h-5 w-5" />;
      case 'education':
        return <GraduationCap className="h-5 w-5" />;
      case 'housing':
        return <Home className="h-5 w-5" />;
      case 'social':
        return <HandHeart className="h-5 w-5" />;
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
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBorderColor = (category: string) => {
    switch (category) {
      case 'health':
        return 'border-l-red-500';
      case 'employment':
        return 'border-l-purple-500';
      case 'agriculture':
        return 'border-l-green-500';
      case 'education':
        return 'border-l-blue-500';
      case 'housing':
        return 'border-l-yellow-500';
      case 'social':
        return 'border-l-pink-500';
      default:
        return 'border-l-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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
          <Card 
            key={scheme.id} 
            className={`hover:shadow-lg transition-all duration-300 border-l-4 ${getBorderColor(scheme.category)} hover:scale-[1.02] bg-white`}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2 gap-3">
                <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2 flex-1 leading-tight">
                  {scheme.translations?.title || scheme.key}
                </CardTitle>
                <Badge className={`${getCategoryColor(scheme.category)} flex items-center gap-1 shrink-0`}>
                  {getCategoryIcon(scheme.category)}
                  <span className="text-xs font-medium">
                    {t(`category.${scheme.category}`)}
                  </span>
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3 pb-4">
              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                {scheme.translations?.description || t('schemeFinder.noDescription')}
              </p>
              
              {scheme.translations?.benefits && scheme.translations.benefits.length > 0 && (
                <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-100">
                  <Gift className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm font-medium text-green-700 line-clamp-2">
                    {scheme.translations.benefits[0]}
                  </span>
                </div>
              )}
              
              {scheme.translations?.eligibility && scheme.translations.eligibility.length > 0 && (
                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <UserCheck className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-blue-700 line-clamp-2">
                    {scheme.translations.eligibility[0]}
                  </span>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex gap-3 pt-2">
              <Button 
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium"
                onClick={() => setSelectedScheme(scheme)}
              >
                <Play className="h-4 w-4 mr-2" />
                <span className="text-sm">{t('schemeFinder.knowMore')}</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-purple-200 hover:bg-purple-50 hover:border-purple-300 text-purple-700 font-medium"
                onClick={() => setApplicationScheme(scheme)}
              >
                <span className="text-sm">{t('common.apply')}</span>
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

      {applicationScheme && (
        <SchemeApplicationForm
          scheme={applicationScheme}
          isOpen={!!applicationScheme}
          onClose={() => setApplicationScheme(null)}
        />
      )}
    </>
  );
};

export default SchemeFinderResults;
