'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import VendorLayout from '@/components/vendor/vendor-layout';
import api from '@/lib/api';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function VendorEditProductPage({ params }) {
    const router = useRouter();
    const { id } = params;
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'Chairs',
        stock: '',
        isNew: false,
        isFeatured: false
    });

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data } = await api.get(`/products/${id}`);
            setFormData({
                title: data.title,
                subtitle: data.subtitle,
                description: data.description,
                price: data.price,
                originalPrice: data.originalPrice || '',
                category: data.category,
                stock: data.stock,
                isNew: data.isNew,
                isFeatured: data.isFeatured
            });
            if (data.image) {
                setPreviewUrl(data.image);
            }
        } catch (err) {
            console.error('Failed to fetch product:', err);
            setError('Failed to load product details');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const removeImage = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            let imageUrl = previewUrl;

            // Upload new image if selected
            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                const uploadRes = await api.post('/products/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                imageUrl = uploadRes.data.url;
            }

            const productData = {
                ...formData,
                price: Number(formData.price),
                originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
                stock: Number(formData.stock),
                image: imageUrl
            };

            await api.patch(`/products/${id}`, productData);
            router.push('/vendor/products');
        } catch (err) {
            console.error('Failed to update product:', err);
            setError(err.response?.data?.message || 'Failed to update product');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <VendorLayout>
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">Loading product...</p>
                </div>
            </VendorLayout>
        );
    }

    return (
        <VendorLayout>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/vendor/products" className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                                <input
                                    type="text"
                                    name="subtitle"
                                    value={formData.subtitle}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing & Inventory</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rp)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (Optional)</label>
                                <input
                                    type="number"
                                    name="originalPrice"
                                    value={formData.originalPrice}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                                >
                                    <option value="Chairs">Chairs</option>
                                    <option value="Sofas">Sofas</option>
                                    <option value="Tables">Tables</option>
                                    <option value="Beds">Beds</option>
                                    <option value="Storage">Storage</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Image</h2>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#B88E2F] transition-colors">
                            {previewUrl ? (
                                <div className="relative w-full max-w-md mx-auto aspect-video">
                                    <Image
                                        src={previewUrl}
                                        alt="Preview"
                                        fill
                                        className="object-contain rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <Upload size={48} className="text-gray-400 mb-4" />
                                    <label className="cursor-pointer">
                                        <span className="bg-[#B88E2F] text-white px-6 py-2 rounded-lg hover:bg-[#9F7A28] transition-colors inline-block">
                                            Choose Image
                                        </span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    <p className="text-gray-500 mt-2 text-sm">PNG, JPG up to 5MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Settings</h2>

                        <div className="flex gap-8">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isNew"
                                    checked={formData.isNew}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-[#B88E2F] rounded focus:ring-[#B88E2F]"
                                />
                                <span className="text-gray-700">Mark as New Arrival</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-[#B88E2F] rounded focus:ring-[#B88E2F]"
                                />
                                <span className="text-gray-700">Mark as Featured</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Link
                            href="/vendor/products"
                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-8 py-3 bg-[#B88E2F] text-white rounded-lg hover:bg-[#9F7A28] font-medium disabled:opacity-50"
                        >
                            {submitting ? 'Updating...' : 'Update Product'}
                        </button>
                    </div>
                </form>
            </div>
        </VendorLayout>
    );
}
