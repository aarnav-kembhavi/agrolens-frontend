"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import SensorDashboardPage from "../sensor-dashboard/page";
import FarmingAssistantPage from "../farming-assistant/page";

export default function VoiceAssistantPage() {
  return (
    <div className="container mx-auto px-4 py-4 space-y-4">
      <PageHeader title="Farming Assistant" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sensor Dashboard */}
        <div>
          <SensorDashboardPage />
        </div>
        {/* Farming Assistant Chat */}
        <div>
          <FarmingAssistantPage />
        </div>
      </div>
    </div>
  );
}
