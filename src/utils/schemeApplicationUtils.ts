
import { SchemeApplication } from '@/types/schemeApplication';

export const getEstimatedApprovalDays = (status: string): number => {
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

export const generateApplicationNumber = (submittedAt: string | null, index: number): string | undefined => {
  return submittedAt 
    ? `APP${new Date(submittedAt).getFullYear()}${String(index + 1).padStart(4, '0')}`
    : undefined;
};

export const processApplicationData = (applications: any[]): Promise<SchemeApplication[]> => {
  return Promise.all(
    applications.map(async (app, index) => {
      const schemeName = await getSchemeNameForApplication(app);
      const applicationNumber = generateApplicationNumber(app.submitted_at, index);
      
      return {
        ...app,
        scheme_name: schemeName,
        application_number: applicationNumber,
        estimated_approval_days: getEstimatedApprovalDays(app.status)
      } as SchemeApplication;
    })
  );
};

const getSchemeNameForApplication = async (app: any): Promise<string> => {
  let schemeName = 'Unknown Scheme';
  
  try {
    // Try to get scheme name from application_data first
    const appData = app.application_data as any;
    if (appData && typeof appData === 'object' && appData.scheme_name) {
      schemeName = appData.scheme_name;
    } else {
      // Import supabase client dynamically to avoid circular dependency
      const { supabase } = await import('@/integrations/supabase/client');
      
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
  
  return schemeName;
};
