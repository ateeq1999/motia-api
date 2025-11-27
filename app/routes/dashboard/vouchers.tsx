import { PageHeader } from '../../components/ui/PageHeader';
import { MoreVertical, Search, Filter, Ticket } from 'lucide-react';

// Mock Data
const vouchers = [
    { id: 'VCH-001', code: 'SUMMER2024', event: 'Summer Music Fest', type: 'VIP', status: 'Active', redeemed: 45, total: 100 },
    { id: 'VCH-002', code: 'FOODIE50', event: 'Zanzibar Food Expo', type: 'Regular', status: 'Expired', redeemed: 200, total: 200 },
    { id: 'VCH-003', code: 'TECHCONF', event: 'Tech Summit 2024', type: 'Early Bird', status: 'Active', redeemed: 12, total: 50 },
    { id: 'VCH-004', code: 'WELCOME10', event: 'Grand Opening', type: 'Discount', status: 'Active', redeemed: 5, total: 1000 },
];

export default function VouchersPage() {
    return (
        <div>
            <PageHeader
                title="Vouchers"
                description="Manage event vouchers and tickets."
                actionLabel="Create Voucher"
                onAction={() => console.log('Create Voucher clicked')}
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
                        placeholder="Search vouchers..."
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
                            <th scope="col" className="px-6 py-3">Code</th>
                            <th scope="col" className="px-6 py-3">Event</th>
                            <th scope="col" className="px-6 py-3">Type</th>
                            <th scope="col" className="px-6 py-3">Redeemed</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {vouchers.map((voucher) => (
                            <tr key={voucher.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2">
                                    <Ticket className="w-4 h-4 text-brand-primary" />
                                    {voucher.code}
                                </th>
                                <td className="px-6 py-4">
                                    {voucher.event}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                                        {voucher.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 max-w-[100px]">
                                        <div className="bg-brand-primary h-2.5 rounded-full" style={{ width: `${(voucher.redeemed / voucher.total) * 100}%` }}></div>
                                    </div>
                                    <span className="text-xs mt-1 block">{voucher.redeemed} / {voucher.total}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${voucher.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                        }`}>
                                        {voucher.status}
                                    </span>
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
