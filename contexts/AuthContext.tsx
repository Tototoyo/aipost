import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import type { User } from '../types';
import { supabase } from '../supabaseClient';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser({ id: session.user.id, email: session.user.email! });
            }
            setLoading(false);
        };

        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session ? { id: session.user.id, email: session.user.email! } : null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);
    
    const login = useCallback(async (email: string, password: string): Promise<void> => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error(error.message);
    }, []);

    const signup = useCallback(async (email: string, password: string): Promise<void> => {
       const { error } = await supabase.auth.signUp({ 
           email, 
           password,
           // Note: You may want to configure email confirmation in your Supabase project settings.
           // For this implementation, we assume it's disabled to log the user in instantly.
        });
       if (error) throw new Error(error.message);
    }, []);

    const logout = useCallback(async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error("Error logging out:", error.message);
    }, []);

    const value = { user, loading, login, signup, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
