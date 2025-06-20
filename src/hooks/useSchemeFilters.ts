
import { useState, useEffect } from 'react';
import { FilterState, Scheme } from '@/types/scheme';

export const useSchemeFilters = (schemes: Scheme[], initialFilters?: Partial<FilterState>) => {
  const [filters, setFilters] = useState<FilterState>({
    age: 'all',
    caste: 'all',
    occupation: 'all',
    gender: 'all',
    incomeRange: 'all',
    state: 'all',
    district: 'all',
    category: 'all',
    searchQuery: '',
    ...initialFilters
  });
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([]);

  const applyFilters = () => {
    let filtered = [...schemes];

    console.log('Applying filters to schemes:', schemes.length);
    console.log('Current filters:', filters);

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
    if (filters.category && filters.category !== 'all') {
      console.log('Filtering by category:', filters.category);
      filtered = filtered.filter(scheme => {
        console.log('Scheme category:', scheme.category, 'Filter category:', filters.category);
        return scheme.category === filters.category;
      });
    }

    console.log('Filtered schemes:', filtered.length);
    setFilteredSchemes(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, schemes]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return { filters, filteredSchemes, setFilters, handleFilterChange };
};
