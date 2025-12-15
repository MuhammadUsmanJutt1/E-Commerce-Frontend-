'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Package, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '@/lib/api';

export default function AdminDashboard() {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await api.get('/orders/analytics');
                setAnalytics(data);
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B88E2F]"></div>
                </div>
            </AdminLayout>
        );
    }

    if (!analytics) return null;

    const stats = [
        {
            title: 'Total Revenue',
            value: `Rp ${analytics.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: 'bg-green-500'
        },
        {
            title: 'Total Orders',
            value: analytics.totalOrders,
            icon: ShoppingCart,
            color: 'bg-blue-500'
        },
        {
            title: 'Avg. Order Value',
            value: `Rp ${Math.round(analytics.averageOrderValue).toLocaleString()}`,
            icon: TrendingUp,
            color: 'bg-purple-500'
        },
        {
            title: 'Sales Growth',
            value: '+12.5%', // Placeholder for now
            icon: Package,
            color: 'bg-orange-500'
        }
    ];

    return (
        <AdminLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} p-3 rounded-lg`}>
                                        <Icon className="text-white" size={24} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Sales Chart */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly Sales</h2>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={analytics.monthlySales}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `Rp ${value / 1000}k`} />
                                    <Tooltip
                                        formatter={(value) => [`Rp ${value.toLocaleString()}`, 'Sales']}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="sales" fill="#B88E2F" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Orders Chart */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly Orders</h2>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={analytics.monthlySales}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="orders" fill="#816DFA" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
