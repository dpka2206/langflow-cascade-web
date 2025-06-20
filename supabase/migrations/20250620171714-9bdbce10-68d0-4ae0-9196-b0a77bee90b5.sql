
-- Add approval workflow columns to scheme_applications table
ALTER TABLE scheme_applications 
ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS reviewed_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS review_notes text,
ADD COLUMN IF NOT EXISTS rejection_reason text;

-- Create an index for faster queries on applications pending review
CREATE INDEX IF NOT EXISTS idx_scheme_applications_status_submitted_at 
ON scheme_applications(status, submitted_at DESC) 
WHERE status IN ('submitted', 'under_review');

-- Create RLS policies for admin access to applications
CREATE POLICY "Admins can view all applications" 
ON scheme_applications FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can update application status" 
ON scheme_applications FOR UPDATE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);
