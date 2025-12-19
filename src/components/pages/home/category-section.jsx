'use client';

import React from 'react';
import Link from 'next/link';
import Card from '../common/card';
import { useProducts } from '@/context/ProductsContext';

const CategorySection = ({ category, title }) => {
    const { getProductsByCategory } = useProducts();
    const products = getProductsByCategory(category).slice(0, 4); // Show top 4 products

    if (products.length === 0) return null;

    return (
        <section className="py-12 container mx-auto px-4">
            <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-bold text-[#3A3A3A]">{title || category}</h2>
                <Link
                    href={`/shop?category=${category}`}
                    className="hidden md:inline-block text-[#B88E2F] font-semibold hover:text-[#9A7625] transition-colors border-b-2 border-transparent hover:border-[#B88E2F]"
                >
                    Show More
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <Link key={product.id} href={`/shop/${product.id}`}>
                        <Card product={product} />
                    </Link>
                ))}
            </div>

            <div className="mt-8 text-center md:hidden">
                <Link
                    href={`/shop?category=${category}`}
                    className="inline-block px-8 py-2 border border-[#B88E2F] text-[#B88E2F] font-semibold rounded hover:bg-[#B88E2F] hover:text-white transition-colors"
                >
                    Show More
                </Link>
            </div>
        </section>
    );
};

export default CategorySection;
