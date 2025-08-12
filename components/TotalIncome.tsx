'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { type ChartConfig } from '@/components/ui/chart';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

const TotalIncome = () => {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart data={chartData}>
        <defs>
          <linearGradient id="desktopGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity={1} />
            <stop offset="100%" stopColor="#fff" stopOpacity={0.8} />
          </linearGradient>
          <linearGradient id="mobileGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity={1} />
            <stop offset="100%" stopColor="#fff" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <Bar dataKey="desktop" fill="url(#desktopGradient)" radius={4} />
        <Bar dataKey="mobile" fill="url(#mobileGradient)" radius={4} />
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  );
};

export default TotalIncome;
