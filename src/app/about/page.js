import React from 'react';
import Navbar from '@/components/nav-bar/nav-bar';
import Footer from '@/components/footer/footer';
import Breadcrumb from '@/components/pages/common/breadcrumb';
import { Award, Users, Heart, TrendingUp } from 'lucide-react';

export default function AboutPage() {
    const values = [
        {
            icon: <Award size={36} className="sm:w-12 sm:h-12 text-[#B88E2F]" />,
            title: 'Quality',
            description: 'We ensure the highest quality in all our products'
        },
        {
            icon: <Users size={36} className="sm:w-12 sm:h-12 text-[#B88E2F]" />,
            title: 'Customer First',
            description: 'Your satisfaction is our top priority'
        },
        {
            icon: <Heart size={36} className="sm:w-12 sm:h-12 text-[#B88E2F]" />,
            title: 'Passion',
            description: 'We love what we do and it shows in our work'
        },
        {
            icon: <TrendingUp size={36} className="sm:w-12 sm:h-12 text-[#B88E2F]" />,
            title: 'Innovation',
            description: 'Constantly improving and evolving our offerings'
        }
    ];

    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#F9F1E7] py-8 sm:py-10 lg:py-12">
                <div className="container mx-auto px-4">
                    <Breadcrumb items={[{ label: 'About' }]} />
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3A3A3A] mt-3 sm:mt-4">About Funiro</h1>
                </div>
            </div>

            {/* About Content */}
            <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
                {/* Story Section */}
                <div className="max-w-4xl mx-auto mb-10 sm:mb-12 lg:mb-16">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#3A3A3A] mb-4 sm:mb-6">Our Story</h2>
                    <div className="space-y-3 sm:space-y-4 text-[#898989] leading-relaxed text-sm sm:text-base">
                        <p>
                            Founded in 2020, Funiro has grown from a small furniture workshop to one of the leading
                            e-commerce platforms for premium home furnishings. Our journey began with a simple vision:
                            to make high-quality, beautifully designed furniture accessible to everyone.
                        </p>
                        <p>
                            We believe that your home should be a reflection of your personality and style. That's why
                            we carefully curate each piece in our collection, ensuring it meets our strict standards
                            for quality, design, and sustainability.
                        </p>
                        <p>
                            Today, we serve thousands of customers across the country, helping them create spaces they
                            love. Our commitment to excellence, customer service, and innovation drives everything we do.
                        </p>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-10 sm:mb-12 lg:mb-16">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#3A3A3A] mb-8 sm:mb-10 lg:mb-12 text-center">Our Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="text-center p-4 sm:p-6">
                                <div className="flex justify-center mb-3 sm:mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-[#3A3A3A] mb-2">{value.title}</h3>
                                <p className="text-[#898989] text-sm sm:text-base">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission Section */}
                <div className="bg-[#F9F1E7] rounded-lg p-6 sm:p-8 lg:p-12 max-w-4xl mx-auto">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#3A3A3A] mb-4 sm:mb-6 text-center">Our Mission</h2>
                    <p className="text-[#898989] text-center text-sm sm:text-base lg:text-lg leading-relaxed">
                        To transform houses into homes by providing exceptional furniture that combines style,
                        comfort, and sustainability. We strive to make the furniture shopping experience seamless,
                        enjoyable, and inspiring for every customer.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
