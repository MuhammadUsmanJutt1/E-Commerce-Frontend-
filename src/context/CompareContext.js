'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

export function CompareProvider({ children }) {
    const [compareList, setCompareList] = useState([]);
    const [isCompareOpen, setIsCompareOpen] = useState(false);

    // Load compare list from localStorage on mount
    useEffect(() => {
        const savedCompare = localStorage.getItem('compareList');
        if (savedCompare) {
            setCompareList(JSON.parse(savedCompare));
        }
    }, []);

    // Save compare list to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('compareList', JSON.stringify(compareList));
    }, [compareList]);

    const addToCompare = (product) => {
        setCompareList(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                return prev;
            }
            if (prev.length >= 4) {
                alert('You can only compare up to 4 products at a time');
                return prev;
            }
            return [...prev, product];
        });
    };

    const removeFromCompare = (productId) => {
        setCompareList(prev => prev.filter(item => item.id !== productId));
    };

    const isInCompare = (productId) => {
        return compareList.some(item => item.id === productId);
    };

    const toggleCompare = (product) => {
        if (isInCompare(product.id)) {
            removeFromCompare(product.id);
        } else {
            addToCompare(product);
        }
    };

    const clearCompare = () => {
        setCompareList([]);
    };

    return (
        <CompareContext.Provider
            value={{
                compareList,
                addToCompare,
                removeFromCompare,
                isInCompare,
                toggleCompare,
                clearCompare,
                isCompareOpen,
                setIsCompareOpen
            }}
        >
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error('useCompare must be used within a CompareProvider');
    }
    return context;
}
