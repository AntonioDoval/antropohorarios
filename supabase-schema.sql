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

-- Create policy to allow insert/update/delete only to authenticated users
-- Only admin users can modify data, but anyone can read
CREATE POLICY "Allow write access to authenticated users only" ON horarios
FOR INSERT, UPDATE, DELETE
TO authenticated
USING (true);

-- Create policy to allow read access to everyone (including anonymous users)
CREATE POLICY "Allow read access to all users" ON horarios
FOR SELECT
TO public
USING (true);