'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/nav-bar/nav-bar';
import Footer from '@/components/footer/footer';
import Breadcrumb from '@/components/pages/common/breadcrumb';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Trash2 } from 'lucide-react';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist, loading } = useWishlist();
    const { addToCart } = useCart();

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-xl text-gray-500">Loading wishlist...</p>
                </div>
                <Footer />
            </div>
        );
    }

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
                {wishlist.length === 0 ? (
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
                        {wishlist.map((product) => (
                            <div key={product.id} className="bg-white group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                {/* Image */}
                                <div className="relative h-[300px] w-full overflow-hidden">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="bg-white text-[#B88E2F] px-8 py-3 font-semibold hover:bg-[#B88E2F] hover:text-white transition-colors"
                                        >
                                            Add to cart
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(product.id)}
                                            className="text-white flex items-center gap-2 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 bg-[#F4F5F7]">
                                    <h3 className="text-xl font-semibold text-[#3A3A3A] mb-1">{product.title}</h3>
                                    <p className="text-[#898989] text-sm mb-2">{product.subtitle}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-[#3A3A3A]">Rp {product.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
