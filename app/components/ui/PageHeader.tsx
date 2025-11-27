import { Button } from '../ui/Button';
import { Plus } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export function PageHeader({ title, description, actionLabel, onAction }: PageHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {title}
                </h1>
                {description && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>
            {actionLabel && onAction && (
                <div className="flex-shrink-0">
                    <Button onClick={onAction} className="w-auto">
                        <Plus className="w-4 h-4 mr-2" />
                        {actionLabel}
                    </Button>
                </div>
            )}
        </div>
    );
}
