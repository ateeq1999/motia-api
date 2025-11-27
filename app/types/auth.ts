export type UserRole = 'SUPER_ADMIN' | 'FACILITY_MANAGER' | 'EVENT_ORGANIZER' | 'RESTAURANT_OWNER';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatarUrl?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
}
