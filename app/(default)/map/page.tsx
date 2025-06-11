"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Map as MapIcon,
  Cloud,
  AlertTriangle,
  Wind,
  Droplet,
  Globe2,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

const mockWeather = {
  city: "Mumbai",
  temp: 32,
  condition: "Clear sky",
  humidity: 70,
  wind: "12 km/h SE",
  icon: "01d",
};

const mockForecast = [
  { day: "Mon", temp: 33, icon: "01d", rainfall: 10, humidity: 65 },
  { day: "Tue", temp: 31, icon: "02d", rainfall: 15, humidity: 70 },
  { day: "Wed", temp: 29, icon: "10d", rainfall: 20, humidity: 75 },
  { day: "Thu", temp: 30, icon: "03d", rainfall: 5, humidity: 60 },
  { day: "Fri", temp: 32, icon: "01d", rainfall: 0, humidity: 55 },
];

const mockAir = {
  aqi: 2,
  pm25: 12,
  pm10: 20,
  o3: 30,
  co: 0.4,
};

const mockAlerts = [
  {
    event: "Heat Wave",
    description: "High temperatures expected. Stay hydrated.",
  },
];

const mockGeo = [
  { name: "Mumbai", country: "IN", lat: 19.076, lon: 72.8777 },
  { name: "Mumbai Suburban", country: "IN", lat: 19.21, lon: 72.84 },
];

