import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useUIStore } from '../store/uiStore';
import clsx from 'clsx';

export default function DashboardLayout() {
    const { sidebarOpen } = useUIStore();

    return (
        <div className="antialiased bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Sidebar />
            <Header />

            <main className={clsx(
                "min-h-screen pt-20 pb-10 px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out",
                "lg:ml-72" // Fixed margin for desktop
            )}>
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={() => useUIStore.getState().toggleSidebar()}
                />
            )}
        </div>
    );
}
