"use client";

import { SensorStatsCards } from "../real-time-tab-components/realtime-stats-cards";
import { SensorChart } from "../charts";
import { SensorDataTable } from "../sensor-data-table";
import { SensorData } from "@/lib/types/sensor-types";


interface RealtimeViewTabProps {
  sensorData: SensorData[];
  isStreaming: boolean;
  chartType: 'area' | 'line';
}

export function RealtimeViewTab({ sensorData, isStreaming, chartType }: RealtimeViewTabProps) {
  return (
    <div className="space-y-4">
      <SensorStatsCards sensorData={sensorData} isStreaming={isStreaming} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SensorChart data={sensorData} dataKey="temperature" title="Temperature" unit="°C" chartType={chartType} />
        <SensorChart data={sensorData} dataKey="humidity" title="Humidity" unit="%" chartType={chartType} />
        <SensorChart data={sensorData} dataKey="moisture" title="Soil Moisture" unit="%" chartType={chartType} />
        <SensorChart data={sensorData} dataKey="light" title="Light" unit="lux" chartType={chartType} />
      </div>
      <SensorDataTable sensorData={sensorData} />
    </div>
  );
}
