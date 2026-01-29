'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Server,
  Database,
  Cpu,
  HardDrive,
  Activity,
  Wifi,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Download,
} from 'lucide-react';
import { useState } from 'react';

export default function SystemHealthPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const systemMetrics = [
    {
      name: 'CPU Usage',
      value: 34,
      status: 'healthy',
      icon: Cpu,
      description: '8 cores available',
      color: 'text-success',
    },
    {
      name: 'Memory Usage',
      value: 68,
      status: 'warning',
      icon: HardDrive,
      description: '6.8 GB / 10 GB',
      color: 'text-warning',
    },
    {
      name: 'Disk Space',
      value: 45,
      status: 'healthy',
      icon: Database,
      description: '225 GB / 500 GB',
      color: 'text-success',
    },
    {
      name: 'Network',
      value: 92,
      status: 'healthy',
      icon: Wifi,
      description: 'Latency: 12ms',
      color: 'text-success',
    },
  ];

  const services = [
    { name: 'Web Server', status: 'running', uptime: '45d 12h', port: '3000' },
    { name: 'Database', status: 'running', uptime: '45d 12h', port: '5432' },
    { name: 'Redis Cache', status: 'running', uptime: '45d 12h', port: '6379' },
    { name: 'Email Service', status: 'running', uptime: '45d 12h', port: '587' },
    { name: 'Backup Service', status: 'idle', uptime: '45d 12h', port: '-' },
    { name: 'Analytics Engine', status: 'running', uptime: '45d 12h', port: '8080' },
  ];

  const recentLogs = [
    {
      id: '1',
      level: 'info',
      message: 'Database backup completed successfully',
      timestamp: '2 minutes ago',
    },
    {
      id: '2',
      level: 'success',
      message: 'System health check passed',
      timestamp: '15 minutes ago',
    },
    {
      id: '3',
      level: 'warning',
      message: 'Memory usage above 60% threshold',
      timestamp: '1 hour ago',
    },
    {
      id: '4',
      level: 'info',
      message: 'Scheduled task: Send daily reports completed',
      timestamp: '2 hours ago',
    },
    {
      id: '5',
      level: 'info',
      message: 'User authentication cache cleared',
      timestamp: '3 hours ago',
    },
  ];

  const backups = [
    { id: '1', name: 'Full System Backup', size: '2.4 GB', date: 'Today at 2:00 AM', status: 'completed' },
    { id: '2', name: 'Database Backup', size: '850 MB', date: 'Yesterday at 2:00 AM', status: 'completed' },
    { id: '3', name: 'Full System Backup', size: '2.3 GB', date: '2 days ago at 2:00 AM', status: 'completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-1">System Health</h1>
          <p className="text-muted-foreground mt-2">
            Monitor system performance and service status
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {systemMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.name}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                <Icon className={`w-4 h-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{metric.value}%</span>
                    <Badge variant={metric.status === 'healthy' ? 'default' : 'secondary'}>
                      {metric.status}
                    </Badge>
                  </div>
                  <Progress value={metric.value} />
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Services Status</CardTitle>
            <CardDescription>All running services and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {services.map((service) => (
                <div key={service.name} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {service.status === 'running' ? (
                      <CheckCircle className="w-5 h-5 text-(--success)" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{service.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Port: {service.port} • Uptime: {service.uptime}
                      </p>
                    </div>
                  </div>
                  <Badge variant={service.status === 'running' ? 'default' : 'secondary'}>
                    {service.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent System Logs</CardTitle>
            <CardDescription>Latest system events and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    log.level === 'success' ? 'bg-(--success)' :
                    log.level === 'warning' ? 'bg-(--warning)' :
                    log.level === 'error' ? 'bg-(--danger)' :
                    'bg-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{log.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Backup Management</CardTitle>
              <CardDescription>System backups and restore points</CardDescription>
            </div>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Create Backup
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{backup.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {backup.size} • {backup.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{backup.status}</Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
