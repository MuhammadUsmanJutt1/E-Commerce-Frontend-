'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement actual authentication
        console.log('Login:', formData);
        router.push('/');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#3A3A3A] mb-2">Welcome Back</h1>
                    <p className="text-[#898989]">Login to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#3A3A3A] mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#9F9F9F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[#3A3A3A] mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#9F9F9F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="w-4 h-4 text-[#B88E2F] border-[#9F9F9F] rounded focus:ring-[#B88E2F]"
                            />
                            <span className="ml-2 text-sm text-[#3A3A3A]">Remember me</span>
                        </label>
                        <Link href="/forgot-password" className="text-sm text-[#B88E2F] hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#B88E2F] text-white py-3 rounded-lg font-semibold hover:bg-[#9F7A28] transition-colors duration-300"
                    >
                        Login
                    </button>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-[#898989]">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-[#B88E2F] font-semibold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
