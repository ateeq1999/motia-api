import { PageHeader } from '../../components/ui/PageHeader';
import { MoreVertical, Search, Filter, Utensils, Star } from 'lucide-react';

// Mock Data
const restaurants = [
    { id: 1, name: 'The Rock Restaurant', cuisine: 'Seafood', location: 'Michamvi Pingwe', rating: 4.8, status: 'Open' },
    { id: 2, name: 'Emerson Spice', cuisine: 'Swahili Fusion', location: 'Stone Town', rating: 4.9, status: 'Open' },
    { id: 3, name: 'Lukmaan Restaurant', cuisine: 'Local', location: 'Stone Town', rating: 4.5, status: 'Open' },
    { id: 4, name: 'Cape Town Fish Market', cuisine: 'Seafood', location: 'Forodhani', rating: 4.2, status: 'Closed' },
];

export default function RestaurantsPage() {
    return (
        <div>
            <PageHeader
                title="Restaurants"
                description="Manage restaurant listings and menus."
                actionLabel="Add Restaurant"
                onAction={() => console.log('Add Restaurant clicked')}
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
                        placeholder="Search restaurants..."
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
                            <th scope="col" className="px-6 py-3">Cuisine</th>
                            <th scope="col" className="px-6 py-3">Location</th>
                            <th scope="col" className="px-6 py-3">Rating</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map((restaurant) => (
                            <tr key={restaurant.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2">
                                    <Utensils className="w-4 h-4 text-brand-primary" />
                                    {restaurant.name}
                                </th>
                                <td className="px-6 py-4">
                                    {restaurant.cuisine}
                                </td>
                                <td className="px-6 py-4">
                                    {restaurant.location}
                                </td>
                                <td className="px-6 py-4 flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    {restaurant.rating}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${restaurant.status === 'Open' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                        }`}>
                                        {restaurant.status}
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
