'use client';

import { School, Users, GraduationCap, DollarSign } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { OverviewCharts } from '@/components/dashboard/overview-charts';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { useSchoolsStore } from '@/lib/stores/schools-store';
import { useUsersStore } from '@/lib/stores/users-store';

export default function DashboardPage() {
  const schools = useSchoolsStore((state) => state.schools);
  const users = useUsersStore((state) => state.users);

  const totalSchools = schools.length;
  const activeSchools = schools.filter((s) => s.status === 'active').length;
  const totalUsers = users.length;
  const totalStudents = users.filter((u) => u.role === 'student').length;
  const totalRevenue = schools.reduce((acc, school) => {
    const price = school.subscription === 'basic' ? 99 : school.subscription === 'premium' ? 199 : 399;
    return acc + price;
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-1">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your multi-school management system
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Schools"
          value={totalSchools}
          change={12.5}
          icon={School}
        />
        <StatsCard
          title="Total Users"
          value={totalUsers}
          change={8.2}
          icon={Users}
        />
        <StatsCard
          title="Total Students"
          value={totalStudents}
          change={15.3}
          icon={GraduationCap}
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change={9.7}
          icon={DollarSign}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <QuickActions />
      </div>

      <OverviewCharts />
    </div>
  );
}
