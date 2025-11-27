import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: "text-white bg-brand-primary hover:bg-brand-secondary focus:ring-4 focus:outline-none focus:ring-brand-primary/50 dark:bg-brand-primary dark:hover:bg-brand-secondary dark:focus:ring-brand-primary/50",
            secondary: "text-white bg-brand-secondary hover:bg-brand-primary focus:ring-4 focus:outline-none focus:ring-brand-secondary/50",
            outline: "text-gray-900 bg-transparent border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
            ghost: "text-brand-primary bg-transparent hover:bg-brand-primary/10 focus:ring-4 focus:outline-none focus:ring-brand-primary/50 dark:text-brand-accent dark:hover:bg-brand-accent/10",
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || props.disabled}
                className={clsx(
                    "w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200 flex items-center justify-center",
                    variants[variant],
                    (isLoading || props.disabled) && "opacity-50 cursor-not-allowed",
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <svg className="w-5 h-5 mr-2 text-current animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
