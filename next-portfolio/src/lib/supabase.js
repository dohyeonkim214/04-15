import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
const normalizedSupabaseUrl = supabaseUrl?.replace(/\/rest\/v1\/?$/, "");

let cachedClient = null;

function createBrowserSupabaseClient() {
  return createBrowserClient(normalizedSupabaseUrl, supabaseAnonKey);
}

function createServerSupabaseClient() {
  return createClient(normalizedSupabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export function getSupabaseClient() {
  if (!normalizedSupabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase client is not configured");
  }

  // On the server, never share auth state across requests.
  if (typeof window === "undefined") {
    return createServerSupabaseClient();
  }

  if (cachedClient) return cachedClient;

  cachedClient = createBrowserSupabaseClient();
  return cachedClient;
}

export const supabase = (() => {
  try {
    return getSupabaseClient();
  } catch {
    return null;
  }
})();
