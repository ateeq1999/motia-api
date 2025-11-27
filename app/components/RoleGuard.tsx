import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthStore } from '../store/authStore';
import { type UserRole } from '../types/auth';

interface RoleGuardProps {
    allowedRoles: UserRole[];
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
    const { user, isAuthenticated } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Redirect to unauthorized page or dashboard home if they have access to at least that
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
