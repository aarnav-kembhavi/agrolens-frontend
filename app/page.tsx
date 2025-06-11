"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Droplet, MapPin, Bot } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 dark:from-green-900/30 dark:to-green-950/30 flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full text-center space-y-6 mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img
            src="/logos/logo.png"
            alt="AgroLens Logo"
            className="h-10 w-10 mr-2 rounded-full"
          />
          <span className="text-2xl font-bold text-green-700 dark:text-green-300 tracking-tight">
            AgroLens
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 dark:text-green-100 mb-2">
          Your AI-Powered{" "}
          <span className="text-green-600 dark:text-green-400">
            Sustainable Farming
          </span>{" "}
          Assistant
        </h1>
        <p className="text-lg text-muted-foreground">
          Smart, real-time insights for water-saving irrigation, soil health,
          early disease detection, and more—no expensive hardware required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Plant Health Classifier */}
        <Link href="/plant-health" className="group">
          <Card className="hover:shadow-lg transition border-green-400/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 group-hover:text-green-900">
                <Leaf className="h-6 w-6 text-green-500 group-hover:scale-110 transition" />
                Plant Health Classifier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Upload a plant leaf photo for instant AI-powered disease
                detection and remedy suggestions.
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Sensor Dashboard */}
        <Link href="/sensor-dashboard" className="group">
          <Card className="hover:shadow-lg transition border-blue-400/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 group-hover:text-blue-900">
                <Droplet className="h-6 w-6 text-blue-500 group-hover:scale-110 transition" />
                Sensor Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View real-time (simulated) soil moisture, pH, temperature, and
                more for your fields.
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Farm Map */}
        <Link href="/farm-map" className="group">
          <Card className="hover:shadow-lg transition border-emerald-400/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-700 group-hover:text-emerald-900">
                <MapPin className="h-6 w-6 text-emerald-500 group-hover:scale-110 transition" />
                Farm Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Visualize your farm, irrigation zones, and sensor locations on
                an interactive map.
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Farming Assistant */}
        <Link href="/farming-assistant" className="group">
          <Card className="hover:shadow-lg transition border-lime-400/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lime-700 group-hover:text-lime-900">
                <Bot className="h-6 w-6 text-lime-500 group-hover:scale-110 transition" />
                AI Chat Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ask questions about watering, soil, pests, and get simple,
                actionable advice in your language.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  );
}
