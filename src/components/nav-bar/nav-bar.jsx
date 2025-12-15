"use client"

import React, { useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import AdvancedSearch from '@/components/search/AdvancedSearch';
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const routes = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" }
];

const Navbar = ({ ...props }) => {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const router = useRouter();
    const { getCartCount, setIsCartOpen } = useCart();
    const { user, logout } = useAuth();
    const cartCount = getCartCount();

    const isRouteActive = (link) => pathname === link;

    return (
        <nav className={classNames(props.className, "w-full bg-white font-poppins sticky top-0 z-50 shadow-sm")}>
            <div className="w-full px-5 md:px-10">
                <div className="flex items-center justify-between h-[70px]">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onClick={() => router.push('/')}>
                        <div className="relative w-[50px] h-[42px] transition-transform group-hover:scale-110 duration-300">
                            <Image src="/home/logo.png" alt="Furniro Logo" fill className="object-contain" />
                        </div>
                        <span className="mt-2 text-2xl font-bold bg-gradient-to-r from-[#B88E2F] to-[#d4a574] bg-clip-text text-transparent font-montserrat">
                            Furniro
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-12 gap-8 font-bold">
                            {routes.map((route) => (
                                <Link
                                    key={route.name}
                                    href={route.link}
                                    className={classNames(
                                        "text-base font-medium transition-all duration-300 relative group",
                                        isRouteActive(route.link)
                                            ? "text-[#B88E2F]"
                                            : "text-black hover:text-[#B88E2F]"
                                    )}
                                >
                                    {route.name}
                                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B88E2F] transition-all duration-300 ${isRouteActive(route.link) ? 'w-full' : 'group-hover:w-full'}`}></span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Search */}
                    <div className="hidden md:block flex-1 max-w-[520px] px-6">
                        <AdvancedSearch onResults={() => { }} onFiltersChange={() => { }} />
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center gap-6">
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 text-black hover:text-[#B88E2F] transition-all duration-300">
                                    <User size={22} />
                                    <span className="font-medium text-sm">{user.name}</span>
                                </button>
                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#B88E2F]">
                                        My Profile
                                    </Link>
                                    {user.role === 'admin' && (
                                        <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#B88E2F]">
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className="p-2 rounded-full text-black hover:text-[#B88E2F] hover:bg-gray-100 transition-all duration-300">
                                <User size={22} />
                            </Link>
                        )}
                        <button
                            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                            className="md:hidden p-2 rounded-full text-black hover:text-[#B88E2F] hover:bg-gray-100 transition-all duration-300"
                        >
                            <Search size={22} />
                        </button>
                        <Link href="/wishlist" className="p-2 rounded-full text-black hover:text-[#B88E2F] hover:bg-gray-100 transition-all duration-300">
                            <Heart size={22} />
                        </Link>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="p-2 rounded-full text-black hover:text-[#B88E2F] hover:bg-gray-100 transition-all duration-300 relative"
                        >
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#B88E2F] to-[#d4a574] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-black hover:text-[#B88E2F] hover:bg-gray-100 focus:outline-none transition-all duration-300"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            {mobileSearchOpen && (
                <div className="md:hidden px-5 pb-4 animate-in slide-in-from-top duration-300">
                    <AdvancedSearch
                        onResults={() => { }}
                        onFiltersChange={() => { }}
                        mobile={true}
                    />
                </div>
            )}

            {/* Mobile Menu (Side Drawer) */}
            {mobileMenuOpen && (
                <div className="relative z-50 md:hidden" role="dialog" aria-modal="true">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Drawer Panel */}
                    <div className="fixed inset-0 z-50 flex justify-end">
                        <div className="relative ml-auto flex h-full w-[80%] max-w-xs flex-col overflow-y-auto bg-white py-6 shadow-2xl animate-in slide-in-from-right duration-300">

                            {/* Header */}
                            <div className="flex items-center justify-between px-6 mb-8">
                                <span className="text-xl font-bold font-montserrat text-black">Menu</span>
                                <button
                                    type="button"
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400 hover:text-black"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <X className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <div className="flex flex-col space-y-1 px-4">
                                {routes.map((route) => (
                                    <Link
                                        key={route.name}
                                        href={route.link}
                                        className={classNames(
                                            "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                                            isRouteActive(route.link)
                                                ? "bg-primary/10 text-primary"
                                                : "text-black hover:bg-gray-50 hover:text-[#B88E2F]"
                                        )}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {route.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Utility Icons (Mobile) */}
                            <div className="mt-auto border-t border-gray-100 px-6 py-6">
                                <div className="grid grid-cols-4 gap-4">
                                    <Link href="/login" className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#B88E2F]" onClick={() => setMobileMenuOpen(false)}>
                                        <User size={20} />
                                        <span className="text-[10px]">Profile</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setMobileSearchOpen(!mobileSearchOpen);
                                            setMobileMenuOpen(false);
                                        }}
                                        className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#B88E2F]"
                                    >
                                        <Search size={20} />
                                        <span className="text-[10px]">Search</span>
                                    </button>
                                    <Link href="/wishlist" className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#B88E2F]" onClick={() => setMobileMenuOpen(false)}>
                                        <Heart size={20} />
                                        <span className="text-[10px]">Wishlist</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            setIsCartOpen(true);
                                        }}
                                        className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#B88E2F] relative"
                                    >
                                        <ShoppingCart size={20} />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-[#B88E2F] text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                                                {cartCount}
                                            </span>
                                        )}
                                        <span className="text-[10px]">Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;