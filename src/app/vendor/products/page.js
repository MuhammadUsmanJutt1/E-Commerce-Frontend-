'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import VendorLayout from '@/components/vendor/vendor-layout';
import api from '@/lib/api';
import { Plus, Edit, Trash2, Search, Package } from 'lucide-react';
import Image from 'next/image';

export default function VendorProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products/vendor/me');
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, title) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(prev => prev.filter(p => p._id !== id));
            } catch (error) {
                console.error('Failed to delete product:', error);
                alert('Failed to delete product');
            }
        }
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <VendorLayout>
            <div>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
                    <Link
                        href="/vendor/products/add"
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
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-gray-500">Loading products...</td>
                                    </tr>
                                ) : filteredProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-gray-500">No products found</td>
                                    </tr>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <tr key={product._id} className="border-t border-gray-200 hover:bg-gray-50">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden relative">
                                                        {product.image ? (
                                                            <Image
                                                                src={product.image}
                                                                alt={product.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                <Package size={20} />
                                                            </div>
                                                        )}
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
                                                        href={`/vendor/products/edit/${product._id}`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product._id, product.title)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </VendorLayout>
    );
}
