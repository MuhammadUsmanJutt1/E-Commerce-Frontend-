'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import ImageVideoModal from '../../../modal/image-video-modal/image-video-modal';

const slides = [
    {
        id: 1,
        image: '/images/bedroom.png',
        category: 'Bed Room',
        title: 'Inner Peace',
        description: 'A modern, beautiful bedroom interior design.',
    },
    {
        id: 2,
        image: '/images/living_room.png',
        category: 'Living Room',
        title: 'Cozy Vibes',
        description: 'A cozy living room with a comfortable sofa.',
    },
    {
        id: 3,
        image: '/images/dining_room.png',
        category: 'Dining Room',
        title: 'Minimalist',
        description: 'A minimalist dining room with a wooden table.',
    },
];

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [modalConfig, setModalConfig] = useState({
        isVisible: false,
        type: 'image',
        src: '',
        title: '',
        description: '',
    });

    const nextSlide = React.useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const openModal = (slide) => {
        setModalConfig({
            isVisible: true,
            type: 'image',
            src: slide.image,
            title: slide.title,
            description: slide.description,
        });
    };

    const closeModal = () => {
        setModalConfig((prev) => ({ ...prev, isVisible: false }));
    };

    React.useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className="bg-[#FCF8F3] py-10 lg:py-20 overflow-hidden">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Left Content */}
                <div className="lg:w-1/3 flex flex-col items-start space-y-6 z-10 relative">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        50+ Beautiful rooms inspiration
                    </h2>
                    <p className="text-gray-600 text-base lg:text-lg">
                        Our designer already made a lot of beautiful prototipe of rooms that inspire you
                    </p>
                    <button className="bg-[#B88E2F] text-white px-8 py-3 font-semibold hover:bg-[#9e7a28] transition-colors duration-300">
                        Explore More
                    </button>
                </div>

                {/* Right Slider */}
                <div className="lg:w-2/3 w-full relative">
                    <div className="flex gap-6 overflow-hidden p-4">
                        <div
                            className="flex gap-6 transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * (372 + 24)}px)` }}
                        >
                            {slides.map((slide, index) => {
                                const isActive = index === currentSlide;
                                return (
                                    <div
                                        key={slide.id}
                                        className={`relative transition-all duration-500 ease-in-out flex-shrink-0 cursor-pointer
                                ${isActive ? 'w-[404px] h-[582px]' : 'w-[372px] h-[486px]'}
                            `}
                                        onClick={() => openModal(slide)}
                                    >
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                            className={`object-cover ${isActive ? '' : ''}`}
                                        />

                                        {/* Overlay Content - Only for active slide */}
                                        <div className={`absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-8 max-w-[217px] z-20 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                                <span>0{slide.id}</span>
                                                <span className="w-6 h-[1px] bg-gray-600"></span>
                                                <span className="text-sm font-medium">{slide.category}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900">{slide.title}</h3>
                                            <button className="absolute bottom-0 right-0 translate-y-0 translate-x-full bg-[#B88E2F] p-3 text-white hover:bg-[#9e7a28] transition-colors">
                                                <ArrowRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Custom Navigation Dots */}
                        <div className="absolute bottom-8 left-[450px] flex gap-4 z-30">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToSlide(idx)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 
                            ${currentSlide === idx
                                            ? 'bg-[#B88E2F] ring-1 ring-[#B88E2F] ring-offset-4'
                                            : 'bg-gray-300 hover:bg-[#B88E2F]/50'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={nextSlide}
                            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-[#B88E2F] hover:bg-gray-50 transition-colors z-30"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>

            <ImageVideoModal
                config={modalConfig}
                onClose={closeModal}
                isVisible={modalConfig.isVisible}
            />
        </section>
    );
}
