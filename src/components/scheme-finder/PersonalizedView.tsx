
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SchemeFinderResults from '@/components/SchemeFinderResults';
import SchemeChatbot from '@/components/SchemeChatbot';
import { Scheme } from '@/types/scheme';

interface PersonalizedViewProps {
  centralSchemes: Scheme[];
  stateSchemes: Scheme[];
  filteredSchemes: Scheme[];
  loading: boolean;
  searchQuery: string;
}

const PersonalizedView: React.FC<PersonalizedViewProps> = ({
  centralSchemes,
  stateSchemes,
  filteredSchemes,
  loading,
  searchQuery
}) => {
  const { t } = useTranslation();

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
              {t('schemeFinder.allSchemes')} ({filteredSchemes.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="central" className="space-y-6">
            <SchemeFinderResults 
              schemes={centralSchemes}
              loading={loading}
              searchQuery={searchQuery}
            />
          </TabsContent>

          <TabsContent value="state" className="space-y-6">
            <SchemeFinderResults 
              schemes={stateSchemes}
              loading={loading}
              searchQuery={searchQuery}
            />
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <SchemeFinderResults 
              schemes={filteredSchemes}
              loading={loading}
              searchQuery={searchQuery}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <SchemeChatbot />
    </div>
  );
};

export default PersonalizedView;
