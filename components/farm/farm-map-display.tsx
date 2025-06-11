"use client";

import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LatLngTuple, LatLngBounds } from "leaflet";
import { Droplet, Thermometer, Wind, Sun } from "lucide-react";

// Component to automatically fit map to the farm boundaries
function AutoFitBounds({ points }: { points: LatLngTuple[] }) {
  const map = useMap();

  React.useEffect(() => {
    if (points.length >= 3) {
      const bounds = new LatLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, points]);

  return null;
}

interface SensorLocation {
  id: string;
  position: LatLngTuple;
  type: "moisture" | "temperature" | "humidity" | "light";
  value: number;
  unit: string;
}

interface IrrigationZone {
  id: string;
  name: string;
  positions: LatLngTuple[];
  status: "active" | "inactive";
}

interface FarmMapDisplayProps {
  farmBoundary: LatLngTuple[];
  sensors: SensorLocation[];
  irrigationZones: IrrigationZone[];
}

export function FarmMapDisplay({
  farmBoundary,
  sensors,
  irrigationZones,
}: FarmMapDisplayProps) {
  // Default center - first point of farm boundary
  const defaultCenter: LatLngTuple = farmBoundary[0] || [20.5937, 78.9629]; // Default to center of India

  const getSensorIcon = (type: SensorLocation["type"]) => {
    switch (type) {
      case "moisture":
        return <Droplet className="h-4 w-4 text-blue-500" />;
      case "temperature":
        return <Thermometer className="h-4 w-4 text-red-500" />;
      case "humidity":
        return <Wind className="h-4 w-4 text-cyan-500" />;
      case "light":
        return <Sun className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <MapContainer
      center={defaultCenter}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Farm Boundary */}
      <Polygon
        positions={farmBoundary}
        pathOptions={{
          color: "#22c55e",
          fillColor: "#22c55e",
          fillOpacity: 0.1,
          weight: 2,
        }}
      >
        <Tooltip direction="center" permanent>
          <div className="text-xs font-medium">Farm Boundary</div>
        </Tooltip>
      </Polygon>

      {/* Irrigation Zones */}
      {irrigationZones.map((zone) => (
        <Polygon
          key={zone.id}
          positions={zone.positions}
          pathOptions={{
            color: zone.status === "active" ? "#3b82f6" : "#94a3b8",
            fillColor: zone.status === "active" ? "#3b82f6" : "#94a3b8",
            fillOpacity: 0.2,
            weight: 2,
          }}
        >
          <Tooltip direction="center">
            <div className="text-xs space-y-1">
              <div className="font-medium">{zone.name}</div>
              <div className="text-muted-foreground">Status: {zone.status}</div>
            </div>
          </Tooltip>
        </Polygon>
      ))}

      {/* Sensor Markers */}
      {sensors.map((sensor) => (
        <Marker key={sensor.id} position={sensor.position}>
          <Popup>
            <div className="text-xs space-y-1">
              <div className="font-medium flex items-center gap-1">
                {getSensorIcon(sensor.type)}
                {sensor.type.charAt(0).toUpperCase() +
                  sensor.type.slice(1)}{" "}
                Sensor
              </div>
              <div className="text-muted-foreground">
                Value: {sensor.value} {sensor.unit}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Auto-fit map to farm boundary */}
      <AutoFitBounds points={farmBoundary} />
    </MapContainer>
  );
}
