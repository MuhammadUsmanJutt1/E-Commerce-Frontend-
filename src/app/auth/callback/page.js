'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function AuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');

        if (accessToken && refreshToken) {
            // Manually set tokens and user state
            // We might need to fetch the user profile here or let AuthContext handle it
            // Assuming AuthContext has a method to set tokens or we just save to localStorage and reload
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // Trigger a reload or state update to fetch user profile
            window.location.href = '/';
        } else {
            router.push('/login?error=social_login_failed');
        }
    }, [router, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B88E2F]"></div>
        </div>
    );
}

export default function AuthCallback() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B88E2F]"></div>
            </div>
        }>
            <AuthCallbackContent />
        </Suspense>
    );
}
