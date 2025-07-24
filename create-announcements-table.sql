-- Crear tabla para anuncios
CREATE TABLE IF NOT EXISTS announcements (
  id BIGSERIAL PRIMARY KEY,
  enabled BOOLEAN NOT NULL DEFAULT false,
  title TEXT,
  text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública
CREATE POLICY "Allow read access to all users" ON announcements
FOR SELECT
TO public
USING (true);

-- Política para escribir solo usuarios autenticados
CREATE POLICY "Allow write access to authenticated users only" ON announcements
FOR INSERT, UPDATE, DELETE
TO authenticated
USING (true);
