import { Card, CardContent } from '@/components/ui/card';
import { Plus, Upload, Download, FileText, Users as UsersIcon, School as SchoolIcon } from 'lucide-react';
import Link from 'next/link';

const quickActions = [
  {
    title: 'Add School',
    description: 'Register a new school',
    icon: Plus,
    href: '/dashboard/schools',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Add User',
    description: 'Create new user account',
    icon: UsersIcon,
    href: '/dashboard/users',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    title: 'Generate Report',
    description: 'Download system reports',
    icon: FileText,
    href: '/dashboard/reports',
    color: 'bg-(--success)/10 text-(--success)',
  },
  {
    title: 'Import Data',
    description: 'Bulk upload records',
    icon: Upload,
    href: '/dashboard/schools',
    color: 'bg-(--warning)/10 text-(--warning)',
  },
];

export function QuickActions() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {quickActions.map((action) => {
        const Icon = action.icon;
        return (
          <Link key={action.title} href={action.href}>
            <Card className="cursor-pointer hover:shadow-md transition-all hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