export default function MapPage() {
  const [search, setSearch] = useState("");
  const [geoResults, setGeoResults] = useState(mockGeo);
  const [selectedLocation, setSelectedLocation] = useState(mockGeo[0]);
  const [selectedTab, setSelectedTab] = useState("current");

  // In real integration, use OpenWeather API for geocoding and weather data

  return (
    <div className="container mx-auto px-4 py-4 space-y-4">
      <PageHeader title="Weather Map" />
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background shadow-sm overflow-hidden">
        <CardContent className="p-0 flex flex-col md:flex-row h-[calc(100vh-12rem)]">
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="flex w-full"
          >
            {/* --- Sidebar --- */}
            <aside className="w-full md:w-1/3 border-r bg-background/50 p-4 flex flex-col">
              <h2 className="text-base font-semibold mb-3">Controls</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Search City/Location
                  </h3>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter city or location"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="h-9"
                    />
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* Geocoding results (mock) */}
                  {search && (
                    <div className="mt-2 border rounded bg-muted/30">
                      {geoResults.map((loc, i) => (
                        <div
                          key={i}
                          className={`px-3 py-2 cursor-pointer hover:bg-primary/10 ${selectedLocation?.name === loc.name ? "bg-primary/10" : ""}`}
                          onClick={() => setSelectedLocation(loc)}
                        >
                          {loc.name}, {loc.country} ({loc.lat}, {loc.lon})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Separator />
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="current">Current</TabsTrigger>
                  <TabsTrigger value="forecast">Forecast</TabsTrigger>
                  <TabsTrigger value="maps">Maps</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  <TabsTrigger value="air">Air Quality</TabsTrigger>
                  <TabsTrigger value="geo">Geocoding</TabsTrigger>
                </TabsList>
              </div>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-grow p-4">
              {/* Current Weather */}
              <TabsContent value="current">
                <div className="flex flex-col items-center gap-4">
                  <Cloud className="h-10 w-10 text-blue-400" />
                  <h3 className="text-xl font-semibold">
                    Current Weather in {selectedLocation.name}
                  </h3>
                  <div className="text-4xl font-bold">
                    {mockWeather.temp}&deg;C
                  </div>
                  <div className="text-lg">{mockWeather.condition}</div>
                  <div className="text-sm text-muted-foreground">
                    Humidity: {mockWeather.humidity}% | Wind: {mockWeather.wind}
                  </div>
                  {/* Rainfall and Humidity Box */}
                  <div className="mt-4 w-full max-w-xs">
                    <div className="rounded-lg border bg-white/80 shadow p-4 flex flex-col items-center">
                      <div className="text-base font-semibold mb-2">
                        Rainfall & Humidity
                      </div>
                      <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col items-center flex-1">
                          <span className="text-sm text-muted-foreground">
                            Rainfall
                          </span>
                          <span className="text-2xl font-bold text-blue-600">
                            10%
                          </span>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                          <span className="text-sm text-muted-foreground">
                            Humidity
                          </span>
                          <span className="text-2xl font-bold text-green-600">
                            {mockWeather.humidity}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              {/* Forecast */}
              <TabsContent value="forecast">
                <div className="flex flex-col items-center gap-4">
                  <Wind className="h-10 w-10 text-cyan-400" />
                  <h3 className="text-xl font-semibold">
                    5-Day Forecast for {selectedLocation.name}
                  </h3>
                  <div className="flex gap-4 mt-2">
                    {mockForecast.map((f, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center bg-white/80 border rounded-lg p-3 min-w-[110px] shadow"
                      >
                        <span className="text-lg font-bold">{f.day}</span>
                        <span className="text-2xl">{f.temp}&deg;C</span>
                        <Cloud className="h-6 w-6 text-blue-400" />
                        <div className="mt-2 text-xs text-muted-foreground">
                          Rainfall
                        </div>
                        <div className="text-base font-semibold text-blue-600">
                          {f.rainfall}%
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Humidity
                        </div>
                        <div className="text-base font-semibold text-green-600">
                          {f.humidity}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              {/* Weather Maps */}
              <TabsContent value="maps">
                <div className="flex flex-col items-center gap-4">
                  <MapIcon className="h-10 w-10 text-green-400" />
                  <h3 className="text-xl font-semibold">Weather Maps</h3>
                  <img
                    src="https://tile.openweathermap.org/map/precipitation_new/5/15/10.png?appid=demo"
                    alt="Weather Map"
                    className="rounded border"
                  />
                  <div className="text-sm text-muted-foreground">
                    Sample OpenWeatherMap tile (replace with real map
                    integration)
                  </div>
                </div>
              </TabsContent>
              {/* Weather Alerts */}
              <TabsContent value="alerts">
                <div className="flex flex-col items-center gap-4">
                  <AlertTriangle className="h-10 w-10 text-red-400" />
                  <h3 className="text-xl font-semibold">Weather Alerts</h3>
                  {mockAlerts.length > 0 ? (
                    <ul className="space-y-2">
                      {mockAlerts.map((alert, i) => (
                        <li
                          key={i}
                          className="bg-red-100 text-red-800 rounded p-2"
                        >
                          <strong>{alert.event}</strong>: {alert.description}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-muted-foreground">
                      No active alerts.
                    </div>
                  )}
                </div>
              </TabsContent>
              {/* Air Pollution */}
              <TabsContent value="air">
                <div className="flex flex-col items-center gap-4">
                  <Droplet className="h-10 w-10 text-emerald-400" />
                  <h3 className="text-xl font-semibold">
                    Air Quality in {selectedLocation.name}
                  </h3>
                  <div className="text-lg">AQI: {mockAir.aqi} (Good)</div>
                  <div className="text-sm text-muted-foreground">
                    PM2.5: {mockAir.pm25} | PM10: {mockAir.pm10} | O3:{" "}
                    {mockAir.o3} | CO: {mockAir.co}
                  </div>
                </div>
              </TabsContent>
              {/* Geocoding */}
              <TabsContent value="geo">
                <div className="flex flex-col items-center gap-4">
                  <Globe2 className="h-10 w-10 text-orange-400" />
                  <h3 className="text-xl font-semibold">Geocoding Results</h3>
                  <ul className="space-y-2">
                    {geoResults.map((loc, i) => (
                      <li
                        key={i}
                        className="bg-orange-100 text-orange-800 rounded p-2"
                      >
                        {loc.name}, {loc.country} (Lat: {loc.lat}, Lon:{" "}
                        {loc.lon})
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </main>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
