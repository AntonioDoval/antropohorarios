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

-- Tabla para almacenar datos de horarios
CREATE TABLE horarios_data (
    id SERIAL PRIMARY KEY,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE horarios_data ENABLE ROW LEVEL SECURITY;

-- Política que permite lectura pública
CREATE POLICY "Permitir lectura pública" ON horarios_data
    FOR SELECT USING (true);

-- Política que permite escritura solo con autenticación
CREATE POLICY "Permitir escritura autenticada" ON horarios_data
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir actualización autenticada" ON horarios_data
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir eliminación autenticada" ON horarios_data
    FOR DELETE USING (auth.role() = 'authenticated');

-- Tabla para almacenar equivalencias de asignaturas por plan
CREATE TABLE planes_estudios (
    id SERIAL PRIMARY KEY,
    cod85 VARCHAR(50),
    cod23 VARCHAR(50),
    nombre TEXT NOT NULL,
    nombreCorto TEXT,
    nombreSiglas VARCHAR(20),
    ciclo TEXT,
    electividad TEXT,
    area TEXT,
    correlatividad TEXT,
    plan VARCHAR(4) NOT NULL, -- '1985' o '2023'
    orientacion VARCHAR(20) NOT NULL, -- 'profesorado', 'sociocultural', 'arqueologia'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimizar consultas
CREATE INDEX idx_planes_estudios_plan ON planes_estudios(plan);
CREATE INDEX idx_planes_estudios_orientacion ON planes_estudios(orientacion);
CREATE INDEX idx_planes_estudios_cod85 ON planes_estudios(cod85) WHERE cod85 IS NOT NULL;
CREATE INDEX idx_planes_estudios_cod23 ON planes_estudios(cod23) WHERE cod23 IS NOT NULL;

-- Habilitar Row Level Security
ALTER TABLE planes_estudios ENABLE ROW LEVEL SECURITY;

-- Política que permite lectura pública
CREATE POLICY "Permitir lectura pública planes" ON planes_estudios
    FOR SELECT USING (true);

-- Política que permite escritura solo con autenticación
CREATE POLICY "Permitir escritura autenticada planes" ON planes_estudios
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir actualización autenticada planes" ON planes_estudios
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir eliminación autenticada planes" ON planes_estudios
    FOR DELETE USING (auth.role() = 'authenticated');