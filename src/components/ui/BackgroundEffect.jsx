'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

export default function BackgroundEffect() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-gray-50">
            {/* Spotlight Overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(184, 142, 47, 0.15), transparent 80%)`
                }}
            />

            {/* Primary Orb - Gold/Amber */}
            <motion.div
                animate={{
                    x: [-100, 100, -100],
                    y: [-50, 50, -50],
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B88E2F] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            />

            {/* Secondary Orb - Soft Gray/Blue for contrast */}
            <motion.div
                animate={{
                    x: [100, -100, 100],
                    y: [50, -50, 50],
                    scale: [1.2, 1, 1.2],
                    rotate: [180, 0, 180],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-1/3 right-1/4 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            />

            {/* Tertiary Orb - Lighter Gold */}
            <motion.div
                animate={{
                    x: [-50, 50, -50],
                    y: [100, -100, 100],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#e0ac39] rounded-full mix-blend-multiply filter blur-3xl opacity-15"
            />
        </div>
    );
}
