'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import Card from '@/components/pages/common/card';

export default function RecommendedProducts({ currentProductId }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentProductId) return;

        const fetchRecommendations = async () => {
            try {
                const { data } = await api.get(`/products/${currentProductId}/recommendations`);
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch recommendations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [currentProductId]);

    if (loading || products.length === 0) return null;

    return (
        <div className="py-16 border-t border-gray-100">
            <h2 className="text-3xl font-bold text-center text-[#3A3A3A] mb-8">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <Link key={product._id || product.id} href={`/shop/${product._id || product.id}`}>
                        <Card product={product} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
