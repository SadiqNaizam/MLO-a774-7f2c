import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MousePointerClick, FileText, BarChart2, MoreHorizontal, ArrowUp, ArrowDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface MetricCardData {
  id: string;
  title: string;
  value: string;
  percentageChange: number;
  changeDescription: string;
  icon: React.ElementType;
  iconBgColor: string;
}

const metricData: MetricCardData[] = [
  {
    id: 'visitors',
    title: 'Total Visitors',
    value: '2,01,620',
    percentageChange: 2.31,
    changeDescription: 'From Last Month',
    icon: Users,
    iconBgColor: 'bg-purple-100 dark:bg-purple-900',
  },
  {
    id: 'clicks',
    title: 'Total Clicks',
    value: '1,96,325',
    percentageChange: 5.93,
    changeDescription: 'From Last Month',
    icon: MousePointerClick,
    iconBgColor: 'bg-blue-100 dark:bg-blue-900',
  },
  {
    id: 'commission',
    title: 'Commission',
    value: '1,20,145',
    percentageChange: 9.05,
    changeDescription: 'From Last Month',
    icon: FileText,
    iconBgColor: 'bg-green-100 dark:bg-green-900',
  },
  {
    id: 'bounceRate',
    title: 'Bounce Rate',
    value: '1,546',
    percentageChange: -1.03,
    changeDescription: 'From Last Month',
    icon: BarChart2,
    iconBgColor: 'bg-red-100 dark:bg-red-900',
  },
];

interface MetricCardProps extends MetricCardData {}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  percentageChange,
  changeDescription,
  icon: Icon,
  iconBgColor,
}) => {
  const isPositiveChange = percentageChange >= 0;
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className={cn('p-2 rounded-md', iconBgColor)}>
          <Icon className={cn('h-5 w-5',
            iconBgColor.includes('purple') ? 'text-purple-600 dark:text-purple-300' :
            iconBgColor.includes('blue') ? 'text-blue-600 dark:text-blue-300' :
            iconBgColor.includes('green') ? 'text-green-600 dark:text-green-300' :
            iconBgColor.includes('red') ? 'text-red-600 dark:text-red-300' : 'text-foreground'
          )} />
        </div>
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Export Data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground mt-1 flex items-center">
          <Badge
            variant={isPositiveChange ? 'default' : 'destructive'}
            className={cn(
              'text-xs px-1.5 py-0.5 mr-1 font-semibold',
              isPositiveChange ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200' : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200'
            )}
          >
            {isPositiveChange ? (
              <ArrowUp className="h-3 w-3 mr-0.5 inline-block" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-0.5 inline-block" />
            )}
            {Math.abs(percentageChange)}%
          </Badge>
          {changeDescription}
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricCardsGridProps {
  className?: string;
}

const MetricCardsGrid: React.FC<MetricCardsGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {metricData.map((metric) => (
        <MetricCard key={metric.id} {...metric} />
      ))}
    </div>
  );
};

export default MetricCardsGrid;
