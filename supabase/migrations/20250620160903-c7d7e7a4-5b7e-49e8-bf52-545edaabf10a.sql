
-- Create table for scraped central government schemes
CREATE TABLE public.central_government_schemes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scheme_name TEXT NOT NULL,
  scheme_code TEXT,
  ministry TEXT,
  department TEXT,
  description TEXT,
  objectives TEXT,
  benefits TEXT,
  eligibility_criteria TEXT,
  application_process TEXT,
  required_documents TEXT,
  scheme_url TEXT,
  category TEXT,
  target_beneficiaries TEXT,
  funding_pattern TEXT,
  implementation_agency TEXT,
  launch_date DATE,
  status TEXT DEFAULT 'active',
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for scheme categories mapping
CREATE TABLE public.scheme_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scheme_id UUID REFERENCES public.central_government_schemes(id) ON DELETE CASCADE,
  category_name TEXT NOT NULL,
  sub_category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for scheme beneficiaries
CREATE TABLE public.scheme_beneficiaries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scheme_id UUID REFERENCES public.central_government_schemes(id) ON DELETE CASCADE,
  beneficiary_type TEXT NOT NULL,
  age_group TEXT,
  gender TEXT,
  income_criteria TEXT,
  caste_criteria TEXT,
  location_criteria TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for scheme documents
CREATE TABLE public.scheme_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scheme_id UUID REFERENCES public.central_government_schemes(id) ON DELETE CASCADE,
  document_name TEXT NOT NULL,
  document_type TEXT,
  is_mandatory BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX idx_central_schemes_category ON public.central_government_schemes(category);
CREATE INDEX idx_central_schemes_ministry ON public.central_government_schemes(ministry);
CREATE INDEX idx_central_schemes_status ON public.central_government_schemes(status);
CREATE INDEX idx_scheme_categories_scheme_id ON public.scheme_categories(scheme_id);
CREATE INDEX idx_scheme_beneficiaries_scheme_id ON public.scheme_beneficiaries(scheme_id);
CREATE INDEX idx_scheme_documents_scheme_id ON public.scheme_documents(scheme_id);

-- Enable RLS for public access to read schemes
ALTER TABLE public.central_government_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheme_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheme_beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheme_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view active central schemes"
ON public.central_government_schemes FOR SELECT
USING (status = 'active');

CREATE POLICY "Anyone can view scheme categories"
ON public.scheme_categories FOR SELECT
USING (true);

CREATE POLICY "Anyone can view scheme beneficiaries"
ON public.scheme_beneficiaries FOR SELECT
USING (true);

CREATE POLICY "Anyone can view scheme documents"
ON public.scheme_documents FOR SELECT
USING (true);

-- Admin policies for managing schemes
CREATE POLICY "Admins can manage central schemes"
ON public.central_government_schemes FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can manage scheme categories"
ON public.scheme_categories FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can manage scheme beneficiaries"
ON public.scheme_beneficiaries FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can manage scheme documents"
ON public.scheme_documents FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Create trigger for updating updated_at timestamp
CREATE TRIGGER update_central_schemes_updated_at
    BEFORE UPDATE ON public.central_government_schemes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
