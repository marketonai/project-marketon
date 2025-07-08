"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, PenTool, Zap, Target, BarChart3, Share2, Search } from "lucide-react"
import { ServiceHologram } from "@/components/ui/service-hologram"

const services = [
  {
    id: 1,
    title: "AI Content Marketing",
    description:
      "Create compelling content that converts with AI-powered writing, SEO optimization, and brand voice consistency.",
    icon: PenTool,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
  },
  {
    id: 2,
    title: "Marketing Automation",
    description:
      "Automate your marketing workflows with intelligent lead nurturing, email sequences, and customer journeys.",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 3,
    title: "Paid Media Management",
    description:
      "Maximize ROI with AI-optimized ad campaigns across Google, Facebook, Instagram, and LinkedIn platforms.",
    icon: Target,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
  },
  {
    id: 4,
    title: "Marketing Analytics",
    description:
      "Transform data into actionable insights with predictive analytics, attribution modeling, and performance forecasting.",
    icon: BarChart3,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
  },
  {
    id: 5,
    title: "Social Media Marketing",
    description:
      "Build engaged communities with viral content creation, influencer outreach, and social media automation.",
    icon: Share2,
    color: "from-red-500 to-rose-500",
    bgColor: "bg-red-50",
  },
  {
    id: 6,
    title: "SEO & Digital Marketing",
    description:
      "Dominate search results with AI-powered keyword research, content optimization, and link building strategies.",
    icon: Search,
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
  },
]

