
export interface SchemeApplication {
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

export type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
