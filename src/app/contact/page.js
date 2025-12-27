'use client';

import React, { useState } from 'react';
import { useAlert } from '@/context/AlertContext';
import Navbar from '@/components/nav-bar/nav-bar';
import Footer from '@/components/footer/footer';
import Breadcrumb from '@/components/pages/common/breadcrumb';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function ContactPage() {
    const { showSuccess } = useAlert();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contact form submitted:', formData);
        showSuccess('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#F9F1E7] py-8 sm:py-10 lg:py-12">
                <div className="container mx-auto px-4">
                    <Breadcrumb items={[{ label: 'Contact' }]} />
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3A3A3A] mt-3 sm:mt-4">Get In Touch With Us</h1>
                    <p className="text-[#898989] mt-2 max-w-2xl text-sm sm:text-base">
                        For more information about our products & services, please feel free to drop us an email. Our staff is always here to help you out.
                    </p>
                </div>
            </div>

            {/* Contact Content */}
            <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Contact Information */}
                    <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
                        <div className="flex gap-4 sm:gap-6">
                            <div className="flex-shrink-0">
                                <MapPin size={24} className="sm:w-7 sm:h-7 text-[#B88E2F]" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-[#3A3A3A] mb-1 sm:mb-2">Address</h3>
                                <p className="text-[#898989] text-sm sm:text-base">
                                    400 University Drive Suite 200<br />
                                    Coral Gables,<br />
                                    FL 33134 USA
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 sm:gap-6">
                            <div className="flex-shrink-0">
                                <Phone size={24} className="sm:w-7 sm:h-7 text-[#B88E2F]" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-[#3A3A3A] mb-1 sm:mb-2">Phone</h3>
                                <p className="text-[#898989] text-sm sm:text-base">
                                    Mobile: +(84) 546-6789<br />
                                    Hotline: +(84) 456-6789
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 sm:gap-6">
                            <div className="flex-shrink-0">
                                <Clock size={24} className="sm:w-7 sm:h-7 text-[#B88E2F]" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-[#3A3A3A] mb-1 sm:mb-2">Working Time</h3>
                                <p className="text-[#898989] text-sm sm:text-base">
                                    Monday-Friday: 9:00 - 22:00<br />
                                    Saturday-Sunday: 9:00 - 21:00
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="order-1 lg:order-2">
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm sm:text-base font-medium text-[#3A3A3A] mb-2">
                                    Your name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Abc"
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#9F9F9F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm sm:text-base font-medium text-[#3A3A3A] mb-2">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Abc@def.com"
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#9F9F9F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm sm:text-base font-medium text-[#3A3A3A] mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="This is optional"
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#9F9F9F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm sm:text-base font-medium text-[#3A3A3A] mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    placeholder="Hi! I'd like to ask about..."
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#9F9F9F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] text-sm sm:text-base"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-[#B88E2F] text-white px-8 sm:px-12 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#9F7A28] transition-colors text-sm sm:text-base"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
