"use client";

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HistoricalStatCardProps {
  title: string;
  avg: number;
  min: number;
  max: number;
  unit: string;
  icon: React.ReactElement;
}

export function HistoricalSensorStatCard({ title, avg, min, max, unit, icon }: HistoricalStatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{avg.toFixed(2)} {unit}</div>
        <p className="text-xs text-muted-foreground">
          Min: {min.toFixed(2)} {unit}, Max: {max.toFixed(2)} {unit}
        </p>
      </CardContent>
    </Card>
  );
}
