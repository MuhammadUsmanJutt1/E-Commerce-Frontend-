'use client';

import React, { useEffect, useState } from 'react';
import VendorLayout from '@/components/vendor/vendor-layout';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Package, DollarSign, TrendingUp } from 'lucide-react';

export default function VendorDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalSales: 0, // Placeholder
        revenue: 0 // Placeholder
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const { data } = await api.get('/products/vendor/me');
            setStats(prev => ({
                ...prev,
                totalProducts: data.length
            }));
        } catch (error) {
            console.error('Failed to fetch vendor stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <VendorLayout>
            <div>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Welcome back, {user?.vendorDetails?.businessName || user?.name}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                <Package size={24} />
                            </div>
                            <span className="text-sm text-green-600 font-medium">+12%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{loading ? '...' : stats.totalProducts}</h3>
                        <p className="text-gray-500 text-sm">Total Products</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-100 rounded-full text-green-600">
                                <DollarSign size={24} />
                            </div>
                            <span className="text-sm text-green-600 font-medium">+8%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Rp 0</h3>
                        <p className="text-gray-500 text-sm">Total Revenue</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                                <TrendingUp size={24} />
                            </div>
                            <span className="text-sm text-green-600 font-medium">+24%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">0</h3>
                        <p className="text-gray-500 text-sm">Total Sales</p>
                    </div>
                </div>

                {/* Recent Activity Placeholder */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="text-center py-8 text-gray-500">
                        No recent activity to show.
                    </div>
                </div>
            </div>
        </VendorLayout>
    );
}
