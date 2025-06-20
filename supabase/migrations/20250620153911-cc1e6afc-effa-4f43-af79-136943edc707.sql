
-- Create table to store user personalized criteria
CREATE TABLE public.user_personalized_criteria (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  gender TEXT,
  age TEXT,
  occupation TEXT,
  income TEXT,
  caste TEXT,
  state TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for user personalized criteria
ALTER TABLE public.user_personalized_criteria ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own criteria"
ON public.user_personalized_criteria FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own criteria"
ON public.user_personalized_criteria FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own criteria"
ON public.user_personalized_criteria FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own criteria"
ON public.user_personalized_criteria FOR DELETE
USING (auth.uid() = user_id);

-- Create trigger for updating updated_at timestamp
CREATE TRIGGER update_user_personalized_criteria_updated_at
    BEFORE UPDATE ON public.user_personalized_criteria
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create table to store external schemes data
CREATE TABLE public.external_schemes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scheme_name TEXT NOT NULL,
  description TEXT,
  eligibility_criteria JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  application_process TEXT,
  required_documents JSONB DEFAULT '[]'::jsonb,
  source_url TEXT,
  category TEXT,
  target_gender TEXT[],
  target_age_range TEXT,
  target_occupation TEXT[],
  target_income_range TEXT,
  target_caste TEXT[],
  target_state TEXT[],
  scheme_type TEXT DEFAULT 'external',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policy for external schemes (public read access)
ALTER TABLE public.external_schemes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active external schemes"
ON public.external_schemes FOR SELECT
USING (status = 'active');

-- Only admins can modify external schemes
CREATE POLICY "Admins can manage external schemes"
ON public.external_schemes FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Create trigger for updating updated_at timestamp
CREATE TRIGGER update_external_schemes_updated_at
    BEFORE UPDATE ON public.external_schemes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to get personalized scheme recommendations
CREATE OR REPLACE FUNCTION get_personalized_schemes(user_criteria JSONB)
RETURNS TABLE(
  id UUID,
  scheme_name TEXT,
  description TEXT,
  category TEXT,
  scheme_type TEXT,
  eligibility_criteria JSONB,
  benefits JSONB,
  match_score INTEGER
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    es.id,
    es.scheme_name,
    es.description,
    es.category,
    es.scheme_type,
    es.eligibility_criteria,
    es.benefits,
    -- Simple matching score based on criteria overlap
    (
      CASE WHEN (user_criteria->>'gender')::text = ANY(es.target_gender) OR es.target_gender IS NULL THEN 1 ELSE 0 END +
      CASE WHEN (user_criteria->>'occupation')::text = ANY(es.target_occupation) OR es.target_occupation IS NULL THEN 1 ELSE 0 END +
      CASE WHEN (user_criteria->>'caste')::text = ANY(es.target_caste) OR es.target_caste IS NULL THEN 1 ELSE 0 END +
      CASE WHEN (user_criteria->>'state')::text = ANY(es.target_state) OR es.target_state IS NULL THEN 1 ELSE 0 END
    )::INTEGER as match_score
  FROM public.external_schemes es
  WHERE es.status = 'active'
  ORDER BY match_score DESC, es.created_at DESC;
END;
$$;
