'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { AvatarPicker } from '@/components/ui/avatar-picker';
import { saveUserProfile, hasProfileSetup } from '@/lib/profile';

export default function SetupProfilePage() {
  const [selectedAvatarId, setSelectedAvatarId] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('Me');
  const router = useRouter();

  useEffect(() => {
    // Get user info and check if they already have a profile
    const loadUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/auth/login');
          return;
        }
        setUserName(user.email?.split('@')[0] || 'Me');
        
        // Check if user already has a profile (they shouldn't be here if they do)
        const hasProfile = await hasProfileSetup();
        if (hasProfile) {
          // User already has profile, redirect to app
          router.push('/app');
          return;
        }
      } catch (error) {
        console.error('Error loading user:', error);
        router.push('/auth/login');
      }
    };
    loadUser();
  }, [router]);

  const handleAvatarSelect = (avatarId: number) => {
    setSelectedAvatarId(avatarId);
  };

  const handleContinue = async () => {
    setLoading(true);
    setError(null);

    try {
      await saveUserProfile(selectedAvatarId);
      // Redirect to app after successful save
      router.push('/app');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Profilni saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profilni sozlash</h1>
          <p className="text-sm text-gray-600">Avataringizni tanlang</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            <div className="font-bold mb-2">❌ Avatar saqlanmadi!</div>
            {error}
            {(error.includes('does not exist') || error.includes('Could not find the table') || error.includes('schema cache')) && (
              <div className="mt-3 p-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                <div className="font-bold text-yellow-900 mb-2">🔧 YECHIM - 2 DAQIQA:</div>
                <ol className="list-decimal list-inside space-y-1 text-xs text-yellow-900">
                  <li>Supabase Dashboard oching: <a href="https://supabase.com/dashboard" target="_blank" className="text-blue-600 underline">supabase.com/dashboard</a></li>
                  <li>SQL Editor ni oching (chap menuda)</li>
                  <li><code className="bg-yellow-100 px-1 rounded">SETUP_AVATAR_TABLE.sql</code> faylini oching</li>
                  <li>Barcha kodni nusxalang va SQL Editor ga yopishtiring</li>
                  <li>"Run" tugmasini bosing</li>
                  <li>Sahifani yangilang va qayta urinib ko'ring</li>
                </ol>
                <div className="mt-2 text-xs text-yellow-800">
                  <strong>Eslatma:</strong> Bu faqat bir marta qilish kerak. Keyin avatar avtomatik saqlanadi!
                </div>
              </div>
            )}
          </div>
        )}

        <AvatarPicker fullName={userName} onAvatarSelect={handleAvatarSelect} />

        <div className="mt-6">
          <button
            onClick={handleContinue}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saqlanmoqda...' : 'Davom etish'}
          </button>
        </div>
      </div>
    </div>
  );
}

