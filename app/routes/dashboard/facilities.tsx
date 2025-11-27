import { PageHeader } from '../../components/ui/PageHeader';
import { MoreVertical, Search, Filter, Building2, MapPin } from 'lucide-react';

// Mock Data
const facilities = [
    { id: 1, name: 'Kendwa Rocks Hotel', type: 'Hotel', location: 'Kendwa, North A', status: 'Active', capacity: 500 },
    { id: 2, name: 'Z Hotel', type: 'Hotel', location: 'Nungwi, North A', status: 'Active', capacity: 300 },
    { id: 3, name: 'Amaan Bungalows', type: 'Resort', location: 'Nungwi, North A', status: 'Maintenance', capacity: 400 },
    { id: 4, name: 'Park Hyatt', type: 'Hotel', location: 'Stone Town', status: 'Active', capacity: 200 },
];

export default function FacilitiesPage() {
    return (
        <div>
            <PageHeader
                title="Facilities"
                description="Manage hotels, resorts, and other venues."
                actionLabel="Add Facility"
                onAction={() => console.log('Add Facility clicked')}
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
                        placeholder="Search facilities..."
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
                            <th scope="col" className="px-6 py-3">Type</th>
                            <th scope="col" className="px-6 py-3">Location</th>
                            <th scope="col" className="px-6 py-3">Capacity</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {facilities.map((facility) => (
                            <tr key={facility.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-brand-primary" />
                                    {facility.name}
                                </th>
                                <td className="px-6 py-4">
                                    {facility.type}
                                </td>
                                <td className="px-6 py-4 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {facility.location}
                                </td>
                                <td className="px-6 py-4">
                                    {facility.capacity}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${facility.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                        }`}>
                                        {facility.status}
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
