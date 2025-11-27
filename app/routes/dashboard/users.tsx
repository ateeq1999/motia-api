import { PageHeader } from '../../components/ui/PageHeader';
import { MoreVertical, Search, Filter } from 'lucide-react';

// Mock Data
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Super Admin', status: 'Active', lastActive: '2 mins ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Event Organizer', status: 'Active', lastActive: '1 hour ago' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Facility Manager', status: 'Inactive', lastActive: '2 days ago' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Restaurant Owner', status: 'Active', lastActive: '5 mins ago' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'User', status: 'Suspended', lastActive: '1 week ago' },
];

export default function UsersPage() {
    return (
        <div>
            <PageHeader
                title="Users"
                description="Manage user access and roles."
                actionLabel="Add User"
                onAction={() => console.log('Add User clicked')}
            />

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-brand-primary dark:focus:border-brand-primary"
                        placeholder="Search users..."
                    />
                </div>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-brand-primary focus:z-10 focus:ring-2 focus:ring-brand-primary focus:text-brand-primary dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                </button>
            </div>

            {/* Table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Last Active</th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="w-10 h-10 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-primary font-bold mr-3">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{user.name}</div>
                                        <div className="font-normal text-gray-500">{user.email}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className={`h-2.5 w-2.5 rounded-full mr-2 ${user.status === 'Active' ? 'bg-green-500' :
                                                user.status === 'Inactive' ? 'bg-gray-400' : 'bg-red-500'
                                            }`}></div>
                                        {user.status}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {user.lastActive}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
