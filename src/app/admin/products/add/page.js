'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import { useProducts } from '@/context/ProductsContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

export default function AddProductPage() {
    const router = useRouter();
    const { addProduct } = useProducts();
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        price: '',
        originalPrice: '',
        discount: '',
        category: 'Chairs',
        stock: '',
        isNew: false,
        isFeatured: false,
        image: '/images/shelf.png' // Default image
    });

    const categories = ['Chairs', 'Sofas', 'Tables', 'Beds', 'Storage'];

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setSelectedFiles(prev => [...prev, ...files]);
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviewUrls(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrls = [];

            // Upload all selected files
            if (selectedFiles.length > 0) {
                for (const file of selectedFiles) {
                    const uploadFormData = new FormData();
                    uploadFormData.append('file', file);
                    const { data } = await api.post('/products/upload', uploadFormData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                    imageUrls.push(data.url);
                }
            } else {
                // Keep default if no files selected
                imageUrls.push(formData.image);
            }

            const productData = {
                ...formData,
                image: imageUrls[0], // Main image is the first one
                images: imageUrls,
                price: parseInt(formData.price),
                originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : undefined,
                discount: formData.discount ? parseInt(formData.discount) : undefined,
                stock: parseInt(formData.stock)
            };

            await addProduct(productData);
            router.push('/admin/products');
        } catch (error) {
            console.error('Failed to add product:', error);
            alert('Failed to add product');
        }
    };

    return (
        <AdminLayout>
            <div>
                <Link
                    href="/admin/products"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft size={20} />
                    Back to Products
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                            />
                        </div>

                        {/* Subtitle */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subtitle *
                            </label>
                            <input
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price (Rp) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                            />
                        </div>

                        {/* Original Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Original Price (Rp)
                            </label>
                            <input
                                type="number"
                                name="originalPrice"
                                value={formData.originalPrice}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                            />
                        </div>

                        {/* Discount */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Discount (%)
                            </label>
                            <input
                                type="number"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                min="0"
                                max="100"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Stock Quantity *
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Images
                            </label>
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-4">
                                    {previewUrls.map((url, index) => (
                                        <div key={index} className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200 group">
                                            <img
                                                src={url}
                                                alt={`Preview ${index}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#B88E2F] hover:bg-gray-50 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-2">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                        <span className="text-xs text-gray-500">Add Image</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Upload product images. Supported formats: JPG, PNG, WEBP. First image will be the main image.
                                </p>
                            </div>
                        </div>

                        {/* Checkboxes */}
                        <div className="md:col-span-2 flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isNew"
                                    checked={formData.isNew}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-[#B88E2F] border-gray-300 rounded focus:ring-[#B88E2F]"
                                />
                                <span className="text-sm text-gray-700">Mark as New</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-[#B88E2F] border-gray-300 rounded focus:ring-[#B88E2F]"
                                />
                                <span className="text-sm text-gray-700">Mark as Featured</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex gap-4">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-[#B88E2F] text-white rounded-lg hover:bg-[#9F7A28] transition-colors"
                        >
                            Add Product
                        </button>
                        <Link
                            href="/admin/products"
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
