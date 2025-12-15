'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '@/lib/api';

const CartContext = createContext();

export function CartProvider({ children }) {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Load cart from API if user is logged in, else from localStorage
    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setCartItems(JSON.parse(savedCart));
            } else {
                setCartItems([]);
            }
        }
    }, [user]);

    // Save to localStorage if user is NOT logged in
    useEffect(() => {
        if (!user) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems, user]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/cart');
            // Map backend structure to frontend structure
            // Backend: { items: [{ product: {...}, quantity, price }] }
            // Frontend: [{ ...product, quantity }]
            const mappedItems = data.items.map(item => ({
                ...item.product,
                id: item.product._id, // Ensure ID is mapped
                quantity: item.quantity
            }));
            setCartItems(mappedItems);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (product, quantity = 1) => {
        if (user) {
            try {
                await api.post('/cart/items', {
                    productId: product.id,
                    quantity
                });
                await fetchCart(); // Refresh cart from server
                setIsCartOpen(true);
            } catch (error) {
                console.error('Error adding to cart:', error);
                alert('Failed to add to cart');
            }
        } else {
            // Local storage fallback
            setCartItems(prev => {
                const existingItem = prev.find(item => item.id === product.id);
                if (existingItem) {
                    return prev.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                }
                return [...prev, { ...product, quantity }];
            });
            setIsCartOpen(true);
        }
    };

    const removeFromCart = async (productId) => {
        if (user) {
            try {
                await api.delete(`/cart/items/${productId}`);
                await fetchCart();
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
        } else {
            setCartItems(prev => prev.filter(item => item.id !== productId));
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        if (user) {
            try {
                await api.patch(`/cart/items/${productId}`, { quantity });
                await fetchCart();
            } catch (error) {
                console.error('Error updating cart quantity:', error);
            }
        } else {
            setCartItems(prev =>
                prev.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    };

    const clearCart = async () => {
        if (user) {
            try {
                await api.delete('/cart');
                setCartItems([]);
            } catch (error) {
                console.error('Error clearing cart:', error);
            }
        } else {
            setCartItems([]);
        }
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount,
                isCartOpen,
                setIsCartOpen,
                loading
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
