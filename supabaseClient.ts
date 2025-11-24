import type { SupabaseClient } from '@supabase/supabase-js';

// Singleton pattern to ensure we only initialize the client once.
let supabaseInstance: SupabaseClient | null = null;
let initializationPromise: Promise<SupabaseClient | null> | null = null;

/**
 * Gets the singleton Supabase client instance, initializing it if necessary.
 * This approach is robust against Content Security Policy (CSP) issues in
 * environments like AI Studio, as it loads the Supabase library dynamically.
 * @returns A promise that resolves to the Supabase client instance or null if initialization fails.
 */
export const getSupabaseClient = (): Promise<SupabaseClient | null> => {
    if (supabaseInstance) {
        return Promise.resolve(supabaseInstance);
    }
    
    if (initializationPromise) {
        return initializationPromise;
    }

    initializationPromise = new Promise(async (resolve) => {
        try {
            // Dynamically import the Supabase client library.
            const { createClient } = await import('@supabase/supabase-js');
            
            const supabaseUrl = 'https://qsikfiqqjxgichvjkvbz.supabase.co';
            const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzaWtmaXFxanhnaWNodmprdmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxOTI0MDAsImV4cCI6MjA3ODc2ODQwMH0.dVWNQ1-8vDbMSAtdBu9pd9V2NdgqzcxI4eSV2FpwqUk';
            
            if (supabaseUrl && supabaseAnonKey) {
                supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
                resolve(supabaseInstance);
            } else {
                console.error("Supabase URL or Anon Key is not configured.");
                resolve(null);
            }
        } catch (error) {
            console.error("Failed to dynamically load or initialize Supabase. This may be due to a network or CSP issue.", error);
            resolve(null);
        }
    });

    return initializationPromise;
};


export const signUpWithEmail = async (email: string, password: string) => {
    const supabase = await getSupabaseClient();
    if (!supabase) throw new Error("Supabase client is not available.");
    
    const displayName = email.split('@')[0];
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                display_name: displayName,
            }
        }
    });
    return { user: data.user, error };
};

export const signInWithEmail = async (email: string, password: string) => {
    const supabase = await getSupabaseClient();
    if (!supabase) throw new Error("Supabase client is not available.");
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { user: data.user, error };
};

export const signOutUser = async () => {
    const supabase = await getSupabaseClient();
    if (!supabase) {
        console.error("Could not sign out: Supabase client is not available.");
        return;
    }
    try {
        await supabase.auth.signOut();
    } catch (error) {
        console.error("Sign out error", error);
    }
};
