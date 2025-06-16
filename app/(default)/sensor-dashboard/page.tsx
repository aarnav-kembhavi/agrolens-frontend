"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Droplet, Thermometer, Wind, Sun, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Sensor data interface matching backend response
interface SensorData {
  id: number;
  temperature: number;
  humidity: number;
  moisture: number;
  lastUpdated: string; // Added for frontend display
}

export default function SensorDashboardPage() {
  const [sensorData, setSensorData] = useState<SensorData>({
    id: 0,
    moisture: 0,
    temperature: 0,
    humidity: 0,
    lastUpdated: "",
  });

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/sensor-data");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSensorData({
          id: data[0].id,
          moisture: data[0].moisture,
          temperature: data[0].temperature,
          humidity: data[0].humidity,
          lastUpdated: data[0].created_at,
        });
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData(); // Initial fetch

    const interval = setInterval(fetchSensorData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (
    value: number,
    type: "moisture" | "temperature" | "humidity"
  ) => {
    switch (type) {
      case "moisture":
        return value < 30
          ? "text-red-500"
          : value < 50
            ? "text-yellow-500"
            : "text-green-500";
      case "temperature":
        return value < 15 || value > 35
          ? "text-red-500"
          : value < 20 || value > 30
            ? "text-yellow-500"
            : "text-green-500";
      case "humidity":
        return value < 40 || value > 90
          ? "text-red-500"
          : value < 50 || value > 80
            ? "text-yellow-500"
            : "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 space-y-4">
      <PageHeader title="Sensor Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Soil Moisture Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-blue-500" />
              Soil Moisture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span
                  className={`text-2xl font-bold ${getStatusColor(
                    sensorData.moisture,
                    "moisture"
                  )}`}
                >
                  {sensorData.moisture.toFixed(1)}%
                </span>
                <span className="text-sm text-muted-foreground">
                  {sensorData.lastUpdated}
                </span>
              </div>
              <Progress value={sensorData.moisture} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Soil pH Card */}
        

        {/* Temperature Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-red-500" />
              Temperature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span
                  className={`text-2xl font-bold ${getStatusColor(
                    sensorData.temperature,
                    "temperature"
                  )}`}
                >
                  {sensorData.temperature.toFixed(1)}°C
                </span>
                <span className="text-sm text-muted-foreground">
                  {sensorData.lastUpdated}
                </span>
              </div>
              <Progress
                value={(sensorData.temperature / 50) * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Humidity Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-cyan-500" />
              Humidity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span
                  className={`text-2xl font-bold ${getStatusColor(
                    sensorData.humidity,
                    "humidity"
                  )}`}
                >
                  {sensorData.humidity.toFixed(1)}%
                </span>
                <span className="text-sm text-muted-foreground">
                  {sensorData.lastUpdated}
                </span>
              </div>
              <Progress value={sensorData.humidity} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
