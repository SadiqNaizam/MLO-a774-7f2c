import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface TrafficSourceData {
  id: string;
  name: string;
  value: number;
  total: number;
  color: string; // Tailwind color class e.g., 'bg-primary'
}

const trafficSourcesData: TrafficSourceData[] = [
  {
    id: 'google',
    name: 'Google',
    value: 89528,
    total: 100000,
    color: 'bg-primary',
  },
  {
    id: 'social',
    name: 'Social Media',
    value: 57658,
    total: 100000,
    color: 'bg-foreground/80',
  },
  {
    id: 'direct',
    name: 'Direct Message',
    value: 22717,
    total: 100000,
    color: 'bg-accent-green',
  },
  {
    id: 'referral',
    name: 'Referral',
    value: 15830,
    total: 100000,
    color: 'bg-yellow-500',
  },
];

interface TrafficSourcesProps {
  className?: string;
}

const TrafficSources: React.FC<TrafficSourcesProps> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">Traffic Sources</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">How users are finding you.</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="august">
            <SelectTrigger className="w-[100px] h-8 text-xs">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="august">August</SelectItem>
              <SelectItem value="july">July</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="2023">
            <SelectTrigger className="w-[90px] h-8 text-xs">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-5">
        {trafficSourcesData.map((source) => (
          <div key={source.id}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-foreground">{source.name}</span>
              <span className="text-sm text-muted-foreground">{source.value.toLocaleString()}</span>
            </div>
            <Progress value={(source.value / source.total) * 100} className="h-2 [&>div]:bg-primary" indicatorClassName={source.color} />
          </div>
        ))}
        <div className="flex justify-between text-xs text-muted-foreground border-t border-border pt-3 mt-3">
          <span>0k</span>
          <span>20k</span>
          <span>40k</span>
          <span>60k</span>
          <span>80k</span>
          <span>100k</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficSources;
