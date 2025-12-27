'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

export default function FilterSidebar({ filters, onFilterChange, isMobile = false, onClose }) {
    const [expandedSections, setExpandedSections] = useState({
        categories: true,
        price: true,
        colors: true,
        sizes: true
    });

    const categories = ['Chairs', 'Sofas', 'Tables', 'Beds', 'Storage'];
    const colors = [
        { name: 'Purple', class: 'bg-[#816DFA]' },
        { name: 'Black', class: 'bg-black' },
        { name: 'Gold', class: 'bg-[#B88E2F]' },
        { name: 'White', class: 'bg-white border border-gray-300' },
        { name: 'Brown', class: 'bg-[#8B4513]' }
    ];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const FilterContent = () => (
        <>
            {/* Categories */}
            <div className="mb-6 sm:mb-8">
                <button 
                    onClick={() => toggleSection('categories')}
                    className="flex items-center justify-between w-full text-sm sm:text-base font-medium text-[#3A3A3A] mb-3 sm:mb-4"
                >
                    <span>Categories</span>
                    {expandedSections.categories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandedSections.categories && (
                    <div className="space-y-2 sm:space-y-3">
                        {categories.map((category) => (
                            <label key={category} className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.categories?.includes(category)}
                                    onChange={(e) => {
                                        const newCategories = e.target.checked
                                            ? [...(filters.categories || []), category]
                                            : filters.categories.filter(c => c !== category);
                                        onFilterChange({ ...filters, categories: newCategories });
                                    }}
                                    className="w-4 h-4 text-[#B88E2F] border-gray-300 rounded focus:ring-[#B88E2F]"
                                />
                                <span className="ml-3 text-xs sm:text-sm text-[#3A3A3A]">{category}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Range */}
            <div className="mb-6 sm:mb-8">
                <button 
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full text-sm sm:text-base font-medium text-[#3A3A3A] mb-3 sm:mb-4"
                >
                    <span>Price Range</span>
                    {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandedSections.price && (
                    <div className="space-y-3 sm:space-y-4">
                        <input
                            type="range"
                            min="0"
                            max="20000000"
                            step="100000"
                            value={filters.maxPrice || 20000000}
                            onChange={(e) => onFilterChange({ ...filters, maxPrice: parseInt(e.target.value) })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#B88E2F]"
                        />
                        <div className="flex justify-between text-xs sm:text-sm text-[#898989]">
                            <span>Rp 0</span>
                            <span>Rp {(filters.maxPrice || 20000000).toLocaleString()}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Colors */}
            <div className="mb-6 sm:mb-8">
                <button 
                    onClick={() => toggleSection('colors')}
                    className="flex items-center justify-between w-full text-sm sm:text-base font-medium text-[#3A3A3A] mb-3 sm:mb-4"
                >
                    <span>Colors</span>
                    {expandedSections.colors ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandedSections.colors && (
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => {
                                    const newColors = filters.colors?.includes(color.name)
                                        ? filters.colors.filter(c => c !== color.name)
                                        : [...(filters.colors || []), color.name];
                                    onFilterChange({ ...filters, colors: newColors });
                                }}
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${color.class} ${filters.colors?.includes(color.name) ? 'ring-2 ring-offset-2 ring-[#B88E2F]' : ''
                                    }`}
                                title={color.name}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Sizes */}
            <div className="mb-6 sm:mb-8">
                <button 
                    onClick={() => toggleSection('sizes')}
                    className="flex items-center justify-between w-full text-sm sm:text-base font-medium text-[#3A3A3A] mb-3 sm:mb-4"
                >
                    <span>Sizes</span>
                    {expandedSections.sizes ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandedSections.sizes && (
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => {
                                    const newSizes = filters.sizes?.includes(size)
                                        ? filters.sizes.filter(s => s !== size)
                                        : [...(filters.sizes || []), size];
                                    onFilterChange({ ...filters, sizes: newSizes });
                                }}
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 text-xs sm:text-sm font-medium transition-colors ${filters.sizes?.includes(size)
                                        ? 'border-[#B88E2F] bg-[#B88E2F] text-white'
                                        : 'border-gray-300 bg-white text-[#3A3A3A] hover:border-[#B88E2F]'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Clear Filters */}
            <button
                onClick={() => onFilterChange({ categories: [], colors: [], sizes: [], maxPrice: 20000000 })}
                className="w-full py-2 text-xs sm:text-sm text-[#B88E2F] hover:underline"
            >
                Clear All Filters
            </button>
        </>
    );

    // Mobile drawer version
    if (isMobile) {
        return (
            <div className="fixed inset-0 z-50 lg:hidden">
                <div className="fixed inset-0 bg-black/50" onClick={onClose} />
                <div className="fixed left-0 top-0 h-full w-[280px] sm:w-[320px] bg-white shadow-xl overflow-y-auto">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-[#3A3A3A]">Filters</h3>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="p-4">
                        <FilterContent />
                    </div>
                </div>
            </div>
        );
    }

    // Desktop version
    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold text-[#3A3A3A] mb-4 sm:mb-6">Filters</h3>
            <FilterContent />
        </div>
    );
}
