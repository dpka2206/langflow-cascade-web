
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import Navbar from '@/components/Navbar';
import SchemeFinderFilters from '@/components/SchemeFinderFilters';
import SchemeFinderResults from '@/components/SchemeFinderResults';
import { supabase } from '@/integrations/supabase/client';

export interface Scheme {
  id: string;
  key: string;
  category: string;
  status: string;
  created_at: string;
  translations?: {
    title: string;
    description: string;
    benefits: string[];
    eligibility: string[];
    documents: string[];
  };
}

export interface FilterState {
  age: string;
  caste: string;
  occupation: string;
  gender: string;
  incomeRange: string;
  state: string;
  district: string;
  category: string;
  searchQuery: string;
}

const SchemeFinderPage = () => {
  const { t, language } = useTranslation();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    age: '',
    caste: '',
    occupation: '',
    gender: '',
    incomeRange: '',
    state: '',
    district: '',
    category: '',
    searchQuery: ''
  });

  useEffect(() => {
    fetchSchemes();
  }, [language]);

  useEffect(() => {
    applyFilters();
  }, [filters, schemes]);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const { data: schemesData, error: schemesError } = await supabase
        .from('schemes')
        .select('*')
        .eq('status', 'active');

      if (schemesError) throw schemesError;

      const { data: translationsData, error: translationsError } = await supabase
        .from('scheme_translations')
        .select('*')
        .eq('language', language);

      if (translationsError) throw translationsError;

      const schemesWithTranslations = schemesData?.map(scheme => {
        const translation = translationsData?.find(t => t.scheme_id === scheme.id);
        return {
          ...scheme,
          translations: translation ? {
            title: translation.title,
            description: translation.description,
            benefits: translation.benefits || [],
            eligibility: translation.eligibility || [],
            documents: translation.documents || []
          } : undefined
        };
      }) || [];

      setSchemes(schemesWithTranslations);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...schemes];

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(scheme => 
        scheme.translations?.title.toLowerCase().includes(query) ||
        scheme.translations?.description.toLowerCase().includes(query) ||
        scheme.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(scheme => scheme.category === filters.category);
    }

    setFilteredSchemes(filtered);
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('schemeFinder.title')}
          </h1>
          <p className="text-gray-600">
            {t('schemeFinder.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SchemeFinderFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          <div className="lg:col-span-3">
            <SchemeFinderResults 
              schemes={filteredSchemes}
              loading={loading}
              searchQuery={filters.searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeFinderPage;
