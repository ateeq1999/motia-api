import { Menu, Moon, Sun, Bell, Search } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';

export function Header() {
    const { toggleSidebar, theme, toggleTheme } = useUIStore();
    const { user } = useAuthStore();

    return (
        <nav className="fixed top-0 right-0 z-30 w-full lg:w-[calc(100%-18rem)] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
            <div className="px-4 py-3 lg:px-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-colors">
                            <span className="sr-only">Open sidebar</span>
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Search Bar (Hidden on mobile for now) */}
                        <div className="hidden md:flex items-center relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-200 rounded-full bg-gray-50 focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-brand-primary dark:focus:border-brand-primary transition-all w-64 focus:w-80"
                                placeholder="Search..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Notifications */}
                        <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                        </button>

                        {/* Theme Toggle */}
                        <button onClick={toggleTheme} className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors">
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>

                        {/* User Menu */}
                        <div className="flex items-center ml-1">
                            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition-shadow" aria-expanded="false">
                                <span className="sr-only">Open user menu</span>
                                {user?.avatarUrl ? (
                                    <img className="w-9 h-9 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm" src={user.avatarUrl} alt="user photo" />
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-brand-secondary flex items-center justify-center text-white font-bold border-2 border-white dark:border-gray-700 shadow-sm">
                                        {user?.name?.charAt(0) || 'U'}
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
