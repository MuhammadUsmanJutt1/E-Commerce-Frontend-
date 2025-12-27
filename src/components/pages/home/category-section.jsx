'use client';

import React from 'react';
import Card from '../common/card';
import { useProducts } from '@/context/ProductsContext';
import Link from 'next/link';

const CategorySection = ({ category, title }) => {
    const { products, loading } = useProducts();
    
    const categoryProducts = products
        .filter(product => product.topCategory === category || product.category === category)
        .slice(0, 4);

    if (loading) {
        return (
            <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-16">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-[#3A3A3A] mb-6 sm:mb-8">{title}</h2>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-gray-200 animate-pulse h-[300px] sm:h-[350px] lg:h-[400px] rounded" />
                    ))}
                </div>
            </section>
        );
    }

    if (categoryProducts.length === 0) {
        return null;
    }

    return (
        <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-[#3A3A3A] mb-6 sm:mb-8">{title}</h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {categoryProducts.map(product => (
                    <Link key={product.id} href={`/shop/${product.id}`}>
                        <Card product={product} />
                    </Link>
                ))}
            </div>
            {products.filter(p => p.topCategory === category || p.category === category).length > 4 && (
                <div className="text-center mt-4 sm:mt-6">
                    <Link
                        href={`/shop?category=${category}`}
                        className="text-[#B88E2F] font-semibold hover:underline text-sm sm:text-base"
                    >
                        Show More {title}
                    </Link>
                </div>
            )}
        </section>
    );
};

export default CategorySection;
