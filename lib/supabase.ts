
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uzskeuiztprbdbuqtn.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6c2tldWl6dHdwcmViZGJ1cXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NTUwNzMsImV4cCI6MjA2MjAzMTA3M30.qorP9Y9nYSost5GGmoqbYLmC4V8woW5F8JpuiLLzdRI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
