'use client';

import React from 'react';
import { Trophy, ShieldCheck, Truck, Headphones } from 'lucide-react';

const features = [
    {
        icon: Trophy,
        title: 'High Quality',
        description: 'Crafted from top materials'
    },
    {
        icon: ShieldCheck,
        title: 'Warranty Protection',
        description: 'Over 2 years'
    },
    {
        icon: Truck,
        title: 'Free Shipping',
        description: 'Order over $150'
    },
    {
        icon: Headphones,
        title: '24 / 7 Support',
        description: 'Dedicated support'
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-8 sm:py-12 lg:py-16 bg-[#FAF3EA]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="flex items-center sm:items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex-shrink-0">
                                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#B88E2F]" />
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-0.5 sm:mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-xs sm:text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
