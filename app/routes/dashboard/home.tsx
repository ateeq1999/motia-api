export default function DashboardHome() {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Welcome to Karibu Pass Admin Dashboard.</p>

            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Users</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">1,234</p>
                </div>
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Active Vouchers</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">567</p>
                </div>
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Revenue</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">$12,345</p>
                </div>
            </div>
        </div>
    );
}
