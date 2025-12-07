'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/nav-bar/nav-bar';
import Footer from '@/components/footer/footer';
import Card from '@/components/pages/common/card';
import FilterSidebar from '@/components/shop/filter-sidebar';
import Breadcrumb from '@/components/pages/common/breadcrumb';
import { useProducts } from '@/context/ProductsContext';
import { Grid, List } from 'lucide-react';

export default function ShopPage() {
    const { products } = useProducts();
    const [filters, setFilters] = useState({
        categories: [],
        colors: [],
        sizes: [],
        maxPrice: 20000000
    });
    const [sortBy, setSortBy] = useState('default');
    const [viewMode, setViewMode] = useState('grid');

    // Filter products
    const filteredProducts = products.filter(product => {
        if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
            return false;
        }
        if (product.price > filters.maxPrice) {
            return false;
        }
        return true;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'name':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });

    return (
        <div className="bg-white min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#F9F1E7] py-12">
                <div className="container mx-auto px-4">
                    <Breadcrumb items={[{ label: 'Shop' }]} />
                    <h1 className="text-4xl font-bold text-[#3A3A3A] mt-4">Shop</h1>
                </div>
            </div>

            {/* Toolbar */}
            <div className="border-b border-gray-200 bg-[#F9F1E7] py-4">
                <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#B88E2F] text-white' : 'text-[#3A3A3A] hover:bg-gray-200'}`}
                        >
                            <Grid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#B88E2F] text-white' : 'text-[#3A3A3A] hover:bg-gray-200'}`}
                        >
                            <List size={20} />
                        </button>
                        <span className="text-sm text-[#3A3A3A]">
                            Showing {sortedProducts.length} results
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="text-sm text-[#3A3A3A]">Sort by:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                        >
                            <option value="default">Default</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="name">Name: A to Z</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <FilterSidebar filters={filters} onFilterChange={setFilters} />
                    </aside>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        <div className={`grid gap-8 ${viewMode === 'grid'
                            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                            : 'grid-cols-1'
                            }`}>
                            {sortedProducts.map((product) => (
                                <Link key={product.id} href={`/shop/${product.id}`}>
                                    <Card product={product} />
                                </Link>
                            ))}
                        </div>

                        {sortedProducts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-[#898989] text-lg">No products found matching your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
