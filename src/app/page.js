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
import CategorySection from "../components/pages/home/category-section";
import { useProducts } from '@/context/ProductsContext';
import Link from 'next/link';

export default function Home() {
  const { products } = useProducts();

  return (
    <div className={""}>
      <Navbar />
      <Header />
      <Slider />
      {/* Companies Section */}
      <CompaniesSection />

      {/* Products Section */}
      {/* Products Section */}
      <div className="space-y-8">
        <CategorySection category="Sofas" title="Stylish Sofas" />
        <CategorySection category="Chairs" title="Comfortable Chairs" />
        <CategorySection category="Tables" title="Elegant Tables" />
        <CategorySection category="Beds" title="Cozy Beds" />
      </div>

      {/* Show More Button (General) */}
      <div className="text-center mt-4 mb-16">
        <Link
          href="/shop"
          className="inline-block px-16 py-3 border-2 border-[#B88E2F] text-[#B88E2F] font-semibold hover:bg-[#B88E2F] hover:text-white transition-colors duration-300"
        >
          View All Products
        </Link>
      </div>

      <Imagegrid />

      {/* Features Section */}
      <FeaturesSection />



      <Footer />
    </div>
  );
}
