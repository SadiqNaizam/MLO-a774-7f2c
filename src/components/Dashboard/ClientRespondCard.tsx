import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { MoreHorizontal } from 'lucide-react';

const lineChartData = [
  { name: '7am', responds: 1200 }, { name: '8am', responds: 900 },
  { name: '9am', responds: 1500 }, { name: '10am', responds: 1300 },
  { name: '11am', responds: 1800 }, { name: '12pm', responds: 1600 },
  { name: '1pm', responds: 2200 }, { name: '2pm', responds: 2000 },
  { name: '3pm', responds: 1700 },
];

const pieChartData = [
  { name: 'Male', value: 58.08, color: '#7367F0' }, // Primary Purple
  { name: 'Female', value: 35.07, color: '#A8A0F4' }, // Lighter Primary Purple
  { name: 'Others', value: 6.05, color: '#D9D4FC' }, // Even Lighter Purple / Greyish
];

interface CustomLineTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomLineTooltip: React.FC<CustomLineTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 shadow-lg rounded-md border border-border">
        <p className="text-sm font-medium text-foreground">{`${label}: ${payload[0].value.toLocaleString()} responds`}</p>
      </div>
    );
  }
  return null;
};

interface ClientRespondCardProps {
  className?: string;
}

const ClientRespondCard: React.FC<ClientRespondCardProps> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:divide-x md:divide-border">
        {/* Left Section: Line Chart */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-1">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">Client Responds</CardTitle>
              <p className="text-sm text-muted-foreground">Today</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-3xl font-bold text-foreground mb-4">16,468</p>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineChartData} margin={{ top: 5, right: 10, left: -30, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorResponds" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7367F0" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#7367F0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} width={30} />
                <Tooltip content={<CustomLineTooltip />} cursor={{ stroke: '#7367F0', strokeWidth: 1 }} />
                <Area type="monotone" dataKey="responds" stroke="#7367F0" strokeWidth={2} fill="url(#colorResponds)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Section: Donut Chart */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
             {/* Title for this section could be implicit or explicit */}
            <CardTitle className="text-lg font-semibold text-foreground">Client Demographics</CardTitle>
            <Button variant="outline" size="sm" className="text-xs h-7">View Details</Button>
          </div>
          <div style={{ height: 200 }} className="flex items-center justify-center mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                {/* <Tooltip /> */}
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {pieChartData.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                  <span className="text-muted-foreground">{entry.name}</span>
                </div>
                <span className="font-medium text-foreground">{entry.value.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ClientRespondCard;
