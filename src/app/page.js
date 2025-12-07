'use client';

import React from 'react';
import Header from "../components/pages/home/header";
import Navbar from "../components/nav-bar/nav-bar";
import Slider from "../components/pages/home/slider";
import Imagegrid from "../components/pages/home/image-grid";
import Footer from "../components/footer/footer";
import Card from "../components/pages/common/card";
import CompaniesSection from "../components/pages/home/companies-section";
import FeaturesSection from "../components/pages/home/features-section";
import { useProducts } from '@/context/ProductsContext';
import Link from 'next/link';

export default function Home() {
  const { products } = useProducts();

  // Show first 8 products on home page
  const featuredProducts = products.slice(0, 8);

  return (
    <div className={""}>
      <Navbar />
      <Header />
      <Slider />
      {/* Companies Section */}
      <CompaniesSection />

      {/* Products Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#3A3A3A]">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/shop/${product.id}`}>
              <Card product={product} />
            </Link>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-block px-16 py-3 border-2 border-[#B88E2F] text-[#B88E2F] font-semibold hover:bg-[#B88E2F] hover:text-white transition-colors duration-300"
          >
            Show More
          </Link>
        </div>
      </section>

      <Imagegrid />

      {/* Features Section */}
      <FeaturesSection />



      <Footer />
    </div>
  );
}
