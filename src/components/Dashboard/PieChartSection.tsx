import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

const demographicData = [
  { name: 'Male', value: 58.08, color: '#7367F0' },     // Primary Purple
  { name: 'Female', value: 35.07, color: '#A8A0F4' },   // Lighter Primary Purple
  { name: 'Others', value: 6.05, color: '#D9D4FC' },    // Even Lighter Purple / Greyish
  { name: 'Prefer not to say', value: 0.80, color: '#E8E6F9' } // Very Light Purple / Almost White
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomPieTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background p-2 shadow-lg rounded-md border border-border">
        <p className="text-sm font-medium text-foreground">{`${data.name}: ${data.value.toFixed(2)}%`}</p>
      </div>
    );
  }
  return null;
};

interface PieChartSectionProps {
  className?: string;
}

const PieChartSection: React.FC<PieChartSectionProps> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Client Demographics</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">Distribution of clients by demographic groups.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 250 }} className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={demographicData}
                cx="50%"
                cy="50%"
                innerRadius={60} // This makes it a Donut chart
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={3}
                dataKey="value"
                labelLine={false}
                // label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                //   const RADIAN = Math.PI / 180;
                //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
                //   const y = cy + radius * Math.sin(-midAngle * RADIAN);
                //   return (
                //     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12px">
                //       {`${(percent * 100).toFixed(0)}%`}
                //     </text>
                //   );
                // }}
              >
                {demographicData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={'hsl(var(--card))'} strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center" 
                iconSize={10}
                wrapperStyle={{paddingTop: '20px'}}
                formatter={(value, entry) => (
                    <span className="text-xs text-muted-foreground ml-1">{value} ({(entry.payload as any)?.value.toFixed(2)}%)</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartSection;
