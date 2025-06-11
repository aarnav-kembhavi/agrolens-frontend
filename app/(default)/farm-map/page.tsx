"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Droplet, Thermometer, Wind, Sun } from "lucide-react";
import type { LatLngTuple } from "leaflet";

// Dynamically import the map component to prevent SSR issues
const DynamicFarmMapDisplay = dynamic(
  () =>
    import("@/components/farm/farm-map-display").then(
      (mod) => mod.FarmMapDisplay
    ),
  {
    loading: () => (
      <div className="h-[600px] flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-green-500/30 animate-pulse" />
          <p className="text-xs">Loading map...</p>
        </div>
      </div>
    ),
    ssr: false,
  }
);

// Mock data for demonstration
const mockFarmBoundary: LatLngTuple[] = [
  [20.5937, 78.9629],
  [20.5937, 78.9729],
  [20.6037, 78.9729],
  [20.6037, 78.9629],
];

const mockSensors = [
  {
    id: "sensor-1",
    position: [20.5987, 78.9679] as LatLngTuple,
    type: "moisture" as const,
    value: 65,
    unit: "%",
  },
  {
    id: "sensor-2",
    position: [20.6017, 78.9659] as LatLngTuple,
    type: "temperature" as const,
    value: 24,
    unit: "°C",
  },
  {
    id: "sensor-3",
    position: [20.5967, 78.9699] as LatLngTuple,
    type: "humidity" as const,
    value: 75,
    unit: "%",
  },
  {
    id: "sensor-4",
    position: [20.5997, 78.9649] as LatLngTuple,
    type: "light" as const,
    value: 85000,
    unit: "lux",
  },
];

const mockIrrigationZones = [
  {
    id: "zone-1",
    name: "North Field",
    positions: [
      [20.5937, 78.9629],
      [20.5937, 78.9679],
      [20.5987, 78.9679],
      [20.5987, 78.9629],
    ] as LatLngTuple[],
    status: "active" as const,
  },
  {
    id: "zone-2",
    name: "South Field",
    positions: [
      [20.5987, 78.9629],
      [20.5987, 78.9679],
      [20.6037, 78.9679],
      [20.6037, 78.9629],
    ] as LatLngTuple[],
    status: "inactive" as const,
  },
];

export default function FarmMapPage() {
  const [selectedTab, setSelectedTab] = useState<string>("overview");

  return (
    <div className="container mx-auto px-4 py-4 space-y-4">
      <PageHeader title="Farm Map" />

      <Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 via-background to-background shadow-sm overflow-hidden">
        <CardHeader className="border-b border-green-500/10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium text-green-800 dark:text-green-300">
              Farm Overview
            </CardTitle>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
                <TabsTrigger value="sensors">Sensors</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="h-[600px] w-full">
            <DynamicFarmMapDisplay
              farmBoundary={mockFarmBoundary}
              sensors={mockSensors}
              irrigationZones={mockIrrigationZones}
            />
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Droplet className="h-4 w-4 text-blue-500" />
              Moisture Sensors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Monitor soil moisture levels across your farm
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-red-500" />
              Temperature Sensors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Track ambient temperature in different zones
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Wind className="h-4 w-4 text-cyan-500" />
              Humidity Sensors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Monitor humidity levels for optimal growth
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              Light Sensors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Measure light intensity across your farm
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
