import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'

/**
 * Creates a server-side Supabase client for use in API routes.
 * This client verifies the user's session from the Authorization header.
 * 
 * IMPORTANT: This should ONLY be used in server-side code (API routes).
 * Never use this in client components - use lib/supabase.ts instead.
 */
export async function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  // Get headers from the request
  const headersList = await headers()
  const authHeader = headersList.get('authorization')

  // Extract access token if present
  let accessToken: string | undefined
  if (authHeader && authHeader.startsWith('Bearer ')) {
    accessToken = authHeader.replace('Bearer ', '')
  }

  // Create a Supabase client with the access token in headers if available
  // This ensures RLS policies can identify the authenticated user via the JWT
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: accessToken ? {
        Authorization: `Bearer ${accessToken}`,
      } : {},
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })

  // If we have an access token, verify it's valid
  if (accessToken) {
    try {
      const { data: { user }, error: getUserError } = await supabase.auth.getUser()
      
      if (getUserError || !user) {
        console.warn('[Supabase Server] Invalid access token:', getUserError?.message)
      } else {
        console.log(`[Supabase Server] Authenticated user: ${user.id}`)
      }
    } catch (error) {
      console.warn('[Supabase Server] Error verifying access token:', error)
    }
  }

  return supabase
}

/**
 * Gets the authenticated user from the server-side Supabase client.
 * Expects the Authorization header with Bearer token.
 * Returns null if user is not authenticated.
 */
export async function getServerUser() {
  try {
    const headersList = await headers()
    const authHeader = headersList.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const supabase = await createServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    return user
  } catch (error) {
    console.error('Error getting server user:', error)
    return null
  }
}

