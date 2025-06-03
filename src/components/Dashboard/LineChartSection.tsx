import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  ReferenceDot,
  ReferenceLine
} from 'recharts';

const salesData = [
  { name: 'Aug 21', sales: 30, actualValue: 30000 },
  { name: 'Aug 22', sales: 35, actualValue: 35000 },
  { name: 'Aug 23', sales: 40, actualValue: 40000 },
  { name: 'Aug 24', sales: 32, actualValue: 32000 },
  { name: 'Aug 25', sales: 25, actualValue: 25000 },
  { name: 'Aug 26', sales: 45, actualValue: 25254, special: true, percentage: 2.5 }, // Peak point
  { name: 'Aug 27', sales: 38, actualValue: 38000 },
  { name: 'Aug 28', sales: 60, actualValue: 60000 },
  { name: 'Aug 29', sales: 105, actualValue: 105000 },
  { name: 'Aug 30', sales: 95, actualValue: 95000 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background p-3 shadow-lg rounded-md border border-border">
        <p className="label text-sm font-semibold text-foreground">{`${label}`}</p>
        <p className="intro text-xs text-primary">{`Sales: $${data.actualValue.toLocaleString()}`}</p>
        {data.special && (
          <p className="text-xs text-green-600">{`↑ ${data.percentage}%`}</p>
        )}
      </div>
    );
  }
  return null;
};

interface LineChartSectionProps {
  className?: string;
}

const LineChartSection: React.FC<LineChartSectionProps> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">Sales Overview</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">Track your sales performance over time.</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="sprint">
            <SelectTrigger className="w-[100px] h-8 text-xs">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sprint">Sprint</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="august">
            <SelectTrigger className="w-[100px] h-8 text-xs">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="august">August</SelectItem>
              <SelectItem value="july">July</SelectItem>
              <SelectItem value="june">June</SelectItem>
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
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={salesData} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7367F0" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#7367F0" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10}/>
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                tickFormatter={(value) => value > 0 ? `${value}`: ''}
                domain={[0, 'dataMax + 20']}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#7367F0', strokeWidth: 1, strokeDasharray: '3 3' }}/>
              <Area type="monotone" dataKey="sales" stroke="#7367F0" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              {salesData.map(entry => {
                if (entry.special) {
                  return (
                    <ReferenceDot 
                      key={`ref-dot-${entry.name}`} 
                      x={entry.name} 
                      y={entry.sales} 
                      r={5} 
                      fill="#7367F0" 
                      stroke="hsl(var(--card))" 
                      strokeWidth={2} 
                    />
                  );
                }
                return null;
              })}
              {/* This is an example of how you might add a vertical line, customize as needed */}
              {/* {salesData.find(d => d.special) && 
                <ReferenceLine x={salesData.find(d => d.special)?.name} strokeDasharray="3 3" stroke="hsl(var(--border))" />
              } */}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChartSection;
