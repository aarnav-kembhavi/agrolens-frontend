"use client";

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  AlertTriangle, 
  Info, 
  Thermometer, 
  Droplets, 
  TrendingUp, 
  TrendingDown, 
  MinusCircle,
  Zap,
  BarChart2,
  Sparkles,
  Wind,
  Sun
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from '@/components/ui/label';
import { createSupabaseBrowser } from '@/lib/supabase/client';
import { SensorData } from '@/lib/types/sensor-types';
import { MetricSelector, availableMetrics } from '../correlation-tab-components/metric-selector';

interface CorrelationResult {
  metric1: keyof SensorData;
  metric2: keyof SensorData;
  correlation: number | null;
  dataPoints: number;
}

export function CorrelationsTab() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });
  const [timeRange, setTimeRange] = useState<[number, number]>([0, 23]);
  const [selectedMetrics, setSelectedMetrics] = useState<(keyof SensorData)[]>(['temperature', 'humidity']);
  
  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState<Error | null>(null);
  
  const [correlations, setCorrelations] = useState<CorrelationResult[]>([]);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<Error | null>(null);

  const supabase = createSupabaseBrowser();

  const fetchData = useCallback(async () => {
    if (!date?.from || !date?.to) return;
    setDataLoading(true);
    setDataError(null);
    setCorrelations([]);

    try {
      const fromDateTime = new Date(date.from);
      fromDateTime.setHours(timeRange[0], 0, 0, 0);

      const toDateTime = new Date(date.to);
      toDateTime.setHours(timeRange[1], 59, 59, 999);

      const { data, error } = await supabase
        .from('sensor_data')
        .select('*')
        .gte('created_at', fromDateTime.toISOString())
        .lte('created_at', toDateTime.toISOString())
        .order('created_at');

      if (error) throw error;
      setHistoricalData(data || []);
    } catch (e: any) {
      setDataError(e);
    } finally {
      setDataLoading(false);
    }
  }, [date, timeRange, supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const calculateCorrelations = useCallback((data: SensorData[], metrics: (keyof SensorData)[]) => {
    setAnalysisLoading(true);
    setAnalysisError(null);
    try {
      const results: CorrelationResult[] = [];
      for (let i = 0; i < metrics.length; i++) {
        for (let j = i + 1; j < metrics.length; j++) {
          const metric1 = metrics[i];
          const metric2 = metrics[j];

          const validPairs = data
            .map(d => ({ v1: d[metric1] as number, v2: d[metric2] as number }))
            .filter(p => p.v1 != null && !isNaN(p.v1) && p.v2 != null && !isNaN(p.v2));

          let correlation: number | null = null;
          if (validPairs.length > 1) {
            const x = validPairs.map(p => p.v1);
            const y = validPairs.map(p => p.v2);
            const n = validPairs.length;
            const sumX = x.reduce((a, b) => a + b, 0);
            const sumY = y.reduce((a, b) => a + b, 0);
            const sumXY = x.map((xi, idx) => xi * y[idx]).reduce((a, b) => a + b, 0);
            const sumX2 = x.map(xi => xi * xi).reduce((a, b) => a + b, 0);
            const sumY2 = y.map(yi => yi * yi).reduce((a, b) => a + b, 0);
            const numerator = n * sumXY - sumX * sumY;
            const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
            correlation = denominator === 0 ? null : numerator / denominator;
          }
          results.push({ metric1, metric2, correlation, dataPoints: validPairs.length });
        }
      }
      setCorrelations(results);
    } catch (e: any) {
      setAnalysisError(e);
    } finally {
      setAnalysisLoading(false);
    }
  }, []);

  const handleMetricSelectionChange = useCallback((metricKey: keyof SensorData, checked: boolean) => {
    setSelectedMetrics(prev => checked ? [...prev, metricKey] : prev.filter(key => key !== metricKey));
  }, []);

  const handleRunAnalysis = () => {
    if (historicalData.length > 0 && selectedMetrics.length >= 2) {
      calculateCorrelations(historicalData, selectedMetrics);
    }
  };

  const getMetricIcon = (metricKey: keyof SensorData | string): React.ReactNode => {
    switch (metricKey) {
      case 'temperature': return <Thermometer className="mr-2 h-5 w-5 text-orange-500" />;
      case 'humidity': return <Droplets className="mr-2 h-5 w-5 text-blue-500" />;
      case 'moisture': return <Wind className="mr-2 h-5 w-5 text-green-500" />;
      case 'light': return <Sun className="mr-2 h-5 w-5 text-yellow-500" />;
      default: return <Zap className="mr-2 h-5 w-5 text-gray-500" />;
    }
  };

  const getCorrelationPresentation = (value: number | null) => {
    if (value === null) return { text: 'N/A', colorClass: 'text-muted-foreground', bgColorClass: 'bg-gray-100 dark:bg-gray-700', icon: <MinusCircle className="h-5 w-5" />, strengthBadgeVariant: 'outline' as const };
    const absValue = Math.abs(value);
    let strengthText = absValue >= 0.7 ? 'Strong' : absValue >= 0.4 ? 'Moderate' : absValue >= 0.1 ? 'Weak' : 'Very Weak';
    if (value > 0) return { text: `${strengthText} Positive`, colorClass: 'text-green-600 dark:text-green-400', bgColorClass: 'bg-green-100 dark:bg-green-900', icon: <TrendingUp className="h-5 w-5" />, strengthBadgeVariant: 'default' as const };
    return { text: `${strengthText} Negative`, colorClass: 'text-red-600 dark:text-red-400', bgColorClass: 'bg-red-100 dark:bg-red-900', icon: <TrendingDown className="h-5 w-5" />, strengthBadgeVariant: 'destructive' as const };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Configure Correlation Analysis</CardTitle><CardDescription>Select the data period and the metrics you wish to correlate.</CardDescription></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="date-picker-trigger-corr">Date Range:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button id="date-picker-trigger-corr" variant={"outline"} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (date.to ? <>{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}</> : format(date.from, "LLL dd, y")) : <span>Pick a date range</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start"><Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} /></PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time-range-slider-corr">Time of Day: <span className="font-semibold text-primary">{String(timeRange[0]).padStart(2, '0')}:00 - {String(timeRange[1]).padStart(2, '0')}:59</span></Label>
                <Slider id="time-range-slider-corr" min={0} max={23} step={1} value={timeRange} onValueChange={(value) => setTimeRange(value as [number, number])} className="w-full pt-2" />
              </div>
              {dataLoading && <div className="pt-2 text-center text-muted-foreground">Loading data...</div>}
              {dataError && <Alert variant="destructive" className="mt-4"><AlertTriangle className="h-4 w-4" /><AlertTitle>Data Error</AlertTitle><AlertDescription>{dataError.message}</AlertDescription></Alert>}
            </div>
            <div className="space-y-2">
              <div><h3 className="text-md font-semibold">Select Metrics</h3><p className="text-sm text-muted-foreground">Choose at least two metrics.</p></div>
              <MetricSelector selectedMetrics={selectedMetrics} onSelectionChange={handleMetricSelectionChange} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleRunAnalysis} disabled={dataLoading || analysisLoading || selectedMetrics.length < 2 || historicalData.length === 0} className="w-full py-3 text-lg font-semibold">
        {analysisLoading ? <><Sparkles className="animate-spin h-5 w-5 mr-3" />Analyzing...</> : 'Run Correlation Analysis'}
      </Button>

      {analysisError && <Alert variant="destructive"><AlertTriangle className="h-4 w-4" /><AlertTitle>Analysis Error</AlertTitle><AlertDescription>{analysisError.message}</AlertDescription></Alert>}
      
      {correlations.length > 0 && !analysisLoading && (
        <Card>
          <CardHeader><CardTitle>Correlation Insights</CardTitle><CardDescription>Analysis of relationships between selected sensor metrics.</CardDescription></CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {correlations.map((result, index) => {
                const metric1Label = availableMetrics.find(m => m.key === result.metric1)?.label || result.metric1;
                const metric2Label = availableMetrics.find(m => m.key === result.metric2)?.label || result.metric2;
                const presentation = getCorrelationPresentation(result.correlation);
                return (
                  <div key={index} className={`p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border ${presentation.bgColorClass} border-opacity-30 flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center text-sm font-medium text-muted-foreground mb-2">{getMetricIcon(result.metric1)}<span>{metric1Label}</span></div>
                      <div className="text-center text-2xl font-bold text-muted-foreground my-2">vs.</div>
                      <div className="flex items-center text-sm font-medium text-muted-foreground mb-3">{getMetricIcon(result.metric2)}<span>{metric2Label}</span></div>
                    </div>
                    <div className="text-center mt-auto">
                      <div className={`text-3xl font-extrabold ${presentation.colorClass} mb-1 flex items-center justify-center`}>{presentation.icon}<span className="ml-2">{result.correlation !== null ? result.correlation.toFixed(3) : 'N/A'}</span></div>
                      <Badge variant={presentation.strengthBadgeVariant} className={`text-xs ${presentation.colorClass} border ${presentation.colorClass.replace('text-', 'border-')}/50`}>{presentation.text}</Badge>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center"><BarChart2 className="h-3 w-3 mr-1" /> {result.dataPoints} valid data points</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {correlations.length === 0 && !analysisLoading && !analysisError && selectedMetrics.length >= 2 && historicalData.length > 0 && (
         <Alert><Info className="h-4 w-4" /><AlertTitle>No Results Yet</AlertTitle><AlertDescription>Click &quot;Run Correlation Analysis&quot; to see results.</AlertDescription></Alert>
      )}
    </div>
  );
}