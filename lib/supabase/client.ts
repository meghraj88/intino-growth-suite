
import { createBrowserClient } from "@supabase/ssr"

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  // Prevent client creation during build time
  if (typeof window === 'undefined') {
    return null as any;
  }

  if (!client) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase environment variables not configured');
      return null as any;
    }
    
    client = createBrowserClient(supabaseUrl, supabaseKey);
  }
  return client;
}