export function ServiceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [robotAction, setRobotAction] = useState<"idle" | "left" | "right" | "welcome">("idle")
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)
  const [isHologramOpen, setIsHologramOpen] = useState(false)
  const [visibleItems, setVisibleItems] = useState(3)

  // Responsive visible items
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth >= 1280) {
        setVisibleItems(5) // xl screens
      } else if (window.innerWidth >= 1024) {
        setVisibleItems(4) // lg screens
      } else if (window.innerWidth >= 768) {
        setVisibleItems(3) // md screens
      } else if (window.innerWidth >= 640) {
        setVisibleItems(2) // sm screens
      } else {
        setVisibleItems(1) // mobile
      }
    }

    updateVisibleItems()
    window.addEventListener("resize", updateVisibleItems)
    return () => window.removeEventListener("resize", updateVisibleItems)
  }, [])

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || isHologramOpen) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length)
      setRobotAction("right")
      setTimeout(() => setRobotAction("idle"), 1000)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isHologramOpen])

  const goToNext = () => {
    setRobotAction("right")
    setCurrentIndex((prev) => (prev + 1) % services.length)
    setTimeout(() => setRobotAction("idle"), 1000)
  }

  const goToPrev = () => {
    setRobotAction("left")
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)
    setTimeout(() => setRobotAction("idle"), 1000)
  }

  const goToSlide = (index: number) => {
    setRobotAction("welcome")
    setCurrentIndex(index)
    setTimeout(() => setRobotAction("idle"), 1500)
  }

  const openHologram = (service: (typeof services)[0]) => {
    setSelectedService(service)
    setIsHologramOpen(true)
    setIsAutoPlaying(false)
  }

  const closeHologram = () => {
    setIsHologramOpen(false)
    setSelectedService(null)
    setIsAutoPlaying(true)
  }

  // Get visible services for current view
  const getVisibleServices = () => {
    const result = []
    for (let i = 0; i < visibleItems; i++) {
      const index = (currentIndex + i) % services.length
      result.push({
        ...services[index],
        displayIndex: i,
        actualIndex: index,
      })
    }
    return result
  }

  const visibleServices = getVisibleServices()
  const centerIndex = Math.floor(visibleItems / 2)

  return (
    <>
      <section className="py-12 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,204,21,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.05),transparent_50%)]" />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
              Marketing Services
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
              Accelerate your business growth with our comprehensive AI-powered marketing solutions designed to drive
              results and maximize ROI
            </p>
          </motion.div>

          {/* Robot Container - Hidden on mobile */}
          <div className="hidden lg:flex justify-center mb-8 lg:mb-12">
            <motion.div
              className="relative"
              animate={{
                x: robotAction === "left" ? -8 : robotAction === "right" ? 8 : 0,
                rotate: robotAction === "left" ? -1.5 : robotAction === "right" ? 1.5 : 0,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Robot Body */}
              <div className="w-24 h-32 lg:w-32 lg:h-40 bg-gradient-to-b from-gray-300 to-gray-400 rounded-3xl relative shadow-2xl">
                {/* Robot Head */}
                <div className="w-18 h-18 lg:w-24 lg:h-24 bg-gradient-to-b from-gray-200 to-gray-300 rounded-2xl absolute -top-6 lg:-top-8 left-3 lg:left-4 shadow-lg">
                  {/* Eyes */}
                  <div className="flex justify-center items-center h-full gap-2 lg:gap-3">
                    <motion.div
                      className="w-3 h-3 lg:w-4 lg:h-4 bg-yellow-400 rounded-full"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <motion.div
                      className="w-3 h-3 lg:w-4 lg:h-4 bg-yellow-400 rounded-full"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                    />
                  </div>
                </div>

                {/* Chest Panel */}
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl absolute top-6 lg:top-8 left-6 lg:left-8 shadow-inner">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center">
                    <motion.div
                      className="w-6 h-6 lg:w-8 lg:h-8 bg-yellow-600 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>
                </div>

                {/* Left Arm */}
                <motion.div
                  className="w-5 h-16 lg:w-6 lg:h-20 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full absolute -left-6 lg:-left-8 top-10 lg:top-12 origin-top shadow-lg"
                  animate={{
                    rotate: robotAction === "left" ? -35 : robotAction === "welcome" ? -25 : 0,
                    y: robotAction === "left" ? -3 : robotAction === "welcome" ? -6 : 0,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />

                {/* Right Arm */}
                <motion.div
                  className="w-5 h-16 lg:w-6 lg:h-20 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full absolute -right-6 lg:-right-8 top-10 lg:top-12 origin-top shadow-lg"
                  animate={{
                    rotate: robotAction === "right" ? 35 : robotAction === "welcome" ? 25 : 0,
                    y: robotAction === "right" ? -3 : robotAction === "welcome" ? -6 : 0,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />

                {/* Legs */}
                <div className="w-4 h-10 lg:w-5 lg:h-12 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full absolute bottom-0 left-4 lg:left-6 shadow-lg" />
                <div className="w-4 h-10 lg:w-5 lg:h-12 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full absolute bottom-0 right-4 lg:right-6 shadow-lg" />
              </div>

              {/* Hologram Effect */}
              <AnimatePresence>
                {robotAction !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute -top-12 lg:-top-16 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="w-20 h-10 lg:w-24 lg:h-12 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-2xl border-2 border-yellow-400/50 backdrop-blur-sm hologram-glow">
                      <div className="w-full h-full rounded-2xl bg-gradient-to-r from-yellow-300/30 to-yellow-400/30 flex items-center justify-center">
                        <span className="text-yellow-600 font-bold text-xs lg:text-sm">Marketing AI</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Services Carousel */}
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="flex justify-center gap-3 md:gap-4 mb-6 md:mb-8">
              <Button
                onClick={goToPrev}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-yellow-400 hover:text-black border-2 border-gray-200 hover:border-yellow-400 rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shadow-lg transition-all duration-300 group"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
              </Button>
              <Button
                onClick={goToNext}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-yellow-400 hover:text-black border-2 border-gray-200 hover:border-yellow-400 rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shadow-lg transition-all duration-300 group"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
              </Button>
            </div>

            {/* Services Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
              {visibleServices.map((service, index) => {
                const Icon = service.icon
                const isCenter = index === centerIndex && visibleItems >= 3

                return (
                  <motion.div
                    key={`${service.id}-${service.actualIndex}`}
                    className="relative group cursor-pointer"
                    onClick={() => openHologram(service)}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                    whileHover={{
                      scale: 1.02,
                      y: -8,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div
                      className={`
                        relative overflow-hidden rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 h-64 sm:h-72 md:h-80 lg:h-96 transition-all duration-500 group-hover:shadow-2xl
                        ${
                          isCenter
                            ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-black shadow-2xl scale-105 elegant-glow-center"
                            : `${service.bgColor} hover:shadow-xl border-2 border-gray-100 hover:border-yellow-300 elegant-glow-hover`
                        }
                      `}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-2 md:top-4 right-2 md:right-4 w-16 md:w-20 lg:w-32 h-16 md:h-20 lg:h-32 rounded-full bg-current" />
                        <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 w-10 md:w-12 lg:w-20 h-10 md:h-12 lg:h-20 rounded-full bg-current" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        {/* Icon */}
                        <div
                          className={`
                            w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 lg:mb-6 transition-all duration-300
                            ${
                              isCenter
                                ? "bg-black/10 text-black"
                                : `bg-gradient-to-r ${service.color} text-white group-hover:scale-110 group-hover:shadow-lg`
                            }
                          `}
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                        </div>

                        {/* Title */}
                        <h3
                          className={`
                            text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 lg:mb-4 transition-colors duration-300 leading-tight
                            ${isCenter ? "text-black" : "text-gray-800 group-hover:text-gray-900"}
                          `}
                        >
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p
                          className={`
                            text-xs sm:text-sm md:text-sm lg:text-base leading-relaxed flex-grow transition-colors duration-300
                            ${isCenter ? "text-black/80" : "text-gray-600 group-hover:text-gray-700"}
                          `}
                        >
                          {service.description}
                        </p>

                        {/* Click indicator */}
                        <div className="mt-3 md:mt-4 lg:mt-6">
                          <div
                            className={`
                              text-center py-2 px-3 md:px-4 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base
                              ${
                                isCenter
                                  ? "bg-black/10 text-black"
                                  : "bg-gray-100 text-gray-600 group-hover:bg-yellow-100 group-hover:text-yellow-700"
                              }
                            `}
                          >
                            Click to explore
                          </div>
                        </div>
                      </div>

                      {/* Elegant Glow Overlay */}
                      <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className={`
                    w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300
                    ${
                      index === currentIndex
                        ? "bg-yellow-400 scale-125 shadow-lg"
                        : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Hologram */}
      <ServiceHologram isOpen={isHologramOpen} onClose={closeHologram} service={selectedService} />
    </>
  )
}
