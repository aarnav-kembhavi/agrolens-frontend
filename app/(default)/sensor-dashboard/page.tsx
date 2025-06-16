'use client'

import { useState, useEffect } from 'react'
import { createSupabaseBrowser } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MonitorHeader } from './components/monitor-header';
import { MonitorTabs } from './components/monitor-tabs';
import { SensorData } from '@/lib/types/sensor-types'; 

export default function SensorMonitor() {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [chartType, setChartType] = useState<'area' | 'line'>('area');
  const supabase = createSupabaseBrowser();

  const startStreaming = () => {
    if (!isStreaming) {
      setIsStreaming(true);
      fetchInitialData();
    }
  };

  const stopStreaming = () => {
    if (isStreaming) {
      setIsStreaming(false);
    }
  };

  const fetchInitialData = async () => {
    const { data, error } = await supabase
      .from('sensor_data')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    setSensorData(data.reverse() as SensorData[]);
  };

  useEffect(() => {
    const channel = supabase
      .channel('sensor_data')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'sensor_data',
        },
        (payload) => {
          if (isStreaming) {
            setSensorData(prevData => {
              const newData = [...prevData, payload.new as SensorData];
              return newData.slice(-100); // Keep only last 100 records
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, isStreaming]);

  return (
    <div className="flex flex-col h-full p-0 bg-background container mx-auto">
      <MonitorHeader 
        title="Sensor Dashboard"
        isStreaming={isStreaming}
        startStreaming={startStreaming}
        stopStreaming={stopStreaming}
        chartType={chartType}
        setChartType={setChartType}
      />
      <div className="p-4">
        <MonitorTabs 
          sensorData={sensorData} 
          isStreaming={isStreaming} 
          chartType={chartType} 
        />
      </div>
    </div>
  )
}