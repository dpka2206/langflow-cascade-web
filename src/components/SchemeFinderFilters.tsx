
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { FilterState } from '@/pages/SchemeFinderPage';

interface SchemeFinderFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

const SchemeFinderFilters: React.FC<SchemeFinderFiltersProps> = ({
  filters,
  onFilterChange
}) => {
  const { t } = useTranslation();

  const clearFilters = () => {
    onFilterChange({
      age: 'all',
      caste: 'all',
      occupation: 'all',
      gender: 'all',
      incomeRange: 'all',
      state: 'all',
      district: 'all',
      category: 'all',
      searchQuery: ''
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            {t('schemeFinder.search')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Input
            placeholder={t('schemeFinder.searchPlaceholder')}
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full text-sm sm:text-base"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
            {t('schemeFinder.filters')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 pt-0">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {t('schemeFinder.category')}
            </label>
            <Select value={filters.category} onValueChange={(value) => onFilterChange({ category: value })}>
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue placeholder={t('schemeFinder.selectCategory')} />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="all">{t('schemeFinder.allCategories')}</SelectItem>
                <SelectItem value="agriculture">{t('category.agriculture')}</SelectItem>
                <SelectItem value="health">{t('category.health')}</SelectItem>
                <SelectItem value="education">{t('category.education')}</SelectItem>
                <SelectItem value="housing">{t('category.housing')}</SelectItem>
                <SelectItem value="employment">{t('category.employment')}</SelectItem>
                <SelectItem value="social">{t('category.social')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {t('schemeFinder.ageRange')}
            </label>
            <Select value={filters.age} onValueChange={(value) => onFilterChange({ age: value })}>
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue placeholder={t('schemeFinder.selectAge')} />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="all">{t('schemeFinder.allAges')}</SelectItem>
                <SelectItem value="0-18">0-18 {t('schemeFinder.years')}</SelectItem>
                <SelectItem value="18-35">18-35 {t('schemeFinder.years')}</SelectItem>
                <SelectItem value="35-60">35-60 {t('schemeFinder.years')}</SelectItem>
                <SelectItem value="60+">60+ {t('schemeFinder.years')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {t('schemeFinder.gender')}
            </label>
            <Select value={filters.gender} onValueChange={(value) => onFilterChange({ gender: value })}>
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue placeholder={t('schemeFinder.selectGender')} />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="all">{t('schemeFinder.allGenders')}</SelectItem>
                <SelectItem value="male">{t('schemeFinder.male')}</SelectItem>
                <SelectItem value="female">{t('schemeFinder.female')}</SelectItem>
                <SelectItem value="other">{t('schemeFinder.other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {t('schemeFinder.incomeRange')}
            </label>
            <Select value={filters.incomeRange} onValueChange={(value) => onFilterChange({ incomeRange: value })}>
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue placeholder={t('schemeFinder.selectIncome')} />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="all">{t('schemeFinder.allIncomes')}</SelectItem>
                <SelectItem value="0-50000">₹0 - ₹50,000</SelectItem>
                <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                <SelectItem value="100000-300000">₹1,00,000 - ₹3,00,000</SelectItem>
                <SelectItem value="300000+">₹3,00,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {t('schemeFinder.caste')}
            </label>
            <Select value={filters.caste} onValueChange={(value) => onFilterChange({ caste: value })}>
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue placeholder={t('schemeFinder.selectCaste')} />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="all">{t('schemeFinder.allCastes')}</SelectItem>
                <SelectItem value="general">{t('schemeFinder.general')}</SelectItem>
                <SelectItem value="sc">{t('schemeFinder.sc')}</SelectItem>
                <SelectItem value="st">{t('schemeFinder.st')}</SelectItem>
                <SelectItem value="obc">{t('schemeFinder.obc')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {t('schemeFinder.state')}
            </label>
            <Select value={filters.state} onValueChange={(value) => onFilterChange({ state: value })}>
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue placeholder={t('schemeFinder.selectState')} />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="all">{t('schemeFinder.allStates')}</SelectItem>
                <SelectItem value="telangana">{t('schemeFinder.telangana')}</SelectItem>
                <SelectItem value="andhra-pradesh">{t('schemeFinder.andhraPradesh')}</SelectItem>
                <SelectItem value="karnataka">{t('schemeFinder.karnataka')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="w-full text-sm sm:text-base"
          >
            {t('schemeFinder.clearFilters')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchemeFinderFilters;
