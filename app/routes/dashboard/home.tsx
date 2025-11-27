import { Users, Ticket, DollarSign, TrendingUp } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ElementType;
    trend?: string;
    trendUp?: boolean;
    color: string;
}

function StatCard({ title, value, icon: Icon, trend, trendUp, color }: StatCardProps) {
    return (
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${color} bg-opacity-10 dark:bg-opacity-20`}>
                    <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                </div>
                {trend && (
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${trendUp ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                        {trend}
                    </span>
                )}
            </div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
    );
}

export default function DashboardHome() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard</h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">Overview of your platform's performance.</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-lg hover:bg-brand-secondary focus:ring-4 focus:ring-brand-primary/30 transition-colors shadow-sm shadow-brand-primary/30">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Generate Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Users"
                    value="12,345"
                    icon={Users}
                    trend="+12.5%"
                    trendUp={true}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Active Vouchers"
                    value="845"
                    icon={Ticket}
                    trend="+5.2%"
                    trendUp={true}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    icon={DollarSign}
                    trend="+8.1%"
                    trendUp={true}
                    color="bg-green-500"
                />
                <StatCard
                    title="Active Events"
                    value="23"
                    icon={Calendar}
                    trend="-2.4%"
                    trendUp={false}
                    color="bg-orange-500"
                />
            </div>

            {/* Recent Activity Section (Placeholder) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                                    <Users className="w-5 h-5 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">New user registered</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-xl hover:border-brand-primary dark:hover:border-brand-primary hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 transition-all group">
                            <Ticket className="w-6 h-6 text-gray-400 group-hover:text-brand-primary mb-2 transition-colors" />
                            <span className="block font-medium text-gray-900 dark:text-white">Create Voucher</span>
                        </button>
                        <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-xl hover:border-brand-primary dark:hover:border-brand-primary hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 transition-all group">
                            <Users className="w-6 h-6 text-gray-400 group-hover:text-brand-primary mb-2 transition-colors" />
                            <span className="block font-medium text-gray-900 dark:text-white">Add User</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Calendar } from 'lucide-react';
