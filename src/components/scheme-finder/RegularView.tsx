
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SchemeFinderFilters from '@/components/SchemeFinderFilters';
import SchemeFinderResults from '@/components/SchemeFinderResults';
import SchemeChatbot from '@/components/SchemeChatbot';
import { Scheme, FilterState } from '@/types/scheme';

interface RegularViewProps {
  centralSchemes: Scheme[];
  stateSchemes: Scheme[];
  filteredSchemes: Scheme[];
  loading: boolean;
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

const RegularView: React.FC<RegularViewProps> = ({
  centralSchemes,
  stateSchemes,
  filteredSchemes,
  loading,
  filters,
  onFilterChange
}) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('schemeFinder.title')}
          </h1>
          <p className="text-gray-600">
            {t('schemeFinder.subtitle')}
          </p>
          {filters.category !== 'all' && (
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {t(`category.${filters.category}`)} {t('schemeFinder.resultsFound')}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SchemeFinderFilters 
              filters={filters}
              onFilterChange={onFilterChange}
            />
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
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
                  searchQuery={filters.searchQuery}
                />
              </TabsContent>

              <TabsContent value="state" className="space-y-6">
                <SchemeFinderResults 
                  schemes={stateSchemes}
                  loading={loading}
                  searchQuery={filters.searchQuery}
                />
              </TabsContent>

              <TabsContent value="all" className="space-y-6">
                <SchemeFinderResults 
                  schemes={filteredSchemes}
                  loading={loading}
                  searchQuery={filters.searchQuery}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <SchemeChatbot />
    </div>
  );
};

export default RegularView;
