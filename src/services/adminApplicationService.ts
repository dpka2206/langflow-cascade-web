
import { supabase } from '@/integrations/supabase/client';
import { SchemeApplication, ApplicationReview } from '@/types/schemeApplication';
import { processApplicationData } from '@/utils/schemeApplicationUtils';

export const fetchAllApplications = async (): Promise<SchemeApplication[]> => {
  console.log('Fetching all applications for admin review');

  const { data: applicationsData, error: applicationsError } = await supabase
    .from('scheme_applications')
    .select('*')
    .order('submitted_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (applicationsError) {
    console.error('Error fetching applications:', applicationsError);
    throw applicationsError;
  }

  console.log('Raw applications data:', applicationsData);

  if (!applicationsData || applicationsData.length === 0) {
    console.log('No applications found');
    return [];
  }

  const processedApplications = await processApplicationData(applicationsData);
  console.log('Processed applications:', processedApplications);
  
  return processedApplications;
};

export const reviewApplication = async (
  applicationId: string,
  review: ApplicationReview,
  adminId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('Reviewing application:', applicationId, review);
    
    const updateData: any = {
      status: review.status,
      reviewed_by: adminId,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (review.review_notes) {
      updateData.review_notes = review.review_notes;
    }

    if (review.rejection_reason && review.status === 'rejected') {
      updateData.rejection_reason = review.rejection_reason;
    }

    const { error } = await supabase
      .from('scheme_applications')
      .update(updateData)
      .eq('id', applicationId);

    if (error) {
      console.error('Error reviewing application:', error);
      throw error;
    }

    return { success: true };
  } catch (err) {
    console.error('Error in reviewApplication:', err);
    const errorMessage = err instanceof Error ? err.message : 'Failed to review application';
    return { 
      success: false, 
      error: errorMessage
    };
  }
};

export const getApplicationStats = async () => {
  try {
    const { data, error } = await supabase
      .from('scheme_applications')
      .select('status')
      .not('status', 'eq', 'draft');

    if (error) throw error;

    const stats = {
      total: data.length,
      submitted: data.filter(app => app.status === 'submitted').length,
      under_review: data.filter(app => app.status === 'under_review').length,
      approved: data.filter(app => app.status === 'approved').length,
      rejected: data.filter(app => app.status === 'rejected').length
    };

    return stats;
  } catch (err) {
    console.error('Error fetching application stats:', err);
    return { total: 0, submitted: 0, under_review: 0, approved: 0, rejected: 0 };
  }
};
