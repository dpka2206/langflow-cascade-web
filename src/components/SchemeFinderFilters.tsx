
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
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            {t('schemeFinder.search')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder={t('schemeFinder.searchPlaceholder')}
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t('schemeFinder.filters')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Category */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {t('schemeFinder.category')}
            </label>
            <Select value={filters.category} onValueChange={(value) => onFilterChange({ category: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t('schemeFinder.selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('schemeFinder.allCategories')}</SelectItem>
                <SelectItem value="agriculture">{t('category.agriculture')}</SelectItem>
                <SelectItem value="health">{t('category.health')}</SelectItem>
                <SelectItem value="education">{t('category.education')}</SelectItem>
                <SelectItem value="housing">{t('category.housing')}</SelectItem>
                <SelectItem value="employment">{t('category.employment')}</SelectItem>
                <SelectItem value="social">{t('category.social')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Age Range */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {t('schemeFinder.ageRange')}
            </label>
            <Select value={filters.age} onValueChange={(value) => onFilterChange({ age: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t('schemeFinder.selectAge')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('schemeFinder.allAges')}</SelectItem>
                <SelectItem value="0-18">0-18 {t('schemeFinder.years')}</SelectItem>
                <SelectItem value="18-35">18-35 {t('schemeFinder.years')}</SelectItem>
                <SelectItem value="35-60">35-60 {t('schemeFinder.years')}</SelectItem>
                <SelectItem value="60+">60+ {t('schemeFinder.years')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {t('schemeFinder.gender')}
            </label>
            <Select value={filters.gender} onValueChange={(value) => onFilterChange({ gender: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t('schemeFinder.selectGender')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('schemeFinder.allGenders')}</SelectItem>
                <SelectItem value="male">{t('schemeFinder.male')}</SelectItem>
                <SelectItem value="female">{t('schemeFinder.female')}</SelectItem>
                <SelectItem value="other">{t('schemeFinder.other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Income Range */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {t('schemeFinder.incomeRange')}
            </label>
            <Select value={filters.incomeRange} onValueChange={(value) => onFilterChange({ incomeRange: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t('schemeFinder.selectIncome')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('schemeFinder.allIncomes')}</SelectItem>
                <SelectItem value="0-50000">₹0 - ₹50,000</SelectItem>
                <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                <SelectItem value="100000-300000">₹1,00,000 - ₹3,00,000</SelectItem>
                <SelectItem value="300000+">₹3,00,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Caste */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {t('schemeFinder.caste')}
            </label>
            <Select value={filters.caste} onValueChange={(value) => onFilterChange({ caste: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t('schemeFinder.selectCaste')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('schemeFinder.allCastes')}</SelectItem>
                <SelectItem value="general">{t('schemeFinder.general')}</SelectItem>
                <SelectItem value="sc">{t('schemeFinder.sc')}</SelectItem>
                <SelectItem value="st">{t('schemeFinder.st')}</SelectItem>
                <SelectItem value="obc">{t('schemeFinder.obc')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* State */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {t('schemeFinder.state')}
            </label>
            <Select value={filters.state} onValueChange={(value) => onFilterChange({ state: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t('schemeFinder.selectState')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('schemeFinder.allStates')}</SelectItem>
                <SelectItem value="telangana">{t('schemeFinder.telangana')}</SelectItem>
                <SelectItem value="andhra-pradesh">{t('schemeFinder.andhraPradesh')}</SelectItem>
                <SelectItem value="karnataka">{t('schemeFinder.karnataka')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="w-full"
          >
            {t('schemeFinder.clearFilters')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchemeFinderFilters;
