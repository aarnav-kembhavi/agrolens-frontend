"use client";

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Droplets, CloudRain, Thermometer, Fan, Monitor } from 'lucide-react';
import Image from 'next/image';

const hardwareComponents = [
  {
    id: 'light-sensor',
    category: 'Sensors',
    name: 'Digital Light Sensor',
    pin: 24,
    description: 'Measures ambient light levels, providing output as a percentage (0-100%). Used for automatic light control and monitoring.',
    icon: <Lightbulb className="h-6 w-6" />,
    colorTheme: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    imagePath: '/images/sensors/digital-light-sensor.jpg',
  },
  {
    id: 'moisture-sensor',
    category: 'Sensors',
    name: 'Soil Moisture Sensor',
    pin: 50,
    description: 'Measures soil moisture content, providing a binary state (Dry/Wet). Used for automatic watering control.',
    icon: <Droplets className="h-6 w-6" />,
    colorTheme: 'bg-gradient-to-br from-blue-400 to-cyan-500',
    imagePath: '/images/sensors/soil-moisture-sensor.jpg',
  },
  {
    id: 'rain-sensor',
    category: 'Sensors',
    name: 'Rain Sensor',
    pin: 25,
    description: 'Detects the presence of rain, providing a boolean output. Used for preventing overwatering during rain.',
    icon: <CloudRain className="h-6 w-6" />,
    colorTheme: 'bg-gradient-to-br from-gray-400 to-blue-gray-500',
    imagePath: '/images/sensors/rain-sensor.jpg',
  },
  {
    id: 'dht22',
    category: 'Sensors',
    name: 'DHT22 Temp & Humidity',
    pin: 22,
    description: 'Measures ambient temperature (-40°C to 80°C) and humidity (0-100%). Used for environmental monitoring and fan control.',
    icon: <Thermometer className="h-6 w-6" />,
    colorTheme: 'bg-gradient-to-br from-red-400 to-pink-500',
    imagePath: '/images/sensors/dht22.jpg',
  },
  {
    id: 'grow-light',
    category: 'Actuators',
    name: 'LED Grow Light System',
    pin: 26,
    description: 'A 24-LED WS2812 RGB strip with multiple color modes (Grow, Bloom, Seedling, Night) and automatic brightness control.',
    icon: <Lightbulb className="h-6 w-6" />,
    colorTheme: 'bg-gradient-to-br from-purple-400 to-indigo-500',
    imagePath: '/images/sensors/ws2812-led-strip.jpg',
  },
  {
    id: 'water-pump',
    category: 'Actuators',
    name: 'Water Pump',
    pin: 30,
    description: 'A relay-controlled water pump with a 10-second safety timeout, debounce protection, and auto/manual modes.',
    icon: <Lightbulb className="h-6 w-6" />,
    colorTheme: 'bg-gradient-to-br from-teal-400 to-green-500',
    imagePath: '/images/sensors/water-pump.jpg',
  },
  {
    id: 'fan-system',
    category: 'Actuators',
    name: 'Fan System',
    pin: 31,
    description: 'A relay-controlled fan with temperature-based control, multiple operation modes, and automatic humidity control.',
    icon: <Fan className="h-6 w-6" />,
    colorTheme: 'bg-gradient-to-br from-sky-400 to-light-blue-500',
    imagePath: '/images/sensors/fan-system.jpg',
  },
  {
    id: 'display-system',
    category: 'Display',
    name: 'MCUFRIEND TFT Display',
    description: 'A TFT display with touch capabilities for real-time sensor readings, system control buttons, and status indicators.',
    icon: <Monitor className="h-6 w-6" />,
    colorTheme: 'bg-gradient-to-br from-indigo-400 to-blue-500',
    imagePath: '/images/sensors/mcufriend-tft.jpg',
  },
];

const HardwareCard = ({ component }: { component: typeof hardwareComponents[0] }) => (
  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 flex flex-col">
    <div className={`p-4 ${component.colorTheme} text-white flex items-center justify-between`}>
      <div className="flex items-center space-x-3">
        {component.icon}
        <CardTitle className="text-lg font-bold">{component.name}</CardTitle>
      </div>
      <Badge variant="secondary">{component.category}</Badge>
    </div>
    <CardContent className="p-4 flex-grow">
      <div className="relative h-40 w-full mb-4 rounded-md overflow-hidden">
        <Image src={component.imagePath} alt={component.name} layout="fill" objectFit="cover" />
      </div>
      <CardDescription>{component.description}</CardDescription>
    </CardContent>
    {component.pin && (
      <CardFooter className="bg-gray-50 dark:bg-gray-800 p-3">
        <p className="text-xs text-muted-foreground font-semibold">Pin: {component.pin}</p>
      </CardFooter>
    )}
  </Card>
);

export function HardwareInfoTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Hardware Components</h2>
        <p className="text-muted-foreground">
          An overview of the sensors and actuators in the Agrolens system.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hardwareComponents.map((component) => (
          <HardwareCard key={component.id} component={component} />
        ))}
      </div>
    </div>
  );
}