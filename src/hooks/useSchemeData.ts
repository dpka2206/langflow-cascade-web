
import { useState, useEffect } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { supabase } from '@/integrations/supabase/client';
import { Scheme } from '@/types/scheme';

export const useSchemeData = () => {
  const { language } = useTranslation();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      
      console.log('Fetching schemes...');
      
      // Fetch regular schemes
      const { data: schemesData, error: schemesError } = await supabase
        .from('schemes')
        .select('*')
        .eq('status', 'active');

      if (schemesError) {
        console.error('Error fetching schemes:', schemesError);
      }

      // Fetch central government schemes
      const { data: centralSchemesData, error: centralSchemesError } = await supabase
        .from('central_government_schemes')
        .select('*')
        .eq('status', 'active');

      if (centralSchemesError) {
        console.error('Error fetching central schemes:', centralSchemesError);
      }

      console.log('Central schemes data:', centralSchemesData);

      const { data: translationsData, error: translationsError } = await supabase
        .from('scheme_translations')
        .select('*')
        .eq('language', language);

      if (translationsError) {
        console.error('Error fetching translations:', translationsError);
      }

      // Process regular schemes
      const schemesWithTranslations = schemesData?.map(scheme => {
        const translation = translationsData?.find(t => t.scheme_id === scheme.id);
        return {
          ...scheme,
          scheme_type: scheme.key.includes('central') ? 'central' : 'state' as 'central' | 'state',
          translations: translation ? {
            title: translation.title,
            description: translation.description,
            benefits: translation.benefits || [],
            eligibility: translation.eligibility || [],
            documents: translation.documents || []
          } : undefined
        };
      }) || [];

      // Process central government schemes
      const centralSchemes = centralSchemesData?.map(scheme => {
        console.log('Processing central scheme:', scheme.scheme_name, 'Category:', scheme.category);
        return {
          id: scheme.id,
          key: scheme.scheme_code || scheme.id,
          category: scheme.category || 'other',
          status: scheme.status,
          created_at: scheme.created_at,
          scheme_type: 'central' as 'central' | 'state',
          translations: {
            title: scheme.scheme_name,
            description: scheme.description || 'No description available',
            benefits: scheme.benefits ? [scheme.benefits] : [],
            eligibility: scheme.eligibility_criteria ? [scheme.eligibility_criteria] : [],
            documents: scheme.required_documents ? scheme.required_documents.split(',').map(doc => doc.trim()) : []
          }
        };
      }) || [];

      console.log('Processed central schemes:', centralSchemes);

      // Combine all schemes
      const allSchemes = [...schemesWithTranslations, ...centralSchemes];
      console.log('All schemes:', allSchemes);
      setSchemes(allSchemes);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [language]);

  return { schemes, loading, refetch: fetchSchemes };
};
