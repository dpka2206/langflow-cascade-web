
-- Add RLS policies for scheme_applications table if they don't exist
DO $$
BEGIN
    -- Enable RLS if not already enabled
    ALTER TABLE scheme_applications ENABLE ROW LEVEL SECURITY;
    
    -- Create policies only if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'scheme_applications' 
        AND policyname = 'Users can view their own applications'
    ) THEN
        CREATE POLICY "Users can view their own applications" ON scheme_applications
          FOR SELECT USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'scheme_applications' 
        AND policyname = 'Users can create their own applications'
    ) THEN
        CREATE POLICY "Users can create their own applications" ON scheme_applications
          FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'scheme_applications' 
        AND policyname = 'Users can update their own applications'
    ) THEN
        CREATE POLICY "Users can update their own applications" ON scheme_applications
          FOR UPDATE USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'scheme_applications' 
        AND policyname = 'Users can delete their own applications'
    ) THEN
        CREATE POLICY "Users can delete their own applications" ON scheme_applications
          FOR DELETE USING (auth.uid() = user_id);
    END IF;
END
$$;
