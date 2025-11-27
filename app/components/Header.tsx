import { Menu, Moon, Sun } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';

export function Header() {
    const { toggleSidebar, theme, toggleTheme } = useUIStore();
    const { user } = useAuthStore();

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
            <div className="px-3 py-3 lg:px-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button onClick={toggleSidebar} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <Menu className="w-6 h-6" />
                        </button>
                        <a href="#" className="flex ms-2 md:me-24 sm:hidden">
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Karibu Pass</span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <button onClick={toggleTheme} className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 mr-2">
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>
                        <div className="flex items-center ml-3">
                            <div>
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false">
                                    <span className="sr-only">Open user menu</span>
                                    {user?.avatarUrl ? (
                                        <img className="w-8 h-8 rounded-full" src={user.avatarUrl} alt="user photo" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center text-white">
                                            {user?.name?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
