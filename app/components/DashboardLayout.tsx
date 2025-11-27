import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useUIStore } from '../store/uiStore';
import clsx from 'clsx';

export default function DashboardLayout() {
    const { sidebarOpen } = useUIStore();

    return (
        <div className="antialiased bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Header />
            <Sidebar />
            <main className={clsx(
                "p-4 h-auto pt-20 transition-all duration-300",
                sidebarOpen ? "sm:ml-64" : "ml-0"
            )}>
                <Outlet />
            </main>
        </div>
    );
}
