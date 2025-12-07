'use client';

import React from 'react';
import Image from 'next/image';

export default function ImageGrid() {
    return (
        <section className="py-10 lg:py-20 overflow-hidden bg-white">
            <div className="text-center mb-8 lg:mb-12">
                <p className="text-gray-600 text-lg">Share your setup with</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">#FuniroFurniture</h2>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">

                    {/* Column 1 */}
                    <div className="flex flex-col gap-4 lg:gap-6">
                        <div className="relative h-[200px] md:h-[280px] lg:h-[382px] w-full">
                            <Image src="/images/shelf.png" alt="Shelf" fill className="object-cover rounded-md hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="relative h-[150px] md:h-[200px] lg:h-[323px] w-full">
                            <Image src="/images/bedroom.png" alt="Bedroom" fill className="object-cover rounded-md hover:scale-105 transition-transform duration-300" />
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-4 lg:gap-6">
                        <div className="relative h-[180px] md:h-[240px] lg:h-[312px] w-full">
                            <Image src="/images/laptop.png" alt="Laptop" fill className="object-cover rounded-md hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="relative h-[150px] md:h-[180px] lg:h-[242px] w-full">
                            <Image src="/images/dining_room.png" alt="Dining" fill className="object-cover rounded-md hover:scale-105 transition-transform duration-300" />
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-4 lg:gap-6">
                        <div className="relative h-[200px] md:h-[260px] lg:h-[348px] w-full">
                            <Image src="/images/living_room.png" alt="Living Room" fill className="object-cover rounded-md hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="relative h-[150px] md:h-[180px] lg:h-[242px] w-full">
                            <Image src="/images/bed_detail.png" alt="Bed Detail" fill className="object-cover rounded-md hover:scale-105 transition-transform duration-300" />
                        </div>
                    </div>

                    {/* Column 4 */}
                    <div className="flex flex-col gap-4 lg:gap-6">
                        <div className="relative h-[220px] md:h-[300px] lg:h-[433px] w-full">
                            <Image src="/images/bedroom.png" alt="Bedroom 2" fill className="object-cover rounded-md hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="relative h-[120px] md:h-[160px] lg:h-[196px] w-full">
                            <Image src="/images/shelf.png" alt="Shelf 2" fill className="object-cover rounded-md hover:scale-105 transition-transform duration-300" />
                        </div>
                    </div>

                    {/* Column 5 */}
                    <div className="flex flex-col gap-4 lg:gap-6">
                        <div className="relative h-[200px] md:h-[260px] lg:h-[360px] w-full">
                            <Image src="/images/dining_room.png" alt="Dining 2" fill className="object-cover rounded-md hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="relative h-[160px] md:h-[200px] lg:h-[260px] w-full">
                            <Image src="/images/living_room.png" alt="Living 2" fill className="object-cover rounded-md hover:scale-105 transition-transform duration-300" />
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
}
