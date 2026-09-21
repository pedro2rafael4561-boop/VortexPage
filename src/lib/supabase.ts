import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xnxignjmejymlhtlpuxn.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueGlnbmptZWp5bWxodGxwdXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1MjQxMTYsImV4cCI6MjEwNTEwMDExNn0.iYaNsS0Sd8QeODef7LDTA4kYF9zzRhBF0cP-bnG4gj4"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
