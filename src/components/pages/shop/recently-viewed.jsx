'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

export default function RecentlyViewed() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadRecentlyViewed = async () => {
            const viewedIds = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
            if (viewedIds.length === 0) return;

            // Take only last 4 items
            const recentIds = viewedIds.slice(0, 4);

            try {
                // Fetch details for these products
                // Ideally we should have a bulk fetch endpoint, but for now we'll fetch individually or use a search query
                // Using search query with IDs might be tricky if backend doesn't support it directly
                // Let's fetch individually for now (limit is small)
                const promises = recentIds.map(id => api.get(`/products/${id}`).catch(() => null));
                const responses = await Promise.all(promises);
                const validProducts = responses
                    .filter(res => res && res.data)
                    .map(res => res.data);

                setProducts(validProducts);
            } catch (error) {
                console.error('Failed to load recently viewed products:', error);
            }
        };

        loadRecentlyViewed();
    }, []);

    if (products.length === 0) return null;

    return (
        <section className="py-12 border-t border-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center mb-8">Recently Viewed</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="group">
                            <div className="relative overflow-hidden rounded-lg mb-4 aspect-square bg-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                                />
                                {product.discount > 0 && (
                                    <span className="absolute top-4 right-4 bg-red-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        -{product.discount}%
                                    </span>
                                )}
                                {product.isNew && (
                                    <span className="absolute top-4 left-4 bg-green-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        New
                                    </span>
                                )}

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Link
                                        href={`/shop/${product._id}`}
                                        className="bg-white text-[#B88E2F] px-6 py-2 rounded font-semibold hover:bg-[#B88E2F] hover:text-white transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-[#3A3A3A] mb-1">{product.title}</h3>
                            <p className="text-sm text-[#898989] mb-2 truncate">{product.subtitle}</p>
                            <div className="flex items-center gap-3">
                                <span className="text-lg font-semibold text-[#3A3A3A]">
                                    Rp {product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-sm text-[#B0B0B0] line-through">
                                        Rp {product.originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
