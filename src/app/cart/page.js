'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/nav-bar/nav-bar';
import Footer from '@/components/footer/footer';
import Breadcrumb from '@/components/pages/common/breadcrumb';
import { Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

    const shipping = 0; // Free shipping
    const total = getCartTotal() + shipping;

    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#F9F1E7] py-12">
                <div className="container mx-auto px-4">
                    <Breadcrumb items={[{ label: 'Cart' }]} />
                    <h1 className="text-4xl font-bold text-[#3A3A3A] mt-4">Cart</h1>
                </div>
            </div>

            {/* Cart Content */}
            <div className="container mx-auto px-4 py-16">
                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-[#898989] text-lg mb-6">Your cart is empty</p>
                        <Link
                            href="/shop"
                            className="inline-block bg-[#B88E2F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9F7A28] transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-[#F9F1E7] p-4 rounded-lg mb-4">
                                <div className="grid grid-cols-5 gap-4 text-sm font-medium text-[#3A3A3A]">
                                    <div className="col-span-2">Product</div>
                                    <div className="text-center">Price</div>
                                    <div className="text-center">Quantity</div>
                                    <div className="text-center">Subtotal</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="grid grid-cols-5 gap-4 items-center py-4 border-b border-gray-200">
                                        <div className="col-span-2 flex items-center gap-4">
                                            <div className="relative w-[105px] h-[105px] bg-[#F9F1E7] rounded-lg overflow-hidden flex-shrink-0">
                                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-normal text-[#3A3A3A]">{item.title}</h3>
                                                <p className="text-sm text-[#898989]">{item.subtitle}</p>
                                            </div>
                                        </div>
                                        <div className="text-center text-[#898989]">
                                            Rp {item.price.toLocaleString()}
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center border border-[#9F9F9F] rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-3 py-1 hover:bg-gray-100"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="text"
                                                    value={item.quantity}
                                                    readOnly
                                                    className="w-12 text-center outline-none bg-transparent"
                                                />
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-3 py-1 hover:bg-gray-100"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#3A3A3A] font-medium">
                                                Rp {(item.price * item.quantity).toLocaleString()}
                                            </span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-[#B88E2F] hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cart Totals */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#F9F1E7] p-8 rounded-lg">
                                <h2 className="text-2xl font-semibold text-[#3A3A3A] mb-6">Cart Totals</h2>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-base font-medium text-[#3A3A3A]">Subtotal</span>
                                        <span className="text-[#898989]">Rp {getCartTotal().toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-base font-medium text-[#3A3A3A]">Shipping</span>
                                        <span className="text-[#898989]">Free</span>
                                    </div>
                                    <div className="flex justify-between pt-4 border-t border-gray-300">
                                        <span className="text-base font-medium text-[#3A3A3A]">Total</span>
                                        <span className="text-xl font-medium text-[#B88E2F]">
                                            Rp {total.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    href="/checkout"
                                    className="block w-full bg-[#B88E2F] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#9F7A28] transition-colors"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
