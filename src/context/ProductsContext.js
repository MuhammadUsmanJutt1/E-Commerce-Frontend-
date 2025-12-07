'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

// Sample initial products
const initialProducts = [
    {
        id: '1',
        image: '/images/shelf.png',
        title: 'Syltherine',
        subtitle: 'Stylish cafe chair',
        description: 'Syltherine is a stylish cafe chair that adds a touch of elegance to any room.',
        price: 2500000,
        originalPrice: 3500000,
        discount: 30,
        category: 'Chairs',
        stock: 25,
        isNew: false,
        isFeatured: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        image: '/images/bedroom.png',
        title: 'Leviosa',
        subtitle: 'Stylish cafe chair',
        description: 'Leviosa is a modern chair with a unique design, perfect for contemporary spaces.',
        price: 2500000,
        category: 'Chairs',
        stock: 30,
        isNew: true,
        isFeatured: false,
        createdAt: new Date().toISOString()
    },
    {
        id: '3',
        image: '/images/laptop.png',
        title: 'Lolito',
        subtitle: 'Luxury big sofa',
        description: 'Lolito is a luxury big sofa that provides ultimate comfort and style.',
        price: 7000000,
        originalPrice: 14000000,
        discount: 50,
        category: 'Sofas',
        stock: 10,
        isNew: false,
        isFeatured: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '4',
        image: '/images/dining_room.png',
        title: 'Respira',
        subtitle: 'Outdoor bar table',
        description: 'Respira is a durable outdoor bar table and stool set, ideal for your patio.',
        price: 500000,
        category: 'Tables',
        stock: 15,
        isNew: true,
        isFeatured: false,
        createdAt: new Date().toISOString()
    },
    {
        id: '5',
        image: '/images/living_room.png',
        title: 'Grifo',
        subtitle: 'Night lamp',
        description: 'Grifo is a beautiful night lamp with warm lighting.',
        price: 1500000,
        category: 'Storage',
        stock: 50,
        isNew: false,
        isFeatured: false,
        createdAt: new Date().toISOString()
    },
    {
        id: '6',
        image: '/images/bed_detail.png',
        title: 'Muggo',
        subtitle: 'Small mug',
        description: 'Muggo is a small decorative mug.',
        price: 150000,
        category: 'Storage',
        stock: 100,
        isNew: true,
        isFeatured: false,
        createdAt: new Date().toISOString()
    },
    {
        id: '7',
        image: '/images/shelf.png',
        title: 'Pingky',
        subtitle: 'Cute bed set',
        description: 'Pingky is a cute bed set with soft fabrics.',
        price: 7000000,
        originalPrice: 14000000,
        discount: 50,
        category: 'Beds',
        stock: 8,
        isNew: false,
        isFeatured: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '8',
        image: '/images/bedroom.png',
        title: 'Potty',
        subtitle: 'Minimalist flower pot',
        description: 'Potty is a minimalist flower pot for your plants.',
        price: 500000,
        category: 'Storage',
        stock: 40,
        isNew: true,
        isFeatured: false,
        createdAt: new Date().toISOString()
    }
];

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);

    // Load products from localStorage on mount
    useEffect(() => {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            setProducts(initialProducts);
            localStorage.setItem('products', JSON.stringify(initialProducts));
        }
    }, []);

    // Save products to localStorage whenever they change
    useEffect(() => {
        if (products.length > 0) {
            localStorage.setItem('products', JSON.stringify(products));
        }
    }, [products]);

    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        setProducts(prev => [...prev, newProduct]);
        return newProduct;
    };

    const updateProduct = (id, updatedData) => {
        setProducts(prev =>
            prev.map(product =>
                product.id === id ? { ...product, ...updatedData } : product
            )
        );
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(product => product.id !== id));
    };

    const getProductById = (id) => {
        return products.find(product => product.id === id);
    };

    const getProductsByCategory = (category) => {
        return products.filter(product => product.category === category);
    };

    const getFeaturedProducts = () => {
        return products.filter(product => product.isFeatured);
    };

    const getNewProducts = () => {
        return products.filter(product => product.isNew);
    };

    return (
        <ProductsContext.Provider
            value={{
                products,
                addProduct,
                updateProduct,
                deleteProduct,
                getProductById,
                getProductsByCategory,
                getFeaturedProducts,
                getNewProducts
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
}
