
-- Create the horarios table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS horarios (
  id BIGSERIAL PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create an index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_horarios_created_at ON horarios(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE horarios ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access to all users
CREATE POLICY "Allow read access to all users" ON horarios
FOR SELECT
TO public
USING (true);

-- Create policy to allow insert/update/delete to authenticated users only
-- If you want to allow anonymous uploads, change 'authenticated' to 'public'
CREATE POLICY "Allow full access to authenticated users" ON horarios
FOR ALL
TO authenticated
USING (true);

-- If you want to allow anonymous users to upload (less secure but simpler)
-- Uncomment the following and comment out the authenticated policy above:
-- CREATE POLICY "Allow full access to all users" ON horarios
-- FOR ALL
-- TO public
-- USING (true);
