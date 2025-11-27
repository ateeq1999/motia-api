import { PageHeader } from '../../components/ui/PageHeader';
import { MoreVertical, Search, Filter, Calendar, MapPin } from 'lucide-react';

// Mock Data
const events = [
    { id: 1, name: 'Summer Music Fest', date: '2024-08-15', location: 'Kendwa Rocks', status: 'Upcoming', attendees: 1200 },
    { id: 2, name: 'Zanzibar Food Expo', date: '2024-09-01', location: 'Forodhani Gardens', status: 'Planning', attendees: 500 },
    { id: 3, name: 'Tech Summit 2024', date: '2024-10-10', location: 'Hotel Verde', status: 'Upcoming', attendees: 300 },
    { id: 4, name: 'Full Moon Party', date: '2024-07-21', location: 'Kendwa', status: 'Completed', attendees: 2500 },
];

export default function EventsPage() {
    return (
        <div>
            <PageHeader
                title="Events"
                description="Manage your upcoming and past events."
                actionLabel="Create Event"
                onAction={() => console.log('Create Event clicked')}
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
                        placeholder="Search events..."
                    />
                </div>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-brand-primary focus:z-10 focus:ring-2 focus:ring-brand-primary focus:text-brand-primary dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                </button>
            </div>

            {/* Grid Layout for Events */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event.id} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg relative">
                            {/* Placeholder Image */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                <Calendar className="w-12 h-12" />
                            </div>
                            <div className="absolute top-4 right-4">
                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${event.status === 'Upcoming' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                        event.status === 'Planning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                    }`}>
                                    {event.status}
                                </span>
                            </div>
                        </div>
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.name}</h5>
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {event.date}
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {event.location}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500 dark:text-gray-400">{event.attendees} Attendees</span>
                                <button className="text-brand-primary hover:text-brand-secondary font-medium text-sm">
                                    Manage Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
