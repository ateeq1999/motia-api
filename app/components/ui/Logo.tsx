import { Link } from 'react-router';
import clsx from 'clsx';

interface LogoProps {
    className?: string;
    variant?: 'default' | 'icon' | 'white';
    size?: 'sm' | 'md' | 'lg';
    to?: string;
}

export function Logo({ className, variant = 'default', size = 'md', to = '/' }: LogoProps) {
    const sizes = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12'
    };

    const textSizes = {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl'
    };

    // Determine which image to use based on variant
    // For 'white' variant (e.g. dark backgrounds), use the white icon
    // For others, use the colored icon
    const logoSrc = variant === 'white'
        ? '/logos/logo_white_icon.png'
        : '/logos/logo_icon.png';

    return (
        <Link to={to} className={clsx("flex items-center gap-3 group", className)}>
            <div className={clsx("relative flex items-center justify-center transition-transform group-hover:scale-105", sizes[size])}>
                <img
                    src={logoSrc}
                    alt="Karibu Pass"
                    className="h-full w-full object-contain"
                />
            </div>
            {variant !== 'icon' && (
                <span className={clsx(
                    "font-bold tracking-tight whitespace-nowrap transition-colors",
                    textSizes[size],
                    variant === 'white' ? 'text-white' : 'text-gray-900 dark:text-white'
                )}>
                    Karibu Pass
                </span>
            )}
        </Link>
    );
}
