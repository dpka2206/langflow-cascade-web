
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { SchemeApplication, ApplicationReview } from '@/types/schemeApplication';
import { fetchAllApplications, reviewApplication, getApplicationStats } from '@/services/adminApplicationService';

export const useAdminApplications = () => {
  const { user, userRole } = useAuth();
  const [applications, setApplications] = useState<SchemeApplication[]>([]);
  const [stats, setStats] = useState({ total: 0, submitted: 0, under_review: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    if (!user || userRole !== 'admin') {
      setApplications([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const [applicationsData, statsData] = await Promise.all([
        fetchAllApplications(),
        getApplicationStats()
      ]);
      
      setApplications(applicationsData);
      setStats(statsData);
    } catch (err) {
      console.error('Error in fetchApplications:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch applications';
      setError(errorMessage);
      toast.error(`Failed to load applications: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewApplication = async (applicationId: string, review: ApplicationReview) => {
    if (!user || userRole !== 'admin') {
      return { success: false, error: 'Admin access required' };
    }

    const result = await reviewApplication(applicationId, review, user.id);
    
    if (result.success) {
      toast.success(`Application ${review.status === 'approved' ? 'approved' : 'updated'} successfully`);
      // Refresh applications after review
      await fetchApplications();
    } else {
      toast.error(`Failed to update application: ${result.error}`);
    }
    
    return result;
  };

  useEffect(() => {
    fetchApplications();
  }, [user, userRole]);

  return {
    applications,
    stats,
    loading,
    error,
    refetch: fetchApplications,
    reviewApplication: handleReviewApplication
  };
};
