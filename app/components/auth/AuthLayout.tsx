import React from 'react';
import { Logo } from '../ui/Logo';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Left Side - Brand & Content */}
            <div className="hidden lg:flex lg:w-1/2 bg-brand-primary relative overflow-hidden flex-col justify-between p-12 text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary opacity-90" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

                {/* Logo */}
                <div className="relative z-10">
                    <Logo variant="white" size="lg" />
                </div>

                {/* Main Text Content */}
                <div className="relative z-10 max-w-md">
                    <h1 className="text-4xl font-bold mb-6">
                        Manage your events and facilities with ease.
                    </h1>
                    <p className="text-lg text-white/80 leading-relaxed">
                        The all-in-one platform for event organizers, facility managers, and restaurant owners. Streamline your operations and enhance your guest experience.
                    </p>
                </div>

                {/* Footer/Copyright */}
                <div className="relative z-10 text-sm text-white/60">
                    &copy; {new Date().getFullYear()} Karibu Pass. All rights reserved.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 bg-white dark:bg-gray-900">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Logo (visible only on small screens) */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <Logo size="lg" />
                    </div>

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <div className="mt-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
