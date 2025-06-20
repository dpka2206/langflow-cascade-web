
import { supabase } from '@/integrations/supabase/client';
import { SchemeApplication } from '@/types/schemeApplication';
import { processApplicationData } from '@/utils/schemeApplicationUtils';

export const fetchUserApplications = async (userId: string): Promise<SchemeApplication[]> => {
  console.log('Fetching applications for user:', userId);

  const { data: applicationsData, error: applicationsError } = await supabase
    .from('scheme_applications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (applicationsError) {
    console.error('Error fetching applications:', applicationsError);
    throw applicationsError;
  }

  console.log('Raw applications data:', applicationsData);

  if (!applicationsData || applicationsData.length === 0) {
    console.log('No applications found for user');
    return [];
  }

  const processedApplications = await processApplicationData(applicationsData);
  console.log('Processed applications:', processedApplications);
  
  return processedApplications;
};

export const updateApplicationStatusService = async (
  applicationId: string, 
  status: string, 
  userId: string,
  currentApplications: SchemeApplication[]
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('Updating application status:', applicationId, status);
    
    const updateData: any = { 
      status, 
      updated_at: new Date().toISOString() 
    };
    
    // If status is changing to submitted, set submitted_at
    if (status === 'submitted' && !currentApplications.find(app => app.id === applicationId)?.submitted_at) {
      updateData.submitted_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('scheme_applications')
      .update(updateData)
      .eq('id', applicationId)
      .eq('user_id', userId); // Ensure user can only update their own applications

    if (error) {
      console.error('Error updating application status:', error);
      throw error;
    }

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
