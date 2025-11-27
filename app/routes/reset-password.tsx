import { Form, Link, useNavigate } from "react-router";
import { AuthLayout } from "../components/auth/AuthLayout";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useState } from "react";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/login');
        }, 1000);
    };

    return (
        <AuthLayout
            title="Change Password"
            subtitle="Enter a new password below to change your password"
        >
            <Form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <Input
                    label="New Password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    required
                />
                <Input
                    label="Confirm New Password"
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    required
                />

                <Button type="submit" isLoading={isLoading}>
                    Change password
                </Button>

                <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                    <Link
                        to="/login"
                        className="font-medium text-brand-primary hover:underline dark:text-brand-accent"
                    >
                        Back to Login
                    </Link>
                </p>
            </Form>
        </AuthLayout>
    );
}
