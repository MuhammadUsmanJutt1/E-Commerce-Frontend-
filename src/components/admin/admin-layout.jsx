'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, ArrowLeft } from 'lucide-react';

const adminRoutes = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', path: '/admin/customers', icon: Users },
];

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-100 transition-colors duration-300">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transition-colors duration-300">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-[#B88E2F]">Funiro Admin</h1>
                </div>

                <nav className="px-4">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 mb-4 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Store</span>
                    </Link>

                    {adminRoutes.map((route) => {
                        const Icon = route.icon;
                        const isActive = pathname === route.path;

                        return (
                            <Link
                                key={route.path}
                                href={route.path}
                                className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#B88E2F] text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon size={20} />
                                <span>{route.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
