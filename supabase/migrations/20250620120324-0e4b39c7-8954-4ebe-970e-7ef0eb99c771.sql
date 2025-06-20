
-- Create storage bucket for scheme documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('scheme-documents', 'scheme-documents', false);

-- Create storage policies for scheme documents
CREATE POLICY "Users can upload their own documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'scheme-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'scheme-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own documents"
ON storage.objects FOR UPDATE
USING (bucket_id = 'scheme-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own documents"
ON storage.objects FOR DELETE
USING (bucket_id = 'scheme-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create scheme applications table
CREATE TABLE public.scheme_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  scheme_id UUID REFERENCES public.schemes(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  personal_info JSONB,
  uploaded_documents JSONB DEFAULT '[]'::jsonb,
  application_data JSONB DEFAULT '{}'::jsonb,
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for scheme applications
ALTER TABLE public.scheme_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own applications"
ON public.scheme_applications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications"
ON public.scheme_applications FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications"
ON public.scheme_applications FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own applications"
ON public.scheme_applications FOR DELETE
USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for scheme_applications
CREATE TRIGGER update_scheme_applications_updated_at
    BEFORE UPDATE ON public.scheme_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
