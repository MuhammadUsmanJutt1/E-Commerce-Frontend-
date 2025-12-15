'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Navbar from '@/components/nav-bar/nav-bar';
import Footer from '@/components/footer/footer';
import { Package, User, MapPin, CreditCard, ChevronRight, Box } from 'lucide-react';

export default function ProfilePage() {
    const { user, logout, loading: authLoading } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'profile', 'addresses'

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders');
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoadingOrders(false);
        }
    };

    if (authLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Account</h1>
                <p className="text-gray-600 mb-8">Manage your details and view your orders</p>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-[#B88E2F] rounded-full flex items-center justify-center text-white font-bold text-xl">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                            <nav className="p-2">
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'orders' ? 'bg-[#B88E2F]/10 text-[#B88E2F] font-medium' : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Package size={20} />
                                    Your Orders
                                </button>
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'profile' ? 'bg-[#B88E2F]/10 text-[#B88E2F] font-medium' : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <User size={20} />
                                    Login & Security
                                </button>
                                <button
                                    onClick={() => setActiveTab('addresses')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'addresses' ? 'bg-[#B88E2F]/10 text-[#B88E2F] font-medium' : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <MapPin size={20} />
                                    Your Addresses
                                </button>
                                <div className="my-2 border-t border-gray-100"></div>
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'orders' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900">Your Orders</h2>
                                {loadingOrders ? (
                                    <p className="text-gray-500">Loading orders...</p>
                                ) : orders.length === 0 ? (
                                    <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
                                        <Box size={48} className="mx-auto text-gray-300 mb-4" />
                                        <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                                        <button
                                            onClick={() => router.push('/shop')}
                                            className="bg-[#B88E2F] text-white px-6 py-2 rounded-lg hover:bg-[#9F7A28] transition-colors"
                                        >
                                            Start Shopping
                                        </button>
                                    </div>
                                ) : (
                                    orders.map((order) => (
                                        <div key={order._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap gap-y-4 justify-between items-center">
                                                <div className="flex gap-8">
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase mb-1">Order Placed</p>
                                                        <p className="text-sm font-medium text-gray-900">{formatDate(order.createdAt)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase mb-1">Total</p>
                                                        <p className="text-sm font-medium text-gray-900">Rp {order.totalAmount.toLocaleString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase mb-1">Ship To</p>
                                                        <p className="text-sm font-medium text-gray-900">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-500 uppercase mb-1">Order # {order._id.slice(-8).toUpperCase()}</p>
                                                    <span className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                                'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="flex items-center gap-6 mb-6 last:mb-0">
                                                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden relative flex-shrink-0">
                                                            {/* We might need to fetch product details if not fully populated, but assuming basic info is there */}
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                <Package size={24} />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-gray-900 mb-1">Product ID: {item.product}</h4>
                                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                                            <p className="text-sm text-gray-500">Price: Rp {item.price.toLocaleString()}</p>
                                                        </div>
                                                        <button className="text-[#B88E2F] text-sm font-medium hover:underline">
                                                            Buy it again
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-lg border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Login & Security</h2>
                                <div className="space-y-6 max-w-xl">
                                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Name</p>
                                            <p className="text-gray-600">{user.name}</p>
                                        </div>
                                        <button className="text-[#B88E2F] hover:underline text-sm">Edit</button>
                                    </div>
                                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Email</p>
                                            <p className="text-gray-600">{user.email}</p>
                                        </div>
                                        <button className="text-[#B88E2F] hover:underline text-sm">Edit</button>
                                    </div>
                                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Password</p>
                                            <p className="text-gray-600">********</p>
                                        </div>
                                        <button className="text-[#B88E2F] hover:underline text-sm">Change</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div className="bg-white rounded-lg border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Addresses</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-[#B88E2F] hover:text-[#B88E2F] cursor-pointer transition-colors h-48">
                                        <Plus size={32} className="mb-2" />
                                        <span className="font-medium">Add Address</span>
                                    </div>
                                    {/* Placeholder for existing addresses */}
                                    <div className="border border-gray-200 rounded-lg p-6 relative hover:shadow-md transition-shadow">
                                        <div className="absolute top-4 right-4 text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">Default</div>
                                        <p className="font-bold text-gray-900 mb-2">{user.name}</p>
                                        <p className="text-gray-600 text-sm mb-1">123 Main Street</p>
                                        <p className="text-gray-600 text-sm mb-1">Apartment 4B</p>
                                        <p className="text-gray-600 text-sm mb-4">New York, NY 10001</p>
                                        <div className="flex gap-4 text-sm">
                                            <button className="text-[#B88E2F] hover:underline">Edit</button>
                                            <button className="text-[#B88E2F] hover:underline">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

// Helper component for Plus icon since it wasn't imported
function Plus({ size, className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    );
}
