import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
const normalizedSupabaseUrl = supabaseUrl?.replace(/\/rest\/v1\/?$/, "");

let cachedClient = null;

function createSupabaseClient() {
  return createClient(normalizedSupabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: typeof window !== "undefined",
      autoRefreshToken: typeof window !== "undefined",
      detectSessionInUrl: typeof window !== "undefined",
    },
  });
}

export function getSupabaseClient() {
  if (!normalizedSupabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase client is not configured");
  }

  // On the server, never share auth state across requests.
  if (typeof window === "undefined") {
    return createSupabaseClient();
  }

  if (cachedClient) return cachedClient;

  cachedClient = createSupabaseClient();
  return cachedClient;
}

export const supabase = (() => {
  try {
    return getSupabaseClient();
  } catch {
    return null;
  }
})();
