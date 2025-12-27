'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import api from '@/lib/api';
import { Search, User, Mail, Shield, X } from 'lucide-react';

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const { data } = await api.get('/auth/users');
            setCustomers(data);
        } catch (error) {
            console.error('Failed to fetch customers:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleApprove = async (userId) => {
        try {
            await api.post(`/auth/approve/${userId}`);
            fetchCustomers();
        } catch (error) {
            console.error('Failed to approve vendor:', error);
            alert('Failed to approve vendor');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Customers</h1>
                    <div className="bg-white px-3 sm:px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 self-start sm:self-auto">
                        Total Users: <span className="font-bold text-[#B88E2F]">{customers.length}</span>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-4 sm:mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B88E2F] text-sm sm:text-base"
                        />
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Customers Grid */}
                {loading ? (
                    <div className="text-center py-12 text-gray-500">
                        <div className="animate-spin w-8 h-8 border-2 border-[#B88E2F] border-t-transparent rounded-full mx-auto mb-4"></div>
                        Loading customers...
                    </div>
                ) : filteredCustomers.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <User size={48} className="mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500">No customers found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                        {filteredCustomers.map((customer) => (
                            <div key={customer._id} className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-3 sm:mb-4">
                                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-base sm:text-lg flex-shrink-0">
                                            {customer.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{customer.name}</h3>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${customer.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                customer.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-600'
                                                }`}>
                                                {customer.role.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                                        <Mail size={14} className="flex-shrink-0" />
                                        <span className="truncate">{customer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                                        <Shield size={14} className="flex-shrink-0" />
                                        <span>ID: {customer._id.slice(-8).toUpperCase()}</span>
                                    </div>

                                    {/* Vendor Details */}
                                    {customer.role === 'vendor' && customer.vendorDetails && (
                                        <div className="pt-3 border-t border-gray-100 mt-3">
                                            <div className="flex justify-between items-start mb-2 gap-2">
                                                <p className="text-xs font-semibold text-gray-500 uppercase">Vendor Info</p>
                                                {!customer.isApproved && (
                                                    <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium whitespace-nowrap">
                                                        Pending
                                                    </span>
                                                )}
                                                {customer.isApproved && (
                                                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                                        Approved
                                                    </span>
                                                )}
                                            </div>
                                            <div className="space-y-1 text-xs sm:text-sm text-gray-600 mb-3">
                                                <p className="truncate"><span className="font-medium">Business:</span> {customer.vendorDetails.businessName}</p>
                                                <p><span className="font-medium">Phone:</span> {customer.vendorDetails.phone}</p>
                                                <p><span className="font-medium">Tax ID:</span> {customer.vendorDetails.taxId}</p>
                                            </div>
                                            {!customer.isApproved && (
                                                <button
                                                    onClick={() => handleApprove(customer._id)}
                                                    className="w-full py-2 bg-green-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-green-700 active:bg-green-800 transition-colors"
                                                >
                                                    Approve Vendor
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                                        <span>Joined {formatDate(customer.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Results count */}
                {!loading && filteredCustomers.length > 0 && (
                    <p className="text-sm text-gray-500 mt-4 text-center sm:text-left">
                        Showing {filteredCustomers.length} of {customers.length} customers
                    </p>
                )}
            </div>
        </AdminLayout>
    );
}
