'use client';

import React from 'react';

export default function FilterSidebar({ filters, onFilterChange }) {
    const categories = ['Chairs', 'Sofas', 'Tables', 'Beds', 'Storage'];
    const colors = [
        { name: 'Purple', class: 'bg-[#816DFA]' },
        { name: 'Black', class: 'bg-black' },
        { name: 'Gold', class: 'bg-[#B88E2F]' },
        { name: 'White', class: 'bg-white border border-gray-300' },
        { name: 'Brown', class: 'bg-[#8B4513]' }
    ];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-[#3A3A3A] mb-6">Filters</h3>

            {/* Categories */}
            <div className="mb-8">
                <h4 className="text-base font-medium text-[#3A3A3A] mb-4">Categories</h4>
                <div className="space-y-3">
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
                            <span className="ml-3 text-sm text-[#3A3A3A]">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
                <h4 className="text-base font-medium text-[#3A3A3A] mb-4">Price Range</h4>
                <div className="space-y-4">
                    <input
                        type="range"
                        min="0"
                        max="20000000"
                        step="100000"
                        value={filters.maxPrice || 20000000}
                        onChange={(e) => onFilterChange({ ...filters, maxPrice: parseInt(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#B88E2F]"
                    />
                    <div className="flex justify-between text-sm text-[#898989]">
                        <span>Rp 0</span>
                        <span>Rp {(filters.maxPrice || 20000000).toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Colors */}
            <div className="mb-8">
                <h4 className="text-base font-medium text-[#3A3A3A] mb-4">Colors</h4>
                <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => {
                                const newColors = filters.colors?.includes(color.name)
                                    ? filters.colors.filter(c => c !== color.name)
                                    : [...(filters.colors || []), color.name];
                                onFilterChange({ ...filters, colors: newColors });
                            }}
                            className={`w-8 h-8 rounded-full ${color.class} ${filters.colors?.includes(color.name) ? 'ring-2 ring-offset-2 ring-[#B88E2F]' : ''
                                }`}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
                <h4 className="text-base font-medium text-[#3A3A3A] mb-4">Sizes</h4>
                <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => {
                                const newSizes = filters.sizes?.includes(size)
                                    ? filters.sizes.filter(s => s !== size)
                                    : [...(filters.sizes || []), size];
                                onFilterChange({ ...filters, sizes: newSizes });
                            }}
                            className={`w-12 h-12 rounded-lg border-2 text-sm font-medium transition-colors ${filters.sizes?.includes(size)
                                    ? 'border-[#B88E2F] bg-[#B88E2F] text-white'
                                    : 'border-gray-300 bg-white text-[#3A3A3A] hover:border-[#B88E2F]'
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Clear Filters */}
            <button
                onClick={() => onFilterChange({ categories: [], colors: [], sizes: [], maxPrice: 20000000 })}
                className="w-full py-2 text-sm text-[#B88E2F] hover:underline"
            >
                Clear All Filters
            </button>
        </div>
    );
}
