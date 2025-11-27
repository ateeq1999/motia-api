import { Link } from "react-router";
import { AuthLayout } from "../components/auth/AuthLayout";
import { Button } from "../components/ui/Button";
import { Mail } from "lucide-react";

export default function VerifyEmail() {
    return (
        <AuthLayout title="Verify your email">
            <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-brand-primary" />
                </div>

                <p className="text-gray-500 dark:text-gray-400">
                    We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
                </p>

                <div className="space-y-3 w-full">
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        Resend Email
                    </Button>

                    <Button variant="ghost" asChild>
                        <Link to="/login">Skip for now</Link>
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
}
