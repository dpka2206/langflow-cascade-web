
import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import SchemeCard from './SchemeCard';
import { Button } from '@/components/ui/button';

const SchemesSection = () => {
  const { t } = useTranslation();

  const schemes = [
    {
      id: 'pmkisan',
      titleKey: 'scheme.pmkisan.title',
      descriptionKey: 'scheme.pmkisan.description',
      eligibilityKey: 'scheme.pmkisan.eligibility',
      benefitKey: 'scheme.pmkisan.benefit',
      category: 'Agriculture',
      bgColor: 'bg-green-50'
    },
    {
      id: 'pmjay',
      titleKey: 'scheme.pmjay.title',
      descriptionKey: 'scheme.pmjay.description',
      eligibilityKey: 'scheme.pmjay.eligibility',
      benefitKey: 'scheme.pmjay.benefit',
      category: 'Healthcare',
      bgColor: 'bg-red-50'
    },
    {
      id: 'pmay',
      titleKey: 'scheme.pmay.title',
      descriptionKey: 'scheme.pmay.description',
      eligibilityKey: 'scheme.pmay.eligibility',
      benefitKey: 'scheme.pmay.benefit',
      category: 'Housing',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'mudra',
      titleKey: 'scheme.mudra.title',
      descriptionKey: 'scheme.mudra.description',
      eligibilityKey: 'scheme.mudra.eligibility',
      benefitKey: 'scheme.mudra.benefit',
      category: 'Employment',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <section id="schemes" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('home.featuredSchemes')}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {schemes.map((scheme) => (
            <SchemeCard key={scheme.id} {...scheme} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
            {t('schemes.viewAll')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SchemesSection;
