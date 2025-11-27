import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, id, ...props }, ref) => {
        // Generate a random ID if none is provided, for label association
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className="w-full relative">
                <input
                    ref={ref}
                    id={inputId}
                    className={clsx(
                        "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-brand-accent focus:outline-none focus:ring-0 focus:border-brand-primary peer transition-colors",
                        error && "border-red-500 focus:border-red-500",
                        className
                    )}
                    placeholder=" "
                    {...props}
                />
                {label && (
                    <label
                        htmlFor={inputId}
                        className={clsx(
                            "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-brand-primary peer-focus:dark:text-brand-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1",
                            error && "text-red-500 peer-focus:text-red-500"
                        )}
                    >
                        {label}
                    </label>
                )}
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
