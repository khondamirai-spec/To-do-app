'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { hasProfileSetup } from '@/lib/profile';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Check if user has completed profile setup
          const hasProfile = await hasProfileSetup();
          if (!hasProfile) {
            // User needs to set up profile
            router.push('/auth/setup-profile');
          } else {
            // User is logged in and has profile, redirect to /app
            router.push('/app');
          }
        } else {
          // User is not logged in, redirect to login
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-gray-600">Yuklanmoqda...</div>
    </div>
  );
}
