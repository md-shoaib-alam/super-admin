'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, Upload, Download, UserPlus, School as SchoolIcon } from 'lucide-react';
import { useState } from 'react';

const activityLogs = [
  {
    id: '1',
    action: 'school_added',
    user: 'Admin User',
    description: 'Added new school: Phoenix International School',
    timestamp: '2026-01-29T10:30:00',
    icon: Plus,
    color: 'text-success',
  },
  {
    id: '2',
    action: 'user_added',
    user: 'Sarah Johnson',
    description: 'Registered 15 new students at Greenwood High School',
    timestamp: '2026-01-29T09:15:00',
    icon: UserPlus,
    color: 'text-primary',
  },
  {
    id: '3',
    action: 'school_updated',
    user: 'Admin User',
    description: 'Updated subscription for Valley View Academy to Enterprise',
    timestamp: '2026-01-29T08:45:00',
    icon: Edit,
    color: 'text-warning',
  },
  {
    id: '4',
    action: 'data_export',
    user: 'Michael Chen',
    description: 'Exported student records for Riverside Academy',
    timestamp: '2026-01-28T16:20:00',
    icon: Download,
    color: 'text-muted-foreground',
  },
  {
    id: '5',
    action: 'school_added',
    user: 'Admin User',
    description: 'Added new school: Summit Learning Center',
    timestamp: '2026-01-28T14:10:00',
    icon: Plus,
    color: 'text-success',
  },
  {
    id: '6',
    action: 'user_updated',
    user: 'Emily Williams',
    description: 'Updated teacher information at Maple Leaf Elementary',
    timestamp: '2026-01-28T11:30:00',
    icon: Edit,
    color: 'text-warning',
  },
  {
    id: '7',
    action: 'school_deleted',
    user: 'Admin User',
    description: 'Removed inactive school: Old Valley School',
    timestamp: '2026-01-27T15:45:00',
    icon: Trash2,
    color: 'text-danger',
  },
  {
    id: '8',
    action: 'bulk_upload',
    user: 'Sarah Johnson',
    description: 'Bulk uploaded 50 student records',
    timestamp: '2026-01-27T10:20:00',
    icon: Upload,
    color: 'text-primary',
  },
  {
    id: '9',
    action: 'school_updated',
    user: 'Admin User',
    description: 'Updated contact information for Bright Future Elementary',
    timestamp: '2026-01-26T13:15:00',
    icon: Edit,
    color: 'text-warning',
  },
  {
    id: '10',
    action: 'user_added',
    user: 'Robert Martinez',
    description: 'Added 8 new teachers across multiple schools',
    timestamp: '2026-01-26T09:00:00',
    icon: UserPlus,
    color: 'text-primary',
  },
];

const actionTypes = [
  { value: 'all', label: 'All Actions' },
  { value: 'school_added', label: 'School Added' },
  { value: 'school_updated', label: 'School Updated' },
  { value: 'school_deleted', label: 'School Deleted' },
  { value: 'user_added', label: 'User Added' },
  { value: 'user_updated', label: 'User Updated' },
  { value: 'data_export', label: 'Data Export' },
  { value: 'bulk_upload', label: 'Bulk Upload' },
];

export default function ActivityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-1">Activity Log</h1>
        <p className="text-muted-foreground mt-2">
          Track all actions and changes across the system
        </p>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            {actionTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {activityLogs.length} activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-6">
              {filteredLogs.map((log, index) => {
                const Icon = log.icon;
                return (
                  <div key={log.id} className="relative flex gap-6">
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center ${log.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-medium">{log.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">
                              by {log.user}
                            </span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(log.timestamp)}
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {log.action.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
