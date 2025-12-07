'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/admin-layout';
import { useProducts } from '@/context/ProductsContext';
import { Plus, Edit, Trash2, Search, Package } from 'lucide-react';

export default function AdminProductsPage() {
    const { products, deleteProduct } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id, title) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            deleteProduct(id);
        }
    };

    return (
        <AdminLayout>
            <div>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                    <Link
                        href="/admin/products/add"
                        className="flex items-center gap-2 bg-[#B88E2F] text-white px-6 py-3 rounded-lg hover:bg-[#9F7A28] transition-colors"
                    >
                        <Plus size={20} />
                        Add Product
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                        />
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Product</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Category</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Price</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Stock</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                                    <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                                                    {/* Placeholder for product image */}
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <Package size={20} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{product.title}</p>
                                                    <p className="text-sm text-gray-500">{product.subtitle}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-600">{product.category}</td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="text-gray-900 font-medium">Rp {product.price.toLocaleString()}</p>
                                                {product.originalPrice && (
                                                    <p className="text-sm text-gray-500 line-through">
                                                        Rp {product.originalPrice.toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-600">{product.stock}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col gap-1">
                                                {product.isNew && (
                                                    <span className="px-2 py-1 text-xs rounded-full bg-teal-100 text-teal-600 w-fit">
                                                        New
                                                    </span>
                                                )}
                                                {product.isFeatured && (
                                                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600 w-fit">
                                                        Featured
                                                    </span>
                                                )}
                                                {product.stock < 10 && (
                                                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600 w-fit">
                                                        Low Stock
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/products/edit/${product.id}`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id, product.title)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No products found</p>
                        </div>
                    )}
                </div>

                <div className="mt-4 text-sm text-gray-600">
                    Showing {filteredProducts.length} of {products.length} products
                </div>
            </div>
        </AdminLayout>
    );
}
