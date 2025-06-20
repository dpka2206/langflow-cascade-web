
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SchemeApplication {
  id: string;
  scheme_id: string;
  user_id: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  personal_info: any;
  uploaded_documents: any[];
  application_data: any;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
  scheme_name?: string;
  estimated_approval_days?: number;
  application_number?: string;
}

export const useSchemeApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<SchemeApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    if (!user) {
      setApplications([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch applications with scheme details
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('scheme_applications')
        .select(`
          *,
          schemes(key),
          central_government_schemes(scheme_name)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (applicationsError) {
        throw applicationsError;
      }

      // Process applications to add scheme names and generate application numbers
      const processedApplications = applicationsData?.map((app, index) => {
        const schemeName = app.central_government_schemes?.scheme_name || 
                          app.schemes?.key || 
                          'Unknown Scheme';
        
        return {
          ...app,
          scheme_name: schemeName,
          application_number: app.submitted_at ? `MS${Date.now().toString().slice(-6)}${index}` : undefined,
          estimated_approval_days: getEstimatedApprovalDays(app.status)
        };
      }) || [];

      setApplications(processedApplications);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const getEstimatedApprovalDays = (status: string): number => {
    switch (status) {
      case 'submitted':
        return 15; // 15 days for initial review
      case 'under_review':
        return 10; // 10 days for detailed review
      default:
        return 0;
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const updateData: any = { status, updated_at: new Date().toISOString() };
      
      // If status is changing to submitted, set submitted_at
      if (status === 'submitted') {
        updateData.submitted_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('scheme_applications')
        .update(updateData)
        .eq('id', applicationId);

      if (error) throw error;

      // Refresh applications after update
      await fetchApplications();
      return { success: true };
    } catch (err) {
      console.error('Error updating application status:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to update application' 
      };
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  return {
    applications,
    loading,
    error,
    refetch: fetchApplications,
    updateApplicationStatus
  };
};
