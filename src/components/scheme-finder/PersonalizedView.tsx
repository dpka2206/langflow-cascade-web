
import React, { useEffect } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SchemeFinderResults from '@/components/SchemeFinderResults';
import SchemeChatbot from '@/components/SchemeChatbot';
import { usePersonalizedSchemes } from '@/hooks/usePersonalizedSchemes';
import { useSearchParams } from 'react-router-dom';

interface PersonalizedViewProps {
  centralSchemes: any[];
  stateSchemes: any[];
  filteredSchemes: any[];
  loading: boolean;
  searchQuery: string;
}

const PersonalizedView: React.FC<PersonalizedViewProps> = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { schemes: personalizedSchemes, loading, fetchPersonalizedSchemes } = usePersonalizedSchemes();

  useEffect(() => {
    // Get user criteria from URL params
    const criteria = {
      gender: searchParams.get('gender') || '',
      age: searchParams.get('age') || '',
      occupation: searchParams.get('occupation') || '',
      income: searchParams.get('income') || '',
      caste: searchParams.get('caste') || '',
      state: searchParams.get('state') || ''
    };

    // Only fetch if we have criteria
    if (Object.values(criteria).some(value => value && value !== '')) {
      fetchPersonalizedSchemes(criteria);
    } else {
      fetchPersonalizedSchemes();
    }
  }, [searchParams, fetchPersonalizedSchemes]);

  // Filter schemes by type
  const centralSchemes = personalizedSchemes.filter(scheme => 
    scheme.scheme_type === 'central'
  );
  
  const stateSchemes = personalizedSchemes.filter(scheme => 
    scheme.scheme_type === 'state' || scheme.scheme_type === 'external'
  );

  console.log('Personalized schemes:', personalizedSchemes);
  console.log('Central schemes:', centralSchemes);
  console.log('State schemes:', stateSchemes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-lavender-50 to-mint-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('schemeFinder.personalizedResults')}
          </h1>
          <p className="text-gray-600">
            {t('schemeFinder.personalizedSubtitle')}
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="central" className="text-sm font-medium">
              {t('schemeFinder.centralSchemes')} ({centralSchemes.length})
            </TabsTrigger>
            <TabsTrigger value="state" className="text-sm font-medium">
              {t('schemeFinder.stateSchemes')} ({stateSchemes.length})
            </TabsTrigger>
            <TabsTrigger value="all" className="text-sm font-medium">
              {t('schemeFinder.allSchemes')} ({personalizedSchemes.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="central" className="space-y-6">
            <SchemeFinderResults 
              schemes={centralSchemes}
              loading={loading}
              searchQuery=""
            />
          </TabsContent>

          <TabsContent value="state" className="space-y-6">
            <SchemeFinderResults 
              schemes={stateSchemes}
              loading={loading}
              searchQuery=""
            />
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <SchemeFinderResults 
              schemes={personalizedSchemes}
              loading={loading}
              searchQuery=""
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <SchemeChatbot />
    </div>
  );
};

export default PersonalizedView;
