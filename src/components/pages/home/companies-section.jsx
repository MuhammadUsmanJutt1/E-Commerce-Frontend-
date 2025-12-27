'use client';

import React from 'react';
import Image from 'next/image';

const companies = [
    { name: 'IKEA', logo: '/companies/ikea.png' },
    { name: 'Ashley', logo: '/companies/ashley.png' },
    { name: 'West Elm', logo: '/companies/westelm.png' },
    { name: 'Crate & Barrel', logo: '/companies/crate.png' },
    { name: 'Pottery Barn', logo: '/companies/pottery.png' },
    { name: 'Wayfair', logo: '/companies/wayfair.png' }
];

const CompaniesSection = () => {
    return (
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Trusted Brands</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
                        We partner with the world's leading furniture brands to bring you quality and style
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center">
                    {companies.map((company, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center p-3 sm:p-4 lg:p-6 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                        >
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-400 hover:text-[#B88E2F] transition-colors text-center">
                                {company.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CompaniesSection;
