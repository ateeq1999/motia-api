import { Form, Link } from "react-router";
import { AuthLayout } from "../components/auth/AuthLayout";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useState } from "react";

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1000);
    };

    if (isSubmitted) {
        return (
            <AuthLayout title="Check your email">
                <div className="text-center space-y-4">
                    <p className="text-gray-500 dark:text-gray-400">
                        We have sent a password reset link to your email address.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                        Try another email
                    </Button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        <Link
                            to="/login"
                            className="font-medium text-brand-primary hover:underline dark:text-brand-accent"
                        >
                            Back to Login
                        </Link>
                    </p>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Forgot your password?"
            subtitle="Don't worry! Just type in your email and we will send you a code to reset your password!"
        >
            <Form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <Input
                    label="Your email"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    required
                />

                <Button type="submit" isLoading={isLoading}>
                    Reset password
                </Button>

                <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                    Remembered your password?{" "}
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
