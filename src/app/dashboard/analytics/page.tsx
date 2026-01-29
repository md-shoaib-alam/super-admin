'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { useSchoolsStore } from '@/lib/stores/schools-store';
import { useUsersStore } from '@/lib/stores/users-store';

const monthlyEnrollment = [
  { month: 'Jul', students: 3800, teachers: 280 },
  { month: 'Aug', students: 4100, teachers: 295 },
  { month: 'Sep', students: 4500, teachers: 310 },
  { month: 'Oct', students: 4750, teachers: 320 },
  { month: 'Nov', students: 5000, teachers: 335 },
  { month: 'Dec', students: 5300, teachers: 345 },
];

const revenueData = [
  { month: 'Jan', revenue: 28000 },
  { month: 'Feb', revenue: 31000 },
  { month: 'Mar', revenue: 34000 },
  { month: 'Apr', revenue: 36000 },
  { month: 'May', revenue: 39000 },
  { month: 'Jun', revenue: 42000 },
];

const chartConfig = {
  students: { label: 'Students', color: 'var(--color-chart-1)' },
  teachers: { label: 'Teachers', color: 'var(--color-chart-2)' },
  revenue: { label: 'Revenue', color: 'var(--color-chart-3)' },
};

export default function AnalyticsPage() {
  const schools = useSchoolsStore((state) => state.schools);
  const users = useUsersStore((state) => state.users);

  const subscriptionData = [
    {
      name: 'Basic',
      value: schools.filter((s) => s.subscription === 'basic').length,
      fill: 'var(--color-chart-1)',
    },
    {
      name: 'Premium',
      value: schools.filter((s) => s.subscription === 'premium').length,
      fill: 'var(--color-chart-2)',
    },
    {
      name: 'Enterprise',
      value: schools.filter((s) => s.subscription === 'enterprise').length,
      fill: 'var(--color-chart-3)',
    },
  ];

  const usersByRole = [
    { role: 'Super Admin', count: users.filter((u) => u.role === 'super_admin').length },
    { role: 'School Admin', count: users.filter((u) => u.role === 'school_admin').length },
    { role: 'Teacher', count: users.filter((u) => u.role === 'teacher').length },
    { role: 'Student', count: users.filter((u) => u.role === 'student').length },
  ];

  const activePercentage = [
    {
      name: 'Active Users',
      value: (users.filter((u) => u.status === 'active').length / users.length) * 100,
      fill: 'var(--color-chart-1)',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-1">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Detailed insights and reports across the system
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Enrollment Trends</CardTitle>
            <CardDescription>Student and teacher growth over 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={monthlyEnrollment}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                />
                <YAxis tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="students"
                  stackId="1"
                  stroke="var(--color-chart-1)"
                  fill="var(--color-chart-1)"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="teachers"
                  stackId="2"
                  stroke="var(--color-chart-2)"
                  fill="var(--color-chart-2)"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
            <CardDescription>Monthly revenue from subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                />
                <YAxis tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-chart-3)"
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-chart-3)', r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Distribution</CardTitle>
            <CardDescription>Schools by subscription tier</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subscriptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
            <CardDescription>Distribution of users across different roles</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={usersByRole} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} />
                <YAxis
                  dataKey="role"
                  type="category"
                  width={100}
                  tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-chart-2)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Percentage of active users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="90%"
                data={activePercentage}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={10}
                  fill="var(--color-chart-1)"
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground text-heading-2 font-bold"
                >
                  {activePercentage[0].value.toFixed(0)}%
                </text>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics Summary</CardTitle>
            <CardDescription>Overall system performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b">
                <div>
                  <p className="text-sm font-medium">Total Schools</p>
                  <p className="text-tiny text-muted-foreground mt-1">Active institutions</p>
                </div>
                <p className="text-heading-3 font-bold">{schools.length}</p>
              </div>
              <div className="flex items-center justify-between pb-3 border-b">
                <div>
                  <p className="text-sm font-medium">Total Users</p>
                  <p className="text-tiny text-muted-foreground mt-1">Registered accounts</p>
                </div>
                <p className="text-heading-3 font-bold">{users.length}</p>
              </div>
              <div className="flex items-center justify-between pb-3 border-b">
                <div>
                  <p className="text-sm font-medium">Average Students per School</p>
                  <p className="text-tiny text-muted-foreground mt-1">Enrollment average</p>
                </div>
                <p className="text-heading-3 font-bold">
                  {Math.round(
                    schools.reduce((acc, s) => acc + s.studentCount, 0) / schools.length
                  )}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Active Schools</p>
                  <p className="text-tiny text-muted-foreground mt-1">Currently operational</p>
                </div>
                <p className="text-heading-3 font-bold">
                  {schools.filter((s) => s.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
