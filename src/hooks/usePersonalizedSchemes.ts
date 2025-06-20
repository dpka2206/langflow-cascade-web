
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Scheme } from '@/types/scheme';

interface UserCriteria {
  gender: string;
  age: string;
  occupation: string;
  income: string;
  caste: string;
  state: string;
}

export const usePersonalizedSchemes = () => {
  const { user } = useAuth();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPersonalizedSchemes = async (criteria?: UserCriteria) => {
    if (!user && !criteria) return;

    setLoading(true);
    setError(null);

    try {
      let userCriteria = criteria;

      // If no criteria provided, fetch from database
      if (!userCriteria && user) {
        const { data: savedCriteria, error: criteriaError } = await supabase
          .from('user_personalized_criteria')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (criteriaError && criteriaError.code !== 'PGRST116') {
          throw criteriaError;
        }

        if (savedCriteria) {
          userCriteria = {
            gender: savedCriteria.gender || '',
            age: savedCriteria.age || '',
            occupation: savedCriteria.occupation || '',
            income: savedCriteria.income || '',
            caste: savedCriteria.caste || '',
            state: savedCriteria.state || ''
          };
        }
      }

      if (!userCriteria) {
        // If no criteria, fetch all schemes with proper names
        const { data: externalSchemes } = await supabase
          .from('external_schemes')
          .select('id, scheme_name, description, category, scheme_type, eligibility_criteria, benefits')
          .eq('status', 'active')
          .order('scheme_name');

        const { data: centralSchemes } = await supabase
          .from('central_government_schemes')
          .select('id, scheme_name, description, category')
          .eq('status', 'active')
          .order('scheme_name');

        const allSchemes: Scheme[] = [
          ...(externalSchemes || []).map(scheme => ({
            id: scheme.id,
            key: scheme.scheme_name,
            category: scheme.category,
            status: 'active',
            created_at: new Date().toISOString(),
            scheme_type: scheme.scheme_type as 'central' | 'state',
            translations: {
              title: scheme.scheme_name,
              description: scheme.description || '',
              benefits: Array.isArray(scheme.benefits) ? scheme.benefits : [],
              eligibility: Array.isArray(scheme.eligibility_criteria) ? scheme.eligibility_criteria : [],
              documents: []
            }
          })),
          ...(centralSchemes || []).map(scheme => ({
            id: scheme.id,
            key: scheme.scheme_name,
            category: scheme.category,
            status: 'active',
            created_at: new Date().toISOString(),
            scheme_type: 'central' as const,
            translations: {
              title: scheme.scheme_name,
              description: scheme.description || '',
              benefits: [],
              eligibility: [],
              documents: []
            }
          }))
        ];

        setSchemes(allSchemes);
        return;
      }

      // Convert UserCriteria to a plain object for JSON compatibility
      const criteriaJson = {
        gender: userCriteria.gender,
        age: userCriteria.age,
        occupation: userCriteria.occupation,
        income: userCriteria.income,
        caste: userCriteria.caste,
        state: userCriteria.state
      };

      // Call the database function to get personalized schemes
      const { data, error: schemesError } = await supabase
        .rpc('get_personalized_schemes', {
          user_criteria: criteriaJson
        });

      if (schemesError) throw schemesError;

      console.log('Personalized schemes data:', data);

      // Transform the data to match Scheme interface
      const transformedSchemes: Scheme[] = (data || []).map((scheme: any) => ({
        id: scheme.id,
        key: scheme.scheme_name,
        category: scheme.category,
        status: 'active',
        created_at: new Date().toISOString(),
        scheme_type: scheme.scheme_type as 'central' | 'state',
        translations: {
          title: scheme.scheme_name,
          description: scheme.description || '',
          benefits: Array.isArray(scheme.benefits) ? scheme.benefits : [],
          eligibility: Array.isArray(scheme.eligibility_criteria) ? scheme.eligibility_criteria : [],
          documents: []
        }
      }));

      setSchemes(transformedSchemes);
    } catch (err) {
      console.error('Error fetching personalized schemes:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch schemes');
    } finally {
      setLoading(false);
    }
  };

  const getUserCriteria = async () => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_personalized_criteria')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Error fetching user criteria:', err);
      return null;
    }
  };

  return {
    schemes,
    loading,
    error,
    fetchPersonalizedSchemes,
    getUserCriteria
  };
};
