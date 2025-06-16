import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const features = [
  {
    title: "Plant Health Classifier",
    description: "Upload a photo of a plant leaf and our AI will instantly identify potential diseases, providing you with a diagnosis and recommended treatments.",
    image: "/images/light/agrolens-plant-health-light.png",
    darkImage: "/images/dark/agrolens-plant-health-dark.png",
    alt: "AgroLens Plant Health Classifier Interface",
  },
  {
    title: "Sensor Data Dashboard",
    description: "Monitor your farm's vital signs in real-time. Our dashboard displays live data from your sensors, including soil moisture, temperature, humidity, and light levels.",
    image: "/images/light/agrolens-sensor-dashboard-light.png",
    darkImage: "/images/dark/agrolens-sensor-dashboard-dark.png",
    alt: "AgroLens Sensor Data Dashboard",
  },
  {
    title: "Interactive Farm Map",
    description: "Get a bird's-eye view of your entire operation. Our interactive map allows you to visualize sensor locations, monitor different zones, and track crop performance across your fields.",
    image: "/images/light/agrolens-map-light.png",
    darkImage: "/images/dark/agrolens-map-dark.png",
    alt: "AgroLens Interactive Farm Map",
  },
  {
    title: "AI Farming Assistant",
    description: "Have a question? Our AI-powered chat assistant is available 24/7 to provide expert advice on everything from pest control to optimal harvesting times.",
    image: "/images/light/agrolens-chat-light.png",
    darkImage: "/images/dark/agrolens-chat-dark.png",
    alt: "AgroLens AI Chat Assistant",
  }
]

export function AdminDashboard() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          A Closer Look at the{" "}
          <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            AgroLens Toolkit
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Dive into the core features that make AgroLens the ultimate smart farming assistant.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-16 sm:gap-24">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex flex-col gap-8 lg:items-center ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            }`}
          >
            {/* Text Content */}
            <div className="flex-1 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {feature.title}
                </h3>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  {feature.description}
                </p>
                <div className="mt-6">
                  <button className="group inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Image */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative rounded-2xl bg-gradient-to-b from-muted/50 to-muted p-2 ring-1 ring-foreground/10 backdrop-blur-3xl dark:from-muted/30 dark:to-background/80"
              >
                <div className="block dark:hidden">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    width={600}
                    height={400}
                    quality={100}
                    className="rounded-xl shadow-2xl ring-1 ring-foreground/10 transition-all duration-300"
                  />
                </div>
                <div className="hidden dark:block">
                  <Image
                    src={feature.darkImage}
                    alt={feature.alt}
                    width={600}
                    height={400}
                    quality={100}
                    className="rounded-xl shadow-2xl ring-1 ring-foreground/10 transition-all duration-300"
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 transition-opacity duration-300 hover:opacity-100" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 