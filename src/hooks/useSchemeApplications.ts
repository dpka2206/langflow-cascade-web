
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { SchemeApplication } from '@/types/schemeApplication';
import { fetchUserApplications, updateApplicationStatusService } from '@/services/schemeApplicationService';

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
      
      const processedApplications = await fetchUserApplications(user.id);
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

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const result = await updateApplicationStatusService(applicationId, status, user.id, applications);
    
    if (result.success) {
      // Refresh applications after update
      await fetchApplications();
    }
    
    return result;
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
