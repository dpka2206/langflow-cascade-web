
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface SchemeApplication {
  id: string;
  scheme_id: string;
  user_id: string;
  status: string;
  personal_info: any;
  uploaded_documents: any[];
  application_data: any;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
  scheme_name: string;
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
      console.log('Fetching applications for user:', user.id);

      // Fetch applications with enhanced error handling
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('scheme_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (applicationsError) {
        console.error('Error fetching applications:', applicationsError);
        throw applicationsError;
      }

      console.log('Raw applications data:', applicationsData);

      if (!applicationsData || applicationsData.length === 0) {
        console.log('No applications found for user');
        setApplications([]);
        return;
      }

      // Process applications and add scheme names
      const processedApplications = await Promise.all(
        applicationsData.map(async (app, index) => {
          let schemeName = 'Unknown Scheme';
          
          try {
            // Try to get scheme name from application_data first
            const appData = app.application_data as any;
            if (appData && typeof appData === 'object' && appData.scheme_name) {
              schemeName = appData.scheme_name;
            } else {
              // Then try central_government_schemes
              const { data: centralScheme } = await supabase
                .from('central_government_schemes')
                .select('scheme_name')
                .eq('id', app.scheme_id)
                .maybeSingle();
              
              if (centralScheme?.scheme_name) {
                schemeName = centralScheme.scheme_name;
              } else {
                // Then try schemes table
                const { data: scheme } = await supabase
                  .from('schemes')
                  .select('key')
                  .eq('id', app.scheme_id)
                  .maybeSingle();
                
                if (scheme?.key) {
                  schemeName = scheme.key;
                } else {
                  // Finally try external_schemes
                  const { data: externalScheme } = await supabase
                    .from('external_schemes')
                    .select('scheme_name')
                    .eq('id', app.scheme_id)
                    .maybeSingle();
                  
                  if (externalScheme?.scheme_name) {
                    schemeName = externalScheme.scheme_name;
                  }
                }
              }
            }
          } catch (schemeError) {
            console.warn('Could not fetch scheme name for application:', app.id, schemeError);
          }
          
          // Generate application number for submitted applications
          const applicationNumber = app.submitted_at 
            ? `APP${new Date(app.submitted_at).getFullYear()}${String(index + 1).padStart(4, '0')}`
            : undefined;
          
          return {
            ...app,
            scheme_name: schemeName,
            application_number: applicationNumber,
            estimated_approval_days: getEstimatedApprovalDays(app.status)
          } as SchemeApplication;
        })
      );

      console.log('Processed applications:', processedApplications);
      setApplications(processedApplications);
    } catch (err) {
      console.error('Error in fetchApplications:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch applications';
      setError(errorMessage);
      toast.error(`Failed to load applications: ${errorMessage}`);
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
      case 'approved':
      case 'rejected':
        return 0; // No more waiting
      default:
        return 0;
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      console.log('Updating application status:', applicationId, status);
      
      const updateData: any = { 
        status, 
        updated_at: new Date().toISOString() 
      };
      
      // If status is changing to submitted, set submitted_at
      if (status === 'submitted' && !applications.find(app => app.id === applicationId)?.submitted_at) {
        updateData.submitted_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('scheme_applications')
        .update(updateData)
        .eq('id', applicationId)
        .eq('user_id', user.id); // Ensure user can only update their own applications

      if (error) {
        console.error('Error updating application status:', error);
        throw error;
      }

      // Refresh applications after update
      await fetchApplications();
      return { success: true };
    } catch (err) {
      console.error('Error in updateApplicationStatus:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update application';
      return { 
        success: false, 
        error: errorMessage
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
