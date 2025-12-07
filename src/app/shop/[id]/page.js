'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/nav-bar/nav-bar';
import Footer from '@/components/footer/footer';
import Breadcrumb from '@/components/pages/common/breadcrumb';
import Card from '@/components/pages/common/card';
import { useProducts } from '@/context/ProductsContext';
import { useCart } from '@/context/CartContext';
import { Star, Facebook, Linkedin, Twitter, ChevronRight } from 'lucide-react';

export default function SingleProductPage() {
    const params = useParams();
    const router = useRouter();
    const { getProductById, products } = useProducts();
    const { addToCart } = useCart();

    const product = getProductById(params.id);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('L');
    const [selectedColor, setSelectedColor] = useState('Purple');
    const [activeTab, setActiveTab] = useState('description');
    const [selectedImage, setSelectedImage] = useState(0);

    if (!product) {
        return (
            <div>
                <Navbar />
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Product not found</h1>
                    <Link href="/shop" className="text-[#B88E2F] hover:underline">
                        Back to Shop
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const colors = [
        { name: 'Purple', class: 'bg-[#816DFA]' },
        { name: 'Black', class: 'bg-black' },
        { name: 'Gold', class: 'bg-[#B88E2F]' }
    ];

    const thumbnails = [product.image, product.image, product.image, product.image];

    // Get related products (same category, excluding current product)
    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="bg-white transition-colors duration-300">
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-[#F9F1E7] py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 text-sm">
                        <Link href="/" className="text-gray-600 hover:text-[#B88E2F]">
                            Home
                        </Link>
                        <ChevronRight size={16} className="text-gray-400" />
                        <Link href="/shop" className="text-gray-600 hover:text-[#B88E2F]">
                            Shop
                        </Link>
                        <ChevronRight size={16} className="text-gray-400" />
                        <span className="text-gray-900 font-medium">{product.title}</span>
                    </div>
                </div>
            </div>

            {/* Product Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Left: Image Gallery */}
                    <div className="flex gap-4">
                        {/* Thumbnails */}
                        <div className="flex flex-col gap-4">
                            {thumbnails.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`w-20 h-20 bg-[#F9F1E7] rounded-lg overflow-hidden cursor-pointer ${selectedImage === index ? 'ring-2 ring-[#B88E2F]' : ''
                                        }`}
                                >
                                    <Image src={img} alt={`Thumbnail ${index + 1}`} width={80} height={80} className="object-cover w-full h-full" />
                                </div>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="flex-1 bg-[#F9F1E7] rounded-lg overflow-hidden">
                            <div className="relative w-full h-[500px]">
                                <Image src={thumbnails[selectedImage]} alt={product.title} fill className="object-contain p-8" />
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div>
                        <h1 className="text-4xl font-normal text-gray-900 mb-2">{product.title}</h1>
                        <p className="text-2xl text-[#9F9F9F] mb-4">Rs. {product.price.toLocaleString()}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} size={20} className="fill-[#FFC700] text-[#FFC700]" />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">5 Customer Review</span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {product.description || 'Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.'}
                        </p>

                        {/* Size Selection */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-500 mb-3">Size</p>
                            <div className="flex gap-3">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 rounded-lg text-sm font-medium transition-colors ${selectedSize === size
                                            ? 'bg-[#B88E2F] text-white'
                                            : 'bg-[#F9F1E7] text-gray-900 hover:bg-[#B88E2F] hover:text-white'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-500 mb-3">Color</p>
                            <div className="flex gap-3">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-10 h-10 rounded-full ${color.class} ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-gray-900' : ''
                                            }`}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="flex gap-4 mb-8 pb-8 border-b border-gray-200">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-3 text-gray-900 hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                    className="w-16 text-center outline-none bg-transparent text-gray-900"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-3 text-gray-900 hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 px-8 py-3 border border-gray-900 rounded-lg text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                            >
                                Add To Cart
                            </button>

                            <button className="px-8 py-3 border border-gray-900 rounded-lg text-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
                                + Compare
                            </button>
                        </div>

                        {/* Meta Information */}
                        <div className="space-y-3 text-sm">
                            <div className="flex gap-3">
                                <span className="text-gray-500 w-24">SKU</span>
                                <span className="text-gray-900">: SS001</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-gray-500 w-24">Category</span>
                                <span className="text-gray-900">: {product.category}</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-gray-500 w-24">Tags</span>
                                <span className="text-gray-900">: {product.isNew ? 'New, ' : ''}{product.isFeatured ? 'Featured, ' : ''}Furniture</span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <span className="text-gray-500 w-24">Share</span>
                                <div className="flex gap-4">
                                    <Facebook size={20} className="text-gray-900 cursor-pointer hover:text-[#B88E2F]" />
                                    <Linkedin size={20} className="text-gray-900 cursor-pointer hover:text-[#B88E2F]" />
                                    <Twitter size={20} className="text-gray-900 cursor-pointer hover:text-[#B88E2F]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="border-t border-gray-200 pt-12 mb-16">
                    <div className="flex justify-center gap-12 mb-8">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`text-lg pb-2 ${activeTab === 'description'
                                ? 'text-gray-900 border-b-2 border-gray-900'
                                : 'text-gray-500'
                                }`}
                        >
                            Description
                        </button>
                        <button
                            onClick={() => setActiveTab('additional')}
                            className={`text-lg pb-2 ${activeTab === 'additional'
                                ? 'text-gray-900 border-b-2 border-gray-900'
                                : 'text-gray-500'
                                }`}
                        >
                            Additional Information
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`text-lg pb-2 ${activeTab === 'reviews'
                                ? 'text-gray-900 border-b-2 border-gray-900'
                                : 'text-gray-500'
                                }`}
                        >
                            Reviews [5]
                        </button>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {activeTab === 'description' && (
                            <div className="text-gray-600 space-y-4">
                                <p>
                                    Embodying the raw, wayward spirit of rock 'n' roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
                                </p>
                                <p>
                                    Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.
                                </p>
                            </div>
                        )}

                        {activeTab === 'additional' && (
                            <div className="text-gray-600">
                                <table className="w-full">
                                    <tbody>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-3 font-medium">Weight</td>
                                            <td className="py-3">25 kg</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-3 font-medium">Dimensions</td>
                                            <td className="py-3">200 x 150 x 80 cm</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-3 font-medium">Material</td>
                                            <td className="py-3">Wood, Fabric</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 font-medium">Color</td>
                                            <td className="py-3">Multiple options available</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="text-gray-600">
                                <p className="mb-4">Customer reviews coming soon...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <div>
                    <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">
                        Related Products
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((relatedProduct) => (
                            <Link key={relatedProduct.id} href={`/shop/${relatedProduct.id}`}>
                                <Card product={relatedProduct} />
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/shop"
                            className="inline-block px-12 py-3 border-2 border-[#B88E2F] text-[#B88E2F] font-semibold hover:bg-[#B88E2F] hover:text-white transition-colors"
                        >
                            Show More
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
