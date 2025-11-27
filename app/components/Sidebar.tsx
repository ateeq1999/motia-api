import { Link, useLocation } from 'react-router';
import { Home, Settings, LogOut, Users, Ticket, Calendar, Building2, Utensils } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';
import { type UserRole } from '../types/auth';
import clsx from 'clsx';

interface NavLink {
    name: string;
    path: string;
    icon: React.ElementType;
    roles?: UserRole[];
}

export function Sidebar() {
    const { sidebarOpen } = useUIStore();
    const { user, logout } = useAuthStore();
    const location = useLocation();

    const links: NavLink[] = [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        {
            name: 'Users',
            path: '/dashboard/users',
            icon: Users,
            roles: ['SUPER_ADMIN', 'FACILITY_MANAGER']
        },
        {
            name: 'Vouchers',
            path: '/dashboard/vouchers',
            icon: Ticket,
            roles: ['EVENT_ORGANIZER', 'RESTAURANT_OWNER', 'SUPER_ADMIN']
        },
        {
            name: 'Events',
            path: '/dashboard/events',
            icon: Calendar,
            roles: ['EVENT_ORGANIZER', 'SUPER_ADMIN']
        },
        {
            name: 'Facilities',
            path: '/dashboard/facilities',
            icon: Building2,
            roles: ['FACILITY_MANAGER', 'SUPER_ADMIN']
        },
        {
            name: 'Restaurants',
            path: '/dashboard/restaurants',
            icon: Utensils,
            roles: ['RESTAURANT_OWNER', 'SUPER_ADMIN']
        },
        { name: 'Settings', path: '/dashboard/settings', icon: Settings },
    ];

    const filteredLinks = links.filter(link =>
        !link.roles || (user && link.roles.includes(user.role))
    );

    return (
        <aside className={clsx(
            "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out",
            sidebarOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full",
            "lg:translate-x-0"
        )}>
            <div className="h-full px-4 py-6 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-xl lg:shadow-none flex flex-col">
                {/* Logo Area */}
                <div className="flex items-center mb-8 px-2">
                    <div className="h-10 w-10 bg-brand-primary rounded-xl mr-3 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-primary/30">K</div>
                    <span className="self-center text-xl font-bold whitespace-nowrap text-gray-900 dark:text-white tracking-tight">Karibu Pass</span>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto no-scrollbar">
                    <ul className="space-y-1.5">
                        {filteredLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.path;
                            return (
                                <li key={link.path}>
                                    <Link to={link.path} className={clsx(
                                        "flex items-center p-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                        isActive
                                            ? "bg-brand-primary text-white shadow-md shadow-brand-primary/25"
                                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                                    )}>
                                        <Icon className={clsx(
                                            "w-5 h-5 transition-transform duration-200",
                                            isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300",
                                            "group-hover:scale-110"
                                        )} />
                                        <span className="ml-3 font-medium tracking-wide text-sm">{link.name}</span>
                                        {isActive && (
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/20 rounded-l-full" />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* User Profile & Logout */}
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center p-3 mb-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex-shrink-0">
                            {user?.avatarUrl ? (
                                <img className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm" src={user.avatarUrl} alt="User" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-brand-secondary flex items-center justify-center text-white font-bold shadow-sm">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                            )}
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                {user?.name || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user?.email || 'user@example.com'}
                            </p>
                        </div>
                    </div>

                    <button onClick={logout} className="flex items-center w-full p-3 text-gray-600 rounded-xl dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                        <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        <span className="ml-3 font-medium text-sm">Sign Out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
