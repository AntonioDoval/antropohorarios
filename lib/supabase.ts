import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://uzskeuiztprbdbuqtn.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6c2tldWl6dHdwcmViZGJ1cXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NTUwNzMsImV4cCI6MjA2MjAzMTA3M30.qorP9Y9nYSost5GGmoqbYLmC4V8woW5F8JpuiLLzdRI'

console.log('Supabase URL:', supabaseUrl ? 'Configured' : 'Missing')
console.log('Supabase Key:', supabaseAnonKey ? 'Configured' : 'Missing')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration missing. Please check environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)