'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet, FileText, Calendar, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useSchoolsStore } from '@/lib/stores/schools-store';
import { useUsersStore } from '@/lib/stores/users-store';

export default function ReportsPage() {
  const schools = useSchoolsStore((state) => state.schools);
  const users = useUsersStore((state) => state.users);

  const generateCSV = (data: any[], filename: string) => {
    // Mock CSV generation
    const csvContent = data.map((row) => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
  };

  const reports = [
    {
      id: '1',
      title: 'Schools Overview Report',
      description: 'Complete list of all schools with subscription details',
      icon: FileSpreadsheet,
      type: 'Excel',
      lastGenerated: '2 hours ago',
      records: schools.length,
      action: () => generateCSV(schools, 'schools-report'),
    },
    {
      id: '2',
      title: 'Users Report',
      description: 'All registered users across the system with role information',
      icon: FileText,
      type: 'CSV',
      lastGenerated: '5 hours ago',
      records: users.length,
      action: () => generateCSV(users, 'users-report'),
    },
    {
      id: '3',
      title: 'Student Enrollment Report',
      description: 'Student count and enrollment trends by school',
      icon: TrendingUp,
      type: 'Excel',
      lastGenerated: '1 day ago',
      records: schools.reduce((acc, s) => acc + s.studentCount, 0),
      action: () => alert('Generating student enrollment report...'),
    },
    {
      id: '4',
      title: 'Revenue Report',
      description: 'Monthly revenue breakdown by subscription tier',
      icon: FileSpreadsheet,
      type: 'Excel',
      lastGenerated: '2 days ago',
      records: schools.length,
      action: () => alert('Generating revenue report...'),
    },
    {
      id: '5',
      title: 'Monthly Activity Report',
      description: 'Comprehensive activity log for the past month',
      icon: Calendar,
      type: 'PDF',
      lastGenerated: '3 days ago',
      records: 127,
      action: () => alert('Generating monthly activity report...'),
    },
    {
      id: '6',
      title: 'Teacher Directory',
      description: 'Complete directory of all teachers across schools',
      icon: FileText,
      type: 'CSV',
      lastGenerated: '1 week ago',
      records: users.filter((u) => u.role === 'teacher').length,
      action: () => {
        const teachers = users.filter((u) => u.role === 'teacher');
        generateCSV(teachers, 'teachers-directory');
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-1">Reports</h1>
        <p className="text-muted-foreground mt-2">
          Generate and download various system reports
        </p>
      </div>

      <div className="grid gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription className="mt-1">{report.description}</CardDescription>
                      <div className="flex items-center gap-3 mt-3">
                        <Badge variant="outline">{report.type}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {report.records} records
                        </span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          Last generated {report.lastGenerated}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={report.action}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
          <CardDescription>
            Create custom reports with specific data fields and filters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
              Build custom reports by selecting specific data fields, applying filters, and scheduling automated generation
            </p>
            <Button variant="outline" disabled>
              Create Custom Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
