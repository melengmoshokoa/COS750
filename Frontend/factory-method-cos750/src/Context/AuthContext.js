import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Ensure this path is correct

const AuthContext = React.createContext();

// Hook to easily consume the context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component that manages the Supabase session
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check for an existing session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Listen for authentication state changes (login, logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Cleanup the listener when the component unmounts
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    supabase,
    loading,
  };

  return (
    // Only render children when the loading check is complete
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};