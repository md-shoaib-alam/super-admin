import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  description?: string;
}

export function StatsCard({ title, value, change, icon: Icon, description }: StatsCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-heading-2 font-bold">{value}</div>
        {change !== undefined && (
          <p className="text-xs text-muted-foreground mt-1">
            <span
              className={`font-medium ${
                isPositive
                  ? 'text-(--success)'
                  : isNegative
                  ? 'text-(--danger)'
                  : ''
              }`}
            >
              {isPositive && '+'}
              {change}%
            </span>{' '}
            from last month
          </p>
        )}
        {description && !change && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
