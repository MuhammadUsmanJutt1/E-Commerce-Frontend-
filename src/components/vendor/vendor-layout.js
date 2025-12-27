'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ArrowLeft, Menu, X, User, Settings } from 'lucide-react';

const vendorRoutes = [
    { name: 'Dashboard', path: '/vendor', icon: LayoutDashboard },
    { name: 'My Products', path: '/vendor/products', icon: Package },
    { name: 'Profile', path: '/vendor/profile', icon: User },
];

export default function VendorLayout({ children }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 transition-colors duration-300">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 z-30">
                <h1 className="text-lg sm:text-xl font-bold text-[#B88E2F]">Vendor Panel</h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    aria-label="Toggle menu"
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-full w-64 sm:w-72 bg-white border-r border-gray-200 transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}>
                <div className="p-4 sm:p-6 flex justify-between items-center border-b border-gray-100 lg:border-b-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#B88E2F]">Vendor Panel</h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="px-3 sm:px-4 py-2">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 sm:px-4 py-3 mb-4 text-gray-600 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="text-sm sm:text-base">Back to Store</span>
                    </Link>

                    {vendorRoutes.map((route) => {
                        const Icon = route.icon;
                        const isActive = pathname === route.path;

                        return (
                            <Link
                                key={route.path}
                                href={route.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 sm:px-4 py-3 mb-2 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#B88E2F] text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="text-sm sm:text-base">{route.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="lg:ml-64 xl:ml-72 p-3 sm:p-4 md:p-6 lg:p-8 min-h-screen">
                {children}
            </main>
        </div>
    );
}
