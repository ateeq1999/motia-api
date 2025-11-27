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
            "fixed left-0 top-0 z-40 h-screen transition-transform bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800",
            sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full",
            "sm:translate-x-0"
        )}>
            <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
                <div className="flex items-center mb-5 pl-2.5">
                    <div className="h-8 w-8 bg-brand-primary rounded-md mr-3 flex items-center justify-center text-white font-bold">K</div>
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Karibu Pass</span>
                </div>
                <ul className="space-y-2 font-medium flex-1">
                    {filteredLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;
                        return (
                            <li key={link.path}>
                                <Link to={link.path} className={clsx(
                                    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
                                    isActive && "bg-gray-100 dark:bg-gray-700 text-brand-primary dark:text-brand-accent"
                                )}>
                                    <Icon className={clsx(
                                        "w-5 h-5 transition duration-75",
                                        isActive ? "text-brand-primary dark:text-brand-accent" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    )} />
                                    <span className="ml-3">{link.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                    <button onClick={logout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full">
                        <LogOut className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        <span className="ml-3">Sign Out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
