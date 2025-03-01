import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { createContext } from "react";

export const SupabaseContext = createContext<SupabaseClient | null>(null);

export function SupabaseProvider({
  children,
  supabaseUrl,
  supabaseKey,
}: {
  children: React.ReactNode;
  supabaseUrl: string;
  supabaseKey: string;
}) {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      storage: window.localStorage,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}
