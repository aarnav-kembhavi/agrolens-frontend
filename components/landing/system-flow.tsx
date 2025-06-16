import { motion } from "framer-motion"
import { Leaf, Droplet, MapPin, Bot } from "lucide-react"

const flowSteps = [
  {
    title: "Plant Health Classifier",
    description: "Upload a plant leaf photo for instant AI-powered disease detection and remedy suggestions.",
    icon: Leaf,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    shadowColor: "shadow-green-500/25",
  },
  {
    title: "Sensor Dashboard",
    description: "View real-time soil moisture, temperature, and humidity data from your fields.",
    icon: Droplet,
    gradient: "from-blue-500 via-sky-500 to-cyan-500",
    shadowColor: "shadow-blue-500/25",
  },
  {
    title: "Interactive Farm Map",
    description: "Visualize your farm, irrigation zones, and sensor locations on an interactive map.",
    icon: MapPin,
    gradient: "from-lime-500 via-yellow-500 to-amber-500",
    shadowColor: "shadow-lime-500/25",
  },
  {
    title: "AI Chat Assistant",
    description: "Ask questions about watering, soil, pests, and get simple, actionable advice.",
    icon: Bot,
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    shadowColor: "shadow-purple-500/25",
  },
]

export function SystemFlow() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Explore the{" "}
          <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            AgroLens Toolkit
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          A suite of powerful, AI-driven tools designed to help you manage your farm efficiently and sustainably.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {flowSteps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative group"
          >
            <div 
              className={`
                h-full rounded-2xl p-1 transition-all duration-300 
                bg-gradient-to-br ${step.gradient} opacity-75 hover:opacity-100
                hover:scale-[1.02] hover:-translate-y-1
              `}
            >
              <div className="h-full rounded-xl bg-background/90 p-6 backdrop-blur-xl">
                <div className={`
                  size-14 rounded-lg bg-gradient-to-br ${step.gradient}
                  flex items-center justify-center ${step.shadowColor}
                  shadow-lg transition-shadow duration-300 group-hover:shadow-xl
                `}>
                  <step.icon className="size-7 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 