import { supabase } from './supabase';

export interface UserProfile {
  id: string;
  user_id: string;
  avatar_id: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Get user profile from database
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      // PGRST116 = No rows returned (profile doesn't exist)
      if (error.code === 'PGRST116') {
        return null;
      }
      // 42P01 = relation "profiles" does not exist (table not created)
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        console.warn('Profiles table does not exist. Please run the migration to create it.');
        return null;
      }
      // 404 = Table not found
      if (error.message?.includes('404') || error.message?.includes('Not Found')) {
        console.warn('Profiles table not found. Please create it in your Supabase database.');
        return null;
      }
      // For other errors, log but don't throw
      console.error('Error getting user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

/**
 * Create or update user profile with avatar_id
 */
export async function saveUserProfile(avatarId: number): Promise<UserProfile> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Check if profile exists
    const existingProfile = await getUserProfile();

    if (existingProfile) {
      // Update existing profile
      const { data, error } = await supabase
        .from('profiles')
        .update({ avatar_id: avatarId, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        // Check if table doesn't exist
        if (error.code === '42P01' || error.message?.includes('does not exist') || error.message?.includes('404')) {
          throw new Error('Profiles table does not exist. Please create it in your Supabase database. See supabase/migrations/20240101000000_create_profiles_table.sql');
        }
        throw error;
      }
      return data;
    } else {
      // Create new profile
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          avatar_id: avatarId,
        })
        .select()
        .single();

      if (error) {
        // Check if table doesn't exist
        if (error.code === '42P01' || error.message?.includes('does not exist') || error.message?.includes('404')) {
          throw new Error('Profiles table does not exist. Please create it in your Supabase database. See supabase/migrations/20240101000000_create_profiles_table.sql');
        }
        throw error;
      }
      return data;
    }
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
}

/**
 * Check if user has completed profile setup (has avatar)
 */
export async function hasProfileSetup(): Promise<boolean> {
  const profile = await getUserProfile();
  return profile !== null && profile.avatar_id !== null && profile.avatar_id !== undefined;
}

