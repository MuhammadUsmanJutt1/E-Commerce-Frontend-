'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ArrowLeft } from 'lucide-react';

const vendorRoutes = [
    { name: 'Dashboard', path: '/vendor', icon: LayoutDashboard },
    { name: 'My Products', path: '/vendor/products', icon: Package },
];

export default function VendorLayout({ children }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 transition-colors duration-300">
            {/* Mobile Header */}
            <div className="md:hidden bg-white p-4 border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-xl font-bold text-[#B88E2F]">Vendor Panel</h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                >
                    <LayoutDashboard size={24} />
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}>
                <div className="p-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-[#B88E2F]">Vendor Panel</h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <ArrowLeft size={20} />
                    </button>
                </div>

                <nav className="px-4">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 mb-4 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Store</span>
                    </Link>

                    {vendorRoutes.map((route) => {
                        const Icon = route.icon;
                        const isActive = pathname === route.path;

                        return (
                            <Link
                                key={route.path}
                                href={route.path}
                                onClick={() => setSidebarOpen(false)}
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

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="md:ml-64 p-4 md:p-8">
                {children}
            </main>
        </div>
    );
}
