import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { SensorData } from '@/lib/types/sensor-types';

interface SensorChartProps {
  data: SensorData[];
  dataKey: keyof SensorData;
  title: string;
  unit: string;
  chartType: 'area' | 'line';
}

const baseChartConfig = {
  temperature: { label: "Temperature", color: "hsl(150, 70%, 60%)" },
  humidity: { label: "Humidity", color: "hsl(20, 80%, 65%)" },
  moisture: { label: "Soil Moisture", color: "hsl(210, 80%, 65%)" },
  light_intensity: { label: "Light Intensity", color: "hsl(50, 80%, 65%)" },
} satisfies ChartConfig;

export function SensorChart({ data, dataKey, title, unit, chartType }: SensorChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: title,
      color: baseChartConfig[dataKey as keyof typeof baseChartConfig]?.color || "hsl(var(--chart-1))", // Use specific color or fallback
    },
  } satisfies ChartConfig;

  const chartData = data.map(item => ({
    time: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    value: item[dataKey] as number,
  }));

  const formatTooltipDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  

  const commonDataComponentProps = {
    type: "monotone" as const,
    dataKey: dataKey,
    stroke: chartConfig[dataKey].color,
    fillOpacity: 0.3,
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardDescription>Real-time {title.toLowerCase()} measurements {unit ? `(${unit})` : ''}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}${unit}`}
                  domain={['dataMin - 1', 'dataMax + 1']}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent 
                    indicator="dot"
                    labelFormatter={formatTooltipDate} 
                    formatter={(value, name, props) => [`${Number(value).toFixed(2)} ${unit}`, title]}
                  />}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartConfig[dataKey].color}
                  fillOpacity={0.3}
                  fill={chartConfig[dataKey].color}
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            ) : (
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}${unit}`}
                  domain={['dataMin - 1', 'dataMax + 1']}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent 
                    indicator="line"
                    labelFormatter={formatTooltipDate}
                    formatter={(value, name, props) => [`${Number(value).toFixed(2)} ${unit}`, title]}
                  />}
                />
                <Line type="monotone" dataKey="value" stroke={chartConfig[dataKey].color} strokeWidth={2} dot={false} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}