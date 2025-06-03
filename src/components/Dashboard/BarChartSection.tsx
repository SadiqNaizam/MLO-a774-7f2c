import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const performanceData = [
  { name: 'Jan', target: 4, paid: 2.4, pending: 0.4 },
  { name: 'Feb', target: 3, paid: 1.9, pending: 0.3 },
  { name: 'Mar', target: 5, paid: 3.5, pending: 0.5 },
  { name: 'Apr', target: 2.7, paid: 1.8, pending: 0.2 },
  { name: 'May', target: 4.2, paid: 2.5, pending: 0.4 },
  { name: 'Jun', target: 3.5, paid: 2.1, pending: 0.3 },
  { name: 'Jul', target: 4.8, paid: 3.2, pending: 0.5 },
  { name: 'Aug', target: 5.5, paid: 4.0, pending: 0.6 },
  { name: 'Sep', target: 4.5, paid: 3.0, pending: 0.4 },
  { name: 'Oct', target: 5.2, paid: 3.8, pending: 0.5 },
  { name: 'Nov', target: 6, paid: 5.7, pending: 0.3 },
  { name: 'Dec', target: 5.8, paid: 4.5, pending: 0.4 },
];

const COLORS = {
  target: '#A8A0F4', // Lighter Primary Purple
  paid: '#7367F0',   // Primary Purple
  pending: '#FDB0B0', // Light Red
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 shadow-lg rounded-md border border-border">
        <p className="label text-sm font-semibold text-foreground">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }} className="text-xs">
            {`${entry.name}: ${entry.value}M`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface LegendItemProps {
  color: string;
  text: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ color, text }) => (
  <div className="flex items-center space-x-1.5">
    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }}></span>
    <span className="text-xs text-muted-foreground">{text}</span>
  </div>
);

interface BarChartSectionProps {
  className?: string;
}

const BarChartSection: React.FC<BarChartSectionProps> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">Performance</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">Monthly performance breakdown.</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
           <div className="flex items-center space-x-3 mr-2">
            <LegendItem color={COLORS.target} text="Target" />
            <LegendItem color={COLORS.paid} text="Paid" />
            <LegendItem color={COLORS.pending} text="Pending" />
          </div>
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
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={performanceData} margin={{ top: 5, right: 0, left: -25, bottom: 5 }} barGap={4} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))"/>
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10}/>
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `${value}M`} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, 'dataMax + 1']}
               />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.5 }} />
              {/* Legend component is removed as custom legend items are placed in CardHeader */}
              {/* <Legend /> */}
              <Bar dataKey="target" fill={COLORS.target} radius={[4, 4, 0, 0]} />
              <Bar dataKey="paid" fill={COLORS.paid} radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill={COLORS.pending} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChartSection;
