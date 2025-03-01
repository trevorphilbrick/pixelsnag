import { useContext, useEffect, useState } from "react";
import { SupabaseContext } from "../contexts/SupabaseContext";
import { User, Session } from "@supabase/supabase-js";

export const useAuth = () => {
  const supabase = useContext(SupabaseContext);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;

    // Get initial session
    const initializeAuth = async () => {
      try {
        // Get the current session
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();

        console.log(
          "Initial session check:",
          currentSession ? "Session exists" : "No session"
        );

        // Set both session and user if we have a session
        if (currentSession) {
          console.log("Setting user from session:", currentSession.user);
          setSession(currentSession);
          setUser(currentSession.user);
        }
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Set up the auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log(
        "Auth state changed:",
        event,
        newSession ? "Session exists" : "No session"
      );
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Add a refresh session function
  const refreshSession = async () => {
    if (!supabase || !session) return null;

    try {
      const {
        data: { session: newSession },
        error,
      } = await supabase.auth.refreshSession();
      if (error) throw error;

      if (newSession) {
        setSession(newSession);
        setUser(newSession.user);
      }

      return newSession;
    } catch (error) {
      console.error("Error refreshing session:", error);
      return null;
    }
  };

  return {
    user,
    session,
    loading,
    refreshSession,
  };
};
