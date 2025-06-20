
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface PersonalizedScheme {
  id: string;
  scheme_name: string;
  description: string;
  category: string;
  scheme_type: string;
  eligibility_criteria: any;
  benefits: any;
  match_score: number;
}

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
  const [schemes, setSchemes] = useState<PersonalizedScheme[]>([]);
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
        setSchemes([]);
        return;
      }

      // Call the database function to get personalized schemes
      const { data, error: schemesError } = await supabase
        .rpc('get_personalized_schemes', {
          user_criteria: userCriteria
        });

      if (schemesError) throw schemesError;

      setSchemes(data || []);
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
