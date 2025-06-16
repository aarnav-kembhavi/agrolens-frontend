"use client";

import * as React from "react";
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon, Thermometer, Droplets, Sun, Wind } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SensorChart } from '../charts';
import { HistoricalStatCard } from '../historical-tab-components/historical-stat-card';
import { useHistoricalSensorData } from '../../hooks/use-historical-sensor-data';
import { SensorData } from '@/lib/types/sensor-types';

const calculateMetricStats = (data: SensorData[], key: keyof SensorData) => {
  const values = data.map(item => item[key] as number).filter(val => val != null && !isNaN(val));
  if (values.length === 0) return { avg: 0, min: 0, max: 0, count: 0 };
  const sum = values.reduce((acc, val) => acc + val, 0);
  return {
    avg: sum / values.length,
    min: Math.min(...values),
    max: Math.max(...values),
    count: values.length,
  };
};

export function HistoricalDataTab() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const { data: historicalData, isLoading, error, refetch } = useHistoricalSensorData(date);

  const tempStats = calculateMetricStats(historicalData, 'temperature');
  const humidityStats = calculateMetricStats(historicalData, 'humidity');
  const moistureStats = calculateMetricStats(historicalData, 'moisture');
  const lightStats = calculateMetricStats(historicalData, 'light');

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Historical Data Explorer</CardTitle>
          <CardDescription>Select a date range to analyze past sensor readings.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button onClick={refetch} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Analyze'}
          </Button>
        </CardContent>
      </Card>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <HistoricalStatCard title="Temperature" stats={tempStats} unit="°C" icon={<Thermometer className="h-4 w-4 text-muted-foreground" />} />
        <HistoricalStatCard title="Humidity" stats={humidityStats} unit="%" icon={<Droplets className="h-4 w-4 text-muted-foreground" />} />
        <HistoricalStatCard title="Soil Moisture" stats={moistureStats} unit="%" icon={<Wind className="h-4 w-4 text-muted-foreground" />} />
        <HistoricalStatCard title="Light" stats={lightStats} unit="lux" icon={<Sun className="h-4 w-4 text-muted-foreground" />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SensorChart data={historicalData} dataKey="temperature" title="Temperature Over Time" unit="°C" chartType="line" />
        <SensorChart data={historicalData} dataKey="humidity" title="Humidity Over Time" unit="%" chartType="line" />
        <SensorChart data={historicalData} dataKey="moisture" title="Soil Moisture Over Time" unit="%" chartType="line" />
        <SensorChart data={historicalData} dataKey="light" title="Light Intensity Over Time" unit="lux" chartType="line" />
      </div>
    </div>
  );
}