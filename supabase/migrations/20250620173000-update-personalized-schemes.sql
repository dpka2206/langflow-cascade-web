
-- Update the get_personalized_schemes function to include all scheme sources
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
  -- Get external schemes
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
  
  UNION ALL
  
  -- Get central government schemes
  SELECT 
    cgs.id,
    cgs.scheme_name,
    cgs.description,
    cgs.category,
    'central'::text as scheme_type,
    CASE 
      WHEN cgs.eligibility_criteria IS NOT NULL 
      THEN jsonb_build_array(cgs.eligibility_criteria)
      ELSE '[]'::jsonb
    END as eligibility_criteria,
    CASE 
      WHEN cgs.benefits IS NOT NULL 
      THEN jsonb_build_array(cgs.benefits)
      ELSE '[]'::jsonb
    END as benefits,
    -- Basic scoring for central schemes (they show for everyone)
    3::INTEGER as match_score
  FROM public.central_government_schemes cgs
  WHERE cgs.status = 'active'
  
  ORDER BY match_score DESC, scheme_name ASC;
END;
$$;
