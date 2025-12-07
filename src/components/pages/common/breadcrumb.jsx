import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
    return (
        <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#898989] hover:text-[#B88E2F]">
                Home
            </Link>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight size={16} className="text-[#898989]" />
                    {item.href ? (
                        <Link href={item.href} className="text-[#898989] hover:text-[#B88E2F]">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-[#3A3A3A] font-medium">{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}
