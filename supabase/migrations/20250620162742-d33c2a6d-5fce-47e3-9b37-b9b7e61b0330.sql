
-- Create table for government services
CREATE TABLE public.government_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name TEXT NOT NULL,
  service_code TEXT UNIQUE,
  description TEXT,
  category TEXT NOT NULL,
  sub_category TEXT,
  department TEXT,
  ministry TEXT,
  service_url TEXT NOT NULL,
  icon_name TEXT,
  eligibility_criteria TEXT[],
  required_documents TEXT[],
  processing_time TEXT,
  fees TEXT,
  service_type TEXT DEFAULT 'online', -- online, offline, both
  target_audience TEXT[], -- citizen, business, government
  status TEXT DEFAULT 'active',
  priority_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for service categories
CREATE TABLE public.service_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_name TEXT NOT NULL UNIQUE,
  category_code TEXT UNIQUE,
  description TEXT,
  icon_name TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for popular services tracking
CREATE TABLE public.service_usage_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES public.government_services(id) ON DELETE CASCADE,
  user_id UUID,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_agent TEXT,
  ip_address INET
);

-- Add indexes for better performance
CREATE INDEX idx_gov_services_category ON public.government_services(category);
CREATE INDEX idx_gov_services_status ON public.government_services(status);
CREATE INDEX idx_gov_services_featured ON public.government_services(is_featured);
CREATE INDEX idx_gov_services_priority ON public.government_services(priority_order);
CREATE INDEX idx_service_categories_active ON public.service_categories(is_active);
CREATE INDEX idx_service_usage_service_id ON public.service_usage_stats(service_id);

-- Enable RLS for public access
ALTER TABLE public.government_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_usage_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view active services"
ON public.government_services FOR SELECT
USING (status = 'active');

CREATE POLICY "Anyone can view active service categories"
ON public.service_categories FOR SELECT
USING (is_active = true);

-- Admin policies for managing services
CREATE POLICY "Admins can manage services"
ON public.government_services FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can manage service categories"
ON public.service_categories FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Users can track their own service usage
CREATE POLICY "Users can insert their own usage stats"
ON public.service_usage_stats FOR INSERT
WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can view their own usage stats"
ON public.service_usage_stats FOR SELECT
USING (user_id = auth.uid() OR user_id IS NULL);

-- Add trigger for updating updated_at
CREATE TRIGGER update_gov_services_updated_at
    BEFORE UPDATE ON public.government_services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert service categories
INSERT INTO public.service_categories (category_name, category_code, description, icon_name, display_order) VALUES
('Identity & Documentation', 'identity', 'Services related to identity documents like Aadhaar, PAN, Passport', 'CreditCard', 1),
('Taxation', 'taxation', 'Tax-related services and filings', 'Calculator', 2),
('Employment', 'employment', 'Job and employment-related services', 'Briefcase', 3),
('Education', 'education', 'Educational services and certificates', 'GraduationCap', 4),
('Health', 'health', 'Healthcare services and medical facilities', 'Heart', 5),
('Agriculture', 'agriculture', 'Agricultural schemes and farmer services', 'Wheat', 6),
('Business', 'business', 'Business registration and commercial services', 'Building', 7),
('Transport', 'transport', 'Vehicle registration and transport services', 'Car', 8),
('Utilities', 'utilities', 'Utility services like electricity, water', 'Zap', 9),
('Social Welfare', 'welfare', 'Social welfare and pension schemes', 'Users', 10);

-- Insert sample government services
INSERT INTO public.government_services (
  service_name, service_code, description, category, department, service_url, 
  icon_name, eligibility_criteria, required_documents, processing_time, fees, 
  target_audience, is_featured, priority_order
) VALUES
-- Identity Services
('Aadhaar Card Application', 'AADHAAR_NEW', 'Apply for new Aadhaar card - unique identification number for Indian residents', 'Identity & Documentation', 'UIDAI', 'https://uidai.gov.in/my-aadhaar/aadhaar-enrolment', 'CreditCard', 
ARRAY['Indian resident', 'Any age'], ARRAY['Proof of Identity', 'Proof of Address', 'Date of Birth proof'], '30-90 days', 'Free', ARRAY['citizen'], true, 1),

('PAN Card Application', 'PAN_NEW', 'Apply for Permanent Account Number card for tax purposes', 'Identity & Documentation', 'Income Tax Department', 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html', 'CreditCard',
ARRAY['Indian citizen or foreign national'], ARRAY['Identity proof', 'Address proof', 'Date of birth proof'], '15-20 days', '₹110', ARRAY['citizen'], true, 2),

('Passport Application', 'PASSPORT_NEW', 'Apply for Indian passport for international travel', 'Identity & Documentation', 'Ministry of External Affairs', 'https://portal2.passportindia.gov.in/AppOnlineProject/online/procFormSubOnl', 'Plane',
ARRAY['Indian citizen'], ARRAY['Identity proof', 'Address proof', 'Date of birth certificate'], '30-45 days', '₹1500-5000', ARRAY['citizen'], true, 3),

-- Taxation Services
('Income Tax Return Filing', 'ITR_FILE', 'File your annual income tax return online', 'Taxation', 'Income Tax Department', 'https://incometax.gov.in/iec/foportal/', 'Calculator',
ARRAY['Taxpayers with income above exemption limit'], ARRAY['Form 16', 'Bank statements', 'Investment proofs'], 'Immediate', 'Free', ARRAY['citizen'], true, 4),

('GST Registration', 'GST_REG', 'Register for Goods and Services Tax for businesses', 'Taxation', 'GST Council', 'https://www.gst.gov.in/registration/', 'Building',
ARRAY['Business with turnover > 40 lakhs'], ARRAY['PAN card', 'Aadhaar', 'Business registration'], '3-7 days', 'Free', ARRAY['business'], false, 5),

-- Employment Services
('EPF Account', 'EPF_NEW', 'Create Employee Provident Fund account', 'Employment', 'EPFO', 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/', 'Briefcase',
ARRAY['Employed individuals'], ARRAY['Aadhaar', 'Bank account details'], '7-15 days', 'Free', ARRAY['citizen'], false, 6),

('Job Seeker Registration', 'JOB_SEEK', 'Register as job seeker on National Career Service portal', 'Employment', 'Ministry of Labour', 'https://www.ncs.gov.in/', 'Users',
ARRAY['Job seekers'], ARRAY['Educational certificates', 'Resume'], 'Immediate', 'Free', ARRAY['citizen'], false, 7),

-- Education Services
('Scholarship Application', 'SCHOLARSHIP', 'Apply for various government scholarships', 'Education', 'Ministry of Education', 'https://scholarships.gov.in/', 'GraduationCap',
ARRAY['Students from eligible families'], ARRAY['Academic certificates', 'Income certificate'], '30-60 days', 'Free', ARRAY['citizen'], false, 8),

-- Health Services
('Health Card (Ayushman Bharat)', 'HEALTH_CARD', 'Apply for Ayushman Bharat health insurance card', 'Health', 'Ministry of Health', 'https://pmjay.gov.in/', 'Heart',
ARRAY['Families below poverty line'], ARRAY['Ration card', 'Income certificate'], '15-30 days', 'Free', ARRAY['citizen'], true, 9),

-- Transport Services
('Driving License', 'DL_NEW', 'Apply for new driving license', 'Transport', 'Ministry of Road Transport', 'https://parivahan.gov.in/parivahan/', 'Car',
ARRAY['Age 18+ for motorcycle, 20+ for car'], ARRAY['Age proof', 'Address proof', 'Medical certificate'], '30 days', '₹200-1000', ARRAY['citizen'], false, 10);
