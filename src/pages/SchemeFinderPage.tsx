
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PersonalizedView from '@/components/scheme-finder/PersonalizedView';
import RegularView from '@/components/scheme-finder/RegularView';
import { useSchemeData } from '@/hooks/useSchemeData';
import { useSchemeFilters } from '@/hooks/useSchemeFilters';

const SchemeFinderPage = () => {
  const [searchParams] = useSearchParams();
  const { schemes, loading } = useSchemeData();
  
  const isPersonalized = searchParams.get('personalized') === 'true';
  const categoryFromUrl = searchParams.get('category');

  // Initialize filters based on URL params
  const initialFilters = isPersonalized ? {
    age: searchParams.get('age') || 'all',
    caste: searchParams.get('caste') || 'all',
    occupation: searchParams.get('occupation') || 'all',
    gender: searchParams.get('gender') || 'all',
    incomeRange: searchParams.get('income') || 'all',
    state: searchParams.get('state') || 'all',
    category: categoryFromUrl || 'all',
  } : {
    category: categoryFromUrl || 'all',
  };

  const { filters, filteredSchemes, setFilters, handleFilterChange } = useSchemeFilters(schemes, initialFilters);

  // Update filters when URL params change
  useEffect(() => {
    if (isPersonalized) {
      const newFilters = {
        age: searchParams.get('age') || 'all',
        caste: searchParams.get('caste') || 'all',
        occupation: searchParams.get('occupation') || 'all',
        gender: searchParams.get('gender') || 'all',
        incomeRange: searchParams.get('income') || 'all',
        state: searchParams.get('state') || 'all',
        district: 'all',
        category: categoryFromUrl || 'all',
        searchQuery: ''
      };
      setFilters(newFilters);
    } else if (categoryFromUrl) {
      setFilters(prev => ({ ...prev, category: categoryFromUrl }));
    }
  }, [searchParams, isPersonalized, categoryFromUrl, setFilters]);

  const centralSchemes = filteredSchemes.filter(scheme => scheme.scheme_type === 'central');
  const stateSchemes = filteredSchemes.filter(scheme => scheme.scheme_type === 'state');

  console.log('Central schemes count:', centralSchemes.length);
  console.log('State schemes count:', stateSchemes.length);

  return (
    <>
      <Navbar />
      {isPersonalized ? (
        <PersonalizedView
          centralSchemes={centralSchemes}
          stateSchemes={stateSchemes}
          filteredSchemes={filteredSchemes}
          loading={loading}
          searchQuery={filters.searchQuery}
        />
      ) : (
        <RegularView
          centralSchemes={centralSchemes}
          stateSchemes={stateSchemes}
          filteredSchemes={filteredSchemes}
          loading={loading}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )}
    </>
  );
};

export default SchemeFinderPage;
