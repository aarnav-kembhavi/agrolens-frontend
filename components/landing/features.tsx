"use client"

import { motion } from "framer-motion"
import { Leaf, Droplet, MapPin, Bot, ShieldCheck, TrendingUp, Sprout, Thermometer, Sun } from "lucide-react"
import SectionBadge from "@/components/ui/section-badge"
import { cn } from "@/lib/utils"

const features = [
  {
    title: "AI Disease Detection",
    info: "Instantly identify crop diseases from a single photo and get actionable remedy advice.",
    icon: ShieldCheck,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Real-Time Sensor Monitoring",
    info: "Track key metrics like soil moisture, temperature, and humidity with live data from your sensors.",
    icon: Thermometer,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Smart Irrigation Insights",
    info: "Optimize water usage with AI-powered recommendations based on sensor data and weather forecasts.",
    icon: Droplet,
    gradient: "from-sky-500 to-indigo-500",
  },
  {
    title: "Interactive Farm Mapping",
    info: "Visualize your entire farm, monitor specific zones, and track crop health at a glance.",
    icon: MapPin,
    gradient: "from-lime-500 to-yellow-500",
  },
  {
    title: "Expert AI Assistant",
    info: "Get 24/7 answers to your farming questions, from pest control to planting schedules.",
    icon: Bot,
    gradient: "from-purple-500 to-violet-500",
  },
  {
    title: "Crop Health Tracking",
    info: "Monitor the overall health and growth of your crops over time with detailed analytics.",
    icon: Leaf,
    gradient: "from-teal-500 to-green-500",
  },
  {
    title: "Yield Prediction",
    info: "Forecast your harvest with greater accuracy using data-driven predictions and insights.",
    icon: TrendingUp,
    gradient: "from-orange-500 to-amber-500",
  },
  {
    title: "Sustainable Practices",
    info: "Receive guidance on sustainable farming techniques to improve soil health and reduce environmental impact.",
    icon: Sprout,
    gradient: "from-emerald-500 to-lime-500",
  },
  {
    title: "Light & Environment Sensing",
    info: "Understand the light exposure and environmental conditions affecting your crops for better management.",
    icon: Sun,
    gradient: "from-yellow-500 to-orange-500",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function Features() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="text-center">
        <SectionBadge title="Features" />
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          Smarter Farming Starts Here
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Unlock the full potential of your farm with our suite of intelligent tools designed for modern, sustainable agriculture.
        </motion.p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={item}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-gradient-to-b from-muted/50 to-muted p-8",
                "ring-1 ring-foreground/10 backdrop-blur-xl transition-all duration-300 hover:ring-foreground/20",
                "dark:from-muted/30 dark:to-background/80"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br",
                  feature.gradient,
                  "ring-1 ring-foreground/10"
                )}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                {feature.info}
              </p>
              <div className={cn(
                "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r",
                feature.gradient,
                "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              )} />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  )
} 