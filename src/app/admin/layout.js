'use client';

import RoleGuard from '@/components/auth/RoleGuard';

export default function AdminLayoutWrapper({ children }) {
    return (
        <RoleGuard allowedRoles={['admin']}>
            {children}
        </RoleGuard>
    );
}
