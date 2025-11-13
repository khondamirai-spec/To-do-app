import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const type = requestUrl.searchParams.get('type')
  const code = requestUrl.searchParams.get('code')

  // Handle password recovery
  if (type === 'recovery') {
    return NextResponse.redirect(new URL('/auth/reset-password?recovery=true', requestUrl.origin))
  }

  // Handle OAuth callback (Google, etc.)
  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    
    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey)
      
      // Exchange code for session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(new URL('/auth/login?error=oauth_error', requestUrl.origin))
      }

      // Check if user has profile setup
      if (data.user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('avatar_id')
            .eq('user_id', data.user.id)
            .single()

          // If table doesn't exist or no profile or no avatar_id, redirect to setup-profile
          if (error || !profile || !profile.avatar_id) {
            return NextResponse.redirect(new URL('/auth/setup-profile', requestUrl.origin))
          }
        } catch (error) {
          // If there's any error (including table not existing), redirect to setup-profile
          return NextResponse.redirect(new URL('/auth/setup-profile', requestUrl.origin))
        }
      }
    }
  }

  // Redirect to app after successful auth
  // The client-side Supabase will handle the session automatically
  return NextResponse.redirect(new URL('/app', requestUrl.origin))
}

