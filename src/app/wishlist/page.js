'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/nav-bar/nav-bar';
import Footer from '@/components/footer/footer';
import Breadcrumb from '@/components/pages/common/breadcrumb';

export default function WishlistPage() {
    // TODO: Implement wishlist functionality with context
    const wishlistItems = [];

    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#F9F1E7] py-12">
                <div className="container mx-auto px-4">
                    <Breadcrumb items={[{ label: 'Wishlist' }]} />
                    <h1 className="text-4xl font-bold text-[#3A3A3A] mt-4">My Wishlist</h1>
                </div>
            </div>

            {/* Wishlist Content */}
            <div className="container mx-auto px-4 py-16">
                {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-[#898989] text-lg mb-6">Your wishlist is empty</p>
                        <Link
                            href="/shop"
                            className="inline-block bg-[#B88E2F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9F7A28] transition-colors"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Wishlist items will be displayed here */}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
