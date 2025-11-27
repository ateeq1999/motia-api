import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { User, Bell, Lock, Globe } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="max-w-4xl">
            <PageHeader
                title="Settings"
                description="Manage your account and application preferences."
            />

            <div className="space-y-6">
                {/* Profile Settings */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-brand-primary/10 rounded-lg">
                            <User className="w-6 h-6 text-brand-primary" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Settings</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Full Name" defaultValue="John Doe" />
                        <Input label="Email Address" defaultValue="john@example.com" type="email" />
                        <Input label="Phone Number" defaultValue="+255 123 456 789" />
                        <Input label="Job Title" defaultValue="Super Admin" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button className="w-auto">Save Changes</Button>
                    </div>
                </div>

                {/* Notifications */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-yellow-500/10 rounded-lg">
                            <Bell className="w-6 h-6 text-yellow-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails about new events and updates.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/30 dark:peer-focus:ring-brand-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-primary"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications on your device.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/30 dark:peer-focus:ring-brand-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-red-500/10 rounded-lg">
                            <Lock className="w-6 h-6 text-red-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Security</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Current Password" type="password" />
                        <Input label="New Password" type="password" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button variant="outline" className="w-auto">Update Password</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
