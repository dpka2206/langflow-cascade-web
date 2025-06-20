
export interface Scheme {
  id: string;
  key: string;
  category: string;
  status: string;
  created_at: string;
  scheme_type?: 'central' | 'state';
  translations?: {
    title: string;
    description: string;
    benefits: string[];
    eligibility: string[];
    documents: string[];
  };
}

export interface FilterState {
  age: string;
  caste: string;
  occupation: string;
  gender: string;
  incomeRange: string;
  state: string;
  district: string;
  category: string;
  searchQuery: string;
}
