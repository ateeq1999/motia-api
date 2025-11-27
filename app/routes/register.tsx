import { Form, Link, useNavigate } from "react-router";
import { AuthLayout } from "../components/auth/AuthLayout";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { GoogleSignInButton } from "../components/auth/GoogleSignInButton";
import { useState } from "react";

export default function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/verify-email');
        }, 1000);
    };

    return (
        <AuthLayout
            title="Create an account"
            subtitle="Start your journey with Karibu Pass"
        >
            <Form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    required
                />
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    required
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    required
                />

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            aria-describedby="terms"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-brand-primary/30 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-brand-primary/60 dark:ring-offset-gray-800"
                            required
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                            I accept the <a className="font-medium text-brand-primary hover:underline dark:text-brand-accent" href="#">Terms and Conditions</a>
                        </label>
                    </div>
                </div>

                <Button type="submit" isLoading={isLoading}>
                    Create account
                </Button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                            Or sign up with
                        </span>
                    </div>
                </div>

                <GoogleSignInButton />

                <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-brand-primary hover:underline dark:text-brand-accent"
                    >
                        Login here
                    </Link>
                </p>
            </Form>
        </AuthLayout>
    );
}
