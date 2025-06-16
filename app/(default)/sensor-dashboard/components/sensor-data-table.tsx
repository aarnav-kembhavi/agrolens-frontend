"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area";
import { SensorData } from "@/lib/types/sensor-types";


interface SensorDataTableProps {
  sensorData: SensorData[];
}

export function SensorDataTable({ sensorData }: SensorDataTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Raw Data</CardTitle>
        <CardDescription>Latest health measurements</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Temperature (°C)</TableHead>
                <TableHead>Humidity (%)</TableHead>
                <TableHead>Soil Moisture (%)</TableHead>
                <TableHead>Light (lux)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sensorData.slice(-20).reverse().map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{new Date(data.created_at).toLocaleString()}</TableCell>
                  <TableCell>{data.temperature?.toFixed(2) ?? 'N/A'}</TableCell>
                  <TableCell>{data.humidity?.toFixed(2) ?? 'N/A'}</TableCell>
                  <TableCell>{data.moisture?.toFixed(2) ?? 'N/A'}</TableCell>
                  <TableCell>{data.light?.toFixed(2) ?? 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
