# AgroLens [Smart Agriculture Hackathon Project]

## Problem Statement

Farmers often rely on manual observation or fragmented data sources to monitor crop health and decide irrigation schedules. This process is inefficient, prone to human error, and can lead to delayed detection of plant diseases or poor water management, reducing overall yield and profitability.

## Solution Overview

AgroLens is an IoT-based smart agriculture platform that provides real-time farm monitoring and actionable insights. It integrates sensor data, weather forecasts, and AI-powered plant disease detection into a unified dashboard for precision farming.

![AgroLens Dashboard](public/images/light/agrolens-dashboard.png)

## Key Features

### 1. Field Monitoring Interface
- Monitor multiple farm plots with real-time soil moisture, temperature, and humidity data
- Interactive interface to view sensor nodes and historical trends
- Weather integration for forecast-based planning

### 2. Crop Health Analysis
- **Disease Detection**: AI-powered plant infection identification from leaf images
- **Growth Monitoring**: Track crop conditions over time with visual analytics
- **Pest Alerts**: Early notifications based on sensor and weather correlation

![Disease Detection](public/images/light/agrolens-disease.png)
![Weather Overlay](public/images/light/agrolens-weather.png)

### 3. Additional Features
- **Irrigation Optimization**: Suggests watering schedules based on soil data and weather predictions
- **Data-Driven Recommendations**: Fertilizer and treatment suggestions for improving yield
- **Offline Support**: Local storage for areas with limited internet connectivity
- **Mobile-First Design**: Accessible to farmers via smartphone

![Irrigation Plan](public/images/light/agrolens-irrigation.png)
![Mobile View](public/images/light/agrolens-mobile.png)

## Tech Stack

- **Hardware**: NodeMCU, DHT11 (temperature/humidity), capacitive soil moisture sensors
- **Backend**: Supabase (database), MQTT (sensor data ingestion)
- **Frontend**: NextJS, TypeScript, TailwindCSS, Shadcn UI
- **AI Models**: Cloud-based plant disease detection API
- **Deployment**: Vercel (frontend), Supabase (backend), MQTT broker on cloud

## Setup Instructions

### Hardware Setup
1. Assemble sensor nodes with NodeMCU boards  
2. Connect DHT11 and soil moisture sensors to NodeMCU pins  
3. Flash firmware with MQTT connection details and Supabase API endpoint  

### Frontend Setup
1. Clone the repository
```bash
git clone https://github.com/YourUsername/agrolens-app
cd agrolens-app
```
2. Install dependencies
```bash
npm install
```
3. Create a `.env.local` file with:
```bash
NEXT_PUBLIC_API_URL=https://your-supabase-project-url
NEXT_PUBLIC_SUPABASE_KEY=your_key_here
```
4. Run the development server
```bash
npm run dev
```
Access the application at `http://localhost:3000`
