import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserRating {
  id: string;
  rank: number;
  name: string;
  avatarUrl: string;
  revenue: number;
}

const userRatingsData: UserRating[] = [
  {
    id: 'user1',
    rank: 1,
    name: 'Esther Howard',
    avatarUrl: 'https://i.pravatar.cc/40?u=esther',
    revenue: 25000,
  },
  {
    id: 'user2',
    rank: 2,
    name: 'Leslie Alexander',
    avatarUrl: 'https://i.pravatar.cc/40?u=leslie',
    revenue: 18000,
  },
  {
    id: 'user3',
    rank: 3,
    name: 'Jenny Wilson',
    avatarUrl: 'https://i.pravatar.cc/40?u=jenny',
    revenue: 14000,
  },
  {
    id: 'user4',
    rank: 4,
    name: 'Ronald Richards',
    avatarUrl: 'https://i.pravatar.cc/40?u=ronald',
    revenue: 10000,
  },
   {
    id: 'user5',
    rank: 5,
    name: 'Cameron Williamson',
    avatarUrl: 'https://i.pravatar.cc/40?u=cameron',
    revenue: 9500,
  },
];

interface UserRatingTableProps {
  className?: string;
}

const UserRatingTable: React.FC<UserRatingTableProps> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">User Rating</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">Top users by revenue generated.</CardDescription>
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
      <CardContent className="pt-4">
        <div className="space-y-3">
          {userRatingsData.map((user, index) => (
            <div
              key={user.id}
              className={cn(
                'flex items-center justify-between p-3 rounded-md',
                index % 2 === 0 ? 'bg-muted/50' : ''
              )}
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-muted-foreground w-6 text-center">{user.rank}</span>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">{user.name}</span>
              </div>
              <span className="text-sm font-semibold text-primary">
                ${user.revenue.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRatingTable;
