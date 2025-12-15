'use client';

import RoleGuard from '@/components/auth/RoleGuard';

export default function VendorLayoutWrapper({ children }) {
    return (
        <RoleGuard allowedRoles={['vendor']}>
            {children}
        </RoleGuard>
    );
}
