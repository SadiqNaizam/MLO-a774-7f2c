import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

interface Activity {
  id: string;
  user: string;
  avatarUrl?: string;
  dateTime: Date;
  duration: string;
  commission: number;
  status: 'Successful' | 'Pending' | 'Failed';
}

const activityData: Activity[] = [
  {
    id: 'act1',
    user: 'Esther Howard',
    avatarUrl: 'https://i.pravatar.cc/32?u=esther',
    dateTime: new Date('2023-08-22T17:32:00'),
    duration: '00:18:25',
    commission: 38582,
    status: 'Successful' as const,
  },
  {
    id: 'act2',
    user: 'Cameron Williamson',
    avatarUrl: 'https://i.pravatar.cc/32?u=cameron',
    dateTime: new Date('2023-08-22T18:12:00'),
    duration: '00:13:39',
    commission: 35957,
    status: 'Pending' as const,
  },
  {
    id: 'act3',
    user: 'Brooklyn Simmons',
    avatarUrl: 'https://i.pravatar.cc/32?u=brooklyn',
    dateTime: new Date('2023-08-22T18:50:00'),
    duration: '00:32:21',
    commission: 30291,
    status: 'Successful' as const,
  },
  {
    id: 'act4',
    user: 'Wade Warren',
    avatarUrl: 'https://i.pravatar.cc/32?u=wade',
    dateTime: new Date('2023-08-22T19:15:00'),
    duration: '00:09:50',
    commission: 28770,
    status: 'Failed' as const,
  },
];

interface RecentActivityFeedProps {
  className?: string;
}

const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ className }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date('2023-08-22'));
  const [showCount, setShowCount] = React.useState<string>('4');

  const getStatusBadgeVariant = (status: Activity['status']) => {
    switch (status) {
      case 'Successful': return 'default'; // Will use primary color (purple-ish)
      case 'Pending': return 'secondary'; // Will use secondary color (gray-ish)
      case 'Failed': return 'destructive'; // Will use destructive color (red)
      default: return 'default';
    }
  };

  const getStatusBadgeClassName = (status: Activity['status']) => {
    switch (status) {
      case 'Successful': return 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200';
      case 'Failed': return 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200';
    }
  }

  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">Recent Activity</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">Latest user interactions and transactions.</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[180px] justify-start text-left font-normal h-8 text-xs",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarDays className="mr-2 h-3.5 w-3.5" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select value={showCount} onValueChange={setShowCount}>
            <SelectTrigger className="w-[90px] h-8 text-xs">
              <SelectValue placeholder="Show" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">Show 4</SelectItem>
              <SelectItem value="10">Show 10</SelectItem>
              <SelectItem value="20">Show 20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">User</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Commission</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityData.slice(0, parseInt(showCount)).map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium text-foreground">{activity.user}</TableCell>
                <TableCell className="text-muted-foreground">{format(activity.dateTime, "dd MMM, p")}</TableCell>
                <TableCell className="text-muted-foreground">{activity.duration}</TableCell>
                <TableCell className="text-right text-foreground">{activity.commission.toLocaleString()} USD</TableCell>
                <TableCell className="text-center">
                  <Badge variant={getStatusBadgeVariant(activity.status)} className={cn('text-xs px-1.5 py-0.5', getStatusBadgeClassName(activity.status))}>
                    {activity.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentActivityFeed;
