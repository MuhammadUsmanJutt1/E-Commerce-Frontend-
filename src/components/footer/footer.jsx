import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white pt-12 pb-8 border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Brand & Address */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-black">Funiro.</h2>
                        <address className="not-italic text-gray-500 text-sm leading-relaxed">
                            400 University Drive Suite 200 Coral <br />
                            Gables, <br />
                            FL 33134 USA
                        </address>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-gray-400 font-medium">Links</h3>
                        <nav className="flex flex-col gap-4 font-medium text-black">
                            <Link href="/" className="hover:underline">Home</Link>
                            <Link href="/shop" className="hover:underline">Shop</Link>
                            <Link href="/about" className="hover:underline">About</Link>
                            <Link href="/contact" className="hover:underline">Contact</Link>
                        </nav>
                    </div>

                    {/* Help */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-gray-400 font-medium">Help</h3>
                        <nav className="flex flex-col gap-4 font-medium text-black">
                            <Link href="/payment-options" className="hover:underline">Payment Options</Link>
                            <Link href="/returns" className="hover:underline">Returns</Link>
                            <Link href="/privacy-policies" className="hover:underline">Privacy Policies</Link>
                        </nav>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-gray-400 font-medium">Newsletter</h3>
                        <form className="flex flex-wrap gap-4">
                            <input
                                type="email"
                                placeholder="Enter Your Email Address"
                                className="border-b border-black text-sm py-1 outline-none placeholder:text-gray-400 flex-1 min-w-[200px]"
                            />
                            <button
                                type="submit"
                                className="border-b border-black text-sm font-medium uppercase py-1 hover:text-gray-600 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-200 pt-8">
                    <p className="text-black text-sm">
                        2023 funiro. All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}