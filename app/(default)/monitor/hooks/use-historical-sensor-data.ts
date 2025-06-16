"use client";

import { useState, useEffect, useCallback } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase/client';
import { SensorData } from '@/lib/types/sensor-types';
import { DateRange } from 'react-day-picker';

export function useHistoricalSensorData(dateRange: DateRange | undefined) {
  const [data, setData] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createSupabaseBrowser();

  const fetchData = useCallback(async () => {
    if (!dateRange?.from || !dateRange?.to) {
      setData([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Add a day to the 'to' date to make the range inclusive
      const toDate = new Date(dateRange.to);
      toDate.setDate(toDate.getDate() + 1);

      const { data: sensorData, error: dbError } = await supabase
        .from('sensor_data')
        .select('*')
        .gte('created_at', dateRange.from.toISOString())
        .lt('created_at', toDate.toISOString()) // Use 'lt' with the adjusted 'to' date
        .order('created_at', { ascending: true });

      if (dbError) {
        throw dbError;
      }

      setData(sensorData || []);
    } catch (e: any) {
      setError(e.message);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
