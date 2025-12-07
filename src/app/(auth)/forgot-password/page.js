'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement password reset email
        console.log('Reset password for:', email);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
                <div className="w-full max-w-md text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-[#B88E2F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-[#B88E2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-[#3A3A3A] mb-2">Check Your Email</h1>
                        <p className="text-[#898989] mb-6">
                            We've sent a password reset link to <strong>{email}</strong>
                        </p>
                    </div>
                    <Link
                        href="/login"
                        className="inline-block bg-[#B88E2F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9F7A28] transition-colors duration-300"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#3A3A3A] mb-2">Forgot Password?</h1>
                    <p className="text-[#898989]">Enter your email to reset your password</p>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-[#9F9F9F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#B88E2F] text-white py-3 rounded-lg font-semibold hover:bg-[#9F7A28] transition-colors duration-300"
                    >
                        Send Reset Link
                    </button>

                    {/* Back to Login */}
                    <Link
                        href="/login"
                        className="block text-center text-sm text-[#898989] hover:text-[#B88E2F]"
                    >
                        ← Back to Login
                    </Link>
                </form>
            </div>
        </div>
    );
}
