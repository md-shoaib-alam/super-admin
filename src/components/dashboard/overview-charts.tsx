'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { name: 'Jan', students: 4000, revenue: 24000 },
  { name: 'Feb', students: 4200, revenue: 26000 },
  { name: 'Mar', students: 4500, revenue: 28000 },
  { name: 'Apr', students: 4800, revenue: 30000 },
  { name: 'May', students: 5100, revenue: 32000 },
  { name: 'Jun', students: 5300, revenue: 34000 },
];

const subscriptionData = [
  { name: 'Basic', value: 3, fill: 'var(--color-chart-1)' },
  { name: 'Premium', value: 2, fill: 'var(--color-chart-2)' },
  { name: 'Enterprise', value: 3, fill: 'var(--color-chart-3)' },
];

const chartConfig = {
  students: {
    label: 'Students',
    color: 'var(--color-chart-1)',
  },
  revenue: {
    label: 'Revenue',
    color: 'var(--color-chart-2)',
  },
};

export function OverviewCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Student Enrollment</CardTitle>
          <CardDescription>Monthly student growth over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                className="text-xs"
                tick={{ fill: 'var(--color-muted-foreground)' }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: 'var(--color-muted-foreground)' }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="students"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-chart-1)' }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                className="text-xs"
                tick={{ fill: 'var(--color-muted-foreground)' }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: 'var(--color-muted-foreground)' }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Distribution</CardTitle>
          <CardDescription>Schools by subscription plan</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={subscriptionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {subscriptionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions across the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'New school added', school: 'Phoenix International', time: '2 hours ago' },
              { action: 'User registered', school: 'Greenwood High School', time: '4 hours ago' },
              { action: 'Subscription upgraded', school: 'Valley View Academy', time: '1 day ago' },
              { action: 'New teacher added', school: 'Riverside Academy', time: '2 days ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.school}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
