'use client';

import React from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { useProducts } from '@/context/ProductsContext';
import { Package, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function AdminDashboard() {
    const { products } = useProducts();

    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    const lowStockProducts = products.filter(p => p.stock < 10).length;
    const featuredProducts = products.filter(p => p.isFeatured).length;

    const stats = [
        {
            title: 'Total Products',
            value: totalProducts,
            icon: Package,
            color: 'bg-blue-500'
        },
        {
            title: 'Total Inventory Value',
            value: `Rp ${(totalValue / 1000000).toFixed(1)}M`,
            icon: DollarSign,
            color: 'bg-green-500'
        },
        {
            title: 'Low Stock Items',
            value: lowStockProducts,
            icon: ShoppingCart,
            color: 'bg-red-500'
        },
        {
            title: 'Featured Products',
            value: featuredProducts,
            icon: TrendingUp,
            color: 'bg-purple-500'
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
                            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
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

                {/* Recent Products */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Products</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Product</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Price</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Stock</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.slice(0, 5).map((product) => (
                                    <tr key={product.id} className="border-b border-gray-100">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden relative">
                                                    {product.image && (
                                                        <Image
                                                            src={product.image}
                                                            alt={product.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-900">{product.title}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-600">{product.category}</td>
                                        <td className="py-3 px-4 text-sm text-gray-900">Rp {product.price.toLocaleString()}</td>
                                        <td className="py-3 px-4 text-sm text-gray-600">{product.stock}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${product.stock < 10
                                                ? 'bg-red-100 text-red-600'
                                                : 'bg-green-100 text-green-600'
                                                }`}>
                                                {product.stock < 10 ? 'Low Stock' : 'In Stock'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
